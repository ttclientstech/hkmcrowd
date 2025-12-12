import React from "react";
import {
    Box,
    VStack,
    HStack,
    Text,
    SimpleGrid,
    Icon,
    Tooltip,
    Badge
} from "@chakra-ui/react";
// Using React Icons for visuals
import { FaSeedling, FaHandsHelping, FaDharmachakra, FaCrown, FaGem, FaLandmark } from "react-icons/fa";
import { GiBrickWall, GiPillar, GiTempleGate, GiHolySymbol } from "react-icons/gi";

// 🏆 Define Milestones Configuration
const MILESTONES = [
    { sqft: 1,  label: "Seva Starter",    icon: FaSeedling,     color: "green.400" },
    { sqft: 3,  label: "Bhakti Builder",  icon: GiBrickWall,    color: "orange.400" },
    { sqft: 5,  label: "Foundation Layer",icon: FaHandsHelping, color: "blue.400" },
    { sqft: 8,  label: "Divine Pillar",   icon: GiPillar,       color: "purple.400" },
    { sqft: 10, label: "Temple Guardian", icon: GiTempleGate,   color: "red.400" },
    { sqft: 15, label: "Golden Arch",     icon: FaLandmark,     color: "yellow.400" },
    { sqft: 20, label: "Dharma Defender", icon: FaDharmachakra, color: "cyan.400" },
    { sqft: 25, label: "Param Bhakta",    icon: FaCrown,        color: "pink.400" },
    { sqft: 50, label: "Legendary Soul",  icon: GiHolySymbol,   color: "teal.300" }, // Bonus
    { sqft: 100,label: "Eternal Patron",  icon: FaGem,          color: "white" }     // Bonus
];
const COST_PER_SQFT = 5000;

const MilestoneBadges = ({ raisedSqFt }) => {
    raisedSqFt = Math.floor((raisedSqFt || 0) / COST_PER_SQFT);
    // Logic: Find the highest milestone achieved index
    const earnedIndex = MILESTONES.findIndex(m => m.sqft > raisedSqFt) - 1;
    // Handle case where they surpassed all milestones (earnedIndex will be -2 if findIndex returns -1)
    const currentLevelIndex = earnedIndex === -2 ? MILESTONES.length - 1 : earnedIndex;

    // We display all earned badges + the ONE next badge
    const displayBadges = MILESTONES.slice(0, currentLevelIndex + 2);

    return (
        <Box
            w="100%"
            bg="rgba(255, 255, 255, 0.03)" // Consistent Dashboard Glass
            borderRadius="2xl"
            border="1px solid rgba(255, 255, 255, 0.05)"
            p={[5, 6]}
            mt={6}
            position="relative"
            overflow="hidden"
        >
            <VStack spacing={5} align="start">

                {/* Header */}
                <HStack justify="space-between" w="100%">
                    <VStack align="start" spacing={1}>
                        <Text
                            fontSize={["xs", "sm"]}
                            fontWeight="700"
                            color="purple.200"
                            textTransform="uppercase"
                            letterSpacing="1px"
                        >
                            Milestone Achievements
                        </Text>
                        <Text fontSize="xs" color="gray.400">
                            Badges earned through your sacred contribution
                        </Text>
                    </VStack>

                    {/* Level Counter */}
                    <Badge
                        colorScheme="purple"
                        variant="solid"
                        fontSize="0.7rem"
                        px={2}
                        py={1}
                        borderRadius="full"
                    >
                        {currentLevelIndex + 1} Badges Unlocked
                    </Badge>
                </HStack>

                {/* Badges Grid */}
                <SimpleGrid
                    columns={[3, 4, 5, 6]} // Responsive: 3 on mobile, up to 6 on desktop
                    spacing={[3, 5]}
                    w="100%"
                >
                    {displayBadges.map((badge, index) => {
                        const isUnlocked = index <= currentLevelIndex;
                        const isNext = index === currentLevelIndex + 1;

                        return (
                            <Tooltip
                                key={badge.sqft}
                                label={isUnlocked
                                    ? `Earned at ${badge.sqft} Sq.Ft!`
                                    : `Reach ${badge.sqft} Sq.Ft to unlock`
                                }
                                bg="gray.800"
                                color="white"
                                hasArrow
                            >
                                <VStack
                                    bg={isUnlocked ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.2)"}
                                    p={[2, 3]}
                                    borderRadius="xl"
                                    borderWidth="1px"
                                    borderColor={isUnlocked
                                        ? "rgba(255, 215, 0, 0.3)" // Gold border for earned
                                        : "rgba(255,255,255,0.05)" // Faint border for locked
                                    }
                                    opacity={isNext ? 0.6 : 1}
                                    position="relative"
                                    transition="all 0.3s"
                                    _hover={isUnlocked ? { transform: "translateY(-5px)", borderColor: badge.color } : {}}
                                    minH="100px"
                                    justify="center"
                                >
                                    {/* 🔒 The "Awaits You" Overlay for the next badge */}
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
                                            <Text
                                                fontSize="8px"
                                                fontWeight="800"
                                                color="white"
                                                textTransform="uppercase"
                                                textAlign="center"
                                                letterSpacing="0.5px"
                                            >
                                                Next<br/>Goal
                                            </Text>
                                        </Box>
                                    )}

                                    {/* Icon Circle */}
                                    <Box
                                        position="relative"
                                        w={["40px", "50px"]}
                                        h={["40px", "50px"]}
                                        borderRadius="full"
                                        bg={isUnlocked
                                            ? `linear-gradient(135deg, rgba(255,255,255,0.1), ${badge.color}22)`
                                            : "gray.800"
                                        }
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        boxShadow={isUnlocked ? `0 0 15px ${badge.color}44` : "none"}
                                        filter={isNext ? "grayscale(100%)" : "none"} // Greyscale the locked one
                                    >
                                        <Icon
                                            as={badge.icon}
                                            w={["20px", "24px"]}
                                            h={["20px", "24px"]}
                                            color={isUnlocked ? badge.color : "gray.600"}
                                        />
                                    </Box>

                                    {/* Labels */}
                                    <VStack spacing={0} zIndex={1}>
                                        <Text
                                            fontSize={["9px", "10px"]}
                                            fontWeight="bold"
                                            color={isUnlocked ? "white" : "gray.500"}
                                            textAlign="center"
                                            lineHeight="1.2"
                                            h="24px" // Fixed height for alignment
                                            display="flex"
                                            alignItems="center"
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
                    })}
                </SimpleGrid>
            </VStack>
        </Box>
    );
};

export default MilestoneBadges;