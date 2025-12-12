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
    keyframes,
} from "@chakra-ui/react";
import Navbar from "./Navbar";
import WeeklyLotusRow from "./WeeklyLotusRow";
import { BE_API_URL } from "../../constants/homePage";

// Images
import lotusBud from "../../assets/images/lotus_bud.png";
import lotusBloom from "../../assets/images/lotus_blossom.png";

// 1. ⚡ Define Animations for Engagement
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

    // Dynamic sizing
    const lotusSize = useBreakpointValue({ base: "260px", md: "380px" });
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

    // 🎨 Logic: If bloomed, it floats peacefully. If waiting (bud), it pulses to ask for action.
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
            {/* Navbar (Kept your glass style) */}
            <Box position="absolute" top="0" w="100%" zIndex="10">
                <Navbar
                    campaignerName={data.campaignerName}
                    campaignerImage={data.campaignerImage}
                />
            </Box>

            {/* 🌟 HERO SECTION: The "Altar" */}
            <Box
                w="100%"
                h={["60vh", "65vh"]} // Taller hero to accommodate the floating card overlap
                bgGradient="linear(to-b, #020c1b 0%, #0a192f 100%)"
                position="relative"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                _after={{
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "150px",
                    bgGradient: "linear(to-t, #020c1b, transparent)", // Fade out for card overlap
                    zIndex: 0
                }}
            >
                {/* Background Glow */}
                <Box
                    position="absolute"
                    top="40%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    w={["300px", "500px"]}
                    h={["300px", "500px"]}
                    bg="radial-gradient(circle, rgba(255, 215, 0, 0.15) 0%, rgba(2, 12, 27, 0) 70%)"
                    filter="blur(40px)"
                    zIndex="0"
                />

                {/* 🌸 The Lotus (Action Focus) */}
                <Image
                    src={lotusImage}
                    alt="Lotus Status"
                    w={lotusSize}
                    h={lotusSize}
                    objectFit="contain"
                    animation={animationStyle} // Active animation
                    zIndex="1"
                    filter="drop-shadow(0 0 20px rgba(255, 215, 0, 0.3))"
                    mb={isMobile ? "-20px" : "-40px"} // Slight overlap with card
                />
            </Box>

            {/* 🚀 ACTION CARD: Overlapping the Hero */}
            <Box
                position="relative"
                zIndex="2"
                mt="-100px" // ⚡ The "Overlap" magic
                px={4}
                pb={20}
            >
                <Box
                    maxW="900px"
                    mx="auto"
                    bg="rgba(13, 25, 48, 0.85)" // Darker glass
                    backdropFilter="blur(20px)"
                    borderRadius="3xl"
                    border="1px solid rgba(255, 215, 0, 0.15)" // Subtle Gold Border
                    boxShadow="0 -10px 40px rgba(0,0,0,0.5)"
                    overflow="hidden"
                >
                    {/* Header: Name & Message */}
                    <VStack spacing={3} p={[6, 8]} textAlign="center" bgGradient="linear(to-b, rgba(255,255,255,0.03), transparent)">
                        <Text
                            fontSize={["2xl", "3xl"]}
                            fontWeight="bold"
                            color="#FFD700" // Gold Text for Name
                            letterSpacing="wide"
                        >
                            Hare Krishna, {data.campaignerName}
                        </Text>
                        <Text
                            fontSize={["sm", "md"]}
                            color="gray.300"
                            fontStyle="italic"
                            maxW="600px"
                            lineHeight="1.6"
                        >
                            {message}
                        </Text>
                    </VStack>

                    {/* 📊 ACTION DASHBOARD: Stats & Tracker */}
                    <Box p={[4, 8]}>
                        {/* 1. The Streak Counters (Gamification) */}
                        <HStack
                            spacing={4}
                            justify="center"
                            mb={8}
                            w="100%"
                        >
                            <VStack
                                bg="rgba(0,0,0,0.3)"
                                p={4}
                                borderRadius="xl"
                                w="45%"
                                border="1px solid rgba(255, 255, 255, 0.1)"
                            >
                                <Text fontSize="xs" color="gray.400" textTransform="uppercase" letterSpacing="1px">
                                    Current Streak
                                </Text>
                                <Text fontSize={["2xl", "4xl"]} fontWeight="800" color="#FFD700">
                                    {data.currentStreak} 🔥
                                </Text>
                            </VStack>

                            <VStack
                                bg="rgba(0,0,0,0.3)"
                                p={4}
                                borderRadius="xl"
                                w="45%"
                                border="1px solid rgba(255, 255, 255, 0.1)"
                            >
                                <Text fontSize="xs" color="gray.400" textTransform="uppercase" letterSpacing="1px">
                                    Best Streak
                                </Text>
                                <Text fontSize={["2xl", "4xl"]} fontWeight="800" color="white">
                                    {data.longestStreak} 🏆
                                </Text>
                            </VStack>
                        </HStack>

                        {/* 2. The Weekly Lotus Tracker (Visual Progress) */}
                        <Box
                            bg="rgba(255, 255, 255, 0.03)"
                            borderRadius="2xl"
                            p={5}
                            border="1px solid rgba(255, 255, 255, 0.05)"
                        >
                            <Text
                                textAlign="center"
                                mb={4}
                                fontSize="sm"
                                color="blue.200"
                                fontWeight="600"
                            >
                                YOUR WEEKLY OFFERING
                            </Text>

                            <WeeklyLotusRow days={data.weekDays} />

                            {/* Subtly motivating text below tracker */}
                            <Text textAlign="center" mt={4} fontSize="xs" color="gray.500">
                                Every lotus blooms with a sincere offering.
                            </Text>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default CampaignerDashboard;