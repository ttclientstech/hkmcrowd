import React, { useEffect, useState } from "react";
import { Box, SimpleGrid, Tooltip, Text, Flex, Icon, Button, VStack, Badge } from "@chakra-ui/react";
import { FaCheckCircle, FaCircle, FaChevronDown } from "react-icons/fa";
import { motion } from "framer-motion";
import { fetchAllContributers } from "../../utils/apiCall";
import { useNavigate, useParams } from "react-router-dom";

const MotionBox = motion(Box);
const MotionText = motion(Text);
const SQFT_PRICE = 5000;

// Theme Constants
const NAVY = "#082032";
const GOLD = "#D4AF37";

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

const WallOfDevotion_Engraved = ({ getSingleUser }) => {
    const [donors, setDonors] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    // ✅ State to control tooltips manually (Fixes mobile view issue)
    const [activeBlock, setActiveBlock] = useState(null);

    const handleScrollToDonate = () => {
        navigate(`/campaign/${id}/donate`, { state: { getSingleUser } });
    };

    const handleBlockClick = (index, isFilled) => {
        if (isFilled) {
            // If filled, toggle tooltip on tap (especially for mobile)
            setActiveBlock(activeBlock === index ? null : index);
        } else {
            // If empty, scroll to donate
           // handleScrollToDonate();
        }
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
            bgGradient="linear(to-b, white, #F9F5F0)"
            textAlign="center"
            overflow="hidden"
            position="relative"
            maxW="1200px"
            mx="auto"
        >
            {/* Header Section */}
            <VStack spacing={2} mb={8}>
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

                <Text color="black" maxW="600px" fontSize={["sm", "md"]} mt={2} fontFamily="'Poppins', sans-serif">
                    <Text as="span" fontWeight="bold" color="black">Green blocks are waiting for you.</Text> Gold blocks are history written forever. Donate a square feet to inscribe your name in the history.
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
                            bgGradient="linear(135deg, #F3E5AB 0%, #CBA135 100%)"
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
                    PHASE 2: FILLING FAST
                </Box>

                {/* ✅ SCROLL HINT ABOVE BLOCKS */}
                <Flex justify="center" align="center" mt={3} mb={1} gap={1} opacity={0.7}>
                    <Text fontSize="xs" fontWeight="600" color="gray.500" fontFamily="'Satoshi', sans-serif">
                        Scroll down to see more
                    </Text>
                    <MotionBox
                        animate={{ y: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <Icon as={FaChevronDown} fontSize="xs" color="gray.500" />
                    </MotionBox>
                </Flex>

                <Box
                    p={4}
                    pt={2}
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
                            const isNextAvailable = !isFilled && (i === 0 || grid[i - 1] !== null);
                            const isOpen = activeBlock === i;

                            return (
                                <Tooltip
                                    key={i}
                                    label={
                                        isFilled
                                            ? `${block.name} • ${Math.round(block.amount / SQFT_PRICE)} SqFt`
                                            : `#${blockNumber}: Available to Donate`
                                    }
                                    hasArrow
                                    bg={isFilled ? NAVY : "green.600"}
                                    color="white"
                                    placement="top"
                                    fontSize="xs"
                                    fontFamily="'Satoshi', sans-serif"
                                    // ✅ MANUAL CONTROL for mobile support
                                    isOpen={isOpen}
                                >
                                    <MotionBox
                                        w="100%"
                                        pt="100%"
                                        role="button"
                                        aria-label={isFilled ? `Donated by ${block.name}` : `Available block ${blockNumber}`}
                                        bg={
                                            isFilled
                                                ? "linear-gradient(135deg, #F3E5AB 0%, #CBA135 50%, #8C6A0A 100%)"
                                                : "rgba(56, 161, 105, 0.02)"
                                        }
                                        border={isFilled ? "1px solid #B8860B" : "1px dashed #A0AEC0"}
                                        borderRadius="sm"
                                        position="relative"
                                        cursor="pointer"

                                        // ✅ TAP/CLICK HANDLER
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent bubbling issues
                                            handleBlockClick(i, isFilled);
                                        }}
                                        // ✅ HOVER HANDLER (Desktop)
                                        onMouseEnter={() => setActiveBlock(i)}
                                        onMouseLeave={() => setActiveBlock(null)}

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
                                            bg: isFilled ? "" : "green.50",
                                            borderColor: isFilled ? "white" : "green.500",
                                            borderStyle: "solid",
                                            boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
                                        }}
                                        boxShadow={isFilled ? "inset 1px 1px 0px rgba(255,255,255,0.3), inset -1px -1px 0px rgba(0,0,0,0.2)" : "none"}
                                    >
                                        <Flex position="absolute" top="0" left="0" w="100%" h="100%" align="center" justify="center">
                                            <Text
                                                fontSize={["7px", "8px", "9px"]}
                                                color={isFilled ? "white" : "green.700"}
                                                fontWeight="bold"
                                                opacity={isFilled ? 0.9 : 0.5}
                                                userSelect="none"
                                            >
                                                {blockNumber}
                                            </Text>
                                        </Flex>
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