import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Box,
    SimpleGrid,
    VStack,
    HStack,
    Text,
    Image,
    Icon,
    Spinner,
    Badge,
    Tooltip
} from "@chakra-ui/react";

// Icons for categories
import { FaTrophy, FaCalendarDay, FaCalendarWeek, FaDonate, FaUsers, FaFire } from "react-icons/fa";
import { BE_API_URL } from "../../constants/homePage";

const COST_PER_SQFT = 5000;

// Configuration for each badge type
const BADGE_CONFIG = {
    top_overall: {
        label: "Supreme Champion",
        subLabel: "Highest Total Collection",
        icon: FaTrophy,
        color: "yellow.400", // Gold
        bgGradient: "linear(to-br, rgba(255, 215, 0, 0.1), rgba(255, 215, 0, 0.05))",
        borderColor: "yellow.500",
        isAmount: true // ✅ Flag to indicate this needs SqFt conversion
    },
    top_today: {
        label: "Star of the Day",
        subLabel: "Highest Collection Today",
        icon: FaCalendarDay,
        color: "cyan.400",
        bgGradient: "linear(to-br, rgba(0, 255, 255, 0.1), rgba(0, 255, 255, 0.05))",
        borderColor: "cyan.500",
        isAmount: true
    },
    top_week: {
        label: "Warrior of the Week",
        subLabel: "Highest Collection This Week",
        icon: FaCalendarWeek,
        color: "orange.400",
        bgGradient: "linear(to-br, rgba(255, 165, 0, 0.1), rgba(255, 165, 0, 0.05))",
        borderColor: "orange.500",
        isAmount: true
    },
    top_single: {
        label: "Grand Patron",
        subLabel: "Highest Single Donation",
        icon: FaDonate,
        color: "purple.400",
        bgGradient: "linear(to-br, rgba(128, 0, 128, 0.1), rgba(128, 0, 128, 0.05))",
        borderColor: "purple.500",
        isAmount: true
    },
    most_donors: {
        label: "People's Choice",
        subLabel: "Highest Number of Donors",
        icon: FaUsers,
        color: "pink.400",
        bgGradient: "linear(to-br, rgba(255, 105, 180, 0.1), rgba(255, 105, 180, 0.05))",
        borderColor: "pink.500",
        isAmount: false // Count based
    },
    top_streak: {
        label: "Unstoppable Force",
        subLabel: "Longest Active Streak",
        icon: FaFire,
        color: "red.500", // Fire Red
        bgGradient: "linear(to-br, rgba(255, 0, 0, 0.15), rgba(255, 0, 0, 0.05))",
        borderColor: "red.500",
        isAmount: false // Count based
    }
};

const LeaderboardCard = ({ type, data }) => {
    const config = BADGE_CONFIG[type];
    if (!config || !data) return null;

    let formattedValue;

    // 1. Check if the badge is amount-based
    if (config.isAmount) {
        const amount = Number(data.value);

        if (amount >= COST_PER_SQFT) {
            // Convert to Sq.Ft
            const sqFt = Math.floor(amount / COST_PER_SQFT);
            formattedValue = `${sqFt} Sq.Ft`;
        } else {
            // Display Currency if less than 1 Sq.Ft
            formattedValue = `₹${amount.toLocaleString()}`;
        }
    } else {
        // 2. Handle non-amount badges (Streak / Donors)
        if (type === "top_streak") {
            formattedValue = `${data.value} Days`;
        } else if (type === "most_donors") {
            formattedValue = `${data.value} Donors`;
        } else {
            formattedValue = data.value;
        }
    }

    return (
        <Box
            position="relative"
            bg={config.bgGradient}
            border="1px solid"
            borderColor={config.borderColor}
            borderRadius="xl"
            p={4}
            boxShadow={`0 0 15px ${config.color}22`}
            transition="transform 0.3s"
            _hover={{ transform: "translateY(-5px)", boxShadow: `0 0 25px ${config.color}44` }}
            overflow="hidden"
        >
            {/* Background Icon Watermark */}
            <Icon
                as={config.icon}
                position="absolute"
                bottom="-10px"
                right="-10px"
                w="80px"
                h="80px"
                color={config.color}
                opacity={0.1}
            />

            <VStack spacing={3} align="center">
                {/* Badge Header */}
                <HStack spacing={2} bg="rgba(0,0,0,0.3)" px={3} py={1} borderRadius="full">
                    <Icon as={config.icon} color={config.color} />
                    <Text fontSize="xs" fontWeight="bold" color={config.color} textTransform="uppercase" letterSpacing="1px">
                        {config.label}
                    </Text>
                </HStack>

                {/* Campaigner Avatar */}
                <Box position="relative">
                    <Image
                        src={data.image || "https://via.placeholder.com/150"}
                        alt={data.name}
                        boxSize="70px"
                        borderRadius="full"
                        border="2px solid"
                        borderColor={config.color}
                        objectFit="cover"
                        boxShadow="lg"
                    />
                    {/* Rank Badge */}
                    <Badge
                        position="absolute"
                        bottom="-5px"
                        right="-5px"
                        bg={config.color}
                        color="black"
                        borderRadius="full"
                        fontSize="xs"
                        boxSize="20px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        #1
                    </Badge>
                </Box>

                {/* Name & Value */}
                <VStack spacing={0}>
                    <Text fontSize="sm" fontWeight="bold" color="white" noOfLines={1}>
                        {data.name}
                    </Text>
                    <Tooltip label={config.subLabel} hasArrow bg="gray.700">
                        <Text fontSize="xs" color="gray.400">
                            {config.subLabel}
                        </Text>
                    </Tooltip>

                    <Text fontSize="lg" fontWeight="800" color={config.color} pt={1}>
                        {formattedValue}
                    </Text>
                </VStack>
            </VStack>
        </Box>
    );
};

const Leaderboard = () => {
    const [leaders, setLeaders] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${BE_API_URL}/api/leaderboard`)
            .then((res) => {
                setLeaders(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching leaderboard:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <VStack py={10}>
                <Spinner color="yellow.400" size="xl" />
                <Text color="gray.500" fontSize="sm">Summoning the champions...</Text>
            </VStack>
        );
    }

    if (!leaders || Object.keys(leaders).length === 0) return null;

    return (
        <Box
            w="100%"
            bg="rgba(255, 255, 255, 0.03)"
            borderRadius="2xl"
            border="1px solid rgba(255, 255, 255, 0.05)"
            p={[5, 8]}
            mt={8}
            mb={10}
        >
            <VStack spacing={6} align="stretch">
                {/* Header */}
                <VStack align="center" textAlign="center" spacing={1}>
                    <Text
                        fontSize={["lg", "xl"]}
                        fontWeight="800"
                        bgGradient="linear(to-r, #FFD700, #FFA500)"
                        bgClip="text"
                        textTransform="uppercase"
                        letterSpacing="2px"
                    >
                        Hall of Champions
                    </Text>
                    <Text fontSize="sm" color="gray.400">
                        Honoring the top souls leading the divine service
                    </Text>
                </VStack>

                {/* Grid Layout */}
                <SimpleGrid columns={[1, 2, 3]} spacing={5}>
                    {/* Render cards only if data exists for that category */}
                    <LeaderboardCard type="top_overall" data={leaders.top_overall} />
                    <LeaderboardCard type="top_streak" data={leaders.top_streak} />
                    <LeaderboardCard type="top_week" data={leaders.top_week} />
                    <LeaderboardCard type="top_today" data={leaders.top_today} />
                    <LeaderboardCard type="top_single" data={leaders.top_single} />
                    <LeaderboardCard type="most_donors" data={leaders.most_donors} />
                </SimpleGrid>
            </VStack>
        </Box>
    );
};

export default Leaderboard;