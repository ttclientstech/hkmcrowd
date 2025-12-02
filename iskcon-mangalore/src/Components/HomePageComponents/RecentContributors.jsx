import React, { useState, useEffect } from "react";
import {
    Box,
    Text,
    Flex,
    HStack,
    VStack,
    Skeleton,
    SkeletonCircle,
    Button,
    useBreakpointValue,
} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { formatCurrency, formatTimeAgo } from '../utils';

// Auto-generate consistent avatar colors
const getAvatarColor = (name) => {
    const colors = ["#5EB0FF", "#FF8B8B", "#FFD369", "#A88BEB", "#6EE7B7", "#FCA5A5"];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
};

// Dummy leaderboard (until backend is ready)
const dummyLeaderboard = [
    { username: "Ramesh Kumar", amount: 50000 },
    { username: "Anita Devi", amount: 35000 },
    { username: "Sunil Gupta", amount: 30000 },
    { username: "Kiran Prakash", amount: 20000 },
    { username: "Nirmala S", amount: 10000 },
];

const RecentContributors = ({ getSingleUser }) => {

    const [tab, setTab] = useState("latest");
    const [loading, setLoading] = useState(true);

    const isMobile = useBreakpointValue({ base: true, md: false });

    useEffect(() => {
        // Simulate load shimmer for 1 sec
        setTimeout(() => setLoading(false), 1000);
    }, []);

    // Latest contributors
    const latestData = getSingleUser?.top10paymentDetails || [];

    return (
        <Box w="100%" maxW="900px" mx="auto" mt={12} px={4} fontFamily="'Poppins', sans-serif">

            <Text
                textAlign="center"
                fontSize={["2xl", "3xl"]}
                fontWeight="500"
                color="#082032"
                mb={6}
            >
                Recent <Text as="span" color="#082032">Contributors</Text>
            </Text>

            {/* TAB SWITCH */}
            <HStack justify="center" mb={6} gap={4}>
                <Button
                    onClick={() => setTab("latest")}
                    bg={tab === "latest" ? "#082032" : "white"}
                    color={tab === "latest" ? "white" : "#082032"}
                    border="2px solid #082032"
                    borderRadius="50px"
                    px={8}
                >
                    Latest
                </Button>

                <Button
                    onClick={() => setTab("leaderboard")}
                    bg={tab === "leaderboard" ? "#082032" : "white"}
                    color={tab === "leaderboard" ? "white" : "#082032"}
                    border="2px solid #082032"
                    borderRadius="50px"
                    px={8}
                >
                    Largest
                </Button>
            </HStack>

            {/* CARD CONTAINER */}
            <Box
                bg="#F4F2EE"
                borderRadius="16px"
                p={5}
                shadow="md"
            >
                {/* LOADING SKELETON */}
                {loading ? (
                    <VStack gap={4}>
                        {[1, 2, 3, 4].map((i) => (
                            <HStack key={i} w="100%" p={4} bg="white" borderRadius="12px">
                                <SkeletonCircle size="12" />
                                <VStack align="flex-start" flex="1">
                                    <Skeleton height="12px" w="70%" />
                                    <Skeleton height="12px" w="40%" />
                                </VStack>
                            </HStack>
                        ))}
                    </VStack>
                ) : (
                    <>
                        {/* ===========================
                           LATEST TAB
                        ============================ */}
                        {tab === "latest" && (
                            <VStack gap={4}>
                                {latestData.map((user, idx) => {
                                    const name = user?.isanonymous ? "Anonymous" : user?.username;
                                    return (
                                        <HStack
                                            key={idx}
                                            w="100%"
                                            bg="white"
                                            p={4}
                                            borderRadius="12px"
                                            justify="space-between"
                                        >
                                            <HStack gap={4}>
                                                {/* Avatar */}
                                                <Flex
                                                    w="48px"
                                                    h="48px"
                                                    borderRadius="50%"
                                                    bg={getAvatarColor(name)}
                                                    color="white"
                                                    align="center"
                                                    justify="center"
                                                    fontWeight="700"
                                                    fontSize="lg"
                                                >
                                                    {name?.charAt(0)?.toUpperCase()}
                                                </Flex>

                                                {/* Text */}
                                                <VStack align="flex-start" spacing={0}>
                                                    <Text fontWeight="700">
                                                        {name}{" "}
                                                        <Text as="span" fontWeight="500">
                                                            donated {formatCurrency(user?.amount)}
                                                        </Text>
                                                    </Text>
                                                    <Text fontSize="sm" color="gray.600">
                                                        {formatTimeAgo(user?.date)}
                                                    </Text>
                                                </VStack>
                                            </HStack>
                                        </HStack>
                                    );
                                })}
                            </VStack>
                        )}

                        {/* ===========================
                           LEADERBOARD TAB
                        ============================ */}
                        {tab === "leaderboard" && (
                            <VStack gap={4}>
                                {dummyLeaderboard.map((user, idx) => {
                                    const name = user.username;
                                    const badgeColors = ["#FFD700", "#C0C0C0", "#CD7F32"]; // Gold/Silver/Bronze
                                    return (
                                        <HStack
                                            key={idx}
                                            w="100%"
                                            bg="white"
                                            p={4}
                                            borderRadius="12px"
                                            justify="space-between"
                                        >
                                            <HStack gap={4}>
                                                {/* Avatar */}
                                                <Flex
                                                    w="48px"
                                                    h="48px"
                                                    borderRadius="50%"
                                                    bg={getAvatarColor(name)}
                                                    color="white"
                                                    align="center"
                                                    justify="center"
                                                    fontWeight="700"
                                                    fontSize="lg"
                                                >
                                                    {name[0]}
                                                </Flex>

                                                <VStack align="flex-start" spacing={0}>
                                                    <Text fontWeight="700">{name}</Text>
                                                    <Text fontSize="sm" color="gray.600">
                                                        Donated {formatCurrency(user.amount)}
                                                    </Text>
                                                </VStack>
                                            </HStack>

                                            <Box fontSize="24px">
                                            {idx === 0 && "🥇"}
                                            {idx === 1 && "🥈"}
                                            {idx === 2 && "🥉"}
                                            {idx > 2 && <Box w="20px" h="20px" bg="#d0d0d0" borderRadius="50%" />}
                                            </Box>
                                        </HStack>
                                    );
                                })}
                            </VStack>
                        )}
                    </>
                )}
            </Box>
        </Box>
    );
};

export default RecentContributors;
