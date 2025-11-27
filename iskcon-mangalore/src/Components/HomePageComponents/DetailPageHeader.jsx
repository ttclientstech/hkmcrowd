import { Box, Flex, Image, Text, VStack, Button, Link as ChakraLink } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import transparentLogo from "../../assets/images/transparent_logo.png";
import bannerBg from "../../assets/images/002_temple_night_view.jpeg";
import PoppinFont from "./PoppinFont";

const DetailPageHeader = ({ getSingleUser }) => {
    const campaignerName = getSingleUser?.campaignDetails?.campaignName || "A Devotee";

    return (
        <Box
            position="relative"
            w="100%"
            bg="black" // Fallback color only
            overflow="hidden"
            minH={["400px", "500px", "600px"]} // Adjusted height for cinematic feel
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            boxShadow="2xl" // Adds depth at the bottom
            fontFamily="'Poppins', sans-serif"
        >
            <PoppinFont />
            {/* Top Gold Border */}
            <Box w="100%" h="4px" bgGradient="linear(to-r, #D4AF37, #FFD700, #D4AF37)" zIndex={10} />

            {/* ------------------------------------------------------- */}
            {/* 1. CINEMATIC BACKGROUND IMAGE (The "Window") */}
            {/* ------------------------------------------------------- */}
            <Box
                position="absolute" top="0" left="0" w="100%" h="100%"
                backgroundImage={`url(${bannerBg})`}
                backgroundSize="cover"
                backgroundPosition="center center"
                // CHANGED: Increased opacity so people SEE the temple (Emotional Connection)
                opacity="0.75"
                transition="transform 10s ease" // Subtle zoom effect could be added here
                _hover={{ transform: "scale(1.05)" }}
            />

            {/* ------------------------------------------------------- */}
            {/* 2. GRADIENT OVERLAY (Readability without "Walls") */}
            {/* ------------------------------------------------------- */}
            {/* This makes text readable but keeps the "Transparent" feel */}
            <Box
                position="absolute" top="0" left="0" w="100%" h="100%"
                bgGradient="linear(to-b,
                    rgba(0,0,0,0.8) 0%,   /* Dark at top for Logo/Button */
                    rgba(44,10,10,0.3) 40%, /* Transparent Mahogany in middle */
                    rgba(0,0,0,0.9) 100%  /* Dark at bottom for Text */
                )"
            />

            {/* ------------------------------------------------------- */}
            {/* LOGO & DONATE BUTTON (Floating) */}
            {/* ------------------------------------------------------- */}
            <Image
                src={transparentLogo}
                alt="hkm_logo"
                position="absolute"
                top={["1.5rem", "2rem"]}
                left={["1rem", "2rem"]}
                w={["80px", "140px"]}
                objectFit="contain"
                zIndex={10}
                filter="drop-shadow(0px 0px 10px rgba(0,0,0,0.5))" // Shadow for pop
            />

            <Button
                position="absolute"
                top="2rem"
                right="2rem"
                zIndex={10}
                bgGradient="linear(to-r, #D4AF37, #C59D18)" // Premium Gradient Button
                color="#2C0A0A"
                size={["sm", "md"]}
                px={8}
                fontSize="sm"
                fontWeight="800"
                letterSpacing="widest"
                borderRadius="full"
                boxShadow="0px 0px 20px rgba(212, 175, 55, 0.5)"
                _hover={{ transform: "scale(1.05)", boxShadow: "0px 0px 30px rgba(212, 175, 55, 0.7)" }}
                onClick={() => {
                    const donationSection = document.getElementById('donation-section');
                    if(donationSection) donationSection.scrollIntoView({ behavior: 'smooth' });
                }}
            >
                DONATE
            </Button>

            {/* ------------------------------------------------------- */}
            {/* EMPTY SPACER to push text down (since we use flex-between) */}
            {/* ------------------------------------------------------- */}
            <Box flex="1" />

            {/* ------------------------------------------------------- */}
            {/* MAIN HEADLINE (Bottom Aligned for Cinematic Feel) */}
            {/* ------------------------------------------------------- */}
            <Flex
                maxW="1200px" mx="auto" w="100%"
                direction="column"
                align={["center", "flex-end"]} // Centered on mobile, Right on Desktop
                justify="flex-end"
                px={["1rem", "2rem"]}
                zIndex={2}
                pb={8} // Space from bottom
            >
                <VStack
                    spacing={4}
                    textAlign={["center", "right"]}
                    align={["center", "flex-end"]}
                    maxW={["100%", "750px"]}
                >
                    <Text
                        fontFamily="'Poppins', sans-serif"
                        fontSize={["xl", "2xl", "4xl"]} // Larger font for impact
                        color="#F9F5F0"
                        lineHeight="1.2"
                        fontWeight="500"
                        textShadow="0px 4px 10px rgba(0,0,0,0.9)" // Text shadow is crucial on transparent bg
                    >
                        <Text as="span" color="#D4AF37" fontWeight="800">{campaignerName}</Text> needs your support<br/>
                        to raise <Text as="span" color="#D4AF37" fontWeight="800">1000</Text> Square Feet for <br/>
                        Chennai's <Text as="span" color="#FBD38D" fontWeight="700">Dakshina Dwaraka Dham</Text>
                    </Text>

                    {/* Subtext */}
                    <Text
                        fontSize={["sm", "lg"]}
                        color="gray.300"
                        fontStyle="italic"
                        letterSpacing="wide"
                        textShadow="0px 2px 5px rgba(0,0,0,0.8)"
                    >
                        "Create a History. Leave a legacy"
                    </Text>

                    {/* The Gold Underline */}
                    <Box
                        w={["100px", "200px"]}
                        h="2px"
                        bgGradient="linear(to-r, transparent, #D4AF37, transparent)"
                    />
                </VStack>
            </Flex>
        </Box>
    );
};

export default DetailPageHeader;