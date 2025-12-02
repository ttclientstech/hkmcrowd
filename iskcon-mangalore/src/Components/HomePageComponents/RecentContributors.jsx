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
import { formatCurrency, formatTimeAgo } from '../utils';

// ★ CHANGE START — removed random avatar colors
const avatarBG = "#E8EEF9";
const avatarText = "#1A3353";
// ★ CHANGE END

// Dummy leaderboard
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
        setTimeout(() => setLoading(false), 1000);
    }, []);

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
                {/* Loading Skeleton */}
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
                        {/* LATEST TAB */}
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
                                                {/* ★ CHANGE START — avatar style updated */}
                                                <Flex
                                                    w="48px"
                                                    h="48px"
                                                    borderRadius="50%"
                                                    bg={avatarBG}
                                                    color={avatarText}
                                                    align="center"
                                                    justify="center"
                                                    fontWeight="700"
                                                    fontSize="lg"
                                                    border="1px solid #D6DEEA" // soft edge
                                                >
                                                    {name?.charAt(0)?.toUpperCase()}
                                                </Flex>
                                                {/* ★ CHANGE END */}

                                                <VStack align="flex-start" spacing={0}>
                                                    <Text fontWeight="700" color="#1A1A1A">
                                                        {name}{" "}
                                                        <Text as="span" fontWeight="500" color="#424242">
                                                            donated {formatCurrency(user?.amount)}
                                                        </Text>
                                                    </Text>

                                                    {/* ★ CHANGE START — softer date color */}
                                                    <Text fontSize="sm" color="#6B7280">
                                                        {formatTimeAgo(user?.date)}
                                                    </Text>
                                                    {/* ★ CHANGE END */}
                                                </VStack>
                                            </HStack>
                                        </HStack>
                                    );
                                })}
                            </VStack>
                        )}

                        {/* LEADERBOARD TAB */}
                        {tab === "leaderboard" && (
                            <VStack gap={4}>
                                {dummyLeaderboard.map((user, idx) => {
                                    const name = user.username;

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
                                                {/* ★ CHANGE START — same unified avatar */}
                                                <Flex
                                                    w="48px"
                                                    h="48px"
                                                    borderRadius="50%"
                                                    bg={avatarBG}
                                                    color={avatarText}
                                                    align="center"
                                                    justify="center"
                                                    fontWeight="700"
                                                    fontSize="lg"
                                                    border="1px solid #D6DEEA"
                                                >
                                                    {name?.charAt(0)?.toUpperCase()}
                                                </Flex>
                                                {/* ★ CHANGE END */}

                                                <VStack align="flex-start" spacing={0}>
                                                    <Text fontWeight="700" color="#1A1A1A">{name}</Text>
                                                    <Text fontSize="sm" color="#6B7280">
                                                        Donated {formatCurrency(user.amount)}
                                                    </Text>
                                                </VStack>
                                            </HStack>

                                            {/* Medals unchanged */}
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