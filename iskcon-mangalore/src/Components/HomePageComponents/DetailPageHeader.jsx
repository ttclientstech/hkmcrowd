import { Box, Flex, Image, Text, VStack, Icon, Link as ChakraLink } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import image16 from "../../assets/images/logo.jpeg";

const DetailPageHeader = ({ getSingleUser }) => {
    const campaignerName = getSingleUser?.campaignDetails?.campaignName || "A Devotee";

    return (
        <Box position="relative" w="100%">
            {/* Top Gold Border - Adds a 'Roof' to the design */}
            <Box w="100%" h="4px" bgGradient="linear(to-r, #D4AF37, #FFD700, #D4AF37)" />

            <Box
                w="100%"
                bg="#2C0A0A" // Deep Mahogany Background
                color="#F9F5F0" // Off-white text
                py={["2rem", "2.5rem"]} // Vertical padding
                px={["1rem", "2rem"]} // Horizontal padding
                position="relative"
                overflow="hidden"
                borderBottom="1px solid #4B0000"
            >
                {/* Background Texture - Subtle Gold Circle Overlay */}
                <Box
                    position="absolute" top="-50px" right="-50px"
                    w="300px" h="300px" borderRadius="full"
                    bg="#D4AF37" opacity="0.03"
                    pointerEvents="none"
                />

                <Flex
                    maxW="1200px" mx="auto"
                    direction={["column", "column", "row"]} // Mobile: Column, Desktop: Row
                    align="center"
                    justify="space-between"
                    gap={6}
                >
                    {/* 1. LEFT SIDE: Brand & Navigation */}
                    <ChakraLink as={Link} to="/" _hover={{ textDecoration: 'none' }} group>
                        <Flex align="center" gap={4} opacity={0.9} _hover={{ opacity: 1, transform: "translateX(5px)" }} transition="all 0.3s">
                            {/* Logo Box */}
                            <Box
                                w={["60px", "70px"]} h={["60px", "70px"]}
                                borderRadius="full" border="2px solid #D4AF37" overflow="hidden"
                                boxShadow="0px 0px 20px rgba(212, 175, 55, 0.15)"
                            >
                                <Image src={image16} w="100%" h="100%" objectFit="cover" />
                            </Box>

                            {/* Text - Hidden on very small screens, Visible on Desktop */}
                            <VStack align="flex-start" spacing={0} display={["flex", "flex"]}>
                                <Text
                                    fontSize={["xs", "sm"]} color="#D4AF37"
                                    textTransform="uppercase" letterSpacing="widest" fontWeight="bold"
                                >
                                    Hare Krishna Movement Chennai
                                </Text>
                                <Flex align="center" gap={2} color="gray.400">
                                    <Icon as={FaChevronLeft} boxSize={3} />
                                    <Text fontSize="xs" fontWeight="medium">Back to Home</Text>
                                </Flex>
                            </VStack>
                        </Flex>
                    </ChakraLink>

                    {/* 2. RIGHT SIDE: The "Royal Invitation" */}
                    <VStack
                        spacing={1}
                        textAlign={["center", "center", "right"]}
                        align={["center", "center", "flex-end"]}
                        maxW={["100%", "100%", "65%"]}
                        zIndex={2}
                    >
                        {/* The "Why" - Spiritual Hook */}
                        <Text
                            fontFamily="'Cinzel', serif"
                            fontSize={["lg", "xl", "2xl"]}
                            color="#F9F5F0"
                            lineHeight="1.3"
                        >
                            "Join me in building a divine home for <br/>
                            <span style={{color: "#FFD700"}}>Sri Sri Rukmini Dwarakadhish</span>"
                        </Text>

                        {/* The "Who" - Campaigner Name Highlight */}
                        <Flex align="center" gap={3} mt={2}>
                            <Icon as={FaQuoteLeft} color="#D4AF37" w={3} h={3} opacity={0.6} mb={3}/>
                            <Text
                                fontSize={["2xl", "3xl", "4xl"]}
                                fontWeight="800"
                                color="#D4AF37" // Metallic Gold
                                textTransform="capitalize"
                                letterSpacing="1px"
                                textShadow="0px 4px 10px rgba(0,0,0,0.5)"
                                fontFamily="'Cinzel', serif"
                            >
                                {campaignerName}
                            </Text>
                            <Icon as={FaQuoteRight} color="#D4AF37" w={3} h={3} opacity={0.6} mt={3}/>
                        </Flex>

                        {/* The "Legacy" Context */}
                        <Text fontSize={["sm", "md"]} color="gray.400" maxW="500px" fontStyle="italic">
                            invites you to become a patron of the Dakshina Dwaraka Dham.
                        </Text>
                    </VStack>
                </Flex>
            </Box>

            {/* Bottom Gold Accent */}
            <Box w="100%" h="1px" bgGradient="linear(to-r, transparent, #D4AF37, transparent)" opacity={0.5} />
        </Box>
    );
};

export default DetailPageHeader;