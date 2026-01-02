import React, { useEffect, useState } from "react";
import { Box, SimpleGrid, Tooltip, Text, Flex, Icon, Button, VStack, Badge, keyframes } from "@chakra-ui/react";
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
const SQFT_PRICE = 5000; // Kept for calculation logic only

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
  0%, 100% { box-shadow: 0 20px 50px -12px rgba(8, 32, 50, 0.6), 0 0 20px rgba(212, 175, 55, 0.1); }
  50% { box-shadow: 0 25px 60px -12px rgba(8, 32, 50, 0.7), 0 0 40px rgba(212, 175, 55, 0.3); }
`;

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
            py={[16, 20]}
            px={[4, 6]}
            bg={`radial-gradient(circle at center, ${BEIGE}, #F5F0E5)`}
            textAlign="center"
            overflow="hidden"
            position="relative"
            id="wall-of-devotion"
        >
            {/* Background Decor */}
            <Box position="absolute" top="5%" left="5%" opacity={0.05} transform="rotate(-15deg)"><Icon as={FaVihara} boxSize="150px" color={NAVY} /></Box>
            <Box position="absolute" bottom="5%" right="5%" opacity={0.05} transform="rotate(15deg)"><Icon as={FaVihara} boxSize="150px" color={NAVY} /></Box>

            {/* Header Section */}
            <VStack spacing={5} mb={10} position="relative" zIndex={2}>
                <Badge
                    bg={NAVY}
                    color={GOLD}
                    px={5}
                    py={2}
                    borderRadius="full"
                    fontSize="sm"
                    fontWeight="800"
                    letterSpacing="1.5px"
                    display="flex"
                    alignItems="center"
                    gap={3}
                    boxShadow="0 6px 15px rgba(0,0,0,0.2)"
                    fontFamily="'Satoshi', sans-serif"
                    border={`1px solid ${GOLD}`}
                >
                    <Icon as={BsStars} boxSize={4} animation={`${pulseBorder} 2s infinite`}/>
                    LIVE DONATION WALL
                </Badge>

                <MotionText
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    fontSize={["3xl", "4xl", "5xl"]}
                    fontWeight="900"
                    fontFamily="'Poppins', sans-serif"
                    color={NAVY}
                    lineHeight="1.15"
                    letterSpacing="tight"
                >
                    Etch Your Name in <br />
                    <Text
                        as="span"
                        bgClip="text"
                        bgGradient={GOLD_TEXT_GRADIENT}
                        filter="drop-shadow(0px 3px 3px rgba(0,0,0,0.25))"
                        fontSize={["4xl", "5xl", "6xl"]}
                    >
                        Golden History
                    </Text>
                </MotionText>

                {/* --- CLEAR INSTRUCTION PLAQUE --- */}
                <Box
                    bg="white"
                    borderTop="4px solid"
                    borderBottom="1px solid"
                    borderColor={GOLD}
                    p={6}
                    borderRadius="2xl"
                    maxW="750px"
                    boxShadow="0 15px 40px -10px rgba(212, 175, 55, 0.15)"
                    position="relative"
                >
                     <Icon as={FaHandPointer} color={GOLD} boxSize={8} position="absolute" top="-16px" left="50%" transform="translateX(-50%)" bg="white" borderRadius="full" p={1.5} border={`1px solid ${GOLD}`}/>

                    <VStack spacing={3} mt={2}>
                        <Text color={NAVY} fontSize={["sm", "md"]} fontFamily="'Poppins', sans-serif" fontWeight="500">
                            <strong>1. Explore:</strong> Hover or tap on any <Text as="span" color="#B8860B" fontWeight="800">Gold Block</Text> to reveal the donor's name.
                        </Text>
                        <Box w="100%" h="1px" bg="gray.100" />
                        <Text color={NAVY} fontSize={["sm", "md"]} fontFamily="'Poppins', sans-serif" fontWeight="500">
                            <strong>2. Join:</strong> Donate <Text as="span" color="#C53030" fontWeight="800">one or more square feet</Text> to inscribe your name in the wall forever.
                        </Text>
                    </VStack>
                </Box>
            </VStack>

            {/* --- TEMPLE WALL FRAME --- */}
            <Box
                maxW="1100px"
                mx="auto"
                position="relative"
                p={[3, 5]}
                bg={NAVY}
                borderRadius="3xl"
                animation={`${divineGlow} 4s ease-in-out infinite alternate`}
            >
                {/* Gold Trim */}
                <Box position="absolute" top="6px" left="6px" right="6px" bottom="6px" border="3px solid" borderColor={GOLD} borderRadius="2xl" opacity={0.6} pointerEvents="none" boxShadow={`inset 0 0 15px ${GOLD}`}/>

                <Box
                    bg="#f0f4f8"
                    borderRadius="xl"
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
                        p={4}
                        borderBottom="2px solid"
                        borderColor="gray.300"
                        fontSize="xs"
                        color={NAVY}
                        fontWeight="800"
                        fontFamily="'Satoshi', sans-serif"
                        textTransform="uppercase"
                        letterSpacing="wider"
                        boxShadow="0 2px 5px rgba(0,0,0,0.1)"
                        wrap="wrap"
                        gap={2}
                    >
                        <Flex align="center" gap={3}>
                            <Box w="14px" h="14px" bg={PREMIUM_GOLD_GRADIENT} borderRadius="sm" boxShadow="0 1px 3px rgba(0,0,0,0.4)" border="1px solid #8C6A0A"/>
                            <Text>Gold = Taken (Tap to see)</Text>
                        </Flex>

                        <Flex align="center" gap={2} opacity={0.8} display={{base:'none', md:'flex'}}>
                            <Text>Scroll Wall</Text>
                            <Icon as={FaChevronDown} color={NAVY}/>
                        </Flex>

                        <Flex align="center" gap={3}>
                            <Box w="14px" h="14px" bg="#e2e8f0" border="1px solid #a0aec0" borderRadius="sm" boxShadow="inset 1px 1px 3px rgba(0,0,0,0.3)" />
                            <Text>Grey = Available (Join)</Text>
                        </Flex>
                    </Flex>

                    {/* THE WALL GRID */}
                    <Box
                        p={[4, 6]}
                        maxH={["400px", "550px"]}
                        overflowY="auto"
                        sx={{
                            "&::-webkit-scrollbar": { width: "10px" },
                            "&::-webkit-scrollbar-track": { background: "#1a365d", borderRight: `1px solid ${GOLD}` },
                            "&::-webkit-scrollbar-thumb": { background: `linear-gradient(to-b, ${GOLD}, #B38728)`, borderRadius: "5px", border: `1px solid ${NAVY}` },
                        }}
                    >
                        <SimpleGrid columns={[10, 15, 20, 25]} spacing={["4px", "5px", "6px"]}>
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
                                                : `Available: Donate & Join Wall`
                                        }
                                        hasArrow
                                        bg={NAVY}
                                        color={GOLD}
                                        placement="top"
                                        fontSize="sm"
                                        fontFamily="'Satoshi', sans-serif"
                                        fontWeight="bold"
                                        isOpen={isOpen}
                                        boxShadow="dark-lg"
                                        p={3}
                                    >
                                        <MotionBox
                                            w="100%"
                                            pt="100%"
                                            role="button"
                                            position="relative"
                                            cursor="pointer"
                                            borderRadius="md"
                                            onClick={(e) => { e.stopPropagation(); handleBlockClick(i, isFilled); }}
                                            onMouseEnter={() => setActiveBlock(i)}
                                            onMouseLeave={() => setActiveBlock(null)}
                                            bg={isFilled ? PREMIUM_GOLD_GRADIENT : "#e2e8f0"}
                                            boxShadow={isFilled ? GOLD_BEVEL_SHADOW : EMPTY_CARVE_SHADOW}
                                            border={isFilled ? `1px solid #B8860B` : `1px solid #cbd5e0`}
                                            animation={isNextAvailable ? `${pulseBorder} 2s infinite` : undefined}
                                            zIndex={isNextAvailable ? 2 : 1}
                                            whileHover={{ scale: 1.5, zIndex: 20, boxShadow: isFilled ? "0 15px 30px rgba(212, 175, 55, 0.5)" : "inset 0 0 0 2px " + GOLD }}
                                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                        >
                                            {isFilled && (
                                                <Box
                                                    position="absolute"
                                                    top="0" left="0" w="300%" h="100%"
                                                    bg="linear-gradient(to right, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)"
                                                    opacity={0.5}
                                                    animation={`${shimmerSlow} 5s infinite linear`}
                                                    transform="skewX(-20deg)"
                                                />
                                            )}
                                            <Flex position="absolute" top="0" left="0" w="100%" h="100%" align="center" justify="center">
                                                <Text
                                                    fontSize={["7px", "9px"]}
                                                    color={isFilled ? "#422a05" : "gray.400"}
                                                    fontWeight="900"
                                                    fontFamily="'Satoshi', sans-serif"
                                                    opacity={isFilled ? 0.9 : 0.6}
                                                    textShadow={isFilled ? "0px 1px 0px rgba(255,255,255,0.3)" : "none"}
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

            {/* CTA Section */}
            <Box mt={-10} position="relative" zIndex={3} px={4}>
                <MotionBox
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    viewport={{ once: true }}
                    bg="white"
                    p={[6, 8]}
                    borderRadius="3xl"
                    boxShadow="0 20px 40px -10px rgba(8, 32, 50, 0.2)"
                    borderTop={`4px solid ${GOLD}`}
                    maxW="750px"
                    mx="auto"
                >
                    <Icon as={FaGem} color={GOLD} position="absolute" top="-15px" left="20px" boxSize={10} bg="white" p={1} borderRadius="full" border={`2px solid ${GOLD}`}/>

                    <Flex direction={["column", "row"]} align="center" justify="space-between" gap={6} mt={4}>
                        <VStack spacing={1} align={["center", "flex-start"]}>
                            <Text fontSize="sm" color={NAVY} fontWeight="bold" textTransform="uppercase" fontFamily="'Satoshi', sans-serif" letterSpacing="wider">
                                Current Availability
                            </Text>
                            <Flex align="baseline" gap={3}>
                                <Text fontSize={["4xl", "5xl"]} fontWeight="900" color={NAVY} lineHeight="1" fontFamily="'Poppins', sans-serif">
                                    {remaining}
                                </Text>
                                <Text fontSize="xl" color={GOLD} fontWeight="700" fontFamily="'Satoshi', sans-serif">
                                    blocks left
                                </Text>
                            </Flex>
                        </VStack>

                        <Button
                            size="lg"
                            h="auto"
                            py={5}
                            bgGradient="linear(to-r, #FFD700, #FFB200)"
                            color="#2C0A0A"
                            rightIcon={<FaCheckCircle boxSize={6} />}
                            onClick={handleScrollToDonate}
                            px={12}
                            fontSize="xl"
                            fontWeight="800"
                            borderRadius="full"
                            fontFamily="'Poppins', sans-serif"
                            boxShadow="0 10px 25px rgba(255,183,0,0.5)"
                            _hover={{ transform: "scale(1.05) translateY(-3px)", boxShadow: "0 15px 35px rgba(255,183,0,0.6)" }}
                            transition="all 0.3s cubic-bezier(.08,.52,.52,1)"
                        >
                            Donate & Join The Wall
                        </Button>
                    </Flex>
                </MotionBox>
            </Box>
        </Box>
    );
};

export default WallOfDevotion_Engraved;