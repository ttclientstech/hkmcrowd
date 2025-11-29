import React, { useState, useEffect } from "react";
import { Box, Text, Flex, Image, useBreakpointValue } from "@chakra-ui/react";

// IMPORT YOUR QUOTE IMAGES
import img1 from "../../assets/images/q1.jpg";
import img2 from "../../assets/images/q2.jpg";
import img3 from "../../assets/images/q5.jpg";

// QUOTES DATA
const quotes = [
    {
        reference: "Mahabharata,Anushasana Parva (13.40)",
        text:
            "He who donates for the construction of a temple attains great merit and reaches the abode of Lord Vishnu.",
        image: img1,
    },
    {
        reference: "Garuda Purana",
        text:
            "One who contributes to building a temple attains heaven and is honored by all.",
        image: img2,
    },
    {
        reference: "Vamana Purana",
        text:
            "One can attain the spiritual world (Vaikuntha) by helping construct or renovate a temple.",
        image: img3,
    },
];

const WhyDonateQuotes = () => {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const itemsToShow = isMobile ? 1 : 3;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(false);

    // Auto-slide
    useEffect(() => {
        const interval = setInterval(() => nextSlide(), 4000);
        return () => clearInterval(interval);
    }, [itemsToShow]);

    const nextSlide = () => {
        setFade(true);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + itemsToShow) % quotes.length);
            setFade(false);
        }, 400);
    };

    const prevSlide = () => {
        setFade(true);
        setTimeout(() => {
            setCurrentIndex((prev) =>
                prev === 0
                    ? quotes.length - itemsToShow
                    : (prev - itemsToShow + quotes.length) % quotes.length
            );
            setFade(false);
        }, 400);
    };

    // Decide visible quotes
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
            position="relative"
        >
            {/* Heading */}
            <Text
                textAlign="center"
                fontSize={["2xl", "3xl"]}
                fontWeight="800"
                color="#5eb0ff"
                mb={2}
            >
                Why donate for a spiritual cause?
            </Text>

            <Text
                textAlign="center"
                fontSize={["md", "lg"]}
                color="#444"
                mb={8}
            >
                Sacred scriptures glorify supporting the Lord’s temple
            </Text>

            {/* LEFT ARROW */}
            <Box
                position="absolute"
                left="0"
                top="50%"
                transform="translateY(-50%)"
                zIndex={10}
                cursor="pointer"
                fontSize="40px"
                color="#5eb0ff"
                _hover={{ color: "#2c82e0" }}
                onClick={prevSlide}
            >
                ❮
            </Box>

            {/* RIGHT ARROW */}
            <Box
                position="absolute"
                right="0"
                top="50%"
                transform="translateY(-50%)"
                zIndex={10}
                cursor="pointer"
                fontSize="40px"
                color="#5eb0ff"
                _hover={{ color: "#2c82e0" }}
                onClick={nextSlide}
            >
                ❯
            </Box>

            {/* QUOTE CARDS */}
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
                        borderRadius="14px"
                        overflow="hidden"
                        boxShadow="0 8px 30px rgba(0,0,0,0.25)"
                    >
                        {/* ===== IMAGE SECTION ===== */}
                        <Box position="relative" h="230px" overflow="hidden">
                            <Image
                                src={q.image}
                                alt="Quote background"
                                w="100%"
                                h="100%"
                                objectFit="cover"
                            />

                            {/* Only TOP gradient – bottom stays visible */}
                            <Box
                                position="absolute"
                                top="0"
                                left="0"
                                w="100%"
                                h="40%"   // only top 40%
                                bg="linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0))"
                            />
                        </Box>

                        {/* ===== TEXT SECTION BELOW IMAGE ===== */}
                        <Box
                            bg="white"
                            p={5}
                            minH="150px"
                        >
                            <Text fontSize="sm" color="#777" mb={2}>
                                {q.reference}
                            </Text>

                            <Text
                                fontSize={["md", "lg"]}
                                color="#222"
                                fontWeight="600"
                                lineHeight="1.6"
                            >
                                {q.text}
                            </Text>
                        </Box>
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