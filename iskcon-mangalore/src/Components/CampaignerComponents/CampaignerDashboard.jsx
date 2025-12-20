import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Box,
    Text,
    VStack,
    HStack,
    Spinner,
    Image,
    useBreakpointValue,
    Icon
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { FaVihara } from "react-icons/fa";

import Navbar from "./Navbar";
import WeeklyLotusRow from "./WeeklyLotusRow";
import ImpactVisualizer from "./ImpactVisualizer";
import { BE_API_URL } from "../../constants/homePage";

// Images
import lotusBud from "../../assets/images/lotus_bud.jpg";
import lotusBloom from "../../assets/images/lotus_blossom.jpg";
import MilestoneBadges from "./MilestoneBadges";
import Leaderboard from "./Leaderboard";
import DonorTable from "./DonorTable";

/* =========================
   THEME CONSTANTS & ANIMATIONS
   ========================= */
const DASHBOARD_BG = "#020c1b";
const GOLD = "#FFD700";

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

// Pulse animation for the loader logo
const logoPulse = keyframes`
  0% { transform: scale(0.95); opacity: 0.8; }
  50% { transform: scale(1.05); opacity: 1; filter: drop-shadow(0 0 10px ${GOLD}); }
  100% { transform: scale(0.95); opacity: 0.8; }
`;

// Fade out animation for the loader container
const fadeOut = keyframes`
  from { opacity: 1; visibility: visible; }
  to { opacity: 0; visibility: hidden; }
`;

/* =========================
   ✅ DIVINE LOADER COMPONENT
   ========================= */
const DivineLoader = ({ isVisible }) => (
    <Box
        position="fixed"
        top="0"
        left="0"
        w="100vw"
        h="100vh"
        bg={DASHBOARD_BG} // Matches dashboard background exactly
        zIndex="99999"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        // Only animate fade out when isVisible becomes false
        animation={!isVisible ? `${fadeOut} 0.8s ease-out forwards` : "none"}
        pointerEvents={!isVisible ? "none" : "all"}
    >
        <VStack spacing={6}>
            {/* Animated Temple Icon */}
            <Box animation={`${logoPulse} 2s infinite ease-in-out`}>
                <Icon as={FaVihara} w={20} h={20} color={GOLD} />
            </Box>

            {/* Title */}
            <VStack spacing={1}>
                <Text
                    fontSize={["xl", "2xl"]}
                    fontWeight="800"
                    color="white"
                    fontFamily="'Poppins', sans-serif"
                    letterSpacing="wider"
                    textTransform="uppercase"
                >
                    Dakshina Dwaraka Dham
                </Text>
                <Text fontSize="sm" color={GOLD} fontFamily="'Satoshi', sans-serif" letterSpacing="widest">
                    PREPARING YOUR SEVA DASHBOARD
                </Text>
            </VStack>

            {/* Spinner */}
            <Box pt={4}>
                <Spinner
                    thickness="3px"
                    speed="0.85s"
                    emptyColor="gray.700"
                    color={GOLD}
                    size="xl"
                />
            </Box>
        </VStack>
    </Box>
);

const CampaignerDashboard = () => {
    const [data, setData] = useState(null);
    // ✅ State to handle loader visibility transition
    const [showLoader, setShowLoader] = useState(true);

    const campaignerId = localStorage.getItem('campaignerId');

    // 📱 Responsive Sizing Logic
    const lotusSize = useBreakpointValue({ base: "220px", md: "380px" });
    const isMobile = useBreakpointValue({ base: true, md: false });

    useEffect(() => {
        axios
            .get(`${BE_API_URL}/api/campaigner/${campaignerId}/streak`)
            .then((res) => {
                setData(res.data); // 1. Set Data First

                // 2. Only then remove loader (Added small delay for smooth visual transition)
                setTimeout(() => {
                    setShowLoader(false);
                }, 800);
            })
            .catch((err) => {
                console.error("Error fetching campaigner data:", err);
                // Optional: You might want to turn off loader here if you have an error UI
                // setShowLoader(false);
            });
    }, [campaignerId]);

    // ✅ BLOCKING RENDER: If data hasn't arrived yet, show Loader only.
    if (!data) return <DivineLoader isVisible={true} />;

    const lotusImage = data.todayAchieved ? lotusBloom : lotusBud;

    const animationStyle = data.todayAchieved
        ? `${float} 6s ease-in-out infinite`
        : `${pulse} 2s infinite`;

    const message = data.todayAchieved
        ? `“Beautiful! Your lotus has blossomed today — an offering of your seva to Lord Krishna.”`
        : `“Today, your lotus awaits your seva. Receive even a small donation to blossom your lotus.”`;

    return (
        <Box
            bg={DASHBOARD_BG}
            minH="100vh"
            fontFamily="'Poppins', sans-serif"
            position="relative"
            overflowX="hidden"
        >
            {/* ✅ Loader Overlay: Fades out only after data is loaded */}
            <DivineLoader isVisible={showLoader} />

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
                minH={["65vh", "75vh"]}
                bgGradient="linear(to-b, #020c1b 0%, #0a192f 100%)"
                position="relative"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                pt={["60px", "0px"]}
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
                    mb={["0px", "-40px"]}
                />
            </Box>

            {/* 🚀 ACTION CARD: Overlapping the Hero */}
            <Box
                position="relative"
                zIndex="2"
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
                            fontSize={["xl", "3xl"]}
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
                        <MilestoneBadges raisedSqFt={data.raisedAmount} />
                        <Leaderboard />
                        <DonorTable />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default CampaignerDashboard;