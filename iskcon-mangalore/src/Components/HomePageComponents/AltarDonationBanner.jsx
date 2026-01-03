import React from "react";
import { Box, Text, Flex, VStack, Icon } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { FaVihara } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { altar } from "../../constants/cdnImages";

const NAVY = "#082032";
const GOLD = "#D4AF37";

// --- ANIMATIONS ---
const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const pulseGlow = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4); border-color: ${GOLD}; }
  50% { box-shadow: 0 0 25px 0 rgba(212, 175, 55, 0.3); border-color: #F7E7CE; }
  100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4); border-color: ${GOLD}; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const AltarDonationBanner = () => {
    return (
        <Box
            as="section"
            w="100%"
            position="relative"
            overflow="hidden"
            mt={12}
            borderRadius={["0", "2xl"]}
            // ✅ Attention Grabber: Pulsing Gold Border
            borderY={["2px solid", "2px solid"]}
            borderX={["0", "2px solid"]}
            borderColor={GOLD}
            animation={`${pulseGlow} 4s infinite`}
            boxShadow="dark-lg"
        >
            {/* 1. Background Image */}
            <Box
                position="absolute"
                top="0"
                left="0"
                w="100%"
                h="100%"
                bgImage={`url(${altar})`}
                bgSize="cover"
                bgPosition="center"
                transition="transform 10s ease"
                // Slow "Ken Burns" zoom effect
                animation={`${keyframes`0%{transform:scale(1)} 50%{transform:scale(1.1)} 100%{transform:scale(1)}`} 25s infinite ease-in-out`}
            />

            {/* 2. Cinematic Spotlight Overlay */}
            <Box
                position="absolute"
                top="0"
                left="0"
                w="100%"
                h="100%"
                // Radial gradient focuses light on text, darkens edges
                bgGradient={`radial-gradient(circle at center, rgba(8,32,50,0.85) 0%, rgba(5,15,25,0.98) 100%)`}
            />

            {/* 3. Modern Decorative Sparkles (Replaced Om) */}
            <Icon as={BsStars} color={GOLD} position="absolute" top="15%" right="10%" opacity={0.3} boxSize={6} animation={`${float} 5s ease-in-out infinite`}/>
            <Icon as={BsStars} color={GOLD} position="absolute" bottom="15%" left="5%" opacity={0.3} boxSize={5} animation={`${float} 4s ease-in-out infinite`}/>

            {/* 4. Content */}
            <Flex
                position="relative"
                zIndex={2}
                align="center"
                justify="center"
                direction={["column", "column"]}
                gap={[2, 4]}
                px={[4, 12]}
                py={[10, 12]}
                textAlign="center"
            >
                {/* Text Content */}
                <VStack
                    align="center"
                    spacing={3}
                    maxW="800px"
                >
                    {/* Badge Style Title */}
                    <Flex
                        align="center"
                        gap={2}
                        color={GOLD}
                        bg="rgba(255,255,255,0.05)"
                        border="1px solid"
                        borderColor="rgba(212, 175, 55, 0.3)"
                        px={4}
                        py={1}
                        borderRadius="full"
                        backdropFilter="blur(4px)"
                        mb={1}
                    >
                        <Icon as={FaVihara} w={3} h={3} />
                        <Text fontWeight="800" letterSpacing="1px" fontSize="xs" textTransform="uppercase" fontFamily="'Satoshi', sans-serif">
                            The Heart of Dakshina Dwaraka Dham
                        </Text>
                    </Flex>

                    {/* Main Headline - Liquid Gold Text */}
                    <Text
                        fontSize={["2xl", "3xl", "4xl"]}
                        fontWeight="900"
                        lineHeight="1.2"
                        fontFamily="'Poppins', sans-serif"
                        textTransform="uppercase"
                        letterSpacing="tight"

                        // Gold Shimmer Effect
                        bgGradient="linear(to-r, #D4AF37, #FFF5C3, #D4AF37)"
                        bgClip="text"
                        color="transparent"
                        animation={`${shimmer} 3s linear infinite`}
                        backgroundSize="200% auto"
                        filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.6))"
                    >
                       Three Majestic Altars
                    </Text>

                    {/* Divider Line */}
                    <Box h="2px" w="60px" bg={GOLD} opacity={0.6} borderRadius="full" />

                    {/* Descriptive Subtext */}
                    <Text
                        color="gray.200"
                        fontSize={["sm", "lg"]}
                        fontFamily="'Satoshi', sans-serif"
                        lineHeight="1.6"
                        px={[2, 8]}
                    >
                        Home to <Text as="span" color="white" fontWeight="bold">Sri Sri Rukmini Dwarakadisha</Text>, <Text as="span" color="white" fontWeight="bold">Sri Narasimha</Text>, and <Text as="span" color="white" fontWeight="bold">Sri Sri Gaura Nitai</Text> — creating a powerful spiritual epicenter for all.
                    </Text>

                    <Text
                        color={GOLD}
                        fontSize={["xs", "sm"]}
                        fontWeight="bold"
                        textTransform="uppercase"
                        letterSpacing="widest"
                        mt={2}
                    >
                        Contribute to Enable Divine Worship
                    </Text>
                </VStack>
            </Flex>
        </Box>
    );
};

export default AltarDonationBanner;