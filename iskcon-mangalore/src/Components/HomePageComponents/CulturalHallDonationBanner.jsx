import React from "react";
import { Box, Text, Flex, Icon, VStack, useBreakpointValue } from "@chakra-ui/react";
import { FaMusic } from "react-icons/fa";
import { motion } from "framer-motion";
import { culturalHallBg } from "../../constants/cdnImages"; // ✅ Replace with your actual image path

const MotionBox = motion(Box);
const NAVY = "#082032";
const GOLD = "#D4AF37";

const CulturalHallDonationBanner = ({ handleScrollToDonate }) => {
    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <Box
            as="section"
            w="100%"
            position="relative"
            overflow="hidden"
            // ✅ Height maintained: Double the height of a typical button
            //h={["250px", "250px"]}
            mb={8}
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

            {/* 3. Content (Centered) */}
            <Flex
                position="relative"
                zIndex={2}
                h="100%"
                align="center"
                justify="center"
                // ✅ Changed to column on mobile to stack content vertically
                direction={["column", "row"]}
                gap={[3, 8]} // Reduced gap on mobile
                px={[4, 12]}
                py={4}
            >
                {/* Text Content */}
                <VStack
                    align={["center", "flex-start"]}
                    spacing={1}
                    maxW={["100%", "600px"]}
                    textAlign={["center", "left"]}
                >
                    <Flex align="center" gap={2} color={GOLD} mb={0}>
                        <Icon as={FaMusic} w={4} h={4} />
                        <Text fontWeight="bold" letterSpacing="wider" fontSize="xs" textTransform="uppercase">
                            Did You Know?
                        </Text>
                    </Flex>

                    <Text
                        color="white"
                        // ✅ Adjusted font size for mobile to fit better
                        fontSize={["lg", "2xl"]}
                        fontWeight="800"
                        lineHeight={["1.2", "1.3"]}
                        fontFamily="'Poppins', sans-serif"
                    >Dakshina Dwaraka Dham is built with a <br />
                    <Text as="span" color={GOLD}>300-seater Cultural Hall</Text> to host cultural programs.
                    </Text>

                    <Text color="gray.300" fontSize={["sm", "md"]} fontFamily="'Satoshi', sans-serif">
                        Contribute to sustain our culture.
                    </Text>
                </VStack>
            </Flex>
        </Box>
    );
};

export default CulturalHallDonationBanner;