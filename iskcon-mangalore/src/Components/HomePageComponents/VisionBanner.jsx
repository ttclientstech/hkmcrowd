import React from "react";
import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { FaChevronDown, FaEye, FaVihara } from "react-icons/fa";
import { BsStars } from "react-icons/bs";

// --- THEME CONSTANTS ---
const NAVY = "#082032";
const GOLD = "#D4AF37";

// --- ANIMATIONS ---
const bounce = keyframes`
  0%, 100% { transform: translateY(0); opacity: 0.8; }
  50% { transform: translateY(6px); opacity: 1; }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const VisionBanner = () => {
    return (
        <Box
            w="100%"
            py={[6, 8]}
            px={4}
            // Richer Navy Gradient with a central spotlight
            bg={`radial-gradient(circle at center, #1a365d 0%, ${NAVY} 70%, #05121e 100%)`}
            borderTop="4px solid"
            borderBottom="1px solid"
            borderColor={GOLD}
            boxShadow="0 20px 40px -10px rgba(0,0,0,0.6)"
            textAlign="center"
            position="relative"
            overflow="hidden"
        >
            {/* 1. Background Watermark (Temple Icon) */}
            <Icon
                as={FaVihara}
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                boxSize="250px"
                color={GOLD}
                opacity={0.03}
                zIndex={0}
            />

            {/* 2. Floating Particles/Stars */}
            <Icon as={BsStars} position="absolute" top="20%" left="10%" color={GOLD} opacity={0.2} boxSize={4} />
            <Icon as={BsStars} position="absolute" bottom="30%" right="10%" color={GOLD} opacity={0.2} boxSize={6} />

            <Flex
                direction="column"
                align="center"
                justify="center"
                gap={3}
                position="relative"
                zIndex={1}
            >
                {/* The Hook Badge */}
                <Flex
                    align="center"
                    gap={2}
                    bg="rgba(255, 255, 255, 0.05)"
                    px={4}
                    py={1.5}
                    borderRadius="full"
                    border="1px solid"
                    borderColor="rgba(212, 175, 55, 0.4)"
                    mb={2}
                    backdropFilter="blur(5px)"
                    boxShadow={`0 0 15px rgba(212, 175, 55, 0.15)`}
                >
                    <Icon as={FaEye} color={GOLD} boxSize={3} />
                    <Text
                        fontSize={["9px", "xs"]}
                        fontWeight="800"
                        letterSpacing="2px"
                        color={GOLD}
                        textTransform="uppercase"
                        fontFamily="'Satoshi', sans-serif"
                    >
                        Witness the Divine Vision
                    </Text>
                </Flex>

                {/* The Main Pitch with Gold Gradient Text */}
                <Box>
                    <Text
                        fontSize={["md", "lg"]}
                        fontWeight="400"
                        color="gray.300"
                        fontFamily="'Poppins', sans-serif"
                        lineHeight="1.2"
                        mb={1}
                    >
                        Experience the making of
                    </Text>

                    <Text
                        fontFamily="'Poppins', sans-serif"
                        fontWeight="900"
                        fontSize={["2xl", "3xl", "4xl"]}
                        lineHeight="1.1"
                        textTransform="capitalize"
                        // Gold Gradient Text Logic
                        bgGradient="linear(to-r, #D4AF37, #FFE57F, #D4AF37)"
                        bgClip="text"
                        color="transparent"
                        filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.5))"
                        // Subtle shimmer animation on text
                        backgroundSize="200% auto"
                        animation={`${shimmer} 5s linear infinite`}
                    >
                        Chennai's Tallest <br />
                        Seashore Temple
                    </Text>
                </Box>

                {/* The Subconscious Cue: Bouncing Arrow */}
                <Flex
                    direction="column"
                    align="center"
                    mt={4}
                    opacity={0.9}
                    animation={`${bounce} 2s infinite ease-in-out`}
                    cursor="pointer"
                >
                    <Text fontSize="9px" fontWeight="bold" letterSpacing="1px" color={GOLD} mb={0} textTransform="uppercase">
                        Scroll
                    </Text>
                    <Icon as={FaChevronDown} color={GOLD} w={5} h={5} filter={`drop-shadow(0 0 5px ${GOLD})`} />
                </Flex>
            </Flex>
        </Box>
    );
};

export default VisionBanner;