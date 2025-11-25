import { Box, Flex, Image, Text, VStack, Icon, Link as ChakraLink, Badge } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaCheckCircle } from 'react-icons/fa';
import image16 from "../../assets/images/logo.jpeg";

const DetailPageHeader = ({ getSingleUser }) => {
    const campaignerName = getSingleUser?.campaignDetails?.campaignName || "A Devotee";

    return (
        <Box position="relative" w="100%" bg="white" boxShadow="sm">
            {/* Top Status Line - Corporate/Project feel */}
            <Box w="100%" h="4px" bgGradient="linear(to-r, #F97316, #D4AF37)" />

            <Box
                w="100%"
                py={["1.5rem", "1.5rem"]}
                px={["1rem", "2rem"]}
                position="relative"
            >
                <Flex
                    maxW="1200px" mx="auto"
                    direction={["column", "column", "row"]}
                    align="center"
                    justify="space-between"
                    gap={4}
                >
                    {/* 1. LEFT SIDE: Brand Identity */}
                    <ChakraLink as={Link} to="/" _hover={{ textDecoration: 'none' }} group>
                        <Flex align="center" gap={3}>
                            {/* Logo - Smaller, sharper, professional */}
                            <Box
                                w="50px" h="50px"
                                borderRadius="full"
                                overflow="hidden"
                                border="1px solid #E2E8F0"
                            >
                                <Image src={image16} w="100%" h="100%" objectFit="cover" />
                            </Box>

                            <VStack align="flex-start" spacing={0}>
                                <Text
                                    fontSize="xs" color="#718096"
                                    fontWeight="bold" letterSpacing="wider" textTransform="uppercase"
                                >
                                    Project
                                </Text>
                                <Text
                                    fontSize="md" color="#2C0A0A"
                                    fontWeight="800" fontFamily="'Merriweather', serif"
                                >
                                    Dakshina Dwaraka
                                </Text>
                            </VStack>

                            {/* 'Back' interaction */}
                            <Flex
                                align="center" gap={1} ml={4}
                                color="gray.400"
                                display={["none", "flex"]}
                                _groupHover={{ color: "#F97316", transform: "translateX(-4px)" }}
                                transition="all 0.2s"
                            >
                                <Icon as={FaChevronLeft} boxSize={3} />
                                <Text fontSize="xs" fontWeight="bold">Back</Text>
                            </Flex>
                        </Flex>
                    </ChakraLink>

                    {/* 2. RIGHT SIDE: The "Mission Statement" */}
                    <VStack
                        spacing={0}
                        textAlign={["center", "center", "right"]}
                        align={["center", "center", "flex-end"]}
                    >
                        {/* Tagline - Business Friendly */}
                        <Badge
                            colorScheme="orange"
                            variant="subtle"
                            fontSize="xs"
                            px={2} py={0.5}
                            mb={1}
                            borderRadius="full"
                        >
                            PHASE 3: CONSTRUCTION
                        </Badge>

                        {/* Main Impact Header */}
                        <Text
                            fontFamily="'Cinzel', serif"
                            fontSize={["lg", "xl", "2xl"]}
                            fontWeight="700"
                            color="#2D3748" // Dark Corporate Grey
                            lineHeight="1.2"
                        >
                            Restoring Heritage. <span style={{color: "#D4AF37"}}>Building Culture.</span>
                        </Text>

                        {/* Campaigner Signature - "Lead by Example" */}
                        <Flex align="center" gap={2} mt={1}>
                            <Text fontSize="sm" color="gray.500" fontWeight="medium">
                                Initiative led by
                            </Text>
                            <Text
                                fontSize="md"
                                fontWeight="bold"
                                color="#2C0A0A" // Deep Maroon Name
                                borderBottom="2px solid #D4AF37" // Signature underline
                            >
                                {campaignerName}
                            </Text>
                            <Icon as={FaCheckCircle} color="#38A169" w={3} h={3} />
                        </Flex>
                    </VStack>
                </Flex>
            </Box>
        </Box>
    );
};

export default DetailPageHeader;