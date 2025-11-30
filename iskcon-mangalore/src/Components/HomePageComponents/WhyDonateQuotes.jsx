import React from "react";
import { Box, Text, Flex, Grid, useBreakpointValue } from "@chakra-ui/react";

// IMPORT YOUR QUOTE VIDEOS
import vishnu_purana from "../../assets/videos/vishnu_purana.mp4";
import vamana_purana from "../../assets/videos/vamana_purana.mp4";
import garuda_purana from "../../assets/videos/garuda_purana.mp4";

// QUOTES DATA
const quotes = [
    {
        reference: "Garuda Purana",
        text:
            "One who contributes to building a temple attains heaven and is honored by all.",
        video: garuda_purana,
    },
    {
        reference: "Vishnu Purana (3.8.27)",
        text:
            "One who donates towards the construction of a temple is liberated from all sins and attains the heavenly realms.",
        video: vishnu_purana,
    },
    {
        reference: "Vamana Purana",
        text:
            "One can attain the spiritual world (Vaikuntha) by helping construct or renovate a temple.",
        video: vamana_purana,
    },
    {
        reference: "Garuda Purana",
        text:
            "One who contributes to building a temple attains heaven and is honored by all.",
        video: garuda_purana,
    },
];

const WhyDonateQuotes = () => {
    return (
        <Box
            w="100%"
            maxW="1200px"
            mx="auto"
            mt={16}
            px={[4, 6]}
            fontFamily="'Poppins', sans-serif"
        >
            {/* Title */}
            <Text
                textAlign="center"
                fontSize={["2xl", "3xl"]}
                fontWeight="700"
                color="#5eb0ff"
                mb={2}
            >
                The Power of Giving
            </Text>

            <Text
                textAlign="center"
                fontSize={["md", "lg"]}
                color="#444"
                mb={10}
            >
                Sacred scriptures glorify those who support spiritual causes
            </Text>

            {/* GRID (No carousel) */}
            <Grid
                templateColumns={{
                    base: "1fr",
                    md: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)",
                }}
                gap={[6, 6, 8]}
            >
                {quotes.map((q, index) => (
                    <Box
                        key={index}
                        borderRadius="12px"
                        overflow="hidden"
                        position="relative"
                        boxShadow="0 6px 25px rgba(0,0,0,0.25)"
                        h="350px"
                    >
                        {/* Background Video */}
                        <video
                            src={q.video}
                            autoPlay
                            loop
                            muted
                            playsInline
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                position: "absolute",
                                top: 0,
                                left: 0,
                                zIndex: 1,
                            }}
                        />

                        {/* Black Gradient Overlay */}
                        <Box
                            position="absolute"
                            top="0"
                            left="0"
                            w="100%"
                            h="100%"
                            zIndex={2}
                            bgGradient="linear(to-b, rgba(0,0,0,0.25), rgba(0,0,0))"
                        />

                        {/* Text */}
                        <Flex
                            position="absolute"
                            bottom="0"
                            left="0"
                            w="100%"
                            direction="column"
                            p={5}
                            color="white"
                            zIndex={3}
                        >
                            <Text fontSize="sm" opacity={0.9} color="#ffc460">
                                {q.reference}
                            </Text>
                            <Text
                                fontSize={["md", "lg"]}
                                fontWeight="600"
                                mt={2}
                                lineHeight="1.6"
                            >
                                {q.text}
                            </Text>
                        </Flex>
                    </Box>
                ))}
            </Grid>
        </Box>
    );
};

export default WhyDonateQuotes;