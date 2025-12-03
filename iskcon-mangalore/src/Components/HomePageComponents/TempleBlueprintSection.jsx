import React, { useEffect, useRef, useState } from "react";
import { Box, Text, Flex, Icon } from "@chakra-ui/react";
import {
    FaGopuram,
    FaChild,
    FaSeedling,
    FaHandsHelping,
    FaBookReader,
    FaLandmark
} from "react-icons/fa";

const items = [
    {
        icon: FaGopuram,
        title: "Divine Altar",
        desc: "Beautifully carved altar of Sri Sri Rukmini Dwarakadish."
    },
    {
        icon: FaLandmark,
        title: "Festival Hall",
        desc: "A grand space for kirtans & cultural celebrations."
    },
    {
        icon: FaHandsHelping,
        title: "Annadānam Hall",
        desc: "A sacred hall serving blessed Krishna-prasadam."
    },
    {
        icon: FaSeedling,
        title: "Harinām Mandap",
        desc: "A serene mandap for chanting & meditation."
    },
    {
        icon: FaChild,
        title: "ICVK Kids Program",
        desc: "Value-based cultural learning for children."
    },
    {
        icon: FaBookReader,
        title: "Gita Life Program",
        desc: "Transforming youth & families through Gita wisdom."
    }
];

const TempleBlueprintSection = () => {
    return (
        <Box
            w="100%"
            maxW="900px"
            mx="auto"
            mt={16}
            px={[4, 6]}
            fontFamily="'Poppins', sans-serif"
        >
            {/* TITLE */}
            <Text
                textAlign="center"
                fontSize={["2xl", "3xl"]}
                fontWeight="500"
                color="#082032"
                mb={4}
            >
                Inside <Text as="span" color="#F28A7E">Dakshina Dwaraka Dham</Text>
            </Text>

            {/* SUBTITLE */}
            <Text
                textAlign="center"
                fontSize={["md", "lg"]}
                color="#4A5568"
                maxW="600px"
                mx="auto"
                mb={10}
                lineHeight="1.6"
            >
                Each contribution helps build sacred spaces that uplift hearts,
                nurture values, and bring thousands closer to Lord Krishna.
            </Text>

            {/* STICKY STACK */}
            <Box position="relative">
                {items.map((item, i) => {
                    const topOffset = i * 85; // spacing for stack

                    return (
                        <Box
                            key={i}
                            position="sticky"
                            top={`${topOffset}px`}
                            zIndex={i + 1}
                            borderRadius="20px"
                            p={6}
                            mb={8}
                            bg="#0A192F"
                            border="1px solid rgba(255, 195, 97, 0.35)"
                            boxShadow="0px 15px 35px rgba(0,0,0,0.3)"
                            color="white"
                        >
                            {/* ICON */}
                            <Flex
                                w="60px"
                                h="60px"
                                borderRadius="50%"
                                bg="rgba(255, 195, 97, 0.15)"
                                align="center"
                                justify="center"
                                mb={4}
                            >
                                <Icon as={item.icon} boxSize={7} color="#F7C873" />
                            </Flex>

                            {/* TITLE */}
                            <Text fontSize="xl" fontWeight="700" mb={1} color="#F7C873">
                                {item.title}
                            </Text>

                            {/* DESCRIPTION */}
                            <Text fontSize="md" opacity={0.9} lineHeight="1.5">
                                {item.desc}
                            </Text>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export default TempleBlueprintSection;
