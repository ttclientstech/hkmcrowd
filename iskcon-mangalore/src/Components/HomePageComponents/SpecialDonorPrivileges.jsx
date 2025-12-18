import { Box, Text, Image } from "@chakra-ui/react";
import React from "react";

import booksImg from "../../assets/images/vedic_books.jpg";
import pujaImg from "../../assets/images/puja.jpg";

const privileges = [
    {
        title: "Special Puja",
        desc: "A special puja will be offered in your name at the temple altar on temple inauguration.",
        image: pujaImg,
        bg: "#E8F3FF",
    },
    {
        title: "Vedic Literatures",
        desc: "A special gift set of spiritual books delivered to your doorstep.",
        image: booksImg,
        bg: "#FFF4E5",
    },
];

const SpecialDonorPrivileges = () => {
    return (
        <Box
            w="100%"
            maxW="900px"
            mx="auto"
            mt={16}
            px={[4, 6]}
            fontFamily="'Poppins', sans-serif"
        >
            <Text
                textAlign="center"
                fontSize={["3xl", "3xl"]}
                fontWeight="800"
                color="#082032"
                mb={1}
            >
                Other Donor <Text as="span" color="#E63946">Privileges</Text>
            </Text>
            <Text
                textAlign="center"
                fontSize={["md", "md"]}
                color="black"
                opacity={0.8}
                maxW="700px"
                mx="auto"
                mb={10}
                fontFamily="'Poppins', sans-serif"
            >
                (Based on Donation Level)
            </Text>

            <Box position="relative">
                {privileges.map((p, i) => {
                    const topOffset = i * 90;

                    return (
                        <Box
                            key={i}
                            position="sticky"
                            top={`${topOffset}px`}
                            zIndex={i + 1}  // 👈 FIX: Last card gets highest z-index
                            bg={p.bg}
                            borderRadius="22px"
                            p={[5, 7]}
                            mb={6}
                            boxShadow="0 10px 30px rgba(0,0,0,0.12)"
                        >
                            <Text
                                fontSize="xl"
                                fontWeight="700"
                                mb={2}
                                color="#1A1A1A"
                            >
                                {p.title}
                            </Text>

                            <Text
                                fontSize="md"
                                color="#333"
                                mb={4}
                                lineHeight="1.6"
                                fontFamily="'Satoshi', sans-serif"
                            >
                                {p.desc}
                            </Text>

                            <Image
                                src={p.image}
                                alt={p.title}
                                w="100%"
                                borderRadius="16px"
                            />
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export default SpecialDonorPrivileges;