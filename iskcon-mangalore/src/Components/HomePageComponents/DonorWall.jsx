// src/Components/HomePageComponents/DonorWall.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    Box,
    Button,
    Text,
    SimpleGrid,
    Tooltip,
    VStack,
    HStack,
    useBreakpointValue,
    useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import templeMaskImg from "../../assets/images/Front_View_from_AP.jpg"; // <- local mask image from your repo
import { formatCurrency } from "../utils"; // optional helper you already use

/**
 * DonorWall
 *
 * Props:
 * - donors: array of existing donors. Each donor object:
 *     { name, amount, sqft, sqftIndices }  // sqftIndices = [1,2,3] (optional)
 * - totalSqft: number (1000)
 * - pricePerSqft: number (5001)
 *
 * Usage:
 * <DonorWall donors={getSingleUser?.top10paymentDetails || []} totalSqft={1000} pricePerSqft={5001} />
 *
 * NOTE:
 * - This component computes which of the grid cells fall inside the temple mask by sampling the mask image
 *   on an offscreen canvas. That makes the wall appear in the temple silhouette.
 * - For performance we sample at the center point of each cell.
 */

const GOLD_COLOR = "#FFD66B";
const SILVER_COLOR = "#C9D3DD";
const WHITE_COLOR = "#FFFFFF";
const EMPTY_BG = "#E9F2FB";
const NAVY = "#082032";

const PRICE_DEFAULT = 5001;

function DonorWall({ donors = [], totalSqft = 1000, pricePerSqft = PRICE_DEFAULT }) {
    const navigate = useNavigate();
    const toast = useToast();

    const [open, setOpen] = useState(false);
    const [gridMap, setGridMap] = useState([]); // array length totalSlots with { index, insideMask, status, ownerName, ownerSqft }
    const [selected, setSelected] = useState(new Set()); // set of indices user selected
    const [loadingMask, setLoadingMask] = useState(true);

    // grid size (choose columns x rows to get approx totalSqft)
    // For temple shape we'll display columns = 50, rows = Math.ceil(total / columns)
    const columns = 50;
    const rows = Math.ceil(totalSqft / columns);

    const cellWidth = 24; // px used for canvas sampling calculation (not the UI width)
    const canvasWidth = columns * cellWidth;
    const canvasHeight = rows * cellWidth;

    const isMobile = useBreakpointValue({ base: true, md: false });

    // Build initial empty grid
    useEffect(() => {
        const arr = new Array(totalSqft).fill(null).map((_, idx) => ({
            index: idx,
            insideMask: false,
            owner: null, // { name, amount, sqft }
        }));
        setGridMap(arr);
    }, [totalSqft]);

    // Helper: color tier based on donor.totalSqft
    const tierColor = (donorSqft) => {
        if (!donorSqft) return EMPTY_BG;
        if (donorSqft >= 10) return GOLD_COLOR;
        if (donorSqft >= 5) return SILVER_COLOR;
        return WHITE_COLOR;
    };

    // Assign donor indices (prefer sqftIndices if present; otherwise auto-assign)
    const assignDonorsToGrid = (maskBooleanArray) => {
        // maskBooleanArray: boolean array length totalSqft indicating if slot is inside shape
        const newGrid = maskBooleanArray.map((inside, idx) => ({
            index: idx,
            insideMask: inside,
            owner: null,
        }));

        // create list of available indices (inside mask and free)
        const availableIndices = newGrid
            .map((g, i) => (g.insideMask ? i : -1))
            .filter((i) => i >= 0);

        let cursor = 0;

        // First, place donors with explicit sqftIndices
        donors.forEach((d) => {
            if (Array.isArray(d.sqftIndices) && d.sqftIndices.length) {
                d.sqftIndices.forEach((slot) => {
                    // ensure slot within bounds and inside mask
                    if (slot >= 0 && slot < totalSqft && maskBooleanArray[slot]) {
                        newGrid[slot].owner = {
                            name: d.name || "Anonymous",
                            amount: d.amount,
                            sqft: d.sqft || 1,
                        };
                    }
                });
            }
        });

        // Now place donors that don't have indices: allocate contiguous free indices equal to their sqft
        donors.forEach((d) => {
            if (!Array.isArray(d.sqftIndices) || d.sqftIndices.length === 0) {
                const need = Math.max(1, Math.round(d.sqft || (d.amount ? Math.round(d.amount / pricePerSqft) : 1)));
                let placed = 0;
                // move cursor to next free
                while (cursor < availableIndices.length && placed < need) {
                    const idx = availableIndices[cursor];
                    if (!newGrid[idx].owner) {
                        newGrid[idx].owner = {
                            name: d.name || "Anonymous",
                            amount: d.amount,
                            sqft: need, // assign full value for tiering
                        };
                        placed++;
                    }
                    cursor++;
                }
            }
        });

        return newGrid;
    };

    // Load mask image, sample pixel data and compute maskBooleanArray
    useEffect(() => {
        let cancelled = false;
        setLoadingMask(true);

        const img = new Image();
        img.crossOrigin = "anonymous";
        // use the local project path — this file exists in your repo (you already import Front_View_from_AP.jpg elsewhere)
        img.src = templeMaskImg; // path imported above

        img.onload = () => {
            if (cancelled) return;
            // draw image into canvas sized to columns x rows
            const canvas = document.createElement("canvas");
            canvas.width = columns;
            canvas.height = rows;
            const ctx = canvas.getContext("2d");

            // Draw full image scaled to smaller canvas so each canvas pixel corresponds to a cell
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

            // For each grid cell, sample the canvas pixel at (col, row)
            const maskBooleanArray = new Array(totalSqft).fill(false);
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < columns; c++) {
                    const idx = r * columns + c;
                    if (idx >= totalSqft) continue; // skip surplus cells
                    const p = (r * canvas.width + c) * 4;
                    const alpha = imageData[p + 3]; // alpha channel
                    const luma = (imageData[p] + imageData[p + 1] + imageData[p + 2]) / 3;
                    // We assume silhouette has non-white/non-transparent area; use threshold:
                    const inside = alpha > 20 && luma < 250; // tweak if needed
                    maskBooleanArray[idx] = !!inside;
                }
            }

            // assign donors to grid
            const assignedGrid = assignDonorsToGrid(maskBooleanArray);
            if (!cancelled) {
                setGridMap(assignedGrid);
                setLoadingMask(false);
            }
        };

        img.onerror = () => {
            console.error("Failed to load temple mask image:", templeMaskImg);
            // fallback: mark first totalSqft cells as inside
            const fallback = new Array(totalSqft).fill(true);
            const assignedGrid = assignDonorsToGrid(fallback);
            setGridMap(assignedGrid);
            setLoadingMask(false);
        };

        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [donors, totalSqft]);

    // Visual helpers
    const occupiedCount = useMemo(
        () => gridMap.filter((g) => g.owner && g.insideMask).length,
        [gridMap]
    );

    const emptyCount = useMemo(
        () => gridMap.filter((g) => g.insideMask && !g.owner).length,
        [gridMap]
    );

    // click a cell
    const onCellClick = (cell) => {
        if (!cell.insideMask) return;
        const idx = cell.index;
        if (cell.owner) {
            // can't select owned cells
            toast({
                title: "Already reserved",
                description: `${cell.owner.name} has reserved this square.`,
                status: "info",
                duration: 1600,
                isClosable: true,
            });
            return;
        }
        const newSet = new Set(selected);
        if (newSet.has(idx)) newSet.delete(idx);
        else newSet.add(idx);
        setSelected(newSet);
    };

    const selectedCount = selected.size;
    const selectedAmount = selectedCount * pricePerSqft;

    const clearSelection = () => setSelected(new Set());

    const goToDonate = () => {
        if (selectedCount === 0) {
            toast({ title: "Select squares", description: "Please select square feet to add your name.", status: "warning" });
            return;
        }
        // build query params
        const params = new URLSearchParams({
            amount: String(selectedAmount),
            sqft: String(selectedCount),
            indices: JSON.stringify(Array.from(selected)),
        });
        // Navigate — adapt path to your flow
        navigate(`/payment?${params.toString()}`);
    };

    // Render a single cell (small square)
    const Cell = ({ cell }) => {
        if (!cell.insideMask) {
            return <Box w="12px" h="12px" />; // placeholder for alignment, or `null` to collapse
        }

        const owned = cell.owner;
        // Determine display color
        let bg = EMPTY_BG;
        let border = "1px solid rgba(0,0,0,0.04)";
        let displayText = "";
        if (owned) {
            bg = tierColor(owned.sqft);
            border = "1px solid rgba(0,0,0,0.06)";
            displayText = owned.name ? owned.name.split(" ")[0] : "Donor";
        } else if (selected.has(cell.index)) {
            // selected style
            bg = "#FFF3BF";
            border = "2px solid #082032";
        } else {
            bg = EMPTY_BG;
        }

        const tooltipLabel = owned
            ? `${owned.name} — ${owned.sqft} sqft`
            : "Available — Click to select";

        return (
            <Tooltip label={tooltipLabel} placement="top" openDelay={200}>
                <Box
                    onClick={() => onCellClick(cell)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") onCellClick(cell);
                    }}
                    cursor={owned ? "default" : "pointer"}
                    w={isMobile ? "14px" : "16px"}
                    h={isMobile ? "14px" : "16px"}
                    borderRadius="3px"
                    bg={bg}
                    border={border}
                    transition="transform .12s ease, box-shadow .12s ease"
                    _hover={!owned ? { transform: "translateY(-2px)", boxShadow: "0 4px 10px rgba(0,0,0,0.08)" } : {}}
                    display="inline-block"
                    mr="2px"
                    mb="2px"
                />
            </Tooltip>
        );
    };

    // If open: show grid, else show collapsed CTA
    return (
        <Box w="100%" maxW="1200px" mx="auto" mt={10} px={[4,6]} fontFamily="'Poppins', sans-serif">
            <VStack spacing={4} align="stretch">
                <Box textAlign="center">
                    <Text fontSize={["xl","2xl"]} fontWeight="700" color={NAVY}>
                        Temple Donor Wall
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                        Click to view & place your family’s mark on the temple.
                    </Text>
                </Box>

                {!open ? (
                    <HStack justify="center" spacing={4}>
                        <Button colorScheme="yellow" onClick={() => setOpen(true)} variant="solid">
                            View Square-Foot Wall
                        </Button>
                        <Button variant="ghost" onClick={() => {
                            // quick jump to most recent
                            setOpen(true);
                            window.setTimeout(() => {
                                const el = document.getElementById('donor-wall-grid');
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }, 120);
                        }}>
                            Preview
                        </Button>
                    </HStack>
                ) : (
                    <>
                        <Box>
                            <HStack justify="space-between" mb={3}>
                                <Box>
                                    <Text fontSize="sm" color="gray.600">Goal</Text>
                                    <Text fontWeight="700">{totalSqft} SqFt</Text>
                                </Box>

                                <Box>
                                    <Text fontSize="sm" color="gray.600">Occupied</Text>
                                    <Text fontWeight="700">{occupiedCount} SqFt</Text>
                                </Box>

                                <Box>
                                    <Text fontSize="sm" color="gray.600">Available</Text>
                                    <Text fontWeight="700">{emptyCount} SqFt</Text>
                                </Box>

                                <Box>
                                    <Text fontSize="sm" color="gray.600">Selected</Text>
                                    <Text fontWeight="700">{selectedCount} SqFt</Text>
                                </Box>
                            </HStack>

                            <Box id="donor-wall-grid" overflowX="auto" borderRadius="8px" p={3} bg="transparent">
                                {loadingMask ? (
                                    <Text>Loading wall…</Text>
                                ) : (
                                    <Box
                                        // grid visuals: we render inline-block cells that wrap into rows
                                        style={{
                                            width: "100%",
                                            lineHeight: 0,
                                            display: "inline-block",
                                            // scale the whole wall responsively:
                                            transform: isMobile ? "scale(0.82)" : "scale(1)",
                                            transformOrigin: "top left",
                                        }}
                                    >
                                        {/* Render cells sequentially row by row */}
                                        {rows > 0 && (
                                            <Box>
                                                {Array.from({ length: rows }).map((_, r) => (
                                                    <Box key={r} style={{ whiteSpace: "nowrap" }}>
                                                        {Array.from({ length: columns }).map((__, c) => {
                                                            const idx = r * columns + c;
                                                            if (idx >= totalSqft) return null;
                                                            const cell = gridMap[idx] || { index: idx, insideMask: false, owner: null };
                                                            return <Cell key={idx} cell={cell} />;
                                                        })}
                                                    </Box>
                                                ))}
                                            </Box>
                                        )}
                                    </Box>
                                )}
                            </Box>

                            {/* Legend / CTA */}
                            <HStack justify="space-between" mt={4} align="center" wrap="wrap" spacing={4}>
                                <HStack spacing={3}>
                                    <Box w="18px" h="12px" bg={GOLD_COLOR} borderRadius="3px" />
                                    <Text fontSize="sm">Gold (10+ SqFt)</Text>

                                    <Box w="18px" h="12px" bg={SILVER_COLOR} borderRadius="3px" />
                                    <Text fontSize="sm">Silver (5–9 SqFt)</Text>

                                    <Box w="18px" h="12px" bg={WHITE_COLOR} borderRadius="3px" border="1px solid #E8E8E8" />
                                    <Text fontSize="sm">Donors (1–4 SqFt)</Text>

                                    <Box w="18px" h="12px" bg={EMPTY_BG} borderRadius="3px" />
                                    <Text fontSize="sm">Available</Text>
                                </HStack>

                                <HStack spacing={3}>
                                    <Text fontSize="sm" color="gray.600">Selected:</Text>
                                    <Text fontWeight="700">{selectedCount} SqFt</Text>
                                    <Text fontSize="sm" color="gray.600">Total:</Text>
                                    <Text fontWeight="700">{formatCurrency(selectedAmount)}</Text>

                                    <Button size="sm" variant="ghost" onClick={clearSelection}>Clear</Button>
                                    <Button colorScheme="teal" onClick={goToDonate} isDisabled={selectedCount === 0}>
                                        Add My Name — {selectedCount > 0 ? `${selectedCount} SqFt` : ""}
                                    </Button>
                                </HStack>
                            </HStack>
                        </Box>
                    </>
                )}
            </VStack>
        </Box>
    );
}

export default DonorWall;