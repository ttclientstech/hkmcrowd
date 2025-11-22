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
  useBreakpointValue,
} from "@chakra-ui/react";
import { IskconBgColor } from '../utils';
import templeLogo from "../../assets/images/logo.png";

const PaymentPageFull = ({
  amount,
  handleSubmit,
  handleOnChange,
  formData,
  errors,
  setPaymentModel,
}) => {
  // Local UI state for copy-address checkbox
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

      handleOnChange({
        target: { name: "taxAddress", value: composed },
      });

      handleOnChange({
        target: { name: "taxPincode", value: formData?.pincode || "" },
      });
    } else {
      // clear tax fields when unchecked
      handleOnChange({ target: { name: "taxAddress", value: "" } });
      handleOnChange({ target: { name: "taxPincode", value: "" } });
    }
  };

  return (
    <Box w="100%" minH="100vh" bg="#F7F9FC" py={6} px={[4, 6, 10]}>
        <Box
            w="100%"
            bg="#5A0E0E"    // same rich maroon shade as your homepage
            py={[4, 5]}
            px={[4, 6, 10]}
            borderRadius="10px"
            mb={6}
        >
            <HStack justify="space-between" align="center" spacing={4}>

                {/* Left Side: Logo */}
                <Image
                    src={templeLogo}
                    alt="Temple Logo"
                    boxSize={["60px", "70px", "80px"]}
                    objectFit="contain"
                    borderRadius="5px"
                    bg="white"
                    p="2"
                />

                {/* Right Side: Quote */}
                <VStack align="flex-end" spacing={1} maxW="80%">
                    <Text
                        color="white"
                        fontWeight="bold"
                        fontSize={["xs", "sm", "md"]}
                        textAlign="right"
                        lineHeight="1.3"
                    >
                        “One who donates towards construction of a temple is liberated from
                        all sins and attains the heavenly realms.”
                    </Text>
                    <Text
                        color="gold"
                        fontSize={["8px", "10px", "11px"]}
                        fontStyle="italic"
                        textAlign="right"
                    >
                        — Vishnu Purana 3.8.27
                    </Text>
                </VStack>

            </HStack>
        </Box>
      {/* Header */}
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
      </Box>

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
            {/* Communication Address block */}
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
              </VStack>
            </SimpleGrid>

            <Divider />

            {/* Checkboxes */}
            <VStack align="start" spacing={3}>
              <Checkbox
                name="prasadRequired"
                isChecked={!!formData?.prasadRequired}
                onChange={handleOnChange}
              >
                I would like to receive Maha Prasadam (Only within India)
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
            </VStack>

            {/* Tax address section (visible only when 80G checkbox is checked) */}
            {formData?.taxExemption && (
              <>
                <Divider />
                <Text fontWeight="bold" fontSize="md" color="#0A1A33">
                  80G Tax Address
                </Text>

                <Checkbox isChecked={copyTaxAddress} onChange={handleCopyAddress}>
                  Same as communication address
                </Checkbox>

                <VStack align="start" spacing={1}>
                  <Text fontSize="sm" color="#0A1A33">Full 80G Address *</Text>
                  <Textarea
                    name="taxAddress"
                    value={formData?.taxAddress || ""}
                    onChange={handleOnChange}
                    placeholder="Enter full address for 80G (this will appear on the receipt)"
                    border="1px solid #CCC"
                    rows={3}
                  />
                </VStack>

                <VStack align="start" spacing={1} w="200px">
                  <Text fontSize="sm" color="#0A1A33">Tax Address Pincode *</Text>
                  <Input
                    name="taxPincode"
                    value={formData?.taxPincode || ""}
                    onChange={handleOnChange}
                    placeholder="Pincode"
                    border="1px solid #CCC"
                  />
                </VStack>
              </>
            )}

            {/* Submit & Cancel */}
            <Stack direction={["column", "row"]} spacing={3} mt={4}>
              <Button
                type="submit"
                bg={IskconBgColor}
                color="white"
                size="lg"
                flex="1"
              >
                Proceed to Pay
              </Button>

              <Button
                variant="outline"
                colorScheme="gray"
                size="lg"
                flex="1"
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