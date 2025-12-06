import React, { useState, useEffect } from "react";
import {
    Box,
    Text,
    VStack,
    Input,
    Checkbox,
    Button,
    Divider,
    Icon,
    Flex,
    Badge,
    Image,
    SimpleGrid,
    IconButton,
    HStack
} from "@chakra-ui/react";
import {
    FaRulerCombined,
    FaHandsHelping,
    FaTheaterMasks,
    FaUtensils,
    FaGem,
    FaLock,
    FaMinus,
    FaPlus
} from "react-icons/fa";
// Ensure this path matches your project structure exactly
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
    const [customAmount, setCustomAmount] = useState("");

    const totalAmount =
        customAmount && parseInt(customAmount) >= 500
            ? parseInt(customAmount)
            : sqFt * SQFT_PRICE;

    useEffect(() => window.scrollTo({ top: 0, behavior: "smooth" }), []);

    // ---------- Context Titles (Optimized for 35 Blocks) ----------
    const getContext = (n) => {
        if (n === 1) return { title: "Foundation Supporter", desc: "Laying the first stone of Dakshina Dwaraka Dham.", icon: FaRulerCombined, color: "gray" };
        if (n <= 5) return { title: "Festival Hall Benefactor", desc: "Supporting celebrations in our Festival Hall.", icon: FaHandsHelping, color: "blue" };
        if (n <= 10) return { title: "Kala Madhuryam Patron", desc: "Helping artists share India’s cultural beauty.", icon: FaTheaterMasks, color: "cyan" };
        if (n <= 25) return { title: "Annadanam Contributor", desc: "Feeding thousands with love through the Annadanam Hall.", icon: FaUtensils, color: "orange" };
        return { title: "Cultural Visionary", desc: "Building a legacy of heritage for future generations.", icon: FaGem, color: "purple" };
    };
    const context = getContext(sqFt);

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

    // ---------- Input Handlers (Capped at 35) ----------
    const handleIncrement = () => setSqFt(prev => Math.min(prev + 1, 35));
    const handleDecrement = () => setSqFt(prev => Math.max(prev - 1, 1));
    const handlePresetClick = (val) => setSqFt(val);

    // ---------- Header ----------
    const renderHeader = () => (
        <Box textAlign="center" py={[10, 12]}>
            <Text fontWeight="700" fontSize={["xl", "2xl"]} color="white" letterSpacing="wide">
                Dakshina Dwaraka Dham | Square Feet Campaign
            </Text>
            <Text fontSize="sm" mt={3} opacity={0.9} color="white" fontStyle="italic" maxW="600px" mx="auto">
                “Thank you for supporting <b>{campaignerName}</b> to build a timeless cultural sanctuary.”
            </Text>
        </Box>
    );

    // ---------- Step 1: The Builder Interface ----------
    const Step1 = () => (
        <Box bg="white" p={[6, 8]} borderRadius="20px" boxShadow="0 10px 35px rgba(0,0,0,0.25)" maxW="600px" mx="auto">
            <VStack spacing={6}>
                <Text fontSize="xl" fontWeight="700" textAlign="center" color={TEXT_DARK}>
                    Choose Your Contribution
                </Text>

                {/* 1. VISUALIZER GRID (35 Blocks) */}
                <Box w="100%" bg="gray.50" p={4} borderRadius="xl" border="1px solid" borderColor="gray.100">
                    <Text fontSize="xs" fontWeight="bold" color="gray.400" mb={2} textAlign="center" textTransform="uppercase">
                        YOUR IMPACT VISUALIZER
                    </Text>

                    {/* The Grid of 35 Blocks (7 Columns x 5 Rows) */}
                    <SimpleGrid columns={7} spacing="4px" mb={4} maxW="350px" mx="auto">
                        {[...Array(35)].map((_, i) => (
                            <Box
                                key={i}
                                w="100%"
                                paddingTop="100%" // Aspect ratio square
                                borderRadius="2px"
                                position="relative"
                                // Color Logic: Filled = Gold/Orange/Red. Unfilled = Gray bg with Green Border.
                                bg={i < sqFt ? (i < 10 ? GOLD : i < 25 ? "orange.400" : RED) : "gray.100"}
                                border={i < sqFt ? "none" : "0.5px solid"}
                                borderColor={i < sqFt ? "transparent" : "green.400"}
                                transition="all 0.2s ease"
                                transform={i < sqFt ? "scale(1)" : "scale(0.95)"}
                                boxShadow={i < sqFt ? "sm" : "none"}
                            />
                        ))}
                    </SimpleGrid>

                    {/* Context Badge & Description */}
                    <VStack spacing={2} justify="center">
                        {/* Badge without Icon */}
                        <Badge px={3} py={1} borderRadius="full" colorScheme={context.color} fontSize="xs">
                            {context.title}
                        </Badge>
                        {/* Description moved here */}
                        <Text fontSize="xs" color="gray.500" textAlign="center" maxW="90%">
                            {context.desc}
                        </Text>
                    </VStack>
                </Box>

                {/* 2. CONTROLS (Stepper & Presets) */}
                <VStack spacing={4} w="100%">

                    {/* Big Stepper */}
                    <Flex align="center" justify="space-between" w="100%" maxW="300px" bg="gray.100" p={1} borderRadius="full">
                        <IconButton
                            icon={<FaMinus />}
                            onClick={handleDecrement}
                            isRound
                            size="lg"
                            bg="white"
                            shadow="sm"
                            aria-label="Decrease"
                            isDisabled={sqFt <= 1}
                        />
                        <VStack spacing={0}>
                            <Text fontSize="2xl" fontWeight="800" color={TEXT_DARK} lineHeight="1">
                                {sqFt} <Text as="span" fontSize="sm" color="gray.500" fontWeight="normal">Sq. Ft.</Text>
                            </Text>
                        </VStack>
                        <IconButton
                            icon={<FaPlus />}
                            onClick={handleIncrement}
                            isRound
                            size="lg"
                            // Removed bg="white" so colorScheme works
                            colorScheme="green"
                            shadow="sm"
                            aria-label="Increase"
                            isDisabled={sqFt >= 35}
                        />
                    </Flex>

                    {/* Quick Select Pills (Optimized for 35 limit) */}
                    <Flex gap={2} wrap="wrap" justify="center">
                        {[1, 5, 10, 15, 25, 35].map(val => (
                            <Button
                                key={val}
                                size="sm"
                                variant={sqFt === val ? "solid" : "outline"}
                                colorScheme={sqFt === val ? "red" : "gray"}
                                onClick={() => handlePresetClick(val)}
                                borderRadius="full"
                            >
                                {val}
                            </Button>
                        ))}
                    </Flex>
                </VStack>

                <Text fontSize="md" fontWeight="bold" textAlign="center" color="gray.700">
                    Total: ₹{(sqFt * SQFT_PRICE).toLocaleString("en-IN")}
                </Text>

                {/* Custom Amount Input */}
                <Box w="100%" pt={4} borderTop="1px dashed #E2E8F0">
                    <Text fontSize="xs" textAlign="center" color="gray.400" mb={2}>OR ENTER CUSTOM AMOUNT</Text>
                    <Input
                        type="number"
                        min={500}
                        placeholder="Enter amount manually (e.g. 500)"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        textAlign="center"
                        bg="gray.50"
                        border="1px solid #E2E8F0"
                        _focus={{ borderColor: RED }}
                    />
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
                    boxShadow="xl"
                >
                    Continue with ₹{totalAmount.toLocaleString("en-IN")}
                </Button>
            </VStack>
        </Box>
    );

    // ---------- Step 2: Personal Details ----------
    const Step2 = () => (
        <Box bg="white" p={[6, 8]} borderRadius="20px" boxShadow="0 10px 35px rgba(0,0,0,0.25)" maxW="700px" mx="auto">
            <Text textAlign="center" color="gray.700" mb={4} fontWeight="600">Please fill in your details</Text>
            <VStack spacing={4} align="stretch">
                {["username", "mobileno", "email"].map((field) => (
                    <VStack align="start" key={field} spacing={1}>
                        <Text fontWeight="semibold" color="#0A1A33">
                            {field === "username" ? "Full Name *" : field === "mobileno" ? "WhatsApp Number *" : "Email *"}
                        </Text>
                        <Input name={field} value={formData?.[field] || ""} onChange={handleOnChange} placeholder={`Enter your ${field}`} border="1px solid #CCC" />
                    </VStack>
                ))}
                <Flex mt={6} gap={3}>
                    <Button variant="outline" colorScheme="gray" w="50%" onClick={prevStep}>Back</Button>
                    <Button bg={RED} color="white" w="50%" onClick={nextStep}>Continue</Button>
                </Flex>
            </VStack>
        </Box>
    );

    // ---------- Step 3: Preferences ----------
    const Step3 = () => (
        <Box bg="white" p={[6, 8]} borderRadius="20px" boxShadow="0 10px 35px rgba(0,0,0,0.25)" maxW="700px" mx="auto">
            <VStack align="start" spacing={3}>
                <Checkbox name="prasadRequired" isChecked={!!formData?.prasadRequired} onChange={handleOnChange}>I would like to receive Gift & Maha Prasadam (India only)</Checkbox>
                <Checkbox name="taxExemption" isChecked={!!formData?.taxExemption} onChange={handleOnChange}>I would like to avail 80G tax benefits</Checkbox>
                <Checkbox name="isanonymous" isChecked={!!formData?.isanonymous} onChange={handleOnChange}>Make my donation anonymous</Checkbox>
                <Flex mt={6} gap={3}>
                    <Button variant="outline" colorScheme="gray" w="50%" onClick={prevStep}>Back</Button>
                    <Button bg={RED} color="white" w="50%" onClick={nextStep}>Continue</Button>
                </Flex>
            </VStack>
        </Box>
    );

    // ---------- Step 4: Review ----------
    const Step4 = () => (
        <Box bg="white" p={[6, 8]} borderRadius="20px" boxShadow="0 10px 35px rgba(0,0,0,0.25)" maxW="700px" mx="auto">
            <Text fontWeight="bold" color={RED} fontSize="2xl" textAlign="center" mb={4}>₹{totalAmount.toLocaleString("en-IN")}</Text>
            <VStack spacing={3} align="start" fontSize="sm" color="gray.700">
                <Text><b>Name:</b> {formData.username}</Text>
                <Text><b>WhatsApp:</b> {formData.mobileno}</Text>
                <Text><b>Email:</b> {formData.email}</Text>
                {formData.prasadRequired && <Text>✔️ Gift & Maha Prasadam Selected</Text>}
                {formData.taxExemption && <Text>✔️ 80G Tax Benefit Opted</Text>}
            </VStack>
            <Divider my={4} />
            <VStack>
                <HStack justify="center"><Icon as={FaLock} color="#6B7280" /><Text fontSize="sm" color="gray.600">Secure payment via Razorpay</Text></HStack>
                <Flex mt={6} gap={3}>
                    <Button variant="outline" colorScheme="gray" w="50%" onClick={prevStep}>Back</Button>
                    <Button bg={RED} color="white" w="50%" onClick={handleSubmit}>Proceed to Pay</Button>
                </Flex>
            </VStack>
        </Box>
    );

    return (
        <Box w="100%" minH="100vh" bgImage={`url(${donorBg})`} bgSize="cover" bgPos="center" bgRepeat="no-repeat" position="relative">
            <Box position="absolute" inset="0" zIndex="0" />
            <Box position="relative" zIndex="1">
                {renderHeader()}
                <Box px={[4, 6]} mt={-6}>
                    {step === 1 && <Step1 />}
                    {step === 2 && <Step2 />}
                    {step === 3 && <Step3 />}
                    {step === 4 && <Step4 />}
                </Box>
                <Box bg="white" textAlign="center" py={8} mt={16}>
                    <Text color="#111" fontSize="sm" mb={2}>
                        Stuck somewhere? We’d love to help you. Message us at <Box as="span" fontWeight="bold">support@iskconchennai.org</Box> and we’ll respond as soon as possible.
                    </Text>
                    <Text color="gray.600" fontSize="xs" mt={3}>© 2025 Hare Krishna Movement Chennai. All rights reserved.</Text>
                </Box>
            </Box>
        </Box>
    );
};

export default DonationPage;