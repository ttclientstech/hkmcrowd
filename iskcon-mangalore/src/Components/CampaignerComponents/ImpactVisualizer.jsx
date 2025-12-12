import React from "react";
import {
    Box,
    Text,
    SimpleGrid,
    VStack,
    HStack,
    Tooltip,
    useBreakpointValue,
    Circle
} from "@chakra-ui/react";

const COST_PER_SQFT = 5000;

const ImpactVisualizer = ({ raisedAmount, targetAmount }) => {
    // 1. Logic
    const achievedSqFt = Math.floor((raisedAmount || 0) / COST_PER_SQFT);
    const targetSqFt = Math.floor((targetAmount || 0) / COST_PER_SQFT);

    // Fallback to avoid empty grid
    const totalBlocks = targetSqFt > 0 ? targetSqFt : 50;

    // Mobile: 10 columns | Desktop: 20 columns
    const columns = useBreakpointValue({ base: 10, md: 20, lg: 25 });

    return (
        // 🛡️ WIDGET CONTAINER (Matches Dashboard Theme)
        <Box
            w="100%"
            bg="rgba(255, 255, 255, 0.03)" // Subtle widget background
            borderRadius="2xl"
            border="1px solid rgba(255, 255, 255, 0.05)"
            p={[4, 6]}
            mt={6}
            position="relative"
            overflow="hidden"
        >
            <VStack spacing={5} align="stretch">

                {/* 📊 HEADER & LEGEND */}
                <HStack justify="space-between" align="center" wrap="wrap" spacing={2}>
                    <Text
                        fontSize={["xs", "sm"]}
                        fontWeight="700"
                        color="blue.200"
                        textTransform="uppercase"
                        letterSpacing="1px"
                    >
                        Impact Visualizer
                    </Text>

                    {/* Legend */}
                    <HStack spacing={3}>
                        <HStack spacing={1}>
                            <Box w="10px" h="10px" bg="#FFD700" borderRadius="sm" />
                            <Text fontSize="10px" color="gray.400">Awaits Seva</Text>
                        </HStack>
                        <HStack spacing={1}>
                            <Box w="10px" h="10px" bg="gray.700" border="1px solid #48BB78" borderRadius="sm" />
                            <Text fontSize="10px" color="gray.400">Open Land</Text>
                        </HStack>
                    </HStack>
                </HStack>

                {/* 🧱 THE GRID VIEWPORT */}
                <Box
                    w="100%"
                    h="250px" // Fixed height for "Window" feel
                    overflowY="auto"
                    bg="rgba(0, 0, 0, 0.4)" // Darker background for contrast
                    borderRadius="lg"
                    border="1px solid rgba(255, 255, 255, 0.1)"
                    p={4}
                    boxShadow="inset 0 0 20px rgba(0,0,0,0.5)" // Inner shadow for depth
                    css={{
                        "&::-webkit-scrollbar": { width: "6px" },
                        "&::-webkit-scrollbar-track": { background: "rgba(0,0,0,0.3)" },
                        "&::-webkit-scrollbar-thumb": { background: "#FFD700", borderRadius: "3px" },
                    }}
                >
                    <SimpleGrid columns={columns} spacing="4px">
                        {Array.from({ length: totalBlocks }).map((_, index) => {
                            const blockNumber = index + 1;
                            const isFilled = blockNumber <= achievedSqFt;

                            return (
                                <Tooltip
                                    key={index}
                                    label={`Sq.Ft #${blockNumber}`}
                                    bg="gray.900"
                                    color="white"
                                    fontSize="xs"
                                >
                                    <Box
                                        h={["20px", "24px"]}
                                        w="100%"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        fontSize="8px"
                                        color={isFilled ? "black" : "rgba(255,255,255,0.3)"}
                                        fontWeight="bold"
                                        borderRadius="sm"
                                        transition="all 0.2s"
                                        cursor="default"

                                        // 🎨 VISUAL LOGIC
                                        bg={isFilled
                                            ? "linear-gradient(180deg, #FFD700 0%, #E6AC00 100%)" // Gold Shine
                                            : "gray.800" // Dark Grey
                                        }

                                        border={isFilled
                                            ? "none"
                                            : "1px solid #38A169" // Green Border (green.500)
                                        }

                                        boxShadow={isFilled ? "0 0 5px rgba(255, 215, 0, 0.6)" : "none"}
                                        _hover={{ transform: "scale(1.2)", zIndex: 2, borderColor: "white" }}
                                    >
                                        {blockNumber}
                                    </Box>
                                </Tooltip>
                            );
                        })}
                    </SimpleGrid>
                </Box>

                {/* 📈 SUMMARY FOOTER */}
                <HStack justify="space-between" align="center" pt={1}>
                    <VStack align="start" spacing={0}>
                        <Text fontSize="10px" color="gray.500" textTransform="uppercase" letterSpacing="0.5px">
                            Total Progress
                        </Text>
                        <HStack align="baseline">
                            <Text fontSize={["xl", "2xl"]} fontWeight="800" color="white" lineHeight="1">
                                {achievedSqFt}
                            </Text>
                            <Text fontSize="sm" color="gray.500">
                                / {targetSqFt} Sq.Ft
                            </Text>
                        </HStack>
                    </VStack>

                    <Box textAlign="right">
                        <Text fontSize="xs" color="green.300" fontStyle="italic">
                            {targetSqFt - achievedSqFt} blocks remaining
                        </Text>
                    </Box>
                </HStack>

            </VStack>
        </Box>
    );
};

export default ImpactVisualizer;