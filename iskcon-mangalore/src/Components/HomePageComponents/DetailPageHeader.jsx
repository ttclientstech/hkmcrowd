import { Box, Flex, Image, Text, VStack, Icon, Link as ChakraLink } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
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

                    {/* 2. RIGHT SIDE: The "Cultural Legacy" Invitation */}
                    <VStack
                        spacing={3}
                        textAlign={["center", "center", "right"]}
                        align={["center", "center", "flex-end"]}
                        maxW={["100%", "100%", "70%"]} // Increased width for better text flow
                        zIndex={2}
                    >
                        {/* The Hook: Integrated Name & Location */}
                        <Text
                            fontFamily="'Cinzel', serif"
                            fontSize={["lg", "xl", "2xl"]} // Responsive: Smaller on mobile to prevent overflow
                            color="#F9F5F0"
                            lineHeight={["1.4", "1.3"]}
                            fontWeight="500"
                        >
                            Join <Text as="span" color="#D4AF37" fontWeight="800">{campaignerName}</Text> to build <br/>
                            Chennai's <Text as="span" color="#D4AF37" fontWeight="700">Dakshina Dwaraka Dham - Cultural Complex</Text>
                        </Text>

                        {/* The Action: Emotional & Tangible */}
                        <Text
                            fontSize={["sm", "md"]}
                            color="gray.400"
                            fontStyle="italic"
                            maxW="600px"
                        >
                            "Create a History.Leave a legacy"
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