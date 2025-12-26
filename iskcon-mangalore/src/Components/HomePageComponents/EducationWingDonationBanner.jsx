import React from "react";
import { Box, Text, Flex, VStack, useBreakpointValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import  { education_wing } from "../../constants/cdnImages"; // ✅ Replace with your actual image path

const MotionBox = motion(Box);
const NAVY = "#082032";
const GOLD = "#D4AF37";

const EducationWingDonationBanner = ({ handleScrollToDonate }) => {
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
                bgImage={`url(${education_wing})`}
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
                        <Text fontWeight="bold" letterSpacing="wider" fontSize={["lg", "xl"]} textTransform="uppercase">
                            Nurturing Minds, <Text as="span" color={GOLD}>Building Character</Text>
                        </Text>
                    </Flex>

                    {/* Descriptive Subtext */}
                    <Text color="white" fontSize={["sm", "md"]} fontFamily="'Satoshi', sans-serif" lineHeight="1.6">
                        Four classrooms accommodating nearly 200 participants. Children and adults learn the Bhagavad-gita, ethics, and values rooted in Vedic wisdom.
                    </Text>
                </VStack>

                <Text color="gray.300" fontSize={["sm", "md"]} fontFamily="'Satoshi', sans-serif">
                    Invest in Knowledge
                </Text>
            </Flex>
        </Box>
    );
};

export default EducationWingDonationBanner;