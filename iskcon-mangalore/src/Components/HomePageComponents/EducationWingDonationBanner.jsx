import React from "react";
import { Box, Text, Flex, VStack, Icon, useBreakpointValue } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { FaBookOpen, FaLightbulb } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import  { education_wing } from "../../constants/cdnImages";

const NAVY = "#082032";
const GOLD = "#D4AF37";

// --- ANIMATIONS ---
// Makes gold text shimmer
const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

// Makes the border pulse with light
const pulseGlow = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4); border-color: ${GOLD}; }
  50% { box-shadow: 0 0 25px 0 rgba(212, 175, 55, 0.3); border-color: #F7E7CE; }
  100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4); border-color: ${GOLD}; }
`;

// Adds subtle floating movement to decorative icons
const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const EducationWingDonationBanner = () => {
    return (
        <Box
            as="section"
            w="100%"
            position="relative"
            overflow="hidden"
            mt={12}
            borderRadius={["0", "2xl"]}
            // ✅ ATTENTION GRABBER 1: Pulsing Golden Border
            borderY={["2px solid", "2px solid"]}
            borderX={["0", "2px solid"]}
            borderColor={GOLD}
            animation={`${pulseGlow} 4s infinite`}
            boxShadow="dark-lg"
        >
            {/* 1. Background Image (Unchanged Source) */}
            <Box
                position="absolute"
                top="0"
                left="0"
                w="100%"
                h="100%"
                bgImage={`url(${education_wing})`}
                bgSize="cover"
                bgPosition="center"
                // Slow, classy zoom effect
                animation={`${keyframes`0%{transform:scale(1)} 50%{transform:scale(1.08)} 100%{transform:scale(1)}`} 25s infinite ease-in-out`}
            />

            {/* 2. Spotlight Overlay (Crucial for focus) */}
            <Box
                position="absolute"
                top="0"
                left="0"
                w="100%"
                h="100%"
                // ✅ Radial gradient creates a "spotlight" in the center, darkening edges
                bgGradient={`radial-gradient(circle at center, rgba(8,32,50,0.8) 0%, rgba(5,15,25,0.75) 100%)`}
            />

            {/* 3. Decorative Floating "Knowledge Sparks" */}
            <Icon as={BsStars} color={GOLD} position="absolute" top="15%" right="10%" opacity={0.3} boxSize={6} animation={`${float} 5s ease-in-out infinite`}/>
            <Icon as={FaLightbulb} color={GOLD} position="absolute" bottom="20%" left="8%" opacity={0.2} boxSize={5} animation={`${float} 7s ease-in-out infinite`}/>


            {/* 4. Content Content */}
            <Flex
                position="relative"
                zIndex={2}
                align="center"
                justify="center"
                direction={["column", "column"]} // Stacked for dramatic focus
                gap={[4, 6]}
                px={[4, 12]}
                py={[10, 12]}
                textAlign="center"
            >
                <VStack
                    align="center"
                    spacing={4}
                    maxW="800px"
                >
                    {/* Badge-style Title Anchor */}
                    <Flex
                        align="center"
                        gap={3}
                        color={GOLD}
                        bg="rgba(255,255,255,0.05)"
                        border="1px solid"
                        borderColor="rgba(212, 175, 55, 0.3)"
                        px={5}
                        py={2}
                        borderRadius="full"
                        backdropFilter="blur(4px)"
                    >
                        {/* ✅ Icon added for instant visual context */}
                        <Icon as={FaBookOpen} w={5} h={5} />
                        <Text fontWeight="800" letterSpacing="wider" fontSize={["sm", "md"]} textTransform="uppercase">
                            Nurturing Minds
                        </Text>
                    </Flex>

                    {/* Main Headline with Liquid Gold Effect */}
                    <Text
                        color="white"
                        fontSize={["2xl", "3xl", "4xl"]}
                        fontWeight="800"
                        lineHeight={["1.3", "1.2"]}
                        fontFamily="'Poppins', sans-serif"
                    >
                        Building <br />
                        {/* Shimmering Gold Text */}
                        <Text
                            as="span"
                            bgGradient="linear(to-r, #D4AF37, #FFF5C3, #D4AF37)"
                            bgClip="text"
                            color="transparent"
                            animation={`${shimmer} 3s linear infinite`}
                            backgroundSize="200% auto"
                            fontSize={["3xl", "4xl", "5xl"]}
                            filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.6))"
                        >
                            Character
                        </Text>
                    </Text>

                    {/* Divider */}
                    <Box h="2px" w="60px" bg={GOLD} opacity={0.6} borderRadius="full" />

                    {/* Descriptive Subtext (Content Unchanged) */}
                    <Text
                        color="gray.200"
                        fontSize={["sm", "lg"]}
                        fontFamily="'Satoshi', sans-serif"
                        lineHeight="1.8"
                        px={[2, 8]}
                        maxW="700px"
                    >
                        Four classrooms accommodating nearly 200 participants. Children and adults learn the <Text as="span" color="white" fontWeight="bold">Bhagavad-gita</Text>, ethics, and values rooted in Vedic wisdom.
                    </Text>

                     <Text
                        color={GOLD}
                        fontSize={["xs", "sm"]}
                        fontWeight="bold"
                        textTransform="uppercase"
                        letterSpacing="widest"
                        mt={2}
                    >
                        Invest in Knowledge
                    </Text>
                </VStack>
            </Flex>
        </Box>
    );
};

export default EducationWingDonationBanner;