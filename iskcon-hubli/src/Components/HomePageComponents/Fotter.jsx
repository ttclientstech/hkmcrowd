import React from 'react';
import { Box, Link, Text } from '@chakra-ui/react';

const Fotter = () => {
    return (
        <Box as="footer" className="footer" p={4} bg="gray.800" color="white" textAlign="center" w={'full'} >
            <Text>
                Copyright © 2025 - <Link href="https://campaigns.iskconhubli.org/" isExternal color="teal.200">www.iskconhubli.org</Link> - All Rights Reserved.
            </Text>
            <Text mt={2}>
                <Link href="https://www.iskconhubli.org/privacy-policy/" color="teal.200">Privacy Policy</Link> | 
                <Link href="https://www.iskconhubli.org/disclaimer/" color="teal.200" ml={2}>Disclaimer</Link> | 
                <Link href="https://www.iskconhubli.org/terms-and-conditions/" color="teal.200" ml={2}>Terms & Conditions</Link> | 
                <Link href="https://www.iskconhubli.org/refund-policy/" color="teal.200" ml={2}>Refund Policy</Link> | 
                <Link href="https://www.iskconhubli.org/cancellation-policy" color="teal.200" ml={2}>Cancellation Policy</Link>
            </Text>
        </Box>
    );
};

export default Fotter;