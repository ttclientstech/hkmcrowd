import React from "react";
import { Box, SimpleGrid, Tooltip, Text, Flex, Icon, Button, VStack } from "@chakra-ui/react";
import { FaUser, FaCheckCircle, FaLeaf } from "react-icons/fa";
import { motion } from "framer-motion";

// Motion component for the "Pulse" effect
const MotionBox = motion(Box);

// 1. HELPER: Convert Donor List to Grid Blocks
const prepareGrid = (donors, totalBlocks = 500) => {
    let grid = Array(totalBlocks).fill(null);
    let currentIndex = 0;

    donors.forEach(donor => {
        // Calculate blocks based on amount (Mock: 1 block = approx 2100)
        const blocksCount = Math.max(1, Math.floor(donor.amount / 2100));

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

const WallOfDevotion_Engraved = () => {
    // DUMMY CLICK HANDLER
    const handleScrollToDonate = () => {
        console.log("Dummy Click: Scroll to donation section");
    };

    // HARDCODED DUMMY DATA (Self-contained)
    const mockDonors = [
        { name: "Rajesh Kumar", amount: 10500, date: "2 mins ago" }, // 5 Blocks
        { name: "Priya Sharma", amount: 2100, date: "1 hour ago" },   // 1 Block
        { name: "Amitabh Bachchan", amount: 23100, date: "5 hours ago" }, // 11 Blocks
        { name: "Anonymous Devotee", amount: 4200, date: "1 day ago" },     // 2 Blocks
        { name: "Suresh & Family", amount: 6300, date: "2 days ago" },
        { name: "Venkatesh P.", amount: 2100, date: "3 days ago" },
    ];

    // Prepare grid with dummy data
    const { grid, filledCount } = prepareGrid(mockDonors, 500);
    const remaining = 500 - filledCount;

    return (
        <Box
            py={10}
            px={[4, 8]}
            bg="white"
            borderRadius="xl"
            boxShadow="xl"
            border="1px solid"
            borderColor="gray.200"
            textAlign="center"
            overflow="hidden"
            position="relative"
            maxW="1200px"
            mx="auto"
        >
            {/* Header Section */}
            <VStack spacing={3} mb={8}>
                <Flex align="center" gap={2} color="#D4AF37">
                    <Icon as={FaLeaf} />
                    <Text fontWeight="bold" letterSpacing="widest" textTransform="uppercase" fontSize="sm">
                        Community Pillar
                    </Text>
                    <Icon as={FaLeaf} />
                </Flex>

                <Text fontSize={["2xl", "3xl"]} fontWeight="extrabold" fontFamily="'Cinzel', serif" color="#2C0A0A">
                    The Foundation of Gratitude
                </Text>

                <Text color="gray.600" maxW="600px" fontSize="md">
                    Every block below represents <b>1 Square Foot</b> of the temple.
                    Hover over the gold bricks to see the devotees who have already inscribed their names in history.
                </Text>

                {/* Legend */}
                <Flex
                    mt={4}
                    bg="gray.50"
                    p={3}
                    borderRadius="full"
                    border="1px solid #E2E8F0"
                    gap={6}
                    fontSize="sm"
                    justify="center"
                    wrap="wrap"
                >
                    <Flex align="center" gap={2}>
                        <Box w="16px" h="16px" bg="#D4AF37" borderRadius="sm" boxShadow="sm" />
                        <Text fontWeight="bold" color="gray.700">Sponsored</Text>
                    </Flex>
                    <Flex align="center" gap={2}>
                        <Box w="16px" h="16px" bg="gray.200" borderRadius="sm" border="1px dashed gray" />
                        <Text fontWeight="bold" color="gray.500">Available</Text>
                    </Flex>
                </Flex>
            </VStack>

            {/* The Wall Grid */}
            <Box
                maxW="1000px"
                mx="auto"
                p={4}
                bg="#1A202C"
                borderRadius="lg"
                border="4px solid #4A5568"
                boxShadow="inner"
                position="relative"
            >
                <Text
                    position="absolute" top="-14px" left="50%" transform="translateX(-50%)"
                    bg="#1A202C" color="gray.400" px={3} fontSize="xs" fontWeight="bold"
                >
                    TEMPLE FLOOR PLAN - 500 SQ FT SECTION
                </Text>

                <SimpleGrid columns={[10, 20, 25]} spacing="2px">
                    {grid.map((block, i) => {
                        const isFilled = block !== null;
                        const isNextAvailable = !isFilled && grid[i-1] !== null;

                        return (
                            <Tooltip
                                key={i}
                                label={isFilled ? `${block.name} (${Math.floor(block.amount/2100)} SqFt)` : "This spot awaits your name"}
                                hasArrow
                                bg={isFilled ? "#2C0A0A" : "gray.600"}
                                color="white"
                                placement="top"
                            >
                                <MotionBox
                                    w="100%"
                                    pt="100%"
                                    bg={isFilled ? "linear-gradient(135deg, #D4AF37 0%, #B7950B 100%)" : "gray.700"}
                                    border={isFilled ? "1px solid #F6E05E" : "1px dashed #4A5568"}
                                    borderRadius="sm"
                                    opacity={isFilled ? 1 : 0.4}
                                    position="relative"

                                    // Pulse Animation for the next available block
                                    animate={isNextAvailable ? { scale: [1, 1.1, 1], borderColor: ["#4A5568", "#CBD5E0", "#4A5568"] } : {}}
                                    transition={isNextAvailable ? { repeat: Infinity, duration: 2 } : {}}
                                >
                                    {isFilled && block.isStart && block.amount > 5000 && (
                                        <Icon
                                            as={FaUser}
                                            color="rgba(0,0,0,0.3)"
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

            {/* Footer Stats & CTA */}
            <Flex
                direction={["column", "row"]}
                justify="center"
                align="center"
                mt={8}
                gap={6}
                p={4}
                bg="orange.50"
                borderRadius="lg"
                border="1px solid"
                borderColor="orange.200"
            >
                <VStack spacing={0} align={["center", "flex-end"]}>
                    <Text fontSize="3xl" fontWeight="bold" color="#C05621">
                        {remaining}
                    </Text>
                    <Text fontSize="xs" color="gray.600" textTransform="uppercase" fontWeight="bold">
                        Square Feet Remaining
                    </Text>
                </VStack>

                <Box h={["1px", "40px"]} w={["100%", "1px"]} bg="orange.200" />

                <VStack spacing={2} align={["center", "flex-start"]}>
                    <Text fontSize="md" fontWeight="medium" color="#2C0A0A">
                        Your name belongs on this wall.
                    </Text>
                    <Button
                        size="sm"
                        colorScheme="orange"
                        variant="solid"
                        rightIcon={<FaCheckCircle />}
                        onClick={handleScrollToDonate}
                        boxShadow="md"
                    >
                        Add My Name Now
                    </Button>
                </VStack>
            </Flex>
        </Box>
    );
};

export default WallOfDevotion_Engraved;