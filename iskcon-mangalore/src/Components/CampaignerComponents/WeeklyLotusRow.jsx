import React from "react";
import { HStack, Image, Text, VStack, Box } from "@chakra-ui/react";
import lotusBud from "../../assets/images/lotus_bud_small.png";
import lotusBloom from "../../assets/images/lotus_bloom_small.png";

const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const WeeklyLotusRow = ({ days: blossomed }) => {
    // Get current weekday (0–6)
    const todayIndex = new Date().getDay();

    return (
        <VStack spacing={5} align="center" w="full">
            <Text
                color="rgb(230 144 46)"
                fontWeight="700"
                fontSize="lg"
                textTransform="uppercase"
                textAlign="center"
            >
                Your Weekly Seva Blossoms
            </Text>

            <HStack spacing={[3, 5]} justify="center">
                {blossomed.map((hasBlossomed, i) => {
                    // Skip future days
                    if (i > todayIndex) return null;

                    const isToday = i === todayIndex;

                    return (
                        <VStack key={i} spacing={1} align="center" position="relative">
                            <Box position="relative" display="flex" justifyContent="center" alignItems="center">
                                {/* Lotus Display Logic */}
                                {isToday && !hasBlossomed ? (
                                    <>
                                        {/* faded blossom lotus */}
                                        <Image
                                            src={lotusBloom}
                                            boxSize="70px"
                                            opacity="0.25"
                                            transition="all 0.3s ease"
                                        />
                                        {/* overlay text */}
                                        <Text
                                            position="absolute"
                                            top="50%"
                                            left="50%"
                                            transform="translate(-50%, -50%)"
                                            fontSize="xs"
                                            fontWeight="700"
                                            color="rgb(230 144 46)"
                                            textAlign="center"
                                            whiteSpace="nowrap"
                                            sx={{
                                                animation: "pulse 2s infinite",
                                                "@keyframes pulse": {
                                                    "0%": { opacity: 0.6 },
                                                    "50%": { opacity: 1 },
                                                    "100%": { opacity: 0.6 },
                                                },
                                            }}
                                        >
                                            Awaits You
                                        </Text>
                                    </>
                                ) : (
                                    // If past or today (with seva)
                                    <Image
                                        src={hasBlossomed ? lotusBloom : lotusBud}
                                        boxSize="70px"
                                        transition="transform 0.3s ease"
                                        _hover={{ transform: "scale(1.05)" }}
                                    />
                                )}
                            </Box>

                            {/* Day label */}
                            <Text fontSize="xs" color="#444" textAlign="center">
                                {dayLabels[i]}
                            </Text>
                        </VStack>
                    );
                })}
            </HStack>
        </VStack>
    );
};

export default WeeklyLotusRow;