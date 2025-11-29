import React from "react";
import { Box, Text, Image, Flex } from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// IMPORT YOUR QUOTE IMAGES
import img1 from "../../assets/images/q1.jpg";
import img2 from "../../assets/images/q2.jpg";
import img3 from "../../assets/images/q5.jpg";

// QUOTES DATA
const quoteData = [
    {
        title: "Mahabharata,Anushasana Parva (13.40)",
        english:
            "He who donates for the construction of a temple attains great merit and reaches the abode of Lord Vishnu.",
        img: img1,
    },
    {
        title: "Garuda Purana",
        english:
            "One who contributes to building a temple attains heaven and is honored by all.",
        img: img2,
    },
    {
        title: "Vamana Purana",
        english:
            "One can attain the spiritual world (Vaikuntha) by helping construct or renovate a temple.",
        img: img3,
    },
];

// CAROUSEL SETTINGS
const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 3500,
    slidesToShow: 3,   // desktop
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 768, // mobile
            settings: {
                slidesToShow: 1,
            },
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
            },
        },
    ],
};

const WhyDonateQuotes = () => {
    return (
        <Box w="100%" py={12} px={[4, 6]}>

            {/* ====== TITLE ====== */}
            <Text
                textAlign="center"
                fontFamily="'Poppins', sans-serif"
                fontSize={["2xl", "3xl"]}
                fontWeight="800"
                mb={10}
                color="#5EB0FF"
            >
                Why should one donate for a spiritual cause?
            </Text>

            {/* ====== CAROUSEL ====== */}
            <Slider {...settings}>
                {quoteData.map((item, index) => (
                    <Box key={index} px={3}>
                        <Box
                            borderRadius="20px"
                            overflow="hidden"
                            position="relative"
                            height="420px"
                            boxShadow="0 6px 20px rgba(0,0,0,0.2)"
                        >
                            {/* BACKGROUND IMAGE */}
                            <Image
                                src={item.img}
                                alt={item.title}
                                w="100%"
                                h="100%"
                                objectFit="cover"
                            />

                            {/* DARK GRADIENT OVERLAY */}
                            <Box
                                position="absolute"
                                top="0"
                                left="0"
                                w="100%"
                                h="100%"
                                bg="linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.75))"
                                display="flex"
                                flexDirection="column"
                                justifyContent="flex-end"
                                p={6}
                            >
                                {/* QUOTE TITLE */}
                                <Text
                                    fontFamily="'Poppins', sans-serif"
                                    fontWeight="700"
                                    fontSize="lg"
                                    color="white"
                                    mb={2}
                                >
                                    {item.title}
                                </Text>

                                {/* QUOTE DESCRIPTION */}
                                <Text
                                    fontFamily="'Poppins', sans-serif"
                                    color="white"
                                    opacity={0.9}
                                    fontSize="sm"
                                    lineHeight="1.5"
                                >
                                    {item.english}
                                </Text>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Slider>
        </Box>
    );
};

export default WhyDonateQuotes;