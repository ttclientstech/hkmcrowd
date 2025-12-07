import { Box, Text, Image } from "@chakra-ui/react";
import React from "react";

import giftImg from "../../assets/images/gift.jpg";
import taxImg from "../../assets/images/tax.jpg";
import pujaImg from "../../assets/images/puja.jpg";

const privileges = [
    {
        title: "Gift & Mahaprasadam",
        desc: "Donate and receive blessed Mahaprasadam and a spiritual gift as divine blessings.",
        image: giftImg,
        bg: "#E8F3FF",
    },
    {
        title: "80G Tax Exemption",
        desc: "Donors will receive an 80G certificate for tax exemption.",
        image: taxImg,
        bg: "#FFF4E5",
    },
    {
        title: "Special Puja",
        desc: "A special puja will be offered in your name at the temple altar on temple inauguration.",
        image: pujaImg,
        bg: "#F3E8FF",
    },
];

const DonorPrivilegeSection = () => {
    return (
        <Box
            w="100%"
            maxW="900px"
            mx="auto"
            mt={12}
            px={[4, 6]}
            fontFamily="'Poppins', sans-serif"
        >
            <Text
                textAlign="center"
                fontSize={["2xl", "3xl"]}
                fontWeight="500"
                color="#082032"
                mb={10}
            >
                Donor <Text as="span" color="#E63946">Privileges</Text>
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

export default DonorPrivilegeSection;