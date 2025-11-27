import { Box, Flex, Image, Text, VStack, Link as ChakraLink } from '@chakra-ui/react';
import React from "react";
import transparentLogo from "../../assets/images/transparent_logo.png";
import avatar from "../../assets/images/Avatar-PNG-Image.webp"; // Using avatar from HomeSinglePage context

const DetailPageHeaderNew = ({ getSingleUser }) => {
    // We use the existing logic to get the name, but adapt the text to the VCM style.
    const campaignerName = getSingleUser?.campaignDetails?.campaignName || "A Devotee";
    const targetGoalSqFt = 1000; // Mocked goal based on original HomeSinglePage text
    const templeName = "Dakshina Dwaraka Dham Culteral Complex";

    return (
        <Box w="100%" bg="white" pt={[4, 8]} pb={[4, 8]} px={[4, 6, 8]} borderBottom="1px solid #E2E8F0">
            <VStack maxW="1200px" mx="auto" align="flex-start" spacing={6}>

                {/* Logo and Nav (Simple top bar) */}
                <Flex w="100%" justify="space-between" align="center" pb={4}>
                    <Image
                        src={transparentLogo}
                        alt="hkm_logo"
                        w={["80px", "120px"]}
                        objectFit="contain"
                    />
                    <ChakraLink href="/" fontWeight="bold" color="#2C0A0A" fontSize={["sm", "md"]}>
                        Back to All Campaigns
                    </ChakraLink>
                </Flex>

                {/* Main Headline Block (VCM Style) */}
                <VStack align="flex-start" spacing={1}>
                    <Text
                        fontSize={["2xl", "3xl", "4xl"]}
                        fontWeight="extrabold"
                        color="#2C0A0A" // Deep Mahogany/Dark Red
                        lineHeight="1.1"
                        fontFamily="'Cinzel', serif" // Keep the classic font for impact
                    >
                        <Text as="span" color="#C59D18">{campaignerName}</Text> needs your support<br/>
                        to raise <Text as="span" color="#C59D18">{targetGoalSqFt}</Text> Square Feet for <br/>
                        {templeName}
                    </Text>

                    {/* Subtext/Slogan */}
                    <Text
                        fontSize={["md", "xl"]}
                        color="#B22222" // Firebrick/Maroon for emphasis
                        fontWeight="semibold"
                        pt={2}
                    >
                        Be a Part of This Legacy
                    </Text>
                </VStack>

                {/* Campaigner Profile Row (Moved from PhotoWithDescription/HomeSinglePage) */}
                <Flex align="center" gap={4} pt={4}>
                    <Image
                        src={avatar}
                        alt="Campaigner Avatar"
                        borderRadius="full"
                        boxSize={["50px", "70px"]}
                        objectFit="cover"
                        border="3px solid #C59D18"
                    />
                    <VStack align="flex-start" spacing={0}>
                        <Text fontSize={["lg", "xl"]} fontWeight="bold" color="#2C0A0A">
                            {campaignerName}
                        </Text>
                        <Text fontSize={["sm", "md"]} color="gray.600">
                            Fundraising Campaign for ISKCON Chennai
                        </Text>
                    </VStack>
                </Flex>

            </VStack>
        </Box>
    );
};

export default DetailPageHeaderNew;