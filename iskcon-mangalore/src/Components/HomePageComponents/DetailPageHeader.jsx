import { Box, Flex, Image, Text, VStack, Icon, Link as ChakraLink } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import image16 from "../../assets/images/logo.jpeg";
import bannerBg from "../../assets/images/002_temple_night_view.jpeg";

const DetailPageHeader = ({ getSingleUser }) => {
    const campaignerName = getSingleUser?.campaignDetails?.campaignName || "A Devotee";

    return (
        <Box position="relative" w="100%" bg="#1A202C" overflow="hidden" pb={["3rem", "5rem"]}>
            {/* 1. Cinematic Background */}
            <Box
                position="absolute" top="0" left="0" w="100%" h="100%"
                backgroundImage={`url(${bannerBg})`}
                backgroundSize="cover"
                backgroundPosition="center"
                opacity="0.15"
                filter="grayscale(100%)"
            />

            {/* 2. Top Nav */}
            <Flex justify="space-between" align="center" maxW="1200px" mx="auto" p={6} position="relative" zIndex={2}>
                <Text color="white" fontWeight="bold" letterSpacing="widest" fontSize="sm">DAKSHINA DWARAKA</Text>
                <Button
                    size="sm" variant="outline" color="white" _hover={{ bg: "whiteAlpha.200" }}
                    leftIcon={<FaShareAlt />} borderRadius="full"
                >
                    Share Campaign
                </Button>
            </Flex>

            {/* 3. The Ambassador Profile */}
            <Flex
                direction={["column", "row"]}
                align="center"
                justify="center"
                maxW="1000px" mx="auto"
                mt={[4, 10]}
                gap={[6, 12]}
                position="relative" zIndex={2}
            >
                {/* Left: The "Profile Card" - Makes campaigner look like a VIP */}
                <Box position="relative">
                    <Box
                        w={["140px", "180px"]} h={["140px", "180px"]}
                        borderRadius="full"
                        border="4px solid #D4AF37" // Gold Border
                        overflow="hidden"
                        boxShadow="0px 0px 40px rgba(212, 175, 55, 0.4)"
                    >
                        <img
                            src={user?.campaignDetails?.imgurl}
                            alt="Campaigner"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => e.target.src = "https://bit.ly/broken-link"}
                        />
                    </Box>
                    <Badge
                        position="absolute" bottom="10px" right="-10px"
                        bg="#D4AF37" color="#2C0A0A"
                        px={3} py={1} borderRadius="full"
                        boxShadow="lg" fontSize="xs" fontWeight="bold"
                        display="flex" alignItems="center" gap={1}
                    >
                        <Icon as={FaCheckCircle} /> VERIFIED AMBASSADOR
                    </Badge>
                </Box>

                {/* Right: The Pitch - Action Oriented */}
                <VStack align={["center", "flex-start"]} spacing={4} textAlign={["center", "left"]}>
                    <Text color="#90CDF4" fontWeight="bold" letterSpacing="wider" fontSize="xs">
                        OFFICIAL CULTURAL FUNDRAISER
                    </Text>
                    <Text
                        color="white"
                        fontSize={["2xl", "4xl", "5xl"]}
                        fontFamily="'Merriweather', serif"
                        fontWeight="800"
                        lineHeight="1.1"
                    >
                        "Join me in building <br />
                        <span style={{ color: "#FBD38D" }}>Chennai's New Landmark.</span>"
                    </Text>

                    <HStack spacing={4} pt={2}>
                        <Button
                            size="lg" h="55px" px={8}
                            bgGradient="linear(to-r, #D4AF37, #B7950B)"
                            color="#2C0A0A" fontWeight="800"
                            _hover={{ transform: "translateY(-2px)", boxShadow: "xl" }}
                            onClick={onDonate}
                        >
                            SUPPORT MY MISSION
                        </Button>
                        <Button
                            variant="ghost" color="gray.300"
                            _hover={{ color: "white" }}
                            onClick={() => document.getElementById('project-video').scrollIntoView({ behavior: 'smooth' })}
                        >
                            Watch Video
                        </Button>
                    </HStack>
                </VStack>
            </Flex>
        </Box>
    );
};

export default DetailPageHeader;