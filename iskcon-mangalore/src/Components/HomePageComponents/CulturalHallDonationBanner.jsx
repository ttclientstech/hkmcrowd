import React from "react";
import { Box, Text, Flex, Icon, VStack, useBreakpointValue } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { FaMusic } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { culturalHallBg } from "../../constants/cdnImages";

const NAVY = "#082032";
const GOLD = "#D4AF37";

// --- ANIMATIONS ---
const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const pulseGlow = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4); border-color: ${GOLD}; }
  50% { box-shadow: 0 0 20px 0 rgba(212, 175, 55, 0.2); border-color: #F7E7CE; }
  100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4); border-color: ${GOLD}; }
`;

const CulturalHallDonationBanner = () => {
    return (
        <Box
            as="section"
            w="100%"
            position="relative"
            overflow="hidden"
            mb={8}
            borderRadius={["0", "2xl"]}
            // ✅ Attention Grabber 1: Animated Gold Border
            borderY={["2px solid", "2px solid"]}
            borderX={["0", "2px solid"]}
            borderColor={GOLD}
            animation={`${pulseGlow} 3s infinite`}
            boxShadow="2xl"
        >
            {/* 1. Background Image (Unchanged Source) */}
            <Box
                position="absolute"
                top="0"
                left="0"
                w="100%"
                h="100%"
                bgImage={`url(${culturalHallBg})`}
                bgSize="cover"
                bgPosition="center"
                transition="transform 10s ease"
                // Subtle zoom effect to create life
                animation={`${keyframes`0%{transform:scale(1)} 50%{transform:scale(1.05)} 100%{transform:scale(1)}`} 20s infinite ease-in-out`}
            />

            {/* 2. Spotlight Overlay (Modified for focus) */}
            <Box
                position="absolute"
                top="0"
                left="0"
                w="100%"
                h="100%"
                // Radial gradient acts like a spotlight on the text
                bgGradient={`radial-gradient(circle at center, rgba(8,32,50,0.85) 0%, rgba(5,15,25,0.74) 100%)`}
            />

            {/* 3. Decorative Sparkles */}
            <Icon as={BsStars} color={GOLD} position="absolute" top="10%" left="5%" opacity={0.4} boxSize={6} />
            <Icon as={BsStars} color={GOLD} position="absolute" bottom="10%" right="5%" opacity={0.4} boxSize={8} />

            {/* 4. Content */}
            <Flex
                position="relative"
                zIndex={2}
                align="center"
                justify="center"
                direction={["column", "row"]}
                gap={[4, 8]}
                px={[4, 12]}
                py={[8, 10]} // Increased padding for better framing
            >
                {/* Text Content */}
                <VStack
                    align="center"
                    spacing={3}
                    maxW="700px"
                    textAlign="center"
                >
                    {/* Badge Style Hook */}
                    <Flex
                        align="center"
                        gap={2}
                        color={GOLD}
                        bg="rgba(212, 175, 55, 0.15)"
                        border="1px solid"
                        borderColor="rgba(212, 175, 55, 0.3)"
                        px={4}
                        py={1}
                        borderRadius="full"
                        backdropFilter="blur(5px)"
                    >
                        <Icon as={FaMusic} w={3} h={3} />
                        <Text fontWeight="800" letterSpacing="1px" fontSize="xs" textTransform="uppercase" fontFamily="'Satoshi', sans-serif">
                            Did You Know?
                        </Text>
                    </Flex>

                    {/* Main Headline */}
                    <Text
                        color="white"
                        fontSize={["lg", "2xl", "3xl"]} // Slightly larger
                        fontWeight="700"
                        lineHeight={["1.4", "1.3"]}
                        fontFamily="'Poppins', sans-serif"
                    >
                        Dakshina Dwaraka Dham is built with a <br />

                        {/* Shimmering Gold Text */}
                        <Text
                            as="span"
                            fontWeight="900"
                            bgGradient="linear(to-r, #D4AF37, #FFF5C3, #D4AF37)"
                            bgClip="text"
                            color="transparent"
                            animation={`${shimmer} 3s linear infinite`}
                            backgroundSize="200% auto"
                            fontSize={["xl", "3xl", "4xl"]}
                            filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.5))"
                        >
                            300-Seater Cultural Hall
                        </Text>
                        <br />
                        to host divine programs.
                    </Text>

                    <Box h="2px" w="50px" bg={GOLD} opacity={0.7} />

                    <Text color="gray.300" fontSize={["sm", "md"]} fontFamily="'Satoshi', sans-serif" letterSpacing="wide">
                        Contribute to sustain our culture.
                    </Text>
                </VStack>
            </Flex>
        </Box>
    );
};

export default CulturalHallDonationBanner;