import React from "react";
import { Box, Text, Button, Flex, Icon, VStack, useBreakpointValue } from "@chakra-ui/react";
import {FaCheckCircle, FaMusic, FaVihara} from "react-icons/fa";
import { motion } from "framer-motion";
import culturalHallBg from "../../assets/images/majestic_altar.jpg"; // ✅ Replace with your actual image path

const MotionBox = motion(Box);
const NAVY = "#082032";
const GOLD = "#D4AF37";

const AltarDonationBanner = ({ handleScrollToDonate }) => {
    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <Box
            as="section"
            w="100%"
            position="relative"
            overflow="hidden"
            // ✅ Height maintained: Double the height of a typical button
            //h={["250px", "250px"]}
            mt={12}
            // ✅ Full width on mobile, rounded on desktop
            borderRadius={["0", "2xl"]}
            boxShadow="xl"
        >
            {/* 1. Background Image */}
            <Box
                position="absolute"
                top="0"
                left="0"
                w="100%"
                h="100%"
                bgImage={`url(${culturalHallBg})`}
                bgSize="cover"
                bgPosition="center"
                transition="transform 10s ease"
                _hover={{ transform: "scale(1.05)" }}
            />

            {/* 2. Navy Blue Gradient Overlay */}
            <Box
                position="absolute"
                top="0"
                left="0"
                w="100%"
                h="100%"
                bgGradient={`linear(to-r, rgba(8,32,50,0.8), rgba(8,32,50,0.8))`}
                opacity={0.95}
            />
            <Flex
                position="relative"
                zIndex={2}
                h="100%"
                align="center"
                justify="center"
                // ✅ Stack vertically on mobile, row on desktop
                direction={["column", "row"]}
                gap={[4, 10]}
                px={[4, 12]}
                py={[8, 8]}
            >
                {/* Text Content */}
                <VStack
                    align={["center", "flex-start"]}
                    spacing={3}
                    maxW={["100%", "750px"]}
                    textAlign={["center", "left"]}
                >
                    {/* Small Modern Title */}
                    <Flex align="center" gap={2} color="white" mb={0}>
                        {/*<Icon as={FaVihara} w={4} h={4} />*/}
                        <Text fontWeight="bold" letterSpacing="wider" fontSize="xs" textTransform="uppercase">
                            The Heart of Dakshina Dwaraka Dham
                        </Text>
                    </Flex>

                    {/* Main Headline */}
                    <Text
                        color="white"
                        fontSize={["lg", "2xl"]}
                        fontWeight="800"
                        lineHeight={["1.4", "1.3"]}
                        fontFamily="'Poppins', sans-serif"
                    >
                       <Text as="span" color={GOLD}>Three Majestic Altars</Text>
                    </Text>

                    {/* Descriptive Subtext */}
                    <Text color="white" fontSize={["sm", "md"]} fontFamily="'Satoshi', sans-serif" lineHeight="1.6">
                        Home to Sri Sri Rukmini Dwarakadisha, Sri Narasimha, and Sri Sri Gaura Nitai - creating a powerful spiritual epicenter for all.
                    </Text>
                </VStack>

                <Text color="gray.300" fontSize={["sm", "md"]} fontFamily="'Satoshi', sans-serif">
                    Contribute to Enable Divine Worship.
                </Text>
            </Flex>
        </Box>
    );
};

export default AltarDonationBanner;