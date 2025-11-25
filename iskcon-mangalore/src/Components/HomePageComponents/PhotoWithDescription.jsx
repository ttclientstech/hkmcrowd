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

                {/* Refined Gradient Overlay - Smoother transition */}
                <Box
                    position="absolute" bottom="0" left="0" w="100%" h="50%"
                    bgGradient="linear(to-t, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)"
                />

                <Flex
                    direction="column"
                    position="absolute"
                    bottom="1.5rem"
                    left="1.5rem"
                    right="1.5rem"
                >
                    <Text
                        color="#D4AF37" // Gold color for 'Sri'
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

            {/* 2. Content Section - Psychological Copy */}
            <Box
                bg="white"
                p={["1.5rem", "2rem", "2.5rem"]}
                position="relative"
                borderTop="4px solid #D4AF37" // Premium Gold Strip connector
            >
                {/* Watermark Quote Icon */}
                <Icon
                    as={FaQuoteLeft}
                    color="#D4AF37"
                    w={12} h={12}
                    opacity={0.15}
                    position="absolute"
                    top={6}
                    left={6}
                />

                <Text
                    fontSize={["md", "lg"]}
                    fontFamily="'Merriweather', serif"
                    color="#4A5568"
                    lineHeight="1.85"
                    textAlign="justify"
                    position="relative"
                    zIndex={1}
                >
                    <Text
                        as="span"
                        fontWeight="bold"
                        color="#2C0A0A"
                        fontSize="2xl"
                        fontFamily="'Cinzel', serif"
                        display="block"
                        mb={4}
                    >
                        Vanakkam,
                    </Text>

                    We are not just constructing a building; we are securing a <Text as="span" fontWeight="bold" color="#D4AF37">spiritual sanctuary</Text> for the generations to come.
                    <br /><br />
                    The <strong>Dakshina Dwaraka Cultural Complex</strong> will be a magnificent beacon of our timeless heritage in Chennai—a place where our culture thrives and our children find their roots.
                    <br /><br />
                    But a legacy cannot be built by one person; it takes a community. Your contribution today is not just a donation, but a brick in this monument of pride.
                    <br /><br />
                    <Text as="span" fontWeight="bold" color="#2C0A0A">
                        Be the one who helped build it.
                    </Text>
                    <br />
                    <Text as="span" fontStyle="italic" fontSize="md" color="#718096" mt={2} display="block">
                        — Let's create history together.
                    </Text>
                </Text>
            </Box>
        </Box>
    );
};

export default PhotoWithDescription;