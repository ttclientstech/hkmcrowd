import React, { useState } from "react";
import {
    Box,
    Text,
    Input,
    Button,
    HStack,
    VStack,
    Spinner,
    useToast,
    Heading,
    Badge,
    Card,
    CardBody,
    Flex,
    Icon,
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
    FaCalendarAlt,
    FaListOl
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
    const [totalCount, setTotalCount] = useState(0); // ✅ New State for Total Count
    const [hasSearched, setHasSearched] = useState(false);

    // Date Filters
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const toast = useToast();
    const PAGE_SIZE = 20;

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
                setTotalCount(data.totalCount || 0); // ✅ Capture Total Count
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

        const headers = [
            "Name", "Amount", "Donation Date", "Mobile", "Shipping Address",
            "House No", "Street Name", "Location/Area", "City", "State",
            "Pincode", "PAN No", "Campaigner ID"
        ];

        const rows = donors.map(d => {
            const fullAddress = `"${d.houseNumber || ''}, ${d.street || ''}, ${d.location ? d.location + ', ' : ''}${d.city || ''}, ${d.state || ''} - ${d.pincode || ''}"`;

            return [
                `"${d.username}"`,
                d.amount,
                `"${new Date(d.createdate).toLocaleDateString()}"`,
                `"${d.mobileno}"`,
                fullAddress,
                `"${d.houseNumber || ''}"`,
                `"${d.street || ''}"`,
                `"${d.location || ''}"`,
                `"${d.city || ''}"`,
                `"${d.state || ''}"`,
                `"${d.pincode}"`,
                `"${d.panno || ''}"`,
                `"${d.campaignsid || ''}"`
            ];
        });

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

    // --- CARD COMPONENT ---
    const DonorCard = ({ donor }) => (
        <Card bg="white" w="100%" h="100%" shadow="sm" borderRadius="lg" border="1px solid" borderColor="gray.200">
            <CardBody p={4} display="flex" flexDirection="column">
                <Flex justify="space-between" align="flex-start" mb={2} w="100%">
                    <HStack align="flex-start">
                        <Icon as={FaUser} color="gray.400" mt={1} />
                        <Text fontWeight="bold" color="#2D3748" fontSize="md" lineHeight="1.2">{donor.username}</Text>
                    </HStack>
                    <Badge colorScheme="green" fontSize="sm" px={2} py={0.5} borderRadius="full" ml={2}>
                        ₹{donor.amount.toLocaleString('en-IN')}
                    </Badge>
                </Flex>

                <Divider my={2} />

                <SimpleGrid columns={2} spacing={3} fontSize="sm" w="100%">
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

                <Box mt={3} bg="orange.50" p={2} borderRadius="md" border="1px dashed" borderColor="orange.200" w="100%" flexGrow={1}>
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

                <Flex justify="space-between" align="center" mt={3} w="100%">
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
        // ✅ Outer wrapper fills 100% width
        <Box minH="100vh" w="100%" bg={THEME_CREAM} p={[2, 4]} fontFamily="'Satoshi', sans-serif">

            {/* ✅ UPDATED: Changed maxW="1600px" to maxW="100%" to force full width */}
            <Box w="100%" maxW="100%" mx="auto">

                {/* --- HEADER --- */}
                <Flex
                    w="100%"
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
                    <VStack align="flex-start" spacing={0} w={["100%", "auto"]}>
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
                <Card mb={4} w="100%" borderRadius="xl" boxShadow="sm" borderTop={`4px solid ${THEME_GOLD}`}>
                    <CardBody p={4}>
                        <Flex direction={["column", "row"]} gap={3} align="flex-end" w="100%">
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

                {/* ✅ NEW SECTION: Total Count Display */}
                {hasSearched && (
                    <Flex w="100%" justify="flex-start" align="center" mb={4} px={1}>
                        <HStack bg="white" px={4} py={2} borderRadius="full" shadow="sm" border="1px solid" borderColor="gray.200">
                            <Icon as={FaListOl} color={THEME_MAROON} />
                            <Text fontSize="sm" fontWeight="bold" color="gray.700">
                                Total Donors Found: <Box as="span" color={THEME_MAROON} fontSize="md">{totalCount}</Box>
                            </Text>
                        </HStack>
                    </Flex>
                )}

                {/* --- CONTENT AREA --- */}
                <Box w="100%">
                    {loading ? (
                        <Flex justify="center" py={10} direction="column" align="center" w="100%">
                            <Spinner size="lg" color={THEME_MAROON} thickness="3px" />
                            <Text mt={2} fontSize="sm" color="gray.500">Loading data...</Text>
                        </Flex>
                    ) : !hasSearched ? (
                        <Flex direction="column" align="center" justify="center" bg="white" p={8} borderRadius="xl" boxShadow="sm" w="100%">
                            <Icon as={FaSearch} boxSize={8} color="gray.300" mb={2} />
                            <Text color="gray.500" textAlign="center" fontSize="sm">Select dates and click Search</Text>
                        </Flex>
                    ) : donors.length === 0 ? (
                        <Flex justify="center" p={8} bg="white" borderRadius="xl" w="100%">
                            <Text color="red.500" fontWeight="bold">No records found.</Text>
                        </Flex>
                    ) : (
                        <>
                            {/* Card Grid - Full Width */}
                            <SimpleGrid columns={[1, 2, 3]} spacing={4} w="100%" alignItems="stretch">
                                {donors.map((donor) => (
                                    <DonorCard key={donor.id} donor={donor} />
                                ))}
                            </SimpleGrid>

                            {/* Pagination */}
                            <Flex bg="white" p={3} justify="space-between" align="center" mt={4} borderRadius="xl" boxShadow="sm" w="100%">
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