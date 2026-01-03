import React, { useEffect } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
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
import { FaTimes, FaVihara, FaPray } from "react-icons/fa";
import { BsStars, BsFillLightningFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";

// --- THEME CONSTANTS ---
const NAVY = "#082032";
const GOLD = "#D4AF37";

// --- ADVANCED ANIMATIONS ---
const pulseRich = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.6); transform: scale(1); }
  70% { box-shadow: 0 0 0 20px rgba(212, 175, 55, 0); transform: scale(1.03); }
  100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0); transform: scale(1); }
`;

const floatUp = keyframes`
  0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
  50% { opacity: 0.8; }
  100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
`;

const shimmerText = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

// Floating Particle Component
const Particle = ({ size, left, delay, duration }) => (
    <Box
        position="absolute"
        bottom="-20px"
        left={left}
        w={size}
        h={size}
        bg={GOLD}
        borderRadius="full"
        opacity={0}
        filter="blur(1px)"
        animation={`${floatUp} ${duration}s linear infinite ${delay}s`}
        zIndex={0}
    />
);

const NewYearDonationModal = ({ getSingleUser }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const { id } = useParams();

    // --- TRIGGER LOGIC (20 SECONDS) ---
    useEffect(() => {
        // Remove this line during testing to see it every time.
        const hasSeen = sessionStorage.getItem("seenNewYearModal_v2");

        if (!hasSeen) {
            const timer = setTimeout(() => {
                onOpen();
                sessionStorage.setItem("seenNewYearModal_v2", "true");
            }, 20000); // ✅ 20 Seconds Delay

            return () => clearTimeout(timer);
        }
    }, [onOpen]);

    const handleDonate = () => {
        onClose();
        if (id) {
             navigate(`/campaign/${id}/donate`, { state: { getSingleUser } });
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered
            size="lg" // Slightly larger for impact
            motionPreset="scale"
            zIndex="10000"
        >
            {/* Dark, blurred overlay to focus attention completely */}
            <ModalOverlay bg="blackAlpha.900" backdropFilter="blur(10px)" />

            <ModalContent
                bg="transparent"
                boxShadow="none"
                p={0}
                mx={4}
            >
                {/* --- GLASSMORPHIC CONTAINER --- */}
                <Box
                    position="relative"
                    // Deep, rich, divine gradient background
                    bgGradient={`linear(to-br, ${NAVY}, #1B2E4B, #3D2C0A)`}
                    borderRadius="3xl"
                    overflow="hidden"
                    // Glassmorphism Border and Shadow
                    border="2px solid"
                    borderColor="rgba(212, 175, 55, 0.5)"
                    boxShadow={`0 0 60px -10px ${GOLD}, inset 0 0 20px rgba(212, 175, 55, 0.2)`}
                    textAlign="center"
                    p={[8, 10]}
                >
                    {/* --- FLOATING PARTICLES BACKGROUND --- */}
                    <Particle size="6px" left="10%" delay={0} duration={7} />
                    <Particle size="4px" left="30%" delay={2} duration={9} />
                    <Particle size="8px" left="50%" delay={1} duration={6} />
                    <Particle size="5px" left="70%" delay={3} duration={8} />
                    <Particle size="7px" left="90%" delay={0.5} duration={10} />

                    {/* Close Button - Styled to match */}
                    <IconButton
                        icon={<FaTimes />}
                        onClick={onClose}
                        position="absolute"
                        top={4}
                        right={4}
                        variant="outline"
                        color={GOLD}
                        borderColor={GOLD}
                        borderRadius="full"
                        size="sm"
                        _hover={{ bg: GOLD, color: NAVY, boxShadow: `0 0 15px ${GOLD}` }}
                        zIndex={10}
                    />

                    {/* --- MAIN CONTENT --- */}
                    <VStack spacing={5} position="relative" zIndex={2}>

                        {/* 1. The Hook Badge */}
                        <Flex
                            align="center"
                            gap={3}
                            bg="rgba(212, 175, 55, 0.15)"
                            border={`1px solid ${GOLD}`}
                            px={5}
                            py={2}
                            borderRadius="full"
                            boxShadow={`0 0 20px rgba(212, 175, 55, 0.2)`}
                            backdropFilter="blur(5px)"
                        >
                            <Icon as={BsStars} color={GOLD} boxSize={4} />
                            <Text color={GOLD} fontWeight="900" fontSize="sm" letterSpacing="widest" textTransform="uppercase" fontFamily="'Satoshi', sans-serif">
                                The 2026 Divine Sankalpa
                            </Text>
                            <Icon as={BsStars} color={GOLD} boxSize={4} />
                        </Flex>

                        {/* 2. Radiant Centerpiece Icon */}
                        <Flex
                            justify="center"
                            align="center"
                            w="100px" h="100px"
                            borderRadius="full"
                            bgGradient={`radial(${GOLD} 0%, transparent 70%)`}
                            filter="drop-shadow(0 0 15px rgba(212, 175, 55, 0.5))"
                        >
                            <Icon as={FaVihara} boxSize="60px" color="white" />
                        </Flex>

                        {/* 3. The Headline with Shimmer Effect */}
                        <Box>
                            <Text
                                fontFamily="'Poppins', sans-serif"
                                color="whiteAlpha.900"
                                fontSize={["xl", "2xl"]}
                                fontWeight="500"
                                mb={-2}
                            >
                                Ignite Your New Year with
                            </Text>
                            <Text
                                fontFamily="'Poppins', sans-serif"
                                fontWeight="900"
                                fontSize={["3xl", "4xl", "5xl"]}
                                lineHeight="1.2"
                                textTransform="uppercase"
                                // Shimmering Gold Text
                                bgGradient="linear(to-r, #BF953F, #FCF6BA, #B38728, #FCF6BA, #BF953F)"
                                bgClip="text"
                                color="transparent"
                                backgroundSize="200% auto"
                                animation={`${shimmerText} 4s linear infinite`}
                                filter="drop-shadow(0 2px 5px rgba(0,0,0,0.5))"
                            >
                                Eternal Blessings
                            </Text>
                        </Box>

                        {/* 4. The Spiritual Pitch */}
                        <Text color="whiteAlpha.800" fontSize={["md", "lg"]} lineHeight="1.6" px={2} fontFamily="'Satoshi', sans-serif">
                            Your first major action defines the year ahead.
                            <br />
                            Place a brick in the Lord's temple. Let your name be inscribed in the <Text as="span" color={GOLD} fontWeight="bold">Lord's Temple Wall of Devotion</Text> and carry the blessings throughout 2026.
                        </Text>

                        {/* 5. The High-Converting Button */}
                        <Button
                            w="100%"
                            h="auto"
                            py={6}
                            mt={4}
                            // Rich, Realistic Metallic Gradient
                            bgGradient="linear(to-r, #BF953F, #FCF6BA, #B38728, #AA771C)"
                            color="#2C0A0A"
                            fontSize={["xl", "2xl"]}
                            fontWeight="900"
                            fontFamily="'Poppins', sans-serif"
                            borderRadius="full"
                            boxShadow={`0 10px 30px -5px rgba(212, 175, 55, 0.6)`}
                            animation={`${pulseRich} 2s infinite`}
                            _hover={{
                                transform: "scale(1.02) translateY(-3px)",
                                boxShadow: `0 20px 40px -5px rgba(212, 175, 55, 0.8)`,
                                bgGradient: "linear(to-r, #FCF6BA, #BF953F, #AA771C, #B38728)"
                            }}
                            onClick={handleDonate}
                            leftIcon={<Icon as={FaPray} boxSize={6} />}
                            rightIcon={<Icon as={BsFillLightningFill} boxSize={6} />}
                        >
                            Make Your Offering Now
                        </Button>

                        <Text fontSize="sm" color="whiteAlpha.600" pt={2} fontStyle="italic">
                            Join the 5,000+ devotees.
                        </Text>

                    </VStack>
                </Box>
            </ModalContent>
        </Modal>
    );
};

export default NewYearDonationModal;