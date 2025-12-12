import React from "react";
import {
    Box,
    VStack,
    HStack,
    Text,
    SimpleGrid,
    Icon,
    Tooltip,
    Badge,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button
} from "@chakra-ui/react";

// ✅ 100% VERIFIED ICON IMPORTS
import {
    FaSeedling,
    FaHandHoldingHeart,
    FaDharmachakra,
    FaCrown,
    FaGem,
    FaLandmark,
    FaListUl
} from "react-icons/fa";

import {
    GiBrickWall,
    GiIonicColumn,
    GiTempleGate,
    GiHolySymbol
} from "react-icons/gi";

// 🏆 Define Milestones Configuration
const MILESTONES = [
    { sqft: 1,  label: "Seva Starter",    icon: FaSeedling,         color: "green.400" },
    { sqft: 3,  label: "Bhakti Builder",  icon: GiBrickWall,        color: "orange.400" },
    { sqft: 5,  label: "Foundation Layer",icon: FaHandHoldingHeart, color: "blue.400" },
    { sqft: 8,  label: "Divine Pillar",   icon: GiIonicColumn,      color: "purple.400" },
    { sqft: 10, label: "Temple Guardian", icon: GiTempleGate,       color: "red.400" },
    { sqft: 15, label: "Golden Arch",     icon: FaLandmark,         color: "yellow.400" },
    { sqft: 20, label: "Dharma Defender", icon: FaDharmachakra,     color: "cyan.400" },
    { sqft: 25, label: "Param Bhakta",    icon: FaCrown,            color: "pink.400" },
    { sqft: 50, label: "Legendary Soul",  icon: GiHolySymbol,       color: "teal.300" },
    { sqft: 100,label: "Eternal Patron",  icon: FaGem,              color: "white" }
];

// 🎨 Reusable Badge UI Component to keep code clean
const BadgeCard = ({ badge, isUnlocked, isNext = false }) => (
    <Tooltip
        label={isUnlocked ? `Earned at ${badge.sqft} Sq.Ft!` : `Reach ${badge.sqft} Sq.Ft to unlock`}
        bg="gray.800"
        color="white"
        hasArrow
        fontSize="xs"
        placement="top"
    >
        <VStack
            bg={isUnlocked ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.2)"}
            p={[2, 3]}
            borderRadius="xl"
            borderWidth="1px"
            borderColor={isUnlocked
                ? "rgba(255, 215, 0, 0.3)"
                : "rgba(255,255,255,0.05)"
            }
            opacity={!isUnlocked && !isNext ? 0.4 : (isNext ? 0.7 : 1)} // Dim locked ones in modal
            filter={!isUnlocked ? "grayscale(100%)" : "none"} // Greyscale locked ones
            position="relative"
            transition="all 0.3s"
            _hover={isUnlocked ? { transform: "translateY(-5px)", borderColor: badge.color } : {}}
            minH="100px"
            justify="center"
            w="100%"
        >
            {/* 🔒 "Next Goal" Overlay (Only for immediate next) */}
            {isNext && (
                <Box
                    position="absolute"
                    top="0" left="0" right="0" bottom="0"
                    bg="rgba(0,0,0,0.6)"
                    borderRadius="xl"
                    zIndex={2}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
                >
                    <Icon as={FaCrown} color="gray.400" w={3} h={3} mb={1} opacity={0.5} />
                    <Text
                        fontSize="8px"
                        fontWeight="800"
                        color="white"
                        textTransform="uppercase"
                        textAlign="center"
                        letterSpacing="0.5px"
                    >
                        Awaits<br/>You
                    </Text>
                </Box>
            )}

            {/* Icon Circle */}
            <Box
                position="relative"
                w={["35px", "45px"]}
                h={["35px", "45px"]}
                borderRadius="full"
                bg={isUnlocked
                    ? `linear-gradient(135deg, rgba(255,255,255,0.1), ${badge.color}22)`
                    : "gray.700"
                }
                display="flex"
                alignItems="center"
                justifyContent="center"
                boxShadow={isUnlocked ? `0 0 15px ${badge.color}44` : "none"}
            >
                <Icon
                    as={badge.icon}
                    w={["18px", "22px"]}
                    h={["18px", "22px"]}
                    color={isUnlocked ? badge.color : "gray.500"}
                />
            </Box>

            {/* Labels */}
            <VStack spacing={0} zIndex={1} w="100%">
                <Text
                    fontSize={["8px", "9px"]}
                    fontWeight="bold"
                    color={isUnlocked ? "white" : "gray.500"}
                    textAlign="center"
                    lineHeight="1.2"
                    h="22px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    {badge.label}
                </Text>
                <Text
                    fontSize="8px"
                    fontWeight="600"
                    color="gray.500"
                >
                    {badge.sqft} Sq.Ft
                </Text>
            </VStack>

        </VStack>
    </Tooltip>
);
const COST_PER_SQFT = 5000;
const MilestoneBadges = ({ raisedSqFt }) => {
    raisedSqFt = Math.floor((raisedSqFt || 0) / COST_PER_SQFT);
    // 🪟 Modal State
    const { isOpen, onOpen, onClose } = useDisclosure();

    // 🧮 Logic: Determine which badges are earned
    const earnedIndex = MILESTONES.findIndex(m => m.sqft > raisedSqFt) - 1;

    let currentLevelIndex;
    if (earnedIndex === -2) {
        currentLevelIndex = raisedSqFt >= MILESTONES[MILESTONES.length-1].sqft
            ? MILESTONES.length - 1
            : -1;
    } else {
        currentLevelIndex = earnedIndex;
    }

    // Display Strategy for DASHBOARD: Show all unlocked + 1 locked "Next Goal"
    const displayBadges = MILESTONES.slice(0, currentLevelIndex + 2);

    return (
        <Box
            w="100%"
            bg="rgba(255, 255, 255, 0.03)"
            borderRadius="2xl"
            border="1px solid rgba(255, 255, 255, 0.05)"
            p={[4, 6]}
            mt={6}
            position="relative"
            overflow="hidden"
        >
            <VStack spacing={5} align="start">

                {/* 🛡️ Header Section */}
                <HStack justify="space-between" w="100%" wrap="wrap" spacing={2}>
                    <VStack align="start" spacing={0}>
                        <Text
                            fontSize={["xs", "sm"]}
                            fontWeight="700"
                            color="purple.200"
                            textTransform="uppercase"
                            letterSpacing="1px"
                        >
                            Milestone Achievements
                        </Text>
                        <Text fontSize="10px" color="gray.400">
                            Badges earned through your sacred contribution
                        </Text>
                    </VStack>

                    <HStack>
                        {/* 🔘 "View All" Trigger Button */}
                        <Button
                            size="xs"
                            variant="ghost"
                            color="purple.300"
                            leftIcon={<FaListUl />}
                            _hover={{ bg: "whiteAlpha.100", color: "purple.200" }}
                            onClick={onOpen}
                        >
                            View Roadmap
                        </Button>

                        {/* Counter Badge */}
                        <Badge
                            colorScheme="purple"
                            variant="solid"
                            fontSize="0.6rem"
                            px={2}
                            py={1}
                            borderRadius="full"
                        >
                            {Math.max(0, currentLevelIndex + 1)} Unlocked
                        </Badge>
                    </HStack>
                </HStack>

                {/* 🎖️ Dashboard Grid (Limited View) */}
                <SimpleGrid
                    columns={[3, 4, 5, 6]}
                    spacing={[3, 4, 5]}
                    w="100%"
                >
                    {displayBadges.map((badge, index) => {
                        const isUnlocked = index <= currentLevelIndex;
                        const isNext = index === currentLevelIndex + 1;
                        return (
                            <BadgeCard
                                key={badge.sqft}
                                badge={badge}
                                isUnlocked={isUnlocked}
                                isNext={isNext}
                            />
                        );
                    })}
                </SimpleGrid>
            </VStack>

            {/* 🪟 ALL MILESTONES MODAL */}
            <Modal isOpen={isOpen} onClose={onClose} size={["full", "4xl"]} scrollBehavior="inside">
                <ModalOverlay backdropFilter="blur(8px)" bg="blackAlpha.600" />
                <ModalContent bg="#0b172a" border="1px solid rgba(255,255,255,0.1)">
                    <ModalHeader color="purple.200" borderBottom="1px solid rgba(255,255,255,0.05)">
                        <HStack>
                            <Icon as={GiHolySymbol} />
                            <Text fontSize="md">Full Journey Roadmap</Text>
                        </HStack>
                        <Text fontSize="xs" color="gray.500" fontWeight="normal" mt={1}>
                            Your path from Seva Starter to Eternal Patron
                        </Text>
                    </ModalHeader>
                    <ModalCloseButton color="white" />

                    <ModalBody p={[4, 8]}>
                        <SimpleGrid columns={[2, 3, 4, 5]} spacing={5}>
                            {MILESTONES.map((badge, index) => {
                                const isUnlocked = index <= currentLevelIndex;
                                return (
                                    <BadgeCard
                                        key={badge.sqft}
                                        badge={badge}
                                        isUnlocked={isUnlocked}
                                        isNext={false} // In modal, we just show locked vs unlocked status
                                    />
                                );
                            })}
                        </SimpleGrid>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default MilestoneBadges;