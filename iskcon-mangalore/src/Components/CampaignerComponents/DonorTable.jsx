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
import { FaUserFriends, FaMobileAlt } from "react-icons/fa";
import { BE_API_URL } from "../../constants/homePage";

const COST_PER_SQFT = 5000;

const DonorTable = () => {
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(true);
    const campaignerId = localStorage.getItem('campaignerId');

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

    const getContributionDisplay = (amount) => {
        if (amount >= COST_PER_SQFT) {
            const sqft = Math.floor(amount / COST_PER_SQFT);
            return (
                <Badge colorScheme="green" variant="solid" borderRadius="full" px={2} fontSize="10px">
                    {sqft} Sq.Ft
                </Badge>
            );
        }
        return (
            <Text color="yellow.300" fontWeight="bold" fontSize="xs">
                ₹{amount.toLocaleString()}
            </Text>
        );
    };

    if (loading) return <Spinner color="yellow.400" mt={10} />;

    if (!donors || donors.length === 0) return null;

    return (
        <Box
            w="100%"
            maxW="100%" // ✅ FIX 1: Ensure container never exceeds parent width
            bg="rgba(255, 255, 255, 0.03)"
            borderRadius="2xl"
            border="1px solid rgba(255, 255, 255, 0.05)"
            p={[3, 5]} // Reduced padding slightly on mobile
            mt={8}
            mb={10}
            position="relative"
            overflow="hidden"
        >
            <VStack spacing={4} align="stretch">

                {/* Header */}
                <HStack spacing={3} borderBottom="1px solid rgba(255,255,255,0.05)" pb={3}>
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
                        <Text fontSize="10px" color="gray.400">
                            The kind souls supporting your campaign (Last 20)
                        </Text>
                    </VStack>
                </HStack>

                {/* Table Wrapper - The Critical Fix */}
                <Box
                    w="100%"
                    overflowX="auto" // ✅ FIX 2: Enables horizontal scrolling ONLY for the table
                    overflowY="hidden"
                    css={{
                        "&::-webkit-scrollbar": { height: "4px" }, // Thinner scrollbar
                        "&::-webkit-scrollbar-track": { background: "rgba(0,0,0,0.2)" },
                        "&::-webkit-scrollbar-thumb": { background: "#4A5568", borderRadius: "2px" },
                    }}
                >
                    <Table variant="simple" size="sm" w="100%">
                        <Thead bg="#0b172a">
                            <Tr>
                                {/* Name Column */}
                                <Th color="gray.400" borderColor="whiteAlpha.100" pl={0} width="40%">Name</Th>

                                {/* Contribution Column */}
                                <Th color="gray.400" borderColor="whiteAlpha.100" textAlign="center" width="30%">Donation</Th>

                                {/* Mobile Column */}
                                <Th color="gray.400" borderColor="whiteAlpha.100" textAlign="right" pr={0} width="30%">Mobile</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {donors.map((donor, index) => (
                                <Tr
                                    key={index}
                                    _hover={{ bg: "whiteAlpha.50" }}
                                >
                                    {/* Name: Truncate long names to prevent page breaking */}
                                    <Td
                                        borderColor="whiteAlpha.100"
                                        color="white"
                                        fontWeight="600"
                                        py={3}
                                        pl={0}
                                        maxW={["100px", "150px"]} // ✅ FIX 3: Restrict width
                                        isTruncated // ✅ FIX 4: Cut off text with "..." if too long
                                    >
                                        {donor.username}
                                    </Td>

                                    <Td borderColor="whiteAlpha.100" textAlign="center" py={3}>
                                        {getContributionDisplay(donor.amount)}
                                    </Td>

                                    <Td borderColor="whiteAlpha.100" textAlign="right" color="gray.400" fontSize="xs" py={3} pr={0}>
                                        <HStack justify="end" spacing={1}>
                                            {/* Hide Icon on very small screens if needed */}
                                            <Icon as={FaMobileAlt} display={["none", "block"]} />
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