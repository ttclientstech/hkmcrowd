import React, { useState, useEffect } from "react";
import {
    Box,
    Text,
    Flex,
    HStack,
    VStack,
    Skeleton,
    SkeletonCircle,
    useBreakpointValue,
    Icon,
    Badge,
    Avatar
} from "@chakra-ui/react";
import { FaTrophy, FaHistory, FaHeart, FaMedal } from "react-icons/fa";
import { motion } from "framer-motion";
import { formatCurrency, formatTimeAgo } from "../utils";
import { fetchAllContributers } from "../../utils/apiCall";

// Theme Constants
const NAVY = "#082032";
const GOLD = "#D4AF37";
const BEIGE = "#F9F5F0";
const TEXT_DARK = "#1A1A1A";

const SQFT_PRICE = 5001;

// Motion component for smooth entry
const MotionHStack = motion(HStack);

const RecentContributors = () => {
    const [tab, setTab] = useState("latest");
    const [loading, setLoading] = useState(true);
    const [contributors, setContributors] = useState([]);

    const isMobile = useBreakpointValue({ base: true, md: false });

    useEffect(() => {
        const loadContributors = async () => {
            setLoading(true);
            try {
                const data = await fetchAllContributers();
                setContributors(data || []);
            } catch (err) {
                console.error("Error fetching contributors:", err);
            }
            setLoading(false);
        };

        loadContributors();
    }, []);

    // Logic preserved
    const latestData = contributors
        .filter((c) => c?.finalpaymentstatus === "captured")
        .slice(-10)
        .reverse();

    const largestData = [...contributors]
        .filter((c) => c?.paymentstatus === true || c?.finalpaymentstatus === "captured")
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 5);

    const formatSqftOrAmount = (amt) => {
        if (amt >= SQFT_PRICE) {
            const sqft = Math.round(amt / SQFT_PRICE);
            return `${sqft} Sq. Ft.`;
        }
        return formatCurrency(amt);
    };

    const renderContributorCard = (user, idx, isLeaderboard = false) => {
        const name = user?.isanonymous ? "Anonymous" : user?.username;
        const displayValue = formatSqftOrAmount(user?.amount);

        // Special styling for Top 3 in Leaderboard
        const isTop3 = isLeaderboard && idx < 3;
        const medalColor = idx === 0 ? "#FFD700" : idx === 1 ? "#C0C0C0" : "#CD7F32"; // Gold, Silver, Bronze

        return (
            <MotionHStack
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                w="100%"
                bg="white"
                p={4}
                borderRadius="16px"
                justify="space-between"
                border="1px solid"
                borderColor={isTop3 ? medalColor : "gray.100"}
                boxShadow={isTop3 ? `0 4px 15px ${medalColor}40` : "0 2px 8px rgba(0,0,0,0.05)"}
                position="relative"
                overflow="hidden"
            >
                {/* Decorative sheen for top donors */}
                {isTop3 && (
                    <Box
                        position="absolute" top={0} left={0} w="4px" h="100%"
                        bg={medalColor}
                    />
                )}

                <HStack gap={4}>
                    <Box position="relative">
                        <Avatar
                            name={name}
                            src={user?.avatar}
                            size="md"
                            bg={isTop3 ? `${medalColor}20` : "blue.50"}
                            color={NAVY}
                            border="2px solid"
                            borderColor={isTop3 ? medalColor : "transparent"}
                        />
                        {isTop3 && (
                            <Box
                                position="absolute" bottom="-5px" right="-5px"
                                bg="white" borderRadius="full" p="2px"
                                boxShadow="sm"
                            >
                                <Icon as={FaMedal} color={medalColor} w={4} h={4} />
                            </Box>
                        )}
                    </Box>

                    <VStack align="flex-start" spacing={1}>
                        <Text fontWeight="700" color={TEXT_DARK} fontSize={["sm", "md"]}>
                            {name}
                        </Text>
                        <HStack spacing={1}>
                            <Icon as={FaHeart} color="red.400" w={3} h={3} />
                            <Text fontSize="sm" color="gray.600" fontWeight="500">
                                Donated <Text as="span" color={NAVY} fontWeight="800">{displayValue}</Text>
                            </Text>
                        </HStack>
                    </VStack>
                </HStack>

                <VStack align="flex-end" spacing={0}>
                    {!isLeaderboard ? (
                        <Text fontSize="xs" color="gray.400" fontStyle="italic">
                            {formatTimeAgo(user?.createdate)}
                        </Text>
                    ) : (
                        <Badge
                            colorScheme={idx === 0 ? "yellow" : idx === 1 ? "gray" : idx === 2 ? "orange" : "blue"}
                            variant="subtle"
                            borderRadius="full"
                            px={3}
                        >
                            Rank #{idx + 1}
                        </Badge>
                    )}
                </VStack>
            </MotionHStack>
        );
    };

    return (
        <Box
            w="100%"
            maxW="900px"
            mx="auto"
            mt={16}
            px={[4, 6]}
            fontFamily="'Poppins', sans-serif"
        >
            <Box textAlign="center" mb={8}>
                <Text
                    fontSize={["2xl", "3xl"]}
                    fontWeight="800"
                    color={NAVY}
                    mb={2}
                    letterSpacing="tight"
                >
                   Recent <Text as="span" color="#E63946">Contributors</Text>
                </Text>
                <Text fontSize="md" color="gray.500" maxW="500px" mx="auto" fontFamily="'Satoshi', sans-serif">
                    Join the growing community of devotees building this spiritual legacy. Your name belongs here.
                </Text>
            </Box>

            {/* MODERN TAB SWITCH */}
            <Flex
                bg="gray.100"
                p={1.5}
                borderRadius="full"
                w="fit-content"
                mx="auto"
                mb={8}
                boxShadow="inner"
            >
                <Flex
                    as="button"
                    onClick={() => setTab("latest")}
                    align="center"
                    gap={2}
                    px={6}
                    py={2}
                    borderRadius="full"
                    bg={tab === "latest" ? NAVY : "transparent"}
                    color={tab === "latest" ? "white" : "gray.500"}
                    transition="all 0.3s ease"
                    fontWeight="600"
                    fontSize="sm"
                >
                    <Icon as={FaHistory} />
                    Latest
                </Flex>

                <Flex
                    as="button"
                    onClick={() => setTab("leaderboard")}
                    align="center"
                    gap={2}
                    px={6}
                    py={2}
                    borderRadius="full"
                    bg={tab === "leaderboard" ? GOLD : "transparent"}
                    color={tab === "leaderboard" ? "white" : "gray.500"}
                    transition="all 0.3s ease"
                    fontWeight="600"
                    fontSize="sm"
                >
                    <Icon as={FaTrophy} />
                    Top Donors
                </Flex>
            </Flex>

            {/* CARD CONTAINER */}
            <Box
                bg={BEIGE}
                borderRadius="24px"
                p={[4, 6]}
                boxShadow="inset 0 0 20px rgba(0,0,0,0.03)"
                minH="300px"
                border={`1px dashed ${GOLD}`}
            >
                {loading ? (
                    <VStack gap={4}>
                        {[1, 2, 3].map((i) => (
                            <HStack key={i} w="100%" p={4} bg="white" borderRadius="16px" boxShadow="sm">
                                <SkeletonCircle size="10" />
                                <VStack align="flex-start" flex="1">
                                    <Skeleton height="12px" w="60%" />
                                    <Skeleton height="12px" w="40%" />
                                </VStack>
                            </HStack>
                        ))}
                    </VStack>
                ) : (
                    <>
                        {tab === "latest" && (
                            <VStack gap={3}>
                                {latestData.length > 0 ? (
                                    latestData.map((user, idx) =>
                                        renderContributorCard(user, idx, false)
                                    )
                                ) : (
                                    <Text color="gray.500" pt={10}>Be the first to donate today!</Text>
                                )}
                            </VStack>
                        )}

                        {tab === "leaderboard" && (
                            <VStack gap={3}>
                                {largestData.length > 0 ? (
                                    largestData.map((user, idx) =>
                                        renderContributorCard(user, idx, true)
                                    )
                                ) : (
                                    <Text color="gray.500" pt={10}>Leaderboard updating...</Text>
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