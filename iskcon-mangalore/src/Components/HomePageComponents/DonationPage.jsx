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
    SimpleGrid,
    Stack,
    Image,
    useBreakpointValue,
    Icon,
    Flex,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Badge,
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
import AutoSuggestInput from "./AutoSuggestInput";
import { IndiaStates, DistrictsByState } from "../../constants/indiaLocations";

const SQFT_PRICE = 5001;

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

    const gridCols = useBreakpointValue({ base: 1, md: 2 });
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

    const handleCopyAddress = (e) => {
        const checked = e.target.checked;
        setCopyTaxAddress(checked);
        if (checked) {
            setFormData((p) => ({
                ...p,
                taxHouseNumber: p.houseNumber || "",
                taxStreet: p.street || "",
                taxState: p.state || "",
                taxCity: p.city || "",
                taxPincode: p.pincode || "",
            }));
        } else {
            setFormData((p) => ({
                ...p,
                taxHouseNumber: "",
                taxStreet: "",
                taxState: "",
                taxCity: "",
                taxPincode: "",
            }));
        }
    };

    const renderHeader = () => (
        <Box textAlign="center" mb={5}>
            <Text fontWeight="bold" fontSize="lg" color={IskconBgColor}>
                Dakshina Dwaraka Dham | Square Feet Campaign
            </Text>
            <Flex align="center" justify="center" mt={3}>
                <Image
                    src={campaignerPhoto}
                    alt="campaigner"
                    borderRadius="full"
                    boxSize="50px"
                    objectFit="cover"
                    mr={3}
                />
                <Text fontWeight="semibold" color="gray.700">
                    {campaignerName}
                </Text>
            </Flex>
        </Box>
    );

    /** --------------------------
     * STEP 1 - DONATION SELECTION
     * -------------------------- */
    const Step1 = () => (
        <Box bg="white" p={[6, 8]} borderRadius="lg" boxShadow="md" maxW="600px" mx="auto">
            {renderHeader()}
            <VStack spacing={5}>
                <VStack spacing={0}>
                    <Text fontSize="xs" color="gray.500" fontWeight="bold" letterSpacing="wide" textTransform="uppercase">
                        Select Your Contribution
                    </Text>
                    <Text fontSize="3xl" fontWeight="extrabold" color="#2C0A0A" fontFamily="'Cinzel', serif">
                        {sqFt} <Text as="span" fontSize="lg" color="gray.500">Sq. Feet</Text>
                    </Text>
                    <Badge colorScheme="red" variant="subtle" fontSize="0.8em" px={2} borderRadius="full">
                        {context.title}
                    </Badge>
                </VStack>

                <Flex justify="center" align="center" h="120px" w="100%" bg="gray.50" borderRadius="lg" border="1px dashed #CBD5E0" p={4}>
                    <SimpleGrid columns={Math.ceil(Math.sqrt(Math.min(sqFt, 25)))} spacing={1}>
                        {[...Array(Math.min(sqFt, 25))].map((_, i) => (
                            <Box key={i} w="16px" h="16px" bg={i === 0 ? "#D4AF37" : "#F6E05E"} borderRadius="2px" boxShadow="xs" opacity={0.9} />
                        ))}
                    </SimpleGrid>
                    {sqFt > 25 && <Text ml={2} color="gray.400" fontWeight="bold">+{sqFt - 25} more</Text>}
                </Flex>

                <Box textAlign="center">
                    <Flex justify="center" align="center" gap={2} mb={1}>
                        <Icon as={context.icon} color="#B22222" />
                        <Text fontWeight="bold" color="#2C0A0A">{context.title}</Text>
                    </Flex>
                    <Text fontSize="sm" color="gray.600">"{context.desc}"</Text>
                </Box>

                <Box w="100%" px={2}>
                    <Slider aria-label="sqft-slider" defaultValue={1} min={1} max={108} step={1} onChange={(val) => setSqFt(val)}>
                        <SliderTrack bg="gray.200" h="10px" borderRadius="full">
                            <SliderFilledTrack bg="#B22222" />
                        </SliderTrack>
                        <SliderThumb boxSize={8} border="4px solid #B22222" bg="white" boxShadow="md">
                            <Box as={FaGem} color="#B22222" />
                        </SliderThumb>
                    </Slider>

                    <Flex justify="space-between" mt={4} gap={2}>
                        {[1, 5, 10, 25, 108].map((v) => (
                            <Button key={v} size="xs" variant={sqFt === v ? "solid" : "outline"} colorScheme="red" onClick={() => setSqFt(v)}>
                                {v} SqFt
                            </Button>
                        ))}
                    </Flex>
                </Box>

                <VStack spacing={1} mt={2}>
                    <Text fontSize="sm" color="gray.600">Or enter custom amount (min ₹500)</Text>
                    <Input type="number" min={500} placeholder="Enter amount manually" value={customAmount} onChange={(e) => setCustomAmount(e.target.value)} w="60%" textAlign="center" />
                </VStack>

                <Box w="100%" pt={4} borderTop="1px dashed #E2E8F0" textAlign="center">
                    <Text fontSize="sm" color="gray.500" mb={1}>Total Sponsorship</Text>
                    <Text fontSize="3xl" fontWeight="bold" color="#B22222">₹{totalAmount.toLocaleString("en-IN")}</Text>
                </Box>

                <Button colorScheme="red" w="100%" py={6} borderRadius="full" onClick={nextStep}>
                    Next
                </Button>
            </VStack>
        </Box>
    );

    /** --------------------------
     * STEP 2 - PERSONAL DETAILS
     * -------------------------- */
    const Step2 = () => (
        <Box bg="white" p={[6, 8]} borderRadius="lg" boxShadow="md" maxW="700px" mx="auto">
            {renderHeader()}
            <Text textAlign="center" color="gray.600" mb={4}>Please fill the following details to proceed</Text>
            <VStack spacing={4} align="stretch">
                {["username", "mobileno", "email"].map((field, i) => (
                    <VStack align="start" key={i} spacing={1}>
                        <Text fontWeight="semibold" color="#0A1A33">
                            {field === "username" ? "Full Name *" : field === "mobileno" ? "WhatsApp Number *" : "Email *"}
                        </Text>
                        <Input name={field} value={formData?.[field] || ""} onChange={handleOnChange} placeholder={`Enter your ${field}`} border="1px solid #CCC" />
                        {errors?.[field] && <Text color="red.500">{errors[field]}</Text>}
                    </VStack>
                ))}
                <VStack align="start">
                    <Text fontWeight="semibold" color="#0A1A33">Date of Birth (Optional)</Text>
                    <Input type="date" name="dob" value={formData?.dob || ""} onChange={handleOnChange} border="1px solid #CCC" />
                    <Text fontSize="xs" color="gray.500">A special Sankalp and Aarti will be performed on your birthday.</Text>
                </VStack>

                <Flex mt={6} gap={3}>
                    <Button variant="outline" colorScheme="gray" w="50%" onClick={prevStep}>Back</Button>
                    <Button colorScheme="red" w="50%" onClick={nextStep}>Next</Button>
                </Flex>
            </VStack>
        </Box>
    );

    /** --------------------------
     * STEP 3 - ADDITIONAL OPTIONS
     * -------------------------- */
    const Step3 = () => (
        <Box bg="white" p={[6, 8]} borderRadius="lg" boxShadow="md" maxW="800px" mx="auto">
            {renderHeader()}
            <VStack align="start" spacing={3}>
                <Checkbox name="prasadRequired" isChecked={!!formData?.prasadRequired} onChange={handleOnChange}>
                    I would like to receive Gift & Maha Prasadam (Only within India)
                </Checkbox>
                <Checkbox name="taxExemption" isChecked={!!formData?.taxExemption} onChange={handleOnChange}>
                    I would like to avail 80G tax benefits
                </Checkbox>
                <Checkbox name="isanonymous" isChecked={!!formData?.isanonymous} onChange={handleOnChange}>
                    Make my donation anonymous
                </Checkbox>

                <Flex mt={6} gap={3}>
                    <Button variant="outline" colorScheme="gray" w="50%" onClick={prevStep}>Back</Button>
                    <Button colorScheme="red" w="50%" onClick={nextStep}>Next</Button>
                </Flex>
            </VStack>
        </Box>
    );

    /** --------------------------
     * STEP 4 - REVIEW & PAY
     * -------------------------- */
    const Step4 = () => (
        <Box bg="white" p={[6, 8]} borderRadius="lg" boxShadow="md" maxW="700px" mx="auto">
            {renderHeader()}
            <Text fontWeight="bold" color="#B22222" fontSize="2xl" textAlign="center" mb={4}>
                ₹{totalAmount.toLocaleString("en-IN")}
            </Text>
            <VStack spacing={3} align="start" fontSize="sm" color="gray.700">
                <Text><b>Name:</b> {formData.username}</Text>
                <Text><b>WhatsApp:</b> {formData.mobileno}</Text>
                <Text><b>Email:</b> {formData.email}</Text>
                {formData.dob && <Text><b>DOB:</b> {formData.dob}</Text>}
                {formData.prasadRequired && <Text>✔️ Gift & Maha Prasadam Selected</Text>}
                {formData.taxExemption && <Text>✔️ 80G Tax Benefit Opted</Text>}
            </VStack>

            <Divider my={4} />

            <VStack>
                <HStack justify="center">
                    <LuBriefcase color="#6B7280" />
                    <Text fontSize="sm" color="gray.600">Secure payment via Razorpay</Text>
                </HStack>

                <Flex mt={6} gap={3}>
                    <Button variant="outline" colorScheme="gray" w="50%" onClick={prevStep}>Back</Button>
                    <Button bgGradient="linear(to-r, #B22222, #8B0000)" color="white" w="50%" onClick={handleSubmit}>
                        Proceed to Pay
                    </Button>
                </Flex>
            </VStack>
        </Box>
    );

    return (
        <Box w="100%" minH="100vh" bg="#F7F9FC" py={6} px={[4, 6, 10]}>
            <HeadingBanner />
            {step === 1 && <Step1 />}
            {step === 2 && <Step2 />}
            {step === 3 && <Step3 />}
            {step === 4 && <Step4 />}
        </Box>
    );
};

export default DonationPage;