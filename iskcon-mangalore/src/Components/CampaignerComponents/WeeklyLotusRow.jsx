import React from "react";
import { HStack, Image, Text, VStack, Box } from "@chakra-ui/react";
import lotusBud from "../../assets/images/lotus_bud_small.png";
import lotusBloom from "../../assets/images/lotus_bloom_small.png";

const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const WeeklyLotusRow = ({ days: blossomed }) => {
    const todayIndex = new Date().getDay();

    return (
        <VStack spacing={4} align="center" w="full" overflowX="hidden">
            <Text
                color="rgb(230 144 46)"
                fontWeight="700"
                fontSize="lg"
                textTransform="uppercase"
                textAlign="center"
            >
                Your Weekly Seva Blossoms
            </Text>

            <HStack
                spacing={[1, 2, 3]} // 🔹 Reduced gap between lotus blocks
                justify="center"
                wrap="wrap"
                maxW="95vw"
            >
                {blossomed.map((hasBlossomed, i) => {
                    if (i > todayIndex) return null; // 🔹 Hide future days
                    const isToday = i === todayIndex;

                    return (
                        <VStack key={i} spacing={1} align="center" position="relative">
                            <Box
                                position="relative"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                boxSize="70px"
                            >
                                {/* Lotus logic */}
                                {isToday && !hasBlossomed ? (
                                    <>
                                        <Image
                                            src={lotusBloom}
                                            boxSize="70px"
                                            transition="all 0.3s ease"
                                        />
                                        <VStack
                                            spacing="1px"
                                            position="absolute"
                                            top="50%"
                                            left="50%"
                                            transform="translate(-50%, -50%)"
                                        >
                                            <Text
                                                fontSize="xs"
                                                fontWeight="700"
                                                color="rgb(230 144 46)"
                                                lineHeight="1.1"
                                            >
                                                Awaits
                                            </Text>
                                            <Text
                                                fontSize="xs"
                                                fontWeight="700"
                                                color="rgb(230 144 46)"
                                                lineHeight="1.1"
                                            >
                                                You
                                            </Text>
                                        </VStack>
                                    </>
                                ) : (
                                    <Image
                                        src={hasBlossomed ? lotusBloom : lotusBud}
                                        boxSize="70px"
                                        transition="transform 0.3s ease"
                                        _hover={{ transform: "scale(1.05)" }}
                                    />
                                )}
                            </Box>

                            {/* Day label */}
                            <Text
                                fontSize="xs"
                                color="white"
                                textAlign="center"
                                whiteSpace="nowrap"
                            >
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
