import React from "react";
import { HStack, Image, Text, VStack, Box } from "@chakra-ui/react";
import lotusBud from "../../assets/images/lotus_bud_small.png";
import lotusBloom from "../../assets/images/lotus_bloom_small.png";

const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const WeeklyLotusRow = ({ days: blossomed }) => {
    const todayIndex = new Date().getDay();

    return (
        <VStack spacing={4} align="center" w="full">
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
                spacing={[2, 3]}
                justify="center"
                overflowX="auto"
                px={2}
                py={2}
                w="100%"
                maxW="900px"
                css={{
                    "&::-webkit-scrollbar": { display: "none" },
                    scrollbarWidth: "none",
                }}
            >
                {blossomed.map((hasBlossomed, i) => {
                    if (i > todayIndex) return null;
                    const isToday = i === todayIndex;

                    return (
                        <VStack
                            key={i}
                            spacing={1}
                            align="center"
                            position="relative"
                            flex="0 0 auto"
                            minW="70px"
                        >
                            <Box
                                position="relative"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                boxSize="70px"
                                animation={
                                    isToday && !hasBlossomed
                                        ? "pulse 2.5s infinite ease-in-out"
                                        : "none"
                                }
                            >
                                {/* Lotus logic */}
                                {isToday && !hasBlossomed ? (
                                    <>
                                        <Image
                                            src={lotusBloom}
                                            boxSize="70px"
                                            opacity="0.25"
                                            transition="all 0.3s ease"
                                            filter="drop-shadow(0 0 6px rgba(230,144,46,0.6))"
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
                                                textShadow="0 0 8px rgba(230,144,46,0.8)"
                                                lineHeight="1.1"
                                            >
                                                Awaits
                                            </Text>
                                            <Text
                                                fontSize="xs"
                                                fontWeight="700"
                                                color="rgb(230 144 46)"
                                                textShadow="0 0 8px rgba(230,144,46,0.8)"
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

                            <Text fontSize="xs" color="#444" textAlign="center">
                                {dayLabels[i]}
                            </Text>
                        </VStack>
                    );
                })}
            </HStack>

            {/* Keyframes */}
            <style>
                {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.06); }
            100% { transform: scale(1); }
          }
        `}
            </style>
        </VStack>
    );
};

export default WeeklyLotusRow;
