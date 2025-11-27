import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSingleUser, postPaymentFormData } from "../Redux/clientSlices/clientUsers";
import image16 from "../assets/images/logo.jpeg";
import avatar from "../assets/images/Avatar-PNG-Image.webp";
import BannerImage from "../assets/images/mandir_nirman_seva_banner.png";

import {
    Box, IconButton, Flex, Button, useBreakpointValue, Text, Icon, Image, VStack, Link as ChakraLink
} from "@chakra-ui/react";
import { FaArrowUp, FaShieldAlt, FaRupeeSign, FaLandmark, FaHeart, FaVideo } from "react-icons/fa";

import DottedAnimation from "../Components/DottedAnimation";
import { themeColor } from "../Components/utils";
import PageNotFound from "../Components/HomePageComponents/PageNotFound";
// We replace the tabbed structure with a long scroll structure
import CampaignMoreDetails from "../Components/HomePageComponents/CampaingMoreDetails";
import Funders from "../Components/HomePageComponents/Funders";
import { campaign } from "../constants/homePage";

// We replace these components with new VCM-style blocks
import DetailPageHeaderNew from "../Components/HomePageComponents/DetailPageHeader";
import PaymentPageFull from "../Components/HomePageComponents/PaymentPageFull";
import AdditionalDetails from "../Components/HomePageComponents/AdditionalDetails";
import ProjectVedio from "../Components/HomePageComponents/ProjectVedio";
import Fotter from "../Components/HomePageComponents/Fotter";

// NEW: Use CampaignProgressDetails for the Progress Box inside the sidebar
import CampaignProgressDetails from "../Components/HomePageComponents/CampaignProgressDetails";

// 1. Mocking the VCM style Donation Sidebar (Replacing CapaignerProgressBox)
const DonationSidebar = ({ amount, setAmount, handleClick, errorMessage, getSingleUser }) => {
    // Mock VCM Tiers (Square Feet Seva - 1 Sq Ft = 2100 INR)
    const tiers = [
        { sqft: 1, amount: 2100, label: "1 Sq Ft" },
        { sqft: 5, amount: 10500, label: "5 Sq Ft" },
        { sqft: 11, amount: 23100, label: "11 Sq Ft" },
        { sqft: 25, amount: 52500, label: "25 Sq Ft" },
    ];

    const totalDonors = getSingleUser?.campaignDetails?.totalDonors || 0;
    const isTrending = totalDonors > 100; // Mock logic

    return (
        <VStack spacing={4} align="stretch">
            {/* Header: Social Proof */}
            <Box bg="#FEF3C7" py={2} px={4} borderRadius="lg" border="1px solid #FCD34D" textAlign="center">
                <Text fontSize="sm" fontWeight="bold" color="#92400E" letterSpacing="wide">
                    {isTrending ? `🔥 TRENDING: ${totalDonors} people supported this mission!` : 'Be the first to donate today!'}
                </Text>
            </Box>

            {/* Square Feet Seva Options */}
            <Box bg="white" p={4} borderRadius="lg" boxShadow="md" border="1px solid #E2E8F0">
                <Text fontSize="xl" fontWeight="bold" color="#2C0A0A" mb={3} textAlign="center">
                    Sponsor a Square Foot
                </Text>
                <Flex gap={2} mb={4} justify="center" flexWrap="wrap">
                    {tiers.map(tier => (
                        <Button
                            key={tier.amount}
                            size="md"
                            variant={amount === tier.amount ? 'solid' : 'outline'}
                            colorScheme={amount === tier.amount ? 'red' : 'gray'}
                            onClick={() => setAmount(tier.amount)}
                            flex="1 1 auto"
                            minW="120px"
                        >
                            {tier.label}
                            <Text as="span" ml={1} fontWeight="light" color={amount === tier.amount ? 'white' : 'gray.600'}>
                                (₹{tier.amount.toLocaleString('en-IN')})
                            </Text>
                        </Button>
                    ))}
                </Flex>

                <Text fontSize="sm" fontWeight="semibold" color="gray.600" mb={2}>Or Enter Custom Amount:</Text>
                <Flex align="center" mb={4} p={2} border="1px solid" borderColor={errorMessage ? 'red.500' : 'gray.300'} borderRadius="md">
                    <Icon as={FaRupeeSign} color="gray.500" mr={2} />
                    <input
                        type="number"
                        placeholder="e.g. 5000"
                        value={amount === null || tiers.some(t => t.amount === amount) ? "" : amount}
                        onChange={(e) => setAmount(e.target.value === "" ? null : Number(e.target.value))}
                        style={{ border: 'none', outline: 'none', width: '100%', fontSize: '1.2rem', fontWeight: 'bold' }}
                    />
                </Flex>
                {errorMessage && (
                    <Text color="red.500" fontSize="sm" mb={3}>{errorMessage}</Text>
                )}

                <Button
                    w="100%" h="55px"
                    bg="#B22222" // VCM/ISKCON Maroon
                    color="white"
                    fontWeight="bold" fontSize="lg"
                    _hover={{ bg: "#8B0000" }}
                    onClick={handleClick}
                    boxShadow="0 4px 14px 0 rgba(178, 34, 34, 0.4)"
                    mt={2}
                >
                    DONATE NOW
                </Button>

                {/* Footer: Security Badge */}
                <Flex justify="center" py={3} borderTop="1px solid #EDF2F7" gap={2} mt={4}>
                    <Icon as={FaShieldAlt} color="green.500" />
                    <Text fontSize="xs" color="gray.500">Secure Payment • 80G Tax Exempt</Text>
                </Flex>
            </Box>
        </VStack>
    );
};

// 2. NEW: Campaigner's Message (VCM style content block)
const CampaignerMessage = ({ getSingleUser }) => (
    <Box bg="white" p={[4, 8]} borderRadius="xl" boxShadow="md" border="1px solid #E2E8F0">
        <Text fontSize={["xl", "2xl"]} fontWeight="extrabold" color="#2C0A0A" mb={4}>
            A Message from the Campaigner
        </Text>
        <Box
            bg="#FFF9E5" // Light Yellow/Beige Background for the quote
            p={[4, 6]}
            borderRadius="lg"
            borderLeft="4px solid #D4AF37"
            mb={6}
        >
            <Text
                fontSize={["md", "lg"]}
                fontWeight="medium"
                color="gray.700"
                fontStyle="italic"
                lineHeight="tall"
            >
                "Lord Krishna says in Bhagavad-Gita 9.27: 'Whatever you give in charity - do that as an offering to Me.' Where there is wealth, there is the mind. Please donate for square feet seva and support the construction of this grand temple."
            </Text>
        </Box>

        {/* Main Campaign Description - Using existing component logic for simplicity */}
        <CampaignMoreDetails
            campaign={campaign} getSingleUser={getSingleUser} themeColor={themeColor}
            // The CampaignMoreDetails content will need to be general, VCM-like text.
        />

        <Box mt={6} pt={4} borderTop="1px dashed #E2E8F0">
            <Text fontSize="lg" fontWeight="semibold" color="#B22222">
                "Our heartfelt gratitude for your kind support. Create a History. Leave a legacy."
            </Text>
        </Box>
    </Box>
);

// 3. NEW: VCM Style Testimonials/Social Proof Block
const TestimonialBlock = () => (
    <Box mt={8} bg="white" p={[4, 8]} borderRadius="xl" boxShadow="md" border="1px solid #E2E8F0">
        <Flex align="center" gap={3} mb={6} borderBottom="2px solid #D4AF37" pb={3}>
            <Icon as={FaHeart} color="#B22222" boxSize={6} />
            <Text fontSize={["xl", "2xl"]} fontWeight="extrabold" color="#2C0A0A">
                Voices of Support
            </Text>
        </Flex>

        <VStack spacing={4} align="stretch">
            {[{
                quote: "This is not just a temple or a skyscraper but a symbol of Indian Culture.",
                name: "Vivek Oberoi", role: "Bollywood Actor"
            }, {
                quote: "I also wish them success with the upcoming Vrindavan Chandrodaya Mandir.",
                name: "Sri Ram Nath Kovind", role: "President of India (2017-2022)"
            }, {
                quote: "I felt blissful taking part in the temple's wonderful activities...Everyone should donate.",
                name: "Sonu Sood", role: "Actor"
            }].map((t, index) => (
                <Box key={index} p={4} bg="gray.50" borderRadius="md" borderLeft="3px solid #B22222">
                    <Text fontStyle="italic" color="gray.700">"{t.quote}"</Text>
                    <Text mt={2} fontWeight="bold" color="#2C0A0A">{t.name}</Text>
                    <Text fontSize="sm" color="gray.500">{t.role}</Text>
                </Box>
            ))}
        </VStack>
        <Flex justify="center" pt={6}>
            <Button leftIcon={<FaVideo />} variant="ghost" colorScheme="red">
                Watch Testimonial Videos
            </Button>
        </Flex>
    </Box>
);


const HomeSinglePage = () => {
    const { id } = useParams();
    // const [tab, setTab] = useState(1); // Removing tabs as per VCM long-scroll design
    const [showScrollButton, setShowScrollButton] = useState(false);
    const { isLoading, getSingleUser } = useSelector((state) => state.clientUsers);
    const dispatch = useDispatch();
    const donationSectionRef = useRef(null);

    const [amount, setAmount] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [paymentModel, setPaymentModel] = useState(false);
    const [errors, setErrors] = useState("");
    const navigate = useNavigate();

    const isMobile = useBreakpointValue({ base: true, lg: false });

    // Existing Form Data logic (kept as is)
    const [formData, setFormData] = useState({
        email: "", mobileno: "", country: "Indian", pincode: "", panno: "",
        address: "", taxPincode: "", houseNumber: "", city: "", state: "",
        street: "", dob: "", amount: amount, username: "", campaignsid: id,
        prasadRequired: false, taxExemption: false, isanonymous: false,
        taxCity: "", taxState: "", taxHouseNumber: "", taxStreet: "",
    });

    // Existing useEffect and Handlers (kept as is, including imageError/handleImageError which I'll keep for completeness)
    useEffect(() => { dispatch(fetchSingleUser(id)); }, [dispatch, id]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        const handleScroll = () => setShowScrollButton(window.scrollY > 300);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleMobileDonateClick = () => {
        if(donationSectionRef.current) {
            donationSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleClick = () => {
        if (amount === null) return setErrorMessage("Please enter an amount");
        if (amount < 500) return setErrorMessage("Minimum contribution amount is INR 500");
        setErrorMessage("");
        setPaymentModel(true);
        setFormData(prev => ({ ...prev, amount: amount, campaignsid: id }));
    };

    const validateForm = () => { const newErrors = {}; if (!formData.amount) newErrors.amount = "Amount is required"; setErrors(newErrors); return Object.keys(newErrors).length === 0; };
    const handleOnChange = (e) => { const { name, value, type, checked } = e.target; setFormData({ ...formData, [name]: type === "checkbox" ? checked : value }); };
    const handleSubmit = (e) => { e.preventDefault(); if (validateForm()) { dispatch(postPaymentFormData(formData)).then((res) => { const orderId = res?.payload?.order?.id; if (orderId) { const params = new URLSearchParams({ name: formData.username || '', phone: formData.mobileno || '', email: formData.email || '', seva: 'Mandir Nirmana Seva', amount: formData.amount, order_id: orderId }); navigate(`/payment/${orderId}?${params.toString()}`); } }); } };

    const [imageError, setImageError] = useState(false);
    const handleImageError = () => setImageError(true);
    const handleScrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    if (getSingleUser.status === 404) return <PageNotFound />;

    if(paymentModel){
        return(
            <PaymentPageFull
                amount={amount} handleSubmit={handleSubmit} handleOnChange={handleOnChange}
                formData={formData} errors={errors} setPaymentModel={setPaymentModel} setFormData={setFormData}
            />
        );
    }

    const currentAmount = getSingleUser?.campaignDetails?.currentAmount || 0;
    const goalAmount = getSingleUser?.campaignDetails?.goalAmount || 5000000; // Mocked goal


    return (
        // New: VCM-style clean background
        <Box w={"100%"} position={"relative"} bg="#F8F8F8" minH="100vh" fontFamily="system-ui, sans-serif">

            {/* Sticky Mobile CTA (Adapted for new style) */}
            {isMobile && !paymentModel && (
                <Box
                    position="fixed" bottom="0" left="0" w="100%"
                    bg="#B22222" p={3}
                    zIndex="999" boxShadow="0px -4px 20px rgba(0,0,0,0.1)"
                >
                    <Button
                        w="100%" h="45px"
                        bg="white"
                        color="#B22222"
                        fontWeight="bold" fontSize="lg"
                        _hover={{ bg: "gray.100" }}
                        onClick={handleMobileDonateClick}
                    >
                        SUPPORT THE MISSION - DONATE NOW
                    </Button>
                </Box>
            )}

            {showScrollButton && (
                <IconButton
                    icon={<FaArrowUp />} position={"fixed"} bottom={["70px", "50px"]} right={"20px"} zIndex={"10"}
                    bg="#B22222" color="white" onClick={handleScrollToTop} borderRadius="full" boxShadow="xl"
                    _hover={{ bg: "#8B0000" }}
                />
            )}

            {isLoading && (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh" position={"fixed"} w={"100%"} bgColor={"rgb(0,0,0,0.6)"} zIndex={10}>
                    <DottedAnimation />
                </Box>
            )}

            {/* 1. Header Block (Campaigner Title/Profile) */}
            <DetailPageHeaderNew getSingleUser={getSingleUser} />

            {/* 2. Main Content & Sidebar */}
            <Flex
                w="100%" maxW="1200px" mx="auto" my={["1rem", "2rem"]}
                direction={["column", "column", "column", "row"]}
                alignItems="flex-start" px={["0", "1rem", "2rem"]} gap={8}
            >

                {/* RIGHT COLUMN: The Sticky Donation Sidebar */}
                <Box
                    ref={donationSectionRef}
                    w={["100%", "100%", "100%", "420px"]}
                    px={["1rem", 0]}
                    mb={isMobile ? 20 : 0} // Add mobile spacing
                    position="relative"
                    zIndex={2}
                    order={[2, 2, 2, 1]} // Move sidebar to the start in desktop view
                >
                    <Box
                        position={["static", "static", "static", "sticky"]}
                        top="20px"
                        borderRadius="2xl"
                        // The inner components handle their own white background/shadow, keep the wrapper minimal
                    >
                        {/* Progress Bar (VCM style) */}
                        <Box mb={6} id="donation-section"> {/* Added ID for scroll target */}
                            <CampaignProgressDetails currentAmount={currentAmount} goalAmount={goalAmount} />
                        </Box>

                        {/* Donation Box (VCM style) */}
                        <DonationSidebar
                            amount={amount}
                            setAmount={setAmount}
                            handleClick={handleClick}
                            errorMessage={errorMessage}
                            getSingleUser={getSingleUser}
                        />

                        {/* Additional Details (Certificates etc.) */}
                        <Box mt={6}>
                            <AdditionalDetails getSingleUser={getSingleUser} />
                        </Box>

                    </Box>
                </Box>

                {/* LEFT COLUMN: Story & Content */}
                <Box flex="1.4" w="100%" order={[1, 1, 1, 2]} px={["1rem", 0]}>

                    {/* Campaigner Message & Story (Replaced PhotoWithDescription/CampaignMoreDetails) */}
                    <CampaignerMessage getSingleUser={getSingleUser} />

                    {/* Banner Placement (Adapted to be part of the flow) */}
                    <Box mt={8} borderRadius="xl" overflow="hidden" boxShadow="md" border="1px solid #E2E8F0">
                        <Image
                            src={BannerImage}
                            w="100%"
                            alt="Mandir Nirman Seva Banner"
                            display="block"
                        />
                    </Box>

                    {/* Project Video */}
                    <Box mt={8}>
                        <ProjectVedio />
                    </Box>

                    {/* Testimonials Block (NEW VCM-style section) */}
                    <TestimonialBlock />

                    {/* Funders/Donors (Replacing the old 'Funders' tab) */}
                    <Box mt={8} bg="white" p={[4, 8]} borderRadius="xl" boxShadow="md" border="1px solid #E2E8F0">
                        <Flex align="center" gap={3} mb={6} borderBottom="2px solid #D4AF37" pb={3}>
                            <Icon as={FaLandmark} color="#B22222" boxSize={6} />
                            <Text fontSize={["xl", "2xl"]} fontWeight="extrabold" color="#2C0A0A">
                                Latest Supporters
                            </Text>
                        </Flex>
                        {/* Rendering the Funders component as a section */}
                        <Funders getSingleUser={getSingleUser} />
                    </Box>

                </Box>
            </Flex>

            <Fotter />
        </Box>
    );
};

export default HomeSinglePage;