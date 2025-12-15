import React, { useState } from 'react';
import { Box, Flex, Text, VStack, Image, useToast, Spinner, useBreakpointValue } from '@chakra-ui/react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BE_API_URL } from "../../constants/homePage";

// ✅ REPLACE WITH YOUR ACTUAL IMAGE PATHS
import templeBg from "../../assets/images/ddd_arc_1.jpg"; // A high-quality photo of your temple
import templeLogo from "../../assets/images/logo.png"; // Your temple logo (preferably gold/white)

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    // Responsive sizes
    const cardWidth = useBreakpointValue({ base: "90%", md: "450px" });
    const logoSize = useBreakpointValue({ base: "100px", md: "130px" });
    const titleSize = useBreakpointValue({ base: "2xl", md: "3xl" });

    const handleSuccess = async (credentialResponse) => {
        setIsLoading(true);
        try {
            const res = await axios.post(`${BE_API_URL}/auth/google`, {
                token: credentialResponse.credential
            });

            if (res.data.success) {
                localStorage.setItem('campaignerId', res.data.campaignerId);
                toast({ title: "Welcome back to your seva!", status: "success", duration: 3000 });
                navigate(`/dashboard`);
            }
        } catch (error) {
            toast({
                title: "Login Failed",
                description: error.response?.data?.message || "Unable to verify campaigner account.",
                status: "error",
                duration: 5000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Flex
            minH="100vh"
            align="center"
            justify="center"
            fontFamily="'Poppins', sans-serif"
            position="relative"
            overflow="hidden"
        >
            {/* 1. Full-Screen Temple Background Image with Overlay */}
            <Box
                position="absolute"
                top="0" left="0" right="0" bottom="0"
                bgImage={`url(${templeBg})`}
                bgSize="cover"
                bgPosition="center"
                zIndex="-2"
            />
            <Box
                position="absolute"
                top="0" left="0" right="0" bottom="0"
                bgGradient="linear(to-b, rgba(2, 12, 27, 0.7), rgba(2, 12, 27, 0.9))" // Dark blue gradient overlay
                zIndex="-1"
                backdropFilter="blur(4px)" // Subtle blur for depth
            />

            {/* 2. Glassmorphism Login Card */}
            <Box
                bg="rgba(13, 25, 48, 0.75)" // Semi-transparent navy
                backdropFilter="blur(20px)" // Strong glass effect
                border="2px solid rgba(255, 215, 0, 0.3)" // richer gold border
                p={[8, 12]}
                borderRadius="3xl"
                textAlign="center"
                w={cardWidth}
                boxShadow="0 20px 60px rgba(0,0,0,0.5)"
                transform="translateY(0)"
                transition="all 0.3s ease"
                _hover={{ transform: "translateY(-5px)", boxShadow: "0 25px 70px rgba(0,0,0,0.6)" }}
            >
                <VStack spacing={6}>
                    {/* Temple Logo */}
                    <Image
                        src={templeLogo}
                        w={logoSize}
                        filter="drop-shadow(0 0 15px rgba(255, 215, 0, 0.6))" // Golden glow around logo
                        alt="Dakshina Dwaraka Dham Logo"
                    />

                    <VStack spacing={1}>
                        <Text
                            fontSize={titleSize}
                            fontWeight="800"
                            color="#FFD700" // Gold
                            letterSpacing="wide"
                            textTransform="uppercase"
                            lineHeight="1.2"
                        >
                            Dakshina Dwaraka Dham
                        </Text>
                        <Text fontSize="lg" fontWeight="600" color="blue.100">
                            Campaigner Seva Portal
                        </Text>
                    </VStack>

                    <Text fontSize={["sm", "md"]} color="gray.300" maxW="350px" lineHeight="1.6">
                        "Connect with your divine service. Sign in to view your impact and continue your journey of devotion."
                    </Text>

                    {isLoading ? (
                        <Spinner color="#FFD700" size="lg" thickness="3px" label="Verifying..." />
                    ) : (
                        <Box
                            display="flex"
                            justify="center"
                            w="100%"
                            mt={4}
                            transform="scale(1.1)" // Make button slightly larger and more prominent
                            filter="drop-shadow(0 4px 10px rgba(0,0,0,0.3))"
                        >
                            <GoogleLogin
                                onSuccess={handleSuccess}
                                onError={() => toast({ title: "Google Login Failed", status: "error" })}
                                theme="filled_black"
                                shape="pill"
                                text="continue_with"
                                width="280" // Fixed width for consistency
                            />
                        </Box>
                    )}

                    <Text fontSize="xs" color="gray.500" pt={4}>
                        By continuing, you agree to access your assigned campaigner dashboard.
                    </Text>
                </VStack>
            </Box>
        </Flex>
    );
};

export default LoginPage;