import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";

const NAVY = "#082032";
const CORAL = "#F28A7E";

const DailyGoalSection = ({ todaysGoal = 300, remainingSqft = 112 }) => {

    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const target = new Date();
        target.setHours(23, 59, 59, 999);

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
        <Box textAlign="center" mt={5}>
            {/* TODAY GOAL */}
            <Text
                fontSize="lg"
                fontWeight="700"
                color={NAVY}
                mb={1}
            >
                Today’s Goal
            </Text>

            {/* NUMBERS */}
            <Text
                fontSize="lg"
                fontWeight="600"
                color={NAVY}
                mb={2}
            >
                {todaysGoal} Sq Ft —{" "}
                <Text as="span" color={CORAL} fontWeight="700">
                    {remainingSqft} Sq Ft Remaining
                </Text>
            </Text>

            {/* ENDS IN LABEL */}
            <Text
                fontSize="sm"
                color={NAVY}
                opacity={0.8}
            >
                Ends in
            </Text>

            {/* COUNTDOWN */}
            <Text
                fontSize="2xl"
                fontWeight="700"
                color={NAVY}
                letterSpacing="1px"
                mt={1}
            >
                {timeLeft}
            </Text>
        </Box>
    );
};

export default DailyGoalSection;