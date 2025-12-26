import React from "react";
import { Box, Text } from "@chakra-ui/react";

import { altarImg, img_festival, img_annadanam, img_harinam, img_icvk, img_gitalife, img_kalamadhuryam  } from "../../constants/cdnImages";

const items = [
    {
        img: altarImg,
        title: "Divine Altar",
        desc: "The beautifully carved altar of Sri Sri Rukmini Dwarakadish."
    },
    {
        img: img_kalamadhuryam,
        title: "Cultural Hall",
        desc: "A 300 seater hall for artists to perform, inspire, and share devotional art."
    },
    {
        img: img_annadanam,
        title: "Prasadam Hall",
        desc: "A sacred hall serving sanctified Krishna-prasadam."
    },
    {
        img: img_festival,
        title: "Festival Hall",
        desc: "A grand space for kirtans, festivals & cultural celebrations."
    },
    {
        img: img_harinam,
        title: "Harinam Mandap",
        desc: "A serene space for chanting & meditation."
    },
    {
        img: img_icvk,
        title: "ICVK Kids Program",
        desc: "Value-based cultural learning for children."
    },
    {
        img: img_gitalife,
        title: "Gita Life Program",
        desc: "Transforming youth & families with Gita wisdom."
    }
];

const TempleBlueprintSection = () => {
    return (
        <Box
            w="100%"
            maxW="900px"
            mx="auto"
            mt={12}
            px={[4, 6]}
            fontFamily="'Poppins', sans-serif"
        >
            {/* TITLE */}
            <Text
                textAlign="center"
                fontSize={["3xl", "3xl"]}
                fontWeight="500"
                color="#082032"
                mb={4}
            >
                Inside Dakshina <Text as="span" color="#E63946">Dwaraka Dham</Text>
            </Text>

            {/* SUBTITLE */}
            <Text
                textAlign="center"
                fontSize={["md", "lg"]}
                color="#1A1A1A"
                maxW="600px"
                mx="auto"
                mb={10}
                lineHeight="1.6"
                fontFamily="'Poppins', sans-serif"
            >
                Each contribution helps build the spaces that uplift hearts,
                nurture values, and bring thousands closer to Lord Krishna.
            </Text>

            {/* STICKY STACK */}
            <Box position="relative">
                {items.map((item, i) => {
                    const topOffset = i * 90;

                    return (
                        <Box
                            key={i}
                            position="sticky"
                            top="80px"
                            zIndex={i + 1}
                            height="260px"
                            borderRadius="22px"
                            overflow="hidden"
                            mb={8}
                            boxShadow="0 12px 35px rgba(0,0,0,0.25)"
                        >
                            {/* Background image */}
                            <Box
                                position="absolute"
                                top={0}
                                left={0}
                                w="100%"
                                h={i === 6 ? "500px" : "100%"}
                                bgImage={`url(${item.img})`}
                                bgSize="cover"
                                bgPos="center"
                                filter="brightness(0.85)"
                            />

                            {/* Gradient overlay */}
                            <Box
                                position="absolute"
                                top={0}
                                left={0}
                                w="100%"
                                h="100%"
                                bg="linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0))"
                            />

                            {/* TEXT */}
                            <Box
                                position="absolute"
                                bottom={6}
                                left={6}
                                right={6}
                            >
                                <Text
                                    fontSize="xl"
                                    fontWeight="700"
                                    color="#F7C873"   // gold
                                    mb={2}
                                >
                                    {item.title}
                                </Text>

                                <Text
                                    fontSize="md"
                                    color="white"
                                    opacity={0.95}
                                    lineHeight="1.5"
                                    fontFamily="'Satoshi', sans-serif"
                                >
                                    {item.desc}
                                </Text>
                            </Box>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export default TempleBlueprintSection;