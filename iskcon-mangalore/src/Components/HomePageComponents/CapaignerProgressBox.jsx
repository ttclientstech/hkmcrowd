import React, { useState } from 'react';
import {
    Box, Button, VStack, Input, Badge, Flex, Text,
    SimpleGrid, Icon, Divider
} from '@chakra-ui/react';
import { calculatePercentage, formatCurrency, getDaysDifference } from '../utils';
import ProgressBar from './ProgressBar';
import { FaHandHoldingHeart, FaCheckCircle, FaRegCreditCard } from "react-icons/fa";

const CapaignerProgressBox = ({
                                  getSingleUser, amount, setAmount, handleClick, errorMessage
                              }) => {
    const targetAmount = getSingleUser?.campaignDetails?.targetAmount || 1000000;
    const raisedAmount = getSingleUser?.raisedFund || 0;
    const currentPercentage = calculatePercentage(targetAmount, raisedAmount);

    // NEW WORDING: "Construction" instead of just "Seva"
    const sevaOptions = [
        { label: "Sponsor 1 Sq.ft", value: 5001 },
        { label: "Sponsor 2 Sq.ft", value: 10001 },
        { label: "Sponsor 5 Sq.ft", value: 25001 },
        { label: "Sponsor 10 Sq.ft", value: 50001},
    ];

    const [customAmountMode, setCustomAmountMode] = useState(false);

    const handleOptionClick = (val) => {
        setAmount(val);
        setCustomAmountMode(false);
    };

    return (
        <Box
            w="100%"
            boxShadow="2xl"
            borderRadius="xl"
            bg="white"
            overflow="hidden"
            border="1px solid #E2E8F0"
            position={["relative", "relative", "relative", "sticky"]}
            top={["0", "0", "0", "100px"]}
            zIndex={9}
        >
            {/* 1. HEADER: Dark Slate Background */}
            <Box bg="#2D3748" p={6} color="white" borderBottom="4px solid #D4AF37">
                <Flex justifyContent="space-between" alignItems="center" mb={3}>
                    <Text fontSize="xs" fontWeight="bold" letterSpacing="widest" color="gray.400" textTransform="uppercase">
                        Contribution Milestones
                    </Text>
                    <Badge bg="#4B0000" color="white" variant="solid" fontSize="0.7em" px={3} py={1} borderRadius="full">
                        {getSingleUser?.totalFunders} Patrons
                    </Badge>
                </Flex>

                <Flex align="baseline" gap={2} mb={2}>
                    <Text fontSize="3xl" fontWeight="900" lineHeight="1" color="#FFD700">
                        {formatCurrency(raisedAmount)}
                    </Text>
                    <Text fontSize="sm" color="gray.300" fontWeight="500">
                        raised of {formatCurrency(targetAmount)}
                    </Text>
                </Flex>

                <Box mt={4}>
                    <ProgressBar
                        currentAmount={raisedAmount}
                        goalAmount={targetAmount}
                    />
                    <Flex justify="space-between" mt={2} fontSize="xs" color="gray.300" fontWeight="bold">
                        <Text>{currentPercentage}% Complete</Text>
                        <Text>{getDaysDifference(getSingleUser?.campaignDetails?.enddate)} Days to go</Text>
                    </Flex>
                </Box>
            </Box>

            {/* 2. BODY: White Background */}
            <VStack p={6} spacing={5} align="stretch" bg="white">

                {/* Value Prop - Light Gold Background */}
                <Flex bg="#FFF9E5" p={3} borderRadius="md" align="center" gap={3} border="1px solid #F6E05E">
                    <Icon as={FaCheckCircle} color="#D69E2E" boxSize={5}/>
                    <Text fontSize="sm" color="#744210" fontWeight="600" lineHeight="1.4">
                        Join <Text as="span" fontWeight="800">{getSingleUser?.campaignDetails?.campaignName}</Text> in this historic service.
                    </Text>
                </Flex>

                <Divider borderColor="#E2E8F0" />

                {/* Selection Grid (Impact Chips) */}
                <Text fontSize="xs" fontWeight="bold" color="gray.500" textTransform="uppercase" letterSpacing="wide">
                    Select your Seva:
                </Text>
                <SimpleGrid columns={2} spacing={3}>
                    {sevaOptions.map((opt) => (
                        <Button
                            key={opt.value}
                            h="auto" py={3}
                            variant="outline"
                            border="1px solid"
                            // Selected State Colors
                            borderColor={amount === opt.value && !customAmountMode ? "#D4AF37" : "#E2E8F0"}
                            bg={amount === opt.value && !customAmountMode ? "#FFF9C4" : "white"}
                            color={amount === opt.value && !customAmountMode ? "#4B0000" : "#2D3748"}
                            _hover={{ borderColor: "#D4AF37", bg: "#FFF9E5", transform: "translateY(-1px)" }}
                            onClick={() => handleOptionClick(opt.value)}
                            flexDirection="column"
                            gap={1}
                            transition="all 0.2s"
                            boxShadow={amount === opt.value ? "md" : "none"}
                        >
                            <Text fontSize="md" fontWeight="800">{formatCurrency(opt.value)}</Text>
                            <Text fontSize="xs" fontWeight="normal" opacity={0.8}>{opt.label}</Text>
                        </Button>
                    ))}
                </SimpleGrid>

                {/* Custom Amount Toggle */}
                {!customAmountMode ? (
                    <Text
                        textAlign="center" fontSize="sm" textDecoration="underline" cursor="pointer" color="gray.500"
                        _hover={{ color: "#D4AF37" }}
                        onClick={() => { setCustomAmountMode(true); setAmount(""); }}
                    >
                        Or enter a custom amount
                    </Text>
                ) : (
                    <VStack align="stretch" spacing={1}>
                        <Flex justify="space-between" align="center">
                            <Text fontSize="xs" fontWeight="bold" color="gray.500">CUSTOM AMOUNT (INR)</Text>
                            <Text fontSize="xs" color="blue.500" cursor="pointer" onClick={() => setCustomAmountMode(false)}>Back</Text>
                        </Flex>
                        <Input
                            type="number" placeholder="Ex: 5000" value={amount} onChange={(e) => setAmount(e.target.value)}
                            h="50px" fontSize="lg" fontWeight="bold" textAlign="center"
                            focusBorderColor="#D4AF37" borderColor="#CBD5E0"
                        />
                    </VStack>
                )}

                {/* Main CTA - Gold Gradient */}
                <Button
                    w={"100%"} h={"55px"}
                    bgGradient="linear(to-r, #D4AF37, #FFD700)"
                    color="#2C0A0A"
                    fontWeight="800" fontSize="lg"
                    fontFamily="'Cinzel', serif"
                    letterSpacing="1px"
                    onClick={handleClick}
                    _hover={{ transform: "translateY(-2px)", boxShadow: "0px 5px 15px rgba(212, 175, 55, 0.4)" }}
                    rightIcon={<Icon as={FaHandHoldingHeart} />}
                >
                    CONTRIBUTE NOW
                </Button>

                <Box textAlign="center">
                    <Text fontSize="xs" color="gray.400" mt={2}>
                        * All contributions are eligible for 80G Tax Exemption
                    </Text>
                    {errorMessage && (
                        <Text fontSize="sm" color="red.500" fontWeight="bold" mt={2}>
                            {errorMessage}
                        </Text>
                    )}
                </Box>
            </VStack>
        </Box>
    );
};

export default CapaignerProgressBox;