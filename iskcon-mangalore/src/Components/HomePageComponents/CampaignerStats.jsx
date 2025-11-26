import React from 'react';
import {
    Box,
    Flex,
    Text,
    Badge,
    Progress,
    SimpleGrid,
    Icon
} from '@chakra-ui/react';
import { FaHandHoldingHeart, FaMapMarkerAlt } from 'react-icons/fa';

const CampaignerStats = ({ getSingleUser }) => {
    // 1. Logic: Convert Money to Sq. Ft
    const SQ_FT_COST = 5001;
    const raisedAmount = getSingleUser?.raisedFund || 0;
    const targetAmount = getSingleUser?.campaignDetails?.targetAmount || 100000; // Fallback target

    // Calculate Sq. Ft
    // Use Math.floor/toFixed based on preference, toFixed(2) keeps it precise
    const raisedSqFt = (raisedAmount / SQ_FT_COST).toFixed(2);
    const targetSqFt = (targetAmount / SQ_FT_COST).toFixed(0);

    // Calculate Percentage for Bar
    const percentage = Math.min((raisedAmount / targetAmount) * 100, 100);

    return (
        <Box
            mt={6}
            bg="white"
            p={5}
            borderRadius="xl"
            boxShadow="sm"
            border="1px solid #E2E8F0"
        >
            <Flex justify="space-between" align="center" mb={2}>
                <Text fontSize="sm" fontWeight="bold" color="gray.500" textTransform="uppercase" letterSpacing="wide">
                    Campaign Progress
                </Text>
                <Badge colorScheme="green" variant="subtle" px={2} py={0.5} borderRadius="full">
                    {percentage.toFixed(1)}% Completed
                </Badge>
            </Flex>

            {/* The Progress Bar */}
            <Box position="relative" mb={4}>
                <Progress
                    value={percentage}
                    size="md"
                    colorScheme="orange" // Matches the Orange theme
                    borderRadius="full"
                    bg="gray.100"
                    hasStripe
                    isAnimated
                />
            </Box>

            {/* Stats Grid: Raised vs Goal in SQ FT */}
            <SimpleGrid columns={2} spacing={4}>
                <Box borderRight="1px solid #E2E8F0">
                    <Flex align="center" gap={2} mb={1}>
                        <Icon as={FaHandHoldingHeart} color="#D4AF37" />
                        <Text fontSize="xs" fontWeight="bold" color="gray.400">RAISED</Text>
                    </Flex>
                    <Text fontSize="2xl" fontWeight="800" color="#2C0A0A" lineHeight="1">
                        {raisedSqFt} <Text as="span" fontSize="sm" color="gray.500" fontWeight="bold">Sq.ft</Text>
                    </Text>
                    <Text fontSize="xs" color="gray.400">
                        (₹ {raisedAmount.toLocaleString()})
                    </Text>
                </Box>

                <Box pl={4}>
                    <Flex align="center" gap={2} mb={1}>
                        <Icon as={FaMapMarkerAlt} color="gray.400" />
                        <Text fontSize="xs" fontWeight="bold" color="gray.400">GOAL</Text>
                    </Flex>
                    <Text fontSize="2xl" fontWeight="800" color="gray.600" lineHeight="1">
                        {targetSqFt} <Text as="span" fontSize="sm" color="gray.500" fontWeight="bold">Sq.ft</Text>
                    </Text>
                    <Text fontSize="xs" color="gray.400">
                        (₹ {targetAmount.toLocaleString()})
                    </Text>
                </Box>
            </SimpleGrid>
        </Box>
    );
};

export default CampaignerStats;