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

    // ✅ Dynamic heights that adapt for small screens
    const bgHeight = useBreakpointValue({ base: "auto", md: "85vh" });
    const lotusWidth = useBreakpointValue({ base: "90%", md: "70%", lg: "55%" });

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

    const lotusImage = data.todayAchieved ? lotusBloom : lotusBud;

    const message = data.todayAchieved
        ? `“Beautiful! Your lotus has blossomed today — an offering of your seva to Lord Krishna. May His grace and smile bless your heartfelt service.”`
        : `“Today, your lotus awaits your seva. Receive even a small donation today to blossom your lotus and offer it to Lord Krishna.”`;

    return (
        <Box
            bg="#031931"
            minH="100vh"
            fontFamily="'Poppins', sans-serif"
            overflowX="hidden" // ✅ Prevent horizontal overflow on mobile
        >
            <Navbar
                campaignerName={data.campaignerName}
                campaignerImage={data.campaignerImage}
            />

            {/* 🌸 HERO SECTION */}
            <Box
                position="relative"
                w="100%"
                minH={["70vh", "80vh", "85vh"]} // ✅ Responsive height
                overflow="hidden"
                bg="#031931"
                display="flex"
                flexDirection="column"
                justifyContent="flex-end" // ✅ keep bottom alignment
                alignItems="center"
                textAlign="center"
                px={[3, 6, 10]}
                pb={["30px", "35px"]}
            >
                <Image
                    src={lotusImage}
                    alt="Lotus Background"
                    position="absolute"
                    bottom="0"
                    left="50%"
                    transform="translateX(-50%)"
                    w={lotusWidth}
                    maxH="100%"
                    objectFit="contain"
                    objectPosition="center bottom"
                    zIndex="0"
                />

                <Flex
                    direction="column"
                    align="center"
                    justify="flex-end"
                    position="relative"
                    zIndex="1"
                    w="100%"
                    maxW="900px"
                >
                    <Text
                        fontSize={["2xl", "3xl", "4xl"]}
                        fontWeight="700"
                        color="#fae165"
                        mb={3}
                        px={[2, 4]} // ✅ Adds padding for small screens
                    >
                        Hare Krishna, {data.campaignerName}
                    </Text>

                    <Text
                        fontSize={["md", "lg"]}
                        fontWeight="500"
                        color="white"
                        lineHeight="1.7"
                        px={[4, 8]}
                    >
                        {message}
                    </Text>
                </Flex>
            </Box>

            {/* 🌼 Weekly Lotus Tracker */}
            <VStack
                spacing={8}
                py={[6, 10]}
                px={[2, 4]}
                w="100%"
                maxW="100%"
                overflowX="hidden" // ✅ ensures lotus row doesn’t overflow horizontally
            >
                <WeeklyLotusRow days={data.weekDays} />

                <Box textAlign="center" px={[2, 6]}>
                    <Text
                        fontWeight="bold"
                        color="#E63946"
                        fontSize={["md", "lg"]}
                        mb={1}
                    >
                        Current Streak: {data.currentStreak} days 🔥
                    </Text>
                    <Text fontSize="sm" color="gray.400">
                        Longest Streak: {data.longestStreak} days
                    </Text>
                </Box>
            </VStack>
        </Box>
    );
};

export default CampaignerDashboard;