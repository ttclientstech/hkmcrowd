import React, { useState, useEffect } from "react";
import { Box, Text, Flex, Image, useBreakpointValue } from "@chakra-ui/react";

// IMPORT YOUR QUOTE IMAGES
import vishnu_purana from "../../assets/videos/vishnu_purana.mp4";
import vamana_purana from "../../assets/videos/vamana_purana.mp4";
import garuda_purana from "../../assets/videos/garuda_purana.mp4";

// QUOTES DATA
const quotes = [
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
    const isMobile = useBreakpointValue({ base: true, md: false });

    const itemsToShow = isMobile ? 1 : 3;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(false);

    // Auto-slide every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setFade(true);

            setTimeout(() => {
                setCurrentIndex((prev) =>
                    (prev + itemsToShow) % quotes.length
                );
                setFade(false);
            }, 400);
        }, 4000);

        return () => clearInterval(interval);
    }, [itemsToShow]);

    // Get visible quotes
    const visibleQuotes = [];
    for (let i = 0; i < itemsToShow; i++) {
        visibleQuotes.push(quotes[(currentIndex + i) % quotes.length]);
    }

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
                mb={8}
            >
                Sacred scriptures glorify those who support spiritual cause
            </Text>

            {/* Carousel */}
            <Flex
                justify="center"
                gap={[4, 6]}
                transition="opacity 0.4s ease"
                opacity={fade ? 0 : 1}
            >
                {visibleQuotes.map((q, index) => (
                    <Box
                        key={index}
                        w={isMobile ? "100%" : "33%"}
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
                            bgGradient="linear(to-b, rgba(0,0,0,0.05), rgba(0,0,0,0.75))"
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
                            <Text fontSize="sm" opacity={0.9}>
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
            </Flex>

            {/* Dots */}
            <Flex justify="center" mt={5} gap={3}>
                {quotes.map((_, i) => (
                    <Box
                        key={i}
                        w="10px"
                        h="10px"
                        borderRadius="full"
                        bg={i === currentIndex ? "#5eb0ff" : "#ccc"}
                    />
                ))}
            </Flex>
        </Box>
    );
};

export default WhyDonateQuotes;