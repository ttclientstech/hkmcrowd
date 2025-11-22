// PaymentPageFull.jsx
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
  Textarea,
  Stack,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import { LuBriefcase } from "react-icons/lu";
import { IskconBgColor } from '../utils';
import HeadingBanner from "./HeadingBannerNew";
import AutoSuggestInput from "./AutoSuggestInput";
import { IndiaStates, DistrictsByState } from "../../constants/indiaLocations";

const PaymentPageFull = ({
  amount,
  handleSubmit,
  handleOnChange,
  formData,
  errors,
  setPaymentModel,
    setFormData,
}) => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
  const [copyTaxAddress, setCopyTaxAddress] = useState(false);

  // Responsive column count for the address grid
  const gridCols = useBreakpointValue({ base: 1, md: 2 });

  useEffect(() => {
    // if taxExemption turned off, clear tax fields locally (so parent sees changes)
    if (!formData?.taxExemption && (formData?.taxAddress || formData?.taxPincode)) {
      handleOnChange({ target: { name: "taxAddress", value: "" } });
      handleOnChange({ target: { name: "taxPincode", value: "" } });
      setCopyTaxAddress(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData?.taxExemption]);

  const handleCopyAddress = (e) => {
    const checked = e.target.checked;
    setCopyTaxAddress(checked);

    if (checked) {
      // Build a single-line tax address from communication address parts
      const composed =
        (formData?.houseNumber ? formData.houseNumber + ", " : "") +
        (formData?.street ? formData.street + ", " : "") +
        (formData?.city ? formData.city + ", " : "") +
        (formData?.state ? formData.state : "");

        setFormData((prev) => ({
            ...prev,
            taxAddress: composed,
            taxPincode: prev.pincode || "",
        }));
    } else {
      // clear tax fields when unchecked
        setFormData((prev) => ({
            ...prev,
            taxAddress: "",
            taxPincode: "",
        }));
    }
  };

  return (
    <Box w="100%" minH="100vh" bg="#F7F9FC" py={6} px={[4, 6, 10]}>
        <HeadingBanner />
        <Box textAlign="center" mt={2} mb={2}>
            <Text fontSize="sm" color="gray.600" fontWeight="medium">
                Please fill the following details to proceed
            </Text>
        </Box>
      {/* Header
      <Box
        bg={IskconBgColor}
        color="white"
        py={4}
        px={6}
        borderRadius="10px"
        textAlign="center"
        mb={6}
      >
        <Text fontSize={["lg", "xl"]} fontWeight="bold">
          Offer your seva and receive the blessings of Sri Sri Rukmini Dwarakadish
        </Text>
      </Box>*/}

      {/* Card */}
      <Box
        bg="white"
        p={[4, 6, 8]}
        borderRadius="10px"
        boxShadow="lg"
        maxW="980px"
        mx="auto"
      >
        {/* Amount */}
        <Box textAlign="center" mb={6}>
          <Text fontSize={["xl", "2xl"]} fontWeight="bold" color={IskconBgColor}>
           Donation Amount : ₹ {amount}
          </Text>
        </Box>

        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">

            {/* Full Name */}
            <VStack align="start" spacing={1}>
              <Text fontWeight="semibold" color="#0A1A33">
                Full Name *
              </Text>
              <Input
                name="username"
                value={formData?.username || ""}
                onChange={handleOnChange}
                placeholder="Enter your full name"
                border="1px solid #CCC"
              />
              {errors?.username && <Text color="red.500">{errors.username}</Text>}
            </VStack>

            {/* WhatsApp Number */}
            <VStack align="start" spacing={1}>
              <Text fontWeight="semibold" color="#0A1A33">
                WhatsApp Number *
              </Text>
              <Input
                name="mobileno"
                value={formData?.mobileno || ""}
                onChange={handleOnChange}
                placeholder="Enter WhatsApp number"
                border="1px solid #CCC"
                type="tel"
              />
              {errors?.mobileno && <Text color="red.500">{errors.mobileno}</Text>}
            </VStack>

            {/* Email */}
            <VStack align="start" spacing={1}>
              <Text fontWeight="semibold" color="#0A1A33">
                Email *
              </Text>
              <Input
                name="email"
                value={formData?.email || ""}
                onChange={handleOnChange}
                placeholder="Enter email address"
                border="1px solid #CCC"
                type="email"
              />
                {errors?.email && <Text color="red.500">{errors.email}</Text>}
            </VStack>

            {/* DOB */}
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
            {/* Communication Address block
            <Text fontWeight="bold" fontSize="md" color="#0A1A33">
              Communication Address
            </Text>

            <SimpleGrid columns={gridCols} spacing={3}>
              <VStack align="start" spacing={1}>
                <Text fontSize="sm" color="#0A1A33">House / Apartment / Building Number *</Text>
                <Input
                  name="houseNumber"
                  value={formData?.houseNumber || ""}
                  onChange={handleOnChange}
                  placeholder="House / Apartment / Building Number"
                  border="1px solid #CCC"
                />
                  {errors?.houseNumber && <Text color="red.500">{errors.houseNumber}</Text>}
              </VStack>

              <VStack align="start" spacing={1}>
                <Text fontSize="sm" color="#0A1A33">Street / Area *</Text>
                <Input
                  name="street"
                  value={formData?.street || ""}
                  onChange={handleOnChange}
                  placeholder="Street / Area"
                  border="1px solid #CCC"
                />
                  {errors?.street && <Text color="red.500">{errors.street}</Text>}
              </VStack>

              <VStack align="start" spacing={1}>
                <Text fontSize="sm" color="#0A1A33">City *</Text>
                <Input
                  name="city"
                  value={formData?.city || ""}
                  onChange={handleOnChange}
                  placeholder="City"
                  border="1px solid #CCC"
                />
                  {errors?.city && <Text color="red.500">{errors.city}</Text>}
              </VStack>

              <VStack align="start" spacing={1}>
                <Text fontSize="sm" color="#0A1A33">State *</Text>
                <Input
                  name="state"
                  value={formData?.state || ""}
                  onChange={handleOnChange}
                  placeholder="State"
                  border="1px solid #CCC"
                />
                  {errors?.state && <Text color="red.500">{errors.state}</Text>}
              </VStack>

              <VStack align="start" spacing={1} gridColumn={["auto", "span 1"]}>
                <Text fontSize="sm" color="#0A1A33">Pincode *</Text>
                <Input
                  name="pincode"
                  value={formData?.pincode || ""}
                  onChange={handleOnChange}
                  placeholder="Pincode"
                  border="1px solid #CCC"
                />
                  {errors?.pincode && <Text color="red.500">{errors.pincode}</Text>}
              </VStack>
            </SimpleGrid> */}

            <Divider />

            {/* Checkboxes */}
            <VStack align="start" spacing={3}>
              <Checkbox
                name="prasadRequired"
                isChecked={!!formData?.prasadRequired}
                onChange={handleOnChange}
              >
                I would like to receive Gift & Maha Prasadam (Only within India)
              </Checkbox>
                {/*formData?.prasadRequired && ( <Text fontSize="sm" color="#041ccc" pl={1}> Please note: Above provided communication address will be used for delivery </Text> )*/}

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
            </VStack>

              {formData?.prasadRequired && (
                  <>
                      <Divider />
                      <Text fontWeight="bold" fontSize="md" color="#0A1A33">
                        Delivery Address
                      </Text>

                      <SimpleGrid columns={gridCols} spacing={3}>
                          <VStack align="start" spacing={1}>
                              <Text fontSize="sm" color="#0A1A33">House / Apartment / Building Number *</Text>
                              <Input
                                  name="houseNumber"
                                  value={formData?.houseNumber || ""}
                                  onChange={handleOnChange}
                                  placeholder="House / Apartment / Building Number"
                                  border="1px solid #CCC"
                              />
                              {errors?.houseNumber && <Text color="red.500">{errors.houseNumber}</Text>}
                          </VStack>

                          <VStack align="start" spacing={1}>
                              <Text fontSize="sm" color="#0A1A33">Street / Area *</Text>
                              <Input
                                  name="street"
                                  value={formData?.street || ""}
                                  onChange={handleOnChange}
                                  placeholder="Street / Area"
                                  border="1px solid #CCC"
                              />
                              {errors?.street && <Text color="red.500">{errors.street}</Text>}
                          </VStack>

                          {/* STATE Autosuggest */}
                          <VStack align="start" spacing={1}>
                              <Text fontSize="sm" color="#0A1A33">State *</Text>
                              <AutoSuggestInput
                                  label="state"
                                  value={formData.state}
                                  onChange={handleOnChange}
                                  suggestions={IndiaStates}
                              />
                              {errors?.state && <Text color="red.500">{errors.state}</Text>}
                          </VStack>

                          {/* DISTRICT Autosuggest */}
                          <VStack align="start" spacing={1}>
                              <Text fontSize="sm" color="#0A1A33">District *</Text>
                              <AutoSuggestInput
                                  label="district"
                                  value={formData.city}
                                  onChange={(e) => {
                                      // override name “district” to “city”
                                      handleOnChange({ target: { name: "city", value: e.target.value } });
                                  }}
                                  suggestions={DistrictsByState[formData.state] || []}
                              />
                              {errors?.city && <Text color="red.500">{errors.city}</Text>}
                          </VStack>


                          <VStack align="start" spacing={1} gridColumn={["auto", "span 1"]}>
                              <Text fontSize="sm" color="#0A1A33">Pincode *</Text>
                              <Input
                                  name="pincode"
                                  value={formData?.pincode || ""}
                                  onChange={handleOnChange}
                                  placeholder="Pincode"
                                  border="1px solid #CCC"
                              />
                              {errors?.pincode && <Text color="red.500">{errors.pincode}</Text>}
                          </VStack>
                      </SimpleGrid>
                  </>
              )}

            {/* Tax address section (visible only when 80G checkbox is checked) */}
            {formData?.taxExemption && (
              <>
                <Divider />
                <Text fontWeight="bold" fontSize="md" color="#0A1A33">
                    80G Receipt Address
                </Text>

                {formData?.prasadRequired && ( <Checkbox isChecked={copyTaxAddress} onChange={handleCopyAddress}>
                  Same as above delivery address
                </Checkbox>)}

                <VStack align="start" spacing={1}>
                  <Text fontSize="sm" color="#0A1A33">Full Address *</Text>
                  <Textarea
                    name="taxAddress"
                    value={formData?.taxAddress || ""}
                    onChange={handleOnChange}
                    placeholder="Enter full address for 80G (this will appear on the 80g receipt)"
                    border="1px solid #CCC"
                    rows={3}
                  />
                    {errors?.taxAddress && <Text color="red.500">{errors.taxAddress}</Text>}
                </VStack>

                <VStack align="start" spacing={1} w="200px">
                  <Text fontSize="sm" color="#0A1A33">Pincode *</Text>
                  <Input
                    name="taxPincode"
                    value={formData?.taxPincode || ""}
                    onChange={handleOnChange}
                    placeholder="Pincode"
                    border="1px solid #CCC"
                  />
                    {errors?.taxPincode && <Text color="red.500">{errors.taxPincode}</Text>}
                </VStack>
                  <VStack align="start" spacing={1} w="200px">
                      <Text fontSize="sm" color="#0A1A33">PAN No. *</Text>
                      <Input
                          name="panno"
                          value={formData?.panno || ""}
                          onChange={handleOnChange}
                          placeholder="PAN No."
                          border="1px solid #CCC"
                      />
                      {errors?.panno && <Text color="red.500">{errors.panno}</Text>}
                  </VStack>
              </>
            )}

            {/* Submit & Cancel */}
            <Stack direction={["column", "row"]} spacing={3} mt={4}>
                <Button
                    type="submit"
                    bg={IskconBgColor}
                    color="white"
                    width="100%"
                    fontSize="1.2rem"
                    fontWeight="bold"
                    py="1.4rem"
                    minH="55px"
                    borderRadius="10px"
                    position="relative"
                    overflow="hidden"
                    _hover={{
                        transform: "translateY(-2px)",
                        boxShadow: "lg",
                    }}
                    transition="all 0.3s ease"
                >
                    Donate Now

                    {/* ✨ Shine Effect */}
                    <Box
                        position="absolute"
                        top="0"
                        left="-150%"
                        width="50%"
                        height="100%"
                        bg="rgba(255,255,255,0.35)"
                        transform="skewX(-20deg)"
                        filter="blur(4px)"
                        animation="shine 2s infinite"
                    />

                    <style>
                        {`
                        @keyframes shine {
                            0% { left: -150%; }
                            60% { left: 150%; }
                            100% { left: 150%; }
                        }
                        `}
                    </style>
                </Button>

                <HStack justify="center" mt={2} spacing={2}>
                    <LuBriefcase size={18} color="#6B7280" />
                    <Text fontSize="sm" color="gray.600">
                        Secure payment via Razorpay
                    </Text>
                </HStack>
                <Button
                    variant="outline"
                    colorScheme="gray"
                    width="100%"
                    fontSize="1.1rem"
                    py="1.2rem"
                    minH="55px"
                    borderRadius="8px"
                    onClick={() => setPaymentModel(false)}
                >
                    Cancel
                </Button>

            </Stack>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default PaymentPageFull;