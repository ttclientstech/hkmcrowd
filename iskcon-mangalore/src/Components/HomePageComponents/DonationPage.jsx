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
    Fade,
    Link,
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
    FaPlus,
    FaCrown,
    FaInfoCircle
} from "react-icons/fa";

// Assets & Components
import { donorBg, templeLogo } from "../../constants/cdnImages";
import AutoSuggestInput from "./AutoSuggestInput";
import { IndiaStates, DistrictsByState } from "../../constants/indiaLocations";

// ---------- Theme Colors ----------
const SQFT_PRICE = 5000;
const GOLD = "#FFD700";
const RED = "#E63946";
const NAVY = "#081229";
const TEXT_DARK = "#1A1A1A";

// ---------- Helper: Context Titles ----------
const getContext = (n) => {
    if (n === 1) return { title: "Bronze Sevak", desc: "You have taken the first precious step in this historic mission.", icon: FaRulerCombined, color: "gray", next: 5, nextTitle: "Festival Hall Seva" };
    if (n < 5) return { title: "Bronze Sevak", desc: "Every stone strengthens the base.", icon: FaRulerCombined, color: "gray", next: 5, nextTitle: "Festival Hall Seva" };
    if (n < 10) return { title: "Silver Guardian", desc: "Supporting construction of our Festival Hall.", icon: FaHandsHelping, color: "blue", next: 10, nextTitle: "Cultural Hall Seva" };
    if (n < 20) return { title: "Cultural Hall Seva", desc: "Helping artists share India’s cultural beauty.", icon: FaTheaterMasks, color: "cyan", next: 20, nextTitle: "Annadanam Hall Seva" };
    if (n < 25) return { title: "Annadanam Hall Seva", desc: "Feeding thousands with love through the Annadanam Hall.", icon: FaUtensils, color: "orange", next: 25, nextTitle: "Cultural Visionary" };
    return { title: "Cultural Visionary", desc: "Building a legacy of heritage for future generations.", icon: FaGem, color: "purple", next: null, nextTitle: "Max Level Reached" };
};

// ==========================================
// SUB-COMPONENTS
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
    const displaySqFt = customAmount && parseInt(customAmount) >= 500
        ? Math.floor(parseInt(customAmount) / SQFT_PRICE) || 1
        : sqFt;
    const activeContext = getContext(displaySqFt);

    return (
        <Fade in={true}>
            <Box bg="white" p={[5, 8]} borderRadius="24px" boxShadow="0 20px 40px rgba(0,0,0,0.2)" maxW="600px" mx="auto" borderTop={`6px solid ${activeContext.color === "purple" ? "#805AD5" : "#D69E2E"}`}>
                <VStack spacing={6}>
                    <VStack spacing={1}>
                        <Text fontSize="xl" fontWeight="800" textAlign="center" color={TEXT_DARK}>
                            Make Your Mark in History
                        </Text>
                        <Text fontSize="sm" color="gray.500">Select the number of Sq.Ft you wish to sponsor</Text>
                    </VStack>

                    <Box w="100%" position="relative">
                        <SimpleGrid columns={5} spacing="6px" mb={2} maxW="280px" mx="auto">
                            {[...Array(25)].map((_, i) => {
                                const isFilled = i < displaySqFt;
                                return (
                                    <Box
                                        key={i}
                                        onClick={() => {
                                            // ✅ ADDED: Vibration logic
                                            if (typeof navigator !== "undefined" && navigator.vibrate) {
                                                navigator.vibrate(50);
                                            }
                                            handlePresetClick(i + 1);
                                        }}
                                        cursor="pointer"
                                        w="100%"
                                        paddingTop="100%"
                                        borderRadius="4px"
                                        position="relative"
                                        bg={isFilled ? "linear-gradient(135deg, #FFD700 0%, #F59E0B 50%, #B7791F 100%)" : "white"}
                                        border={isFilled ? "none" : "1px solid #48BB78"}
                                        boxShadow={isFilled ? "inset 0 0 0 1px rgba(255,255,255,0.4), 0 2px 4px rgba(0,0,0,0.2)" : "none"}
                                        transition="all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                                        transform={isFilled ? "scale(1)" : "scale(0.92)"}
                                        opacity={isFilled ? 1 : 0.6}
                                        _hover={{ transform: "scale(1.1)", zIndex: 10, borderColor: "#F59E0B" }}
                                    >
                                        {isFilled && (
                                            <Box
                                                position="absolute"
                                                top="0" left="0" right="0" bottom="0"
                                                bg="linear-gradient(rgba(255,255,255,0.4), transparent)"
                                                borderRadius="4px"
                                            />
                                        )}
                                    </Box>
                                );
                            })}
                        </SimpleGrid>
                        <Text fontSize="10px" color="gray.400" textAlign="center" mt={1}>
                            Click blocks to select quantity (1 Block = 1 Sq. Ft.)
                        </Text>
                    </Box>

                    <VStack spacing={5} w="100%">
                        <Flex align="center" justify="space-between" w="100%" maxW="320px" bg="white" border="1px solid #E2E8F0" p={2} borderRadius="full" boxShadow="sm">
                            <IconButton
                                icon={<FaMinus />}
                                onClick={handleDecrement}
                                isRound size="md" variant="ghost" color="gray.500" aria-label="Decrease"
                                isDisabled={displaySqFt <= 1}
                            />
                            <VStack spacing={0}>
                                <Text fontSize="2xl" fontWeight="800" color={TEXT_DARK} lineHeight="1">
                                    {displaySqFt} <Text as="span" fontSize="sm" color="gray.500" fontWeight="normal">Sq. Ft.</Text>
                                </Text>
                            </VStack>
                            <IconButton
                                icon={<FaPlus />}
                                onClick={handleIncrement}
                                isRound size="md" bg="green.50" color="green.600" _hover={{ bg: "green.100" }} aria-label="Increase"
                                isDisabled={displaySqFt >= 25}
                            />
                        </Flex>

                        <Flex gap={2} wrap="wrap" justify="center">
                            {[1, 5, 10, 15, 20, 25].map(val => (
                                <Button
                                    key={val}
                                    size="xs"
                                    variant={displaySqFt === val ? "solid" : "outline"}
                                    colorScheme={displaySqFt === val ? "orange" : "gray"}
                                    onClick={() => handlePresetClick(val)}
                                    borderRadius="full"
                                    px={4}
                                >
                                    {val} Sq.Ft
                                </Button>
                            ))}
                        </Flex>
                    </VStack>

                    <Box textAlign="center" bg="blue.50" w="full" py={3} borderRadius="lg" border="1px dashed" borderColor="blue.200">
                        <Text fontSize="sm" fontWeight="bold" color="blue.700">TOTAL CONTRIBUTION</Text>
                        <Text fontSize="2xl" fontWeight="900" color={NAVY} lineHeight="1.2">
                            ₹{totalAmount.toLocaleString("en-IN")}
                        </Text>
                    </Box>

                    <Box w="100%" pt={2}>
                        <Text fontSize="xs" textAlign="center" color="gray.400" mb={2}>OR ENTER CUSTOM AMOUNT</Text>
                        <Input
                            type="number"
                            min={500}
                            placeholder="Enter amount manually (Min ₹500)"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            textAlign="center"
                            bg="gray.50"
                            border="1px solid #E2E8F0"
                            _focus={{ borderColor: RED, bg: "white" }}
                        />
                        {customAmount && parseInt(customAmount) < 500 && (
                            <Text fontSize="xs" color="red.500" textAlign="center" mt={1}>Minimum donation is ₹500</Text>
                        )}
                    </Box>

                    <Button
                        bg={RED}
                        color="white"
                        w="80%"
                        py={7}
                        borderRadius="full"
                        onClick={nextStep}
                        _hover={{ bg: "#D32F2F", transform: "scale(1.02)", boxShadow: "xl" }}
                        transition="all 0.25s ease"
                        boxShadow="lg"
                        fontSize="lg"
                        isDisabled={customAmount && parseInt(customAmount) < 500}
                    >
                        Donate & Build
                    </Button>
                </VStack>
            </Box>
        </Fade>
    );
};

const Step2 = ({ formData, handleOnChange, nextStep, prevStep, totalAmount }) => {
    const effectiveSqFt = Math.floor(totalAmount / SQFT_PRICE);

    return (
        <Fade in={true}>
            <Box bg="white" p={[5, 8]} borderRadius="24px" boxShadow="0 20px 40px rgba(0,0,0,0.2)" maxW="600px" mx="auto">
                <VStack spacing={1} mb={6}>
                    {effectiveSqFt > 0 && (
                        <Badge colorScheme="orange" variant="subtle" fontSize="sm" px={3} py={1} borderRadius="full">
                            <Icon as={FaCrown} mr={1} mb="2px" />
                            Proudly Building {effectiveSqFt} Sq. Ft. of Heritage
                        </Badge>
                    )}
                    <Text textAlign="center" fontWeight="800" color={NAVY} fontSize="3xl">
                        ₹{totalAmount.toLocaleString("en-IN")}
                    </Text>
                </VStack>

                <Text textAlign="center" color="gray.700" mb={4} fontWeight="600">Please fill in your details</Text>
                <VStack spacing={4} align="stretch">
                    <VStack align="start" spacing={1}>
                        <Text fontWeight="semibold" color="#0A1A33">Full Name *</Text>
                        <Input
                            name="username"
                            value={formData?.username || ""}
                            onChange={handleOnChange}
                            placeholder="Enter your full name"
                            border="1px solid #CCC"
                        />
                    </VStack>

                    <VStack align="start" spacing={1}>
                        <Text fontWeight="semibold" color="#0A1A33">WhatsApp Number *</Text>
                        <Input
                            name="mobileno"
                            value={formData?.mobileno || ""}
                            onChange={handleOnChange}
                            placeholder="Enter your mobile number"
                            border="1px solid #CCC"
                        />
                    </VStack>

                    <VStack align="start" spacing={1}>
                        <Text fontWeight="semibold" color="#0A1A33">Email *</Text>
                        <Input
                            name="email"
                            value={formData?.email || ""}
                            onChange={handleOnChange}
                            placeholder="Enter your email"
                            border="1px solid #CCC"
                        />
                    </VStack>

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
                            A special Sankalp will be performed on your birthday.
                        </Text>
                    </VStack>

                    <VStack spacing={3} pt={4}>
                        <Button bg={RED} color="white" w="full" onClick={nextStep} size="lg">Continue</Button>
                        <Link color="gray.500" fontSize="sm" onClick={prevStep} fontWeight="medium">Go Back</Link>
                    </VStack>
                </VStack>
            </Box>
        </Fade>
    );
};

const Step3 = ({
                   formData,
                   handleOnChange,
                   nextStep,
                   prevStep,
                   copyTaxAddress,
                   handleCopyAddress,
                   errors,
                   totalAmount
               }) => {
    const gridCols = useBreakpointValue({ base: 1, md: 2 });
    const effectiveSqFt = Math.floor(totalAmount / SQFT_PRICE);

    return (
        <Fade in={true}>
            <Box bg="white" p={[5, 8]} borderRadius="24px" boxShadow="0 20px 40px rgba(0,0,0,0.2)" maxW={["600px", "700px"]} mx="auto">
                <VStack spacing={1} mb={4}>
                    {effectiveSqFt > 0 && (
                        <Badge colorScheme="orange" variant="subtle" fontSize="sm" px={3} py={1} borderRadius="full">
                            <Icon as={FaCrown} mr={1} mb="2px" />
                            Proudly Building {effectiveSqFt} Sq. Ft. of Heritage
                        </Badge>
                    )}
                    <Text textAlign="center" fontWeight="800" color={NAVY} fontSize="3xl">
                        ₹{totalAmount.toLocaleString("en-IN")}
                    </Text>
                </VStack>

                <Flex bg="blue.50" p={3} borderRadius="md" mb={4} align="center">
                    <Icon as={FaInfoCircle} color="blue.500" mr={2} />
                    <Text fontSize="xs" color="blue.800" fontWeight="medium">
                        Select optional services below if you wish to avail them.
                    </Text>
                </Flex>

                <VStack align="stretch" spacing={4}>

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
                                            label="State"
                                            value={formData.state}
                                            onChange={(e) => handleOnChange({ target: { name: "state", value: e.target.value } })}
                                            suggestions={IndiaStates}
                                        />
                                        {errors?.state && <Text fontSize="xs" color="red.500">{errors.state}</Text>}
                                    </VStack>
                                    <VStack align="start" spacing={1}>
                                        <Text fontSize="sm" color="#0A1A33">District *</Text>
                                        <AutoSuggestInput
                                            label="District"
                                            value={formData.city}
                                            onChange={(e) => handleOnChange({ target: { name: "city", value: e.target.value } })}
                                            suggestions={DistrictsByState[formData.state] || []}
                                        />
                                        {errors?.city && <Text fontSize="xs" color="red.500">{errors.city}</Text>}
                                    </VStack>
                                    <VStack align="start" spacing={1}>
                                        <Text fontSize="sm" color="#0A1A33">Pincode *</Text>
                                        <Input name="pincode" value={formData?.pincode || ""} onChange={handleOnChange} placeholder="6-digit Pincode" bg="white" border="1px solid #CCC" maxLength={6} />
                                        {errors?.pincode && <Text fontSize="xs" color="red.500">{errors.pincode}</Text>}
                                    </VStack>
                                </SimpleGrid>
                            </Box>
                        )}

                        <Checkbox name="taxExemption" isChecked={!!formData?.taxExemption} onChange={handleOnChange}>
                            I would like to avail 80G tax benefits
                        </Checkbox>

                        {formData?.taxExemption && (
                            <Box w="100%" bg="gray.50" p={4} borderRadius="md" border="1px solid" borderColor="gray.200">
                                <Text fontWeight="bold" fontSize="md" color="#0A1A33" mb={1}>
                                    80G Receipt Address
                                </Text>
                                <Text fontSize="10px" color="gray.500" mb={4} lineHeight="1.4">
                                    Finance Act 2021 has made it mandatory to upload the details of donations collected by all those organisations collecting donations which qualify for 80G deduction in Form No. 10BD. The PAN and Address are mandatory details to be uploaded.
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
                                            label="State"
                                            value={formData.taxState}
                                            onChange={(e) => handleOnChange({ target: { name: "taxState", value: e.target.value } })}
                                            suggestions={IndiaStates}
                                        />
                                        {errors?.taxState && <Text fontSize="xs" color="red.500">{errors.taxState}</Text>}
                                    </VStack>
                                    <VStack align="start" spacing={1}>
                                        <Text fontSize="sm" color="#0A1A33">District *</Text>
                                        <AutoSuggestInput
                                            label="District"
                                            value={formData.taxCity}
                                            onChange={(e) => handleOnChange({ target: { name: "taxCity", value: e.target.value } })}
                                            suggestions={DistrictsByState[formData.taxState] || []}
                                        />
                                        {errors?.taxCity && <Text fontSize="xs" color="red.500">{errors.taxCity}</Text>}
                                    </VStack>
                                    <VStack align="start" spacing={1}>
                                        <Text fontSize="sm" color="#0A1A33">Pincode *</Text>
                                        <Input name="taxPincode" value={formData?.taxPincode || ""} onChange={handleOnChange} placeholder="6-digit Pincode" bg="white" border="1px solid #CCC" maxLength={6} />
                                        {errors?.taxPincode && <Text fontSize="xs" color="red.500">{errors.taxPincode}</Text>}
                                    </VStack>
                                    <VStack align="start" spacing={1}>
                                        <Text fontSize="sm" color="#0A1A33">PAN No. *</Text>
                                        <Input name="panno" value={formData?.panno || ""} onChange={(e) => handleOnChange({ target: { name: "panno", value: e.target.value.toUpperCase() } })} placeholder="Ex: ABCDE1234F" bg="white" border="1px solid #CCC" maxLength={10} />
                                        {errors?.panno && <Text fontSize="xs" color="red.500">{errors.panno}</Text>}
                                    </VStack>
                                </SimpleGrid>
                            </Box>
                        )}

                        <Checkbox name="isanonymous" isChecked={!!formData?.isanonymous} onChange={handleOnChange}>
                            Make my donation anonymous on website
                        </Checkbox>
                    </VStack>

                    <VStack spacing={3} pt={4}>
                        <Button bg={RED} color="white" w="full" onClick={nextStep} size="lg">Continue</Button>
                        <Link color="gray.500" fontSize="sm" onClick={prevStep} fontWeight="medium">Go Back</Link>
                    </VStack>
                </VStack>
            </Box>
        </Fade>
    );
};

const Step4 = ({ formData, totalAmount, prevStep, handleSubmit, isLoading }) => {
    const effectiveSqFt = Math.floor(totalAmount / SQFT_PRICE);

    return (
        <Fade in={true}>
            <Box bg="white" p={[5, 8]} borderRadius="24px" boxShadow="0 20px 40px rgba(0,0,0,0.2)" maxW="600px" mx="auto">
                <Text textAlign="center" fontWeight="bold" color="gray.600" fontSize="md" mb={4}>
                    Please review the provided details
                </Text>

                <VStack spacing={1} mb={6}>
                    {effectiveSqFt > 0 && (
                        <Badge colorScheme="orange" variant="solid" fontSize="sm" px={4} py={1} borderRadius="full">
                            <Icon as={FaCrown} mr={2} mb="2px" />
                            Proudly Building {effectiveSqFt} Sq. Ft. of Heritage
                        </Badge>
                    )}
                    <Text textAlign="center" fontWeight="800" color={NAVY} fontSize="3xl">
                        ₹{totalAmount.toLocaleString("en-IN")}
                    </Text>
                </VStack>

                <VStack spacing={3} align="start" fontSize="sm" color="gray.700" w="full">
                    <Text><b>Name:</b> {formData.username}</Text>
                    <Text><b>WhatsApp:</b> {formData.mobileno}</Text>
                    <Text><b>Email:</b> {formData.email}</Text>
                    {formData.dob && <Text><b>DOB:</b> {formData.dob}</Text>}

                    {formData.prasadRequired && (
                        <Box w="100%" bg="gray.50" p={3} borderRadius="md" border="1px dashed" borderColor="gray.300">
                            <Text fontWeight="bold" color="#0A1A33" mb={1}>✔️ Gift & Maha Prasadam Selected</Text>
                            <Text><b>Delivery Address:</b></Text>
                            <Text>{formData.houseNumber}, {formData.street}</Text>
                            <Text>{formData.city}, {formData.state} - {formData.pincode}</Text>
                        </Box>
                    )}

                    {formData.taxExemption && (
                        <Box w="100%" bg="gray.50" p={3} borderRadius="md" border="1px dashed" borderColor="gray.300">
                            <Text fontWeight="bold" color="#0A1A33" mb={1}>✔️ 80G Tax Benefit Opted</Text>
                            <Text><b>PAN No:</b> {formData.panno}</Text>
                            <Text><b>Tax Address:</b></Text>
                            <Text>{formData.taxHouseNumber}, {formData.taxStreet}</Text>
                            <Text>{formData.taxCity}, {formData.taxState} - {formData.taxPincode}</Text>
                        </Box>
                    )}

                    {formData.isanonymous && (
                        <Box w="100%" bg="gray.50" p={3} borderRadius="md" border="1px dashed" borderColor="gray.300">
                            <Text fontWeight="bold" color="#0A1A33">✔️ Anonymous Donation Selected</Text>
                        </Box>
                    )}
                </VStack>
                <Divider my={4} />
                <VStack spacing={4}>
                    <HStack justify="center"><Icon as={FaLock} color="#6B7280" /><Text fontSize="sm" color="gray.600">Secure payment via Razorpay</Text></HStack>
                    <Button
                        bg={RED}
                        color="white"
                        w="full"
                        size="lg"
                        py={8}
                        fontSize="xl"
                        onClick={handleSubmit}
                        boxShadow="xl"
                        _hover={{ bg: "#C53030" }}
                        isLoading={isLoading}
                        loadingText="Processing Payment..."
                        isDisabled={isLoading}
                    >
                        Pay Now
                    </Button>
                    <Link color="gray.500" fontSize="sm" onClick={prevStep} fontWeight="medium">Go Back</Link>
                </VStack>
            </Box>
        </Fade>
    );
};

const DonationPage = ({
                          amount,
                          setAmount,
                          handleSubmit,
                          handleOnChange,
                          formData,
                          errors,
                          setFormData,
                          campaignerName = "Campaigner Name",
                          campaignerPhoto = "/images/campaigner.jpg",
                          isLoading
                      }) => {
    const [step, setStep] = useState(1);
    const [sqFt, setSqFt] = useState(1);
    const [customAmount, setCustomAmount] = useState("");
    const [copyTaxAddress, setCopyTaxAddress] = useState(false);
    const [step3Errors, setStep3Errors] = useState({});

    const totalAmount =
        customAmount && parseInt(customAmount) >= 500
            ? parseInt(customAmount)
            : sqFt * SQFT_PRICE;

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [step]);

    useEffect(() => {
        if (!formData?.taxExemption) {
            setFormData((prev) => ({
                ...prev,
                taxHouseNumber: "", taxStreet: "", taxState: "", taxCity: "", taxPincode: "", panno: ""
            }));
            setCopyTaxAddress(false);
        }
    }, [formData?.taxExemption, setFormData]);

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

    const validatePersonal = () => {
        let e = {};
        if (!formData?.username?.trim()) e.username = "Full name is required";
        if (!formData?.mobileno?.match(/^[6-9]\d{9}$/)) e.mobileno = "Enter valid 10-digit WhatsApp number";
        if (!formData?.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Enter valid email";
        return e;
    };

    const validateStep3 = () => {
        let e = {};
        const pincodeRegex = /^\d{6}$/;
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

        if (formData?.prasadRequired) {
            if (!formData?.houseNumber?.trim()) e.houseNumber = "Required";
            if (!formData?.street?.trim()) e.street = "Required";
            if (!formData?.city?.trim()) e.city = "Required";
            if (!formData?.state?.trim()) e.state = "Required";
            if (!formData?.pincode?.trim()) {
                e.pincode = "Required";
            } else if (!pincodeRegex.test(formData.pincode)) {
                e.pincode = "Enter valid 6-digit pincode";
            }
        }

        if (formData?.taxExemption) {
            if (!formData?.taxHouseNumber?.trim()) e.taxHouseNumber = "Required";
            if (!formData?.taxStreet?.trim()) e.taxStreet = "Required";
            if (!formData?.taxCity?.trim()) e.taxCity = "Required";
            if (!formData?.taxState?.trim()) e.taxState = "Required";

            if (!formData?.taxPincode?.trim()) {
                e.taxPincode = "Required";
            } else if (!pincodeRegex.test(formData.taxPincode)) {
                e.taxPincode = "Enter valid 6-digit pincode";
            }

            if (!formData?.panno?.trim()) {
                e.panno = "Required";
            } else if (!panRegex.test(formData.panno)) {
                e.panno = "Enter valid PAN (e.g. ABCDE1234F)";
            }
        }
        return e;
    };

    const nextStep = () => {
        if(step === 1) {
            if (customAmount && parseInt(customAmount) < 500) {
                return;
            }
            if(setAmount) setAmount(totalAmount);
        }
        if (step === 2) {
            const e = validatePersonal();
            if (Object.keys(e).length) {
                alert(Object.values(e).join("\n"));
                return;
            }
        }
        if (step === 3) {
            const e = validateStep3();
            if (Object.keys(e).length) {
                setStep3Errors(e);
                return;
            } else {
                setStep3Errors({});
            }
        }
        setStep((s) => s + 1);
    };

    const prevStep = () => setStep((s) => s - 1);

    // ✅ MODIFIED handleIncrement: Smooth 50ms vibration on mobile
    const handleIncrement = () => {
        if (typeof navigator !== "undefined" && navigator.vibrate) {
            // Short, smooth vibration for tactile feedback
            navigator.vibrate(50);
        }
        setSqFt(prev => Math.min(prev + 1, 25));
    };

    const handleDecrement = () => setSqFt(prev => Math.max(prev - 1, 1));
    const handlePresetClick = (val) => {
        setSqFt(val);
        setCustomAmount("");
    };

    const renderHeader = () => (
        <Box textAlign="center" py={[10, 12]}>
            <Image src={templeLogo} alt="Temple Logo" mx="auto" mb={4} maxW="100px" objectFit="contain" />

            <Text fontWeight="700" fontSize={["xl", "2xl"]} color="white" letterSpacing="wide">
                Dakshina Dwaraka Dham
            </Text>
            <Text fontSize="sm" mt={3} opacity={0.9} color="white" fontStyle="italic" maxW="600px" mx="auto">
                “You are standing with us to build a timeless cultural sanctuary.”
            </Text>

            <VStack mt={6} spacing={2}>
                <Text fontSize="sm" color="gold" fontWeight="bold" letterSpacing="widest" textTransform="uppercase">
                    Your Campaigner
                </Text>
                <Flex align="center" justify="center">
                    <Image src={campaignerPhoto} alt="campaigner" borderRadius="full" boxSize="60px" objectFit="cover" border={`2px solid ${GOLD}`} mr={3} fallbackSrc="https://via.placeholder.com/60" />
                    <Text fontWeight="600" fontSize="md" color="white">{campaignerName}</Text>
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
            bgAttachment="fixed"
            position="relative"
        >
            <Box position="absolute" inset="0" zIndex="0" />
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
                            totalAmount={totalAmount}
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
                            errors={step3Errors}
                            totalAmount={totalAmount}
                        />
                    )}
                    {step === 4 && (
                        <Step4
                            formData={formData}
                            totalAmount={totalAmount}
                            prevStep={prevStep}
                            handleSubmit={handleSubmit}
                            isLoading={isLoading}
                        />
                    )}
                </Box>

                <Box bg="white" textAlign="center" py={8} mt={16}>
                    <Text color="#111" fontSize="sm" mb={2}>
                        Stuck somewhere? We’d love to help you. Message us at <Box as="span" fontWeight="bold">connect@hkmchennai.org</Box> and we’ll respond as soon as possible.
                    </Text>
                    <Text color="gray.600" fontSize="xs" mt={3}>© 2025 Dakshina Dwaraka Dham Chennai. All rights reserved.</Text>
                </Box>
            </Box>
        </Box>
    );
};

export default DonationPage;