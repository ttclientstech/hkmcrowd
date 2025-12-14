import React from "react";
import { Box, Text, Button, Flex, Icon, VStack } from "@chakra-ui/react";
import { FaCheckCircle, FaMusic } from "react-icons/fa";
import { motion } from "framer-motion";
import culturalHallBg from "../../assets/images/cultural_hall_bg.jpg"; // ✅ Replace with your actual image path

const MotionBox = motion(Box);
const NAVY = "#082032";
const GOLD = "#D4AF37";

const CulturalHallDonationBanner = ({ handleScrollToDonate }) => {
    return (
        <Box
            as="section"
            w="100%"
            position="relative"
            overflow="hidden"
            // ✅ Double the height of a typical button, full width
            h={["200px", "250px"]}
            mt={12}
            mb={8}
            // ✅ Add rounded corners for a premium look
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
                // ✅ Subtle zoom effect for life
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
                // ✅ Matches your current style (Dark to slightly transparent)
                bgGradient={`linear(to-r, ${NAVY}, rgba(8,32,50,0.7))`}
                opacity={0.9}
            />

            {/* 3. Content (Centered) */}
            <Flex
                position="relative"
                zIndex={2}
                h="100%"
                align="center"
                justify="center"
                direction={["column", "row"]} // Stack on mobile, side-by-side on desktop
                gap={[4, 8]}
                px={[6, 12]}
                py={4}
            >
                {/* Text Content */}
                <VStack align={["center", "flex-start"]} spacing={2} maxW="600px" textAlign={["center", "left"]}>
                    <Flex align="center" gap={2} color={GOLD} mb={1}>
                        <Icon as={FaMusic} w={5} h={5} />
                        <Text fontWeight="bold" letterSpacing="wider" fontSize="sm" textTransform="uppercase">
                            Did You Know?
                        </Text>
                    </Flex>

                    <Text
                        color="white"
                        fontSize={["lg", "2xl"]}
                        fontWeight="800"
                        lineHeight="1.3"
                        fontFamily="'Poppins', sans-serif"
                    >
                        Dakshina Dwaraka Dham is built with a <br />
                        <Text as="span" color={GOLD}>300-seater Cultural Hall</Text> to host cultural programs.
                    </Text>

                    <Text color="gray.300" fontSize={["sm", "md"]} fontFamily="'Satoshi', sans-serif">
                        Contribute to sustain our culture.
                    </Text>
                </VStack>

                {/* Button */}
                <MotionBox animate={{ scale: [1, 1.02, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                    <Button
                        size="lg"
                        h="56px"
                        bgGradient={`linear(to-r, ${GOLD}, #C59D18)`}
                        color={NAVY}
                        rightIcon={<FaCheckCircle />}
                        onClick={handleScrollToDonate}
                        boxShadow="0 4px 15px rgba(212, 175, 55, 0.4)"
                        _hover={{
                            transform: "translateY(-2px)",
                            boxShadow: "0 6px 20px rgba(212, 175, 55, 0.6)"
                        }}
                        fontWeight="800"
                        borderRadius="full"
                        px={8}
                        fontSize="md"
                    >
                        Contribute Now
                    </Button>
                </MotionBox>
            </Flex>
        </Box>
    );
};

export default CulturalHallDonationBanner;