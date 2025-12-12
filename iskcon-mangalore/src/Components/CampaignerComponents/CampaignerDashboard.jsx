import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Box,
    Flex,
    Text,
    VStack,
    Spinner,
    Image,
    useBreakpointValue,
} from "@chakra-ui/react";
import Navbar from "./Navbar";
import WeeklyLotusRow from "./WeeklyLotusRow";
import { BE_API_URL } from "../../constants/homePage";

import lotusBud from "../../assets/images/lotus_bud.png";
import lotusBloom from "../../assets/images/lotus_blossom.png";

const CampaignerDashboard = () => {
    const [data, setData] = useState(null);
    const campaignerId = window.location.pathname.split("/").pop();


    useEffect(() => {
        axios
            .get(`${BE_API_URL}/api/campaigner/${campaignerId}/streak`)
            .then((res) => setData(res.data))
            .catch((err) => console.error("Error fetching campaigner data:", err));
    }, [campaignerId]);

    if (!data)
        return (
            <Flex justify="center" align="center" minH="100vh" bg="white">
                <Spinner color="#E63946" />
            </Flex>
        );

    // 🌸 Choose lotus image and message dynamically
    const lotusImage = data.todayAchieved ? lotusBloom : lotusBud;

    const message = data.todayAchieved
        ? `“Beautiful! Your lotus has blossomed today — an offering of your seva to Lord Krishna. May His grace and smile bless your heartfelt service.”`
        : `“Today, your lotus awaits your seva. Receive even a small donation today to blossom your lotus and offer it to Lord Krishna.”`;

    const bgHeight = useBreakpointValue({ base: "60vh", md: "80vh" });

    return (
        <Box bg="white" minH="100vh" fontFamily="'Poppins', sans-serif">
            <Navbar
                campaignerName={data.campaignerName}
                campaignerImage={data.campaignerImage}
            />

            {/* 🌸 HERO SECTION */}
            <Box
                position="relative"
                w="100%"
                h={bgHeight}
                overflow="hidden"
                bg="white"
            >
                {/* Lotus Background */}
                <Image
                    src={lotusImage}
                    alt="Lotus Background"
                    position="absolute"
                    bottom="0"
                    left="50%"
                    transform="translateX(-50%)"
                    w={useBreakpointValue({ base: "120%", md: "80%" })}
                    opacity="0.25"
                    objectFit="contain"
                    zIndex="0"
                    transition="opacity 0.5s ease"
                />

                {/* Hero Text */}
                <Flex
                    direction="column"
                    align="center"
                    justify="center"
                    textAlign="center"
                    h="100%"
                    px={[6, 10, 16]}
                    position="relative"
                    zIndex="1"
                >
                    <Text
                        fontSize={["2xl", "3xl", "4xl"]}
                        fontWeight="700"
                        color="#0A1931"
                        mb={3}
                    >
                        Hare Krishna, {data.campaignerName}
                    </Text>

                    <Text
                        fontSize={["md", "lg"]}
                        fontWeight="500"
                        color="#4A5568"
                        maxW="800px"
                        lineHeight="1.8"
                    >
                        {message}
                    </Text>
                </Flex>
            </Box>

            {/* 🌼 Weekly Lotus Tracker */}
            <VStack spacing={8} py={10} bg="white">
                <WeeklyLotusRow days={data.weekDays} />

                <Box textAlign="center">
                    <Text
                        fontWeight="bold"
                        color="#E63946"
                        fontSize={["md", "lg"]}
                        mb={1}
                    >
                        Current Streak: {data.currentStreak} days 🔥
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                        Longest Streak: {data.longestStreak} days
                    </Text>
                </Box>
            </VStack>
        </Box>
    );
};

export default CampaignerDashboard;