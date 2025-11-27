import { Box, Image, Text, VStack, Heading, Icon, Flex, Badge } from '@chakra-ui/react';
import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const PhotoWithDescription = ({ imageError, avatar, getSingleUser, handleImageError }) => {
    // 1. DYNAMIC HEADLINE (VCM STYLE)
    const campaignerName = getSingleUser?.campaignDetails?.campaignName || "The Campaigner";
    const targetSqFt = "1,000"; // Or dynamic calculation

    return (
        <Box
            w="100%"
            mx="auto"
            position="relative"
            // VCM GLASS CARD STYLE
            bg="rgba(20, 20, 20, 0.75)"
            backdropFilter="blur(15px)"
            borderRadius="xl"
            border="1px solid rgba(255, 255, 255, 0.1)"
            boxShadow="0 8px 32px 0 rgba(0, 0, 0, 0.5)"
            p={[6, 8]}
            color="white"
            textAlign="center"
        >
            <VStack spacing={6}>

                {/* 2. VCM HEADLINE - "Needs your support" */}
                <Box borderBottom="1px solid rgba(255,255,255,0.1)" pb={4} w="100%">
                    <Heading
                        fontFamily="'Cinzel', serif"
                        fontSize={["xl", "2xl", "3xl"]}
                        fontWeight="700"
                        color="white"
                        lineHeight="1.3"
                    >
                        <Text as="span" color="#D4AF37">{campaignerName}</Text> needs your support to raise <Text as="span" color="#D4AF37">{targetSqFt} Square Feet</Text> for <br />
                        <Text as="span" fontSize={["lg", "xl"]} fontWeight="400">Dakshina Dwaraka Dham</Text>
                    </Heading>

                    <Text fontSize="sm" color="gray.400" mt={2} letterSpacing="wide" textTransform="uppercase">
                        A fundraising initiative for the construction of Chennai's Tallest Cultural Complex
                    </Text>
                </Box>

                {/* 3. CAMPAIGNER IMAGE */}
                <Box position="relative" display="inline-block">
                    <Box
                        p={1}
                        borderRadius="full"
                        border="2px solid #D4AF37"
                        boxShadow="0 0 30px rgba(212, 175, 55, 0.3)"
                    >
                        <Image
                            w={["130px", "160px"]}
                            h={["130px", "160px"]}
                            borderRadius="full"
                            objectFit="cover"
                            src={imageError ? avatar : getSingleUser?.campaignDetails?.imgurl}
                            onError={handleImageError}
                            alt="Campaigner"
                        />
                    </Box>
                    <Badge
                        position="absolute" bottom="-10px" left="50%" transform="translateX(-50%)"
                        bg="#D4AF37" color="black" px={3} py={1} borderRadius="full"
                        fontSize="xs" fontWeight="800" textTransform="uppercase"
                    >
                        Campaigner
                    </Badge>
                </Box>

                {/* 4. CAMPAIGNER MESSAGE - "I have taken a pledge" */}
                <Box maxW="800px" textAlign="left">
                    <Flex align="flex-start" gap={2} mb={2}>
                        <Icon as={FaQuoteLeft} color="#D4AF37" w={6} h={6} opacity={0.8} mt={1} />
                        <Text
                            fontSize={["md", "lg"]}
                            color="white"
                            lineHeight="1.8"
                            fontFamily="'Merriweather', serif"
                            fontWeight="300"
                        >
                            "I have taken a pledge to raise <Text as="span" color="#D4AF37" fontWeight="bold">Square Feet</Text> for Dakshina Dwaraka Dham.

                            <br/><br/>
                            Lord Krishna says in Bhagavad-Gita 9.27: <Text as="span" fontStyle="italic" color="#FBD38D">'Whatever you give in charity - do that as an offering to Me.'</Text>
                            <br/><br/>
                            This is not just a temple; it is a spiritual legacy. I cannot do this alone. I invite you to join me and place a brick in this monument of pride."
                        </Text>
                    </Flex>

                    <Text textAlign="right" fontFamily="'Cinzel', serif" color="#D4AF37" fontWeight="bold" mt={4}>
                        — {campaignerName}
                    </Text>
                </Box>

            </VStack>
        </Box>
    );
};

export default PhotoWithDescription;