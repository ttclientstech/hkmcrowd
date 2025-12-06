import React, { useState, useEffect } from "react";
import {
    Box,
    Text,
    VStack,
    HStack,
    Input,
    Checkbox,
    Button,
    Divider,
    Icon,
    Flex,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Badge,
    Image,
} from "@chakra-ui/react";
import {
    FaRulerCombined,
    FaHandsHelping,
    FaTheaterMasks,
    FaUtensils,
    FaGem,
} from "react-icons/fa";
import { LuBriefcase } from "react-icons/lu";
// ✅ Fixed path: Points to an existing image in your assets folder
import donorBg from "../../assets/images/donation_page_bg.jpg";

// ---------- Theme Colors ----------
const SQFT_PRICE = 5001;
const NAVY = "#081229";
const GOLD = "#FFD700";
const RED = "#E63946";
const GREEN = "#34C759";
const TEXT_DARK = "#1A1A1A";

const DonationPage = ({
                          amount,
                          handleSubmit,
                          handleOnChange,
                          formData,
                          errors,
                          setFormData,
                          campaignerName = "ISKCON Chennai",
                          campaignerPhoto = "/images/campaigner.jpg",
                      }) => {
    const [step, setStep] = useState(1);
    const [sqFt, setSqFt] = useState(1);
    const [sliderValue, setSliderValue] = useState(1);
    const [customAmount, setCustomAmount] = useState("");

    const totalAmount =
        customAmount && parseInt(customAmount) >= 500
            ? parseInt(customAmount)
            : sliderValue * SQFT_PRICE;

    useEffect(() => window.scrollTo({ top: 0, behavior: "smooth" }), []);

    // ---------- Context Titles ----------
    const getContext = (n) => {
        if (n === 1)
            return {
                title: "Foundation Supporter",
                desc: "Laying the first stone of Dakshina Dwaraka Dham.",
                icon: FaRulerCombined,
            };
        if (n <= 5)
            return {
                title: "Festival Hall Benefactor",
                desc: "Supporting celebrations & community events in our Festival Hall.",
                icon: FaHandsHelping,
            };
        if (n <= 10)
            return {
                title: "Kala Madhuryam Patron",
                desc: "Helping artists share India’s cultural beauty.",
                icon: FaTheaterMasks,
            };
        if (n <= 50)
            return {
                title: "Annadanam Contributor",
                desc: "Feeding thousands with love through the Annadanam Hall.",
                icon: FaUtensils,
            };
        return {
            title: "Cultural Visionary",
            desc: "Building a legacy of heritage for future generations.",
            icon: FaGem,
        };
    };
    const context = getContext(sliderValue);

    // ---------- Validation ----------
    const validatePersonal = () => {
        let e = {};
        if (!formData?.username?.trim()) e.username = "Full name is required";
        if (!formData?.mobileno?.match(/^[6-9]\d{9}$/))
            e.mobileno = "Enter valid 10-digit WhatsApp number";
        if (!formData?.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
            e.email = "Enter valid email";
        return e;
    };

    const nextStep = () => {
        if (step === 2) {
            const e = validatePersonal();
            if (Object.keys(e).length) {
                alert(Object.values(e).join("\n"));
                return;
            }
        }
        setStep((s) => s + 1);
    };

    const prevStep = () => setStep((s) => s - 1);

    // ---------- Smooth Slider Handlers ----------
    const handleSliderChange = (val) => setSliderValue(val);
    const handleSliderChangeEnd = (val) => setSqFt(val);

    // ---------- Header ----------
    const renderHeader = () => (
        <Box textAlign="center" py={[10, 12]}>
            <Text
                fontWeight="700"
                fontSize={["xl", "2xl"]}
                color="white"
                letterSpacing="wide"
            >
                Dakshina Dwaraka Dham
            </Text>

            <Box
                w="60px"
                h="4px"
                bgGradient="linear(to-r, #FFD700, #E63946)"
                mx="auto"
                borderRadius="full"
                my={3}
            />

            <Text
                fontWeight="extrabold"
                fontSize={["2xl", "3xl"]}
                bgGradient="linear(to-r, #FFD700, #E63946)"
                bgClip="text"
            >
                Square Feet Campaign
            </Text>

            <Text
                fontSize="sm"
                mt={3}
                opacity={0.9}
                color="white"
                fontStyle="italic"
                maxW="600px"
                mx="auto"
            >
                “You are standing with <b>{campaignerName}</b> to build a timeless
                cultural sanctuary.”
            </Text>

            <Flex align="center" justify="center" mt={5}>
                <Image
                    src={campaignerPhoto}
                    alt="campaigner"
                    borderRadius="full"
                    boxSize="60px"
                    objectFit="cover"
                    border={`2px solid ${GOLD}`}
                    mr={3}
                    fallbackSrc="https://via.placeholder.com/60" // Added fallback for safety
                />
                <Text fontWeight="600" fontSize="md" color="white">
                    {campaignerName}
                </Text>
            </Flex>
        </Box>
    );

    // ---------- Step 1 ----------
    const Step1 = () => (
        <Box
            bg="white"
            p={[6, 8]}
            borderRadius="20px"
            boxShadow="0 10px 35px rgba(0,0,0,0.25)"
            maxW="600px"
            mx="auto"
        >
            <VStack spacing={6}>
                <Text fontSize="xl" fontWeight="700" textAlign="center" color={TEXT_DARK}>
                    Choose Your Contribution
                </Text>

                {/* ✅ FIXED SLIDER - Dragging Enabled */}
                <Box w="100%" px={2} position="relative" zIndex={2}>
                    <Slider
                        aria-label="sqft-slider"
                        value={sliderValue}
                        min={1}
                        max={25}
                        step={1}
                        onChange={handleSliderChange}
                        onChangeEnd={handleSliderChangeEnd}
                        focusThumbOnChange={false} // Improves drag feel
                        sx={{ touchAction: "none" }} // CRITICAL: Prevents scroll interference on touch/hybrid devices
                    >
                        <SliderTrack bg="gray.200" h="10px" borderRadius="full">
                            <SliderFilledTrack bg={GREEN} />
                        </SliderTrack>
                        <SliderThumb
                            boxSize={8} // Slightly larger for better grab
                            bg="white"
                            border={`3px solid ${GREEN}`}
                            boxShadow="0 0 5px rgba(0,0,0,0.3)"
                            _active={{ transform: "scale(1.2)" }}
                            _focus={{ boxShadow: "0 0 0 3px rgba(52,199,89,0.4)" }}
                            zIndex={10}
                            cursor="grab" // Visual cue
                        />
                    </Slider>

                    <Text mt={3} textAlign="center" fontWeight="600" color={TEXT_DARK}>
                        {sliderValue} Sq. Feet = ₹
                        {(sliderValue * SQFT_PRICE).toLocaleString("en-IN")}
                    </Text>
                </Box>

                {/* Badge */}
                <Badge
                    px={4}
                    py={2}
                    borderRadius="full"
                    fontSize="sm"
                    fontWeight="700"
                    bgGradient={
                        sliderValue >= 50
                            ? "linear(to-r, #FFD700, #F5C542)"
                            : sliderValue >= 10
                                ? "linear(to-r, #C0C0C0, #E0E0E0)"
                                : "linear(to-r, #F5F5F5, #FFF)"
                    }
                    color={sliderValue >= 10 ? "#2C0A0A" : "#444"}
                >
                    {context.title}
                </Badge>

                <Text fontSize="sm" color="gray.600" textAlign="center" maxW="80%" mx="auto">
                    {context.desc}
                </Text>

                {/* Custom Amount */}
                <VStack spacing={1}>
                    <Text fontSize="sm" color="gray.600">
                        Or enter custom amount (min ₹500)
                    </Text>
                    <Input
                        type="number"
                        min={500}
                        placeholder="Enter amount manually"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        w="60%"
                        textAlign="center"
                    />
                </VStack>

                {/* Total */}
                <Box w="100%" pt={4} borderTop="1px dashed #E2E8F0" textAlign="center">
                    <Text fontSize="sm" color="gray.500" mb={1}>
                        Total Sponsorship
                    </Text>
                    <Text fontSize="3xl" fontWeight="bold" color={RED}>
                        ₹{totalAmount.toLocaleString("en-IN")}
                    </Text>
                </Box>

                <Button
                    bg={RED}
                    color="white"
                    w="100%"
                    py={6}
                    borderRadius="full"
                    onClick={nextStep}
                    _hover={{ bg: "#D32F2F", transform: "scale(1.03)" }}
                    transition="all 0.25s ease"
                >
                    Continue
                </Button>
            </VStack>
        </Box>
    );

    // ---------- Step 2 ----------
    const Step2 = () => (
        <Box
            bg="white"
            p={[6, 8]}
            borderRadius="20px"
            boxShadow="0 10px 35px rgba(0,0,0,0.25)"
            maxW="700px"
            mx="auto"
        >
            <Text textAlign="center" color="gray.700" mb={4} fontWeight="600">
                Please fill in your details to proceed
            </Text>
            <VStack spacing={4} align="stretch">
                {["username", "mobileno", "email"].map((field) => (
                    <VStack align="start" key={field} spacing={1}>
                        <Text fontWeight="semibold" color="#0A1A33">
                            {field === "username"
                                ? "Full Name *"
                                : field === "mobileno"
                                    ? "WhatsApp Number *"
                                    : "Email *"}
                        </Text>
                        <Input
                            name={field}
                            value={formData?.[field] || ""}
                            onChange={handleOnChange}
                            placeholder={`Enter your ${field}`}
                            border="1px solid #CCC"
                        />
                    </VStack>
                ))}

                <Flex mt={6} gap={3}>
                    <Button variant="outline" colorScheme="gray" w="50%" onClick={prevStep}>
                        Back
                    </Button>
                    <Button bg={RED} color="white" w="50%" onClick={nextStep}>
                        Continue
                    </Button>
                </Flex>
            </VStack>
        </Box>
    );

    // ---------- Step 3 ----------
    const Step3 = () => (
        <Box
            bg="white"
            p={[6, 8]}
            borderRadius="20px"
            boxShadow="0 10px 35px rgba(0,0,0,0.25)"
            maxW="700px"
            mx="auto"
        >
            <VStack align="start" spacing={3}>
                <Checkbox
                    name="prasadRequired"
                    isChecked={!!formData?.prasadRequired}
                    onChange={handleOnChange}
                >
                    I would like to receive Gift & Maha Prasadam (India only)
                </Checkbox>
                <Checkbox
                    name="taxExemption"
                    isChecked={!!formData?.taxExemption}
                    onChange={handleOnChange}
                >
                    I would like to avail 80G tax benefits
                </Checkbox>
                <Checkbox
                    name="isanonymous"
                    isChecked={!!formData?.isanonymous}
                    onChange={handleOnChange}
                >
                    Make my donation anonymous
                </Checkbox>

                <Flex mt={6} gap={3}>
                    <Button variant="outline" colorScheme="gray" w="50%" onClick={prevStep}>
                        Back
                    </Button>
                    <Button bg={RED} color="white" w="50%" onClick={nextStep}>
                        Continue
                    </Button>
                </Flex>
            </VStack>
        </Box>
    );

    // ---------- Step 4 ----------
    const Step4 = () => (
        <Box
            bg="white"
            p={[6, 8]}
            borderRadius="20px"
            boxShadow="0 10px 35px rgba(0,0,0,0.25)"
            maxW="700px"
            mx="auto"
        >
            <Text fontWeight="bold" color={RED} fontSize="2xl" textAlign="center" mb={4}>
                ₹{totalAmount.toLocaleString("en-IN")}
            </Text>
            <VStack spacing={3} align="start" fontSize="sm" color="gray.700">
                <Text>
                    <b>Name:</b> {formData.username}
                </Text>
                <Text>
                    <b>WhatsApp:</b> {formData.mobileno}
                </Text>
                <Text>
                    <b>Email:</b> {formData.email}
                </Text>
                {formData.prasadRequired && <Text>✔️ Gift & Maha Prasadam Selected</Text>}
                {formData.taxExemption && <Text>✔️ 80G Tax Benefit Opted</Text>}
            </VStack>

            <Divider my={4} />

            <VStack>
                <HStack justify="center">
                    <LuBriefcase color="#6B7280" />
                    <Text fontSize="sm" color="gray.600">
                        Secure payment via Razorpay
                    </Text>
                </HStack>

                <Flex mt={6} gap={3}>
                    <Button variant="outline" colorScheme="gray" w="50%" onClick={prevStep}>
                        Back
                    </Button>
                    <Button bg={RED} color="white" w="50%" onClick={handleSubmit}>
                        Proceed to Pay
                    </Button>
                </Flex>
            </VStack>
        </Box>
    );

    return (
        <Box
            w="100%"
            minH="100vh"
            bgImage={`url(${donorBg})`}
            bgSize="cover"
            bgPos="center"
            bgRepeat="no-repeat"
            position="relative"
        >
            <Box
                position="absolute"
                inset="0"
                bg="linear-gradient(to bottom, rgba(0,0,0,0.75), rgba(8,18,41,1))"
                zIndex="0"
            />
            <Box position="relative" zIndex="1">
                {renderHeader()}

                <Box px={[4, 6]} mt={-6}>
                    {step === 1 && <Step1 />}
                    {step === 2 && <Step2 />}
                    {step === 3 && <Step3 />}
                    {step === 4 && <Step4 />}
                </Box>

                {/* ✅ Footer - White background like Think School */}
                <Box bg="white" textAlign="center" py={8} mt={16}>
                    <Text color="#111" fontSize="sm" mb={2}>
                        Stuck somewhere? We’d love to help you. Message us at{" "}
                        <Box as="span" fontWeight="bold">
                            support@iskconchennai.org
                        </Box>{" "}
                        and we’ll respond as soon as possible.
                    </Text>
                    <Text color="gray.600" fontSize="xs" mt={3}>
                        © 2025 Hare Krishna Movement Chennai. All rights reserved.
                    </Text>
                </Box>
            </Box>
        </Box>
    );
};

export default DonationPage;