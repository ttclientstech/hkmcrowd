import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
    Box,
    Button,
    Spinner,
    Text,
    useToast,
    VStack,
    Icon,
    Heading,
    Container,
    Flex,
    Divider
} from "@chakra-ui/react";
import { FaCheckCircle, FaHeart, FaPrayingHands } from "react-icons/fa";
import Confetti from "react-confetti";
import { motion } from "framer-motion"; // ✅ Import framer-motion
import WallOfDevotion from "./HomePageComponents/WallOfDevotion";

// ✅ Create Motion components for animation
const MotionVStack = motion(VStack);
const MotionBox = motion(Box);

const PaymentPage = () => {
    const prevId = useRef(null);
    const { id } = useParams();
    const location = useLocation();
    const query = useMemo(() => new URLSearchParams(location.search), [location.search]);

    const paymentData = useMemo(() => {
        const getParam = (key, defaultValue = '') => {
            const value = query.get(key);
            return value !== null ? value : defaultValue;
        };
        return {
            name: getParam('name'),
            phone: getParam('phone'),
            email: getParam('email'),
            pan_number: getParam('pan_number'),
            amount: getParam('amount'),
            campaignsid: getParam('campaignsid'),
            campainerName: getParam('campainerName'),
            taxHouseNumber: getParam("taxHouseNumber"),
            taxStreet: getParam("taxStreet"),
            taxCity: getParam("taxCity"),
            taxState: getParam("taxState"),
            taxPincode: getParam("taxPincode"),
            panno: getParam("panno"),
            dob: getParam("dob"),
            campaignerMob: getParam("campaignerMob"),
        };
    }, [query]);

    const razorpayNotes = useMemo(() => {
        return {
            name: paymentData.name,
            phone: paymentData.phone,
            email: paymentData.email,
            pan_number: paymentData.pan_number,
            amount: paymentData.amount,
            campainerName: paymentData.campainerName,
            taxHouseNumber: paymentData.taxHouseNumber,
            taxStreet: paymentData.taxStreet,
            taxCity: paymentData.taxCity,
            taxState: paymentData.taxState,
            taxPincode: paymentData.taxPincode,
            panno: paymentData.panno,
            dob: paymentData.dob,
            campaignerMob: paymentData.campaignerMob,
            taxLocation: paymentData.taxLocation,
        };
    }, [paymentData]);

    const [orderConfirmId, setOrderConfirmId] = useState(null)
    const Toast = useToast();
    const navigate = useNavigate();
    const [paymentStatus, setPaymentStatus] = useState('');
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!id) return;
        if (prevId.current !== null && prevId.current === id) return;

        prevId.current = id;

        const loadRazorpayScript = () => {
            return new Promise((resolve) => {
                const script = document.createElement("script");
                script.src = "https://checkout.razorpay.com/v1/checkout.js";
                script.async = true;
                script.onload = () => resolve(true);
                script.onerror = () => resolve(false);
                document.body.appendChild(script);
            });
        };

        const openRazorpay = async () => {
            const isLoaded = await loadRazorpayScript();
            if (!isLoaded) {
                console.error("Failed to load Razorpay script.");
                return;
            }

            const options = {
                key: process.env.REACT_APP_RZP_KEY,
                currency: "INR",
                name: "Hare Krishna Movement Chennai",
                description: "Mandir Nirmana Seva",
                order_id: id,
                handler: function (response) {
                    setOrderConfirmId(response.razorpay_payment_id)
                    setPaymentStatus('success');

                    Toast({
                        title: "Payment Successful",
                        description: "Your payment was successful. Thank you!",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                    });
                },
                prefill: {
                    name: paymentData.name || '',
                    email: paymentData.email || '',
                    contact: paymentData.phone || '',
                },
                notes: { ...razorpayNotes },
                theme: { color: "#3399cc" },
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();
            rzp1.on("payment.failed", function (response) {
                console.error("Payment failed:", response);
                Toast({ title: "Payment Failed", status: "error", duration: 5000, isClosable: true });
                setPaymentStatus('failure');
            });
        };

        openRazorpay();
    }, [id, paymentData, Toast]);

    // ---------------------------------------------
    // SUCCESS VIEW (Celebration Page)
    // ---------------------------------------------
    if (paymentStatus === 'success') {
        return (
            <Box
                minH="100vh"
                bgGradient="linear(to-b, orange.50, white)"
                position="relative"
                overflowX="hidden"
                display="flex"
                alignItems="center"
            >
                {/* Confetti Blast */}
                <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={500} />

                <Container maxW="container.md" py={12}>
                    {/* ✅ Using MotionVStack for fade-in animation */}
                    <MotionVStack
                        spacing={0}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        w="full"
                    >
                        {/* 1. Main Success Card */}
                        <Box
                            bg="white"
                            borderRadius="3xl"
                            boxShadow="0 20px 60px -10px rgba(0,0,0,0.15)"
                            borderTop="8px solid"
                            borderColor="green.400"
                            overflow="hidden"
                            w="full"
                            position="relative"
                        >
                            <Box
                                position="absolute"
                                top="0" left="0" right="0" h="150px"
                                bgGradient="linear(to-b, green.50, transparent)"
                                zIndex={0}
                            />

                            <VStack p={[8, 10]} spacing={6} position="relative" zIndex={1}>
                                {/* ✅ Animated Check Icon using MotionBox */}
                                <MotionBox
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                                >
                                    <Box position="relative">
                                        <Icon as={FaCheckCircle} w={24} h={24} color="green.400" bg="white" borderRadius="full" zIndex={2} position="relative"/>
                                        <Box position="absolute" top={2} left={2} right={2} bottom={2} bg="green.100" borderRadius="full" zIndex={1} filter="blur(10px)" opacity={0.6}/>
                                    </Box>
                                </MotionBox>

                                <Box textAlign="center">
                                    <Text
                                        fontSize="xl"
                                        fontFamily="serif"
                                        color="green.600"
                                        fontWeight="bold"
                                        letterSpacing="wide"
                                        mb={2}
                                    >
                                        PAYMENT SUCCESSFUL
                                    </Text>
                                    <Heading size="xl" color="gray.800" fontFamily="serif" mb={3}>
                                        Thank You, {paymentData.name || "Devotee"}!
                                    </Heading>
                                    <Text fontSize="md" color="gray.500">
                                        Your offering has been gratefully accepted.
                                    </Text>
                                </Box>

                                {/* Receipt / Details Ticket */}
                                <Box
                                    bg="orange.50"
                                    border="1px dashed"
                                    borderColor="orange.300"
                                    borderRadius="xl"
                                    p={6}
                                    w="full"
                                    textAlign="center"
                                >
                                    <Text fontSize="sm" textTransform="uppercase" color="gray.500" letterSpacing="widest" mb={1}>
                                        Contribution Amount
                                    </Text>
                                    <Heading size="2xl" color="orange.600" mb={4}>
                                        ₹{Number(paymentData.amount).toLocaleString('en-IN')}
                                    </Heading>

                                    <Divider borderColor="orange.200" mb={4} />

                                    <Flex align="center" justify="center" gap={2} color="orange.800" fontSize="lg">
                                        <Icon as={FaPrayingHands} />
                                        <Text>
                                            Supporting: <b>{paymentData.campainerName || "the Campaigner"}</b>
                                        </Text>
                                    </Flex>
                                    <Text fontSize="xs" color="gray.400" mt={3}>
                                        Order ID: {id}
                                    </Text>
                                </Box>

                                {/* 2. Wall of Devotion Integration */}
                                <Box w="full" pt={2}>
                                    <WallOfDevotion
                                        newDonor={{
                                            name: paymentData.name,
                                            amount: paymentData.amount,
                                            order_id: id
                                        }}
                                    />
                                </Box>

                                <Button
                                    size="lg"
                                    w="full"
                                    h="60px"
                                    bgGradient="linear(to-r, orange.400, red.500)"
                                    color="white"
                                    fontSize="xl"
                                    borderRadius="xl"
                                    boxShadow="0 10px 20px rgba(229, 62, 62, 0.3)"
                                    _hover={{
                                        bgGradient: "linear(to-r, orange.500, red.600)",
                                        transform: "translateY(-2px)",
                                        boxShadow: "0 15px 25px rgba(229, 62, 62, 0.4)"
                                    }}
                                    _active={{ transform: "scale(0.98)" }}
                                    onClick={() => navigate(`/${paymentData.campaignsid}`)}
                                    leftIcon={<Icon as={FaHeart} />}
                                >
                                    Return to Campaign Page
                                </Button>
                            </VStack>
                        </Box>
                    </MotionVStack>
                </Container>
            </Box>
        );
    }

    // ---------------------------------------------
    // FAILURE VIEW
    // ---------------------------------------------
    if (paymentStatus === 'failure') {
        return (
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" bg="gray.50" p={4}>
                <Box bg="white" p={8} borderRadius="xl" boxShadow="lg" textAlign="center" maxW="400px">
                    <Icon as={FaCheckCircle} color="red.500" w={12} h={12} mb={4} style={{ transform: 'rotate(45deg)' }} />
                    <Heading size="md" mb={2} color="gray.800">Payment Failed</Heading>
                    <Text color="gray.600" mb={6}>Unfortunately, your transaction could not be completed.</Text>
                    <Button colorScheme="red" onClick={() => navigate(`/${paymentData.campaignsid}`)}>
                        Try Again
                    </Button>
                </Box>
            </Box>
        );
    }

    // ---------------------------------------------
    // LOADING VIEW
    // ---------------------------------------------
    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" bg="white">
            <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" emptyColor="gray.200" />
            <Text mt={4} fontSize="lg" fontWeight="medium" color="gray.600">
                Securely processing your donation...
            </Text>
        </Box>
    );
};

export default PaymentPage;