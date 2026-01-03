import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Box, SimpleGrid, Tooltip, Text, Flex, Icon, Button, VStack, Badge } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { FaCheckCircle, FaHandPointer, FaGem, FaVihara } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { fetchAllContributers } from "../../utils/apiCall";
import { useNavigate, useParams } from "react-router-dom";

// --- THEME CONSTANTS ---
const NAVY = "#082032";
const GOLD = "#D4AF37";
const BEIGE = "#FFFFFF";
const SQFT_PRICE = 5000;

// --- STYLING CONSTANTS (Optimized) ---
const PREMIUM_GOLD_GRADIENT = "linear-gradient(135deg, #BF953F 0%, #FCF6BA 40%, #B38728 100%)";
const GOLD_TEXT_GRADIENT = "linear-gradient(to-r, #BF953F, #FCF6BA, #B38728, #AA771C)";

// Simplified Shadows for Mobile Performance
const GOLD_BEVEL_SHADOW = "inset 1px 1px 2px rgba(255,255,255,0.6), inset -1px -1px 2px rgba(0,0,0,0.3), 2px 2px 5px rgba(0,0,0,0.2)";
const EMPTY_CARVE_SHADOW = "inset 2px 2px 5px rgba(0,0,0,0.15)";

const pulseBorder = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4); border-color: ${GOLD}; }
  70% { box-shadow: 0 0 0 4px rgba(212, 175, 55, 0); border-color: #FFE57F; }
  100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4); border-color: ${GOLD}; }
`;

// Helper: Grid Logic
const prepareGrid = (donors, totalBlocks = 500) => {
    let grid = Array(totalBlocks).fill(null);
    let currentIndex = 0;

    if (!Array.isArray(donors)) return { grid, filledCount: 0 };

    donors.forEach((donor) => {
        const blocksCount = Math.max(1, Math.floor(donor.amount / SQFT_PRICE));
        for (let i = 0; i < blocksCount; i++) {
            if (currentIndex < totalBlocks) {
                grid[currentIndex] = {
                    ...donor,
                    isStart: i === 0,
                };
                currentIndex++;
            }
        }
    });
    return { grid, filledCount: currentIndex };
};

// --- MEMOIZED BLOCK (Prevents lag) ---
const GridBlock = React.memo(({ block, index, isActive, onClick, isNextAvailable }) => {
    const isFilled = block !== null;
    const blockNumber = index + 1;

    return (
        <Tooltip
            label={isFilled ? `${block.name}` : `Available`}
            hasArrow
            bg={NAVY}
            color={GOLD}
            placement="top"
            fontSize="xs"
            fontWeight="bold"
            isOpen={isActive}
            p={2}
            closeOnClick={false}
        >
            <Box
                w="100%"
                pt="100%"
                position="relative"
                cursor="pointer"
                borderRadius="sm"
                onClick={(e) => {
                    e.stopPropagation();
                    onClick(index, isFilled);
                }}
                bg={isFilled ? PREMIUM_GOLD_GRADIENT : "#e2e8f0"}
                boxShadow={isFilled ? GOLD_BEVEL_SHADOW : EMPTY_CARVE_SHADOW}
                border={isFilled ? `1px solid #B8860B` : `1px solid #cbd5e0`}
                zIndex={isActive ? 10 : 1}
                transform={isActive ? "scale(1.3)" : "scale(1)"}
                transition="transform 0.2s ease-out"
                animation={isNextAvailable ? `${pulseBorder} 2s infinite` : undefined}
            >
                <Flex position="absolute" top="0" left="0" w="100%" h="100%" align="center" justify="center">
                    <Text
                        fontSize={["8px", "9px"]}
                        color={isFilled ? "#422a05" : "gray.400"}
                        fontWeight="900"
                        opacity={isFilled ? 0.9 : 0.6}
                    >
                        {blockNumber}
                    </Text>
                </Flex>
            </Box>
        </Tooltip>
    );
});

const WallOfDevotion_Engraved = ({ getSingleUser }) => {
    const [donors, setDonors] = useState([]);
    const [activeBlock, setActiveBlock] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleScrollToDonate = useCallback(() => {
        navigate(`/campaign/${id}/donate`, { state: { getSingleUser } });
    }, [navigate, id, getSingleUser]);

    // ✅ Click Handler: Only toggles tooltip for filled blocks. Does NOTHING for empty blocks.
    const handleBlockClick = useCallback((index, isFilled) => {
        if (isFilled) {
            setActiveBlock(prev => (prev === index ? null : index));
        } else {
            // Empty block click intentionally does nothing to keep user on page
        }
    }, []);

    const clearSelection = useCallback(() => setActiveBlock(null), []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAllContributers();
                if (Array.isArray(data)) {
                    const validDonors = data.filter(d => d?.finalpaymentstatus === "captured" && d.amount >= SQFT_PRICE);
                    const processed = validDonors.map(d => ({
                        name: d?.isanonymous ? "Anonymous" : d?.username,
                        amount: Math.round(d.amount),
                    }));
                    setDonors(processed);
                }
            } catch (err) {
                console.error("Error fetching contributors");
            }
        };
        fetchData();
    }, []);

    const { grid, filledCount } = useMemo(() => prepareGrid(donors, 500), [donors]);
    const remaining = 500 - filledCount;

    return (
        <Box
            w="100%"
            py={[12, 16]}
            px={[2, 6]}
            bg={`radial-gradient(circle at center, ${BEIGE}, #F5F0E5)`}
            textAlign="center"
            overflow="hidden"
            position="relative"
            onClick={clearSelection}
            mt={16}
        >
            {/* Background Decor */}
            <Box position="absolute" top="2%" left="-10%" opacity={0.05} transform="rotate(-15deg)">
                <Icon as={FaVihara} boxSize={["100px", "150px"]} color={NAVY} />
            </Box>
            <Box position="absolute" bottom="2%" right="-10%" opacity={0.05} transform="rotate(15deg)">
                <Icon as={FaVihara} boxSize={["100px", "150px"]} color={NAVY} />
            </Box>

            {/* Header Section */}
            <VStack spacing={5} mb={8} position="relative" zIndex={2}>
                <Badge
                    bg={NAVY}
                    color={GOLD}
                    px={4}
                    py={1.5}
                    borderRadius="full"
                    fontSize="xs"
                    fontWeight="800"
                    letterSpacing="1px"
                    display="flex"
                    alignItems="center"
                    gap={2}
                    fontFamily="'Satoshi', sans-serif"
                    border={`1px solid ${GOLD}`}
                >
                    <Icon as={BsStars} boxSize={3} color={GOLD} />
                    LIMITED: FIRST 500 DONORS ONLY
                </Badge>

                <Box px={2}>
                    {/* MAIN HEADING */}
                    <Text
                        fontSize={["3xl", "4xl", "5xl"]}
                        fontWeight="900"
                        fontFamily="'Poppins', sans-serif"
                        color={NAVY}
                        lineHeight="1.1"
                        letterSpacing="tight"
                    >
                        Wall of Devotion
                    </Text>

                    {/* SUB HEADING */}
                    <Text
                        mt={1}
                        fontSize={["xl", "2xl", "3xl"]}
                        fontWeight="800"
                        fontFamily="'Poppins', sans-serif"
                        bgClip="text"
                        bgGradient={GOLD_TEXT_GRADIENT}
                        filter="drop-shadow(0px 2px 0px rgba(0,0,0,0.1))"
                    >
                        Inscribe Your Name Forever
                    </Text>

                    <Text fontSize={["sm", "md"]} color={NAVY} mt={3} maxW="700px" mx="auto" fontWeight="500">
                         Be among the first 500 donors to permanently inscribe your name in the Wall of Devotion and get the <strong>Special Blessings of the Lord</strong>.
                    </Text>
                </Box>

                {/* Instruction Plaque */}
                <Box
                    bg="white"
                    borderTop={`3px solid ${GOLD}`}
                    p={5}
                    borderRadius="xl"
                    maxW="750px"
                    w="95%"
                    boxShadow="lg"
                    mt={2}
                >
                    <Icon as={FaHandPointer} color={GOLD} boxSize={6} mx="auto" mb={3} display="block"/>
                    <VStack spacing={3}>
                        <Text color={NAVY} fontSize={["xs", "sm"]} fontFamily="'Poppins', sans-serif" lineHeight="1.6">
                            ✨ <strong>Tap the Golden Block</strong> to see the contributor who is already part of this history.
                        </Text>
                        <Box w="80%" h="1px" bg="gray.100" />
                        <Text color={NAVY} fontSize={["xs", "sm"]} fontFamily="'Poppins', sans-serif" lineHeight="1.6">
                            🙏 <strong>Donate one or more square feet</strong> and be part of this Wall of Devotion to seek the Special Blessings.
                        </Text>
                    </VStack>
                </Box>
            </VStack>

            {/* --- WALL FRAME --- */}
            <Box
                maxW="1100px"
                mx="auto"
                p={[2, 4]}
                bg={NAVY}
                borderRadius={["xl", "3xl"]}
                boxShadow="xl"
            >
                <Box
                    bg="#f0f4f8"
                    borderRadius={["lg", "2xl"]}
                    overflow="hidden"
                    border="1px solid #2a4365"
                    position="relative"
                >
                    {/* Key/Legend */}
                    <Flex
                        justify="space-between"
                        align="center"
                        bg="#e2e8f0"
                        p={3}
                        borderBottom="1px solid #cbd5e0"
                        fontSize="xs"
                        color={NAVY}
                        fontWeight="700"
                        fontFamily="'Satoshi', sans-serif"
                    >
                        <Flex align="center" gap={2}>
                            <Box w="10px" h="10px" bg={PREMIUM_GOLD_GRADIENT} borderRadius="sm" border="1px solid #B8860B"/>
                            <Text>Inscribed (Tap)</Text>
                        </Flex>
                        <Flex align="center" gap={2}>
                            <Box w="10px" h="10px" bg="#fff" border="1px solid #a0aec0" borderRadius="sm" />
                            <Text>Available</Text>
                        </Flex>
                    </Flex>

                    {/* --- THE GRID (SCROLLABLE AREA) --- */}
                    <Box
                        p={[2, 4]}
                        maxH={["350px", "500px"]}
                        overflowY="auto"
                        sx={{
                            WebkitOverflowScrolling: "touch",
                            "&::-webkit-scrollbar": { width: "6px" },
                            "&::-webkit-scrollbar-thumb": { background: GOLD, borderRadius: "5px" },
                        }}
                    >
                        {/* ✅ GRID: 10 Cols Mobile / 25 Cols Desktop */}
                        <SimpleGrid columns={[10, 15, 20, 25]} spacing="4px">
                            {grid.map((block, i) => (
                                <GridBlock
                                    key={i}
                                    index={i}
                                    block={block}
                                    isActive={activeBlock === i}
                                    onClick={handleBlockClick}
                                    isNextAvailable={!block && (i === 0 || grid[i - 1] !== null)}
                                />
                            ))}
                        </SimpleGrid>
                    </Box>
                </Box>
            </Box>

            {/* CTA Section */}
            <Box mt={-8} position="relative" zIndex={3} px={2} pb={4}>
                <Box
                    bg="white"
                    p={[5, 6]}
                    borderRadius="2xl"
                    boxShadow="xl"
                    borderTop={`4px solid ${GOLD}`}
                    maxW="750px"
                    mx="auto"
                >
                    <Icon as={FaGem} color={GOLD} position="absolute" top="-16px" left="20px" boxSize={8} bg="white" p={1} borderRadius="full" border={`2px solid ${GOLD}`}/>

                    <Flex direction={["column", "row"]} align="center" justify="space-between" gap={4} mt={2}>
                        <VStack spacing={0} align={["center", "flex-start"]}>
                            <Text fontSize="xs" color="gray.500" fontWeight="bold" textTransform="uppercase">
                                Opportunities Left
                            </Text>
                            <Flex align="baseline" gap={2}>
                                <Text fontSize={["3xl", "4xl"]} fontWeight="900" color={NAVY} lineHeight="1">
                                    {remaining}
                                </Text>
                                <Text fontSize={["md", "lg"]} color={GOLD} fontWeight="bold">
                                    blocks remaining
                                </Text>
                            </Flex>
                        </VStack>

                        <Button
                            w={["100%", "auto"]}
                            size="lg"
                            bgGradient="linear(to-r, #FFD700, #FFB200)"
                            color="#2C0A0A"
                            rightIcon={<FaCheckCircle />}
                            onClick={handleScrollToDonate}
                            px={8}
                            fontSize="lg"
                            fontWeight="800"
                            borderRadius="full"
                            boxShadow="md"
                            _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                            active={{ transform: "scale(0.98)" }}
                        >
                            Donate & Get Blessings
                        </Button>
                    </Flex>
                </Box>
            </Box>
        </Box>
    );
};

export default WallOfDevotion_Engraved;