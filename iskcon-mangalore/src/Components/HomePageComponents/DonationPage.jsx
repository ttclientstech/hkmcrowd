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
    useBreakpointValue,
    Stack,
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

// Assets & Components
import donorBg from "../../assets/images/donation_page_bg.jpg";
import AutoSuggestInput from "./AutoSuggestInput";
import { IndiaStates, DistrictsByState } from "../../constants/indiaLocations";

// ---------- Theme Colors ----------
const SQFT_PRICE = 5001;
const GOLD = "#FFD700";
const RED = "#E63946";
const GREEN = "#34C759";
const TEXT_DARK = "#1A1A1A";

// ---------- Helper: Context Titles ----------
const getContext = (n) => {
    if (n === 1) return { title: "Foundation Supporter", desc: "Laying the first stone of Dakshina Dwaraka Dham.", icon: FaRulerCombined, color: "gray" };
    if (n <= 5) return { title: "Festival Hall Benefactor", desc: "Supporting celebrations in our Festival Hall.", icon: FaHandsHelping, color: "blue" };
    if (n <= 10) return { title: "Kala Madhuryam Patron", desc: "Helping artists share India’s cultural beauty.", icon: FaTheaterMasks, color: "cyan" };
    if (n <= 25) return { title: "Annadanam Contributor", desc: "Feeding thousands with love through the Annadanam Hall.", icon: FaUtensils, color: "orange" };
    return { title: "Cultural Visionary", desc: "Building a legacy of heritage for future generations.", icon: FaGem, color: "purple" };
};

// ==========================================
// SUB-COMPONENTS (Defined outside to fix focus loss)
// ==========================================

const Step1 = ({
                   sqFt,
                   customAmount,
                   setCustomAmount,
                   handleIncrement,
                   handleDecrement,
                   handlePresetClick,
                   nextStep,
                   totalAmount
               }) => {
    const context = getContext(sqFt);

    return (
        <Box bg="white" p={[6, 8]} borderRadius="20px" boxShadow="0 10px 35px rgba(0,0,0,0.25)" maxW="600px" mx="auto">
            <VStack spacing={6}>
                <Text fontSize="xl" fontWeight="700" textAlign="center" color={TEXT_DARK}>
                    Choose Your Contribution
                </Text>

                {/* VISUALIZER GRID */}
                <Box w="100%" bg="gray.50" p={4} borderRadius="xl" border="1px solid" borderColor="gray.100">
                    <Text fontSize="xs" fontWeight="bold" color="gray.400" mb={2} textAlign="center" textTransform="uppercase">
                        YOUR IMPACT VISUALIZER
                    </Text>

                    <SimpleGrid columns={7} spacing="4px" mb={4} maxW="350px" mx="auto">
                        {[...Array(35)].map((_, i) => (
                            <Box
                                key={i}
                                w="100%"
                                paddingTop="100%"
                                borderRadius="2px"
                                position="relative"
                                bg={i < sqFt ? (i < 10 ? GOLD : i < 25 ? "orange.400" : RED) : "gray.100"}
                                border={i < sqFt ? "none" : "0.5px solid"}
                                borderColor={i < sqFt ? "transparent" : "green.400"}
                                transition="all 0.2s ease"
                                transform={i < sqFt ? "scale(1)" : "scale(0.95)"}
                                boxShadow={i < sqFt ? "sm" : "none"}
                            />
                        ))}
                    </SimpleGrid>

                    <VStack spacing={2} justify="center">
                        <Badge px={3} py={1} borderRadius="full" colorScheme={context.color} fontSize="xs">
                            {context.title}
                        </Badge>
                        <Text fontSize="xs" color="gray.500" textAlign="center" maxW="90%">
                            {context.desc}
                        </Text>
                    </VStack>
                </Box>

                {/* CONTROLS */}
                <VStack spacing={4} w="100%">
                    <Flex align="center" justify="space-between" w="100%" maxW="300px" bg="gray.100" p={1} borderRadius="full">
                        <IconButton
                            icon={<FaMinus />}
                            onClick={handleDecrement}
                            isRound size="lg" bg="white" shadow="sm" aria-label="Decrease"
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
                            isRound size="lg" bg="green.500" color="white" _hover={{ bg: "green.600" }} shadow="sm" aria-label="Increase"
                            isDisabled={sqFt >= 35}
                        />
                    </Flex>

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
};

const Step2 = ({ formData, handleOnChange, nextStep, prevStep }) => (
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

const Step3 = ({
                   formData,
                   handleOnChange,
                   nextStep,
                   prevStep,
                   copyTaxAddress,
                   handleCopyAddress,
                   errors
               }) => {
    const gridCols = useBreakpointValue({ base: 1, md: 2 });

    return (
        <Box bg="white" p={[6, 8]} borderRadius="20px" boxShadow="0 10px 35px rgba(0,0,0,0.25)" maxW="700px" mx="auto">
            <VStack align="stretch" spacing={4}>
                {/* DOB Field */}
                <VStack align="start" spacing={1}>
                    <Text fontWeight="semibold" color="#0A1A33">
                        Date of Birth (Optional)
                    </Text>
                    <Input
                        type="date"
                        name="dob"
                        value={formData?.dob || ""}
                        onChange={handleOnChange}
                        border="1px solid #CCC"
                    />
                    <Text fontSize="xs" color="gray.500">
                        A special Sankalp and Aarti will be performed on your birthday.
                    </Text>
                </VStack>

                <Divider />

                {/* Prasadam & Delivery Address */}
                <VStack align="start" spacing={3}>
                    <Checkbox name="prasadRequired" isChecked={!!formData?.prasadRequired} onChange={handleOnChange}>
                        I would like to receive Gift & Maha Prasadam (India only)
                    </Checkbox>

                    {formData?.prasadRequired && (
                        <Box w="100%" bg="gray.50" p={4} borderRadius="md" border="1px solid" borderColor="gray.200">
                            <Text fontWeight="bold" fontSize="md" color="#0A1A33" mb={3}>
                                Delivery Address
                            </Text>
                            <SimpleGrid columns={gridCols} spacing={3}>
                                <VStack align="start" spacing={1}>
                                    <Text fontSize="sm" color="#0A1A33">House / Apt / Building *</Text>
                                    <Input name="houseNumber" value={formData?.houseNumber || ""} onChange={handleOnChange} placeholder="House No." bg="white" border="1px solid #CCC" />
                                    {errors?.houseNumber && <Text fontSize="xs" color="red.500">{errors.houseNumber}</Text>}
                                </VStack>
                                <VStack align="start" spacing={1}>
                                    <Text fontSize="sm" color="#0A1A33">Street / Area *</Text>
                                    <Input name="street" value={formData?.street || ""} onChange={handleOnChange} placeholder="Street" bg="white" border="1px solid #CCC" />
                                    {errors?.street && <Text fontSize="xs" color="red.500">{errors.street}</Text>}
                                </VStack>
                                <VStack align="start" spacing={1}>
                                    <Text fontSize="sm" color="#0A1A33">State *</Text>
                                    <AutoSuggestInput
                                        label="state"
                                        value={formData.state}
                                        onChange={(e) => handleOnChange({ target: { name: "state", value: e.target.value } })}
                                        suggestions={IndiaStates}
                                    />
                                    {errors?.state && <Text fontSize="xs" color="red.500">{errors.state}</Text>}
                                </VStack>
                                <VStack align="start" spacing={1}>
                                    <Text fontSize="sm" color="#0A1A33">District *</Text>
                                    <AutoSuggestInput
                                        label="district"
                                        value={formData.city}
                                        onChange={(e) => handleOnChange({ target: { name: "city", value: e.target.value } })}
                                        suggestions={DistrictsByState[formData.state] || []}
                                    />
                                    {errors?.city && <Text fontSize="xs" color="red.500">{errors.city}</Text>}
                                </VStack>
                                <VStack align="start" spacing={1}>
                                    <Text fontSize="sm" color="#0A1A33">Pincode *</Text>
                                    <Input name="pincode" value={formData?.pincode || ""} onChange={handleOnChange} placeholder="Pincode" bg="white" border="1px solid #CCC" />
                                    {errors?.pincode && <Text fontSize="xs" color="red.500">{errors.pincode}</Text>}
                                </VStack>
                            </SimpleGrid>
                        </Box>
                    )}

                    {/* Tax Exemption & 80G Address */}
                    <Checkbox name="taxExemption" isChecked={!!formData?.taxExemption} onChange={handleOnChange}>
                        I would like to avail 80G tax benefits
                    </Checkbox>

                    {formData?.taxExemption && (
                        <Box w="100%" bg="gray.50" p={4} borderRadius="md" border="1px solid" borderColor="gray.200">
                            <Text fontWeight="bold" fontSize="md" color="#0A1A33" mb={3}>
                                80G Receipt Address
                            </Text>

                            {formData?.prasadRequired && (
                                <Checkbox isChecked={copyTaxAddress} onChange={handleCopyAddress} mb={3} colorScheme="green">
                                    Same as above delivery address
                                </Checkbox>
                            )}

                            <SimpleGrid columns={gridCols} spacing={3}>
                                <VStack align="start" spacing={1}>
                                    <Text fontSize="sm" color="#0A1A33">House / Apt / Building *</Text>
                                    <Input name="taxHouseNumber" value={formData?.taxHouseNumber || ""} onChange={handleOnChange} placeholder="House No." bg="white" border="1px solid #CCC" />
                                    {errors?.taxHouseNumber && <Text fontSize="xs" color="red.500">{errors.taxHouseNumber}</Text>}
                                </VStack>
                                <VStack align="start" spacing={1}>
                                    <Text fontSize="sm" color="#0A1A33">Street / Area *</Text>
                                    <Input name="taxStreet" value={formData?.taxStreet || ""} onChange={handleOnChange} placeholder="Street" bg="white" border="1px solid #CCC" />
                                    {errors?.taxStreet && <Text fontSize="xs" color="red.500">{errors.taxStreet}</Text>}
                                </VStack>
                                <VStack align="start" spacing={1}>
                                    <Text fontSize="sm" color="#0A1A33">State *</Text>
                                    <AutoSuggestInput
                                        label="state"
                                        value={formData.taxState}
                                        onChange={(e) => handleOnChange({ target: { name: "taxState", value: e.target.value } })}
                                        suggestions={IndiaStates}
                                    />
                                    {errors?.taxState && <Text fontSize="xs" color="red.500">{errors.taxState}</Text>}
                                </VStack>
                                <VStack align="start" spacing={1}>
                                    <Text fontSize="sm" color="#0A1A33">District *</Text>
                                    <AutoSuggestInput
                                        label="district"
                                        value={formData.taxCity}
                                        onChange={(e) => handleOnChange({ target: { name: "taxCity", value: e.target.value } })}
                                        suggestions={DistrictsByState[formData.taxState] || []}
                                    />
                                    {errors?.taxCity && <Text fontSize="xs" color="red.500">{errors.taxCity}</Text>}
                                </VStack>
                                <VStack align="start" spacing={1}>
                                    <Text fontSize="sm" color="#0A1A33">Pincode *</Text>
                                    <Input name="taxPincode" value={formData?.taxPincode || ""} onChange={handleOnChange} placeholder="Pincode" bg="white" border="1px solid #CCC" />
                                    {errors?.taxPincode && <Text fontSize="xs" color="red.500">{errors.taxPincode}</Text>}
                                </VStack>
                                <VStack align="start" spacing={1}>
                                    <Text fontSize="sm" color="#0A1A33">PAN No. *</Text>
                                    <Input name="panno" value={formData?.panno || ""} onChange={handleOnChange} placeholder="PAN No." bg="white" border="1px solid #CCC" />
                                    {errors?.panno && <Text fontSize="xs" color="red.500">{errors.panno}</Text>}
                                </VStack>
                            </SimpleGrid>
                        </Box>
                    )}

                    <Checkbox name="isanonymous" isChecked={!!formData?.isanonymous} onChange={handleOnChange}>
                        Make my donation anonymous
                    </Checkbox>
                </VStack>

                <Flex mt={6} gap={3}>
                    <Button variant="outline" colorScheme="gray" w="50%" onClick={prevStep}>Back</Button>
                    <Button bg={RED} color="white" w="50%" onClick={nextStep}>Continue</Button>
                </Flex>
            </VStack>
        </Box>
    );
};

const Step4 = ({ formData, totalAmount, prevStep, handleSubmit }) => (
    <Box bg="white" p={[6, 8]} borderRadius="20px" boxShadow="0 10px 35px rgba(0,0,0,0.25)" maxW="700px" mx="auto">
        <Text fontWeight="bold" color={RED} fontSize="2xl" textAlign="center" mb={4}>₹{totalAmount.toLocaleString("en-IN")}</Text>
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
            <HStack justify="center"><Icon as={FaLock} color="#6B7280" /><Text fontSize="sm" color="gray.600">Secure payment via Razorpay</Text></HStack>
            <Flex mt={6} gap={3}>
                <Button variant="outline" colorScheme="gray" w="50%" onClick={prevStep}>Back</Button>
                <Button bg={RED} color="white" w="50%" onClick={handleSubmit}>Proceed to Pay</Button>
            </Flex>
        </VStack>
    </Box>
);

// ==========================================
// MAIN COMPONENT
// ==========================================

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

    // Clear tax fields if exemption unchecked
    useEffect(() => {
        if (!formData?.taxExemption) {
            setFormData((prev) => ({
                ...prev,
                taxHouseNumber: "", taxStreet: "", taxState: "", taxCity: "", taxPincode: "", panno: ""
            }));
            setCopyTaxAddress(false);
        }
    }, [formData?.taxExemption, setFormData]);

    // Handle "Same as delivery address"
    const handleCopyAddress = (e) => {
        const checked = e.target.checked;
        setCopyTaxAddress(checked);
        if (checked) {
            setFormData((prev) => ({
                ...prev,
                taxHouseNumber: prev.houseNumber || "",
                taxStreet: prev.street || "",
                taxState: prev.state || "",
                taxCity: prev.city || "",
                taxPincode: prev.pincode || "",
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                taxHouseNumber: "", taxStreet: "", taxState: "", taxCity: "", taxPincode: "",
            }));
        }
    };

    // Validation
    const validatePersonal = () => {
        let e = {};
        if (!formData?.username?.trim()) e.username = "Full name is required";
        if (!formData?.mobileno?.match(/^[6-9]\d{9}$/)) e.mobileno = "Enter valid 10-digit WhatsApp number";
        if (!formData?.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Enter valid email";
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

    const handleIncrement = () => setSqFt(prev => Math.min(prev + 1, 35));
    const handleDecrement = () => setSqFt(prev => Math.max(prev - 1, 1));
    const handlePresetClick = (val) => setSqFt(val);

    const renderHeader = () => (
        <Box textAlign="center" py={[10, 12]}>
            <Text fontWeight="700" fontSize={["xl", "2xl"]} color="white" letterSpacing="wide">
                Dakshina Dwaraka Dham
            </Text>
            <Box w="60px" h="4px" bgGradient="linear(to-r, #FFD700, #E63946)" mx="auto" borderRadius="full" my={3} />
            <Text fontWeight="extrabold" fontSize={["2xl", "3xl"]} bgGradient="linear(to-r, #FFD700, #E63946)" bgClip="text">
                Square Feet Campaign
            </Text>
            <Text fontSize="sm" mt={3} opacity={0.9} color="white" fontStyle="italic" maxW="600px" mx="auto">
                “You are standing with <b>{campaignerName}</b> to build a timeless cultural sanctuary.”
            </Text>
            <Flex align="center" justify="center" mt={5}>
                <Image src={campaignerPhoto} alt="campaigner" borderRadius="full" boxSize="60px" objectFit="cover" border={`2px solid ${GOLD}`} mr={3} fallbackSrc="https://via.placeholder.com/60" />
                <Text fontWeight="600" fontSize="md" color="white">{campaignerName}</Text>
            </Flex>
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
            bgAttachment="fixed" // ✅ Fix: Covers whole screen even on scroll
            position="relative"
        >
            <Box position="absolute" inset="0" bg="linear-gradient(to bottom, rgba(0,0,0,0.75), rgba(8,18,41,1))" zIndex="0" />
            <Box position="relative" zIndex="1">
                {renderHeader()}

                <Box px={[4, 6]} mt={-6}>
                    {step === 1 && (
                        <Step1
                            sqFt={sqFt}
                            customAmount={customAmount}
                            setCustomAmount={setCustomAmount}
                            handleIncrement={handleIncrement}
                            handleDecrement={handleDecrement}
                            handlePresetClick={handlePresetClick}
                            nextStep={nextStep}
                            totalAmount={totalAmount}
                        />
                    )}
                    {step === 2 && (
                        <Step2
                            formData={formData}
                            handleOnChange={handleOnChange}
                            nextStep={nextStep}
                            prevStep={prevStep}
                        />
                    )}
                    {step === 3 && (
                        <Step3
                            formData={formData}
                            handleOnChange={handleOnChange}
                            nextStep={nextStep}
                            prevStep={prevStep}
                            copyTaxAddress={copyTaxAddress}
                            handleCopyAddress={handleCopyAddress}
                            errors={errors}
                        />
                    )}
                    {step === 4 && (
                        <Step4
                            formData={formData}
                            totalAmount={totalAmount}
                            prevStep={prevStep}
                            handleSubmit={handleSubmit}
                        />
                    )}
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