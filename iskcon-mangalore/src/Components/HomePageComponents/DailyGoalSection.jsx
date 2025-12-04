import React, { useEffect, useState } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";

const NAVY = "#082032";
const GOLD = "#FBD38D";
const CORAL = "#F28A7E";
const CREAM = "#FFF6E7";

const DailyGoalSection = ({ todaysGoal = 300, remainingSqft = 112 }) => {

    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const target = new Date();
        target.setHours(23, 59, 59, 999); // resets every midnight

        const updateCountdown = () => {
            const now = new Date();
            const diff = target - now;

            if (diff <= 0) {
                setTimeLeft("00:00:00");
                return;
            }

            const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, "0");
            const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, "0");
            const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");

            setTimeLeft(`${hours}:${minutes}:${seconds}`);
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);

    }, []);

    return (
        <Box
            w="100%"
            mt={6}
            bg={CREAM}
            borderRadius="14px"
            px={5}
            py={4}
            textAlign="center"
            boxShadow="0 4px 14px rgba(0,0,0,0.08)"
            border={`1px solid ${GOLD}`}
        >
            {/* Top Line */}
            <Text fontSize="lg" fontWeight="700" color={NAVY}>
                Goal Today: {todaysGoal} Sq Ft —{" "}
                <Text as="span" color={CORAL}>
                    {remainingSqft} Sq Ft Remaining
                </Text>
            </Text>

            {/* Countdown */}
            <Flex justify="center" align="center" mt={2} gap={2}>
                <Text
                    fontSize="sm"
                    color={NAVY}
                    fontWeight="600"
                    opacity={0.8}
                >
                    Ends in
                </Text>

                <Box
                    px={3}
                    py={1}
                    borderRadius="10px"
                    bg={NAVY}
                    color="white"
                    fontSize="sm"
                    fontWeight="700"
                    letterSpacing="1px"
                    minW="90px"
                >
                    {timeLeft}
                </Box>
            </Flex>
        </Box>
    );
};

export default DailyGoalSection;