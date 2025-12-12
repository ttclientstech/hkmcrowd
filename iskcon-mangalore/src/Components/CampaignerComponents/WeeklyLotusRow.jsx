import React from "react";
import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import lotusBud from "../../assets/images/lotus_bud_small.png";
import lotusBloom from "../../assets/images/lotus_bloom_small.png";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const WeeklyLotusRow = ({ days: blossomed }) => (
    <VStack spacing={3}>
        <Text
            color="rgb(230 144 46)"
            fontWeight="700"
            fontSize="lg"
            textTransform="uppercase"
        >
            Your Weekly Seva Blossoms
        </Text>

        <HStack spacing={[2, 4]}>
            {blossomed.map((d, i) => (
                <VStack key={i} spacing={1}>
                    <Image src={d ? lotusBloom : lotusBud} boxSize="70px" />
                    <Text fontSize="xs" color="white">
                        {days[i]}
                    </Text>
                </VStack>
            ))}
        </HStack>
    </VStack>
);

export default WeeklyLotusRow;
