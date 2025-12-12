import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Text,
    VStack,
    HStack,
    Icon,
    Spinner,
    Badge
} from "@chakra-ui/react";
import { FaUserFriends, FaMobileAlt, FaLayerGroup } from "react-icons/fa";
import { BE_API_URL } from "../../constants/homePage";

const COST_PER_SQFT = 5000;

const DonorTable = () => {
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(true);
    const campaignerId = window.location.pathname.split("/").pop();

    useEffect(() => {
        axios.get(`${BE_API_URL}/api/campaigner/${campaignerId}/donors`)
            .then((res) => {
                setDonors(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching donors:", err);
                setLoading(false);
            });
    }, [campaignerId]);

    // 🎨 Helper: Contribution Display Logic
    const getContributionDisplay = (amount) => {
        if (amount >= COST_PER_SQFT) {
            const sqft = Math.floor(amount / COST_PER_SQFT);
            return (
                <Badge colorScheme="green" variant="solid" borderRadius="full" px={2}>
                    {sqft} Sq.Ft
                </Badge>
            );
        }
        return (
            <Text color="yellow.300" fontWeight="bold">
                ₹{amount.toLocaleString()}
            </Text>
        );
    };

    if (loading) return <Spinner color="yellow.400" mt={10} />;

    if (!donors || donors.length === 0) return null;

    return (
        <Box
            w="100%"
            bg="rgba(255, 255, 255, 0.03)"
            borderRadius="2xl"
            border="1px solid rgba(255, 255, 255, 0.05)"
            p={[4, 6]}
            mt={8}
            mb={10}
            position="relative"
            overflow="hidden"
        >
            <VStack spacing={5} align="stretch">

                {/* Header */}
                <HStack spacing={3} borderBottom="1px solid rgba(255,255,255,0.05)" pb={4}>
                    <Icon as={FaUserFriends} color="purple.300" boxSize={5} />
                    <VStack align="start" spacing={0}>
                        <Text
                            fontSize={["sm", "md"]}
                            fontWeight="700"
                            color="purple.200"
                            textTransform="uppercase"
                            letterSpacing="1px"
                        >
                            Your Latest Donors
                        </Text>
                        <Text fontSize="xs" color="gray.400">
                            The kind souls supporting your campaign (Last 20)
                        </Text>
                    </VStack>
                </HStack>

                {/* Table Container */}
                <Box
                    overflowX="auto"
                    maxH="400px"
                    overflowY="auto"
                    // Custom Scrollbar
                    css={{
                        "&::-webkit-scrollbar": { width: "6px", height: "6px" },
                        "&::-webkit-scrollbar-track": { background: "rgba(0,0,0,0.2)" },
                        "&::-webkit-scrollbar-thumb": { background: "#4A5568", borderRadius: "3px" },
                    }}
                >
                    <Table variant="simple" size="sm">
                        <Thead position="sticky" top={0} bg="#0b172a" zIndex={1}>
                            <Tr>
                                <Th color="gray.400" borderColor="whiteAlpha.100">Donor Name</Th>
                                <Th color="gray.400" borderColor="whiteAlpha.100" textAlign="center">Contribution</Th>
                                <Th color="gray.400" borderColor="whiteAlpha.100" textAlign="right">Mobile</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {donors.map((donor, index) => (
                                <Tr
                                    key={index}
                                    _hover={{ bg: "whiteAlpha.50" }}
                                    transition="background 0.2s"
                                >
                                    {/* Name */}
                                    <Td borderColor="whiteAlpha.100" color="white" fontWeight="600" py={3}>
                                        {donor.username}
                                    </Td>

                                    {/* Contribution (SqFt or Amount) */}
                                    <Td borderColor="whiteAlpha.100" textAlign="center" py={3}>
                                        {getContributionDisplay(donor.amount)}
                                    </Td>

                                    {/* Mobile */}
                                    <Td borderColor="whiteAlpha.100" textAlign="right" color="gray.400" fontSize="xs" py={3}>
                                        <HStack justify="end" spacing={1}>
                                            <Icon as={FaMobileAlt} />
                                            <Text>{donor.mobileno}</Text>
                                        </HStack>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            </VStack>
        </Box>
    );
};

export default DonorTable;