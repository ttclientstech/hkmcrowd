import React from "react";
import { HStack, Image, Text, VStack, Box, SimpleGrid, Center } from "@chakra-ui/react";
import lotusBud from "../../assets/images/lotus_bud_small.png";
import lotusBloom from "../../assets/images/lotus_bloom_small.png";

const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const WeeklyLotusRow = ({ days: blossomed }) => {
    const todayIndex = new Date().getDay();

    return (
        // MAIN DASHBOARD WIDGET CARD
        <Box
            w="full"
            bg="transparent" // Transparent to blend with your glassmorphism card
            p={0}
            overflow="hidden"
        >
            <Center>
                {/* GRID LAYOUT:
                   - columns={[3, 4, 7]}: 3 per row on mobile, 4 on tablet, 7 on desktop
                   - spacing: Controls gap between cards
                */}
                <SimpleGrid
                    columns={[3, 4, 7]}
                    spacing={3}
                    w="100%"
                    justifyContent="center"
                >
                    {blossomed.map((hasBlossomed, i) => {
                        if (i > todayIndex) return null; // Hide future days
                        const isToday = i === todayIndex;

                        return (
                            // INDIVIDUAL DAY CARD
                            <VStack
                                key={i}
                                bg={isToday ? "rgba(255, 235, 200, 0.15)" : "rgba(255, 255, 255, 0.05)"} // Subtle glass bg
                                borderWidth="1px"
                                borderColor={isToday ? "orange.300" : "whiteAlpha.200"}
                                borderRadius="xl"
                                p={2}
                                spacing={2}
                                align="center"
                                justify="space-between"
                                transition="all 0.2s"
                                _hover={{ borderColor: "orange.300", transform: "translateY(-2px)" }}
                            >
                                {/* IMAGE CONTAINER:
                                   - boxSize="90px": Sets explicit 90px height/width as requested
                                */}
                                <Box position="relative" boxSize="90px">
                                    {isToday && !hasBlossomed ? (
                                        <>
                                            <Image
                                                src={lotusBloom}
                                                boxSize="90px" // ✅ 90px Height
                                                objectFit="contain"
                                                opacity={0.6}
                                                filter="grayscale(40%)"
                                            />
                                            <VStack
                                                spacing="0"
                                                position="absolute"
                                                top="50%"
                                                left="50%"
                                                transform="translate(-50%, -50%)"
                                                zIndex={2}
                                                bg="rgba(0, 0, 0, 0.7)"
                                                px={2}
                                                py={1}
                                                borderRadius="md"
                                                border="1px solid rgba(255,255,255,0.2)"
                                            >
                                                <Text
                                                    fontSize="10px"
                                                    fontWeight="800"
                                                    color="orange.300"
                                                    lineHeight="1"
                                                    textTransform="uppercase"
                                                >
                                                    Awaits
                                                </Text>
                                                <Text
                                                    fontSize="10px"
                                                    fontWeight="800"
                                                    color="orange.300"
                                                    lineHeight="1"
                                                    textTransform="uppercase"
                                                >
                                                    Seva
                                                </Text>
                                            </VStack>
                                        </>
                                    ) : (
                                        <Image
                                            src={hasBlossomed ? lotusBloom : lotusBud}
                                            boxSize="90px" // ✅ 90px Height
                                            objectFit="contain"
                                            transition="transform 0.3s ease"
                                            _hover={{ transform: "scale(1.1)" }}
                                        />
                                    )}
                                </Box>

                                {/* Day label */}
                                <Text
                                    fontSize="xs"
                                    fontWeight="600"
                                    color="gray.400"
                                    textAlign="center"
                                    textTransform="uppercase"
                                    letterSpacing="0.5px"
                                >
                                    {dayLabels[i]}
                                </Text>
                            </VStack>
                        );
                    })}
                </SimpleGrid>
            </Center>
        </Box>
    );
};

export default WeeklyLotusRow;