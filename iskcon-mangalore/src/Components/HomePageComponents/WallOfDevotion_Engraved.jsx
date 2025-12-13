import React, { useEffect, useState } from "react";
import { Box, SimpleGrid, Tooltip, Text, Flex, Icon, Button, VStack, Badge } from "@chakra-ui/react";
import { FaUser, FaCheckCircle, FaLeaf, FaCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { fetchAllContributers } from "../../utils/apiCall";

const MotionBox = motion(Box);
const MotionText = motion(Text);
const SQFT_PRICE = 5001;

// Theme Constants to match Campaigner Page
const NAVY = "#082032";
const GOLD = "#D4AF37";
const BEIGE = "#F9F5F0";

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAllContributers();
                const validDonors = data.filter(
                    (d) => d?.finalpaymentstatus === "captured" && d.amount >= SQFT_PRICE
                );
                const processed = validDonors.map((d) => ({
                    name: d?.isanonymous ? "Anonymous" : d?.username,
                    amount: Math.round(d.amount),
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
            py={12}
            px={[2, 4]}
            // Active Background: Subtle gradient to give depth vs flat white
            bgGradient="linear(to-b, white, #F9F5F0)"
            textAlign="center"
            overflow="hidden"
            position="relative"
            maxW="1200px"
            mx="auto"
        >
            {/* Header Section */}
            <VStack spacing={2} mb={8}>
                {/* Active "Live" Badge */}
                <Badge
                    colorScheme="red"
                    variant="subtle"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="xs"
                    display="flex"
                    alignItems="center"
                    gap={2}
                    mb={1}
                >
                    <MotionBox
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <Icon as={FaCircle} boxSize={2} color="red.500" />
                    </MotionBox>
                    LIVE DONATION UPDATES
                </Badge>

                {/* Active Title */}
                <MotionText
                    fontSize={["3xl", "4xl"]}
                    fontWeight="800"
                    fontFamily="'Poppins', sans-serif"
                    color={NAVY}
                    lineHeight="1.2"
                >
                    Claim Your Spot on the <br />
                    <Text as="span" color={GOLD} textShadow="1px 1px 0px rgba(0,0,0,0.1)">
                        Wall of Devotion
                    </Text>
                </MotionText>

                <Text color="gray.600" maxW="600px" fontSize={["sm", "md"]} mt={2} fontFamily="'Satoshi', sans-serif">
                    <Text as="span" fontWeight="bold" color="green.600">Green blocks are waiting for you.</Text> Gold blocks are history written forever. Tap a block to begin.
                </Text>

                {/* Legend */}
                <Flex
                    mt={5}
                    bg="white"
                    p={3}
                    borderRadius="full"
                    boxShadow="sm"
                    gap={6}
                    fontSize="xs"
                    justify="center"
                    wrap="wrap"
                    border="1px solid"
                    borderColor="gray.100"
                >
                    <Flex align="center" gap={2}>
                        <Box
                            w="16px" h="16px"
                            bgGradient="linear(135deg, #F3E5AB 0%, #CBA135 100%)" // Premium Gold
                            borderRadius="sm"
                            boxShadow="inset 0 0 2px rgba(255,255,255,0.5)"
                        />
                        <Text fontWeight="bold" color={NAVY} fontFamily="'Satoshi', sans-serif">Taken (Permanent)</Text>
                    </Flex>
                    <Flex align="center" gap={2}>
                        <Box
                            w="16px" h="16px"
                            bg="transparent"
                            border="1px dashed #38A169"
                            borderRadius="sm"
                        />
                        <Text fontWeight="bold" color="green.600" fontFamily="'Satoshi', sans-serif">Available (Join Now)</Text>
                    </Flex>
                </Flex>
            </VStack>

            {/* Grid Container */}
            <Box
                maxW="1000px"
                mx="auto"
                bg="white"
                borderRadius="xl"
                // Active Border: Gold glow instead of gray line
                border="2px solid"
                borderColor={`${GOLD}40`}
                boxShadow="0 10px 40px -10px rgba(212, 175, 55, 0.15)"
                position="relative"
                p={1}
            >
                {/* Phase Badge */}
                <Box
                    position="absolute"
                    top="-14px"
                    left="50%"
                    transform="translateX(-50%)"
                    zIndex={5}
                    bg={NAVY}
                    color={GOLD}
                    px={5}
                    py={1}
                    fontSize="xs"
                    fontWeight="800"
                    borderRadius="full"
                    fontFamily="'Poppins', sans-serif"
                    letterSpacing="wider"
                    boxShadow="md"
                >
                    PHASE 1: FILLING FAST
                </Box>

                <Box
                    p={4}
                    pt={6}
                    maxH={["350px", "400px", "450px"]}
                    overflowY="auto"
                    sx={{
                        "&::-webkit-scrollbar": { width: "6px" },
                        "&::-webkit-scrollbar-track": { background: "transparent" },
                        "&::-webkit-scrollbar-thumb": { background: "#CBD5E0", borderRadius: "4px" },
                    }}
                >
                    <SimpleGrid columns={[10, 15, 25]} spacing="4px">
                        {grid.map((block, i) => {
                            const isFilled = block !== null;
                            const blockNumber = i + 1;
                            // Identify the "Next Available" block to animate it
                            const isNextAvailable = !isFilled && (i === 0 || grid[i - 1] !== null);

                            return (
                                <Tooltip
                                    key={i}
                                    label={
                                        isFilled
                                            ? `${block.name} • ${Math.round(block.amount / SQFT_PRICE)} SqFt`
                                            : `Block #${blockNumber}: Click to Donate`
                                    }
                                    hasArrow
                                    bg={isFilled ? NAVY : "green.600"}
                                    color="white"
                                    placement="top"
                                    fontSize="xs"
                                    fontFamily="'Satoshi', sans-serif"
                                >
                                    <MotionBox
                                        w="100%"
                                        pt="100%"
                                        role="button"
                                        aria-label={isFilled ? `Donated by ${block.name}` : `Available block ${blockNumber}`}
                                        // 🎨 Active Style Logic
                                        bg={
                                            isFilled
                                                //  - Simulating rich gold texture
                                                ? "linear-gradient(135deg, #F3E5AB 0%, #CBA135 50%, #8C6A0A 100%)"
                                                : "rgba(56, 161, 105, 0.02)" // Very faint green
                                        }
                                        // 🎨 Dashed border for empty slots triggers "Gap Theory"
                                        border={isFilled ? "1px solid #B8860B" : "1px dashed #A0AEC0"}
                                        borderRadius="sm"
                                        position="relative"
                                        cursor={isFilled ? "default" : "pointer"}
                                        onClick={!isFilled ? handleScrollToDonate : undefined}

                                        // 🎬 Animation: Pulse ONLY the next available slots to guide the eye
                                        animate={
                                            isNextAvailable
                                                ? {
                                                    boxShadow: ["0 0 0 0 rgba(56, 161, 105, 0.4)", "0 0 0 4px rgba(56, 161, 105, 0)"],
                                                    borderColor: ["#38A169", "#2F855A", "#38A169"],
                                                }
                                                : {}
                                        }
                                        transition={isNextAvailable ? { repeat: Infinity, duration: 2 } : {}}

                                        _hover={{
                                            transform: "scale(1.15)",
                                            zIndex: 10,
                                            // On hover, empty blocks turn Solid Green (Action feedback)
                                            bg: isFilled ? "" : "green.50",
                                            borderColor: isFilled ? "white" : "green.500",
                                            borderStyle: "solid",
                                            boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
                                        }}
                                        // Inner bevel for filled blocks
                                        boxShadow={isFilled ? "inset 1px 1px 0px rgba(255,255,255,0.3), inset -1px -1px 0px rgba(0,0,0,0.2)" : "none"}
                                    >
                                        <Flex position="absolute" top="0" left="0" w="100%" h="100%" align="center" justify="center">
                                            {/* Show number only on empty blocks to reduce noise, unless hovered */}
                                            {!isFilled && (
                                                <Text
                                                    fontSize={["7px", "8px", "9px"]}
                                                    color="green.700"
                                                    fontWeight="bold"
                                                    opacity={0.5}
                                                >
                                                    {blockNumber}
                                                </Text>
                                            )}
                                        </Flex>

                                        {isFilled && block.isStart && (
                                            <Icon
                                                as={FaCheckCircle}
                                                color="rgba(255,255,255,0.4)"
                                                position="absolute"
                                                top="50%"
                                                left="50%"
                                                transform="translate(-50%, -50%)"
                                                w="50%"
                                                h="50%"
                                            />
                                        )}
                                    </MotionBox>
                                </Tooltip>
                            );
                        })}
                    </SimpleGrid>
                </Box>
            </Box>

            {/* Footer / Call to Action */}
            <MotionBox
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                mt={8}
            >
                <Flex
                    direction={["column", "row"]}
                    justify="center"
                    align="center"
                    gap={[4, 8]}
                    p={6}
                    bgGradient="linear(to-r, orange.50, white, orange.50)"
                    borderRadius="xl"
                    border="1px solid"
                    borderColor="orange.200"
                    maxW="800px"
                    mx="auto"
                    boxShadow="sm"
                >
                    <VStack spacing={0} align={["center", "flex-end"]}>
                        <Text fontSize={["3xl", "4xl"]} fontWeight="900" color="#C05621" lineHeight="1">
                            {remaining}
                        </Text>
                        <Text fontSize="xs" color="gray.500" fontWeight="bold" letterSpacing="wide">
                            BLOCKS LEFT
                        </Text>
                    </VStack>

                    <Box h={["1px", "50px"]} w={["100%", "1px"]} bg="orange.200" opacity={0.5} />

                    <VStack spacing={3} align={["center", "flex-start"]}>
                        <MotionBox animate={{ scale: [1, 1.02, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                            <Button
                                size="lg"
                                bgGradient={`linear(to-r, ${GOLD}, #C59D18)`}
                                color={NAVY}
                                rightIcon={<FaCheckCircle />}
                                onClick={handleScrollToDonate}
                                boxShadow="0 4px 15px rgba(212, 175, 55, 0.4)"
                                _hover={{
                                    transform: "translateY(-2px)",
                                    boxShadow: "0 6px 20px rgba(212, 175, 55, 0.6)"
                                }}
                                fontWeight="800"
                                borderRadius="full"
                                px={8}
                            >
                                Secure Your Block Now
                            </Button>
                        </MotionBox>
                        <Text fontSize="xs" fontWeight="600" color="gray.500">
                            Join {filledCount} other devotees in this historic seva.
                        </Text>
                    </VStack>
                </Flex>
            </MotionBox>
        </Box>
    );
};

export default WallOfDevotion_Engraved;