import React, { useEffect, useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Box,
    Text,
    Button,
    VStack,
    Icon,
    Flex,
    IconButton,
    useDisclosure
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { FaTimes, FaHandHoldingHeart, FaOm } from "react-icons/fa";
import { BsStars, BsFillLightningFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

// --- ANIMATIONS ---
const pulseBtn = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.7); transform: scale(1); }
  70% { box-shadow: 0 0 0 15px rgba(212, 175, 55, 0); transform: scale(1.02); }
  100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0); transform: scale(1); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const NewYearDonationModal = ({ getSingleUser }) => {
    const { isOpen,onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    // --- TRIGGER LOGIC ---
    useEffect(() => {
        // Check if user has already seen it this session (Optional: remove if you want it every time)
        const hasSeen = sessionStorage.getItem("seenNewYearModal");

        if (!hasSeen) {
            const timer = setTimeout(() => {
                onOpen();
                sessionStorage.setItem("seenNewYearModal", "true");
            }, 30000); // 30 Seconds Delay

            return () => clearTimeout(timer);
        }
    }, [onOpen]);

    const handleDonate = () => {
        onClose();
        // Redirect to donation page (or scroll to form)
        // Assuming your route is /campaign/:id/donate
        if (getSingleUser?._id) {
             navigate(`/campaign/${getSingleUser._id}/donate`, { state: { getSingleUser } });
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered
            size="md"
            motionPreset="slideInBottom"
        >
            <ModalOverlay bg="blackAlpha.800" backdropFilter="blur(5px)" />

            <ModalContent
                bg="transparent"
                boxShadow="none"
                p={4}
            >
                {/* --- POSTER CONTAINER --- */}
                <Box
                    position="relative"
                    // Divine Deep Gradient Background
                    bgGradient="linear(to-br, #0f2027, #203a43, #2c5364)"
                    borderRadius="2xl"
                    overflow="hidden"
                    border="4px solid"
                    borderColor="#D4AF37" // Gold Border
                    boxShadow="0 0 50px rgba(212, 175, 55, 0.6)" // Gold Glow
                    textAlign="center"
                    pb={8}
                    pt={12}
                    px={6}
                >
                    {/* Decorative Corner Ornaments */}
                    <Icon as={FaOm} position="absolute" top="20px" left="20px" color="white" opacity={0.1} boxSize={16} />
                    <Icon as={FaOm} position="absolute" bottom="20px" right="20px" color="white" opacity={0.1} boxSize={16} />

                    {/* Close Button */}
                    <IconButton
                        icon={<FaTimes />}
                        onClick={onClose}
                        position="absolute"
                        top={2}
                        right={2}
                        variant="ghost"
                        color="whiteAlpha.700"
                        _hover={{ bg: "whiteAlpha.200", color: "white" }}
                        zIndex={10}
                    />

                    {/* --- MAIN CONTENT --- */}
                    <VStack spacing={4}>

                        {/* 1. The Hook: New Year Badge */}
                        <Flex
                            align="center"
                            gap={2}
                            bg="rgba(255,255,255,0.1)"
                            border="1px solid #FFD700"
                            px={4}
                            py={1}
                            borderRadius="full"
                            animation={`${float} 3s ease-in-out infinite`}
                        >
                            <Icon as={BsStars} color="#FFD700" />
                            <Text color="#FFD700" fontWeight="bold" fontSize="xs" letterSpacing="widest" textTransform="uppercase">
                                New Year 2026 Auspicious Start
                            </Text>
                            <Icon as={BsStars} color="#FFD700" />
                        </Flex>

                        {/* 2. The Headline */}
                        <Box>
                            <Text
                                fontFamily="'Poppins', sans-serif"
                                color="white"
                                fontSize={["xl", "2xl"]}
                                lineHeight="1.2"
                            >
                                Start Your Year with a
                            </Text>
                            <Text
                                fontFamily="'Poppins', sans-serif"
                                fontWeight="900"
                                fontSize={["3xl", "4xl"]}
                                bgGradient="linear(to-r, #FFD700, #FDB931)"
                                bgClip="text"
                                letterSpacing="wide"
                                filter="drop-shadow(0 0 10px rgba(212, 175, 55, 0.4))"
                            >
                                DIVINE DEED
                            </Text>
                        </Box>

                        {/* 3. The Emotional/Spiritual Pitch */}
                        <Text color="gray.200" fontSize="sm" lineHeight="1.6" px={2}>
                            The scriptures say: <em>"Charity given at a new beginning multiplies a thousand-fold."</em>
                            <br /><br />
                            Before you begin your year, place a brick in the Lord's temple. Let your name be inscribed in the <strong>Wall of Devotion</strong> and carry the blessings of success and peace throughout 2026.
                        </Text>

                        {/* 4. The "Poster" Image / Icon Focus */}
                        <Box py={4}>
                            <Box
                                bgGradient="radial(#FFD700 0%, transparent 70%)"
                                w="150px" h="150px"
                                position="absolute"
                                left="50%"
                                transform="translateX(-50%)"
                                opacity={0.2}
                                filter="blur(20px)"
                            />
                            <Icon as={FaHandHoldingHeart} boxSize={16} color="#FFD700" position="relative" zIndex={2} />
                        </Box>

                        {/* 5. The High-Converting Button */}
                        <Button
                            w="100%"
                            size="lg"
                            h="60px"
                            bgGradient="linear(to-r, #D4AF37, #C59D18)"
                            color="#082032"
                            fontSize="xl"
                            fontWeight="900"
                            borderRadius="full"
                            boxShadow="0 0 20px rgba(212, 175, 55, 0.5)"
                            animation={`${pulseBtn} 2s infinite`}
                            _hover={{ transform: "translateY(-2px)", boxShadow: "0 0 30px rgba(212, 175, 55, 0.8)" }}
                            onClick={handleDonate}
                            leftIcon={<BsFillLightningFill />}
                        >
                            Donate for Blessings
                        </Button>

                        <Text fontSize="xs" color="whiteAlpha.600" pt={2}>
                            Join 5,000+ devotees starting the year right.
                        </Text>

                    </VStack>
                </Box>
            </ModalContent>
        </Modal>
    );
};

export default NewYearDonationModal;