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
    useBreakpointValue,
    SimpleGrid,
    Divider
} from "@chakra-ui/react";
import {
    FaFileExcel,
    FaArrowLeft,
    FaArrowRight,
    FaSearch,
    FaMapMarkerAlt,
    FaUser,
    FaPhone,
    FaCalendarAlt
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

    // Detect Mobile View
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

    const handleSearch = () => fetchDonors(1);
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) fetchDonors(newPage);
    };

    const handleExportExcel = () => {
        if (donors.length === 0) {
            toast({ title: "No data to export", status: "warning" });
            return;
        }
        const headers = ["Name", "Amount", "Donation Date", "Mobile", "House No", "Street Name", "Location/Area", "City", "State", "Pincode", "PAN No", "Campaigner ID"];
        const rows = donors.map(d => [
            `"${d.username}"`, d.amount, `"${new Date(d.createdate).toLocaleDateString()}"`, `"${d.mobileno}"`,
            `"${d.houseNumber || ''}"`, `"${d.street || ''}"`, `"${d.location || ''}"`, `"${d.city || ''}"`,
            `"${d.state || ''}"`, `"${d.pincode}"`, `"${d.panno || ''}"`, `"${d.campaignsid || ''}"`
        ]);
        const csvContent = [headers.join(","), ...rows.map(row => row.join(","))].join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `Prasadam_Donors_${fromDate}_to_${toDate}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // --- MOBILE CARD COMPONENT ---
    const MobileDonorCard = ({ donor }) => (
        <Card bg="white" shadow="sm" borderRadius="lg" border="1px solid" borderColor="gray.200" mb={3}>
            <CardBody p={4}>
                {/* Header: Name & Amount */}
                <Flex justify="space-between" align="center" mb={2}>
                    <HStack>
                        <Icon as={FaUser} color="gray.400" />
                        <Text fontWeight="bold" color="#2D3748" fontSize="md">{donor.username}</Text>
                    </HStack>
                    <Badge colorScheme="green" fontSize="sm" px={2} py={0.5} borderRadius="full">
                        ₹{donor.amount.toLocaleString('en-IN')}
                    </Badge>
                </Flex>

                <Divider my={2} />

                {/* Details Grid */}
                <SimpleGrid columns={2} spacing={3} fontSize="sm">
                    <Box>
                        <Text fontSize="xs" color="gray.500" fontWeight="bold">MOBILE</Text>
                        <HStack spacing={1}>
                            <Icon as={FaPhone} boxSize={3} color="gray.400"/>
                            <Text>{donor.mobileno}</Text>
                        </HStack>
                    </Box>
                    <Box>
                        <Text fontSize="xs" color="gray.500" fontWeight="bold">DATE</Text>
                        <HStack spacing={1}>
                            <Icon as={FaCalendarAlt} boxSize={3} color="gray.400"/>
                            <Text>{new Date(donor.createdate).toLocaleDateString('en-IN')}</Text>
                        </HStack>
                    </Box>
                </SimpleGrid>

                {/* Address Section */}
                <Box mt={3} bg="orange.50" p={2} borderRadius="md" border="1px dashed" borderColor="orange.200">
                    <HStack mb={1} align="flex-start">
                        <Icon as={FaMapMarkerAlt} color={THEME_MAROON} mt={1} />
                        <Text fontSize="xs" fontWeight="bold" color={THEME_MAROON}>SHIPPING ADDRESS</Text>
                    </HStack>
                    <Text fontSize="sm" color="gray.700" lineHeight="1.4">
                        {donor.houseNumber}, {donor.street}
                        <br />
                        {donor.location && <>{donor.location}, <br/></>}
                        {donor.city}, {donor.state} - <b>{donor.pincode}</b>
                    </Text>
                </Box>

                {/* Footer: Campaign Info */}
                <Flex justify="space-between" align="center" mt={3}>
                    <Text fontSize="xs" color="gray.500">PAN: {donor.panno || "N/A"}</Text>
                    {donor.campaignsid && (
                        <Badge colorScheme="orange" variant="outline" fontSize="xs">
                            Camp ID: {donor.campaignsid}
                        </Badge>
                    )}
                </Flex>
            </CardBody>
        </Card>
    );

    return (
        <Box minH="100vh" bg={THEME_CREAM} p={[2, 6]} fontFamily="'Satoshi', sans-serif">
            <Box maxW="1600px" mx="auto">

                {/* --- HEADER --- */}
                <Flex
                    direction={["column", "row"]}
                    justify="space-between"
                    align={["flex-start", "center"]}
                    mb={4}
                    bg="white"
                    p={4}
                    borderRadius="xl"
                    boxShadow="sm"
                    borderLeft={`6px solid ${THEME_MAROON}`}
                    gap={3}
                >
                    <VStack align="flex-start" spacing={0}>
                        <Heading size="md" color={THEME_MAROON} fontWeight="900">
                            Prasadam Dispatch
                        </Heading>
                        <Text color="gray.500" fontSize="xs">
                            Download shipping lists
                        </Text>
                    </VStack>

                    <Button
                        leftIcon={<FaFileExcel />}
                        colorScheme="green"
                        size="sm"
                        w={["100%", "auto"]}
                        onClick={handleExportExcel}
                        isDisabled={!hasSearched || donors.length === 0}
                    >
                        Export Excel
                    </Button>
                </Flex>

                {/* --- FILTERS --- */}
                <Card mb={4} borderRadius="xl" boxShadow="sm" borderTop={`4px solid ${THEME_GOLD}`}>
                    <CardBody p={4}>
                        <Flex direction={["column", "row"]} gap={3} align="flex-end">
                            <Box w={["100%", "auto"]}>
                                <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={1}>FROM</Text>
                                <Input type="date" bg="white" size="sm" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                            </Box>

                            <Box w={["100%", "auto"]}>
                                <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={1}>TO</Text>
                                <Input type="date" bg="white" size="sm" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                            </Box>

                            <Button
                                leftIcon={<FaSearch />}
                                bg={THEME_MAROON}
                                color="white"
                                _hover={{ bg: "#501413" }}
                                w={["100%", "auto"]}
                                onClick={handleSearch}
                                isLoading={loading}
                                size="sm"
                            >
                                Search
                            </Button>
                        </Flex>
                    </CardBody>
                </Card>

                {/* --- CONTENT AREA --- */}
                <Box>
                    {loading ? (
                        <Flex justify="center" py={10} direction="column" align="center">
                            <Spinner size="lg" color={THEME_MAROON} thickness="3px" />
                            <Text mt={2} fontSize="sm" color="gray.500">Loading data...</Text>
                        </Flex>
                    ) : !hasSearched ? (
                        <Flex direction="column" align="center" justify="center" bg="white" p={8} borderRadius="xl" boxShadow="sm">
                            <Icon as={FaSearch} boxSize={8} color="gray.300" mb={2} />
                            <Text color="gray.500" textAlign="center" fontSize="sm">Select dates and click Search</Text>
                        </Flex>
                    ) : donors.length === 0 ? (
                        <Flex justify="center" p={8} bg="white" borderRadius="xl">
                            <Text color="red.500" fontWeight="bold">No records found.</Text>
                        </Flex>
                    ) : (
                        <>
                            {/* === MOBILE VIEW: CARDS === */}
                            {isMobile ? (
                                <VStack align="stretch" spacing={0}>
                                    {donors.map((donor) => (
                                        <MobileDonorCard key={donor.id} donor={donor} />
                                    ))}
                                </VStack>
                            ) : (
                                /* === DESKTOP VIEW: TABLE === */
                                <Card borderRadius="xl" boxShadow="md" overflow="hidden" bg="white">
                                    <TableContainer>
                                        <Table variant="simple" size="sm">
                                            <Thead bg={THEME_MAROON}>
                                                <Tr>
                                                    {["Name", "Amount", "Date", "Mobile", "Address", "Location", "City/State", "Pin", "PAN", "Camp ID"].map((h, i) => (
                                                        <Th key={i} color="white" py={3} fontSize="xs">{h}</Th>
                                                    ))}
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                {donors.map((donor) => (
                                                    <Tr key={donor.id} _hover={{ bg: "orange.50" }} borderBottom="1px solid" borderColor="gray.100">
                                                        <Td fontWeight="bold">{donor.username}</Td>
                                                        <Td fontWeight="bold" color={THEME_MAROON}>₹{donor.amount.toLocaleString()}</Td>
                                                        <Td fontSize="xs">{new Date(donor.createdate).toLocaleDateString()}</Td>
                                                        <Td fontSize="xs">{donor.mobileno}</Td>
                                                        <Td maxW="200px" whiteSpace="normal"><Text fontSize="xs">{donor.houseNumber}, {donor.street}</Text></Td>
                                                        <Td maxW="150px" whiteSpace="normal"><Text fontSize="xs">{donor.location}</Text></Td>
                                                        <Td fontSize="xs">{donor.city}, {donor.state}</Td>
                                                        <Td><Badge>{donor.pincode}</Badge></Td>
                                                        <Td fontSize="xs">{donor.panno || "-"}</Td>
                                                        <Td fontSize="xs">{donor.campaignsid || "-"}</Td>
                                                    </Tr>
                                                ))}
                                            </Tbody>
                                        </Table>
                                    </TableContainer>
                                </Card>
                            )}

                            {/* --- PAGINATION --- */}
                            <Flex bg="white" p={3} justify="space-between" align="center" mt={4} borderRadius="xl" boxShadow="sm">
                                <Button size="sm" onClick={() => handlePageChange(page - 1)} isDisabled={page === 1} variant="outline">Prev</Button>
                                <Text fontSize="xs" fontWeight="bold">Page {page} of {totalPages}</Text>
                                <Button size="sm" onClick={() => handlePageChange(page + 1)} isDisabled={page >= totalPages} bg={THEME_MAROON} color="white">Next</Button>
                            </Flex>
                        </>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default PrasadamDonors;