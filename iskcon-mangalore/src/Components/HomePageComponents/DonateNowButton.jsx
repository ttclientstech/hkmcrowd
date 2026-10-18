import React from "react";
import { Box, Text, Button, Flex, Icon } from "@chakra-ui/react";
import { FaHandHoldingHeart } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

import { keyframes } from "@emotion/react";

const ctaGlow = keyframes`
  0% {
    box-shadow: 0 0 12px 2px rgba(212, 175, 55, 0.6), 0 4px 24px rgba(178, 34, 34, 0.3);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 32px 8px rgba(212, 175, 55, 0.95), 0 8px 40px rgba(178, 34, 34, 0.55);
    transform: scale(1.04);
  }
  100% {
    box-shadow: 0 0 12px 2px rgba(212, 175, 55, 0.6), 0 4px 24px rgba(178, 34, 34, 0.3);
    transform: scale(1);
  }
`;

const DonateNowButton = ({ getSingleUser }) => {
    const navigate = useNavigate();
    const { id } = useParams();

    const handleClick = () => {
        // ✅ navigate and send campaign details through state
        navigate(`/campaign/${id}/donate`, { state: { getSingleUser } });
    };
    return (
        <Box maxW="1200px" mx="auto" px={[4, 6]} mt={8}>
            <Flex justify="center" align="center" direction="column">
                <Button
                    onClick={handleClick}
                    size="lg"
                    fontSize={["1.1rem", "1.25rem", "1.4rem"]}
                    fontWeight="900"
                    letterSpacing="0.08em"
                    textTransform="uppercase"
                    color="#FFFFFF"
                    bgGradient="linear(135deg, #B22222 0%, #8B0000 40%, #D4AF37 100%)"
                    border="3px solid #D4AF37"
                    borderRadius="50px"
                    px={["2rem", "3rem", "4rem"]}
                    py={["1.4rem", "1.6rem", "1.8rem"]}
                    animation={`${ctaGlow} 2s ease-in-out infinite`}
                    _hover={{
                        bgGradient: "linear(135deg, #D4AF37 0%, #B22222 100%)",
                        color: '#FFFFFF',
                        transform: 'scale(1.07)',
                        transition: 'all 0.25s ease',
                    }}
                    _active={{ transform: 'scale(0.97)' }}
                    transition="all 0.25s ease"
                    cursor="pointer"
                    rightIcon={<Icon as={FaHandHoldingHeart} />}
                >
                    🙏 Contribute Now
                </Button>
                {/* SOFT, ITALIC MESSAGE BELOW BUTTON */}
                <Text
                    fontSize="0.85em"
                    fontStyle="italic"
                    color="#082032"
                    opacity={0.85}
                    textAlign="center"
                    mt={2}
                    fontWeight={500}
                >
                    Every Square Feet You Donate Lives Forever
                </Text>
            </Flex>
        </Box>
    );
};

export default DonateNowButton;
