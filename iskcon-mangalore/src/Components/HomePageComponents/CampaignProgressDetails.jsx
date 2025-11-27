import {
    Box,
    Flex,
    Text,
    useColorModeValue,
    Progress,
    Badge
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { formatCurrency } from "../utils";
import CountUp from "react-countup";

// Keyframes removed as the animation is no longer used for the border.

const CampaignProgressDetails = ({ currentAmount, goalAmount }) => {
    const [progress, setProgress] = useState(0);

    // Constants for VCM style (Square Feet)
    const COST_PER_SQFT = 2100; // Mocked based on VCM reference
    const currentSqFt = Math.floor(currentAmount / COST_PER_SQFT);
    const goalSqFt = Math.floor(goalAmount / COST_PER_SQFT); // Calculate goal in Sq Ft
    const displayGoalSqFt = goalSqFt > 0 ? goalSqFt : 1000; // Fallback value
    const displayCurrentSqFt = currentSqFt;

    useEffect(() => {
        if (displayGoalSqFt > 0) {
            const targetPercentage = Math.min(
                (displayCurrentSqFt / displayGoalSqFt) * 100,
                100
            );
            let start = 0;

            const interval = setInterval(() => {
                if (start >= targetPercentage) {
                    setProgress(targetPercentage);
                    clearInterval(interval);
                } else {
                    start += 1;
                    setProgress(start);
                }
            }, 20);

            return () => clearInterval(interval);
        }
    }, [displayCurrentSqFt, displayGoalSqFt]);

    // VCM-style Colors
    const progressColor = "#B22222"; // Firebrick / Maroon
    const trackColor = useColorModeValue("gray.200", "gray.700");
    const textColor = "#2C0A0A";

    return (
        <Box
            w={'100%'}
            borderRadius="lg"
            px={[4, 6]}
            py={4}
            bg="white"
            boxShadow="lg"
            border="1px solid #E2E8F0"
        >
            {/* Progress Bar */}
            <Progress
                value={progress}
                size="lg"
                colorScheme="red" // Chakra UI map for a strong color
                borderRadius="md"
                mb={3}
                sx={{
                    '& > div': {
                        bg: progressColor, // Override with VCM-style color
                    },
                }}

            />

            {/* Status Line: X% Raised */}
            <Flex justify="space-between" align="center" mb={4}>
                <Text fontSize={["xl", "2xl"]} fontWeight="bold" color={progressColor}>
                    {progress.toFixed(2)}% Raised
                </Text>
                <Badge colorScheme="green" variant="subtle" fontSize="sm">
                    GOAL: {displayGoalSqFt} Sq Ft
                </Badge>
            </Flex>

            {/* Main Numbers: Square Feet Achieved */}
            <Box pb={2} borderBottom="1px solid #E2E8F0">
                <Text fontSize={["md", "lg"]} fontWeight="semibold" color="gray.600">
                    Square Feet Achieved
                </Text>
                <Flex align="baseline" color={textColor}>
                    <Box fontSize={["3xl", "4xl"]} fontWeight="extrabold">
                        <CountUp end={displayCurrentSqFt} start={displayCurrentSqFt / 2} duration={2} separator="," />
                    </Box>
                    <Text fontSize={["lg", "xl"]} fontWeight="bold" ml={2} color="gray.700">
                        Square Feet
                    </Text>
                </Flex>
            </Box>

            {/* Financial Summary */}
            <Flex justify="space-between" mt={4} flexWrap="wrap">
                <Box>
                    <Text fontSize="sm" fontWeight="medium" color="gray.500">
                        Amount Raised
                    </Text>
                    <Text fontSize="lg" fontWeight="bold" color={textColor}>
                        ₹{formatCurrency(currentAmount)}
                    </Text>
                </Box>
                <Box textAlign="right">
                    <Text fontSize="sm" fontWeight="medium" color="gray.500">
                        Target Amount
                    </Text>
                    <Text fontSize="lg" fontWeight="bold" color={textColor}>
                        ₹{formatCurrency(goalAmount)}
                    </Text>
                </Box>
            </Flex>
        </Box>
    );
};

export default CampaignProgressDetails;