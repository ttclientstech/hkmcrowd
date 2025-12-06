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
import { IskconBgColor } from "../utils";
import HeadingBanner from "./HeadingBannerNew";

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
    const [customAmount, setCustomAmount] = useState("");
    const [copyTaxAddress, setCopyTaxAddress] = useState(false);

    const totalAmount =
        customAmount && parseInt(customAmount) >= 500
            ? parseInt(customAmount)
            : sqFt * SQFT_PRICE;

    useEffect(() => window.scrollTo({ top: 0, behavior: "smooth" }), []);

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

    const context = getContext(sqFt);

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

    const renderHeader = () => (
        <Box textAlign="center" mb={6}>
            <Text fontWeight="bold" fontSize="lg" color="white">
                Dakshina Dwaraka Dham | Square Feet Campaign
            </Text>

            <Text fontSize="sm" mt={2} opacity={0.9} color="white" fontStyle="italic">
                “You are standing with <b>{campaignerName}</b> to build a timeless
                cultural sanctuary.”
            </Text>

            <Flex align="center" justify="center" mt={4}>
                <Image
                    src={campaignerPhoto}
                    alt="campaigner"
                    borderRadius="full"
                    boxSize="55px"
                    objectFit="cover"
                    border={`2px solid ${GOLD}`}
                    mr={3}
                />
                <Text fontWeight="semibold" color="white">
                    {campaignerName}
                </Text>
            </Flex>
        </Box>
    );

    /** --------------------------
     * STEP 1 - DONATION SELECTION
     * -------------------------- */
    const Step1 = () => (
        <Box
            bg="white"
            p={[6, 8]}
            borderRadius="16px"
            boxShadow="0 6px 30px rgba(0,0,0,0.25)"
            maxW="600px"
            mx="auto"
        >
            {renderHeader()}
            <VStack spacing={6}>
                <Text
                    fontSize="xl"
                    fontWeight="700"
                    textAlign="center"
                    color={TEXT_DARK}
                >
                    Choose Your Contribution
                </Text>

                {/* Slider */}
                <Box w="100%">
                    <Slider
                        aria-label="sqft-slider"
                        defaultValue={1}
                        min={1}
                        max={108}
                        step={1}
                        onChange={(val) => setSqFt(val)}
                    >
                        <SliderTrack bg="gray.200" h="10px" borderRadius="full">
                            <SliderFilledTrack bg={GREEN} />
                        </SliderTrack>
                        <SliderThumb boxSize={6} bg="white" border={`2px solid ${GREEN}`} />
                    </Slider>

                    <Text mt={3} textAlign="center" fontWeight="600" color={TEXT_DARK}>
                        {sqFt} Sq. Feet = ₹{(sqFt * SQFT_PRICE).toLocaleString("en-IN")}
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
                        sqFt >= 50
                            ? "linear(to-r, #FFD700, #F5C542)"
                            : sqFt >= 10
                                ? "linear(to-r, #C0C0C0, #E0E0E0)"
                                : "linear(to-r, #F5F5F5, #FFF)"
                    }
                    color={sqFt >= 10 ? "#2C0A0A" : "#444"}
                >
                    {context.title}
                </Badge>

                <Text
                    fontSize="sm"
                    color="gray.600"
                    textAlign="center"
                    maxW="80%"
                    mx="auto"
                >
                    {context.desc}
                </Text>

                {/* Custom amount */}
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

    /** --------------------------
     * STEP 2 - PERSONAL DETAILS
     * -------------------------- */
    const Step2 = () => (
        <Box
            bg="white"
            p={[6, 8]}
            borderRadius="16px"
            boxShadow="0 6px 30px rgba(0,0,0,0.25)"
            maxW="700px"
            mx="auto"
        >
            {renderHeader()}
            <Text textAlign="center" color="gray.600" mb={4}>
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
                    <Button
                        bg={RED}
                        color="white"
                        w="50%"
                        onClick={nextStep}
                        borderRadius="full"
                    >
                        Continue
                    </Button>
                </Flex>
            </VStack>
        </Box>
    );

    /** --------------------------
     * STEP 3 - ADDITIONAL OPTIONS
     * -------------------------- */
    const Step3 = () => (
        <Box
            bg="white"
            p={[6, 8]}
            borderRadius="16px"
            boxShadow="0 6px 30px rgba(0,0,0,0.25)"
            maxW="700px"
            mx="auto"
        >
            {renderHeader()}
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
                    <Button
                        bg={RED}
                        color="white"
                        w="50%"
                        onClick={nextStep}
                        borderRadius="full"
                    >
                        Continue
                    </Button>
                </Flex>
            </VStack>
        </Box>
    );

    /** --------------------------
     * STEP 4 - REVIEW & PAY
     * -------------------------- */
    const Step4 = () => (
        <Box
            bg="white"
            p={[6, 8]}
            borderRadius="16px"
            boxShadow="0 6px 30px rgba(0,0,0,0.25)"
            maxW="700px"
            mx="auto"
        >
            {renderHeader()}
            <Text
                fontWeight="bold"
                color={RED}
                fontSize="2xl"
                textAlign="center"
                mb={4}
            >
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
                    <Button
                        bg={RED}
                        color="white"
                        w="50%"
                        onClick={handleSubmit}
                        borderRadius="full"
                    >
                        Proceed to Pay
                    </Button>
                </Flex>
            </VStack>
        </Box>
    );

    return (
        <Box w="100%" minH="100vh" bg={NAVY} py={6} px={[4, 6, 10]}>
            {step === 1 && <Step1 />}
            {step === 2 && <Step2 />}
            {step === 3 && <Step3 />}
            {step === 4 && <Step4 />}

            {/* Footer */}
            <Box textAlign="center" color="gray.300" fontSize="sm" py={6} px={4} mt={10}>
                <Divider mb={4} borderColor="rgba(255,255,255,0.15)" />
                <Text>
                    Need help? Message us at{" "}
                    <Box as="span" color={GOLD} fontWeight="600">
                        support@iskconchennai.org
                    </Box>
                </Text>
                <Text fontSize="xs" mt={3} opacity={0.6}>
                    © 2025 Hare Krishna Movement Chennai. All rights reserved.
                </Text>
            </Box>
        </Box>
    );
};

export default DonationPage;