import React from "react";
import { Box, Text, Button, Flex } from "@chakra-ui/react";

const DonateNowButton = () => {
    return (
        <Box
            w="100%"
            py={[6, 10]}
            px={[4, 6]}
            textAlign="center"
            fontFamily="'Poppins', sans-serif"
            mt={4}
        >
            {/* DONATE BUTTON */}
            <Flex justify="center" mb={4}>
                <Button
                    h={"50px"}
                    px={10}
                    bgColor="#ff3838"
                    color="#ffffff"
                    fontWeight="700"
                    fontSize="xl"
                    borderRadius="12px"
                    _hover={{
                        transform: "translateY(-3px)",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                    }}
                    transition="0.25s ease"
                    fontFamily="'Poppins', sans-serif"
                >
                    Donate Now
                </Button>
            </Flex>

            {/* SOFT, ITALIC MESSAGE BELOW BUTTON */}
            <Text
                fontSize="0.75em"
                fontStyle="italic"
                color="#021f40"           // deep navy blue
                opacity={0.85}
                mt={1}
            >
                Every Square Feet You Donate Lives Forever
            </Text>
        </Box>
    );
};

export default DonateNowButton;
