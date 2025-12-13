import React, { useEffect, useState } from "react";
import { Box, SimpleGrid, Tooltip, Text, Flex, Icon, VStack } from "@chakra-ui/react";
import { FaUser, FaLeaf, FaCheckCircle, FaAward } from "react-icons/fa";
import { motion } from "framer-motion";
import { fetchAllContributers } from "../../utils/apiCall";

const MotionBox = motion(Box);
const SQFT_PRICE = 5001;

// --- THEME CONSTANTS ---
const GOLD_GRADIENT = "linear-gradient(135deg, #F3E5AB 0%, #CBA135 50%, #8C6A0A 100%)";
const EMERALD_GRADIENT = "linear-gradient(135deg, #68D391 0%, #38A169 50%, #276749 100%)";
const EMPTY_BLOCK_BG = "rgba(255, 252, 242, 0.5)";
const FRAME_BORDER_COLOR = "#CBA135";

// Build independent grid for each donor (no shared references)
const prepareGrid = (donors, totalBlocks = 500) => {
    const grid = Array(totalBlocks).fill(null);
    let currentIndex = 0;

    donors.forEach((donor) => {
        const amount = donor.amount ? parseFloat(donor.amount) : SQFT_PRICE;
        const blocksCount = Math.max(1, Math.floor(amount / SQFT_PRICE));

        // Clone each donor per block to avoid mutation
        for (let i = 0; i < blocksCount; i++) {
            if (currentIndex < totalBlocks) {
                grid[currentIndex] = {
                    ...donor,
                    isStart: i === 0,
                    blockIndex: currentIndex,
                };
                currentIndex++;
            }
        }
    });

    return { grid, filledCount: currentIndex };
};

const WallOfDevotion = ({ newDonor }) => {
    const [existingDonors, setExistingDonors] = useState([]);

    useEffect(() => {
        const loadDonors = async () => {
            try {
                const data = await fetchAllContributers();

                const valid = data.filter(
                    (d) => d?.finalpaymentstatus === "captured" && d?.amount >= SQFT_PRICE
                );

                const formatted = valid.map((d) => ({
                    name: d?.isanonymous ? "Anonymous" : d?.username,
                    amount: Math.round(d.amount),
                    sqft: Math.round(d.amount / SQFT_PRICE),
                    orderid: d?.orderid,
                }));

                setExistingDonors(formatted);
            } catch (err) {
                console.error("Error fetching contributors:", err);
            }
        };
        loadDonors();
    }, []);

    // Check for existing donor
    const matchingDonor =
        newDonor &&
        existingDonors.find(
            (d) =>
                d?.orderid &&
                newDonor?.order_id &&
                d.orderid === newDonor.order_id &&
                d.amount >= SQFT_PRICE
        );

    // Build donor list (add new if not existing)
    const allDonors =
        newDonor && newDonor.amount >= SQFT_PRICE
            ? matchingDonor
                ? existingDonors.map((d) =>
                    d.orderid === newDonor.order_id ? { ...d, isNew: true } : { ...d }
                )
                : [
                    ...existingDonors.map((d) => ({ ...d })), // clone all donors safely
                    {
                        ...newDonor,
                        sqft: Math.round(newDonor.amount / SQFT_PRICE),
                        isNew: true,
                    },
                ]
            : existingDonors.map((d) => ({ ...d }));

    // Prepare wall grid
    const { grid, filledCount } = prepareGrid(allDonors, 500);

    if (newDonor && newDonor.amount < SQFT_PRICE) return null;

    // Find first block index for this new donor (safe lookup)
    const startBlockIndex = grid.findIndex((b) => b?.isNew && b?.isStart);
    const startBlockNumber =
        startBlockIndex >= 0 ? startBlockIndex + 1 : filledCount;

    return (
        <Box
            py={10}
            px={[4, 6]}
            // ✅ Richer background gradient
            bgGradient="linear(to-b, #FFFCF2, #FFF5E1)"
            textAlign="center"
            overflow="hidden"
            position="relative"
            maxW="1200px"
            mx="auto"
            borderRadius="3xl"
            boxShadow="0 10px 30px rgba(203, 161, 53, 0.2)" // Soft gold shadow
            border="1px solid"
            borderColor="orange.100"
        >
            {/* Header */}
            <VStack spacing={4} mb={8}>
                <Flex align="center" gap={2} color={FRAME_BORDER_COLOR}>
                    <Icon as={FaAward} w={5} h={5} />
                    <Text
                        fontWeight="bold"
                        letterSpacing="widest"
                        textTransform="uppercase"
                        fontSize="sm"
                    >
                        Eternal Legacy
                    </Text>
                    <Icon as={FaAward} w={5} h={5} />
                </Flex>

                <Text
                    fontSize={["2xl", "4xl"]}
                    fontWeight="extrabold"
                    fontFamily="'Cinzel', serif"
                    // ✅ Richer title color with subtle shadow
                    color="#3D2B0F"
                    textShadow="1px 1px 2px rgba(203, 161, 53, 0.3)"
                >
                    The Wall of Devotion
                </Text>

                {/* 🎉 Message - Styled like a plaque */}
                {newDonor && newDonor.amount >= SQFT_PRICE && (
                    <Box
                        mt={3}
                        mb={3}
                        p={5}
                        // ✅ Changed from simple green box to glowing gold/emerald plaque
                        bgGradient="linear(to-r, orange.50, green.50)"
                        borderRadius="xl"
                        borderTop="3px solid"
                        borderBottom="3px solid"
                        borderColor="green.400"
                        boxShadow="0 4px 15px rgba(56, 161, 105, 0.15)"
                        w="full"
                        maxW="650px"
                        position="relative"
                    >
                        <Icon as={FaCheckCircle} color="green.500" w={8} h={8} position="absolute" top="-15px" left="50%" transform="translateX(-50%)" bg="white" borderRadius="full" />
                        <Text fontSize="lg" fontWeight="800" color="green.800" fontFamily="'Cinzel', serif" mt={2}>
                            🎉 Congratulations!
                        </Text>
                        <Text fontSize="md" color="green.900" mt={1} fontWeight="medium">
                            Your name has been permanently enshrined starting at Block #
                            {startBlockNumber}!
                        </Text>
                    </Box>
                )}

                {/* Legend - Styled with glowing examples */}
                <Flex
                    mt={4}
                    bg="whiteAlpha.800"
                    p={3}
                    borderRadius="full"
                    border="1px solid"
                    borderColor="orange.200"
                    boxShadow="sm"
                    gap={6}
                    fontSize="sm"
                    justify="center"
                    wrap="wrap"
                >
                    <Flex align="center" gap={3}>
                        <Box
                            w="16px"
                            h="16px"
                            bgGradient={GOLD_GRADIENT}
                            borderRadius="sm"
                            boxShadow="0 0 5px rgba(203, 161, 53, 0.5)"
                        />
                        <Text fontWeight="bold" color="#8C6A0A">
                            Vested Patron
                        </Text>
                    </Flex>
                    {newDonor && newDonor.amount >= SQFT_PRICE && (
                        <Flex align="center" gap={3}>
                            <Box
                                w="16px"
                                h="16px"
                                bgGradient={EMERALD_GRADIENT}
                                borderRadius="sm"
                                boxShadow="0 0 8px rgba(56, 161, 105, 0.8)"
                                border="1px solid #fff"
                            />
                            <Text fontWeight="bold" color="green.700">
                                Your Contribution
                            </Text>
                        </Flex>
                    )}
                </Flex>
            </VStack>

            {/* Wall Grid Frame */}
            <Box
                maxW="1000px"
                mx="auto"
                // ✅ Ornate frame styling
                bg="#FFFCF2" // Light cream interior
                borderRadius="xl"
                border="4px solid"
                borderColor={FRAME_BORDER_COLOR}
                boxShadow={`inset 0 0 20px rgba(140, 106, 10, 0.15), 0 10px 25px -5px rgba(0,0,0,0.1)`} // Inner depth + outer shadow
                p={2}
            >
                <Box
                    p={4}
                    maxH={["350px", "450px"]}
                    overflowY="auto"
                    // ✅ Custom scrollbar to match theme
                    sx={{
                        "&::-webkit-scrollbar": { width: "8px" },
                        "&::-webkit-scrollbar-track": { background: "#FFF5E1", borderRadius: "4px" },
                        "&::-webkit-scrollbar-thumb": {
                            background: "linear-gradient(to-b, #CBA135, #8C6A0A)",
                            borderRadius: "4px",
                            border: "2px solid #FFF5E1"
                        },
                    }}
                >
                    <SimpleGrid columns={[10, 15, 25]} spacing="4px">
                        {grid.map((block, i) => {
                            const isFilled = block !== null;
                            const blockNumber = i + 1;
                            const isMyBlock = block?.isNew;
                            const showTooltip = !isMyBlock || (isMyBlock && block.isStart);

                            const tooltipText = isFilled
                                ? isMyBlock
                                    ? `🎉 ${block.name} (You!) - ${block.sqft} Sq. Ft.`
                                    : `${block.name} - ${block.sqft} Sq. Ft.`
                                : "Available for Seva";

                            return (
                                <Tooltip
                                    key={i}
                                    label={tooltipText}
                                    hasArrow
                                    isOpen={isMyBlock && block.isStart ? true : undefined}
                                    // ✅ Richer tooltip theme
                                    bg={isMyBlock ? "green.700" : isFilled ? "#3D2B0F" : "gray.600"}
                                    color="white"
                                    placement="top"
                                    fontSize="sm"
                                    fontWeight="bold"
                                    p={2}
                                    borderRadius="md"
                                    isDisabled={!showTooltip}
                                >
                                    <MotionBox
                                        w="100%"
                                        pt="100%"
                                        // ✅ Updated Backgrounds for richer feel
                                        bg={
                                            isMyBlock
                                                ? EMERALD_GRADIENT
                                                : isFilled
                                                    ? GOLD_GRADIENT
                                                    : EMPTY_BLOCK_BG
                                        }
                                        // ✅ Updated Borders for bevel effect
                                        border={
                                            isMyBlock
                                                ? "2px solid #9AE6B4" // Bright emerald border
                                                : isFilled
                                                    ? "1px solid #FBD38D" // Bright gold border
                                                    : `1px solid ${"orange.100"}` // Subtle empty border
                                        }
                                        borderRadius="sm"
                                        position="relative"
                                        // ✅ Added subtle inner shadow for depth to all blocks
                                        boxShadow={isFilled ? "inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.1)" : "none"}
                                        animate={
                                            isMyBlock
                                                ? {
                                                    scale: [1, 1.15, 1], // Slightly more pronounced pulse
                                                    boxShadow: [
                                                        "0px 0px 0px rgba(56, 161, 105, 0)",
                                                        "0px 0px 20px rgba(56, 161, 105, 0.7)", // Stronger emerald glow
                                                        "0px 0px 0px rgba(56, 161, 105, 0)",
                                                    ],
                                                    zIndex: [1, 10, 1]
                                                }
                                                : {}
                                        }
                                        transition={
                                            isMyBlock
                                                ? { duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
                                                : {}
                                        }
                                    >
                                        <Text
                                            position="absolute"
                                            top="50%"
                                            left="50%"
                                            transform="translate(-50%, -50%)"
                                            fontSize={["7px", "9px"]}
                                            fontWeight="900"
                                            // ✅ Clearer contrast for numbers
                                            color={isFilled ? (isMyBlock ? "white" : "#5C4208") : "orange.200"}
                                            opacity={isFilled ? 1 : 0.8}
                                            userSelect="none"
                                            fontFamily="'Cinzel', serif"
                                        >
                                            {blockNumber}
                                        </Text>

                                        {/* ✅ Icon is now subtle watermark style */}
                                        {isFilled && block.isStart && block.amount > SQFT_PRICE && (
                                            <Icon
                                                as={isMyBlock ? FaCheckCircle : FaUser}
                                                color={isMyBlock ? "whiteAlpha.500" : "#8C6A0A30"}
                                                position="absolute"
                                                top="50%"
                                                left="50%"
                                                transform="translate(-50%, -50%)"
                                                w="70%"
                                                h="70%"
                                            />
                                        )}
                                    </MotionBox>
                                </Tooltip>
                            );
                        })}
                    </SimpleGrid>
                </Box>
            </Box>
        </Box>
    );
};

export default WallOfDevotion;