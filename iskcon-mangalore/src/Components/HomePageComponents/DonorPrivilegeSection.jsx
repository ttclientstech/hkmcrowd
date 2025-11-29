import React, { useRef, useEffect } from "react";
import { Box, Text, Image, VStack } from "@chakra-ui/react";

// Import your privilege images
import giftImg from "../../assets/images/gift.jpg";
import taxImg from "../../assets/images/puja.jpg";
import pujaImg from "../../assets/images/tax.jpg";

const privileges = [
    {
        title: "Gift & Mahaprasadam",
        description:
            "Donate and receive blessed mahaprasadam and a special gift as a token of divine blessings.",
        image: giftImg,
        bg: "#E8F3FF",
    },
    {
        title: "80G Tax Exemption",
        description:
            "Donors will receive an 80G certificate for tax exemption benefits.",
        image: taxImg,
        bg: "#FFF4E5",
    },
    {
        title: "Special Puja",
        description:
            "A special puja will be offered in your name at the sacred altar of the temple during inauguration.",
        image: pujaImg,
        bg: "#F3E8FF",
    },
];

// STACKING SCROLL ANIMATION
const DonorPrivilegeSection = () => {
    const sectionRef = useRef([]);

    useEffect(() => {
        const options = {
            threshold: 0.3,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const target = entry.target;

                if (entry.isIntersecting) {
                    target.style.transform = "translateY(0px)";
                    target.style.opacity = 1;
                } else {
                    target.style.transform = "translateY(60px)";
                    target.style.opacity = 0;
                }
            });
        }, options);

        sectionRef.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <Box
            w="100%"
            maxW="1200px"
            mx="auto"
            mt={20}
            px={[4, 6]}
            fontFamily="'Poppins', sans-serif"
        >
            {/* Top Heading */}
            <Text
                fontSize={["2xl", "3xl"]}
                fontWeight="800"
                color="#5eb0ff"
                textAlign="center"
                mb={10}
            >
                Donor Privileges
            </Text>

            <VStack spacing={10} position="relative">
                {privileges.map((item, index) => (
                    <Box
                        key={index}
                        ref={(el) => (sectionRef.current[index] = el)}
                        w="100%"
                        bg={item.bg}
                        borderRadius="20px"
                        p={[5, 8]}
                        boxShadow="0 6px 20px rgba(0,0,0,0.15)"
                        transition="all 0.6s ease-out"
                        opacity={0}
                        transform="translateY(60px)"
                        zIndex={20 - index} // causes stacking effect
                        position="relative"
                    >
                        <Text
                            fontSize="xl"
                            fontWeight="700"
                            mb={2}
                            color="#1A1A1A"
                        >
                            {item.title}
                        </Text>

                        <Text
                            fontSize="md"
                            color="#333"
                            mb={4}
                            lineHeight="1.6"
                        >
                            {item.description}
                        </Text>

                        <Image
                            src={item.image}
                            alt={item.title}
                            w="100%"
                            maxH="240px"
                            objectFit="cover"
                            borderRadius="12px"
                        />
                    </Box>
                ))}
            </VStack>
        </Box>
    );
};

export default DonorPrivilegeSection;
