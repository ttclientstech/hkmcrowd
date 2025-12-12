import React from "react";
import { HStack, Image, Text, VStack, Box, SimpleGrid } from "@chakra-ui/react";
import lotusBud from "../../assets/images/lotus_bud_small.png";
import lotusBloom from "../../assets/images/lotus_bloom_small.png";

const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const WeeklyLotusRow = ({ days: blossomed }) => {
    const todayIndex = new Date().getDay();

    return (
        // MAIN DASHBOARD WIDGET CARD
        <Box
            w="full"
            bg="white"
            borderRadius="xl"
            borderWidth="1px"
            borderColor="gray.200"
            boxShadow="sm"
            p={6}
            overflow="hidden"
        >
            {/* WIDGET HEADER */}
            <Box mb={6} borderBottomWidth="1px" borderColor="gray.100" pb={3}>
                <Text
                    color="gray.500"
                    fontWeight="700"
                    fontSize="xs"
                    letterSpacing="wider"
                    textTransform="uppercase"
                >
                    Your Weekly Seva Blossoms
                </Text>
            </Box>

            {/* CONTENT GRID */}
            <HStack
                spacing={4}
                justify="start"
                wrap="wrap"
                align="stretch"
            >
                {blossomed.map((hasBlossomed, i) => {
                    if (i > todayIndex) return null; // Hide future days
                    const isToday = i === todayIndex;

                    return (
                        // INDIVIDUAL DATA SLOT (Day Card)
                        <VStack
                            key={i}
                            bg={isToday ? "orange.50" : "gray.50"} // Highlight today subtly
                            borderWidth="1px"
                            borderColor={isToday ? "orange.200" : "gray.100"}
                            borderRadius="lg"
                            p={3}
                            minW="90px"
                            spacing={3}
                            align="center"
                            justify="space-between"
                            transition="all 0.2s"
                            _hover={{ borderColor: "orange.300", boxShadow: "xs" }}
                        >
                            <Box position="relative" boxSize="60px">
                                {/* Lotus logic */}
                                {isToday && !hasBlossomed ? (
                                    <>
                                        <Image
                                            src={lotusBloom}
                                            boxSize="60px"
                                            opacity={0.8}
                                            filter="grayscale(20%)" // Muted look until action taken
                                        />
                                        <VStack
                                            spacing="0"
                                            position="absolute"
                                            top="50%"
                                            left="50%"
                                            transform="translate(-50%, -50%)"
                                            zIndex={2}
                                            bg="rgba(255,255,255,0.85)" // Glassmorphism badge feel
                                            px={2}
                                            py={1}
                                            borderRadius="md"
                                            boxShadow="sm"
                                        >
                                            <Text
                                                fontSize="10px"
                                                fontWeight="800"
                                                color="orange.600"
                                                lineHeight="1"
                                                textTransform="uppercase"
                                            >
                                                Awaits
                                            </Text>
                                            <Text
                                                fontSize="10px"
                                                fontWeight="800"
                                                color="orange.600"
                                                lineHeight="1"
                                                textTransform="uppercase"
                                            >
                                                You
                                            </Text>
                                        </VStack>
                                    </>
                                ) : (
                                    <Image
                                        src={hasBlossomed ? lotusBloom : lotusBud}
                                        boxSize="60px"
                                        transition="transform 0.3s ease"
                                        _hover={{ transform: "scale(1.1)" }}
                                    />
                                )}
                            </Box>

                            {/* Day label - Changed to gray for dashboard visibility */}
                            <Text
                                fontSize="xs"
                                fontWeight="600"
                                color="gray.500"
                                textAlign="center"
                            >
                                {dayLabels[i]}
                            </Text>
                        </VStack>
                    );
                })}
            </HStack>
        </Box>
    );
};

export default WeeklyLotusRow;