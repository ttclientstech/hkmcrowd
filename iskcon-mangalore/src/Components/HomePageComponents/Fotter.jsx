import React from 'react';
import { Box, Link, Text } from '@chakra-ui/react';

const Fotter = () => {
    return (
        <Box as="footer" className="footer" p={4} bg="#0A1A33" color="white" textAlign="center" w={'full'} borderTop="3px solid #D4AF37">
            <Text>
                Copyright © 2025 - <Link href="https://hkmchennai.org/" isExternal color="#FFFFFF" _hover={{ color: "#D4AF37" }}>www.hkmchennai.org</Link> - All Rights Reserved.
            </Text>
            <Text mt={2}>
                <Link href="https://www.hkmchennai.org/privacy-policy/" color="#FFFFFF" _hover={{ color: "#D4AF37" }}>Privacy Policy</Link> |
                <Link href="https://www.hkmchennai.org/disclaimer/" color="#FFFFFF" ml={2} _hover={{ color: "#D4AF37" }}>Disclaimer</Link> |
                <Link href="https://www.hkmchennai.org/terms-and-conditions/" color="#FFFFFF" ml={2} _hover={{ color: "#D4AF37" }}>Terms & Conditions</Link> |
                <Link href="https://www.hkmchennai.org/refund-policy/" color="#FFFFFF" ml={2} _hover={{ color: "#D4AF37" }}>Refund Policy</Link> |
                <Link href="https://www.hkmchennai.org/cancellation-policy" color="#FFFFFF" ml={2} _hover={{ color: "#D4AF37" }}>Cancellation Policy</Link>
            </Text>
        </Box>
    );
};

export default Fotter;