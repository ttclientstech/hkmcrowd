import React, { useEffect, useRef, useState } from "react";
import { Box, Text, VStack, Flex, Icon } from "@chakra-ui/react";
import { FaPray, FaChild, FaSeedling, FaHandsHelping, FaBookReader, FaHome } from "react-icons/fa";

const items = [
    {
        icon: FaPray,
        title: "Main Krishna Altar",
        desc: "The divine heart of Dakshina Dwaraka Dham—where thousands will receive darshan and blessings every day."
    },
    {
        icon: FaHome,
        title: "Temple & Festival Hall",
        desc: "A grand hall to host kirtans, spiritual festivals, discourses and cultural celebrations."
    },
    {
        icon: FaHandsHelping,
        title: "Annadānam Hall",
        desc: "A sacred space dedicated to feeding devotees, visitors, and the needy with fresh Krishna-prasadam."
    },
    {
        icon: FaSeedling,
        title: "Harinām Mandap",
        desc: "A serene mandap for chanting, meditation and spiritual gatherings."
    },
    {
        icon: FaChild,
        title: "ICVK Kids Program",
        desc: "A value-based educational space where children learn culture, character and devotion joyfully."
    },
    {
        icon: FaBookReader,
        title: "Gita Life Program",
        desc: "A transformative space uplifting youth, parents and working professionals through wisdom of Bhagavad Gita."
    }
];

const TempleBlueprintSection = () => {
    const [visibleIndex, setVisibleIndex] = useState(-1);
    const refs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.getAttribute("data-index"));
                        setVisibleIndex((prev) => (index > prev ? index : prev));
                    }
                });
            },
            { threshold: 0.2 }
        );

        refs.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <Box
            w="100%"
            maxW="900px"
            mx="auto"
            mt={16}
            px={[4, 6]}
            py={10}
            bg="white"
            borderRadius="16px"
        >
            {/* Title */}
            <Text
                textAlign="center"
                fontSize={["2xl", "3xl"]}
                fontWeight="700"
                color="#082032"
                mb={8}
            >
                Inside <span style={{ color: "#F28A7E" }}>Dakshina Dwaraka Dham</span>
            </Text>

            <VStack spacing={10}>
                {items.map((item, i) => (
                    <Box
                        key={i}
                        ref={(el) => (refs.current[i] = el)}
                        data-index={i}
                        opacity={visibleIndex >= i ? 1 : 0}
                        transform={visibleIndex >= i ? "translateY(0)" : "translateY(40px)"
                        }
                        transition="all 0.8s ease"
                        w="100%"
                    >
                        <VStack spacing={3}>
                            {/* ICON CIRCLE */}
                            <Flex
                                w="60px"
                                h="60px"
                                borderRadius="50%"
                                bg="rgba(255, 221, 140, 0.35)" // soft gold
                                align="center"
                                justify="center"
                                boxShadow="0 3px 10px rgba(0,0,0,0.1)"
                            >
                                <Icon as={item.icon} boxSize={6} color="#082032" />
                            </Flex>

                            {/* TITLE */}
                            <Text
                                fontSize="xl"
                                fontWeight="700"
                                color="#082032"
                                textAlign="center"
                            >
                                {item.title}
                            </Text>

                            {/* DESCRIPTION */}
                            <Text
                                fontSize="md"
                                color="#4A5568"
                                textAlign="center"
                                maxW="400px"
                            >
                                {item.desc}
                            </Text>

                            {/* DIVIDER */}
                            {i < items.length - 1 && (
                                <Box
                                    w="60%"
                                    h="2px"
                                    bg="rgba(255, 201, 71, 0.4)" // subtle gold
                                    mt={4}
                                />
                            )}
                        </VStack>
                    </Box>
                ))}
            </VStack>
        </Box>
    );
};

export default TempleBlueprintSection;
