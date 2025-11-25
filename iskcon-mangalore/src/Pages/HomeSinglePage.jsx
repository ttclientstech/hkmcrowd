import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSingleUser, postPaymentFormData } from "../Redux/clientSlices/clientUsers";
import {
    Box, Flex, Text, Button, Icon, useBreakpointValue, Badge,
    SimpleGrid, Progress, Avatar, VStack, HStack
} from "@chakra-ui/react";
import {
    FaCheckCircle, FaBuilding, FaHandHoldingHeart, FaShareAlt,
    FaArrowRight, FaShieldAlt
} from "react-icons/fa";

// Components
import PageNotFound from "../Components/HomePageComponents/PageNotFound";
import DottedAnimation from "../Components/DottedAnimation";
import PaymentPageFull from "../Components/HomePageComponents/PaymentPageFull";
import Fotter from "../Components/HomePageComponents/Fotter";
import ProjectVedio from "../Components/HomePageComponents/ProjectVedio";
import CampaignTabs from "../Components/HomePageComponents/Tabs";
import Funders from "../Components/HomePageComponents/Funders";

// Assets
import bannerBg from "../assets/images/mandir_nirman_seva_banner.png"; // Use the banner as a background blur

// --- SUB-COMPONENTS (Defined inline for single-file clarity, move to separate files in production) ---

const HeroAmbassador = ({ user, onDonate }) => (
    <Box position="relative" w="100%" bg="#1A202C" overflow="hidden" pb={["3rem", "5rem"]}>
        {/* 1. Cinematic Background */}
        <Box
            position="absolute" top="0" left="0" w="100%" h="100%"
            backgroundImage={`url(${bannerBg})`}
            backgroundSize="cover"
            backgroundPosition="center"
            opacity="0.15"
            filter="grayscale(100%)"
        />

        {/* 2. Top Nav */}
        <Flex justify="space-between" align="center" maxW="1200px" mx="auto" p={6} position="relative" zIndex={2}>
            <Text color="white" fontWeight="bold" letterSpacing="widest" fontSize="sm">DAKSHINA DWARAKA</Text>
            <Button
                size="sm" variant="outline" color="white" _hover={{ bg: "whiteAlpha.200" }}
                leftIcon={<FaShareAlt />} borderRadius="full"
            >
                Share Campaign
            </Button>
        </Flex>

        {/* 3. The Ambassador Profile */}
        <Flex
            direction={["column", "row"]}
            align="center"
            justify="center"
            maxW="1000px" mx="auto"
            mt={[4, 10]}
            gap={[6, 12]}
            position="relative" zIndex={2}
        >
            {/* Left: The "Profile Card" - Makes campaigner look like a VIP */}
            <Box position="relative">
                <Box
                    w={["140px", "180px"]} h={["140px", "180px"]}
                    borderRadius="full"
                    border="4px solid #D4AF37" // Gold Border
                    overflow="hidden"
                    boxShadow="0px 0px 40px rgba(212, 175, 55, 0.4)"
                >
                    <img
                        src={user?.campaignDetails?.imgurl}
                        alt="Campaigner"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => e.target.src = "https://bit.ly/broken-link"}
                    />
                </Box>
                <Badge
                    position="absolute" bottom="10px" right="-10px"
                    bg="#D4AF37" color="#2C0A0A"
                    px={3} py={1} borderRadius="full"
                    boxShadow="lg" fontSize="xs" fontWeight="bold"
                    display="flex" alignItems="center" gap={1}
                >
                    <Icon as={FaCheckCircle} /> VERIFIED AMBASSADOR
                </Badge>
            </Box>

            {/* Right: The Pitch - Action Oriented */}
            <VStack align={["center", "flex-start"]} spacing={4} textAlign={["center", "left"]}>
                <Text color="#90CDF4" fontWeight="bold" letterSpacing="wider" fontSize="xs">
                    OFFICIAL CULTURAL FUNDRAISER
                </Text>
                <Text
                    color="white"
                    fontSize={["2xl", "4xl", "5xl"]}
                    fontFamily="'Merriweather', serif"
                    fontWeight="800"
                    lineHeight="1.1"
                >
                    "Join me in building <br />
                    <span style={{ color: "#FBD38D" }}>Chennai's New Landmark.</span>"
                </Text>

                <HStack spacing={4} pt={2}>
                    <Button
                        size="lg" h="55px" px={8}
                        bgGradient="linear(to-r, #D4AF37, #B7950B)"
                        color="#2C0A0A" fontWeight="800"
                        _hover={{ transform: "translateY(-2px)", boxShadow: "xl" }}
                        onClick={onDonate}
                    >
                        SUPPORT MY MISSION
                    </Button>
                    <Button
                        variant="ghost" color="gray.300"
                        _hover={{ color: "white" }}
                        onClick={() => document.getElementById('project-video').scrollIntoView({ behavior: 'smooth' })}
                    >
                        Watch Video
                    </Button>
                </HStack>
            </VStack>
        </Flex>
    </Box>
);

const ImpactStats = ({ raised, target }) => {
    // Math to make numbers feel tangible
    const bricks = Math.floor(raised / 3000);
    const sqft = Math.floor(raised / 5000);
    const percentage = Math.min((raised / target) * 100, 100);

    return (
        <Box bg="white" w="100%" borderBottom="1px solid #E2E8F0">
            <SimpleGrid columns={[2, 2, 4]} spacing={0} maxW="1200px" mx="auto">
                <Box p={6} borderRight="1px solid #E2E8F0" textAlign="center">
                    <Text fontSize="3xl" fontWeight="800" color="#2C5282">{bricks}</Text>
                    <Text fontSize="xs" color="gray.500" fontWeight="bold">BRICKS FUNDED</Text>
                </Box>
                <Box p={6} borderRight={["none", "none", "1px solid #E2E8F0"]} textAlign="center">
                    <Text fontSize="3xl" fontWeight="800" color="#2C5282">{sqft}</Text>
                    <Text fontSize="xs" color="gray.500" fontWeight="bold">SQ.FT SPONSORED</Text>
                </Box>
                <Box p={6} borderRight="1px solid #E2E8F0" textAlign="center" bg="#FFFBEB">
                    <Text fontSize="3xl" fontWeight="800" color="#D69E2E">80G</Text>
                    <Text fontSize="xs" color="gray.500" fontWeight="bold">TAX BENEFITS</Text>
                </Box>
                <Box p={6} textAlign="center">
                    <Text fontSize="3xl" fontWeight="800" color="#38A169">Active</Text>
                    <Text fontSize="xs" color="gray.500" fontWeight="bold">PHASE 3 STATUS</Text>
                </Box>
            </SimpleGrid>
            <Progress value={percentage} size="xs" colorScheme="orange" isAnimated hasStripe />
        </Box>
    );
};

const StickyActionDock = ({ onDonate, isVisible }) => (
    <Box
        position="fixed" bottom="0" left="0" w="100%"
        bg="white" p={3} zIndex="999"
        boxShadow="0px -4px 20px rgba(0,0,0,0.1)"
        transform={isVisible ? "translateY(0)" : "translateY(100%)"}
        transition="transform 0.3s ease-in-out"
        borderTop="4px solid #D4AF37"
    >
        <Flex maxW="1200px" mx="auto" justify="space-between" align="center">
            <VStack align="flex-start" spacing={0} display={["none", "flex"]}>
                <Text fontSize="xs" fontWeight="bold" color="gray.500">PROJECT PHASE 3</Text>
                <Text fontSize="sm" fontWeight="bold" color="#2C0A0A">Dakshina Dwaraka Cultural Complex</Text>
            </VStack>

            <HStack w={["100%", "auto"]} spacing={4}>
                <Flex align="center" gap={2} display={["none", "flex"]}>
                    <Icon as={FaShieldAlt} color="green.500" />
                    <Text fontSize="xs" color="gray.500">100% Secure Payment</Text>
                </Flex>
                <Button
                    w={["100%", "250px"]} h="50px"
                    bg="#D4AF37" color="#2C0A0A"
                    fontWeight="800" fontSize="lg"
                    _hover={{ bg: "#B7950B" }}
                    rightIcon={<FaArrowRight />}
                    onClick={onDonate}
                    boxShadow="lg"
                >
                    CONTRIBUTE NOW
                </Button>
            </HStack>
        </Flex>
    </Box>
);


// --- MAIN PAGE COMPONENT ---

const HomeSinglePage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, getSingleUser } = useSelector((state) => state.clientUsers);

    // States
    const [amount, setAmount] = useState(null);
    const [paymentModel, setPaymentModel] = useState(false);
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState("");
    const [showStickyDock, setShowStickyDock] = useState(false);

    // Refs
    const donationRef = useRef(null);

    // Initial Data Fetch
    useEffect(() => { dispatch(fetchSingleUser(id)); }, [dispatch, id]);

    // Scroll Listener for Sticky Dock
    useEffect(() => {
        const handleScroll = () => {
            const heroHeight = 500; // Approx height of hero section
            setShowStickyDock(window.scrollY > heroHeight);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToDonation = () => {
        donationRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    const handlePaymentInit = () => {
        if (!amount || amount < 500) {
            alert("Please select a contribution amount (Min ₹500)");
            return;
        }
        setFormData(prev => ({ ...prev, amount: amount, campaignsid: id }));
        setPaymentModel(true);
    };

    // Standard Handlers (Submit, Change, etc.) - Kept same as your logic
    const handleOnChange = (e) => { const { name, value, type, checked } = e.target; setFormData({ ...formData, [name]: type === "checkbox" ? checked : value }); };
    const handleSubmit = (e) => { e.preventDefault(); dispatch(postPaymentFormData(formData)).then((res) => { const orderId = res?.payload?.order?.id; if (orderId) { const params = new URLSearchParams({ name: formData.username || '', phone: formData.mobileno || '', email: formData.email || '', seva: 'Mandir Nirmana Seva', amount: formData.amount, order_id: orderId }); navigate(`/payment/${orderId}?${params.toString()}`); } }); };

    if (isLoading) return <Box h="100vh" bg="black"><DottedAnimation /></Box>;
    if (getSingleUser.status === 404) return <PageNotFound />;

    if (paymentModel) {
        return <PaymentPageFull amount={amount} handleSubmit={handleSubmit} handleOnChange={handleOnChange} formData={formData} errors={errors} setPaymentModel={setPaymentModel} setFormData={setFormData} />;
    }

    return (
        <Box bg="#F7FAFC" minH="100vh" fontFamily="system-ui, sans-serif">

            {/* 1. HERO SECTION (The Pride Anchor) */}
            <HeroAmbassador user={getSingleUser} onDonate={scrollToDonation} />

            {/* 2. IMPACT STATS (The Trust Anchor) */}
            <ImpactStats
                raised={getSingleUser?.campaignDetails?.raisedAmount || 0}
                target={getSingleUser?.campaignDetails?.targetAmount || 100000}
            />

            <Flex
                maxW="1200px" mx="auto"
                direction={["column", "column", "row"]}
                p={[4, 8]} gap={12}
            >
                {/* LEFT COLUMN - CONTENT */}
                <Box flex="2">
                    {/* The Manifesto / Story */}
                    <Box bg="white" p={[6, 8]} borderRadius="xl" boxShadow="sm" mb={8} borderTop="4px solid #D4AF37">
                        <Text
                            fontFamily="'Merriweather', serif" fontSize="xl" fontWeight="bold" color="#2C0A0A" mb={4}
                        >
                            A Personal Appeal from {getSingleUser?.campaignDetails?.campaignName}
                        </Text>
                        <Text fontSize="lg" color="gray.600" lineHeight="1.8" mb={6}>
                            "We often spend our lives building careers and homes for ourselves. But rarely do we get a chance to build something that outlasts us—a legacy for our culture."
                        </Text>
                        <Text fontSize="md" color="gray.600" lineHeight="1.8">
                            The <strong>Dakshina Dwaraka Cultural Complex</strong> is that legacy. It is not just a temple; it is a spiritual university, a cultural hub, and a sanctuary for peace in Chennai.
                            <br/><br/>
                            I have taken a pledge to support this construction. I invite you—my friends and professional network—to join me. You don't have to give millions. Just sponsor a few bricks.
                            <br/><br/>
                            <strong>Let us build this together.</strong>
                        </Text>
                    </Box>

                    {/* Video Section */}
                    <Box id="project-video" mb={8} borderRadius="xl" overflow="hidden" boxShadow="md">
                        <ProjectVedio />
                    </Box>

                    {/* Tabbed Details */}
                    <CampaignTabs />
                    <Box bg="white" borderRadius="xl" boxShadow="sm" p={4} mt={4}>
                        <Funders getSingleUser={getSingleUser} />
                    </Box>
                </Box>

                {/* RIGHT COLUMN - THE INVESTMENT DECK */}
                <Box flex="1" maxW={["100%", "400px"]}>
                    <Box position="sticky" top="20px" ref={donationRef}>
                        {/* Reusing your progress box but wrapping it in a premium card */}
                        <Box
                            bg="white" borderRadius="xl"
                            boxShadow="xl" border="1px solid #E2E8F0"
                            overflow="hidden"
                        >
                            <Box bg="#2C5282" p={4} textAlign="center">
                                <Text color="white" fontWeight="bold" letterSpacing="wide" fontSize="sm">
                                    MAKE YOUR CONTRIBUTION
                                </Text>
                            </Box>

                            {/* NOTE: Keep your existing Logic Component here, just styled cleanly */}
                            <Box p={4}>
                                <PaymentPageFull
                                    // Passing props to simulate mini-form behavior if needed
                                    // Or render your CapaignerProgressBox here
                                    amount={amount} setAmount={setAmount} handleClick={handlePaymentInit}
                                    formData={formData} handleOnChange={handleOnChange}
                                    isMiniVersion={true} // You might need to adapt this prop
                                />
                            </Box>

                            <Box bg="#FFF5F5" p={3} borderTop="1px dashed #FEB2B2" textAlign="center">
                                <Text fontSize="xs" color="#C53030" fontWeight="bold">
                                    <Icon as={FaBuilding} mr={1}/> Phase 3 Construction is Active
                                </Text>
                            </Box>
                        </Box>

                        <Box mt={6} textAlign="center">
                            <Text fontSize="xs" color="gray.400">
                                Managed by Hare Krishna Movement Chennai
                            </Text>
                        </Box>
                    </Box>
                </Box>
            </Flex>

            {/* STICKY BOTTOM DOCK (Mobile/Desktop) */}
            <StickyActionDock onDonate={scrollToDonation} isVisible={showStickyDock} />

            <Fotter />
        </Box>
    );
};

export default HomeSinglePage;