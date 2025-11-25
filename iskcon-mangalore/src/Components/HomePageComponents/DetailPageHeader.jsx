import { Box, Flex, Image, Text, VStack, Icon, Link as ChakraLink, Badge, Progress } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaCheckCircle, FaUsers } from 'react-icons/fa';
import image16 from "../../assets/images/logo.jpeg";

const DetailPageHeader = ({ getSingleUser }) => {
    const campaignerName = getSingleUser?.campaignDetails?.campaignName || "A Devotee";

    return (
        <Box
            w="100%"
            bg="#FFFAF0" // Very light cream (Paper feel), comfortable for reading
            borderBottom="1px solid #E2E8F0"
            py={["2rem", "3rem"]} // More whitespace = More Premium
            px={["1.5rem", "2rem"]}
        >
            <Flex
                maxW="1000px" // Tighter width for better reading focus (Like a blog/letter)
                mx="auto"
                direction="column"
                align="flex-start" // Align left for that "Manifesto" look
                gap={6}
            >
                {/* 1. NAVIGATION (Subtle & Clean) */}
                <ChakraLink as={Link} to="/" _hover={{ textDecoration: 'none' }}>
                    <Flex align="center" gap={2} color="gray.500" _hover={{ color: "#2C0A0A" }} transition="all 0.2s">
                        <Icon as={FaChevronLeft} boxSize={3} />
                        <Text fontSize="xs" fontWeight="bold" letterSpacing="widest" textTransform="uppercase">
                            Back to Home
                        </Text>
                    </Flex>
                </ChakraLink>

                {/* 2. THE "HOOK" HEADLINE (Think School Style: Big, Bold, Statement) */}
                <Box>
                    <Badge
                        bg="#FFF5F5"
                        color="#C53030"
                        border="1px solid #FC8181"
                        px={3} py={1}
                        borderRadius="md"
                        fontSize="xs"
                        mb={4}
                        fontWeight="bold"
                        letterSpacing="wider"
                    >
                        PHASE 3: THE FINAL STAGE
                    </Badge>

                    <Text
                        fontFamily="'Cinzel', serif" // Keeps the culture vibe
                        fontSize={["2xl", "3xl", "4xl"]} // Huge font
                        fontWeight="800"
                        color="#1A202C" // Nearly black for impact
                        lineHeight="1.2"
                        mb={4}
                    >
                        "We are not just building a Temple. <br />
                        <span style={{ color: "#D97706" }}>We are reclaiming our Roots.</span>"
                    </Text>

                    <Text
                        fontSize={["md", "lg"]}
                        color="gray.600"
                        fontFamily="'Merriweather', serif"
                        maxW="700px"
                        lineHeight="1.8"
                    >
                        In a fast-changing Chennai, the <strong>Dakshina Dwaraka Cultural Complex</strong> will stand as a timeless sanctuary for our children.
                        <br/>
                        This is your chance to place a brick in history.
                    </Text>
                </Box>

                {/* 3. THE "AUTHORITY" & SOCIAL PROOF (The Marketing Hack) */}
                <Flex
                    w="100%"
                    direction={["column", "row"]}
                    align={["flex-start", "center"]}
                    justify="space-between"
                    borderTop="1px solid #E2E8F0"
                    pt={6}
                    mt={2}
                    gap={6}
                >
                    {/* Campaigner Profile - "The Leader" */}
                    <Flex align="center" gap={4}>
                        <Box
                            w="60px" h="60px"
                            borderRadius="full"
                            overflow="hidden"
                            border="2px solid #E2E8F0"
                        >
                            <Image src={image16} w="100%" h="100%" objectFit="cover" />
                        </Box>
                        <Box>
                            <Text fontSize="xs" color="gray.500" fontWeight="bold" textTransform="uppercase">
                                Campaign Lead
                            </Text>
                            <Flex align="center" gap={2}>
                                <Text fontSize="lg" fontWeight="bold" color="#2C0A0A">
                                    {campaignerName}
                                </Text>
                                <Icon as={FaCheckCircle} color="#38A169" /> {/* Verified Badge */}
                            </Flex>
                            <Text fontSize="xs" color="gray.400">
                                Hare Krishna Movement
                            </Text>
                        </Box>
                    </Flex>

                    {/* The "Community" Stat - Triggers 'Join the Crowd' instinct */}
                    <Flex
                        bg="white"
                        p={3}
                        borderRadius="lg"
                        boxShadow="sm"
                        border="1px solid #E2E8F0"
                        align="center"
                        gap={3}
                    >
                        <Flex
                            w="40px" h="40px"
                            bg="#FEFCBF" // Light Yellow
                            borderRadius="full"
                            align="center" justify="center"
                        >
                            <Icon as={FaUsers} color="#D69E2E" boxSize={5} />
                        </Flex>
                        <Box>
                            <Text fontSize="lg" fontWeight="800" color="#2C0A0A" lineHeight="1">
                                5,200+
                            </Text>
                            <Text fontSize="xs" color="gray.500" fontWeight="medium">
                                Guardians have joined
                            </Text>
                        </Box>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    );
};

export default DetailPageHeader;