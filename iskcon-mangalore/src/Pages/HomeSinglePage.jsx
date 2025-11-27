import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSingleUser, postPaymentFormData } from "../Redux/clientSlices/clientUsers";
import avatar from "../assets/images/Avatar-PNG-Image.webp";
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
import { FaArrowUp, FaMapMarkerAlt, FaLandmark, FaUserFriends, FaPhoneAlt, FaClock } from "react-icons/fa";

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

    if (getSingleUser?.status === 404) return <PageNotFound />;

    if (paymentModel) {
        return (
            <PaymentPageFull
                amount={amount} handleSubmit={handleSubmit} handleOnChange={handleOnChange}
                formData={formData} errors={errors} setPaymentModel={setPaymentModel} setFormData={setFormData}
            />
        );
    }

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

    // colors and typography matching screenshot
    const headerBg = "#2F3F51"; // deep bluish header in screenshot
    const donateYellow = "#FFD400";
    const heroBg = "#fffefe";
    const coral = "#f48b87";
    const sky = "#5eb0ff";
    const muted = "#6b7280";
    const headingColor = "#0b2340";

    return (
        <Box w="100%" minH="100vh" bg={heroBg} fontFamily="'Poppins', sans-serif" position="relative">
            <PoppinFont />
            <VCMTopHeaderTab />
            {/*<DetailPageHeader getSingleUser={getSingleUser} />
            <TrustStrip />*/}

            {/* HERO - main top section exactly like screenshot */}
            <Box as="section" pt={[8, 10, 14]} pb={[6, 10]} >
                <Flex direction="column" align="center" maxW="1200px" mx="auto" px={[4,6]}>
                    {/* The heading line: NAME (coral) + rest (sky) + goal number highlight */}

                    <Heading
                        as="h1"
                        textAlign="center"
                        fontFamily="'Poppins', sans-serif"
                        fontSize={["xl", "2xl", "3xl", "26px"]}
                        lineHeight="41px"
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
                            <Text as="span" color={sky} fontWeight={700} display="block" mt={2}>
                                Chennai's Dhakshina Dwaraka Dham
                            </Text>
                        </Box>
                    </Heading>

                    {/* Campaigner image (circle) + message box to the right on desktop, stacked on mobile */}
                    <Grid templateColumns={["1fr", "1fr", "1fr", "250px 1fr"]} gap={8} alignItems="center" w="100%" mb={[4,8]}>
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
                    <Box w="100%" mt={[6,8]} px={[0,4]}>
                        <HStack align="center" spacing={4}>
                            <Text fontWeight={800} color={sky} fontSize="sm" textAlign="center">GOAL:</Text><br />
                            <Box flex="1">
                                {/* Outer track */}
                                <Box align="center" bg="#FDEEE8" borderRadius="40px" height="16px" position="relative" overflow="hidden">
                                    {/* inner fill */}
                                    <Box
                                        bg="linear-gradient(90deg, #FF6A00, #FFA87A)"
                                        width={`${percent}%`}
                                        height="100%"
                                        transition="width 0.8s ease"
                                        position="relative"
                                    />
                                    {/* white knob */}
                                    <Box
                                        position="absolute"
                                        left={`calc(${percent}% - 10px)`}
                                        top="50%"
                                        transform="translateY(-50%)"
                                        width="20px"
                                        height="20px"
                                        bg="white"
                                        borderRadius="full"
                                        boxShadow="0 3px 8px rgba(0,0,0,0.12)"
                                        border="4px solid #FF6A00"
                                    />
                                </Box>
                            </Box>
                        </HStack>
                    </Box>

                    {/* Percentage text / raised info (large, blue) like screenshot */}
                    <Box mt={6} textAlign="center">
                        <Text fontFamily="'Poppins', sans-serif" fontSize={["lg","2xl","3xl"]} color={sky} fontWeight={800}>
                            {percent}% ({raisedSqft.toLocaleString()} Square Feet) of {goalSqft.toLocaleString()} Square Feet raised
                        </Text>
                    </Box>
                </Flex>
            </Box>

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
