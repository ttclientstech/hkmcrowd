import { Box, Flex, Text, VStack, Icon, Badge, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Button, useBreakpointValue } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom'; // Renamed to avoid conflict
import { FaChevronLeft, FaBuilding, FaHandHoldingHeart, FaLeaf } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import image16 from "../../assets/images/logo.jpeg";

const ImpactHeader = ({ getSingleUser }) => {
    const [contribution, setContribution] = useState(1000);
    const isMobile = useBreakpointValue({ base: true, md: false });

    // THE PSYCHOLOGICAL CALCULATOR
    // Maps money to "Tangible Impact" - Business people love this.
    const getImpactText = (amount) => {
        if (amount < 2000) return "Lays 1 Sacred Brick";
        if (amount < 5000) return "Sponsors 2 Bags of Cement";
        if (amount < 10000) return "Constructs 1 Sq.ft of Heritage";
        return "Builds a Pillar of Culture";
    };

    const handleDonateClick = () => {
        // You would integrate this with your payment logic/scroll
        const donationSection = document.getElementById('donation-section');
        // Assuming your donation box has this ID or use the Ref logic you have
        if(donationSection) donationSection.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <Box
            w="100%"
            position="relative"
            bgGradient="linear(to-br, #F0FDFA, #FFF)" // Soft Teal-White Gradient (Calm, Professional)
            overflow="hidden"
            pb={[8, 12]}
        >
            {/* Background Abstract Geometry - Adds "Architectural" feel without being messy */}
            <Box
                position="absolute" top="-10%" right="-5%"
                w="400px" h="400px"
                borderRadius="full"
                border="40px solid rgba(15, 118, 110, 0.03)" // Very faint Teal ring
            />
            <Box
                position="absolute" bottom="10%" left="-10%"
                w="300px" h="300px"
                borderRadius="full"
                bg="rgba(146, 64, 14, 0.03)" // Very faint Copper circle
            />

            <Box maxW="1200px" mx="auto" px={["1.5rem", "2rem"]} pt={["2rem", "3rem"]}>

                {/* 1. TOP NAV: Minimal & clean */}
                <Flex justify="space-between" align="center" mb={8}>
                    <RouterLink to="/">
                        <Flex align="center" gap={2} color="teal.700" _hover={{ color: "teal.900" }}>
                            <Icon as={FaChevronLeft} />
                            <Text fontSize="sm" fontWeight="bold" letterSpacing="wide">BACK TO HOME</Text>
                        </Flex>
                    </RouterLink>
                    <Badge colorScheme="teal" variant="solid" borderRadius="full" px={3} py={1}>
                        PHASE 3: INTERIORS
                    </Badge>
                </Flex>

                <Flex
                    direction={["column", "column", "row"]}
                    align="center"
                    justify="space-between"
                    gap={12}
                >
                    {/* 2. LEFT SIDE: The "Visionary" Pitch */}
                    <VStack align="flex-start" spacing={5} maxW={["100%", "100%", "55%"]} zIndex={2}>

                        <Flex align="center" gap={2}>
                            <Icon as={MdVerified} color="#0F766E" w={5} h={5} />
                            <Text fontSize="xs" fontWeight="bold" color="teal.600" textTransform="uppercase" letterSpacing="widest">
                                Official Cultural Project
                            </Text>
                        </Flex>

                        <Text
                            fontFamily="'Merriweather', serif"
                            fontSize={["3xl", "4xl", "5xl"]}
                            fontWeight="800"
                            color="#1E293B" // Slate 800 (Professional Dark Blue/Grey)
                            lineHeight="1.1"
                        >
                            Chennai gave us a career. <br/>
                            <Text as="span" color="#92400E">Let's give Chennai a soul.</Text> {/* Copper Text */}
                        </Text>

                        <Text fontSize={["md", "lg"]} color="gray.600" lineHeight="1.8" maxW="600px">
                            The <strong>Dakshina Dwaraka Cultural Complex</strong> is not just a building.
                            It is a 40,000 sq.ft. ecosystem for art, values, and peace—designed for the modern citizen.
                            <br/><br/>
                            Join <strong>{getSingleUser?.campaignDetails?.campaignName || "us"}</strong> and 5,000+ professionals in building this landmark.
                        </Text>

                        {/* Social Proof Tags - Business friendly */}
                        <Flex gap={3} wrap="wrap">
                            <Badge py={1} px={3} borderRadius="md" bg="white" border="1px solid #E2E8F0" color="gray.500">
                                <Icon as={FaBuilding} mr={2} /> 40k Sq.ft Complex
                            </Badge>
                            <Badge py={1} px={3} borderRadius="md" bg="white" border="1px solid #E2E8F0" color="gray.500">
                                <Icon as={FaLeaf} mr={2} /> Green Architecture
                            </Badge>
                        </Flex>
                    </VStack>


                    {/* 3. RIGHT SIDE: The "Impact Calculator" Card (The Hook) */}
                    {/* This replaces the static image with an interactive tool */}
                    <Box
                        w={["100%", "100%", "400px"]}
                        bg="white"
                        borderRadius="2xl"
                        boxShadow="0px 20px 40px -10px rgba(15, 118, 110, 0.15)" // Teal shadow
                        border="1px solid"
                        borderColor="teal.50"
                        p={6}
                        position="relative"
                        zIndex={2}
                    >
                        <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase" mb={4}>
                            See your Impact
                        </Text>

                        {/* The Dynamic Output */}
                        <VStack spacing={0} align="flex-start" mb={6}>
                            <Text fontSize="3xl" fontWeight="800" color="#0F766E">
                                ₹ {contribution.toLocaleString()}
                            </Text>
                            <Text fontSize="md" fontWeight="bold" color="#92400E" fontFamily="'Merriweather', serif">
                                ➔ {getImpactText(contribution)}
                            </Text>
                        </VStack>

                        {/* The Interactive Slider */}
                        <Box mb={8}>
                            <Slider
                                aria-label="contribution-slider"
                                defaultValue={1000}
                                min={500}
                                max={15000}
                                step={500}
                                onChange={(val) => setContribution(val)}
                            >
                                <SliderTrack bg="gray.100" h="8px" borderRadius="full">
                                    <SliderFilledTrack bgGradient="linear(to-r, #92400E, #0F766E)" />
                                </SliderTrack>
                                <SliderThumb boxSize={6} border="4px solid white" boxShadow="md" bg="#0F766E" />
                            </Slider>
                            <Flex justify="space-between" mt={2}>
                                <Text fontSize="xs" color="gray.400">₹500</Text>
                                <Text fontSize="xs" color="gray.400">₹15,000+</Text>
                            </Flex>
                        </Box>

                        {/* The Call to Action */}
                        <Button
                            w="100%"
                            h="50px"
                            colorScheme="teal"
                            bgGradient="linear(to-r, #0F766E, #115E59)"
                            fontSize="md"
                            fontWeight="bold"
                            onClick={handleDonateClick}
                            _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                        >
                            MAKE IT HAPPEN
                        </Button>

                        <Flex justify="center" align="center" gap={2} mt={4}>
                            <Icon as={FaHandHoldingHeart} color="#92400E" />
                            <Text fontSize="xs" color="gray.500" fontStyle="italic">
                                100% Tax Exempt under 80G
                            </Text>
                        </Flex>
                    </Box>

                </Flex>
            </Box>
        </Box>
    );
};

export default ImpactHeader;