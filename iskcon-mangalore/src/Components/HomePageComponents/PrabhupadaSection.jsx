import React from "react";
import { Box, Text, Flex, Image } from "@chakra-ui/react";

// IMPORT YOUR PRABHUPADA PHOTO
import prabhupadaImg from "../../assets/images/prabhupada.jpg";

const PrabhupadaSection = () => {
    return (
        <Box
            w="100%"
            maxW="1200px"
            mx="auto"
            mt={20}
            px={[4, 6]}
            textAlign="center"
            fontFamily="'Poppins', sans-serif"
        >
            {/* SECTION TITLE */}
            <Text
                fontSize={["2xl", "3xl", "4xl"]}
                fontWeight="800"
                color="#5eb0ff"
            >
                Our Founder & Acharya
            </Text>

            {/* GOLD LINE */}
            <Box
                w="120px"
                h="4px"
                bgGradient="linear(to-r, #D4AF37, #FFD700)"
                borderRadius="2px"
                mx="auto"
                mt={2}
                mb={8}
            />

            {/* PHOTO + GLOW */}
            <Flex justify="center" position="relative" mb={8}>
                {/* Soft Glow Behind Image */}
                <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    w={["220px", "260px", "300px"]}
                    h={["220px", "260px", "300px"]}
                    borderRadius="50%"
                    bg="radial-gradient(circle, rgba(255,215,0,0.35) 0%, rgba(255,215,0,0.05) 70%)"
                    filter="blur(20px)"
                    zIndex={0}
                />

                {/* Prabhupada Photo */}
                <Image
                    src={prabhupadaImg}
                    alt="Srila Prabhupada"
                    w={["220px", "260px", "300px"]}
                    h={["220px", "260px", "300px"]}
                    objectFit="cover"
                    borderRadius="50%"
                    zIndex={1}
                    boxShadow="0 10px 35px rgba(0,0,0,0.25)"
                />
            </Flex>

            {/* DESCRIPTION */}
            <Box
                maxW="800px"
                mx="auto"
                bg="white"
                p={[5, 8]}
                borderRadius="20px"
                boxShadow="0 8px 25px rgba(0,0,0,0.08)"
                border="1px solid #e5e5e5"
            >
                <Text
                    fontSize={["md", "lg"]}
                    color="#333"
                    lineHeight="1.9"
                    fontWeight="500"
                >
                    His Divine Grace A.C. Bhaktivedanta Swami Srila Prabhupada
                    brought the timeless teachings of Lord Krishna to the entire world.
                    Through unwavering devotion and compassion, he established ISKCON and
                    inspired millions to embrace a life of service, spirituality and love for God.
                </Text>
            </Box>
        </Box>
    );
};

export default PrabhupadaSection;