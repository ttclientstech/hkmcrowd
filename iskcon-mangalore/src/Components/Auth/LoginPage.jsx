import React, { useState } from 'react';
import { Box, Flex, Text, VStack, Image, useToast, Spinner } from '@chakra-ui/react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import lotusBloom from "../../assets/images/lotus_blossom.png";
import { BE_API_URL } from "../../constants/homePage";

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const handleSuccess = async (credentialResponse) => {
        setIsLoading(true);
        try {
            // Call your backend to verify
            const res = await axios.post(`${BE_API_URL}/auth/google`, {
                token: credentialResponse.credential
            });

            if (res.data.success) {
                // ✅ SAVE ID TO LOCAL STORAGE (This is the key to the dashboard)
                localStorage.setItem('campaignerId', res.data.campaignerId);

                toast({ title: "Welcome back!", status: "success", duration: 3000 });
                navigate(`/dashboard`);
            }
        } catch (error) {
            toast({
                title: "Login Failed",
                description: error.response?.data?.message || "Something went wrong",
                status: "error",
                duration: 5000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Flex minH="100vh" bg="#020c1b" align="center" justify="center" fontFamily="'Poppins', sans-serif">
            <Box
                bg="rgba(13, 25, 48, 0.9)"
                border="1px solid rgba(255, 215, 0, 0.2)"
                p={10}
                borderRadius="2xl"
                textAlign="center"
                maxW="400px"
                w="90%"
            >
                <VStack spacing={6}>
                    <Image src={lotusBloom} w="80px" />
                    <VStack spacing={2}>
                        <Text fontSize="2xl" fontWeight="bold" color="#FFD700">Campaigner Portal</Text>
                        <Text fontSize="sm" color="gray.400">Sign in to track your seva.</Text>
                    </VStack>

                    {isLoading ? (
                        <Spinner color="#FFD700" />
                    ) : (
                        <Box display="flex" justify="center" w="100%">
                            <GoogleLogin
                                onSuccess={handleSuccess}
                                onError={() => toast({ title: "Google Login Failed", status: "error" })}
                                theme="filled_black"
                                shape="pill"
                            />
                        </Box>
                    )}
                </VStack>
            </Box>
        </Flex>
    );
};

export default LoginPage;