import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Box,
    Flex,
    Text,
    VStack,
    HStack,
    Spinner,
    Image,
    useBreakpointValue,
} from "@chakra-ui/react";
// ✅ FIX: Import keyframes from emotion (Chakra's engine) instead of chakra-ui
import { keyframes } from "@emotion/react";

import Navbar from "./Navbar";
import WeeklyLotusRow from "./WeeklyLotusRow";
import ImpactVisualizer from "./ImpactVisualizer";
import { BE_API_URL } from "../../constants/homePage";

// Images
import lotusBud from "../../assets/images/lotus_bud.png";
import lotusBloom from "../../assets/images/lotus_blossom.png";

// 1. ⚡ Define Animations
const float = keyframes`
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
`;

const pulse = keyframes`
    0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.7); }
    70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(255, 215, 0, 0); }
    100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 215, 0, 0); }
`;

const CampaignerDashboard = () => {
    const [data, setData] = useState(null);
    const campaignerId = window.location.pathname.split("/").pop();

    // 📱 Responsive Sizing Logic
    const lotusSize = useBreakpointValue({ base: "220px", md: "380px" });
    const isMobile = useBreakpointValue({ base: true, md: false });

    useEffect(() => {
        axios
            .get(`${BE_API_URL}/api/campaigner/${campaignerId}/streak`)
            .then((res) => setData(res.data))
            .catch((err) => console.error("Error fetching campaigner data:", err));
    }, [campaignerId]);

    if (!data)
        return (
            <Flex justify="center" align="center" minH="100vh" bg="#020c1b">
                <Spinner size="xl" color="#FFD700" thickness="4px" />
            </Flex>
        );

    const lotusImage = data.todayAchieved ? lotusBloom : lotusBud;

    const animationStyle = data.todayAchieved
        ? `${float} 6s ease-in-out infinite`
        : `${pulse} 2s infinite`;

    const message = data.todayAchieved
        ? `“Beautiful! Your lotus has blossomed today — an offering of your seva to Lord Krishna.”`
        : `“Today, your lotus awaits your seva. Receive even a small donation to blossom your lotus.”`;

    return (
        <Box
            bg="#020c1b"
            minH="100vh"
            fontFamily="'Poppins', sans-serif"
            position="relative"
            overflowX="hidden"
        >
            {/* Navbar */}
            <Box position="absolute" top="0" w="100%" zIndex="10">
                <Navbar
                    campaignerName={data.campaignerName}
                    campaignerImage={data.campaignerImage}
                />
            </Box>

            {/* 🌟 HERO SECTION */}
            <Box
                w="100%"
                // 📱 Height adjusts: Taller on desktop to fit layout, compact on mobile
                minH={["65vh", "75vh"]}
                bgGradient="linear(to-b, #020c1b 0%, #0a192f 100%)"
                position="relative"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                pt={["60px", "0px"]} // Add padding top on mobile so lotus isn't behind navbar
                _after={{
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "150px",
                    bgGradient: "linear(to-t, #020c1b, transparent)",
                    zIndex: 0
                }}
            >
                {/* Background Glow */}
                <Box
                    position="absolute"
                    top="45%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    w={["280px", "500px"]}
                    h={["280px", "500px"]}
                    bg="radial-gradient(circle, rgba(255, 215, 0, 0.15) 0%, rgba(2, 12, 27, 0) 70%)"
                    filter="blur(40px)"
                    zIndex="0"
                />

                {/* 🌸 The Lotus */}
                <Image
                    src={lotusImage}
                    alt="Lotus Status"
                    w={lotusSize}
                    h={lotusSize}
                    objectFit="contain"
                    animation={animationStyle}
                    zIndex="1"
                    filter="drop-shadow(0 0 20px rgba(255, 215, 0, 0.3))"
                    // 📱 Push lotus up slightly on mobile so it's not hidden by the card
                    mb={["0px", "-40px"]}
                />
            </Box>

            {/* 🚀 ACTION CARD: Overlapping the Hero */}
            <Box
                position="relative"
                zIndex="2"
                // 📱 Overlap Logic: Less overlap on mobile (-60px) vs desktop (-100px)
                mt={["-60px", "-100px"]}
                px={[4, 8]}
                pb={20}
            >
                <Box
                    maxW="900px"
                    mx="auto"
                    bg="rgba(13, 25, 48, 0.85)"
                    backdropFilter="blur(20px)"
                    borderRadius="3xl"
                    border="1px solid rgba(255, 215, 0, 0.15)"
                    boxShadow="0 -10px 40px rgba(0,0,0,0.5)"
                    overflow="hidden"
                >
                    {/* Header: Name & Message */}
                    <VStack
                        spacing={3}
                        p={[5, 8]}
                        textAlign="center"
                        bgGradient="linear(to-b, rgba(255,255,255,0.03), transparent)"
                    >
                        <Text
                            fontSize={["xl", "3xl"]} // Smaller font on mobile
                            fontWeight="bold"
                            color="#FFD700"
                            letterSpacing="wide"
                            lineHeight="1.2"
                        >
                            Hare Krishna, {data.campaignerName}
                        </Text>
                        <Text
                            fontSize={["sm", "md"]}
                            color="gray.300"
                            fontStyle="italic"
                            maxW="600px"
                            lineHeight="1.6"
                            px={2}
                        >
                            {message}
                        </Text>
                    </VStack>

                    {/* 📊 ACTION DASHBOARD: Stats & Tracker */}
                    <Box p={[4, 8]}>
                        {/* 1. The Streak Counters */}
                        <HStack
                            spacing={[3, 4]}
                            justify="center"
                            mb={8}
                            w="100%"
                        >
                            <VStack
                                bg="rgba(0,0,0,0.3)"
                                p={[3, 4]}
                                borderRadius="xl"
                                w={["48%", "45%"]}
                                border="1px solid rgba(255, 255, 255, 0.1)"
                            >
                                <Text fontSize={["10px", "xs"]} color="gray.400" textTransform="uppercase" letterSpacing="1px">
                                    Current Streak
                                </Text>
                                <Text fontSize={["2xl", "4xl"]} fontWeight="800" color="#FFD700">
                                    {data.currentStreak} 🔥
                                </Text>
                            </VStack>

                            <VStack
                                bg="rgba(0,0,0,0.3)"
                                p={[3, 4]}
                                borderRadius="xl"
                                w={["48%", "45%"]}
                                border="1px solid rgba(255, 255, 255, 0.1)"
                            >
                                <Text fontSize={["10px", "xs"]} color="gray.400" textTransform="uppercase" letterSpacing="1px">
                                    Best Streak
                                </Text>
                                <Text fontSize={["2xl", "4xl"]} fontWeight="800" color="white">
                                    {data.longestStreak} 🏆
                                </Text>
                            </VStack>
                        </HStack>

                        {/* 2. The Weekly Lotus Tracker */}
                        <Box
                            bg="rgba(255, 255, 255, 0.03)"
                            borderRadius="2xl"
                            p={[4, 6]}
                            border="1px solid rgba(255, 255, 255, 0.05)"
                        >
                            <Text
                                textAlign="center"
                                mb={4}
                                fontSize={["xs", "sm"]}
                                color="blue.200"
                                fontWeight="600"
                            >
                                YOUR WEEKLY SEVA BLOSSOMS
                            </Text>

                            {/* Ensure the row handles overflow nicely on very small screens */}
                            <Box overflowX="auto">
                                <WeeklyLotusRow days={data.weekDays} />
                            </Box>

                            <Text textAlign="center" mt={4} fontSize={["10px", "xs"]} color="gray.500">
                                Every lotus blooms with a sincere offering.
                            </Text>
                        </Box>
                        <ImpactVisualizer
                            raisedAmount={data.raisedAmount}
                            targetAmount={data.targetAmount}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default CampaignerDashboard;