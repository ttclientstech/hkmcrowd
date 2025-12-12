import React from "react";
import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import lotusBud from "../../assets/images/lotus_bud_small.png";
import lotusBloom from "../../assets/images/lotus_bloom_small.png";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const WeeklyLotusRow = ({ days: blossomed }) => (
    <VStack spacing={2}>
        <Text color="#FFD45E" fontWeight="bold">Your Weekly Seva Blossoms</Text>
        <HStack spacing={4}>
            {blossomed.map((d, i) => (
                <VStack key={i} spacing={1}>
                    <Image src={d ? lotusBloom : lotusBud} boxSize="45px" />
                    <Text fontSize="xs" color="gray.400">{days[i]}</Text>
                </VStack>
            ))}
        </HStack>
    </VStack>
);

export default WeeklyLotusRow;
