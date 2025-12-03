import React, { useEffect, useRef } from "react";
import { Box, Text, Flex, Image } from "@chakra-ui/react";

const features = [
    {
        title: "Main Krishna Altar",
        desc: "The divine heart of the temple, where thousands will receive darshan daily in a serene, spiritually uplifting atmosphere.",
        img: "/images/altar.jpg"
    },
    {
        title: "Temple & Festival Hall",
        desc: "A majestic hall for kirtans, spiritual festivals, cultural celebrations and discourses for all age groups.",
        img: "/images/festivalhall.jpg"
    },
    {
        title: "Annadānam Hall",
        desc: "A sacred space where fresh Krishna-prasadam will be served daily to visitors, devotees and the needy.",
        img: "/images/annadanam.jpg"
    },
    {
        title: "Harinām Mandap",
        desc: "A peaceful mandap designed for chanting, meditation and soulful spiritual gatherings.",
        img: "/images/mandap.jpg"
    },
    {
        title: "ICVK – Indian Culture & Values for Kids",
        desc: "A joyful learning environment where children grow in culture, character and devotion.",
        img: "/images/icvk.jpg"
    },
    {
        title: "Gita Life – Youth & Family Programs",
        desc: "Transformational value-based programs to uplift families, professionals and youth.",
        img: "/images/gitalife.jpg"
    }
];

const TemplePurposeSection = () => {
    return (
        <Box w="100%" maxW="1200px" mx="auto" px={[4, 6]} mt={20}>

            <Text
                textAlign="center"
                fontSize={["2xl", "3xl"]}
                fontWeight="700"
                color="#082032"
                mb={12}
                fontFamily="'Poppins', sans-serif"
            >
                Inside <span style={{ color: "#F28A7E" }}>Dakshina Dwaraka Dham</span>
            </Text>

            {features.map((item, i) => (
                <Flex
                    key={i}
                    direction={i % 2 === 0 ? "column" : ["column", "column", "row-reverse"]}
                    align="center"
                    gap={8}
                    mb={16}
                    bg="white"
                    borderRadius="16px"
                    p={[4, 6]}
                    boxShadow="0 6px 25px rgba(0,0,0,0.1)"
                    overflow="hidden"
                >
                    {/* IMAGE */}
                    <Box flex="1" w="100%">
                        <Image
                            src={item.img}
                            borderRadius="12px"
                            boxShadow="0 8px 24px rgba(0,0,0,0.15)"
                            w="100%"
                            h="260px"
                            objectFit="cover"
                        />
                    </Box>

                    {/* TEXT */}
                    <Box flex="1">
                        <Text
                            fontSize="2xl"
                            fontWeight="700"
                            color="#082032"
                            mb={3}
                            fontFamily="'Poppins', sans-serif"
                        >
                            {item.title}
                        </Text>

                        <Text
                            fontSize="md"
                            color="#4A5568"
                            lineHeight="1.7"
                            fontFamily="'Poppins', sans-serif"
                        >
                            {item.desc}
                        </Text>
                    </Box>
                </Flex>
            ))}
        </Box>
    );
};

export default TemplePurposeSection;