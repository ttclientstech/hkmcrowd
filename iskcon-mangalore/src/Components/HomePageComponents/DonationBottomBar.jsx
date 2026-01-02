import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

const DonationBottomBar = ({ getSingleUser }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [isVisible, setIsVisible] = useState(false);

    // ✅ Track Scroll Position
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const handleClick = () => {
        navigate(`/campaign/${id}/donate`, { state: { getSingleUser } });
    };

    return (
        <Box
            position="fixed"
            bottom="0"
            left="0"
            w="100%"
            bg="#0e1a2b"
            color="white"
            py={3}
            px={5}
            zIndex="9999"
            boxShadow="0 -4px 20px rgba(0,0,0,0.25)"
            // ✅ Animation: Slide up/down based on scroll
            transform={isVisible ? "translateY(0)" : "translateY(100%)"}
            transition="transform 0.4s ease-in-out"
        >
            <Flex
                align="center"
                justify="space-between"
                maxW="800px"
                mx="auto"
                gap={4}
            >
                {/* LEFT SIDE MESSAGE */}
                <Text
                    fontSize={["xs","sm"]}
                    color="#ffd476"
                    fontWeight="600"
                >
                    Every Square Feet You Donate Lives Forever ✨
                </Text>

                {/* DONATE BUTTON */}
                <Button
                    onClick={handleClick}
                    bgGradient="linear(to-r, #FFD700, #FFB200)"
                    color="#2C0A0A"
                    fontWeight="800"
                    borderRadius="full"
                    px={[6, 8]}
                    py={6}
                    fontSize={["md","lg"]}
                    boxShadow="0 6px 18px rgba(255,183,0,0.45)"
                    _hover={{
                        transform: "scale(1.05)",
                        boxShadow: "0 8px 25px rgba(255,183,0,0.55)",
                    }}
                    transition="all 0.2s ease"
                >
                    Contribute Now
                </Button>
            </Flex>
        </Box>
    );
};

export default DonationBottomBar;