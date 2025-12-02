import React from "react";
import { Box, Text, Button, Flex, Icon } from "@chakra-ui/react";
import { FaHandHoldingHeart } from "react-icons/fa";

const DonateNowButton = () => {
    return (
            <Box maxW="1200px" mx="auto" px={[4,6]} mt={8} mb={6}>
                <Flex justify="center">
                    <Button
                        h={"55px"}
                        bg="#F97316" /* THEME CHANGE: solid urgent red */
                        color="#ffffff"
                        fontWeight="500"
                        fontSize="lg"
                        fontFamily="'Poppins', sans-serif"
                        letterSpacing="0.6px"
                        _hover={{ transform: "translateY(-2px)", boxShadow: `0px 8px 30px rgba(230,57,70,0.22)` }}
                        rightIcon={<Icon as={FaHandHoldingHeart} />}
                        px={8}
                        borderRadius="12px"
                    >
                        CONTRIBUTE NOW
                    </Button>
                </Flex>
            {/* SOFT, ITALIC MESSAGE BELOW BUTTON */}
            <Text
                fontSize="0.75em"
                fontStyle="italic"
                color="#082032"           // deep navy blue
                opacity={0.85}
                mt={1}
            >
                Every Square Feet You Donate Lives Forever
            </Text>
        </Box>
    );
};

export default DonateNowButton;
