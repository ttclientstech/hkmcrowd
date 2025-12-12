import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import lotusBud from "../../assets/images/lotus_bud.png";
import lotusBloom from "../../assets/images/lotus_blossom.png";

const LotusBlock = ({ achieved }) => (
    <Box position="relative" textAlign="center" mt={10}>
        <Image
            src={achieved ? lotusBloom : lotusBud}
            alt="Lotus"
            boxSize="200px"
            mx="auto"
            transition="0.3s"
            _hover={{ transform: "scale(1.05)" }}
        />
        <Text mt={3} color={achieved ? "#FFD45E" : "#C0C0C0"} fontWeight="600">
            {achieved ? "Today's Lotus Blossomed 🌸" : "Today's Lotus Awaits Your Seva 🙏"}
        </Text>
    </Box>
);

export default LotusBlock;
