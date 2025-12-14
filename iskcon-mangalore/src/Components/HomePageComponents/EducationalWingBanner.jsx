import React from "react";
import { Box, Text, Flex, Icon, VStack } from "@chakra-ui/react";
import { FaGraduationCap } from "react-icons/fa";
import { motion } from "framer-motion";
// ✅ Replace with your actual image path
import eduWingBg from "../../assets/images/educational_wing.jpg";

const MotionBox = motion(Box);
const NAVY = "#082032";
const GOLD = "#D4AF37";

const EducationalWingBanner = () => {
    return (
        <Box
            as="section"
            w="100%"
            mt={8}
            mb={8}
            // ✅ Compact styling: Rounded edges, Shadow
            borderRadius={["xl", "2xl"]}
            boxShadow="xl"
            overflow="hidden"
            bg={NAVY}
            position="relative"
            border={`1px solid ${GOLD}`}
        >
            {/* 1. Background Texture (Subtle & Monochromatic) */}
            <Box
                position="absolute"
                top="0"
                left="0"
                w="100%"
                h="100%" // Covers the navy area
                bgImage={`url(${eduWingBg})`}
                bgSize="cover"
                bgPosition="center"
                opacity={0.15} // Very subtle, just for texture
                filter="grayscale(100%)" // Black & white to not distract
            />

            {/* 2. Main Content Area */}
            <Flex
                direction="column"
                align="center"
                justify="center"
                p={[5, 6]}
                position="relative"
                zIndex={2}
                textAlign="center"
                h="100%"
            >
                {/* Heading */}
                <Flex align="center" gap={2} mb={1}>
                    <Icon as={FaGraduationCap} color={GOLD} w={4} h={4} />
                    <Text
                        color="white"
                        fontSize={["lg", "xl"]}
                        fontWeight="800"
                        fontFamily="'Poppins', sans-serif"
                        letterSpacing="wide"
                    >
                        Nurturing Minds, Building Character
                    </Text>
                </Flex>

                {/* Body Text */}
                <Text
                    color="gray.300"
                    fontSize={["xs", "sm"]}
                    fontFamily="'Satoshi', sans-serif"
                    maxW="700px"
                    lineHeight="1.5"
                    mb={4} // Spacing before the bottom bar
                >
                    Built with four classrooms accommodating nearly 200 participants.
                    Children and adults learn the Bhagavad-gita, ethics, and values rooted in Vedic wisdom.
                </Text>
            </Flex>

            {/* 3. "Invest in Knowledge" Bottom Bar (Distinct Style) */}
            <Box
                w="100%"
                bg={GOLD}
                py={2}
                textAlign="center"
                position="relative"
                zIndex={3}
            >
                <MotionBox
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <Text
                        color={NAVY}
                        fontSize={["sm", "md"]}
                        fontWeight="900"
                        textTransform="uppercase"
                        letterSpacing="widest"
                        fontFamily="'Poppins', sans-serif"
                    >
                        Invest in Knowledge
                    </Text>
                </MotionBox>
            </Box>
        </Box>
    );
};

export default EducationalWingBanner;