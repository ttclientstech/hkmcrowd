import { Box, Flex, Image, Text, VStack, Icon, Button, Link as ChakraLink } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import transparentLogo from "../../assets/images/transparent_logo.png";
import bannerBg from "../../assets/images/002_temple_night_view.jpeg";

const DetailPageHeader = ({ getSingleUser }) => {
    const campaignerName = getSingleUser?.campaignDetails?.campaignName || "A Devotee";

    return (
        <Box
            position="relative"
            w="100%"
            bg="#2C0A0A"
            overflow="hidden"
            // 1. INCREASED HEIGHT FOR DESKTOP VIEW
            minH={["300px", "400px", "500px"]}
            // 2. FLEX COLUMN TO SPACE OUT CONTENT
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
        >
            {/* Top Gold Border */}
            <Box w="100%" h="4px" bgGradient="linear(to-r, #D4AF37, #FFD700, #D4AF37)" />

            {/* Background Image */}
            <Box
                position="absolute" top="0" left="0" w="100%" h="100%"
                backgroundImage={`url(${bannerBg})`}
                backgroundSize="cover"
                backgroundPosition="center"
                opacity="0.25" // Slightly increased opacity for better visibility
                filter="grayscale(100%)"
            />
            <Image
                src={transparentLogo}
                alt="hkm_logo"
                position="absolute"
                top={["1rem", "2rem"]}  // Responsive spacing from top
                left={["1rem", "2rem"]} // Responsive spacing from left
                w={["80px", "150px"]}  // Responsive size
                objectFit="contain"
                zIndex={10}
                _hover={{ transform: "scale(1.05)", transition: "transform 0.3s" }}
            />
            <ChakraLink
                as={Link}
                to="/"
                style={{ zIndex: 10, position: 'absolute', top: '1.5rem', right: '2rem' }}
                _hover={{ textDecoration: 'none' }}
            >
                <Flex align="center" gap={2} color="gray.400">
                    {/*<Icon as={FaChevronLeft} boxSize={3} />*/}
                    <Text fontSize="xs" fontWeight="medium">Home Page</Text>
                </Flex>
            </ChakraLink>

            <Button
                position="absolute"
                top="1.5rem"
                right="2rem"
                zIndex={10}
                bg="#D4AF37"       // Gold Background
                color="#2C0A0A"    // Dark Text
                size={["sm", "md"]} // Responsive Size
                px={8}
                fontSize="sm"
                fontWeight="800"
                letterSpacing="widest"
                borderRadius="full"
                boxShadow="0px 0px 15px rgba(212, 175, 55, 0.4)" // Gold Glow
                _hover={{
                    bg: "#FFD700",
                    transform: "scale(1.05)",
                    boxShadow: "0px 0px 25px rgba(212, 175, 55, 0.6)"
                }}
                _active={{ transform: "scale(0.95)" }}
                onClick={() => {
                    // Scrolls to donation section if it exists on the page
                    const donationSection = document.getElementById('donation-section');
                    if(donationSection) donationSection.scrollIntoView({ behavior: 'smooth' });
                }}
            >
                Donate
            </Button>

            {/* MAIN CONTENT SECTION (Top) */}
            <Flex
                maxW="1200px" mx="auto" w="100%"
                direction={["column", "column", "row"]}
                align="center"
                justify="space-between"
                gap={6}
                pt={["2rem", "3rem"]} // Added Top Padding
                px={["1rem", "2rem"]}
                zIndex={2}
            >
                {/* 1. LEFT SIDE: Brand & Navigation */}
                    <Flex align="center" gap={4} opacity={0.9} _hover={{ opacity: 1, transform: "translateX(5px)" }} transition="all 0.3s">
                        {/*<Box
                            w={["60px", "70px"]} h={["60px", "70px"]}
                            borderRadius="full" border="2px solid #D4AF37" overflow="hidden"
                            boxShadow="0px 0px 20px rgba(212, 175, 55, 0.15)"
                        >
                            <Image src={image16} w="100%" h="100%" objectFit="cover" />
                        </Box>*/}

                        <VStack align="flex-start" spacing={0} display={["flex", "flex"]}>
                            <Text
                                fontSize={["xs", "sm"]} color="#D4AF37"
                                textTransform="uppercase" letterSpacing="widest" fontWeight="bold"
                            >
                                Hare Krishna Movement Chennai
                            </Text>
                        </VStack>
                    </Flex>

                {/* 2. RIGHT SIDE: Main Headline Only (Subtext moved to bottom) */}
                <VStack
                    spacing={3}
                    textAlign={["center", "center", "right"]}
                    align={["center", "center", "flex-end"]}
                    maxW={["100%", "100%", "70%"]}
                >
                    <Text
                        fontFamily="'Cinzel', serif"
                        fontSize={["lg", "xl", "2xl"]}
                        color="#F9F5F0"
                        lineHeight={["1.4", "1.3"]}
                        fontWeight="500"
                    >
                        <Text as="span" color="#D4AF37" fontWeight="800">{campaignerName}</Text> needs your support<br/>
                        to raise <Text as="span" color="#D4AF37" fontWeight="800">1000</Text> Square Feet for <br/>
                        Chennai's <Text as="span" color="#D4AF37" fontWeight="700">Dakshina Dwaraka Dham - Cultural Complex</Text>
                    </Text>
                </VStack>
            </Flex>

            {/* 3. CENTERED BOTTOM SECTION */}
            <VStack w="100%" spacing={4} pb={4} zIndex={2}>
                <Text
                    fontSize={["sm", "md"]}
                    color="gray.400"
                    fontStyle="italic"
                    textAlign="center"
                    letterSpacing="wide"
                >
                    "Create a History. Leave a legacy"
                </Text>

                {/* The Underline - Placed directly below text */}
                <Box w="100%" h="1px" bgGradient="linear(to-r, transparent, #D4AF37, transparent)" opacity={0.5} />
            </VStack>
        </Box>
    );
};

export default DetailPageHeader;