import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Box, SimpleGrid, Tooltip, Text, Flex, Icon, Button, VStack, Badge } from "@chakra-ui/react";
import { FaCheckCircle, FaChevronDown, FaHandPointer, FaGem, FaVihara } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { fetchAllContributers } from "../../utils/apiCall";
import { keyframes } from "@emotion/react";
import { useNavigate, useParams } from "react-router-dom";

// --- THEME CONSTANTS ---
const NAVY = "#082032";
const GOLD = "#D4AF37";
const BEIGE = "#FFFFFF";
const SQFT_PRICE = 5000;

// --- STYLING CONSTANTS (Optimized for Performance) ---
// Static gradients are much faster than animated ones
const PREMIUM_GOLD_GRADIENT = "linear-gradient(135deg, #BF953F 0%, #FCF6BA 40%, #B38728 100%)";
const GOLD_TEXT_GRADIENT = "linear-gradient(to-r, #BF953F, #FCF6BA, #B38728, #AA771C)";

// Simplified Shadows (Faster rendering)
const GOLD_BEVEL_SHADOW = "inset 1px 1px 2px rgba(255,255,255,0.6), inset -1px -1px 2px rgba(0,0,0,0.3), 2px 2px 5px rgba(0,0,0,0.2)";
const EMPTY_CARVE_SHADOW = "inset 2px 2px 5px rgba(0,0,0,0.15)";

// Single lightweight animation for the "Next Available" block only
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

// --- MEMOIZED BLOCK COMPONENT (Prevents re-rendering entire grid on interaction) ---
const GridBlock = React.memo(({ block, index, isActive, onClick, isNextAvailable }) => {
    const isFilled = block !== null;
    const blockNumber = index + 1;

    // Standard CSS Transition is faster than Framer Motion
    return (
        <Tooltip
            label={isFilled ? `${block.name}` : `Tap to Donate`}
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
                pt="100%" // Aspect Ratio Hack
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
                transition="transform 0.2s ease-out" // GPU accelerated transition
                animation={isNextAvailable ? `${pulseBorder} 2s infinite` : undefined}
            >
                <Flex
                    position="absolute"
                    top="0"
                    left="0"
                    w="100%"
                    h="100%"
                    align="center"
                    justify="center"
                >
                    <Text
                        fontSize={["8px", "9px"]} // Slightly larger for readability
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

    const handleBlockClick = useCallback((index, isFilled) => {
        if (isFilled) {
            setActiveBlock(prev => (prev === index ? null : index));
        } else {
            handleScrollToDonate();
        }
    }, [handleScrollToDonate]);

    // Clear active tooltip when clicking outside
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

    // Memoize grid calculation to prevent recalc on every render
    const { grid, filledCount } = useMemo(() => prepareGrid(donors, 500), [donors]);
    const remaining = 500 - filledCount;

    return (
        <Box
            w="100%"
            py={[10, 16]}
            px={[2, 6]}
            bg={`radial-gradient(circle at center, ${BEIGE}, #F5F0E5)`}
            textAlign="center"
            overflow="hidden"
            position="relative"
            onClick={clearSelection} // Close tooltip on background click
        >
            {/* Header Section */}
            <VStack spacing={4} mb={8} position="relative" zIndex={2}>
                <Badge
                    bg={NAVY}
                    color={GOLD}
                    px={4}
                    py={1}
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
                    LIVE DONATION WALL
                </Badge>

                <Box>
                    <Text
                        fontSize={["3xl", "4xl", "5xl"]}
                        fontWeight="900"
                        fontFamily="'Poppins', sans-serif"
                        color={NAVY}
                        lineHeight="1.2"
                    >
                        Etch Your Name in <br />
                        <Text
                            as="span"
                            bgClip="text"
                            bgGradient={GOLD_TEXT_GRADIENT}
                            filter="drop-shadow(0px 2px 0px rgba(0,0,0,0.1))"
                        >
                            Golden History
                        </Text>
                    </Text>
                </Box>

                {/* Instruction Plaque */}
                <Box
                    bg="white"
                    borderTop={`3px solid ${GOLD}`}
                    p={4}
                    borderRadius="xl"
                    maxW="750px"
                    w="95%"
                    boxShadow="md"
                    mt={2}
                >
                    <Icon as={FaHandPointer} color={GOLD} boxSize={6} mx="auto" mb={2} display="block"/>
                    <VStack spacing={2}>
                        <Text color={NAVY} fontSize={["xs", "sm"]} fontFamily="'Poppins', sans-serif">
                            <strong>1. Explore:</strong> Tap <Text as="span" color="#B8860B" fontWeight="800">Gold Blocks</Text> to see names.
                        </Text>
                        <Box w="80%" h="1px" bg="gray.100" />
                        <Text color={NAVY} fontSize={["xs", "sm"]} fontFamily="'Poppins', sans-serif">
                            <strong>2. Join:</strong> Donate <Text as="span" color="#C53030" fontWeight="800">one or more sq. ft.</Text> to join.
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
                            <Text>Taken</Text>
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
                            WebkitOverflowScrolling: "touch", // Smooth scrolling on iOS
                            "&::-webkit-scrollbar": { width: "6px" },
                            "&::-webkit-scrollbar-thumb": { background: GOLD, borderRadius: "5px" },
                        }}
                    >
                        {/* 8 Columns on mobile is safe, 20 on desktop */}
                        <SimpleGrid columns={[8, 12, 18, 22]} spacing="4px">
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
                                Availability
                            </Text>
                            <Flex align="baseline" gap={2}>
                                <Text fontSize={["3xl", "4xl"]} fontWeight="900" color={NAVY} lineHeight="1">
                                    {remaining}
                                </Text>
                                <Text fontSize={["md", "lg"]} color={GOLD} fontWeight="bold">
                                    blocks left
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
                            Donate & Join
                        </Button>
                    </Flex>
                </Box>
            </Box>
        </Box>
    );
};

export default WallOfDevotion_Engraved;