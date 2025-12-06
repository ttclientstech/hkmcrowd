import React from "react";
import { Box, Text, Button, Flex, Icon } from "@chakra-ui/react";
import { FaHandHoldingHeart } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const DonateNowButton = ({ getSingleUser }) => {
    const navigate = useNavigate();
    const { id } = useParams();

    const handleClick = () => {
        // ✅ navigate and send campaign details through state
        navigate(`/campaign/${id}/donate`, { state: { getSingleUser } });
    };
    return (
            <Box maxW="1200px" mx="auto" px={[4,6]} mt={8} mb={6}>
                <Flex justify="center">
                    <Button
                        onClick={handleClick}
                        bgGradient="linear(to-r, #FFD700, #FFB200)"
                        color="#2C0A0A"
                        fontWeight="800"
                        borderRadius="full"
                        px={[6, 8]}
                        py={6}
                        fontSize={["md","lg"]}
                        boxShadow="0 6px 18px rgba(255,183,0,0.45)"
                        _hover={{
                            transform: "scale(1.05)",
                            boxShadow: "0 8px 25px rgba(255,183,0,0.55)",
                        }}
                        transition="all 0.2s ease"
                        rightIcon={<Icon as={FaHandHoldingHeart} />}
                    >
                        CONTRIBUTE NOW
                    </Button>
                </Flex>
            {/* SOFT, ITALIC MESSAGE BELOW BUTTON */}
            <Text
                fontSize="0.75em"
                fontStyle="italic"
                color="#082032"           // deep navy blue
                opacity={0.85}
                textAlign="center"
                mt={1}
            >
                Every Square Feet You Donate Lives Forever
            </Text>
        </Box>
    );
};

export default DonateNowButton;
