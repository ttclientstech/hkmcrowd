import React, { useState } from "react";
import { Box, SimpleGrid, Tooltip, Text, Flex, Badge, Button } from "@chakra-ui/react";

// Mock Data Generator (Replace this with actual Redux data later)
// We need an array representing 1000 blocks.
// Some are taken by donors, some are empty.
const TOTAL_BLOCKS = 1000;

const generateGridData = () => {
    const data = Array(TOTAL_BLOCKS).fill(null);

    // Simulate some donors taking up blocks
    // Example: "Ramesh" bought 5 sq ft starting at index 0
    let currentIndex = 0;
    const donors = [
        { name: "Ramesh Gupta", sqft: 5, tier: "gold" },
        { name: "Anita Roy", sqft: 2, tier: "silver" },
        { name: "Anonymous", sqft: 10, tier: "platinum" },
        { name: "Krishna Das", sqft: 1, tier: "silver" },
        // ... add more mock donors
    ];

    donors.forEach(donor => {
        for (let i = 0; i < donor.sqft; i++) {
            if (currentIndex < TOTAL_BLOCKS) {
                data[currentIndex] = { ...donor, isStart: i === 0 };
                currentIndex++;
            }
        }
    });

    return { gridData: data, filledCount: currentIndex };
};

const DonorGrid = () => {
    const { gridData, filledCount } = generateGridData();
    const remaining = TOTAL_BLOCKS - filledCount;

    return (
        <Box
            py={10}
            px={[2, 4]}
            bg="gray.900"
            borderRadius="xl"
            textAlign="center"
            id="donor-wall"
        >
            <Text color="#D4AF37" fontSize="sm" fontWeight="bold" letterSpacing="widest" textTransform="uppercase" mb={2}>
                The Wall of Devotion
            </Text>
            <Text color="white" fontSize={["2xl", "3xl"]} fontFamily="'Cinzel', serif" mb={4}>
                Claim Your Square Foot
            </Text>

            <Flex justify="center" gap={4} mb={6} fontSize="sm" color="gray.400">
                <Flex align="center" gap={2}>
                    <Box w="12px" h="12px" bg="#D4AF37" borderRadius="sm" />
                    <Text>Taken</Text>
                </Flex>
                <Flex align="center" gap={2}>
                    <Box w="12px" h="12px" bg="gray.700" borderRadius="sm" border="1px solid gray" />
                    <Text>Available</Text>
                </Flex>
            </Flex>

            <Text color="white" mb={6}>
                <Text as="span" color="#D4AF37" fontWeight="bold">{remaining}</Text> blocks remaining out of 1000
            </Text>

            {/* THE GRID */}
            <Box
                display="grid"
                // Responsive columns: 10 on mobile, 20 on tablet, 40 on desktop
                gridTemplateColumns={["repeat(10, 1fr)", "repeat(20, 1fr)", "repeat(40, 1fr)"]}
                gap="2px"
                maxW="1000px"
                mx="auto"
                bg="black"
                p={2}
                borderRadius="md"
                border="2px solid #333"
            >
                {gridData.map((block, index) => {
                    const isFilled = block !== null;

                    // Determine Color based on donation size (Mock logic)
                    let bg = "gray.800"; // Empty
                    if (isFilled) {
                        if (block.tier === 'platinum') bg = "linear-gradient(135deg, #e5e4e2 0%, #ffffff 100%)"; // Platinum
                        else if (block.tier === 'gold') bg = "linear-gradient(135deg, #D4AF37 0%, #C59D18 100%)"; // Gold
                        else bg = "#A0AEC0"; // Silver
                    }

                    return (
                        <Tooltip
                            key={index}
                            label={isFilled ? `${block.name} (${block.sqft} Sq Ft)` : "Available! Click to Donate"}
                            hasArrow
                            placement="top"
                            bg={isFilled ? "white" : "gray.700"}
                            color={isFilled ? "black" : "white"}
                        >
                            <Box
                                w="100%"
                                pt="100%" // Aspect Ratio 1:1
                                position="relative"
                                cursor="pointer"
                                transition="all 0.2s"
                                _hover={{ transform: "scale(1.2)", zIndex: 10, border: "1px solid white" }}
                            >
                                <Box
                                    position="absolute"
                                    top="0" left="0" w="100%" h="100%"
                                    bg={bg}
                                    borderRadius="1px"
                                    opacity={isFilled ? 1 : 0.3}
                                />
                            </Box>
                        </Tooltip>
                    );
                })}
            </Box>

            <Box mt={8}>
                <Button
                    bgGradient="linear(to-r, #D4AF37, #C59D18)"
                    _hover={{ bgGradient: "linear(to-r, #C59D18, #A08C16)" }}
                    color="white"
                    size="lg"
                    boxShadow="0px 0px 15px rgba(212, 175, 55, 0.4)"
                >
                    Add My Name to the Wall
                </Button>
            </Box>
        </Box>
    );
};

export default DonorGrid;