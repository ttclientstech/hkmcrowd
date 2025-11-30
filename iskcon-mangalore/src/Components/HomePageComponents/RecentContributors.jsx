import React, { useState } from "react";
import {
    Box,
    Text,
    Flex,
    HStack,
    VStack,
    Button,
    Divider,
} from "@chakra-ui/react";
import { formatCurrency, formatTimeAgo } from '../utils';

const dummyLargest = [
    { username: "Ramesh Kumar", amount: 25001, date: new Date() },
    { username: "Anita Devi", amount: 20000, date: new Date() },
    { username: "Suresh Mehta", amount: 18000, date: new Date() },
    { username: "Krishna Rao", amount: 15000, date: new Date() },
];

const RecentContributors = ({ latestData = [] }) => {
    const [tab, setTab] = useState("latest");
    const contributors = tab === "latest" ? latestData : dummyLargest;

    return (
        <Box
            w="100%"
            maxW="900px"
            mx="auto"
            mt={20}
            px={[4, 6]}
            fontFamily="'Poppins', sans-serif"
        >
            {/* Title */}
            <Text
                textAlign="center"
                fontSize={["2xl", "3xl"]}
                fontWeight="800"
                color="#5eb0ff"
                mb={6}
            >
                Respected Contributors
            </Text>

            {/* TABS */}
            <Flex justify="center" gap={5} mb={8}>
                <Button
                    onClick={() => setTab("latest")}
                    bg={tab === "latest" ? "#5eb0ff" : "white"}
                    color={tab === "latest" ? "white" : "#5eb0ff"}
                    borderRadius="30px"
                    px={10}
                    py={6}
                    fontWeight="700"
                    border="2px solid #5eb0ff"
                    boxShadow={
                        tab === "latest"
                            ? "0 5px 20px rgba(94,176,255,0.35)"
                            : "0 3px 8px rgba(0,0,0,0.08)"
                    }
                    _hover={{ transform: "translateY(-3px)" }}
                    transition="0.25s"
                >
                    Latest
                </Button>

                <Button
                    onClick={() => setTab("largest")}
                    bg={tab === "largest" ? "#5eb0ff" : "white"}
                    color={tab === "largest" ? "white" : "#5eb0ff"}
                    borderRadius="30px"
                    px={10}
                    py={6}
                    fontWeight="700"
                    border="2px solid #5eb0ff"
                    boxShadow={
                        tab === "largest"
                            ? "0 5px 20px rgba(94,176,255,0.35)"
                            : "0 3px 8px rgba(0,0,0,0.08)"
                    }
                    _hover={{ transform: "translateY(-3px)" }}
                    transition="0.25s"
                >
                    Largest
                </Button>
            </Flex>

            {/* CARD CONTAINER */}
            <Box
                bg="white"
                p={[4, 6]}
                borderRadius="25px"
                boxShadow="0 10px 40px rgba(0,0,0,0.08)"
            >
                {contributors.map((user, index) => (
                    <Box key={index} mb={index === contributors.length - 1 ? 0 : 5}>
                        <Flex
                            align="center"
                            justify="space-between"
                            p={4}
                            borderRadius="16px"
                            bg="#F8FAFE"
                            boxShadow="0 4px 15px rgba(0,0,0,0.05)"
                            transition="0.2s"
                            _hover={{
                                transform: "translateY(-3px)",
                                boxShadow: "0 6px 20px rgba(0,0,0,0.10)",
                            }}
                        >
                            {/* LEFT SIDE */}
                            <HStack spacing={4}>
                                <Box
                                    bg="#E4EDFA"
                                    color="#5eb0ff"
                                    fontWeight="700"
                                    w="48px"
                                    h="48px"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    borderRadius="50%"
                                    fontSize="lg"
                                    boxShadow="inset 0 2px 5px rgba(0,0,0,0.1)"
                                >
                                    {(user?.username || "U")[0].toUpperCase()}
                                </Box>

                                <VStack align="start" spacing={0}>
                                    <Text fontWeight="700" color="#333">
                                        {user?.username || "Unknown Donor"}
                                    </Text>
                                    <Text color="#666" fontSize="sm">
                                        donated{" "}
                                        <Text as="span" fontWeight="700">
                                            {formatCurrency(user.amount)}
                                        </Text>
                                    </Text>
                                </VStack>
                            </HStack>

                            {/* TIME */}
                            <Text fontSize="sm" color="#888" whiteSpace="nowrap">
                                {formatTimeAgo(user.date)}
                            </Text>
                        </Flex>
                    </Box>
                ))}
            </Box>

            {/* Show More */}
            <Text
                textAlign="center"
                mt={6}
                fontSize="lg"
                color="#5eb0ff"
                cursor="pointer"
                fontWeight="600"
                _hover={{ opacity: 0.7 }}
            >
                Show More
            </Text>
        </Box>
    );
};

export default RecentContributors;