import { Box, Text, Image } from "@chakra-ui/react";
import React from "react";

import giftImg from "../../assets/images/gift.jpg";
import taxImg from "../../assets/images/tax.jpg";
import pujaImg from "../../assets/images/puja.jpg";

const privileges = [
    {
        title: "Gift & Mahaprasadam",
        desc: "Receive blessed Mahaprasadam and a spiritual gift as divine blessings.",
        image: giftImg,
        bg: "#E8F3FF",
    },
    {
        title: "80G Tax Exemption",
        desc: "Eligible donors will receive an 80G certificate for tax exemption.",
        image: taxImg,
        bg: "#FFF4E5",
    },
    {
        title: "Special Puja",
        desc: "A special puja will be offered in your name at the temple altar.",
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
            mt={20}
            px={[4, 6]}
            fontFamily="'Poppins', sans-serif"
        >
            <Text
                textAlign="center"
                fontSize={["2xl", "3xl"]}
                fontWeight="800"
                color="#5eb0ff"
                mb={10}
            >
                Donor Privileges
            </Text>

            <Box position="relative">
                {privileges.map((p, i) => {
                    const topOffset = i * 90; // Controls stacking spacing

                    return (
                        <Box
                            key={i}
                            position="sticky"
                            top={`${topOffset}px`}
                            zIndex={100 - i}
                            bg={p.bg}
                            borderRadius="22px"
                            p={[5, 7]}
                            mb={6}
                            boxShadow="0 10px 30px rgba(0,0,0,0.12)"
                        >
                            {/* Title */}
                            <Text fontSize="xl" fontWeight="700" mb={2} color="#1A1A1A">
                                {p.title}
                            </Text>

                            {/* Description */}
                            <Text
                                fontSize="md"
                                color="#333"
                                mb={4}
                                lineHeight="1.6"
                            >
                                {p.desc}
                            </Text>

                            {/* Image */}
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
