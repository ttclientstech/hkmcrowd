import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSingleUser, postPaymentFormData } from "../Redux/clientSlices/clientUsers";
import avatar from "../assets/images/Avatar-PNG-Image.webp";
import ddd_poster_mob from "../assets/images/ddd_poster_mob.png";
import temple_main1 from "../assets/images/Front_View_from_AP.jpg";
import temple_main2 from "../assets/images/Top_Valley_View.jpg";
import temple_main3 from "../assets/images/Top_View.jpg";
import {
    Box,
    IconButton,
    Flex,
    Button,
    useBreakpointValue,
    Text,
    Icon,
    Heading,
    Stack,
    VStack,
    HStack,
    Progress,
    Grid,
    Image,
    Divider,
    Badge,
    Link,
    List,
    ListItem,
    Avatar,
    useColorModeValue,
    Spacer,
} from "@chakra-ui/react";
import { FaArrowUp, FaMapMarkerAlt, FaLandmark, FaUserFriends, FaPhoneAlt, FaClock,FaHandHoldingHeart } from "react-icons/fa";

import DottedAnimation from "../Components/DottedAnimation";
import PageNotFound from "../Components/HomePageComponents/PageNotFound";
import DetailPageHeader from "../Components/HomePageComponents/DetailPageHeader";
import Funders from "../Components/HomePageComponents/Funders";
import { campaign } from "../constants/homePage";
import CapaignerProgressBox from "../Components/HomePageComponents/CapaignerProgressBox";
import PaymentPageFull from "../Components/HomePageComponents/PaymentPageFull";
import AdditionalDetails from "../Components/HomePageComponents/AdditionalDetails";
import CampaignTabs from "../Components/HomePageComponents/Tabs";
import ProjectVedio from "../Components/HomePageComponents/ProjectVedio";
import Fotter from "../Components/HomePageComponents/Fotter";
import PoppinFont from "../Components/HomePageComponents/PoppinFont";
import VCMTopHeaderTab from "../Components/HomePageComponents/VCMTopHeaderTab";
import img_annadanam from "../assets/images/annadanam_hall_1.png";
import img_festival from "../assets/images/festival_hall_1.png";
import img_kalamadhuryam from "../assets/images/kalamadhuryam_1.png";
import img_harinam from "../assets/images/harinaam_mandap_1.png";
import img_icvk from "../assets/images/icvk_1.png";
import img_gitalife from "../assets/images/gita_life_1.png";
import t1 from "../assets/images/t1.jpeg";
import t2 from "../assets/images/t2.jpg";
import TestimonialSection from "../Components/HomePageComponents/TestimonialSection";
import DonorPrivilegeSection from "../Components/HomePageComponents/DonorPrivilegeSection";
import WhyDonateQuotes from "../Components/HomePageComponents/WhyDonateQuotes";
import FAQComponent from "../Components/HomePageComponents/FAQComponent";




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

    // Campaign details
    const cd = getSingleUser?.campaignDetails || {};
    const PRICE_PER_SQFT = 5001; // as specified
    const goalAmount = cd.targetAmount || 0;
    const raisedAmount = cd.raisedtotal || 0;
    const percent = goalAmount ? Math.min(100, Math.round((raisedAmount / goalAmount) * 100)) : 0;
    const goalSqft = PRICE_PER_SQFT ? Math.round(goalAmount / PRICE_PER_SQFT) : 0;
    const raisedSqft = PRICE_PER_SQFT ? Math.round(raisedAmount / PRICE_PER_SQFT) : 0;

    const recentDonors = getSingleUser?.top10paymentDetails || getSingleUser?.userList || [];
    const totalFunders = getSingleUser?.totalFunders || getSingleUser?.funderstotal || 0;

    const progressRef = useRef(null);
    const [progressValue, setProgressValue] = useState(0);
    const finalPercent =
        goalSqft > 0
            ? Math.min(100, Math.round((raisedSqft / goalSqft) * 100))
            : 0;

// Scroll-triggered fill animation (smooth)
    useEffect(() => {
        if (!progressRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Smooth animation: use CSS transitions, no step logic
                    requestAnimationFrame(() => {
                        setProgressValue(finalPercent);
                    });

                    observer.disconnect();
                }
            },
            { threshold: 0.4 }
        );

        observer.observe(progressRef.current);
        return () => observer.disconnect();
    }, [finalPercent]);


    // ===================== YOUTUBE AUTO-PLAY LOGIC =====================

// Replace with your actual YouTube video ID
    const YT_VIDEO_ID = "Pzhrmkl4f28";

// Holds final autoplay link once triggered
    const [videoSrc, setVideoSrc] = useState("");

// Reference to scroll-trigger container
    const videoRef = useRef(null);

    useEffect(() => {
        if (!videoRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Load video with autoplay activated
                    setVideoSrc(`https://www.youtube.com/embed/${YT_VIDEO_ID}?autoplay=1&mute=1`);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 } // User must see 50% of the section
        );

        observer.observe(videoRef.current);

        return () => observer.disconnect();
    }, []);


    // Temple Feature Images (replace with your actual image paths)
    const templeImages = [
        img_annadanam,
        img_festival,
        img_kalamadhuryam,
        img_harinam,
        img_icvk,
        img_gitalife
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);

// Auto-slide every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setIsFading(true);
            setTimeout(() => {
                setCurrentIndex(prev => (prev + 1) % templeImages.length);
                setIsFading(false);
            }, 500);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

// Navigation
    const nextSlide = () => {
        setIsFading(true);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % templeImages.length);
            setIsFading(false);
        }, 400);
    };

    const prevSlide = () => {
        setIsFading(true);
        setTimeout(() => {
            setCurrentIndex((prev) =>
                prev === 0 ? templeImages.length - 1 : prev - 1
            );
            setIsFading(false);
        }, 400);
    };


   //Temple construction updates starts
    const templeStatusImages = [
        temple_main1,
        temple_main2,
        temple_main3,
    ];

    const [statusIndex, setStatusIndex] = useState(0);

// Auto-cycle every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setStatusIndex((prev) => (prev + 1) % templeStatusImages.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);
    //Temple construction updates end

    // colors and typography matching screenshot
    const headerBg = "#2F3F51"; // deep bluish header in screenshot
    const donateYellow = "#FFD400";
    const heroBg = "#fffefe";
    const coral = "#f48b87";
    const sky = "#5eb0ff";
    const muted = "#6b7280";
    const headingColor = "#0b2340";

    if (getSingleUser?.status === 404) return <PageNotFound />;

    if (paymentModel) {
        return (
            <PaymentPageFull
                amount={amount} handleSubmit={handleSubmit} handleOnChange={handleOnChange}
                formData={formData} errors={errors} setPaymentModel={setPaymentModel} setFormData={setFormData}
            />
        );
    }

    return (
        <Box w="100%" minH="100vh" bg={heroBg} fontFamily="'Poppins', sans-serif" position="relative">
            <PoppinFont />
            {/*<VCMTopHeaderTab />*/}
            <DetailPageHeader getSingleUser={getSingleUser} />
            <TrustStrip />

            {/* HERO - main top section exactly like screenshot */}
            <Box as="section" pt={[4, 10, 14]} pb={[8, 10]} >
                <Flex direction="column" align="center" maxW="1200px" mx="auto" px={[4,6]}>
                    {/* The heading line: NAME (coral) + rest (sky) + goal number highlight

                    <Heading
                        as="h1"
                        textAlign="center"
                        fontFamily="'Poppins', sans-serif"
                        fontSize={["lg", "2xl", "3xl", "26px"]}
                        lineHeight={["25px","40px"]}
                        color={headingColor}
                        px={[2, 4]}
                    >
                        <Text as="span" color={coral} fontWeight={700} mr={2}>
                            {cd.campaignName || "Campaigner Name"}
                        </Text>
                        <Text as="span" color={sky} fontWeight={700}>
                            needs your support to raise{" "}
                            <Text as="span" color={coral} fontWeight={700}>
                                {goalSqft.toLocaleString()}
                            </Text>{" "}
                            Square Feet for
                        </Text>
                        <Box>
                            <Text as="span" color={sky} fontWeight={700} display="block">
                                Chennai's Dhakshina Dwaraka Dham
                            </Text>
                        </Box>
                    </Heading>*/}

                    {/* Campaigner image (circle) + message box to the right on desktop, stacked on mobile */}
                    <Grid templateColumns={["1fr", "1fr", "1fr", "250px 1fr"]} gap={8} alignItems="center" w="100%" mb={[4,8]} mt="4px">
                        {/* image */}
                        <Box display="flex" justifyContent={["center", "center", "center", "flex-end"]}>
                            <Box
                                w={["220px", "220px", "220px", "220px"]}
                                h={["220px", "220px", "220px", "220px"]}
                                borderRadius="full"
                                overflow="hidden"
                                border="4px solid rgba(255,255,255,0.9)"
                                boxShadow="0 8px 30px rgba(0,0,0,0.12)"
                                bg="white"
                            >
                                <Image
                                    src={imageError ? avatar : (cd.imgurl || avatar)}
                                    alt={cd.campaignName || "campaign image"}
                                    objectFit="cover"
                                    w="100%"
                                    h="100%"
                                    onError={handleImageError}
                                />
                            </Box>
                        </Box>

                        {/* message box */}
                        <Box>
                            <Text color={sky} fontWeight={500} mb={5} align="center" fontSize={["md","md","lg"]}>A message from the campaigner</Text>

                            <Box
                                borderRadius="12px"
                                border="2px solid #F28A7E"
                                p={[4,5]}
                                position="relative"
                                bg="transparent"
                                minH="120px"
                            >
                                {/* left quote mark
                                <Text position="absolute" left={4} top={-3} fontSize="3xl" color="#F28A7E">“</Text>*/}

                                <Text
                                    fontFamily="'Poppins', sans-serif"
                                    fontSize={["md","lg"]}
                                    color="#111827"
                                    fontStyle="italic"
                                    pr={[0,0,4]}
                                    textAlign="center"
                                >
                                    Lord Krishna says in Bhagavad-Gita 9.27: "Whatever you give in charity - do that as an offering to Me."
                                </Text>

                                {/* right bottom quote mark
                                <Text position="absolute" right={4} bottom={-3} fontSize="3xl" color="#F28A7E">”</Text>*/}
                            </Box>

                            <Text color="#111827" mt={4} fontSize="md" textAlign="center">
                                {cd.campaignerMessage || "I invite you to join me in this noble deed. Your contribution, no matter the size, helps place a brick in this monument of pride."}
                            </Text>
                        </Box>
                    </Grid>

                    {/* GOAL label + custom progress bar with knob similar to screenshot */}
                    <Box w="100%" mt={[6,8]} px={[0,4]} ref={progressRef}>
                        <Stack direction={["column", "row"]} align="center" spacing={4} w={["100%", "80%", "60%"]} mx="auto">
                            <Text fontWeight={800} color={sky} fontSize="sm">GOAL:</Text>

                            <Box flex="1" w="100%">
                                <Progress
                                    value={progressValue}
                                    size="lg"
                                    borderRadius="40px"
                                    bg="#FDEEE8"
                                    sx={{
                                        "& > div": {
                                            bg: "#FF6A00", // your color
                                        },
                                    }}
                                />
                            </Box>
                        </Stack>
                    </Box>

                    {/* Percentage text / raised info (large, blue) like screenshot */}
                    <Box mt={6} textAlign="center">
                        <Text fontFamily="'Poppins', sans-serif" fontSize={["lg","2xl","3xl"]} color={sky} fontWeight={800}>
                            {finalPercent}% ({raisedSqft.toLocaleString()} Square Feet) of {goalSqft.toLocaleString()} Square Feet raised
                        </Text>
                    </Box>
                </Flex>
            </Box>

            {/* ================== TEMPLE IMAGE SECTION (MOBILE ONLY) ================== */}
            <Box
                w="100%"
                mt={10}
                display={{ base: "block", md: "block", lg: "none" }}   // 👈 MOBILE ONLY
            >

                {/* Yellow ribbon above image */}
                <Box
                    bg="#FFE150"
                    w="100%"
                    py={[2, 3]}
                    textAlign="center"
                    px={3}
                >
                    <Text
                        fontSize={["sm", "md"]}
                        fontWeight="700"
                        color="#1A1A1A"
                        fontFamily="'Poppins', sans-serif"
                    >
                        A fundraising initiative for the construction of the
                        chennai's tallest cultural complex & temple for Lord Sri Krishna
                    </Text>
                </Box>

                {/* Centered premium card */}
                <Box
                    px={4}                      // outer padding (space from screen edges)
                    mt={4}
                >
                    <Box
                        borderRadius="18px"      // curved corners
                        overflow="hidden"        // clips image edges to the curve
                        boxShadow="0px 6px 25px rgba(0,0,0,0.25)" // premium soft shadow
                        bg="white"
                    >
                        <Image
                            src={ddd_poster_mob}
                            alt="Dakshina Dwaraka Dham"
                            w="100%"
                            h="100%"
                            objectFit="cover"
                        />
                    </Box>
                </Box>

            </Box>
            {/* ================== END TEMPLE IMAGE SECTION ================== */}

            {/* ============================================================
   TEMPLE VIDEO SECTION — EXACT MATCH TO REFERENCE
   ============================================================ */}

            <Box
                w="100%"
                bgGradient="linear(to-b, #0A1B2A, #FFFFFF)"
                color="white"
                borderRadius="0 0 32px 32px"
                px={[4, 6]}
                pt={[10, 14]}
                pb={[10, 14]}
                mt={6}
                textAlign="center"
            >

                {/* TITLE BLOCK */}
                <Text
                    fontSize={["md", "lg"]}
                    opacity={0.9}
                    fontFamily="'Poppins', sans-serif"
                    mb={2}
                >
                    That’s why we build
                </Text>

                <Text
                    fontSize={["3xl", "4xl"]}
                    fontWeight="800"
                    fontFamily="'Poppins', sans-serif"
                    mb={3}
                >
                    Dakshina Dwaraka Dham
                </Text>

                <Text
                    fontSize={["md", "lg"]}
                    opacity={0.9}
                    fontFamily="'Poppins', sans-serif"
                    maxW="600px"
                    mx="auto"
                    mb={[6, 8]}
                >
                    A sacred cultural complex to uplift society through devotion, heritage & values.
                </Text>

                {/* VIDEO BLOCK — INSIDE SAME GRADIENT CONTAINER */}
                <Box
                    ref={videoRef}
                    position="relative"
                    paddingBottom="56.25%"   // 16:9
                    height="0"
                    overflow="hidden"
                    borderRadius="16px"
                    boxShadow="0 4px 20px rgba(0,0,0,0.4)"
                    bg="#000"
                    maxW="900px"
                    mx="auto"
                >
                    <iframe
                        src={videoSrc}
                        title="Temple Construction Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            borderRadius: "16px"
                        }}
                    />
                </Box>

            </Box>

            {/* ============================================================
   DESCRIPTION SECTION (OUTSIDE THE GRADIENT BLOCK)
   ============================================================ */}

            <Box
                w="100%"
                maxW="1200px"
                mx="auto"
                px={[4, 6]}
                mt={[10, 12]}
            >
                <Text
                    fontSize={["2xl", "3xl"]}
                    fontWeight="500"
                    color="#5eb0ff"
                    fontFamily="'Poppins', sans-serif"
                    mb={4}
                    textAlign="center"
                >
                    Dakshina Dwaraka Dham: Inspiration & Aspiration
                </Text>

                <Text
                    fontSize="md"
                    color="#1A1A1A"
                    lineHeight="1.7"
                    mb={4}
                    fontFamily="'Poppins', sans-serif"
                >
                    Nestled along the scenic seashore of the Bay of Bengal in Thiruvanmiyur,
                    Chennai, the Dakshina Dwaraka Dham Cultural Complex is envisioned as a
                    magnificent center to promote and preserve India’s timeless spiritual and
                    cultural heritage. Designed in the traditional Pallava style of architecture,
                    this will be the second shore temple in Tamil Nadu.
                </Text>

                <Text
                    fontSize="md"
                    color="#1A1A1A"
                    lineHeight="1.7"
                    fontFamily="'Poppins', sans-serif"
                >
                    With a total built-up area of about 40,000 sq. ft., Dakshina Dwaraka Dham
                    will be a spiritual, educational, and cultural beacon — uniting devotion,
                    knowledge, and heritage for the upliftment of society.
                </Text>
            </Box>




            {/* ============================================================
     TEMPLE FEATURES – AUTO SLIDE CAROUSEL (VCM STYLE)
   ============================================================ */}

            <Box
                w="100%"
                maxW="1200px"
                mx="auto"
                mt={12}
                px={[4, 6]}
                fontFamily="'Poppins', sans-serif"
            >

                {/* SECTION TITLE */}
                <Text
                    fontSize={["2xl", "3xl"]}
                    fontWeight="800"
                    color="#5eb0ff"
                    textAlign="center"
                    mb={6}
                >
                    Temple Features
                </Text>

                {/* CAROUSEL */}
                <Box
                    position="relative"
                    overflow="hidden"
                    borderRadius="12px"
                    boxShadow="0 4px 20px rgba(0,0,0,0.25)"
                >
                    {/* MAIN IMAGE */}
                    <Image
                        src={templeImages[currentIndex]}
                        alt="Temple Feature"
                        w="100%"
                        h="auto"
                        transition="opacity 0.6s ease"
                        opacity={isFading ? 0 : 1}
                    />

                    {/* LEFT ARROW */}
                    <Box
                        position="absolute"
                        top="50%"
                        left="10px"
                        transform="translateY(-50%)"
                        cursor="pointer"
                        fontSize="2xl"
                        color="white"
                        opacity="0.8"
                        onClick={prevSlide}
                        _hover={{ opacity: 1 }}
                    >
                        ❮
                    </Box>

                    {/* RIGHT ARROW */}
                    <Box
                        position="absolute"
                        top="50%"
                        right="10px"
                        transform="translateY(-50%)"
                        cursor="pointer"
                        fontSize="2xl"
                        color="white"
                        opacity="0.8"
                        onClick={nextSlide}
                        _hover={{ opacity: 1 }}
                    >
                        ❯
                    </Box>
                </Box>

                {/* DOT INDICATORS */}
                <Flex justify="center" mt={4} gap={3}>
                    {templeImages.map((_, i) => (
                        <Box
                            key={i}
                            w="10px"
                            h="10px"
                            borderRadius="full"
                            bg={i === currentIndex ? "#000" : "#d0d0d0"}
                            border={i === currentIndex ? "2px solid #FFD700" : "none"}
                            cursor="pointer"
                            onClick={() => setCurrentIndex(i)}
                        />
                    ))}
                </Flex>
            </Box>



            {/* ============================================================
     TEMPLE CONSTRUCTION STATUS — BIG IMAGE + THUMB STRIP
   ============================================================ */}
            <Box
                w="100%"
                maxW="1200px"
                mx="auto"
                mt={12}
                px={[4, 6]}
                fontFamily="'Poppins', sans-serif"
            >

                {/* Title */}
                <Text
                    fontSize={["2xl", "3xl"]}
                    fontWeight="800"
                    color="#5eb0ff"
                    textAlign="center"
                    mb={6}
                >
                    Temple Construction Status <br />– As on September 2025
                </Text>

                {/* MAIN IMAGE */}
                <Box
                    w="100%"
                    borderRadius="12px"
                    overflow="hidden"
                    boxShadow="0 4px 20px rgba(0,0,0,0.15)"
                >
                    <Image
                        src={templeStatusImages[statusIndex]}
                        alt="Temple Construction"
                        w="100%"
                        h={["250px", "350px", "450px"]}
                        objectFit="cover"
                        transition="opacity 0.6s ease"
                    />
                </Box>

                {/* THUMBNAILS */}
                <Flex
                    justify="center"
                    gap={4}
                    mt={6}
                    flexWrap="wrap"
                >
                    {templeStatusImages.map((img, i) => (
                        <Box
                            key={i}
                            borderRadius="8px"
                            overflow="hidden"
                            cursor="pointer"
                            border={i === statusIndex ? "3px solid #5eb0ff" : "2px solid #ddd"}
                            onClick={() => setStatusIndex(i)}
                            transition="all 0.3s ease"
                        >
                            <Image
                                src={img}
                                w={["110px", "130px", "150px"]}
                                h={["110px", "130px", "150px"]}
                                objectFit="cover"
                            />
                        </Box>
                    ))}
                </Flex>

            </Box>

            <TestimonialSection />
            <DonorPrivilegeSection />
            <Flex justify="center" mt={2}>
            <Button
                h={"55px"}
                bgGradient="linear(to-r, #D4AF37, #FFD700)"
                color="#2C0A0A"
                fontWeight="800" fontSize="lg"
                fontFamily="'Cinzel', serif"
                letterSpacing="1px"
                onClick={handleClick}
                _hover={{ transform: "translateY(-2px)", boxShadow: "0px 5px 15px rgba(212, 175, 55, 0.4)" }}
                rightIcon={<Icon as={FaHandHoldingHeart} />}
            >
                CONTRIBUTE NOW
            </Button>
            </Flex>
            <WhyDonateQuotes />
            <FAQComponent />
            <Flex justify="center" mt={2}>
                <Button
                    h={"55px"}
                    bgGradient="linear(to-r, #D4AF37, #FFD700)"
                    color="#2C0A0A"
                    fontWeight="800" fontSize="lg"
                    fontFamily="'Cinzel', serif"
                    letterSpacing="1px"
                    onClick={handleClick}
                    _hover={{ transform: "translateY(-2px)", boxShadow: "0px 5px 15px rgba(212, 175, 55, 0.4)" }}
                    rightIcon={<Icon as={FaHandHoldingHeart} />}
                >
                    CONTRIBUTE NOW
                </Button>
            </Flex>



            {/* After hero: original page content continues (tabs, details, etc.)  */}
            <Box maxW="1200px" mx="auto" px={[4,6]} mt={[6,8]}>
                <Flex direction={["column", "column", "column", "row"]} gap={8} align="flex-start">
                    {/* LEFT: rest of content (keep your original components) */}
                    <Box flex="1.4" w="100%">
                        <Box mt={6} display={["block", "block"]}>
                            <AdditionalDetails getSingleUser={getSingleUser} />
                        </Box>

                        <Box mt={6}>
                            <ProjectVedio />
                        </Box>

                        {/*<Box mt={8}>
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
                        </Box>*/}
                    </Box>

                    {/* RIGHT: donate card & top contributors */}
                    <Box w={["100%", "100%", "100%", "420px"]} px={[0,0,0]} mb={24}>
                        <Box position={["static", "static", "static", "sticky"]} top="24px">
                            <Box bg="white" p={5} borderRadius="md" boxShadow="md" border="1px solid #E2E8F0">
                                <HStack justify="space-between" align="center">
                                    <HStack>
                                        <Avatar src={cd.imgurl || avatar} name={cd.campaignName || "Campaign"} />
                                        <Box>
                                            <Text fontSize="sm" color={muted}>Campaign by</Text>
                                            <Text fontWeight={700} fontSize="md" color={headingColor}>{cd.preacherName || cd.campaignerName || cd.campaignName}</Text>
                                        </Box>
                                    </HStack>
                                    <Badge colorScheme="yellow">Featured</Badge>
                                </HStack>

                                <Divider my={3} />

                                <Text fontSize="sm" color={muted}>Goal</Text>
                                <Text fontWeight={700} fontSize="lg">₹ {goalAmount.toLocaleString()}</Text>
                                <Text fontSize="sm" color={muted} mb={3}>{goalSqft.toLocaleString()} square feet (₹ {PRICE_PER_SQFT.toLocaleString()} / sqft)</Text>

                                <Progress value={percent} size="sm" colorScheme="orange" borderRadius="sm" mb={3} />

                                <Box mb={3}>
                                    <CapaignerProgressBox
                                        getSingleUser={getSingleUser} setAmount={setAmount} handleClick={handleClick}
                                        errorMessage={errorMessage} amount={amount}
                                    />
                                </Box>

                                <List spacing={2} mt={3}>
                                    <ListItem><Text fontSize="sm"><strong>Prasadam & Puja access</strong> for donors</Text></ListItem>
                                    <ListItem><Text fontSize="sm"><strong>Digital Certificate</strong> & donor recognition</Text></ListItem>
                                    <ListItem><Text fontSize="sm"><strong>80G tax benefit</strong> (if eligible)</Text></ListItem>
                                </List>

                                <Divider my={3} />

                                <Box>
                                    <Text fontWeight={700} mb={3}>Top Contributors</Text>
                                    <VStack align="stretch" spacing={2}>
                                        {getSingleUser?.top10paymentDetails?.slice(0,4)?.map((t, i) => (
                                            <HStack key={i} justify="space-between">
                                                <Text fontSize="sm">{t.username}</Text>
                                                <Text fontWeight={700}>₹ {t.amount?.toLocaleString?.()}</Text>
                                            </HStack>
                                        )) || <Text fontSize="sm" color={muted}>No contributors yet</Text>}
                                    </VStack>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Flex>
            </Box>

            <Fotter />

            {/* mobile sticky donate CTA (keeps original behavior you had) */}
            {isMobile && (
                <Box position="fixed" bottom="0" left="0" w="100%" bg="white" p={3} borderTop="1px solid #E2E8F0" zIndex={60}>
                    <Flex maxW="1200px" mx="auto" px={4} gap={3} align="center">
                        <Button flex="1" bg={donateYellow} color="#111" fontFamily="'Cinzel', serif" fontWeight={800} onClick={() => window.scrollTo({ top: 300, behavior: 'smooth' })}>
                            Donate
                        </Button>
                        <Button variant="outline" onClick={() => window.open(`tel:+917210873108`)}>
                            <Icon as={FaPhoneAlt} mr={2} /> Call
                        </Button>
                    </Flex>
                </Box>
            )}

            {showScrollButton && (
                <IconButton
                    icon={<FaArrowUp />} position={"fixed"} bottom={["80px","60px"]} right={"20px"} zIndex={"999"}
                    bg="#2C0A0A" color="#D4AF37" onClick={handleScrollToTop} borderRadius="full" boxShadow="xl" border="1px solid #D4AF37"
                />
            )}

            {isLoading && (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh" position={"fixed"} w={"100%"} bgColor={"rgb(0,0,0,0.6)"} zIndex={999}>
                    <DottedAnimation />
                </Box>
            )}
        </Box>
    );
};

export default HomeSinglePage;
