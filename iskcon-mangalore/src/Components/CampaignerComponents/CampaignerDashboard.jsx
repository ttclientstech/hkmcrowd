import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Box,
    Flex,
    Text,
    VStack,
    Spinner,
    Image,
    SimpleGrid,
    useBreakpointValue,
} from "@chakra-ui/react";
import Navbar from "./Navbar";
import WeeklyLotusRow from "./WeeklyLotusRow";
import { BE_API_URL } from "../../constants/homePage";

// Import your images
import lotusBud from "../../assets/images/lotus_bud.png";
import lotusBloom from "../../assets/images/lotus_blossom.png";

const CampaignerDashboard = () => {
    const [data, setData] = useState(null);
    const campaignerId = window.location.pathname.split("/").pop();

    // Responsive values
    const lotusSize = useBreakpointValue({ base: "250px", md: "350px", lg: "400px" });

    useEffect(() => {
        axios
            .get(`${BE_API_URL}/api/campaigner/${campaignerId}/streak`)
            .then((res) => setData(res.data))
            .catch((err) => console.error("Error fetching campaigner data:", err));
    }, [campaignerId]);

    if (!data)
        return (
            <Flex justify="center" align="center" minH="100vh" bg="#020c1b">
                <Spinner size="xl" color="#fae165" thickness="4px" />
            </Flex>
        );

    const lotusImage = data.todayAchieved ? lotusBloom : lotusBud;

    const message = data.todayAchieved
        ? `“Beautiful! Your lotus has blossomed today — an offering of your seva to Lord Krishna.”`
        : `“Today, your lotus awaits your seva. Receive even a small donation to blossom your lotus.”`;

    return (
        <Box
            // 🌌 Theme Background: Deep Navy Gradient matching the hero image
            bgGradient="linear(to-b, #020c1b 0%, #051e3e 40%, #0a2e52 100%)"
            minH="100vh"
            fontFamily="'Poppins', sans-serif"
            color="white"
            overflowX="hidden"
        >
            {/* 🛡️ Navbar: Passed 'transparent' prop or style directly */}
            <Box position="absolute" top="0" w="100%" zIndex="10">
                <Navbar
                    campaignerName={data.campaignerName}
                    campaignerImage={data.campaignerImage}
                    // Suggestion: Update Navbar component to accept bg="transparent" or rgba(0,0,0,0.3)
                />
            </Box>

            {/* 🌸 HERO DASHBOARD SECTION */}
            <Flex
                direction="column"
                align="center"
                justify="center"
                pt={["120px", "140px"]} // Padding for Navbar
                pb={10}
                px={4}
                w="100%"
            >
                {/* Main Lotus Visual */}
                <Box
                    position="relative"
                    w={lotusSize}
                    h={lotusSize}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    mb={6}
                    // 🌟 Glow Effect behind the lotus
                    _before={{
                        content: '""',
                        position: "absolute",
                        width: "120%",
                        height: "120%",
                        bg: "radial-gradient(circle, rgba(65, 169, 255, 0.15) 0%, rgba(0,0,0,0) 70%)",
                        zIndex: 0,
                    }}
                >
                    <Image
                        src={lotusImage}
                        alt="Lotus Status"
                        maxH="100%"
                        maxW="100%"
                        objectFit="contain"
                        zIndex="1"
                        filter="drop-shadow(0px 10px 20px rgba(0,0,0,0.5))" // Shadow for depth
                    />
                </Box>

                {/* Welcome Text */}
                <VStack spacing={4} textAlign="center" maxW="800px" zIndex="2">
                    <Text
                        fontSize={["2xl", "4xl", "5xl"]}
                        fontWeight="700"
                        bgGradient="linear(to-r, #fae165, #fff8c4)"
                        bgClip="text"
                        letterSpacing="wide"
                    >
                        Hare Krishna, {data.campaignerName}
                    </Text>

                    <Text
                        fontSize={["md", "lg"]}
                        color="blue.100"
                        fontWeight="300"
                        lineHeight="1.8"
                        fontStyle="italic"
                    >
                        {message}
                    </Text>
                </VStack>
            </Flex>

            {/* 📊 DASHBOARD METRICS SECTION */}
            <Box w="100%" maxW="1200px" mx="auto" px={[4, 8]} pb={20}>
                {/* Glassmorphism Container for Stats */}
                <Box
                    bg="rgba(255, 255, 255, 0.05)" // Glass effect
                    backdropFilter="blur(12px)"
                    border="1px solid rgba(255, 255, 255, 0.1)"
                    borderRadius="2xl"
                    p={[6, 8, 10]}
                    boxShadow="0 8px 32px rgba(0, 0, 0, 0.4)"
                >
                    <VStack spacing={10}>
                        {/* Weekly Tracker Row */}
                        <Box w="100%">
                            <WeeklyLotusRow days={data.weekDays} />
                        </Box>

                        {/* Divider Line */}
                        <Box w="100%" h="1px" bg="whiteAlpha.200" />

                        {/* Stats Grid */}
                        <SimpleGrid columns={[2, 2]} spacing={10} w="100%" maxW="600px">
                            {/* Current Streak */}
                            <VStack>
                                <Text fontSize="4xl" fontWeight="bold" color="#fae165">
                                    {data.currentStreak} 🔥
                                </Text>
                                <Text fontSize="sm" color="gray.400">
                                    Current Streak
                                </Text>
                            </VStack>

                            {/* Longest Streak */}
                            <VStack>
                                <Text fontSize="4xl" fontWeight="bold" color="white">
                                    {data.longestStreak} 🌟
                                </Text>
                                <Text fontSize="sm" color="gray.400">
                                    Longest Streak
                                </Text>
                            </VStack>
                        </SimpleGrid>
                    </VStack>
                </Box>
            </Box>
        </Box>
    );
};

export default CampaignerDashboard;