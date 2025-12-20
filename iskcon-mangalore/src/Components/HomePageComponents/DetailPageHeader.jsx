import { Box, Flex, Image, Text, VStack, Button } from '@chakra-ui/react';
import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import transparentLogo from "../../assets/images/transparent_logo.png";
import bannerBg from "../../assets/images/002_temple_night_view.jpeg";
// ✅ 1. Import the new mobile image
import mobileHeroBg from "../../assets/images/campaigner_page_hero_1.png";
import PoppinFont from "./PoppinFont";

const COST_PER_SQFT = 5000;

const DetailPageHeader = ({ getSingleUser }) => {
    const campaignerName = getSingleUser?.campaignDetails?.campaignName || "Campaigner";
    const sqft =  Math.floor((getSingleUser?.campaignDetails?.targetAmount || 0) / COST_PER_SQFT);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleClick = () => {
        // ✅ navigate and send campaign details through state
        navigate(`/campaign/${id}/donate`, { state: { getSingleUser } });
    };

    return (
        <Box
            position="relative"
            w="100%"
            bg="black"
            overflow="hidden"
            minH={["400px", "500px", "600px"]} // ✅ Kept exactly as your original
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            boxShadow="2xl"
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
                backgroundImage={[
                    `url(${mobileHeroBg})`, // Mobile view (0-480px approx)
                    `url(${bannerBg})`      // Tablet/Desktop view
                ]}
                backgroundSize="cover"
                backgroundPosition="center center"
                opacity="0.75"
                transition="transform 10s ease"
                _hover={{ transform: "scale(1.05)" }}
            />

            {/* ------------------------------------------------------- */}
            {/* 2. GRADIENT OVERLAY (Readability without "Walls") */}
            {/* ------------------------------------------------------- */}
            <Box
                position="absolute" top="0" left="0" w="100%" h="100%"
                bgGradient="linear(to-b,
                    rgba(0,0,0,0.8) 0%,
                    rgba(44,10,10,0.3) 40%,
                    rgba(0,0,0,0.9) 100%
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
                filter="drop-shadow(0px 0px 10px rgba(0,0,0,0.5))"
            />

            {/* DONATE BUTTON (Desktop Only + Elegant Style) */}
            <Button
                // ✅ HIDDEN on Mobile (['none', 'flex']), Visible on Desktop
                display={['none', 'flex']}
                position="absolute"
                top="2rem"
                right="2rem"
                zIndex={10}

                // ✅ STYLE: Elegant Glass & Gold (Passive until hovered)
                bg="rgba(0,0,0,0.4)"
                border="1px solid #FFD700"
                color="#FFD700"

                size="md"
                px={8}
                fontSize="sm"
                fontWeight="600"
                letterSpacing="widest"
                borderRadius="full"
                backdropFilter="blur(5px)"

                _hover={{
                    bg: "#FFD700", // Fills with gold only on hover
                    color: "#2C0A0A",
                    boxShadow: "0px 0px 15px rgba(255, 215, 0, 0.6)"
                }}
                onClick={handleClick}
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
                align={["center", "flex-end"]}
                justify="flex-end"
                px={["1rem", "2rem"]}
                zIndex={2}
                pb={8}
            >
                <VStack
                    spacing={4}
                    textAlign={["center", "right"]}
                    align={["center", "flex-end"]}
                    maxW={["100%", "750px"]}
                >
                    <Text
                        fontFamily="'Poppins', sans-serif"
                        fontSize={["xl", "2xl", "4xl"]}
                        color="#F9F5F0"
                        lineHeight="1.2"
                        fontWeight="500"
                        textShadow="0px 4px 10px rgba(0,0,0,0.9)"
                    >
                        {/* ✅ CHANGED: Lighter Gold + Glow Effect for better attention */}
                        <Text
                            as="span"
                            color="#FFD700"
                            fontWeight="800"
                            textShadow="0px 0px 20px rgba(255, 215, 0, 0.6)"
                        >
                            {campaignerName}
                        </Text>
                        <br/> needs your support <br/>to raise{" "}
                        <Text
                            as="span"
                            color="#FFD700"
                            fontWeight="800"
                            textShadow="0px 0px 20px rgba(255, 215, 0, 0.6)"
                        >
                            {sqft}
                        </Text>{" "}
                        Square Feet for <br/>
                        Chennai's{" "}
                        <Text
                            as="span"
                            color="#FFD700"
                            fontWeight="700"
                            textShadow="0px 0px 20px rgba(255, 215, 0, 0.6)"
                        >
                            Dakshina Dwaraka Dham
                        </Text>
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