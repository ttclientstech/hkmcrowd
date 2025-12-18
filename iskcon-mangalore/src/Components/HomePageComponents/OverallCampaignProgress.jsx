import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
    Box,
    Text,
    Flex,
    CircularProgress,
    CircularProgressLabel,
    VStack,
    Icon,
    useBreakpointValue
} from "@chakra-ui/react";
import { FaHandHoldingHeart } from "react-icons/fa";
import { motion, useInView } from "framer-motion";
import { BE_API_URL } from "../../constants/homePage";

const MotionBox = motion(Box);
const NAVY = "#082032";
const GOLD = "#D4AF37";
const URGENT_RED = "#E63946";
const SQFT_PRICE = 5000;

const OverallCampaignProgress = () => {
    const [stats, setStats] = useState({ raised: 0, goal: 0 });
    const [loading, setLoading] = useState(true);

    // Animation state
    const [animatedPercent, setAnimatedPercent] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    const circleSize = useBreakpointValue({ base: "220px", md: "260px" });

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const res = await axios.get(`${BE_API_URL}/get_overall_progress`);
                if (res.data) {
                    setStats({
                        raised: Number(res.data.totalraisedamt) || 0,
                        goal: Number(res.data.totalgoalamt) || 0
                    });
                }
            } catch (err) {
                console.error("Error fetching progress:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProgress();
    }, []);

    const raisedSqFt = Math.floor(stats.raised / SQFT_PRICE);
    const goalSqFt = Math.floor(stats.goal / SQFT_PRICE);

    // ✅ CHANGED: Removed Math.round() to allow floating point calculation
    const targetPercent = goalSqFt > 0 ? Math.min(100, (raisedSqFt / goalSqFt) * 100) : 0;

    // Trigger the fill animation when in view
    useEffect(() => {
        if (isInView && targetPercent > 0) {
            let start = 0;
            const duration = 2000;
            const increment = targetPercent / (duration / 16);

            const timer = setInterval(() => {
                start += increment;
                if (start >= targetPercent) {
                    setAnimatedPercent(targetPercent);
                    clearInterval(timer);
                } else {
                    setAnimatedPercent(start);
                }
            }, 16);
            return () => clearInterval(timer);
        }
    }, [isInView, targetPercent]);

    return (
        <Box
            ref={ref}
            w="100%"
            maxW="1200px"
            mx="auto"
            mt={12}
            mb={8}
            px={[4, 6]}
        >
            <MotionBox
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
                bg="white"
                boxShadow="0 10px 40px rgba(0,0,0,0.1)"
                p={[8, 10]}
                textAlign="center"
                position="relative"
                overflow="hidden"
            >

                <VStack spacing={6} position="relative" zIndex={1}>

                    {/* Header */}
                    <Box>
                        <Text
                            fontSize={["3xl", "3xl"]}
                            fontWeight="800"
                            color={NAVY}
                            fontFamily="'Poppins', sans-serif"
                            lineHeight="1.3"
                        >
                            The Grand Vision: <br/>
                            <Text as="span" color={NAVY}>Overall Campaign Progress</Text>
                        </Text>
                        <Text fontSize="sm" color="black" mt={2} fontFamily="'Poppins', sans-serif">
                            Combining every contribution towards the complete construction of Dakshina Dwaraka Dham.
                        </Text>
                    </Box>

                    {/* Circular Progress Section */}
                    <Flex
                        justify="center"
                        align="center"
                        direction="column"
                        py={4}
                    >
                        <Box position="relative">
                            <CircularProgress
                                value={animatedPercent}
                                color={URGENT_RED}
                                trackColor="gray.200"
                                size={circleSize}
                                thickness="6px"
                                capIsRound
                                sx={{
                                    transition: "all 0.3s ease"
                                }}
                            >
                                <CircularProgressLabel
                                    fontSize={["3xl", "4xl"]}
                                    fontWeight="900"
                                    color={NAVY}
                                >
                                    {/* ✅ CHANGED: Use .toFixed(1) for 1 decimal precision */}
                                    {loading ? "..." : `${animatedPercent.toFixed(1)}%`}
                                </CircularProgressLabel>
                            </CircularProgress>

                            {/* Inner Glow Effect */}
                            <Box
                                position="absolute"
                                top="0" left="0" right="0" bottom="0"
                                borderRadius="full"
                                boxShadow={`inset 0 0 20px ${URGENT_RED}15`}
                                pointerEvents="none"
                            />
                        </Box>

                        {/* Text Stats with Count-up Effect */}
                        <VStack spacing={1} mt={6}>
                            <Text fontSize={["2xl", "4xl"]} fontWeight="800" color={URGENT_RED} lineHeight="1">
                                {isInView ? Math.round((raisedSqFt * (animatedPercent / targetPercent)) || 0).toLocaleString() : 0}
                                <Text as="span" fontSize="lg" color="black" ml={1}>Sq. Ft.</Text>
                            </Text>
                            <Text fontSize="md" color="gray.400" fontWeight="600" textTransform="uppercase" letterSpacing="wider">
                                RAISED OF {goalSqFt.toLocaleString()} SQ. FT. GOAL
                            </Text>
                        </VStack>
                    </Flex>
                </VStack>
            </MotionBox>
        </Box>
    );
};

export default OverallCampaignProgress;