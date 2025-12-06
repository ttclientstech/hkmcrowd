import React from "react";
import { Box, SimpleGrid, Tooltip, Text, Flex, Icon, VStack } from "@chakra-ui/react";
import { FaUser, FaLeaf, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

// Motion component for the "Pulse" effect
const MotionBox = motion(Box);

// 1. HELPER: Convert Donor List to Grid Blocks
const prepareGrid = (donors, totalBlocks = 500) => {
    let grid = Array(totalBlocks).fill(null);
    let currentIndex = 0;

    donors.forEach(donor => {
        // Calculate blocks based on amount (Mock: 1 block = approx 2100)
        // Default to 1 block if amount is missing or small
        const amount = donor.amount ? parseFloat(donor.amount) : 2100;
        const blocksCount = Math.max(1, Math.floor(amount / 2100));

        for (let i = 0; i < blocksCount; i++) {
            if (currentIndex < totalBlocks) {
                grid[currentIndex] = {
                    ...donor,
                    isStart: i === 0,
                    isCluster: blocksCount > 1
                };
                currentIndex++;
            }
        }
    });
    return { grid, filledCount: currentIndex };
};

const WallOfDevotion = ({ newDonor }) => {

    // HARDCODED DUMMY DATA (Existing donors)
    const mockDonors = [
        { name: "Rajesh Kumar", amount: 10500, date: "2 mins ago" },
        { name: "Priya Sharma", amount: 2100, date: "1 hour ago" },
        { name: "Amitabh Bachchan", amount: 23100, date: "5 hours ago" },
        { name: "Anonymous Devotee", amount: 4200, date: "1 day ago" },
        { name: "Suresh & Family", amount: 6300, date: "2 days ago" },
        { name: "Venkatesh P.", amount: 2100, date: "3 days ago" },
    ];

    // If a new donor is passed from Payment Page, add them to the list!
    // We mark isNew: true to identify them for highlighting
    const allDonors = newDonor
        ? [...mockDonors, { ...newDonor, isNew: true }]
        : mockDonors;

    const { grid, filledCount } = prepareGrid(allDonors, 500);

    return (
        <Box
            py={8}
            px={[2, 4]}
            bg="white"
            textAlign="center"
            overflow="hidden"
            position="relative"
            maxW="1200px"
            mx="auto"
            mt={6}
        >
            {/* Header Section */}
            <VStack spacing={3} mb={6}>
                <Flex align="center" gap={2} color="#D4AF37">
                    <Icon as={FaLeaf} />
                    <Text fontWeight="bold" letterSpacing="widest" textTransform="uppercase" fontSize="xs">
                        Community Pillar
                    </Text>
                    <Icon as={FaLeaf} />
                </Flex>

                <Text fontSize={["xl", "2xl"]} fontWeight="extrabold" fontFamily="'Cinzel', serif" color="#082032">
                    The Wall of Devotion
                </Text>

                {/* Legend */}
                <Flex
                    mt={2}
                    bg="gray.50"
                    p={2}
                    borderRadius="full"
                    border="1px solid #E2E8F0"
                    gap={4}
                    fontSize="xs"
                    justify="center"
                    wrap="wrap"
                >
                    <Flex align="center" gap={2}>
                        <Box w="12px" h="12px" bgGradient="linear(135deg, rgb(212, 175, 55) 0%, rgb(183, 149, 11) 100%)" borderRadius="sm" />
                        <Text fontWeight="bold" color="gray.700">Donated</Text>
                    </Flex>
                    {newDonor && (
                        <Flex align="center" gap={2}>
                            <Box w="12px" h="12px" bg="green.500" borderRadius="sm" boxShadow="0 0 5px green" />
                            <Text fontWeight="bold" color="green.600">You Are Here</Text>
                        </Flex>
                    )}
                </Flex>
            </VStack>

            {/* The Wall Grid Container */}
            <Box
                maxW="1000px"
                mx="auto"
                bg="white"
                borderRadius="lg"
                border="1px solid"
                borderColor="gray.300"
                boxShadow="inner"
                position="relative"
            >
                {/* SCROLLABLE VIEWPORT */}
                <Box
                    p={4}
                    maxH={["300px", "350px"]}
                    overflowY="auto"
                    sx={{
                        '&::-webkit-scrollbar': { width: '6px' },
                        '&::-webkit-scrollbar-track': { background: '#f1f1f1' },
                        '&::-webkit-scrollbar-thumb': { background: '#CBD5E0', borderRadius: '4px' },
                    }}
                >
                    <SimpleGrid columns={[10, 15, 25]} spacing="3px">
                        {grid.map((block, i) => {
                            const isFilled = block !== null;
                            const blockNumber = i + 1;

                            // Check if this is the NEW donor to highlight
                            const isMyBlock = block?.isNew;

                            return (
                                <Tooltip
                                    key={i}
                                    label={isFilled ? (isMyBlock ? `🎉 ${block.name} (You!)` : `${block.name}`) : `Available`}
                                    hasArrow
                                    isOpen={isMyBlock ? true : undefined} // Force open for new donor
                                    bg={isMyBlock ? "green.600" : (isFilled ? "#2C0A0A" : "gray.500")}
                                    color="white"
                                    placement="top"
                                    fontSize="xs"
                                >
                                    <MotionBox
                                        w="100%"
                                        pt="100%"
                                        aria-label={isFilled ? `Donated by ${block.name}` : `Available block ${blockNumber}`}

                                        // Visual Style
                                        bg={isFilled ? "linear-gradient(135deg, rgb(212, 175, 55) 0%, rgb(183, 149, 11) 100%)" : "transparent"}
                                        border={isMyBlock ? "2px solid #38A169" : (isFilled ? "1px solid #B7950B" : "1px dotted #CBD5E0")}
                                        borderRadius="sm"
                                        opacity={isFilled ? 1 : 0.8}
                                        position="relative"

                                        // "Blast" Animation for the new block
                                        animate={isMyBlock ? {
                                            scale: [1, 1.3, 1],
                                            boxShadow: ["0px 0px 0px rgba(0,0,0,0)", "0px 0px 15px rgba(72, 187, 120, 0.8)", "0px 0px 0px rgba(0,0,0,0)"]
                                        } : {}}
                                        transition={isMyBlock ? { duration: 1.5, repeat: Infinity, repeatType: "loop" } : {}}

                                        // Ensure high Z-index for the highlighted block
                                        zIndex={isMyBlock ? 10 : 1}
                                    >
                                        {/* Icon for Big Donors */}
                                        {isFilled && block.isStart && block.amount > 5000 && (
                                            <Icon
                                                as={isMyBlock ? FaCheckCircle : FaUser}
                                                color={isMyBlock ? "white" : "rgba(255,255,255,0.2)"}
                                                position="absolute"
                                                top="50%" left="50%"
                                                transform="translate(-50%, -50%)"
                                                w="60%" h="60%"
                                            />
                                        )}
                                    </MotionBox>
                                </Tooltip>
                            );
                        })}
                    </SimpleGrid>
                </Box>
            </Box>

            {newDonor && (
                <Text mt={4} fontSize="sm" color="green.600" fontWeight="bold">
                    ✨ Your name has been permanently added to Block #{filledCount}!
                </Text>
            )}
        </Box>
    );
};

export default WallOfDevotion;