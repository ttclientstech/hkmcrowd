import React from "react";
import { Box, Flex, Text, Icon, VStack } from "@chakra-ui/react";
import {
    FaBuilding,
    FaLandmark,
    FaMountain,
    FaUniversity,
    FaUmbrellaBeach,
    FaRegBuilding,
    FaCheck
} from "react-icons/fa";
import highlightBg from "../../assets/images/high_light_bg.png";

const NAVY = "#082032";
const GOLD = "#FFD45E";
const LIGHT_RED= "#FO9898";

const HIGHLIGHTS = [
    {
        icon: FaMountain,
        title: "Tallest Temple in Chennai",
        desc: "A grand landmark rising above the city skyline.",
    },
    {
        icon: FaLandmark,
        title: "Pallava Architecture",
        desc: "Inspired by traditional stone-carved South Indian architecture.",
    },
    {
        icon: FaUmbrellaBeach,
        title: "Seashore Temple",
        desc: "Located in Thiruvanmiyur Beach Seashore.",
    },
    {
        icon: FaRegBuilding,
        title: "40,000 Sq Ft Complex",
        desc: "A cultural & spiritual campus serving thousands daily.",
    },
    {
        icon: FaCheck,
        title: "Final Phase Under Construction",
        desc: "Your support helps complete the remaining works.",
    },
];

const TempleHighlights = () => {
    return (
        <Box
            w="100%"
            maxW="900px"
            mx="auto"
            px={[4, 6]}
            mt={12}
            mb={10}
            fontFamily="'Poppins', sans-serif"
            position="relative"
            overflow="hidden"
        >
            {/* 🖼️ Background Image Layer */}
            <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                w="100%"
                h="100%"
                backgroundImage={`url(${highlightBg})`}
                backgroundRepeat="no-repeat"
                backgroundPosition="center"
                backgroundSize="contain"
                opacity="0.5"
                zIndex={0}
                pointerEvents="none"
            />

            {/* Foreground Content */}
            <Box position="relative" zIndex={2}>
                {/* Title */}
                <Text
                    textAlign="center"
                    fontSize={["2xl", "3xl"]}
                    fontWeight="700"
                    color={NAVY}
                    mb={8}
                >
                    Temple <Text as="span" color="#E63946">Highlights</Text>
                </Text>

                {/* Timeline */}
                <VStack spacing={10} position="relative" align="stretch">
                    {/* Vertical line */}
                    <Box
                        position="absolute"
                        left="28px"
                        top="0"
                        h="100%"
                        w="2px"
                        bg="rgba(8,32,50,0.2)"
                    />

                    {HIGHLIGHTS.map((h, i) => (
                        <Flex key={i} align="flex-start" position="relative">
                            {/* Icon Bubble */}
                            <Flex
                                w="56px"
                                h="56px"
                                borderRadius="full"
                                bg="white"
                                border={`3px solid ${LIGHT_RED}`}
                                align="center"
                                justify="center"
                                zIndex={2}
                                boxShadow="0 4px 12px rgba(0,0,0,0.12)"
                            >
                                <Icon as={h.icon} color={NAVY} boxSize={6} />
                            </Flex>

                            {/* Content */}
                            <Box ml={5} flex="1">
                                <Text fontWeight="700" fontSize="lg" color={NAVY} mb={1}>
                                    {h.title}
                                </Text>
                                <Text fontSize="md" color="#4A5568" lineHeight="1.6">
                                    {h.desc}
                                </Text>
                            </Box>
                        </Flex>
                    ))}
                </VStack>
            </Box>
        </Box>
    );
};

export default TempleHighlights;
