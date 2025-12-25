import React, { useState, useEffect } from "react";
import {
    Box,
    Text,
    Flex,
    HStack,
    VStack,
    Skeleton,
    SkeletonCircle,
    Icon,
    Avatar
} from "@chakra-ui/react";
import { FaTrophy, FaHistory, FaHeart, FaMedal, FaBolt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { formatCurrency, formatTimeAgo } from "../utils";
import { fetchRecentDonors } from "../../utils/apiCall"; // Kept for 'Latest' tab
// ✅ NEW IMPORT: Ensure you add this API call function
import { fetchLeaderboard } from "../../utils/apiCall";

// Theme Constants
const NAVY = "#082032";
const GOLD = "#D4AF37";
const TEXT_DARK = "#1A1A1A";
const SQFT_PRICE = 5000;

// Motion component
const MotionHStack = motion(HStack);
const MotionBox = motion(Box);

const RecentContributors = () => {
    const [tab, setTab] = useState("latest");
    const [loading, setLoading] = useState(true);

    // ✅ SEPARATE STATES
    const [latestData, setLatestData] = useState([]);
    const [leaderboardData, setLeaderboardData] = useState([]);

    // ✅ TOAST STATE
    const [showToast, setShowToast] = useState(false);
    const [currentToastIndex, setCurrentToastIndex] = useState(0);
    const [startToasting, setStartToasting] = useState(false);

    // 1. FETCH DATA BASED ON ACTIVE TAB
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                if (tab === "latest") {
                    // Optimized: You should ideally have an API that returns only last 20
                    // For now, using your existing one
                    const allData = await fetchRecentDonors();
                    setLatestData(allData || []);
                } else if (tab === "leaderboard") {
                    // ✅ CALL THE NEW BACKEND API
                    const top5 = await fetchLeaderboard();
                    setLeaderboardData(top5 || []);
                }
            } catch (err) {
                console.error("Error fetching data:", err);
            }
            setLoading(false);
        };

        loadData();
    }, [tab]); // Re-runs when tab changes

    // 2. TOAST LOGIC (Only runs if we have latest data)
    useEffect(() => {
        const timer = setTimeout(() => setStartToasting(true), 10000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!startToasting || latestData.length === 0) return;

        const triggerToast = () => {
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
                setTimeout(() => {
                    setCurrentToastIndex((prev) => (prev + 1) % latestData.length);
                }, 500);
            }, 3000);
        };

        triggerToast();
        const interval = setInterval(triggerToast, 6000);
        return () => clearInterval(interval);
    }, [startToasting, latestData]);

    const formatSqftOrAmount = (amt) => {
        if (amt >= SQFT_PRICE) {
            const sqft = Math.round(amt / SQFT_PRICE);
            return `${sqft} Sq. Ft.`;
        }
        return formatCurrency(amt);
    };

    // Toast Content Helper
    const currentToastUser = latestData[currentToastIndex];
    const toastName = currentToastUser?.isanonymous ? "Anonymous" : currentToastUser?.username;
    const toastAmount = formatSqftOrAmount(currentToastUser?.amount);

    const renderContributorCard = (user, idx, isLeaderboard = false) => {
        const name = user?.isanonymous ? "Anonymous" : user?.username;
        const displayValue = formatSqftOrAmount(user?.amount);
        const isTop3 = isLeaderboard && idx < 3;
        const medalColor = idx === 0 ? "#FFD700" : idx === 1 ? "#C0C0C0" : "#CD7F32";

        return (
            <MotionHStack
                key={`${isLeaderboard ? 'top' : 'lat'}-${idx}`} // Unique Key
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
                {isTop3 && (
                    <Box position="absolute" top={0} left={0} w="4px" h="100%" bg={medalColor}/>
                )}

                <HStack gap={4}>
                    <Box position="relative">
                        <Avatar
                            name={name}
                            size="md"
                            bg={isTop3 ? `${medalColor}20` : "blue.50"}
                            color={NAVY}
                            border="2px solid"
                            borderColor={isTop3 ? medalColor : "transparent"}
                        />
                        {isTop3 && (
                            <Box position="absolute" bottom="-5px" right="-5px" bg="white" borderRadius="full" p="2px" boxShadow="sm">
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
                    <Text fontSize="xs" color="gray.400" fontStyle="italic">
                        {formatTimeAgo(user?.createdate)}
                    </Text>
                </VStack>
            </MotionHStack>
        );
    };

    return (
        <Box w="100%" maxW="900px" mx="auto" mt={16} px={[4, 6]} fontFamily="'Poppins', sans-serif">

            {/* TOAST NOTIFICATION */}
            <AnimatePresence>
                {showToast && currentToastUser && (
                    <MotionBox
                        initial={{ opacity: 0, y: 50, x: "-50%", scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
                        exit={{ opacity: 0, y: 20, x: "-50%", scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        position="fixed"
                        bottom={["100px", "90px"]}
                        left="50%"
                        zIndex="9999"
                        bg="rgba(8, 32, 50, 0.95)"
                        backdropFilter="blur(12px)"
                        borderRadius="full"
                        boxShadow={`0 8px 30px rgba(0,0,0,0.4), 0 0 0 1px ${GOLD}40`}
                        p={2}
                        pr={6}
                        minW={["280px", "340px"]}
                        display="flex"
                        alignItems="center"
                        gap={3}
                    >
                        <Box position="relative">
                            <Avatar size="sm" name={toastName} bg={GOLD} color={NAVY} fontWeight="bold" />
                            <Box position="absolute" bottom="0" right="0" bg="green.400" border="2px solid #082032" borderRadius="full" w="10px" h="10px" animation="pulse 2s infinite" />
                        </Box>
                        <VStack align="start" spacing={0} flex="1">
                            <HStack spacing={1} w="100%" justify="space-between">
                                <Text fontSize="xs" fontWeight="700" color="white" noOfLines={1} maxW={["150px", "200px"]}>{toastName}</Text>
                                <HStack spacing={1}>
                                    <Icon as={FaBolt} color={GOLD} w={2.5} h={2.5} />
                                    <Text fontSize="10px" color={GOLD} fontWeight="bold" textTransform="uppercase">Just Now</Text>
                                </HStack>
                            </HStack>
                            <Text fontSize="xs" color="gray.300">contributed <Text as="span" fontWeight="800" color="white" fontSize="sm">{toastAmount}</Text></Text>
                        </VStack>
                    </MotionBox>
                )}
            </AnimatePresence>

            {/* HEADER */}
            <Box textAlign="center" mb={8}>
                <Text fontSize={["3xl", "3xl"]} fontWeight="800" color={NAVY} mb={2} letterSpacing="tight">
                    Recent <Text as="span" color="#E63946">Contributors</Text>
                </Text>
                <Text fontSize="md" color="black" maxW="500px" mx="auto" fontFamily="'Poppins', sans-serif">
                    Join the growing community of devotees building this spiritual legacy. Your name belongs here.
                </Text>
            </Box>

            {/* TABS */}
            <Flex bg="gray.100" p={1.5} borderRadius="full" w="fit-content" mx="auto" mb={8} boxShadow="inner">
                <Flex
                    as="button" onClick={() => setTab("latest")} align="center" gap={2} px={6} py={2}
                    borderRadius="full" bg={tab === "latest" ? NAVY : "transparent"} color={tab === "latest" ? "white" : "gray.500"}
                    transition="all 0.3s ease" fontWeight="600" fontSize="sm"
                >
                    <Icon as={FaHistory} /> Latest
                </Flex>

                <Flex
                    as="button" onClick={() => setTab("leaderboard")} align="center" gap={2} px={6} py={2}
                    borderRadius="full" bg={tab === "leaderboard" ? GOLD : "transparent"} color={tab === "leaderboard" ? "white" : "gray.500"}
                    transition="all 0.3s ease" fontWeight="600" fontSize="sm"
                >
                    <Icon as={FaTrophy} /> Top Donors
                </Flex>
            </Flex>

            {/* LIST CONTENT */}
            <Box bg="#edf2f7" borderRadius="24px" p={[4, 6]} boxShadow="inset 0 0 20px rgba(0,0,0,0.03)" minH="300px" border={`1px dashed #082132`}>
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
                        {/* SHOW LATEST */}
                        {tab === "latest" && (
                            <VStack gap={3}>
                                {latestData.length > 0 ? (
                                    latestData.map((user, idx) => renderContributorCard(user, idx, false))
                                ) : (
                                    <Text color="gray.500" pt={10}>Be the first to donate today!</Text>
                                )}
                            </VStack>
                        )}

                        {/* SHOW LEADERBOARD (Fetched from new API) */}
                        {tab === "leaderboard" && (
                            <VStack gap={3}>
                                {leaderboardData.length > 0 ? (
                                    leaderboardData.map((user, idx) => renderContributorCard(user, idx, true))
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