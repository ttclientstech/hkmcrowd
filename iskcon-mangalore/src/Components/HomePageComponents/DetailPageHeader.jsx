import { Box, Flex, Image, Text, VStack, Icon, Link as ChakraLink } from '@chakra-ui/react';
import { keyframes } from '@emotion/react'; // <--- FIX: Import keyframes from here
import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaQuoteLeft, FaQuoteRight, FaChevronDown } from 'react-icons/fa';
import image16 from "../../assets/images/logo.jpeg";
import Banner from "../../assets/images/mandir_nirman_seva_banner.png";

// Animation for the Scroll Arrow
const bounce = keyframes`
    0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
    40% {transform: translateY(-10px);}
    60% {transform: translateY(-5px);}
`;

const DetailPageHeader = ({ getSingleUser }) => {
    const campaignerName = getSingleUser?.campaignDetails?.campaignName || "A Cultural Well-wisher";

    return (
        <Box position="relative" w="100%">
            {/* Top Gold Border */}
            <Box w="100%" h="4px" bgGradient="linear(to-r, #D4AF37, #FFD700, #D4AF37)" />

            <Box
                w="100%"
                // BACKGROUND IMAGE: Uses the Banner with a Dark Overlay so text pops
                bgImage={`linear-gradient(to right, rgba(44, 10, 10, 0.90), rgba(44, 10, 10, 0.80)), url(${Banner})`}
                bgSize="cover"
                bgPosition="center"
                bgAttachment="fixed" // Parallax effect
                color="#F9F5F0"
                py={["3rem", "4rem"]} // Increased height for better impact
                px={["1rem", "2rem"]}
                position="relative"
                overflow="hidden"
                borderBottom="1px solid #4B0000"
                display="flex"
                flexDirection="column"
                justifyContent="center"
            >
                <Flex
                    maxW="1200px" mx="auto" w="100%"
                    direction={["column", "column", "row"]}
                    align="center"
                    justify="space-between"
                    gap={8}
                >
                    {/* 1. LEFT SIDE: Brand Identity */}
                    <ChakraLink as={Link} to="/" _hover={{ textDecoration: 'none' }} group>
                        <Flex align="center" gap={4} opacity={0.9} _hover={{ opacity: 1, transform: "translateX(5px)" }} transition="all 0.3s">
                            <Box
                                w={["60px", "80px"]} h={["60px", "80px"]}
                                borderRadius="full" border="2px solid #D4AF37" overflow="hidden"
                                boxShadow="0px 0px 25px rgba(212, 175, 55, 0.4)"
                            >
                                <Image src={image16} w="100%" h="100%" objectFit="cover" />
                            </Box>

                            <VStack align="flex-start" spacing={0} display={["flex", "flex"]}>
                                <Text
                                    fontSize={["xs", "sm"]} color="#D4AF37"
                                    textTransform="uppercase" letterSpacing="widest" fontWeight="bold"
                                >
                                    Hare Krishna Movement
                                </Text>
                                <Flex align="center" gap={2} color="gray.300">
                                    <Icon as={FaChevronLeft} boxSize={3} />
                                    <Text fontSize="xs" fontWeight="medium">Back to Home</Text>
                                </Flex>
                            </VStack>
                        </Flex>
                    </ChakraLink>

                    {/* 2. RIGHT SIDE: The Emotional Invitation */}
                    <VStack
                        spacing={2}
                        textAlign={["center", "center", "right"]}
                        align={["center", "center", "flex-end"]}
                        maxW={["100%", "100%", "65%"]}
                        zIndex={2}
                    >
                        {/* The "Why" - Very Simple & Direct */}
                        <Text
                            fontFamily="'Cinzel', serif"
                            fontSize={["lg", "xl", "2xl"]}
                            color="#F9F5F0"
                            lineHeight="1.4"
                        >
                            "Let's join hands to build a <br/>
                            <span style={{color: "#FFD700"}}>Glorious Cultural Center</span>."
                        </Text>

                        {/* The "Who" - Campaigner Name */}
                        <Flex align="center" gap={3} mt={1}>
                            <Icon as={FaQuoteLeft} color="#D4AF37" w={3} h={3} opacity={0.6} mb={3}/>
                            <Text
                                fontSize={["2xl", "3xl", "4xl"]}
                                fontWeight="800"
                                color="#D4AF37"
                                textTransform="capitalize"
                                letterSpacing="1px"
                                textShadow="0px 4px 15px rgba(0,0,0,0.6)"
                                fontFamily="'Cinzel', serif"
                            >
                                {campaignerName}
                            </Text>
                            <Icon as={FaQuoteRight} color="#D4AF37" w={3} h={3} opacity={0.6} mt={3}/>
                        </Flex>

                        {/* The "Action" - Inclusive Language */}
                        <Text fontSize={["sm", "md"]} color="gray.200" maxW="500px" fontStyle="italic" lineHeight="1.6">
                            invites you to <span style={{fontWeight:"bold", color:"white"}}>be a part of this historic legacy</span><br/>
                            at the Dakshina Dwaraka Cultural Complex.
                        </Text>
                    </VStack>
                </Flex>

                {/* 3. SCROLL INDICATOR: Encourages Action */}
                <VStack
                    position="absolute"
                    bottom="10px"
                    left="50%"
                    transform="translateX(-50%)"
                    opacity={0.7}
                    animation={`${bounce} 2s infinite`}
                    cursor="pointer"
                    onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })}
                >
                    <Text fontSize="xs" color="#D4AF37" letterSpacing="widest" textTransform="uppercase">Scroll to Support</Text>
                    <Icon as={FaChevronDown} color="#D4AF37" w={5} h={5} />
                </VStack>
            </Box>

            {/* Bottom Gold Accent */}
            <Box w="100%" h="1px" bgGradient="linear(to-r, transparent, #D4AF37, transparent)" opacity={0.5} />
        </Box>
    );
};

export default DetailPageHeader;