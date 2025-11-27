import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSingleUser, postPaymentFormData } from "../Redux/clientSlices/clientUsers";
import avatar from "../assets/images/Avatar-PNG-Image.webp";
import BannerImage from "../assets/images/mandir_nirman_seva_banner.png";
import bgImage from "../assets/images/002_temple_night_view.jpeg";

import {
    Box, Button, Text, Icon, Image,
    Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, useDisclosure,
    Progress, Flex, IconButton
} from "@chakra-ui/react";
import { FaHandHoldingHeart, FaCheckCircle, FaArrowUp } from "react-icons/fa";

import DottedAnimation from "../Components/DottedAnimation";
import PageNotFound from "../Components/HomePageComponents/PageNotFound";
import CampaignMoreDetails from "../Components/HomePageComponents/CampaingMoreDetails";
import Funders from "../Components/HomePageComponents/Funders";
import { campaign } from "../constants/homePage";
import CapaignerProgressBox from "../Components/HomePageComponents/CapaignerProgressBox";
import PaymentPageFull from "../Components/HomePageComponents/PaymentPageFull";
import PhotoWithDescription from "../Components/HomePageComponents/PhotoWithDescription";
import AdditionalDetails from "../Components/HomePageComponents/AdditionalDetails";
import CampaignTabs from "../Components/HomePageComponents/Tabs";
import ProjectVedio from "../Components/HomePageComponents/ProjectVedio";
import Fotter from "../Components/HomePageComponents/Fotter";
import { themeColor } from "../Components/utils";

// --- VCM STYLE STATS (Exact Replica) ---
const VCMStats = ({ getSingleUser }) => {
    const SQ_FT_COST = 5001;
    const raisedAmount = getSingleUser?.campaignDetails?.raisedAmount || 0;
    const targetAmount = getSingleUser?.campaignDetails?.targetAmount || 100000;

    const raisedSqFt = (raisedAmount / SQ_FT_COST).toFixed(0);
    const targetSqFt = (targetAmount / SQ_FT_COST).toFixed(0);
    const percentage = Math.min((raisedAmount / targetAmount) * 100, 100);

    return (
        <Box
            mt={6}
            bg="rgba(20, 20, 20, 0.8)" // Darker background for stats pop
            backdropFilter="blur(10px)"
            borderRadius="xl"
            border="1px solid rgba(255,255,255,0.1)"
            p={6}
            textAlign="center"
        >
            <Flex justify="center" align="baseline" gap={2} mb={1}>
                <Text fontSize={["2xl", "3xl"]} fontWeight="bold" color="#D4AF37">
                    {percentage.toFixed(1)}% Raised
                </Text>
            </Flex>

            <Text fontSize="md" color="white" mb={4}>
                <Text as="span" fontWeight="bold">{raisedSqFt}</Text> Square Feet raised out of a goal of <Text as="span" fontWeight="bold">{targetSqFt}</Text> Square Feet
            </Text>

            <Progress
                value={percentage}
                size="md"
                colorScheme="yellow" // Gold Bar
                trackColor="rgba(255,255,255,0.2)"
                borderRadius="full"
                hasStripe isAnimated
                mb={4}
            />
        </Box>
    );
};

const HomeSinglePage = () => {
    const { id } = useParams();
    const { isLoading, getSingleUser } = useSelector((state) => state.clientUsers);
    const dispatch = useDispatch();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [amount, setAmount] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [paymentModel, setPaymentModel] = useState(false);
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState("");
    const navigate = useNavigate();

    const isMobile = useBreakpointValue({ base: true, lg: false });
    const [tab, setTab] = useState(1);
    const [showScrollButton, setShowScrollButton] = useState(false);

    useEffect(() => { dispatch(fetchSingleUser(id)); }, [dispatch, id]);
    useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

    const handleClick = () => {
        if (amount === null) return setErrorMessage("Please enter an amount");
        if (amount < 500) return setErrorMessage("Min donation is ₹500");
        setErrorMessage("");
        setPaymentModel(true);
        setFormData(prev => ({ ...prev, amount: amount, campaignsid: id }));
        onClose();
    };

    const validateForm = () => { const newErrors = {}; if (!formData.amount) newErrors.amount = "Amount is required"; setErrors(newErrors); return Object.keys(newErrors).length === 0; };
    const handleOnChange = (e) => { const { name, value, type, checked } = e.target; setFormData({ ...formData, [name]: type === "checkbox" ? checked : value }); };
    const handleSubmit = (e) => { e.preventDefault(); if (validateForm()) { dispatch(postPaymentFormData(formData)).then((res) => { const orderId = res?.payload?.order?.id; if (orderId) { const params = new URLSearchParams({ name: formData.username || '', phone: formData.mobileno || '', email: formData.email || '', seva: 'Mandir Nirmana Seva', amount: formData.amount, order_id: orderId }); navigate(`/payment/${orderId}?${params.toString()}`); } }); } };

    const [imageError, setImageError] = useState(false);
    const handleImageError = () => setImageError(true);
    const handleScrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    if (getSingleUser.status === 404) return <PageNotFound />;
    if(paymentModel) return <PaymentPageFull amount={amount} handleSubmit={handleSubmit} handleOnChange={handleOnChange} formData={formData} errors={errors} setPaymentModel={setPaymentModel} setFormData={setFormData} />;

    return (
        <Box w={"100%"} minH="100vh" fontFamily="system-ui, sans-serif" bg="black" color="white">

            {/* 1. FIXED TEMPLE BACKGROUND (Matches VCM Style) */}
            {/* Keeping this as VCM pages have a fixed/parallax background */}
            <Box
                position="fixed" top="0" left="0" w="100%" h="100%"
                backgroundImage={`url(${bgImage})`}
                backgroundSize="cover"
                backgroundPosition="center"
                zIndex="0"
                opacity="0.5" // Darkened for content readability
            />
            {/* Gradient Overlay */}
            <Box position="fixed" top="0" left="0" w="100%" h="100%" bgGradient="linear(to-b, rgba(0,0,0,0.6), rgba(0,0,0,0.9))" zIndex="0" />

            {/* Scroll to Top */}
            {showScrollButton && (
                <IconButton
                    icon={<FaArrowUp />} position={"fixed"} bottom={["80px", "50px"]} right={"20px"} zIndex={"100"}
                    bg="#D4AF37" color="black" onClick={handleScrollToTop} borderRadius="full" boxShadow="xl"
                />
            )}

            {isLoading && <Box display="flex" justifyContent="center" alignItems="center" height="100vh" position={"fixed"} w={"100%"} zIndex={10}><DottedAnimation /></Box>}

            {/* MAIN CONTENT */}
            <Box position="relative" zIndex={1} maxW="900px" mx="auto" pt={["2rem", "4rem"]} px={4} pb={20}>

                {/* A. CAMPAIGNER HERO (Includes Headline & Pledge) */}
                <PhotoWithDescription getSingleUser={getSingleUser} imageError={imageError} handleImageError={handleImageError} avatar={avatar} />

                {/* B. STATS SECTION */}
                <VCMStats getSingleUser={getSingleUser} />

                {/* C. MAIN DONATE BUTTON (VCM Style) */}
                <Box mt={8} textAlign="center">
                    <Button
                        w="100%" h="65px"
                        bgGradient="linear(to-r, #D4AF37, #F6E05E)"
                        color="#2C0A0A"
                        fontSize="2xl" fontWeight="800" letterSpacing="wide"
                        textTransform="uppercase"
                        boxShadow="0 0 30px rgba(212, 175, 55, 0.5)"
                        _hover={{ transform: "scale(1.02)", boxShadow: "0 0 50px rgba(212, 175, 55, 0.7)" }}
                        onClick={onOpen}
                        borderRadius="md" // VCM uses slightly rounded, not full circle sometimes
                    >
                        Donate Now
                    </Button>
                    <Text mt={3} fontSize="sm" color="gray.400">
                        <Icon as={FaCheckCircle} color="green.400" mr={1} />
                        Tax Exemption (80G) Available
                    </Text>
                </Box>

                {/* D. VISION BANNER */}
                <Box mt={12} borderRadius="xl" overflow="hidden" border="1px solid rgba(255,255,255,0.2)" boxShadow="2xl">
                    <Image src={BannerImage} w="100%" opacity="0.95" />
                    <Box bg="rgba(0,0,0,0.8)" p={3} textAlign="center">
                        <Text fontFamily="'Cinzel', serif" color="#D4AF37" fontSize="sm" letterSpacing="widest">
                            DAKSHINA DWARAKA CULTURAL COMPLEX
                        </Text>
                    </Box>
                </Box>

                {/* E. TABS SECTION (Transparent) */}
                <Box mt={12} bg="rgba(20,20,20,0.6)" backdropFilter="blur(10px)" borderRadius="xl" p={[4, 6]} border="1px solid rgba(255,255,255,0.1)">
                    <CampaignTabs tab={tab} setTab={setTab} />
                    <Box mt={6} color="gray.300">
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

            {/* STICKY MOBILE BUTTON */}
            {isMobile && (
                <Box
                    position="fixed" bottom="0" left="0" w="100%"
                    bg="rgba(20, 20, 20, 0.95)" p={4} borderTop="1px solid #D4AF37"
                    backdropFilter="blur(10px)" zIndex={100}
                >
                    <Button
                        w="100%" h="50px"
                        bg="#D4AF37" color="black" fontWeight="bold" fontSize="lg"
                        onClick={onOpen}
                    >
                        DONATE NOW
                    </Button>
                </Box>
            )}

            <Fotter />

            {/* DONATION MODAL */}
            <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
                <ModalOverlay bg="rgba(0,0,0,0.9)" backdropFilter="blur(5px)" />
                <ModalContent bg="#F7FAFC" borderRadius="xl" borderTop="4px solid #D4AF37">
                    <ModalCloseButton />
                    <ModalBody p={0}>
                        <Box bg="#1A202C" p={4} textAlign="center">
                            <Text color="#D4AF37" fontWeight="bold" fontFamily="'Cinzel', serif" letterSpacing="wide">
                                MAKE YOUR OFFERING
                            </Text>
                        </Box>
                        <Box p={2}>
                            <CapaignerProgressBox
                                getSingleUser={getSingleUser}
                                setAmount={setAmount}
                                handleClick={handleClick}
                                errorMessage={errorMessage}
                                amount={amount}
                            />
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>

        </Box>
    );
};

export default HomeSinglePage;