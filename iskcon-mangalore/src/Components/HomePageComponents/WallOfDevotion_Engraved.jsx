import React, { useEffect, useState } from "react";
import { Box, SimpleGrid, Tooltip, Text, Flex, Icon, Button, VStack, Badge } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { FaCheckCircle, FaChevronDown, FaHandPointer, FaHistory, FaVihara, FaGem } from "react-icons/fa";
import { motion } from "framer-motion";
import { fetchAllContributers } from "../../utils/apiCall";
import { useNavigate, useParams } from "react-router-dom";
import { BsStars } from "react-icons/bs";

const MotionBox = motion(Box);
const MotionText = motion(Text);

// --- THEME CONSTANTS ---
const NAVY = "#082032";
const GOLD = "#D4AF37";
const BEIGE = "#FFFFFF";
const SQFT_PRICE = 5000;

// --- STYLING CONSTANTS ---
const PREMIUM_GOLD_GRADIENT = "linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)";
const GOLD_TEXT_GRADIENT = "linear-gradient(to-r, #BF953F, #FCF6BA, #B38728, #AA771C)";

// 3D Shadows
const GOLD_BEVEL_SHADOW = `
    inset 2px 2px 5px rgba(255,255,255,0.7),
    inset -2px -2px 5px rgba(0,0,0,0.4),
    4px 4px 10px rgba(0,0,0,0.3)
`;
const EMPTY_CARVE_SHADOW = `
    inset 3px 3px 8px rgba(0,0,0,0.25),
    inset -1px -1px 2px rgba(255,255,255,0.6)
`;

// Animations
const shimmerSlow = keyframes`
  0% { background-position: -250% center; opacity: 0.3; }
  50% { opacity: 0.8; }
  100% { background-position: 250% center; opacity: 0.3; }
`;
const pulseBorder = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4); border-color: ${GOLD}; }
  70% { box-shadow: 0 0 0 6px rgba(212, 175, 55, 0); border-color: #FFE57F; }
  100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4); border-color: ${GOLD}; }
`;
const divineGlow = keyframes`
  0%, 100% { box-shadow: 0 10px 30px -12px rgba(8, 32, 50, 0.6), 0 0 10px rgba(212, 175, 55, 0.1); }
  50% { box-shadow: 0 15px 40px -12px rgba(8, 32, 50, 0.7), 0 0 20px rgba(212, 175, 55, 0.3); }
`;

// Helper: Convert Donor List to Grid Blocks
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
    const [activeBlock, setActiveBlock] = useState(null);

    const handleScrollToDonate = () => {
        navigate(`/campaign/${id}/donate`, { state: { getSingleUser } });
    };

    const handleBlockClick = (index, isFilled) => {
        if (isFilled) {
            setActiveBlock(activeBlock === index ? null : index);
        } else {
             handleScrollToDonate();
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAllContributers();
                if (Array.isArray(data)) {
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
                }
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
            w="100%" // Ensure full width
            py={[12, 16, 20]} // Reduced padding on mobile
            px={[4, 6]}
            bg={`radial-gradient(circle at center, ${BEIGE}, #F5F0E5)`}
            textAlign="center"
            overflow="hidden" // ✅ CRITICAL: Prevents horizontal scrolling crash
            position="relative"
            id="wall-of-devotion"
        >
            {/* Background Decor - Adjusted for mobile */}
            <Box position="absolute" top="2%" left="-10%" opacity={0.05} transform="rotate(-15deg)">
                <Icon as={FaVihara} boxSize={["100px", "150px"]} color={NAVY} />
            </Box>
            <Box position="absolute" bottom="2%" right="-10%" opacity={0.05} transform="rotate(15deg)">
                <Icon as={FaVihara} boxSize={["100px", "150px"]} color={NAVY} />
            </Box>

            {/* Header Section */}
            <VStack spacing={4} mb={[8, 10]} position="relative" zIndex={2}>
                <Badge
                    bg={NAVY}
                    color={GOLD}
                    px={4}
                    py={1.5}
                    borderRadius="full"
                    fontSize={["xs", "sm"]}
                    fontWeight="800"
                    letterSpacing="1px"
                    display="flex"
                    alignItems="center"
                    gap={2}
                    boxShadow="sm"
                    fontFamily="'Satoshi', sans-serif"
                    border={`1px solid ${GOLD}`}
                >
                    <Icon as={BsStars} boxSize={3} animation={`${pulseBorder} 2s infinite`}/>
                    LIVE DONATION WALL
                </Badge>

                <MotionText
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    fontSize={["2xl", "3xl", "4xl", "5xl"]} // ✅ Adjusted font sizes for mobile
                    fontWeight="900"
                    fontFamily="'Poppins', sans-serif"
                    color={NAVY}
                    lineHeight="1.2"
                    letterSpacing="tight"
                    px={2}
                >
                    Etch Your Name in <br />
                    <Text
                        as="span"
                        bgClip="text"
                        bgGradient={GOLD_TEXT_GRADIENT}
                        filter="drop-shadow(0px 3px 3px rgba(0,0,0,0.25))"
                        fontSize={["3xl", "4xl", "5xl", "6xl"]}
                    >
                        Golden History
                    </Text>
                </MotionText>

                {/* --- INSTRUCTION PLAQUE --- */}
                <Box
                    bg="white"
                    borderTop="4px solid"
                    borderBottom="1px solid"
                    borderColor={GOLD}
                    p={[4, 6]} // Reduced padding on mobile
                    borderRadius="2xl"
                    maxW="750px"
                    w="100%"
                    boxShadow="lg"
                    position="relative"
                    mt={4}
                >
                     <Icon as={FaHandPointer} color={GOLD} boxSize={8} position="absolute" top="-16px" left="50%" transform="translateX(-50%)" bg="white" borderRadius="full" p={1.5} border={`1px solid ${GOLD}`}/>

                    <VStack spacing={3} mt={2} align="center">
                        <Text color={NAVY} fontSize={["xs", "sm", "md"]} fontFamily="'Poppins', sans-serif" fontWeight="500">
                            <strong>1. Explore:</strong> Tap on any <Text as="span" color="#B8860B" fontWeight="800">Gold Block</Text> to see the name.
                        </Text>
                        <Box w="100%" h="1px" bg="gray.100" />
                        <Text color={NAVY} fontSize={["xs", "sm", "md"]} fontFamily="'Poppins', sans-serif" fontWeight="500">
                            <strong>2. Join:</strong> Donate <Text as="span" color="#C53030" fontWeight="800">one or more sq. ft.</Text> to inscribe your name.
                        </Text>
                    </VStack>
                </Box>
            </VStack>

            {/* --- TEMPLE WALL FRAME --- */}
            <Box
                maxW="1100px"
                mx="auto"
                position="relative"
                p={[2, 3, 5]} // Responsive padding
                bg={NAVY}
                borderRadius={["xl", "3xl"]}
                animation={`${divineGlow} 4s ease-in-out infinite alternate`}
            >
                {/* Gold Trim */}
                <Box position="absolute" top="4px" left="4px" right="4px" bottom="4px" border="2px solid" borderColor={GOLD} borderRadius={["lg", "2xl"]} opacity={0.6} pointerEvents="none" boxShadow={`inset 0 0 10px ${GOLD}`}/>

                <Box
                    bg="#f0f4f8"
                    borderRadius={["lg", "xl"]}
                    overflow="hidden"
                    position="relative"
                    boxShadow="inset 0 0 40px rgba(0,0,0,0.3)"
                    border="1px solid #2a4365"
                >
                    {/* LEGEND / KEY */}
                    <Flex
                        justify="space-between"
                        align="center"
                        bgGradient="linear(to-b, #e2e8f0, #cbd5e0)"
                        p={[2, 4]}
                        borderBottom="2px solid"
                        borderColor="gray.300"
                        fontSize={["9px", "xs"]} // Smaller font on mobile
                        color={NAVY}
                        fontWeight="800"
                        fontFamily="'Satoshi', sans-serif"
                        textTransform="uppercase"
                        letterSpacing="wider"
                        boxShadow="sm"
                        wrap="wrap"
                        gap={2}
                    >
                        <Flex align="center" gap={2}>
                            <Box w="10px" h="10px" bg={PREMIUM_GOLD_GRADIENT} borderRadius="sm" border="1px solid #8C6A0A"/>
                            <Text>Taken</Text>
                        </Flex>

                        <Flex align="center" gap={1} opacity={0.8} display={{base:'none', md:'flex'}}>
                            <Text>Scroll Wall</Text>
                            <Icon as={FaChevronDown} color={NAVY}/>
                        </Flex>

                        <Flex align="center" gap={2}>
                            <Box w="10px" h="10px" bg="#e2e8f0" border="1px solid #a0aec0" borderRadius="sm" />
                            <Text>Available</Text>
                        </Flex>
                    </Flex>

                    {/* THE WALL GRID */}
                    <Box
                        p={[2, 4, 6]}
                        maxH={["350px", "400px", "550px"]}
                        overflowY="auto"
                        sx={{
                            "&::-webkit-scrollbar": { width: "6px" },
                            "&::-webkit-scrollbar-track": { background: "#1a365d" },
                            "&::-webkit-scrollbar-thumb": { background: GOLD, borderRadius: "5px" },
                        }}
                    >
                        {/* ✅ CHANGED: 8 columns on mobile for better touch targets */}
                        <SimpleGrid columns={[8, 12, 18, 25]} spacing={["3px", "4px", "5px", "6px"]}>
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
                                                ? `${block.name} • ${block.sqft} SqFt`
                                                : `Available: Donate to Join`
                                        }
                                        hasArrow
                                        bg={NAVY}
                                        color={GOLD}
                                        placement="top"
                                        fontSize="xs"
                                        fontFamily="'Satoshi', sans-serif"
                                        fontWeight="bold"
                                        isOpen={isOpen}
                                        p={2}
                                    >
                                        <MotionBox
                                            w="100%"
                                            pt="100%"
                                            role="button"
                                            position="relative"
                                            cursor="pointer"
                                            borderRadius="sm"
                                            // Handle Touch for Mobile Tooltips
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleBlockClick(i, isFilled);
                                            }}
                                            onMouseEnter={() => setActiveBlock(i)}
                                            onMouseLeave={() => setActiveBlock(null)}
                                            bg={isFilled ? PREMIUM_GOLD_GRADIENT : "#e2e8f0"}
                                            boxShadow={isFilled ? GOLD_BEVEL_SHADOW : EMPTY_CARVE_SHADOW}
                                            border={isFilled ? `1px solid #B8860B` : `1px solid #cbd5e0`}
                                            animation={isNextAvailable ? `${pulseBorder} 2s infinite` : undefined}
                                            zIndex={isNextAvailable ? 2 : 1}
                                            whileHover={{ scale: 1.2, zIndex: 10 }} // Reduced scale for mobile safety
                                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                        >
                                            {isFilled && (
                                                <Box
                                                    position="absolute"
                                                    top="0" left="0" w="300%" h="100%"
                                                    bg="linear-gradient(to right, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)"
                                                    opacity={0.5}
                                                    animation={`${shimmerSlow} 5s infinite linear`}
                                                />
                                            )}
                                            <Flex position="absolute" top="0" left="0" w="100%" h="100%" align="center" justify="center">
                                                <Text
                                                    fontSize={["6px", "7px", "8px"]}
                                                    color={isFilled ? "#422a05" : "gray.400"}
                                                    fontWeight="900"
                                                    fontFamily="'Satoshi', sans-serif"
                                                    opacity={isFilled ? 0.9 : 0.6}
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
            </Box>

            {/* CTA Section - Adjusted margins for mobile */}
            <Box mt={[-8, -10]} position="relative" zIndex={3} px={[2, 4]} pb={4}>
                <MotionBox
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    viewport={{ once: true }}
                    bg="white"
                    p={[5, 6, 8]}
                    borderRadius="3xl"
                    boxShadow="xl"
                    borderTop={`4px solid ${GOLD}`}
                    maxW="750px"
                    mx="auto"
                >
                    <Icon as={FaGem} color={GOLD} position="absolute" top="-15px" left="20px" boxSize={[8, 10]} bg="white" p={1} borderRadius="full" border={`2px solid ${GOLD}`}/>

                    <Flex direction={["column", "row"]} align="center" justify="space-between" gap={[4, 6]} mt={2}>
                        <VStack spacing={0} align={["center", "flex-start"]}>
                            <Text fontSize="xs" color={NAVY} fontWeight="bold" textTransform="uppercase" fontFamily="'Satoshi', sans-serif" letterSpacing="wider">
                                Availability
                            </Text>
                            <Flex align="baseline" gap={2}>
                                <Text fontSize={["3xl", "4xl", "5xl"]} fontWeight="900" color={NAVY} lineHeight="1" fontFamily="'Poppins', sans-serif">
                                    {remaining}
                                </Text>
                                <Text fontSize={["md", "xl"]} color={GOLD} fontWeight="700" fontFamily="'Satoshi', sans-serif">
                                    blocks left
                                </Text>
                            </Flex>
                        </VStack>

                        <Button
                            w={["100%", "auto"]} // Full width button on mobile
                            size="lg"
                            h="auto"
                            py={[4, 5]}
                            bgGradient="linear(to-r, #FFD700, #FFB200)"
                            color="#2C0A0A"
                            rightIcon={<FaCheckCircle boxSize={5} />}
                            onClick={handleScrollToDonate}
                            px={[6, 12]}
                            fontSize={["md", "xl"]}
                            fontWeight="800"
                            borderRadius="full"
                            fontFamily="'Poppins', sans-serif"
                            boxShadow="lg"
                            _hover={{ transform: "translateY(-2px)", boxShadow: "xl" }}
                            active={{ transform: "scale(0.98)" }}
                        >
                            Donate & Join
                        </Button>
                    </Flex>
                </MotionBox>
            </Box>
        </Box>
    );
};

export default WallOfDevotion_Engraved;