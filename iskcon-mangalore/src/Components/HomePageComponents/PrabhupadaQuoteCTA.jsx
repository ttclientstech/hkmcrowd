import React from "react";
import { Box, Text, Button, Flex } from "@chakra-ui/react";
import { FaQuoteLeft } from "react-icons/fa";

const PrabhupadaQuoteCTA = () => {
    return (
        <Box
            w="100%"
            bgColor="#000f1b"
            py={[12, 16]}
            px={[4, 6]}
            textAlign="center"
            fontFamily="'Poppins', sans-serif"
            color="white"
            mt={20}
        >
            {/* QUOTE ICON */}
            <Flex justify="center" mb={6}>
                <FaQuoteLeft size={40} color="#ffffffcc" />
            </Flex>

            {/* QUOTE TEXT */}
            <Text
                fontSize={["lg", "xl", "2xl"]}
                lineHeight="1.7"
                maxW="800px"
                mx="auto"
                fontWeight="500"
                mb={6}
            >
                “Whatever you do, whatever you give in charity, whatever you offer—
                do it as an offering unto Me.
                When one donates for Krishna’s service, that act becomes eternal.”
            </Text>

            {/* AUTHOR */}
            <Text fontSize={["md", "lg"]} opacity={0.8} mb={10}>
                — Srila Prabhupada
            </Text>

            {/* DONATE BUTTON */}
            <Flex justify="center">
                <Button
                    h={"50px"}
                    px={10}
                    bgColor="#ff3838"
                    color="#ffffff"
                    fontWeight="800"
                    fontSize="xl"
                    borderRadius="12px"
                    boxShadow="0 6px 20px rgba(212, 175, 55, 0.4)"
                    _hover={{
                        transform: "translateY(-3px)",
                        boxShadow: "0 10px 28px rgba(212, 175, 55, 0.6)",
                    }}
                    transition="0.2s ease"
                    fontFamily="'Poppins', sans-serif"
                >
                    Donate Now
                </Button>
            </Flex>
        </Box>
    );
};

export default PrabhupadaQuoteCTA;