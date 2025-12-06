import React, { useEffect, useState } from "react";
import { Box, SimpleGrid, Tooltip, Text, Flex, Icon, Button, VStack } from "@chakra-ui/react";
import { FaUser, FaCheckCircle, FaLeaf } from "react-icons/fa";
import { motion } from "framer-motion";
import { fetchAllContributers } from "../../utils/apiCall";

const MotionBox = motion(Box);
const SQFT_PRICE = 5001; // 1 SqFt = ₹5001

// Helper: Convert Donor List to Grid Blocks
const prepareGrid = (donors, totalBlocks = 500) => {
    let grid = Array(totalBlocks).fill(null);
    let currentIndex = 0;

    donors.forEach((donor) => {
        const blocksCount = Math.max(1, Math.floor(donor.amount / SQFT_PRICE));

        for (let i = 0; i < blocksCount; i++) {
            if (currentIndex < totalBlocks) {
                grid[currentIndex] = {
                    ...donor,
                    isStart: i === 0,
                    isCluster: blocksCount > 1,
                };
                currentIndex++;
            }
        }
    });
    return { grid, filledCount: currentIndex };
};

const WallOfDevotion_Engraved = () => {
    const [donors, setDonors] = useState([]);

    const handleScrollToDonate = () => {
        const donationSection = document.getElementById("donation-section");
        if (donationSection) donationSection.scrollIntoView({ behavior: "smooth" });
    };

    // ✅ Fetch data from backend instead of using mockDonors
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAllContributers();

                // ✅ Only keep donors with captured payments and at least 1 SqFt
                const validDonors = data.filter(
                    (d) => d?.finalpaymentstatus === "captured" && d.amount >= SQFT_PRICE
                );

                // ✅ Convert to SqFt and round off
                const processed = validDonors.map((d) => ({
                    name: d?.isanonymous ? "Anonymous" : d?.username,
                    amount: Math.round(d.amount), // Keep rounded amount
                    sqft: Math.round(d.amount / SQFT_PRICE),
                    createdate: d?.createdate,
                }));

                setDonors(processed);
            } catch (err) {
                console.error("Error fetching contributors:", err);
            }
        };
        fetchData();
    }, []);

    const { grid, filledCount } = prepareGrid(donors, 500);
    const remaining = 500 - filledCount;

    return (
        <Box
            py={10}
            px={[2, 4]}
            bg="white"
            textAlign="center"
            overflow="hidden"
            position="relative"
            maxW="1200px"
            mx="auto"
        >
            {/* Header Section */}
            <VStack spacing={3} mb={6}>
                <Flex align="center" gap={2} color="#D4AF37">
                    <Icon as={FaLeaf} />
                    <Text fontWeight="bold" letterSpacing="widest" textTransform="uppercase" fontSize="sm">
                        Community Pillar
                    </Text>
                    <Icon as={FaLeaf} />
                </Flex>

                <Text fontSize={["2xl", "3xl"]} fontWeight="extrabold" fontFamily="'Poppins', sans-serif" color="#082032">
                    The Wall of Devotion
                </Text>

                <Text color="black" maxW="600px" fontSize="md">
                    Each block below represents <b>1 Sq. Ft.</b> of the temple. Hover (or tap) over the gold bricks to see the devotees who have already inscribed their names in history.
                </Text>

                <Flex
                    mt={4}
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
                        <Box w="14px" h="14px" bgGradient="linear(135deg, rgb(212, 175, 55) 0%, rgb(183, 149, 11) 100%)" borderRadius="sm" />
                        <Text fontWeight="bold" color="gray.700">Donated</Text>
                    </Flex>
                    <Flex align="center" gap={2}>
                        <Box w="14px" h="14px" bg="gray.100" border="1px dotted green" borderRadius="sm" />
                        <Text fontWeight="bold" color="green.700">Available</Text>
                    </Flex>
                </Flex>
            </VStack>

            {/* Grid Container */}
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
                <Text
                    position="absolute"
                    top="-10px"
                    left="50%"
                    transform="translateX(-50%)"
                    zIndex={2}
                    bg="gray.100"
                    color="gray.500"
                    px={3}
                    fontSize="xs"
                    fontWeight="bold"
                    border="1px solid"
                    borderColor="gray.300"
                    borderRadius="full"
                >
                    FINAL PHASE: BLOCK 1 - 500 SQFT
                </Text>

                <Box
                    p={4}
                    mt={4}
                    maxH={["350px", "400px", "450px"]}
                    overflowY="auto"
                    sx={{
                        "&::-webkit-scrollbar": { width: "8px", height: "8px" },
                        "&::-webkit-scrollbar-track": { background: "#f1f1f1", borderRadius: "4px" },
                        "&::-webkit-scrollbar-thumb": { background: "#CBD5E0", borderRadius: "4px" },
                        "&::-webkit-scrollbar-thumb:hover": { background: "#A0AEC0" },
                    }}
                >
                    <SimpleGrid columns={[10, 15, 25]} spacing="3px">
                        {grid.map((block, i) => {
                            const isFilled = block !== null;
                            const blockNumber = i + 1;
                            const isNextAvailable = !isFilled && grid[i - 1] !== null;

                            return (
                                <Tooltip
                                    key={i}
                                    label={
                                        isFilled
                                            ? `#${blockNumber}: ${block.name} (${Math.round(block.amount / SQFT_PRICE)} SqFt)`
                                            : `#${blockNumber}: Available for Sponsorship`
                                    }
                                    hasArrow
                                    bg={isFilled ? "#2C0A0A" : "green.600"}
                                    color="white"
                                    placement="top"
                                    fontSize="xs"
                                >
                                    <MotionBox
                                        w="100%"
                                        pt="100%"
                                        tabIndex={0}
                                        role="button"
                                        aria-label={isFilled ? `Donated by ${block.name}` : `Available block ${blockNumber}`}
                                        bg={
                                            isFilled
                                                ? "linear-gradient(135deg, rgb(212, 175, 55) 0%, rgb(183, 149, 11) 100%)"
                                                : "transparent"
                                        }
                                        border={isFilled ? "1px solid #ac0606" : "1px solid #38A169"}
                                        borderRadius="sm"
                                        opacity={isFilled ? 1 : 0.8}
                                        position="relative"
                                        cursor="pointer"
                                        onClick={!isFilled ? handleScrollToDonate : undefined}
                                        animate={
                                            isNextAvailable
                                                ? {
                                                    scale: [1, 1.05, 1],
                                                    borderColor: ["#38A169", "#2F855A", "#38A169"],
                                                }
                                                : {}
                                        }
                                        transition={isNextAvailable ? { repeat: Infinity, duration: 2 } : {}}
                                        _hover={{
                                            transform: "scale(1.1)",
                                            zIndex: 10,
                                            borderColor: isFilled ? "white" : "green.500",
                                            bg: isFilled ? "" : "white",
                                        }}
                                        _focus={{
                                            transform: "scale(1.1)",
                                            zIndex: 10,
                                            borderColor: isFilled ? "white" : "green.500",
                                            outline: "none",
                                        }}
                                    >
                                        <Flex position="absolute" top="0" left="0" w="100%" h="100%" align="center" justify="center">
                                            <Text
                                                fontSize={["8px", "9px", "10px"]}
                                                color={isFilled ? "whiteAlpha.800" : "green.700"}
                                                fontWeight="bold"
                                                opacity={isFilled ? 0.6 : 0.4}
                                                userSelect="none"
                                            >
                                                {blockNumber}
                                            </Text>
                                        </Flex>

                                        {isFilled && block.isStart && block.amount > SQFT_PRICE && (
                                            <Icon
                                                as={FaUser}
                                                color="rgba(255,255,255,0.2)"
                                                position="absolute"
                                                top="50%"
                                                left="50%"
                                                transform="translate(-50%, -50%)"
                                                w="60%"
                                                h="60%"
                                            />
                                        )}
                                    </MotionBox>
                                </Tooltip>
                            );
                        })}
                    </SimpleGrid>
                </Box>
            </Box>

            {/* Footer */}
            <Flex
                direction={["column", "row"]}
                justify="center"
                align="center"
                mt={6}
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
                    <Button
                        size="sm"
                        colorScheme="orange"
                        variant="solid"
                        rightIcon={<FaCheckCircle />}
                        onClick={handleScrollToDonate}
                        boxShadow="md"
                    >
                        Add Your Name to the Wall
                    </Button>
                    <Text fontSize="sm" fontWeight="medium" color="#2C0A0A" fontStyle="italic">
                        Create a History. Leave a Legacy.
                    </Text>
                </VStack>
            </Flex>
        </Box>
    );
};

export default WallOfDevotion_Engraved;
