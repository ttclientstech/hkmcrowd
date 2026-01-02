import React, { useState } from "react";
import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Text,
    Input,
    Button,
    HStack,
    VStack,
    Spinner,
    useToast,
    TableContainer,
    Heading,
    Badge,
    Card,
    CardBody,
    Flex,
    Icon,
    useBreakpointValue
} from "@chakra-ui/react";
import {
    FaFileExcel,
    FaArrowLeft,
    FaArrowRight,
    FaSearch,
    FaMapMarkerAlt
} from "react-icons/fa";
import { BE_API_URL } from "../../constants/homePage";

// Brand Colors
const THEME_MAROON = "#6A1B1A";
const THEME_GOLD = "#D4AF37";
const THEME_CREAM = "#FAF3E0";

const PrasadamDonors = () => {
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [hasSearched, setHasSearched] = useState(false);

    // Date Filters
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const toast = useToast();
    const PAGE_SIZE = 20;
    const isMobile = useBreakpointValue({ base: true, md: false });

    // Fetch Data Function
    const fetchDonors = async (pageNumber = 1) => {
        if (!fromDate || !toDate) {
            toast({
                title: "Select Dates",
                description: "Please select both From and To dates.",
                status: "warning",
                position: "top"
            });
            return;
        }

        setLoading(true);
        setHasSearched(true);
        setPage(pageNumber);

        try {
            const queryParams = new URLSearchParams({
                page: pageNumber,
                limit: PAGE_SIZE,
                fromDate,
                toDate
            });

            const response = await fetch(`${BE_API_URL}/api/admin/prasadam-donors?${queryParams}`);
            const data = await response.json();

            if (response.ok) {
                setDonors(data.donors);
                setTotalPages(data.totalPages);
            } else {
                toast({ title: "Error fetching data", status: "error" });
            }
        } catch (error) {
            console.error("Fetch error:", error);
            toast({ title: "Network error", status: "error" });
        } finally {
            setLoading(false);
        }
    };

    // Handle Search Click
    const handleSearch = () => {
        fetchDonors(1); // Reset to page 1 on new search
    };

    // Handle Pagination
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            fetchDonors(newPage);
        }
    };

    // Export to Excel
    const handleExportExcel = () => {
        if (donors.length === 0) {
            toast({ title: "No data to export", status: "warning" });
            return;
        }

        const headers = [
            "Name", "Amount", "Donation Date", "Mobile",
            "House No", "Street Name", "Location/Area", "City",
            "State", "Pincode", "PAN No", "Campaigner ID"
        ];

        const rows = donors.map(d => [
            `"${d.username}"`,
            d.amount,
            `"${new Date(d.createdate).toLocaleDateString()}"`,
            `"${d.mobileno}"`,
            `"${d.houseNumber || ''}"`,
            `"${d.street || ''}"`,
            `"${d.location || ''}"`,
            `"${d.city || ''}"`,
            `"${d.state || ''}"`,
            `"${d.pincode}"`,
            `"${d.panno || ''}"`,
            `"${d.campaignsid || ''}"`
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(row => row.join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `Prasadam_Donors_${fromDate}_to_${toDate}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Box minH="100vh" bg={THEME_CREAM} p={[3, 6]} fontFamily="'Satoshi', sans-serif">
            <Box maxW="1600px" mx="auto">

                {/* --- HEADER --- */}
                <Flex
                    direction={["column", "row"]}
                    justify="space-between"
                    align={["flex-start", "center"]}
                    mb={6}
                    bg="white"
                    p={[4, 6]}
                    borderRadius="2xl"
                    boxShadow="sm"
                    borderLeft={`6px solid ${THEME_MAROON}`}
                    gap={4}
                >
                    <VStack align="flex-start" spacing={1}>
                        <Heading size={["md", "lg"]} color={THEME_MAROON} fontWeight="900">
                            Maha Prasadam Dispatch
                        </Heading>
                        <Text color="gray.500" fontSize="sm">
                            Generate lists for prasadam shipping
                        </Text>
                    </VStack>

                    <Button
                        leftIcon={<FaFileExcel />}
                        colorScheme="green"
                        size="md"
                        w={["100%", "auto"]}
                        onClick={handleExportExcel}
                        isDisabled={!hasSearched || donors.length === 0}
                        borderRadius="full"
                        px={6}
                    >
                        Export Excel
                    </Button>
                </Flex>

                {/* --- FILTERS --- */}
                <Card mb={6} borderRadius="xl" boxShadow="sm" borderTop={`4px solid ${THEME_GOLD}`}>
                    <CardBody p={[4, 6]}>
                        <Flex direction={["column", "row"]} gap={4} align="flex-end">
                            <Box w={["100%", "auto"]}>
                                <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={1}>FROM DATE</Text>
                                <Input
                                    type="date"
                                    bg="white"
                                    focusBorderColor={THEME_MAROON}
                                    value={fromDate}
                                    onChange={(e) => setFromDate(e.target.value)}
                                />
                            </Box>

                            <Box w={["100%", "auto"]}>
                                <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={1}>TO DATE</Text>
                                <Input
                                    type="date"
                                    bg="white"
                                    focusBorderColor={THEME_MAROON}
                                    value={toDate}
                                    onChange={(e) => setToDate(e.target.value)}
                                />
                            </Box>

                            <Button
                                leftIcon={<FaSearch />}
                                bg={THEME_MAROON}
                                color="white"
                                _hover={{ bg: "#501413" }}
                                w={["100%", "auto"]}
                                onClick={handleSearch}
                                isLoading={loading}
                                loadingText="Searching..."
                            >
                                Search Donors
                            </Button>
                        </Flex>
                    </CardBody>
                </Card>

                {/* --- TABLE --- */}
                <Card borderRadius="xl" boxShadow="md" overflow="hidden" bg="white">
                    {/* Horizontal Scroll Wrapper for Mobile */}
                    <TableContainer overflowX="auto" whiteSpace="nowrap">
                        <Table variant="simple" size="sm">
                            <Thead bg={THEME_MAROON}>
                                <Tr>
                                    {[
                                        "Donor Name", "Amount", "Date", "Mobile",
                                        "Address", "Location", "City & State",
                                        "Pincode", "PAN", "Camp. ID"
                                    ].map((header, i) => (
                                        <Th key={i} color="white" py={4} fontSize="xs" letterSpacing="wider">
                                            {header}
                                        </Th>
                                    ))}
                                </Tr>
                            </Thead>
                            <Tbody>
                                {loading ? (
                                    <Tr>
                                        <Td colSpan={10} textAlign="center" py={12}>
                                            <Spinner size="lg" color={THEME_MAROON} />
                                            <Text mt={2} color="gray.500">Fetching records...</Text>
                                        </Td>
                                    </Tr>
                                ) : !hasSearched ? (
                                    <Tr>
                                        <Td colSpan={10} textAlign="center" py={12}>
                                            <VStack spacing={3}>
                                                <Icon as={FaSearch} boxSize={10} color="gray.300" />
                                                <Heading size="md" color="gray.400">Ready to Search</Heading>
                                                <Text color="gray.500">Please select a <b>From Date</b> and <b>To Date</b> above and click Search.</Text>
                                            </VStack>
                                        </Td>
                                    </Tr>
                                ) : donors.length === 0 ? (
                                    <Tr>
                                        <Td colSpan={10} textAlign="center" py={12}>
                                            <Text color="red.500" fontWeight="bold">No prasadam requests found for this date range.</Text>
                                        </Td>
                                    </Tr>
                                ) : (
                                    donors.map((donor) => (
                                        <Tr
                                            key={donor.id}
                                            _hover={{ bg: "orange.50" }}
                                            borderBottom="1px solid"
                                            borderColor="gray.100"
                                        >
                                            {/* Name */}
                                            <Td fontWeight="700" color="#2D3748" verticalAlign="top">
                                                {donor.username}
                                            </Td>

                                            {/* Amount */}
                                            <Td fontWeight="bold" color={THEME_MAROON} verticalAlign="top">
                                                ₹{donor.amount.toLocaleString('en-IN')}
                                            </Td>

                                            {/* Date */}
                                            <Td fontSize="xs" color="gray.600" verticalAlign="top">
                                                {new Date(donor.createdate).toLocaleDateString('en-IN', {
                                                    day: '2-digit', month: 'short', year: 'numeric'
                                                })}
                                            </Td>

                                            {/* Mobile */}
                                            <Td fontSize="xs" verticalAlign="top">{donor.mobileno}</Td>

                                            {/* Address (Wrapping Enabled) */}
                                            <Td maxW="200px" whiteSpace="normal" wordBreak="break-word" verticalAlign="top">
                                                <Text fontSize="xs" fontWeight="bold">{donor.houseNumber}</Text>
                                                <Text fontSize="xs" color="gray.600">{donor.street}</Text>
                                            </Td>

                                            {/* Location (Wrapping Enabled) */}
                                            <Td maxW="150px" whiteSpace="normal" wordBreak="break-word" verticalAlign="top">
                                                <HStack align="flex-start" spacing={1}>
                                                    <Icon as={FaMapMarkerAlt} color={THEME_GOLD} mt="2px" boxSize="10px"/>
                                                    <Text fontSize="xs">{donor.location}</Text>
                                                </HStack>
                                            </Td>

                                            {/* City/State (Wrapping Enabled) */}
                                            <Td maxW="150px" whiteSpace="normal" wordBreak="break-word" verticalAlign="top">
                                                <Text fontSize="xs" fontWeight="bold">{donor.city}</Text>
                                                <Text fontSize="xs" color="gray.500">{donor.state}</Text>
                                            </Td>

                                            {/* Pincode */}
                                            <Td verticalAlign="top">
                                                <Badge colorScheme="purple" variant="subtle">
                                                    {donor.pincode}
                                                </Badge>
                                            </Td>

                                            {/* PAN */}
                                            <Td fontSize="xs" fontFamily="monospace" verticalAlign="top">
                                                {donor.panno || "-"}
                                            </Td>

                                            {/* Campaigner */}
                                            <Td verticalAlign="top">
                                                {donor.campaignsid ? (
                                                    <Badge colorScheme="orange" variant="outline" fontSize="xs" whiteSpace="normal">
                                                        {donor.campaignsid}
                                                    </Badge>
                                                ) : (
                                                    <Text fontSize="xs" color="gray.400">-</Text>
                                                )}
                                            </Td>
                                        </Tr>
                                    ))
                                )}
                            </Tbody>
                        </Table>
                    </TableContainer>

                    {/* --- FOOTER PAGINATION (Only show if searched) --- */}
                    {hasSearched && donors.length > 0 && (
                        <Flex
                            bg="gray.50"
                            p={4}
                            justify="space-between"
                            align="center"
                            borderTop="1px solid"
                            borderColor="gray.200"
                            direction={["column", "row"]}
                            gap={4}
                        >
                            <Text fontSize="sm" color="gray.600">
                                Page <Box as="span" fontWeight="bold" color={THEME_MAROON}>{page}</Box> of {totalPages}
                            </Text>
                            <HStack spacing={2} w={["100%", "auto"]} justify="center">
                                <Button
                                    size="sm"
                                    leftIcon={<FaArrowLeft />}
                                    onClick={() => handlePageChange(page - 1)}
                                    isDisabled={page === 1 || loading}
                                    variant="outline"
                                >
                                    Prev
                                </Button>
                                <Button
                                    size="sm"
                                    rightIcon={<FaArrowRight />}
                                    onClick={() => handlePageChange(page + 1)}
                                    isDisabled={page >= totalPages || loading}
                                    bg={THEME_MAROON}
                                    color="white"
                                    _hover={{ bg: "#501413" }}
                                >
                                    Next
                                </Button>
                            </HStack>
                        </Flex>
                    )}
                </Card>
            </Box>
        </Box>
    );
};

export default PrasadamDonors;