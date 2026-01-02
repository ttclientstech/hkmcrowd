import React, { useState, useEffect } from "react";
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
    Tooltip,
    useColorModeValue
} from "@chakra-ui/react";
import {
    FaFileExcel,
    FaArrowLeft,
    FaArrowRight,
    FaCalendarAlt,
    FaSearch,
    FaMapMarkerAlt
} from "react-icons/fa";

// Brand Colors
const THEME_MAROON = "#6A1B1A";
const THEME_GOLD = "#D4AF37";
const THEME_CREAM = "#FAF3E0";

const PrasadamDonors = () => {
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Date Filters
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const toast = useToast();
    const PAGE_SIZE = 20;

    // Fetch Data
    const fetchDonors = async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams({
                page: page,
                limit: PAGE_SIZE,
                ...(fromDate && { fromDate }),
                ...(toDate && { toDate })
            });

            // Replace with your actual API endpoint
            const response = await fetch(`/api/admin/prasadam-donors?${queryParams}`);
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

    useEffect(() => {
        fetchDonors();
    }, [page, fromDate, toDate]);

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
        link.setAttribute("download", `Prasadam_Donors_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Box minH="100vh" bg={THEME_CREAM} p={[4, 8]} fontFamily="'Satoshi', sans-serif">
            <Box maxW="1600px" mx="auto">

                {/* --- HEADER --- */}
                <Flex
                    direction={["column", "row"]}
                    justify="space-between"
                    align="center"
                    mb={8}
                    bg="white"
                    p={6}
                    borderRadius="2xl"
                    boxShadow="lg"
                    borderLeft={`8px solid ${THEME_MAROON}`}
                >
                    <VStack align={["center", "flex-start"]} spacing={1}>
                        <Heading size="lg" color={THEME_MAROON} fontWeight="900" letterSpacing="tight">
                            Prasadam Seva Dispatch
                        </Heading>
                        <Text color="gray.500" fontSize="sm" fontWeight="medium">
                            Manage and export donors who opted for Prasadam
                        </Text>
                    </VStack>

                    <Button
                        leftIcon={<FaFileExcel />}
                        bg="green.600"
                        color="white"
                        size="md"
                        _hover={{ bg: "green.700", transform: "translateY(-2px)", boxShadow: "md" }}
                        transition="all 0.2s"
                        onClick={handleExportExcel}
                        isDisabled={loading || donors.length === 0}
                        mt={["4", "0"]}
                        borderRadius="full"
                        px={8}
                    >
                        Export Excel
                    </Button>
                </Flex>

                {/* --- FILTERS --- */}
                <Card mb={8} borderRadius="xl" boxShadow="md" borderTop={`4px solid ${THEME_GOLD}`}>
                    <CardBody>
                        <Flex direction={["column", "row"]} gap={6} align="flex-end">
                            <Box w={["100%", "auto"]}>
                                <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={1} textTransform="uppercase">
                                    From Date
                                </Text>
                                <HStack>
                                    <Icon as={FaCalendarAlt} color={THEME_MAROON} />
                                    <Input
                                        type="date"
                                        w={["100%", "200px"]}
                                        focusBorderColor={THEME_MAROON}
                                        value={fromDate}
                                        onChange={(e) => { setPage(1); setFromDate(e.target.value); }}
                                    />
                                </HStack>
                            </Box>

                            <Box w={["100%", "auto"]}>
                                <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={1} textTransform="uppercase">
                                    To Date
                                </Text>
                                <HStack>
                                    <Icon as={FaCalendarAlt} color={THEME_MAROON} />
                                    <Input
                                        type="date"
                                        w={["100%", "200px"]}
                                        focusBorderColor={THEME_MAROON}
                                        value={toDate}
                                        onChange={(e) => { setPage(1); setToDate(e.target.value); }}
                                    />
                                </HStack>
                            </Box>

                            <Button
                                variant="ghost"
                                colorScheme="red"
                                onClick={() => { setFromDate(""); setToDate(""); }}
                                leftIcon={<FaSearch />}
                            >
                                Clear Filters
                            </Button>
                        </Flex>
                    </CardBody>
                </Card>

                {/* --- TABLE --- */}
                <Card borderRadius="xl" boxShadow="xl" overflow="hidden" bg="white">
                    <TableContainer>
                        <Table variant="simple" size="sm">
                            <Thead bg={THEME_MAROON}>
                                <Tr>
                                    {[
                                        "Donor Name", "Amount", "Date", "Mobile",
                                        "Street Address", "Location/Area", "City & State",
                                        "Pincode", "PAN", "Camp. ID"
                                    ].map((header, i) => (
                                        <Th key={i} color="white" py={5} fontSize="xs" letterSpacing="wider">
                                            {header}
                                        </Th>
                                    ))}
                                </Tr>
                            </Thead>
                            <Tbody>
                                {loading ? (
                                    <Tr>
                                        <Td colSpan={10} textAlign="center" py={12}>
                                            <Spinner size="xl" color={THEME_MAROON} thickness="4px" />
                                            <Text mt={4} color="gray.500" fontWeight="bold">Loading records...</Text>
                                        </Td>
                                    </Tr>
                                ) : donors.length === 0 ? (
                                    <Tr>
                                        <Td colSpan={10} textAlign="center" py={12}>
                                            <VStack spacing={3}>
                                                <Icon as={FaSearch} boxSize={8} color="gray.300" />
                                                <Text color="gray.500" fontWeight="bold">No prasadam requests found for this period.</Text>
                                            </VStack>
                                        </Td>
                                    </Tr>
                                ) : (
                                    donors.map((donor, index) => (
                                        <Tr
                                            key={donor.id}
                                            _hover={{ bg: "orange.50" }}
                                            transition="background 0.2s"
                                            borderBottom="1px solid"
                                            borderColor="gray.100"
                                        >
                                            <Td fontWeight="700" color="#2D3748">
                                                {donor.username}
                                            </Td>
                                            <Td fontWeight="bold" color={THEME_MAROON}>
                                                ₹{donor.amount.toLocaleString('en-IN')}
                                            </Td>
                                            <Td fontSize="sm" color="gray.600">
                                                {new Date(donor.createdate).toLocaleDateString('en-IN', {
                                                    day: '2-digit', month: 'short', year: 'numeric'
                                                })}
                                            </Td>
                                            <Td fontSize="sm">{donor.mobileno}</Td>
                                            <Td maxW="200px">
                                                <Text fontSize="xs" fontWeight="bold" color="gray.700">{donor.houseNumber}</Text>
                                                <Text fontSize="xs" color="gray.500" isTruncated>{donor.street}</Text>
                                            </Td>
                                            <Td fontSize="sm" color="gray.700">
                                                <HStack>
                                                    <Icon as={FaMapMarkerAlt} color={THEME_GOLD} size="xs"/>
                                                    <Text>{donor.location}</Text>
                                                </HStack>
                                            </Td>
                                            <Td fontSize="xs">
                                                <Text fontWeight="bold">{donor.city}</Text>
                                                <Text color="gray.500">{donor.state}</Text>
                                            </Td>
                                            <Td>
                                                <Badge colorScheme="purple" variant="subtle" fontSize="0.7em">
                                                    {donor.pincode}
                                                </Badge>
                                            </Td>
                                            <Td fontSize="xs" fontFamily="monospace">{donor.panno || "-"}</Td>
                                            <Td>
                                                {donor.campaignsid ? (
                                                    <Badge colorScheme="orange" variant="outline" fontSize="xs">
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

                    {/* --- FOOTER PAGINATION --- */}
                    <Flex
                        bg="gray.50"
                        p={4}
                        justify="space-between"
                        align="center"
                        borderTop="1px solid"
                        borderColor="gray.200"
                    >
                        <Text fontSize="sm" color="gray.600" fontWeight="medium">
                            Page <Box as="span" fontWeight="bold" color={THEME_MAROON}>{page}</Box> of {totalPages || 1}
                        </Text>
                        <HStack spacing={2}>
                            <Button
                                size="sm"
                                leftIcon={<FaArrowLeft />}
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                isDisabled={page === 1 || loading}
                                variant="outline"
                                colorScheme="gray"
                            >
                                Previous
                            </Button>
                            <Button
                                size="sm"
                                rightIcon={<FaArrowRight />}
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                isDisabled={page >= totalPages || loading}
                                bg={THEME_MAROON}
                                color="white"
                                _hover={{ bg: "#501413" }}
                            >
                                Next
                            </Button>
                        </HStack>
                    </Flex>
                </Card>
            </Box>
        </Box>
    );
};

export default PrasadamDonors;