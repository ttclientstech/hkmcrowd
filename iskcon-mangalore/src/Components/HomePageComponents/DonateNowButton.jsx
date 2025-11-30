import React from "react";
import { Box, Text, Button, Flex } from "@chakra-ui/react";

const DonateNowButton = () => {
    return (
            <Flex justify="center">
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
                        boxShadow: "0 10px 28px rgba(0,0,0,0.4)",
                    }}
                    transition="0.25s ease"
                    fontFamily="'Poppins', sans-serif"
                >
                    Donate Now
                </Button>
                <Text
                    fontSize={["lg", "xl"]}
                    mb={6}
                    color="#000f1b"         // light blue tone
                    fontWeight="300"        // very soft
                    opacity={0.9}
                    maxW="600px"
                    mx="auto"
                    lineHeight="1.6"
                >
                    Every Square Feet You Donate Lives Forever
                </Text>
            </Flex>
    );
};

export default DonateNowButton;
