import { Box, Image, Text, Flex, Icon } from '@chakra-ui/react';
import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const PhotoWithDescription = ({ imageError, avatar, getSingleUser, handleImageError }) => {
    return (
        <Box w="100%" mx="auto">
            {/* 1. Image Section - Full Width inside the card */}
            <Box
                w="100%"
                h={["300px", "400px", "450px"]} // Adjusted height for better aspect ratio
                overflow="hidden"
                position="relative"
            >
                <Image
                    w="100%"
                    h="100%"
                    objectFit="cover"
                    src={imageError ? avatar : getSingleUser?.campaignDetails?.imgurl}
                    onError={handleImageError}
                    transition="transform 0.5s ease"
                    _hover={{ transform: "scale(1.02)" }}
                />

                {/* Overlay Gradient for Text Contrast at bottom of image */}
                <Box
                    position="absolute" bottom="0" left="0" w="100%" h="40%"
                    bgGradient="linear(to-t, rgba(0,0,0,0.8), transparent)"
                />

                <Text
                    position="absolute"
                    bottom="1rem"
                    left="1.5rem"
                    color="white"
                    fontSize={["xl", "2xl"]}
                    fontWeight="bold"
                    fontFamily="'Cinzel', serif"
                    textShadow="0px 2px 4px rgba(0,0,0,0.8)"
                >
                    Sri {getSingleUser?.campaignDetails?.campaignName}
                </Text>
            </Box>

            {/* 2. Content Section - The "Letter" */}
            <Box
                bg="white"
                p={["1.5rem", "2rem"]}
                position="relative"
            >
                <Icon as={FaQuoteLeft} color="#D4AF37" w={8} h={8} opacity={0.2} position="absolute" top={4} left={4} />

                <Text
                    fontSize={["md", "lg"]}
                    fontFamily="'Merriweather', serif" // Readable serif font for storytelling
                    color="#4A5568"
                    lineHeight="1.8"
                    textAlign="justify"
                    pt={2}
                >
                    <Text as="span" fontWeight="bold" color="#2C0A0A" fontSize="xl">Namaste,</Text>
                    <br /><br />
                    I have personally stepped forward to support the construction of the
                    <Text as="span" fontWeight="bold" color="#D4AF37"> Dakshina Dwaraka Cultural Complex </Text>
                    —a magnificent beacon of our timeless Indian heritage in Chennai.
                    <br /><br />
                    This isn't just a structure; it is a legacy we are building for our children—a spiritual oasis where our culture will thrive for generations to come.
                    I invite you to join me in this noble deed. Your contribution, no matter the size, helps place a brick in this monument of pride.
                    <br /><br />
                    <Text as="span" fontStyle="italic" fontWeight="bold" color="#2C0A0A">
                        Let's build this together!
                    </Text>
                </Text>
            </Box>
        </Box>
    );
};

export default PhotoWithDescription;