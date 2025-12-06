import React, { useEffect, useState } from "react";
import { Box, SimpleGrid, Tooltip, Text, Flex, Icon, VStack } from "@chakra-ui/react";
import { FaUser, FaLeaf, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { fetchAllContributers } from "../../utils/apiCall";

const MotionBox = motion(Box);
const SQFT_PRICE = 5001;

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
            py={8}
            px={[2, 4]}
            bg="white"
            textAlign="center"
            overflow="hidden"
            position="relative"
            maxW="1200px"
            mx="auto"
        >
            {/* Header */}
            <VStack spacing={3} mb={6}>
                <Flex align="center" gap={2} color="#D4AF37">
                    <Icon as={FaLeaf} />
                    <Text
                        fontWeight="bold"
                        letterSpacing="widest"
                        textTransform="uppercase"
                        fontSize="xs"
                    >
                        Community Pillar
                    </Text>
                    <Icon as={FaLeaf} />
                </Flex>

                <Text
                    fontSize={["xl", "2xl"]}
                    fontWeight="extrabold"
                    fontFamily="'Cinzel', serif"
                    color="#082032"
                >
                    The Wall of Devotion
                </Text>

                {/* 🎉 Message */}
                {newDonor && newDonor.amount >= SQFT_PRICE && (
                    <Box
                        mt={2}
                        mb={2}
                        p={3}
                        bg="green.50"
                        borderRadius="lg"
                        border="1px dashed"
                        borderColor="green.300"
                        w="full"
                        maxW="600px"
                    >
                        <Text fontSize="md" fontWeight="bold" color="green.700">
                            🎉 Congratulations!
                        </Text>
                        <Text fontSize="sm" color="green.800" mt={1}>
                            Your name has been permanently displayed starting at Block #
                            {startBlockNumber}!
                        </Text>
                    </Box>
                )}

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
                        <Box
                            w="12px"
                            h="12px"
                            bgGradient="linear(135deg, rgb(212, 175, 55) 0%, rgb(183, 149, 11) 100%)"
                            borderRadius="sm"
                        />
                        <Text fontWeight="bold" color="gray.700">
                            Donated
                        </Text>
                    </Flex>
                    {newDonor && newDonor.amount >= SQFT_PRICE && (
                        <Flex align="center" gap={2}>
                            <Box
                                w="12px"
                                h="12px"
                                bg="green.500"
                                borderRadius="sm"
                                boxShadow="0 0 5px green"
                            />
                            <Text fontWeight="bold" color="green.600">
                                You Are Here
                            </Text>
                        </Flex>
                    )}
                </Flex>
            </VStack>

            {/* Wall Grid */}
            <Box
                maxW="1000px"
                mx="auto"
                bg="white"
                borderRadius="lg"
                border="1px solid"
                borderColor="gray.300"
                boxShadow="inner"
            >
                <Box
                    p={4}
                    maxH={["300px", "350px"]}
                    overflowY="auto"
                    sx={{
                        "&::-webkit-scrollbar": { width: "6px" },
                        "&::-webkit-scrollbar-thumb": {
                            background: "#CBD5E0",
                            borderRadius: "4px",
                        },
                    }}
                >
                    <SimpleGrid columns={[10, 15, 25]} spacing="3px">
                        {grid.map((block, i) => {
                            const isFilled = block !== null;
                            const blockNumber = i + 1;
                            const isMyBlock = block?.isNew;
                            const showTooltip = !isMyBlock || (isMyBlock && block.isStart);

                            const tooltipText = isFilled
                                ? isMyBlock
                                    ? `🎉 ${block.name} (You!) - ${block.sqft} Sq. Ft.`
                                    : `${block.name} - ${block.sqft} Sq. Ft.`
                                : "Available";

                            return (
                                <Tooltip
                                    key={i}
                                    label={tooltipText}
                                    hasArrow
                                    isOpen={isMyBlock && block.isStart ? true : undefined}
                                    bg={isMyBlock ? "green.600" : isFilled ? "#2C0A0A" : "gray.500"}
                                    color="white"
                                    placement="top"
                                    fontSize="xs"
                                    isDisabled={!showTooltip}
                                >
                                    <MotionBox
                                        w="100%"
                                        pt="100%"
                                        bg={
                                            isMyBlock
                                                ? "linear-gradient(135deg, #38A169, #2F855A)"
                                                : isFilled
                                                    ? "linear-gradient(135deg, rgb(212, 175, 55) 0%, rgb(183, 149, 11) 100%)"
                                                    : "transparent"
                                        }
                                        border={
                                            isMyBlock
                                                ? "2px solid #38A169"
                                                : isFilled
                                                    ? "1px solid #B7950B"
                                                    : "1px dotted #CBD5E0"
                                        }
                                        borderRadius="sm"
                                        position="relative"
                                        animate={
                                            isMyBlock
                                                ? {
                                                    scale: [1, 1.3, 1],
                                                    boxShadow: [
                                                        "0px 0px 0px rgba(0,0,0,0)",
                                                        "0px 0px 15px rgba(72, 187, 120, 0.8)",
                                                        "0px 0px 0px rgba(0,0,0,0)",
                                                    ],
                                                }
                                                : {}
                                        }
                                        transition={
                                            isMyBlock
                                                ? { duration: 1.5, repeat: Infinity, repeatType: "loop" }
                                                : {}
                                        }
                                    >
                                        <Text
                                            position="absolute"
                                            top="50%"
                                            left="50%"
                                            transform="translate(-50%, -50%)"
                                            fontSize={["6px", "8px"]}
                                            fontWeight="bold"
                                            color={isFilled ? "whiteAlpha.700" : "gray.400"}
                                            opacity={0.8}
                                            userSelect="none"
                                        >
                                            {blockNumber}
                                        </Text>

                                        {isFilled && block.isStart && block.amount > SQFT_PRICE && (
                                            <Icon
                                                as={isMyBlock ? FaCheckCircle : FaUser}
                                                color={isMyBlock ? "white" : "rgba(255,255,255,0.2)"}
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
        </Box>
    );
};

export default WallOfDevotion;
