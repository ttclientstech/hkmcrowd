import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Flex, Text, VStack, Spinner } from "@chakra-ui/react";
import Navbar from "./Navbar";
import LotusBlock from "./LotusBlock";
import WeeklyLotusRow from "./WeeklyLotusRow";

const NAVY = "#081229";
const GOLD = "#FFD45E";

const CampaignerDashboard = () => {
    const [data, setData] = useState(null);
    const campaignerId = window.location.pathname.split("/").pop();

    useEffect(() => {
        axios.get(`/api/campaigner/${campaignerId}/streak`).then((res) => setData(res.data));
    }, [campaignerId]);

    if (!data)
        return (
            <Flex justify="center" align="center" minH="100vh" bg={NAVY}>
                <Spinner color="gold" />
            </Flex>
        );

    return (
        <Box bgGradient="linear(to-b, #081229, #0E1F38)" minH="100vh" color="white">
            <Navbar campaignerName={data.campaignerName} campaignerImage={data.campaignerImage} />

            <VStack spacing={6} mt={10} textAlign="center" fontFamily="'Lora', serif">
                <Text fontSize="3xl" fontWeight="700" color={GOLD}>
                    Hare Krishna, {data.campaignerName}
                </Text>
                <Text fontSize="md" maxW="700px" color="gray.300">
                    Thank you for being a part of building a divine home for{" "}
                    <Text as="span" color={GOLD}>
                        Sri Sri Rukmini Dwarakadish
                    </Text>{" "}
                    in Chennai. Every seva you inspire helps blossom devotion in countless hearts.
                </Text>

                <LotusBlock achieved={data.todayAchieved} />

                <Text mt={3} color="gray.300" fontStyle="italic" fontSize="sm">
                    Your daily seva offering to Lord Krishna.<br />
                    Receive even a small donation today to blossom your lotus and offer it to Him.
                </Text>

                <WeeklyLotusRow days={data.weekDays} />

                <Box mt={6}>
                    <Text fontWeight="bold" color={GOLD}>
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
