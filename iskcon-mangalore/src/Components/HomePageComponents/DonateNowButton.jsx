import React from "react";
import { Box, Text, Button, Flex, Icon } from "@chakra-ui/react";
import { FaHandHoldingHeart } from "react-icons/fa";

const DonateNowButton = () => {
    return (
            <Box maxW="1200px" mx="auto" px={[4,6]} mt={8} mb={6}>
                <Flex justify="center">
                    <Button
                        h={"55px"}
                        bgGradient="linear(to-r, #D4AF37, #FFD700)"
                        color="#082032"
                        fontWeight="500"
                        fontSize="lg"
                        fontFamily="'Poppins', sans-serif"
                        letterSpacing="1px"
                        _hover={{ transform: "translateY(-2px)", boxShadow: "0px 5px 15px rgba(212, 175, 55, 0.4)" }}
                        rightIcon={<Icon as={FaHandHoldingHeart} />}
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
                textAlign="center"
                mt={1}
            >
                Every Square Feet You Donate Lives Forever
            </Text>
        </Box>
    );
};

export default DonateNowButton;
