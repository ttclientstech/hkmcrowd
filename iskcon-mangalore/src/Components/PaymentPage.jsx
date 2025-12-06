import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Box, Button, Spinner, Text, useToast, VStack, Icon, Heading, Container, Flex } from "@chakra-ui/react";
import { FaCheckCircle, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import Confetti from "react-confetti";
import WallOfDevotion from "./HomePageComponents/WallOfDevotion";

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
            orderId: getParam("orderId")
        };
    }, [query]);

    const [orderConfirmId, setOrderConfirmId] = useState(null)
    const Toast = useToast();
    const navigate = useNavigate();
    const [paymentStatus, setPaymentStatus] = useState('');
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    // Update window size for confetti
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
                notes: { ...paymentData },
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
            <Box minH="100vh" bg="#F9FAFB" position="relative" overflowX="hidden">
                {/* Confetti Blast */}
                <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={500} />

                <Container maxW="container.md" py={10}>
                    {/* 1. Main Success Card */}
                    <VStack
                        bg="white"
                        p={[6, 8]}
                        borderRadius="2xl"
                        boxShadow="xl"
                        spacing={6}
                        textAlign="center"
                        borderTop="8px solid #38A169"
                    >
                        <Icon as={FaCheckCircle} w={16} h={16} color="green.500" />

                        <Box>
                            <Heading size="lg" color="#2D3748" mb={2}>
                                Thank You, {paymentData.name || "Devotee"}!
                            </Heading>
                            <Text fontSize="lg" color="gray.600">
                                Your contribution ₹{paymentData.amount} has been successfully received.
                            </Text>
                            <Text fontSize="sm" color="gray.600">
                                Payment Order ID : {paymentData.orderId}
                            </Text>
                        </Box>

                        <Box bg="green.50" p={4} borderRadius="lg" w="100%">
                            <Text fontSize="md" color="green.800">
                                You have successfully supported <b>{paymentData.campainerName || "the Campaigner"}'s</b> mission to build Dakshina Dwaraka Dham.
                            </Text>
                        </Box>

                        {/* Receipt Info */}
                        <VStack spacing={2} fontSize="sm" color="gray.500">
                            <Flex align="center" gap={2}>
                                <Icon as={FaWhatsapp} color="green.500" />
                                <Text>You will receive acknowledgement receipt on <b>{paymentData.phone}</b></Text>
                            </Flex>
                            <Flex align="center" gap={2}>
                                <Text>Official receipt will be sent to <b>{paymentData.email}</b></Text>
                            </Flex>
                        </VStack>
                        {/* 2. The Wall of Devotion Integration */}
                        <Box mt={8}>
                            <WallOfDevotion
                                newDonor={{
                                    name: paymentData.name || "You",
                                    amount: paymentData.amount || 2100
                                }}
                            />
                        </Box>

                        <Button
                            colorScheme="green"
                            size="lg"
                            w="full"
                            onClick={() => navigate(`/single/${paymentData.campaignsid}`)}
                        >
                            Return to Campaign Page
                        </Button>
                    </VStack>
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
                    <Icon as={FaCheckCircle} color="red.500" w={12} h={12} mb={4} style={{ transform: 'rotate(45deg)' }} /> {/* X icon workaround */}
                    <Heading size="md" mb={2} color="gray.800">Payment Failed</Heading>
                    <Text color="gray.600" mb={6}>Unfortunately, your transaction could not be completed.</Text>
                    <Button colorScheme="red" onClick={() => navigate(`/single/${paymentData.campaignsid}`)}>
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