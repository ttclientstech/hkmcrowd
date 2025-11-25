import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSingleUser, postPaymentFormData } from "../Redux/clientSlices/clientUsers";
import {
    Box, Flex, Text, Button, Icon, Image, SimpleGrid,
    useBreakpointValue, Badge, VStack, HStack, Progress,
    Tabs, TabList, TabPanels, Tab, TabPanel, Avatar
} from "@chakra-ui/react";
import {
    FaHandHoldingHeart, FaBuilding, FaCrown, FaCheckCircle,
    FaQuoteLeft, FaArrowRight, FaShareAlt, FaWhatsapp
} from "react-icons/fa";

// Components
import PageNotFound from "../Components/HomePageComponents/PageNotFound";
import DottedAnimation from "../Components/DottedAnimation";
import PaymentPageFull from "../Components/HomePageComponents/PaymentPageFull";
import Fotter from "../Components/HomePageComponents/Fotter";
import ProjectVedio from "../Components/HomePageComponents/ProjectVedio";
import Funders from "../Components/HomePageComponents/Funders";
import CampaignTabs from "../Components/HomePageComponents/Tabs";
import DetailPageHeader from "../Components/HomePageComponents/DetailPageHeader"; // Keep your header or use the one we improved

// Assets (Using the files you provided)
import bannerImage from "../assets/images/mandir_nirman_seva_banner.png";
import constructionImg from "../assets/images/008_Construction_of_the_temple_phase1.png";
import logo from "../assets/images/logo.jpeg";

// --- SUB-COMPONENT: DONATION TIERS (The Core Psychological Hack) ---
const DonationTierCard = ({ icon, title, amount, desc, color, onClick, isSelected }) => (
    <Box
        as="button"
        onClick={() => onClick(amount)}
        w="100%"
        bg={isSelected ? `${color}.50` : "white"}
        border="1px solid"
        borderColor={isSelected ? `${color}.500` : "gray.200"}
        borderRadius="xl"
        p={4}
        textAlign="left"
        transition="all 0.3s"
        _hover={{ transform: "translateY(-4px)", boxShadow: "lg", borderColor: `${color}.400` }}
        position="relative"
        overflow="hidden"
    >
        {isSelected && (
            <Box position="absolute" top="0" right="0" bg={`${color}.500`} color="white" px={2} py={0.5} borderBottomLeftRadius="md" fontSize="xs" fontWeight="bold">
                SELECTED
            </Box>
        )}
        <Flex justify="space-between" align="center" mb={2}>
            <Icon as={icon} w={6} h={6} color={`${color}.500`} />
            <Text fontSize="lg" fontWeight="800" color="gray.700">₹{amount.toLocaleString()}</Text>
        </Flex>
        <Text fontSize="md" fontWeight="bold" color="#2C0A0A" mb={1}>{title}</Text>
        <Text fontSize="xs" color="gray.500" lineHeight="1.4">{desc}</Text>
    </Box>
);

const HomeSinglePage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, getSingleUser } = useSelector((state) => state.clientUsers);

    // State
    const [amount, setAmount] = useState(null); // Default null to force choice
    const [paymentModel, setPaymentModel] = useState(false);
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState("");

    // Refs
    const donationSectionRef = useRef(null);
    const isMobile = useBreakpointValue({ base: true, lg: false });

    // Initial Data
    useEffect(() => { dispatch(fetchSingleUser(id)); }, [dispatch, id]);

    // Handlers
    const scrollToDonate = () => donationSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

    const handleTierClick = (val) => {
        setAmount(val);
        // Optional: Auto-scroll to confirmation or highlight "Next" button
    };

    const handlePaymentInit = () => {
        if (!amount || amount < 100) {
            alert("Please select a valid contribution.");
            return;
        }
        setFormData(prev => ({ ...prev, amount: amount, campaignsid: id }));
        setPaymentModel(true);
    };

    const handleOnChange = (e) => { const { name, value, type, checked } = e.target; setFormData({ ...formData, [name]: type === "checkbox" ? checked : value }); };
    const handleSubmit = (e) => { e.preventDefault(); dispatch(postPaymentFormData(formData)).then((res) => { const orderId = res?.payload?.order?.id; if (orderId) { const params = new URLSearchParams({ name: formData.username || '', phone: formData.mobileno || '', email: formData.email || '', seva: 'Mandir Nirmana Seva', amount: formData.amount, order_id: orderId }); navigate(`/payment/${orderId}?${params.toString()}`); } }); };

    if (isLoading) return <Box h="100vh" bg="black"><DottedAnimation /></Box>;
    if (getSingleUser.status === 404) return <PageNotFound />;
    if (paymentModel) return <PaymentPageFull amount={amount} handleSubmit={handleSubmit} handleOnChange={handleOnChange} formData={formData} errors={errors} setPaymentModel={setPaymentModel} setFormData={setFormData} />;

    const raisedAmount = getSingleUser?.campaignDetails?.raisedAmount || 0;
    const targetAmount = getSingleUser?.campaignDetails?.targetAmount || 100000;
    const progress = Math.min((raisedAmount / targetAmount) * 100, 100);

    return (
        <Box bg="#FDFBF7" minH="100vh" fontFamily="system-ui, sans-serif">

            {/* 1. HEADER (Reusing the Premium one we discussed or your existing) */}
            <Box bg="white" boxShadow="sm" position="sticky" top="0" zIndex="100">
                <DetailPageHeader getSingleUser={getSingleUser} />
            </Box>

            {/* 2. HERO: THE "SHARED DREAM" (Video/Banner Mix) */}
            <Box position="relative" w="100%" h={["auto", "400px"]} overflow="hidden">
                {/* Background Blur */}
                <Image
                    src={bannerImage}
                    w="100%" h="100%"
                    objectFit="cover"
                    filter="brightness(0.8)"
                />
                <Box
                    position="absolute" bottom="0" left="0" w="100%"
                    bgGradient="linear(to-t, #FDFBF7 10%, transparent)"
                    h="100px"
                />

                {/* Overlay Content */}
                <Box position="absolute" bottom={["20px", "40px"]} left={["20px", "5%"]} right={["20px", "5%"]} maxW="1200px" mx="auto">
                    <Flex align="flex-end" justify="space-between" wrap="wrap" gap={4}>
                        <Box>
                            <Badge bg="orange.500" color="white" px={3} py={1} borderRadius="full" mb={2} fontWeight="bold">
                                Phase 3 Active
                            </Badge>
                            <Text
                                color="white"
                                fontSize={["2xl", "4xl", "5xl"]}
                                fontWeight="800"
                                fontFamily="'Merriweather', serif"
                                textShadow="0px 2px 10px rgba(0,0,0,0.6)"
                            >
                                Dakshina Dwaraka Complex
                            </Text>
                            <Text color="gray.200" fontSize={["sm", "lg"]} maxW="600px" textShadow="0px 1px 4px rgba(0,0,0,0.8)">
                                A cultural landmark for Chennai. A spiritual home for the world.
                            </Text>
                        </Box>

                        {/* Progress Pill - Floating */}
                        <Box bg="white" p={4} borderRadius="xl" boxShadow="xl" minW="200px" display={["none", "block"]}>
                            <Text fontSize="xs" fontWeight="bold" color="gray.500">RAISED SO FAR</Text>
                            <Text fontSize="2xl" fontWeight="800" color="#2C0A0A">₹ {raisedAmount.toLocaleString()}</Text>
                            <Progress value={progress} size="xs" colorScheme="green" borderRadius="full" mt={2} />
                            <Text fontSize="xs" color="gray.400" mt={1}>{progress.toFixed(1)}% of Goal</Text>
                        </Box>
                    </Flex>
                </Box>
            </Box>

            <Box maxW="1200px" mx="auto" p={[4, 6, 8]}>
                <Flex direction={["column", "column", "row"]} gap={8}>

                    {/* --- LEFT COLUMN: STORY & UPDATES --- */}
                    <Box flex="1.5">

                        {/* 3. CAMPAIGNER NOTE - "The Host" */}
                        <Box bg="white" p={[5, 8]} borderRadius="2xl" boxShadow="sm" mb={6} border="1px solid #E2E8F0">
                            <Flex gap={4} align="flex-start">
                                <Avatar
                                    src={getSingleUser?.campaignDetails?.imgurl}
                                    size="lg"
                                    border="3px solid #D4AF37"
                                />
                                <Box>
                                    <Icon as={FaQuoteLeft} color="#D4AF37" opacity={0.4} />
                                    <Text fontSize="md" color="gray.600" lineHeight="1.8" fontStyle="italic" mb={4}>
                                        "Namaste! I am not asking for a donation. I am inviting you to place a brick in a structure that will stand for 500 years.
                                        Whether you can spare <strong>₹500</strong> or <strong>₹1 Lakh</strong>, your name belongs in this history."
                                    </Text>
                                    <Text fontWeight="bold" color="#2C0A0A">— {getSingleUser?.campaignDetails?.campaignName}</Text>
                                    <Badge colorScheme="green" variant="subtle" mt={1}>Verified Campaigner</Badge>
                                </Box>
                            </Flex>
                        </Box>

                        {/* Video */}
                        <Box borderRadius="2xl" overflow="hidden" boxShadow="lg" mb={8}>
                            <ProjectVedio />
                        </Box>

                        {/* Tabs: Story / Gallery / Updates */}
                        <CampaignTabs />
                        <Box bg="white" p={6} borderRadius="2xl" boxShadow="sm" mt={4} border="1px solid #E2E8F0">
                            <Funders getSingleUser={getSingleUser} />
                        </Box>
                    </Box>

                    {/* --- RIGHT COLUMN: THE "ACTION CENTER" (Sticky) --- */}
                    <Box flex="1" maxW={["100%", "420px"]} position="relative">
                        <Box position="sticky" top="100px" ref={donationSectionRef}>

                            {/* 4. THE TIERED DONATION CARD */}
                            <Box bg="white" borderRadius="2xl" boxShadow="xl" borderTop="6px solid #D4AF37" overflow="hidden">
                                <Box p={6}>
                                    <Flex justify="space-between" align="center" mb={4}>
                                        <Text fontWeight="800" fontSize="xl" color="#2C0A0A">Make Your Offering</Text>
                                        <Badge colorScheme="red">80G Tax Exempt</Badge>
                                    </Flex>

                                    {/* Tiers Grid - THE SOLUTION for 500 - 1.25L */}
                                    <VStack spacing={3} mb={6}>

                                        {/* Tier 1: The Masses (₹500) */}
                                        <DonationTierCard
                                            icon={FaHandHoldingHeart}
                                            title="Shrishti Seva (Brick)"
                                            amount={501}
                                            desc="Sponsor a sacred brick for the foundation."
                                            color="orange"
                                            onClick={handleTierClick}
                                            isSelected={amount === 501}
                                        />

                                        {/* Tier 2: The Middle Class (₹5,000) */}
                                        <DonationTierCard
                                            icon={FaBuilding}
                                            title="Bhoomi Seva (Sq.Ft)"
                                            amount={5000}
                                            desc="Sponsor 1 Sq.ft of construction area."
                                            color="blue"
                                            onClick={handleTierClick}
                                            isSelected={amount === 5000}
                                        />

                                        {/* Tier 3: The Elite (₹1,00,000) */}
                                        <DonationTierCard
                                            icon={FaCrown}
                                            title="Vimana Seva (Patron)"
                                            amount={100000}
                                            desc="Name inscribed on Wall of Gratitude."
                                            color="purple"
                                            onClick={handleTierClick}
                                            isSelected={amount === 100000}
                                        />

                                        {/* Custom Amount Input */}
                                        <Text fontSize="xs" fontWeight="bold" color="gray.400" pt={2}>OR ENTER CUSTOM AMOUNT</Text>
                                        <Flex
                                            border="1px solid" borderColor="gray.200" borderRadius="lg" p={2}
                                            align="center" _focusWithin={{ borderColor: "orange.400" }}
                                        >
                                            <Text px={3} fontWeight="bold" color="gray.500">₹</Text>
                                            <Box
                                                as="input"
                                                type="number"
                                                w="100%"
                                                outline="none"
                                                fontWeight="bold"
                                                fontSize="lg"
                                                placeholder="Other Amount"
                                                value={amount || ''}
                                                onChange={(e) => setAmount(Number(e.target.value))}
                                            />
                                        </Flex>
                                    </VStack>

                                    {/* Main Action Button */}
                                    <Button
                                        w="100%" h="55px"
                                        bgGradient="linear(to-r, #D4AF37, #C7A02C)"
                                        color="#2C0A0A"
                                        fontWeight="800"
                                        fontSize="lg"
                                        _hover={{ bgGradient: "linear(to-r, #E5C24D, #D4AF37)", transform: "scale(1.01)" }}
                                        onClick={handlePaymentInit}
                                        boxShadow="0px 4px 15px rgba(212, 175, 55, 0.4)"
                                    >
                                        PROCEED TO DONATE
                                    </Button>

                                    <Flex justify="center" mt={4} gap={2} cursor="pointer">
                                        <Icon as={FaShareAlt} color="gray.400" />
                                        <Text fontSize="sm" color="gray.500" fontWeight="bold">Share with friends</Text>
                                    </Flex>
                                </Box>

                                {/* Security Footer */}
                                <Box bg="gray.50" p={3} borderTop="1px solid #EDF2F7">
                                    <Flex justify="center" align="center" gap={2}>
                                        <Icon as={FaCheckCircle} color="green.500" w={3} h={3}/>
                                        <Text fontSize="xs" color="gray.500">Secure Payment • SSL Encrypted</Text>
                                    </Flex>
                                </Box>
                            </Box>

                            {/* Trust Signals */}
                            <Box mt={6} bg="#FFF5F5" p={4} borderRadius="xl" border="1px dashed #FC8181" textAlign="center">
                                <Text fontSize="xs" color="#C53030" fontWeight="bold" mb={1}>WHY DONATE HERE?</Text>
                                <Text fontSize="xs" color="gray.600">
                                    Directly supports construction materials (Cement, Steel, Bricks). Managed by Hare Krishna Movement.
                                </Text>
                            </Box>

                        </Box>
                    </Box>
                </Flex>
            </Box>

            {/* Sticky Mobile Button (If needed) */}
            {isMobile && (
                <Box position="fixed" bottom="0" left="0" w="100%" bg="white" p={4} borderTop="1px solid #E2E8F0" zIndex="99">
                    <Button w="100%" h="50px" bg="#D4AF37" color="#2C0A0A" fontWeight="bold" onClick={scrollToDonate}>
                        DONATE NOW
                    </Button>
                </Box>
            )}

            <Fotter />
        </Box>
    );
};

export default HomeSinglePage;