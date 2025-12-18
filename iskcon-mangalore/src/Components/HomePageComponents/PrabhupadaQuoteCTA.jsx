import React from "react";
import { Box, Text, Button, Flex } from "@chakra-ui/react";
import DonateNowButton from "./DonateNowButton";

const PrabhupadaQuoteCTA = ({ getSingleUser }) => {
    return (
        <Box
            w="100%"
            bgColor="#000f1b"
            py={[12, 16]}
            px={[4, 6]}
            textAlign="center"
            fontFamily="'Poppins', sans-serif"
            color="white"
            mt={12}
        >
            {/* CUSTOM QUOTE ICON (same as reference) */}
            <Flex justify="center" mb={6}>
                <Box w="55px" h="55px">
                    <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 64 64"
                        fill="white"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ opacity: 0.9 }}
                    >
                        <path d="M20 24C14 24 10 19 10 14C10 8 14 4 20 4C26 4 30 8 30 14C30 20 27 28 20 36C18.5 37.5 16 36 16 34C16 31 20 28 20 24Z" />
                        <path d="M44 24C38 24 34 19 34 14C34 8 38 4 44 4C50 4 54 8 54 14C54 20 51 28 44 36C42.5 37.5 40 36 40 34C40 31 44 28 44 24Z" />
                    </svg>
                </Box>
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
                “We are trying to give human society an opportunity for a life of happiness, good health, peace of mind and all good qualities through God Consciousness.”
            </Text>

            {/* AUTHOR */}
            <Text fontSize={["md", "lg"]} opacity={0.8} mb={10} fontFamily="'Satoshi', sans-serif">
                — Srila Prabhupada
            </Text>

            {/* DONATE BUTTON */}
            <Flex justify="center">
                <DonateNowButton getSingleUser={getSingleUser} />
            </Flex>
        </Box>
    );
};

export default PrabhupadaQuoteCTA;