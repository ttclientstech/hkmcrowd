import React, { useEffect, useState, useRef } from "react"; // Added useRef
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSingleUser, postPaymentFormData } from "../Redux/clientSlices/clientUsers";
import image16 from "../assets/images/logo.jpeg";
import avatar from "../assets/images/Avatar-PNG-Image.webp";
// IMPORT THE BANNER
import BannerImage from "../assets/images/mandir_nirman_seva_banner.png";

import {
    Box, IconButton, Flex, Button, useBreakpointValue, Text, Icon, Image
} from "@chakra-ui/react";
import { FaArrowUp, FaShieldAlt, FaLandmark, FaOm } from "react-icons/fa";

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

// 1. Trust Strip Component
const TrustStrip = () => (
    <Box w="100%" bg="#FAF3E0" borderBottom="1px solid #E2E8F0" py={3}>
        <Flex
            maxW="1200px"
            mx="auto"
            justify={["center", "center", "flex-start"]}
            gap={[4, 8, 12]}
            flexWrap="wrap"
            px={4}
        >
            <Flex align="center" gap={2}>
                <Icon as={FaShieldAlt} color="#D4AF37" />
                <Text fontSize="xs" fontWeight="bold" color="#5D4037" textTransform="uppercase" letterSpacing="wide">
                    100% Secure
                </Text>
            </Flex>
            <Flex align="center" gap={2}>
                <Icon as={FaLandmark} color="#D4AF37" />
                <Text fontSize="xs" fontWeight="bold" color="#5D4037" textTransform="uppercase" letterSpacing="wide">
                    80G Tax Exempt
                </Text>
            </Flex>
            <Flex align="center" gap={2}>
                <Icon as={FaOm} color="#D4AF37" />
                <Text fontSize="xs" fontWeight="bold" color="#5D4037" textTransform="uppercase" letterSpacing="wide">
                    Vedic Heritage Project
                </Text>
            </Flex>
        </Flex>
    </Box>
);

const HomeSinglePage = () => {
    const { id } = useParams();
    const [tab, setTab] = useState(1);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const { isLoading, getSingleUser } = useSelector((state) => state.clientUsers);
    const dispatch = useDispatch();

    // REF FOR MOBILE SCROLLING
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

    // FIX: Scroll to the Donation Box (ref) instead of top
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
        <Box w={"100%"} position={"relative"} bg="#F9F5F0" minH="100vh">

            {/* Sticky Mobile CTA */}
            {isMobile && !paymentModel && (
                <Box
                    position="fixed" bottom="0" left="0" w="100%"
                    bg="white" p={4} borderTop="1px solid #E2E8F0"
                    zIndex="999" boxShadow="0px -4px 20px rgba(0,0,0,0.1)"
                >
                    <Button
                        w="100%" h="55px"
                        bgGradient="linear(to-r, #D4AF37, #FFD700)"
                        color="#2C0A0A"
                        fontWeight="800" fontSize="lg"
                        fontFamily="'Cinzel', serif"
                        onClick={handleMobileDonateClick} // CHANGED: Calls the new scroll function
                        _active={{ transform: "scale(0.98)" }}
                    >
                        OFFER SEVA NOW
                    </Button>
                </Box>
            )}

            {showScrollButton && (
                <IconButton
                    icon={<FaArrowUp />} position={"fixed"} bottom={["80px", "50px"]} right={"20px"} zIndex={"10"}
                    bg="#2C0A0A" color="#D4AF37" onClick={handleScrollToTop} borderRadius="full" boxShadow="xl" border="1px solid #D4AF37"
                />
            )}

            {isLoading && (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh" position={"fixed"} w={"100%"} bgColor={"rgb(0,0,0,0.6)"} zIndex={10}>
                    <DottedAnimation />
                </Box>
            )}

            {/* New Premium Header (No Background Image) */}
            <DetailPageHeader themeColor={themeColor} getSingleUser={getSingleUser} image16={image16} />

            <TrustStrip />

            <Flex
                w="100%" maxW="1200px" mx="auto" my={["1rem", "2rem"]}
                direction={["column", "column", "column", "row"]}
                alignItems="flex-start" px={["0", "1rem", "2rem"]} gap={8}
            >
                {/* LEFT COLUMN: Story, Banner, Video */}
                <Box flex="1.4" w="100%">

                    {/* 1. Personal Story Card */}
                    <Box borderRadius="xl" overflow="hidden" boxShadow="xl" border="1px solid #E2E8F0" bg="white">
                        <PhotoWithDescription getSingleUser={getSingleUser} imageError={imageError} handleImageError={handleImageError} avatar={avatar} />
                    </Box>

                    {/* 2. Banner Placement (Visual Break) */}
                    <Box mt={6} borderRadius="xl" overflow="hidden" boxShadow="md">
                        <Image
                            src={BannerImage}
                            w="100%"
                            alt="Mandir Nirman Seva Banner"
                            transition="all 0.3s"
                            _hover={{transform: "scale(1.01)"}}
                        />
                    </Box>

                    {/* 3. Additional Details (Visible on Mobile only here) */}
                    <Box mt={6} display={["none", "block"]}>
                        <AdditionalDetails getSingleUser={getSingleUser} />
                    </Box>

                    {/* 4. Video */}
                    <Box mt={6}>
                        <ProjectVedio />
                    </Box>

                    {/* 5. Tabs */}
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

                {/* RIGHT COLUMN: Donation Box (Sticky on Desktop, Bottom on Mobile) */}
                {/* Added ref={donationSectionRef} here for the mobile scroll target */}
                <Box
                    ref={donationSectionRef}
                    w={["100%", "100%", "100%", "420px"]}
                    px={["1rem", 0]}
                    mb={24}
                    position="relative"
                >
                    <CapaignerProgressBox
                        getSingleUser={getSingleUser} setAmount={setAmount} handleClick={handleClick}
                        errorMessage={errorMessage} amount={amount}
                    />

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