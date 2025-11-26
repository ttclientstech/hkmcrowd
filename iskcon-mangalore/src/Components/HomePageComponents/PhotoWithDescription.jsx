import { Box, Image, Text, Flex, Icon } from '@chakra-ui/react';
import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const PhotoWithDescription = ({ imageError, avatar, getSingleUser, handleImageError }) => {
    return (
        <Box w="100%" mx="auto" position="relative">
            {/* 1. Image Section - Full Width */}
            <Box
                w="100%"
                h={["300px", "400px", "450px"]}
                overflow="hidden"
                position="relative"
            >
                <Image
                    w="100%"
                    h="100%"
                    objectFit="cover"
                    src={imageError ? avatar : getSingleUser?.campaignDetails?.imgurl}
                    onError={handleImageError}
                    transition="transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                    _hover={{ transform: "scale(1.03)" }}
                    alt="Campaigner"
                />

                {/* Gradient Overlay */}
                <Box
                    position="absolute" bottom="0" left="0" w="100%" h="60%"
                    bgGradient="linear(to-t, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)"
                />

                <Flex
                    direction="column"
                    position="absolute"
                    bottom="3rem"
                    left="1.5rem"
                    right="1.5rem"
                >
                    <Text
                        color="#D4AF37"
                        fontSize="sm"
                        fontWeight="bold"
                        letterSpacing="widest"
                        textTransform="uppercase"
                        fontFamily="'Cinzel', serif"
                        mb={1}
                    >
                        Campaigner
                    </Text>
                    <Text
                        color="white"
                        fontSize={["xl", "2xl"]}
                        fontWeight="bold"
                        fontFamily="'Cinzel', serif"
                        textShadow="0px 2px 4px rgba(0,0,0,0.8)"
                        lineHeight="1.2"
                    >
                        Sri {getSingleUser?.campaignDetails?.campaignName}
                    </Text>
                </Flex>
            </Box>

            {/* 2. Content Section - Floating Card with New Content Structure */}
            <Box
                bg="white"
                p={["1.5rem", "2rem"]}
                position="relative"
                mx={[4, 6]}
                mt="-3rem"
                borderRadius="xl"
                boxShadow="0px 10px 30px rgba(0,0,0,0.15)"
                zIndex={2}
            >
                {/* Watermark Quote Icon */}
                <Icon
                    as={FaQuoteLeft}
                    color="#D4AF37"
                    w={10} h={10}
                    opacity={0.15}
                    position="absolute"
                    top={4}
                    left={4}
                />

                <Box
                    fontSize={["md", "lg"]}
                    fontFamily="'Merriweather', serif"
                    color="#4A5568"
                    lineHeight="1.8"
                    textAlign="left"
                    position="relative"
                    zIndex={1}
                >
                    {/* CHANGED: New Header "A Message from the Campaigner" */}
                    <Text
                        fontWeight="bold"
                        color="#D4AF37" // Gold
                        fontSize="sm"
                        textTransform="uppercase"
                        letterSpacing="wider"
                        fontFamily="'Cinzel', serif"
                        display="block"
                        mb={3}
                        borderBottom="1px solid #E2E8F0"
                        pb={2}
                        w="fit-content"
                    >
                        A Message from the Campaigner
                    </Text>

                    {/* ----------------------------------------------------------- */}
                    {/* CHANGED: HIGHLIGHTED BHAGAVAD GITA SLOKA BOX */}
                    {/* ----------------------------------------------------------- */}
                    <Box
                        my={6}
                        p={4}
                        bg="#FFFAF0" // Light Cream Background
                        borderLeft="4px solid #D4AF37" // Gold Border Left
                        borderRadius="md"
                        boxShadow="sm"
                    >
                        <Text
                            fontFamily="'Cinzel', serif"
                            fontWeight="bold"
                            color="#2C0A0A"
                            fontSize="lg"
                            fontStyle="italic"
                        >
                            {/* PASTE THE SLOKA TEXT HERE */}
                            Lord Krishna says in Bhagavad-Gita: "Whatever you give in charity - do that as an offering to Me."
                        </Text>
                        <Text fontSize="sm" color="#D4AF37" fontWeight="bold" mt={2} textAlign="right">
                            — Bhagavad Gita 9.27
                        </Text>
                    </Box>

                    {/* Closing Text */}
                    <Text>
                        I invite you to join me in this noble deed. Your contribution, no matter the size, helps place a brick in this monument of pride.
                        <br /><br />
                        <Text as="span" fontWeight="bold" color="#2C0A0A">
                            Let's build this together!
                        </Text>
                    </Text>
                </Box>
            </Box>
        </Box>
    );
};

export default PhotoWithDescription;