import React from "react";
import { Box, Text, Button, Flex } from "@chakra-ui/react";

const DonateNowButton = () => {
    return (
        <Box
            w="100%"
            py={[12, 16]}
            px={[4, 6]}
            textAlign="center"
            fontFamily="'Poppins', sans-serif"
            color="white"
            mt={20}
            bgGradient="linear(to-b, rgba(255,255,255,0) 0%, #000f1b 40%, #000f1b 60%, rgba(255,255,255,0) 100%)"
        >
            {/* DONATE BUTTON */}
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
            </Flex>
        </Box>
    );
};

export default DonateNowButton;