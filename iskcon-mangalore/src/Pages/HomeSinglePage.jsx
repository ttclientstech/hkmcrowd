import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSingleUser, postPaymentFormData } from "../Redux/clientSlices/clientUsers";
import image16 from "../assets/images/logo.jpeg";
import avatar from "../assets/images/Avatar-PNG-Image.webp";
import BannerImage from "../assets/images/mandir_nirman_seva_banner.png";

import {
    Box, IconButton, Flex, Button, useBreakpointValue, Text, Icon, Image, Progress, Badge
} from "@chakra-ui/react";
import { FaArrowUp, FaShieldAlt, FaLandmark, FaUserFriends, FaClock, FaMapMarkerAlt } from "react-icons/fa";

import DottedAnimation from "../Components/DottedAnimation";
import { themeColor } from "../Components/utils";
import PageNotFound from "../Components/HomePageComponents/PageNotFound";
import CampaignMoreDetails from "../Components/HomePageComponents/CampaingMoreDetails";
import Funders from "../Components/HomePageComponents/Funders";
import { campaign } from "../constants/homePage";
import CapaignerProgressBox from "../Components/HomePageComponents/CapaignerProgressBox";
import DetailPageHeader from "../Components/HomePageComponents/DetailPageHeader";
import PaymentPageFull from "../Components/HomePageComponents/PaymentPageFull";
import PhotoWithDescription from "../Components/HomePageComponents/PhotoWithDescription";
import AdditionalDetails from "../Components/HomePageComponents/AdditionalDetails";
import CampaignTabs from "../Components/HomePageComponents/Tabs";
import ProjectVedio from "../Components/HomePageComponents/ProjectVedio";
import Fotter from "../Components/HomePageComponents/Fotter";

// 1. MODERN TRUST STRIP (Tech/Startup Vibe)
const TrustStrip = () => (
    <Box w="100%" bg="#fff9e5" borderBottom="1px solid #E2E8F0" py={4}>
        <Flex
            maxW="1200px"
            mx="auto"
            justify={["center", "center", "flex-start"]}
            gap={[4, 8, 12]}
            flexWrap="wrap"
            px={4}
        >
            {/* Using Blue/Grey colors for Trust instead of Gold */}
            <Flex align="center" gap={2}>
                <Icon as={FaMapMarkerAlt} color="#2B6CB0" />
                <Text fontSize="xs" fontWeight="700" color="gray.600" textTransform="uppercase">
                    Thiruvanmiyur,Chennai
                </Text>
            </Flex>
            <Flex align="center" gap={2}>
                <Icon as={FaUserFriends} color="#2B6CB0" />
                <Text fontSize="xs" fontWeight="700" color="gray.600" textTransform="uppercase">
                    5,000+ Supporters
                </Text>
            </Flex>
            <Flex align="center" gap={2}>
                <Icon as={FaLandmark} color="#2B6CB0" />
                <Text fontSize="xs" fontWeight="700" color="gray.600" textTransform="uppercase">
                    Tax Benefits (80G)
                </Text>
            </Flex>
        </Flex>
    </Box>
);

// 2. URGENCY NOTIFICATION BAR (Psychological Hack)
const UrgencyBar = () => (
    <Box bg="#2D3748" w="100%" py={2} px={4}>
        <Flex maxW="1200px" mx="auto" justify="center" align="center" gap={2}>
            <Icon as={FaClock} color="#F97316" /> {/* Urgent Orange */}
            <Text color="white" fontSize="sm" fontWeight="bold">
                Donate <Text as="span" color="#F97316">1 SQFT</Text> & Receive Maha Prasadam at your home
            </Text>
        </Flex>
    </Box>
);

const HomeSinglePage = () => {
    const { id } = useParams();
    const [tab, setTab] = useState(1);
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

    const [formData, setFormData] = useState({
        email: "", mobileno: "", country: "Indian", pincode: "", panno: "",
        address: "", taxPincode: "", houseNumber: "", city: "", state: "",
        street: "", dob: "", amount: amount, username: "", campaignsid: id,
        prasadRequired: false, taxExemption: false, isanonymous: false,
        taxCity: "", taxState: "", taxHouseNumber: "", taxStreet: "",
    });

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

    return (
        // 3. CLEAN BACKGROUND (Corporate/Modern) - No textures, just clean Grey/White
        <Box w={"100%"} position={"relative"} bg="#F7FAFC" minH="100vh" fontFamily="system-ui, sans-serif">

            {/* Sticky Mobile CTA - High Contrast */}
            {isMobile && !paymentModel && (
                <Box
                    position="fixed" bottom="0" left="0" w="100%"
                    bg="white" p={4} borderTop="1px solid #E2E8F0"
                    zIndex="999" boxShadow="0px -4px 20px rgba(0,0,0,0.1)"
                >
                    <Button
                        w="100%" h="55px"
                        bg="#F97316" // Urgent Orange
                        color="white"
                        fontWeight="bold" fontSize="lg"
                        _hover={{ bg: "#DD6B20" }}
                        _active={{ transform: "scale(0.98)" }}
                        onClick={handleMobileDonateClick}
                        boxShadow="0 4px 14px 0 rgba(249, 115, 22, 0.39)"
                    >
                        SUPPORT THE MISSION
                    </Button>
                </Box>
            )}

            {showScrollButton && (
                <IconButton
                    icon={<FaArrowUp />} position={"fixed"} bottom={["80px", "50px"]} right={"20px"} zIndex={"10"}
                    bg="gray.800" color="white" onClick={handleScrollToTop} borderRadius="full" boxShadow="xl"
                    _hover={{ bg: "black" }}
                />
            )}

            {isLoading && (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh" position={"fixed"} w={"100%"} bgColor={"rgb(0,0,0,0.6)"} zIndex={10}>
                    <DottedAnimation />
                </Box>
            )}

            <UrgencyBar />

            <DetailPageHeader themeColor={themeColor} getSingleUser={getSingleUser} image16={image16} />

            <TrustStrip />

            <Flex
                w="100%" maxW="1200px" mx="auto" my={["1rem", "2rem"]}
                direction={["column", "column", "column", "row"]}
                alignItems="flex-start" px={["0", "1rem", "2rem"]} gap={8}
            >
                {/* LEFT COLUMN: Story & Content */}
                <Box flex="1.4" w="100%">

                    <Box
                        borderRadius="xl"
                        overflow="hidden"
                        boxShadow="lg"
                        bg="white"
                        transition="transform 0.2s"
                        _hover={{ boxShadow: "2xl" }}
                    >
                        <PhotoWithDescription getSingleUser={getSingleUser} imageError={imageError} handleImageError={handleImageError} avatar={avatar} />
                    </Box>

                    {/* 2. Banner Placement with Top Header */}
                    <Box
                        mt={8}
                        borderRadius="xl"
                        overflow="hidden"
                        boxShadow="xl"
                        bg="#2C0A0A" // Ensures consistent background
                    >
                        {/* 1. Solid Top Text Strip (Placed Above Image) */}
                        <Box
                            bg="#2C0A0A" // Deep Mahogany to match Header/Theme
                            py={3}
                            px={4}
                            textAlign="center"
                            borderBottom="1px solid #D4AF37" // Subtle Gold separator line
                        >
                            <Text
                                color="#F9F5F0"
                                fontSize={["xs", "sm", "md"]}
                                fontWeight="500"
                                letterSpacing="wide"
                                fontFamily="'Cinzel', serif"
                                lineHeight="1.5"
                            >
                                A fundraising initiative for the construction of Chennai's tallest <br/>
                                <Text as="span" fontWeight="bold" color="#D4AF37">Cultural Complex & Temple of Lord Sri Krishna</Text>
                            </Text>
                        </Box>

                        {/* 2. Banner Image (Placed Below) */}
                        <Image
                            src={BannerImage}
                            w="100%"
                            alt="Mandir Nirman Seva Banner"
                            transition="all 0.5s ease"
                            _hover={{ transform: "scale(1.01)" }}
                            display="block" // Prevents image gap
                        />
                    </Box>

                    <Box mt={6} display={["none", "block"]}>
                        <AdditionalDetails getSingleUser={getSingleUser} />
                    </Box>

                    <Box mt={6}>
                        <ProjectVedio />
                    </Box>

                    <Box mt={8}>
                        <CampaignTabs tab={tab} setTab={setTab} />
                        <Box bg="white" p={[4, 8]} borderRadius="xl" boxShadow="sm" border="1px solid #E2E8F0" mt={0} borderTopLeftRadius="0">
                            {tab === 1 ? (
                                <CampaignMoreDetails
                                    campaign={campaign} getSingleUser={getSingleUser} themeColor={themeColor}
                                    handleImageError={handleImageError} avatar={avatar} imageError={imageError}
                                />
                            ) : (
                                <Funders getSingleUser={getSingleUser} />
                            )}
                        </Box>
                    </Box>
                </Box>

                {/* RIGHT COLUMN: The "Investment" Deck */}
                <Box
                    ref={donationSectionRef}
                    w={["100%", "100%", "100%", "420px"]}
                    px={["1rem", 0]}
                    mb={24}
                    position="relative"
                    zIndex={2}
                >
                    {/* 4. FLOATING ACTION CARD (High Conversion Design) */}
                    <Box
                        position={["static", "static", "static", "sticky"]}
                        top="20px"
                        bg="white"
                        borderRadius="2xl"
                        boxShadow="0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" // Deep "Float" shadow
                        border="1px solid"
                        borderColor="gray.100"
                        overflow="hidden"
                    >
                        {/* Header: Social Proof */}
                        <Box bg="#EFF6FF" py={3} px={4} borderBottom="1px solid #BFDBFE">
                            <Text fontSize="xs" fontWeight="bold" color="#1E40AF" letterSpacing="wide">
                                🚀 TRENDING: 24 people donated this hour
                            </Text>
                        </Box>

                        <Box p={2}>
                            <CapaignerProgressBox
                                getSingleUser={getSingleUser} setAmount={setAmount} handleClick={handleClick}
                                errorMessage={errorMessage} amount={amount}
                            />
                        </Box>

                        {/* Footer: Security Badge */}
                        <Flex justify="center" py={3} bg="gray.50" borderTop="1px solid #EDF2F7" gap={2}>
                            <Icon as={FaShieldAlt} color="green.500" />
                            <Text fontSize="xs" color="gray.500">Secure Payment • 80G Tax Exempt</Text>
                        </Flex>
                    </Box>

                    <Box mt={6} display={["block", "none"]}>
                        <AdditionalDetails getSingleUser={getSingleUser} />
                    </Box>
                </Box>
            </Flex>

            <Fotter />
        </Box>
    );
};

export default HomeSinglePage;