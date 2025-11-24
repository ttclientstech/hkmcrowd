import React from 'react';
import { Flex, Text, Icon, Box } from '@chakra-ui/react';
import { FaShieldAlt, FaLandmark, FaUniversity } from 'react-icons/fa';

const TrustStrip = () => {
    return (
        <Box w="100%" bg="#FAF3E0" borderBottom="1px solid #E2E8F0">
            <Flex
                maxW="1200px"
                mx="auto"
                py={3}
                justify={["center", "center", "flex-start"]}
                gap={[4, 8, 12]}
                flexWrap="wrap"
                px={4}
            >
                <Flex align="center" gap={2}>
                    <Icon as={FaShieldAlt} color="#D4AF37" />
                    <Text fontSize={["xs", "sm"]} fontWeight="bold" color="#4B0000" textTransform="uppercase">
                        100% Secure Payment
                    </Text>
                </Flex>
                <Flex align="center" gap={2}>
                    <Icon as={FaLandmark} color="#D4AF37" />
                    <Text fontSize={["xs", "sm"]} fontWeight="bold" color="#4B0000" textTransform="uppercase">
                        80G Tax Exemption Available
                    </Text>
                </Flex>
                <Flex align="center" gap={2}>
                    <Icon as={FaUniversity} color="#D4AF37" />
                    <Text fontSize={["xs", "sm"]} fontWeight="bold" color="#4B0000" textTransform="uppercase">
                        Official HKM Chennai Initiative
                    </Text>
                </Flex>
            </Flex>
        </Box>
    );
};

export default TrustStrip;