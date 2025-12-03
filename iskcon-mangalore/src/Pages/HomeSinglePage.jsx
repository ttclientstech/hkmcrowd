// src/Pages/HomeSinglePage.jsx
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
    Stack,
    VStack,
    HStack,
    Progress,
    Grid,
    Image,
    Divider,
    Badge,
    List,
    ListItem,
    Avatar,
    Spacer,
} from "@chakra-ui/react";
import { FaArrowUp, FaMapMarkerAlt, FaLandmark, FaUserFriends, FaPhoneAlt, FaClock, FaHandHoldingHeart } from "react-icons/fa";

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
import TestimonialSection from "../Components/HomePageComponents/TestimonialSection";
import DonorPrivilegeSection from "../Components/HomePageComponents/DonorPrivilegeSection";
import WhyDonateQuotes from "../Components/HomePageComponents/WhyDonateQuotes";
import FAQComponent from "../Components/HomePageComponents/FAQComponent";
import RecentContributors from "../Components/HomePageComponents/RecentContributors";
import PrabhupadaSection from "../Components/HomePageComponents/PrabhupadaSection";
import PrabhupadaQuoteCTA from "../Components/HomePageComponents/PrabhupadaQuoteCTA";
import FooterSection from "../Components/HomePageComponents/FooterSection";
import DonateNowButton from "../Components/HomePageComponents/DonateNowButton";
import DonationBottomBar from "../Components/HomePageComponents/DonationBottomBar";

/* =========================
   THEME CONSTANTS (CHANGED)
   =========================
   - Deep Temple Navy: NAVY
   - Soft Divine Beige: BEIGE
   - Gold accent: GOLD
   - Coral: CORAL (used sparingly)
   - Urgent Red CTA: URGENT_RED
   - Text colors: TEXT_DARK, TEXT_MUTED
*/
const NAVY = "#082032";        /* THEME CHANGE */
const BEIGE = "#FFFFFF";       /* THEME CHANGE */
const GOLD = "#D4AF37";        /* THEME CHANGE */
const CORAL = "#F28A7E";       /* THEME CHANGE */
const URGENT_RED = "#E63946";  /* THEME CHANGE */
const TEXT_DARK = "#1A1A1A";   /* THEME CHANGE */
const TEXT_MUTED = "#444444";  /* THEME CHANGE */

const TrustStrip = () => (
    <Box w="100%" bg={BEIGE} borderBottom="1px solid rgba(0,0,0,0.06)" py={3}> {/* THEME CHANGE */}
        <Flex
            maxW="1200px"
            mx="auto"
            justify={["center", "center", "flex-start"]}
            gap={[4, 8, 12]}
            flexWrap="wrap"
            px={4}
        >
            <Flex align="center" gap={2}>
                <Icon as={FaMapMarkerAlt} color={NAVY} />
                <Text fontSize="xs" fontWeight="700" color={TEXT_MUTED} textTransform="uppercase">
                    Thiruvanmiyur, Chennai
                </Text>
            </Flex>
            <Flex align="center" gap={2}>
                <Icon as={FaUserFriends} color={NAVY} />
                <Text fontSize="xs" fontWeight="700" color={TEXT_MUTED} textTransform="uppercase">
                    5,000+ Supporters
                </Text>
            </Flex>
            <Flex align="center" gap={2}>
                <Icon as={FaLandmark} color={NAVY} />
                <Text fontSize="xs" fontWeight="700" color={TEXT_MUTED} textTransform="uppercase">
                    Tax Benefits (80G)
                </Text>
            </Flex>
        </Flex>
    </Box>
);

const UrgencyBar = () => (
    <Box bg={NAVY} w="100%" py={2} px={4}>
        <Flex maxW="1200px" mx="auto" justify="center" align="center" gap={2}>
            <Icon as={FaClock} color={URGENT_RED} />
            <Text color="white" fontSize="sm" fontWeight="bold">
                Donate <Text as="span" color={URGENT_RED}>1 SQFT</Text> & Receive Maha Prasadam at your home
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
    const YT_VIDEO_ID = "Pzhrmkl4f28";
    const [videoSrc, setVideoSrc] = useState("");
    const videoRef = useRef(null);

    useEffect(() => {
        if (!videoRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVideoSrc(`https://www.youtube.com/embed/${YT_VIDEO_ID}?autoplay=1&mute=1`);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(videoRef.current);
        return () => observer.disconnect();
    }, []);

    // Temple Feature Images
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

    // Temple construction updates
    const templeStatusImages = [
        temple_main1,
        temple_main2,
        temple_main3,
    ];

    const [statusIndex, setStatusIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setStatusIndex((prev) => (prev + 1) % templeStatusImages.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

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
        <Box w="100%" minH="100vh" bg={BEIGE} fontFamily="'Poppins', sans-serif" position="relative"> {/* THEME CHANGE */}
            <PoppinFont />
            <DetailPageHeader getSingleUser={getSingleUser} />
            <TrustStrip />

            {/* HERO */}
            <Box as="section" pt={[4, 10, 14]} pb={[8, 10]}>
                <Flex direction="column" align="center" maxW="1200px" mx="auto" px={[4, 6]}>
                    <Grid templateColumns={["1fr", "1fr", "1fr", "250px 1fr"]} gap={8} alignItems="center" w="100%" mb={[4, 8]} mt="4px">
                        <Box display="flex" justifyContent={["center", "center", "center", "flex-end"]}>
                            <Box
                                w={["220px", "220px", "220px", "220px"]}
                                h={["220px", "220px", "220px", "220px"]}
                                borderRadius="full"
                                overflow="hidden"
                                border={`4px solid rgba(255,255,255,0.9)`}
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
                            <Text color={NAVY} fontWeight={500} mb={5} align="center" fontSize={["md", "md", "lg"]}>A message from the campaigner</Text>

                            <Box
                                borderRadius="12px"
                                border={`2px solid ${CORAL}`}
                                p={[4, 5]}
                                position="relative"
                                bg="white" /* keep white for clarity */
                                minH="120px"
                            >
                                <Text
                                    fontFamily="'Poppins', sans-serif"
                                    fontSize={["md", "lg"]}
                                    color={TEXT_DARK}
                                    fontStyle="italic"
                                    pr={[0, 0, 4]}
                                    textAlign="center"
                                >
                                    Lord Krishna says in Bhagavad-Gita 9.27: "Whatever you give in charity - do that as an offering to Me."
                                </Text>
                            </Box>

                            <Text color={TEXT_DARK} mt={4} fontSize="md" textAlign="center">
                                {cd.campaignerMessage || "I invite you to join me in this noble deed. Your contribution, no matter the size, helps place a brick in this monument of pride."}
                            </Text>
                        </Box>
                    </Grid>

                    {/* PROGRESS */}
                    <Box w="100%" mt={[6, 8]} px={[0, 4]} ref={progressRef}>
                        <Stack direction={["column", "row"]} align="center" spacing={4} w={["100%", "80%", "60%"]} mx="auto">
                            <Text fontWeight={800} color={NAVY} fontSize="lg">GOAL:</Text>

                            <Box flex="1" w="100%">
                                <Progress
                                    value={progressValue}
                                    size="lg"
                                    borderRadius="40px"
                                    bg="rgba(0,0,0,0.04)"
                                    sx={{
                                        "& > div": {
                                            bg: URGENT_RED, /* THEME CHANGE: urgent red fill */
                                        },
                                    }}
                                    transition="width 1.6s ease-out"
                                />
                            </Box>
                        </Stack>
                    </Box>

                    {/* PERCENT / SQFT */}
                    <Box mt={6} textAlign="center">
                        <Text fontFamily="'Poppins', sans-serif" fontSize={["lg", "2xl", "3xl"]} color={TEXT_DARK} fontWeight={800}>
                            <Text as="span" color={URGENT_RED}>{finalPercent}%</Text> ({raisedSqft.toLocaleString()} Square Feet) of <Text as="span" color={URGENT_RED}>{goalSqft.toLocaleString()}</Text> Square Feet raised
                        </Text>
                    </Box>
                </Flex>
            </Box>

            {/* ================== TEMPLE IMAGE SECTION (MOBILE ONLY) ================== */}
            <Box w="100%" mt={8} display={{ base: "block", md: "block", lg: "none" }}>
                <Box bg="#FFE150" w="100%" py={[2, 3]} textAlign="center" px={3}>
                    <Text fontSize={["sm", "md"]} fontWeight="700" color={TEXT_DARK} fontFamily="'Poppins', sans-serif">
                        A fundraising initiative for the construction of Chennai's tallest cultural complex & temple for Lord Sri Krishna
                    </Text>
                </Box>

                <Box px={4} mt={4}>
                    <Box borderRadius="18px" overflow="hidden" boxShadow="0px 6px 25px rgba(0,0,0,0.25)" bg="white">
                        <Image src={ddd_poster_mob} alt="Dakshina Dwaraka Dham" w="100%" h="100%" objectFit="cover" />
                    </Box>
                </Box>
            </Box>

            {/* ============================================================
               TEMPLE VIDEO + TITLE (IN SAME GRADIENT BLOCK)
               ============================================================ */}
            <Box
                w="100%"
                bgGradient={`linear(to-b, ${NAVY}, rgba(8,32,50,0.03))`} /* THEME CHANGE */
                color="white"
                borderRadius="0 0 32px 32px"
                px={[4, 6]}
                pt={[10, 14]}
                pb={[10, 14]}
                mt={6}
                textAlign="center"
            >
                <Text fontSize={["md", "lg"]} opacity={0.95} fontFamily="'Poppins', sans-serif" mb={2}>
                    That’s why we build
                </Text>

                <Text fontSize={["3xl", "4xl"]} fontWeight="800" fontFamily="'Poppins', sans-serif" mb={3} color={BEIGE}>
                    Dakshina Dwaraka Dham
                </Text>

                <Text fontSize={["md", "lg"]} opacity={0.95} fontFamily="'Poppins', sans-serif" maxW="600px" mx="auto" mb={[6, 8]}>
                    A sacred cultural complex to uplift society through devotion, heritage & values.
                </Text>

                <Box ref={videoRef} position="relative" paddingBottom="56.25%" height="0" overflow="hidden" borderRadius="16px" boxShadow="0 4px 20px rgba(0,0,0,0.4)" bg="#000" maxW="900px" mx="auto">
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

            {/* DESCRIPTION */}
            <Box w="100%" maxW="1200px" mx="auto" px={[4, 6]} mt={[4, 4]}>
                <Box position="relative" textAlign="center" mb={8}>
                    <Box position="absolute" left="50%" transform="translate(-50%, -50%)" opacity={0.08} zIndex={0}>
                        <svg width="150" height="150" viewBox="0 0 24 24" fill={CORAL}>
                            <path d="M9.17 6A5 5 0 0 0 4 11v7h7v-7H8.72A3 3 0 0 1 11 8.17 5 5 0 0 0 9.17 6Zm10 0A5 5 0 0 0 14 11v7h7v-7h-2.28A3 3 0 0 1 21 8.17 5 5 0 0 0 19.17 6Z"/>
                        </svg>
                    </Box>

                    <Text fontSize={["2xl", "3xl"]} fontWeight="500" color={NAVY} fontFamily="'Poppins', sans-serif" mb={4} position="relative" zIndex={1} lineHeight="1.3">
                        Dakshina Dwaraka Dham: <br />
                        Inspiration & Aspiration
                    </Text>
                </Box>

                <Text fontSize="md" color={TEXT_DARK} lineHeight="1.7" mb={4} fontFamily="'Poppins', sans-serif">
                    Nestled along the scenic seashore of the Bay of Bengal in Thiruvanmiyur,
                    Chennai, the Dakshina Dwaraka Dham Cultural Complex is envisioned as a
                    magnificent center to promote and preserve India’s timeless spiritual and
                    cultural heritage. Designed in the traditional Pallava style of architecture,
                    this will be the second shore temple in Tamil Nadu.
                </Text>
            </Box>

            {/* TEMPLE FEATURES */}
            <Box w="100%" maxW="1200px" mx="auto" mt={12} px={[4, 6]} fontFamily="'Poppins', sans-serif">
                <Text fontSize={["2xl", "3xl"]} fontWeight="500" color={NAVY} textAlign="center" mb={6}>
                    Features
                </Text>

                <Box position="relative" overflow="hidden" borderRadius="12px" boxShadow="0 4px 20px rgba(0,0,0,0.25)">
                    <Image src={templeImages[currentIndex]} alt="Temple Feature" w="100%" h="auto" transition="opacity 0.6s ease" opacity={isFading ? 0 : 1} />
                    <Box position="absolute" top="50%" left="10px" transform="translateY(-50%)" cursor="pointer" fontSize="2xl" color="white" opacity="0.8" onClick={prevSlide} _hover={{ opacity: 1 }}>❮</Box>
                    <Box position="absolute" top="50%" right="10px" transform="translateY(-50%)" cursor="pointer" fontSize="2xl" color="white" opacity="0.8" onClick={nextSlide} _hover={{ opacity: 1 }}>❯</Box>
                </Box>

                <Flex justify="center" mt={4} gap={3}>
                    {templeImages.map((_, i) => (
                        <Box key={i} w="10px" h="10px" borderRadius="full" bg={i === currentIndex ? NAVY : "#d0d0d0"} border={i === currentIndex ? `2px solid ${GOLD}` : "none"} cursor="pointer" onClick={() => setCurrentIndex(i)} />
                    ))}
                </Flex>
            </Box>

            {/* TEMPLE CONSTRUCTION STATUS */}
            <Box w="100%" maxW="1200px" mx="auto" mt={12} px={[4, 6]} fontFamily="'Poppins', sans-serif">
                <Text fontSize={["2xl", "3xl"]} fontWeight="500" color={NAVY} textAlign="center" mb={6}>
                    Construction Status <br /> <Text as="span" color={URGENT_RED} fontSize={["3xs", "3xs"]}>As on September 2025</Text>
                </Text>

                <Box w="100%" borderRadius="12px" overflow="hidden" boxShadow="0 4px 20px rgba(0,0,0,0.15)">
                    <Image src={templeStatusImages[statusIndex]} alt="Temple Construction" w="100%" h={["250px", "350px", "450px"]} objectFit="cover" transition="opacity 0.6s ease" />
                </Box>

                <Flex justify="center" gap={4} mt={6} flexWrap="wrap">
                    {templeStatusImages.map((img, i) => (
                        <Box key={i} borderRadius="8px" overflow="hidden" cursor="pointer" border={i === statusIndex ? `3px solid ${NAVY}` : "2px solid #ddd"} onClick={() => setStatusIndex(i)} transition="all 0.3s ease">
                            <Image src={img} w={["110px", "130px", "150px"]} h={["110px", "130px", "150px"]} objectFit="cover" />
                        </Box>
                    ))}
                </Flex>
            </Box>

            {/* Reused sections (kept intact) */}
            <TestimonialSection />
            <DonorPrivilegeSection />
            <RecentContributors getSingleUser={getSingleUser} />
            <DonateNowButton />
            <WhyDonateQuotes />
            <FAQComponent />
            <DonateNowButton />
            <PrabhupadaSection />
            <PrabhupadaQuoteCTA />

            <Text textAlign="center" fontSize={["md", "lg"]} color={NAVY} mt={10} px={4} fontFamily="'Poppins', sans-serif">
                Got a question? We’d love to hear from you.
                Call or WhatsApp us at{" "}
                <Box as="span" color={URGENT_RED} fontWeight="600">
                    +91-XXXXXXXXXX
                </Box>{" "}
                and we’ll respond as soon as possible.
            </Text>

            <FooterSection />
            <DonationBottomBar />

            {showScrollButton && (
                <IconButton
                    icon={<FaArrowUp />}
                    position={"fixed"}
                    bottom={["80px","60px"]}
                    right={"20px"}
                    zIndex={"999"}
                    bg={NAVY}
                    color={GOLD}
                    onClick={handleScrollToTop}
                    borderRadius="full"
                    boxShadow="xl"
                    border={`1px solid ${GOLD}`}
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