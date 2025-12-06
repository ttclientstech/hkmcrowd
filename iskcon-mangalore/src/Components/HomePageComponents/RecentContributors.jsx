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
import { formatCurrency, formatTimeAgo } from "../utils";
import { fetchAllContributers } from "../../utils/apiCall";

const avatarBG = "#E8EEF9";
const avatarText = "#1A3353";
const SQFT_PRICE = 5001; // 1 Sq.Ft = ₹5001

const RecentContributors = () => {
    const [tab, setTab] = useState("latest");
    const [loading, setLoading] = useState(true);
    const [contributors, setContributors] = useState([]);

    const isMobile = useBreakpointValue({ base: true, md: false });

    useEffect(() => {
        const loadContributors = async () => {
            setLoading(true);
            try {
                const data = await fetchAllContributers(); // ✅ call your API
                setContributors(data || []);
            } catch (err) {
                console.error("Error fetching contributors:", err);
            }
            setLoading(false);
        };

        loadContributors();
    }, []);

    // ✅ Latest = last 10 entries (data is ascending by time)
    const latestData = contributors
        .filter((c) => c?.finalpaymentstatus === "captured")
        .slice(-10)
        .reverse();

    // ✅ Largest = top 5 by amount
    const largestData = [...contributors]
        .filter((c) => c?.paymentstatus === true || c?.finalpaymentstatus === "captured")
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 5);

    // ✅ Format sqft/amount display
    const formatSqftOrAmount = (amt) => {
        if (amt >= SQFT_PRICE) {
            const sqft = Math.round(amt / SQFT_PRICE);
            return `${sqft} Sq. Ft.`;
        }
        return formatCurrency(amt);
    };

    const renderContributorCard = (user, idx, showMedal = false) => {
        const name = user?.isanonymous ? "Anonymous" : user?.username;
        const displayValue = formatSqftOrAmount(user?.amount);

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

                    <VStack align="flex-start" spacing={0}>
                        <Text fontWeight="700" color="#1A1A1A">
                            {name}{" "}
                            <Text as="span" fontWeight="500" color="#424242">
                                donated {displayValue}
                            </Text>
                        </Text>

                        <Text fontSize="sm" color="#6B7280">
                            {formatTimeAgo(user?.createdate)}
                        </Text>
                    </VStack>
                </HStack>

                {showMedal && (
                    <Box fontSize="24px">
                        {idx === 0 && "🥇"}
                        {idx === 1 && "🥈"}
                        {idx === 2 && "🥉"}
                        {idx > 2 && (
                            <Box w="20px" h="20px" bg="#d0d0d0" borderRadius="50%" />
                        )}
                    </Box>
                )}
            </HStack>
        );
    };

    return (
        <Box
            w="100%"
            maxW="900px"
            mx="auto"
            mt={12}
            px={4}
            fontFamily="'Poppins', sans-serif"
        >
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
            <Box bg="#F4F2EE" borderRadius="16px" p={5} shadow="md">
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
                        {tab === "latest" && (
                            <VStack gap={4}>
                                {latestData.length > 0 ? (
                                    latestData.map((user, idx) =>
                                        renderContributorCard(user, idx)
                                    )
                                ) : (
                                    <Text color="gray.500">No recent contributions yet.</Text>
                                )}
                            </VStack>
                        )}

                        {tab === "leaderboard" && (
                            <VStack gap={4}>
                                {largestData.length > 0 ? (
                                    largestData.map((user, idx) =>
                                        renderContributorCard(user, idx, true)
                                    )
                                ) : (
                                    <Text color="gray.500">No top contributors yet.</Text>
                                )}
                            </VStack>
                        )}
                    </>
                )}
            </Box>
        </Box>
    );
};

export default RecentContributors;