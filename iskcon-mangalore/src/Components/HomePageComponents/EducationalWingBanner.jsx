import React from "react";
import { Box, Text, Flex, Icon, VStack, Image } from "@chakra-ui/react";
import { FaGraduationCap, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import eduWingBg from "../../assets/images/educational_wing.jpg";

const MotionBox = motion(Box);
const NAVY = "#082032";
const GOLD = "#D4AF37";

const EducationalWingBanner = () => {
    return (
        <Box
            as="section"
            w="100%"
            mt={8}
            mb={8}
            borderRadius="2xl"
            boxShadow="2xl"
            overflow="hidden"
            bg={NAVY}
            position="relative"
            // ✅ Compact height (Responsive: Auto on mobile to fit text, fixed on desktop)
            h={["auto", "auto", "180px"]}
        >
            {/* 1. The Image (Right Side, Blended) */}
            <Box
                position="absolute"
                right="0"
                top="0"
                w={["100%", "100%", "55%"]} // Full width on mobile, half on desktop
                h="100%"
            >
                <Image
                    src={eduWingBg}
                    alt="Education Wing"
                    w="100%"
                    h="100%"
                    objectFit="cover"
                    // On mobile, we darken it more. On desktop, we keep it bright.
                    opacity={["0.2", "0.2", "0.8"]}
                />
            </Box>

            {/* 2. The Gradient Mask (The "Modern Blend" Magic) */}
            <Box
                position="absolute"
                inset="0"
                // Mobile: Darken whole area. Desktop: Navy fade from left to right.
                bgGradient={[
                    `linear(to-t, ${NAVY} 90%, rgba(8,32,50,0.4))`,
                    `linear(to-t, ${NAVY} 90%, rgba(8,32,50,0.4))`,
                    `linear(to-r, ${NAVY} 45%, ${NAVY}D9 60%, rgba(8,32,50,0) 100%)`
                ]}
            />

            {/* 3. Content Area */}
            <Flex
                position="relative"
                zIndex={2}
                h="100%"
                align="center"
                justify="space-between"
                direction={["column", "column", "row"]} // Stack on mobile, row on desktop
                p={[6, 6, 8]}
                gap={4}
            >
                {/* Left Side: Text Info */}
                <VStack align={["center", "center", "flex-start"]} spacing={1} maxW="650px">

                    {/* Attractive Heading */}
                    <Flex align="center" gap={3} mb={1}>
                        <Box bg={GOLD} p={1.5} borderRadius="md" color={NAVY}>
                            <Icon as={FaGraduationCap} w={4} h={4} />
                        </Box>
                        <Text
                            color="white"
                            fontSize={["lg", "xl", "2xl"]}
                            fontWeight="800"
                            fontFamily="'Poppins', sans-serif"
                            lineHeight="1.2"
                            textAlign={["center", "left"]}
                        >
                            Nurturing Minds, <Text as="span" color={GOLD}>Building Character</Text>
                        </Text>
                    </Flex>

                    {/* Descriptive Body */}
                    <Text
                        color="gray.300"
                        fontSize={["sm", "sm", "md"]}
                        fontFamily="'Satoshi', sans-serif"
                        textAlign={["center", "left"]}
                        lineHeight="1.5"
                    >
                        Four classrooms accommodating nearly 200 participants to teach Bhagavad-gita, ethics, and values.
                    </Text>
                </VStack>

                {/* Right Side: "Invest in Knowledge" Tagline */}
                {/* This acts as the "Button replacement" - A strong visual callout */}
                <MotionBox
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Flex
                        align="center"
                        gap={2}
                        borderLeft={["none", "none", `2px solid ${GOLD}`]}
                        pl={[0, 0, 6]}
                        pt={[2, 0, 0]}
                    >
                        <VStack align={["center", "center", "flex-start"]} spacing={0}>
                            <Text
                                color="white"
                                fontSize="xs"
                                letterSpacing="widest"
                                opacity={0.7}
                                textTransform="uppercase"
                                fontWeight="600"
                            >
                                A Sacred Duty
                            </Text>
                            <Text
                                color={GOLD}
                                fontSize={["lg", "xl"]}
                                fontWeight="900"
                                fontFamily="'Poppins', sans-serif"
                                textTransform="uppercase"
                                whiteSpace="nowrap"
                                letterSpacing="wide"
                                textShadow="0 2px 10px rgba(0,0,0,0.3)"
                            >
                                INVEST IN KNOWLEDGE
                            </Text>
                        </VStack>
                        <Icon as={FaArrowRight} color="white" w={5} h={5} display={["none", "none", "block"]} />
                    </Flex>
                </MotionBox>
            </Flex>
        </Box>
    );
};

export default EducationalWingBanner;