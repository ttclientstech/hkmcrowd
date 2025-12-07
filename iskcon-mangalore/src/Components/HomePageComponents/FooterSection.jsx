import {
    Box,
    Text,
    Flex,
    IconButton,
    Link,
    VStack,
    HStack,
    Divider,
} from "@chakra-ui/react";
import {
    FaYoutube,
    FaInstagram,
    FaFacebookF,
    FaLinkedinIn,
    FaWhatsapp,
} from "react-icons/fa";

const FooterSection = () => {
    return (
        <Box
            bg="#082032"
            color="white"
            py={12}
            mt={12}
            fontFamily="'Poppins', sans-serif"
            borderTop="3px solid #d4af37"
        >
            <Flex
                direction={["column", "row"]}
                justify="space-between"
                align={["center", "flex-start"]}
                maxW="1200px"
                mx="auto"
                px={[4, 6]}
                gap={[10, 0]}
            >
                {/* Left Column — Address */}
                <VStack align="flex-start" spacing={3}>
                    <Text
                        fontSize="xl"
                        fontWeight="500"
                        color="white"
                    >
                        Dakshina Dwaraka Dham
                    </Text>

                    <Text fontSize="md" w={["100%", "260px"]} lineHeight="1.6" opacity={0.9} fontFamily="'Satoshi', sans-serif">
                        Sri Sri Krishna Rukmini Satyabhama Temple
                        <br />
                        (Hare Krishna Movement Chennai)
                        <br />
                        63, 1st Seaward Rd, Valmiki Nagar, Thiruvanmiyur
                        <br />
                        Chennai – 600041, Tamil Nadu
                    </Text>
                </VStack>

                {/* Middle Column — Contact */}
                <VStack align="flex-start" spacing={3}>
                    <Text fontSize="xl" fontWeight="500" color="white">
                        Contact Us
                    </Text>

                    <Text fontSize="md" opacity={0.9} fontFamily="'Satoshi', sans-serif">
                        Phone/WhatsApp:{" "}
                        <Box as="span" color="white" fontWeight="500">
                            +91-XXXXXXXXXX
                        </Box>
                    </Text>

                    <Text fontSize="md" opacity={0.9} fontFamily="'Satoshi', sans-serif">
                        Email:{" "}
                        <Box as="span" color="white" fontWeight="500">
                            info@yourtemple.org
                        </Box>
                    </Text>
                </VStack>

                {/* Right Column — Social Media */}
                <VStack align={["center", "flex-start"]} spacing={4}>
                    <Text fontSize="xl" fontWeight="500" color="white">
                        Stay Connected
                    </Text>

                    <HStack spacing={4}>
                        <Link href="https://www.youtube.com/@hkmchennai" isExternal>
                            <IconButton
                                icon={<FaYoutube />}
                                aria-label="YouTube"
                                fontSize="20px"
                                bg="whiteAlpha.200"
                                _hover={{ bg: "#ff0000" }}
                                color="white"
                                borderRadius="full"
                            />
                        </Link>

                        <Link href="https://www.instagram.com/hkm_chennai/?hl=en" isExternal>
                            <IconButton
                                icon={<FaInstagram />}
                                aria-label="Instagram"
                                fontSize="20px"
                                bg="whiteAlpha.200"
                                _hover={{ bg: "#E1306C" }}
                                color="white"
                                borderRadius="full"
                            />
                        </Link>

                        <Link href="https://www.facebook.com/hkmcworld/" isExternal>
                            <IconButton
                                icon={<FaFacebookF />}
                                aria-label="Facebook"
                                fontSize="18px"
                                bg="whiteAlpha.200"
                                _hover={{ bg: "#1877F2" }}
                                color="white"
                                borderRadius="full"
                            />
                        </Link>

                        <Link href="https://www.linkedin.com/company/hare-krishna-movement-chennai?originalSubdomain=in" isExternal>
                            <IconButton
                                icon={<FaLinkedinIn />}
                                aria-label="LinkedIn"
                                fontSize="18px"
                                bg="whiteAlpha.200"
                                _hover={{ bg: "#0A66C2" }}
                                color="white"
                                borderRadius="full"
                            />
                        </Link>

                        <Link href="https://whatsapp.com/channel/0029Vaa2fjKEVccFHx5YDt1O" isExternal>
                            <IconButton
                                icon={<FaWhatsapp />}
                                aria-label="WhatsApp"
                                fontSize="20px"
                                bg="whiteAlpha.200"
                                _hover={{ bg: "#25D366" }}
                                color="white"
                                borderRadius="full"
                            />
                        </Link>
                    </HStack>
                </VStack>
            </Flex>

            {/* Divider */}
            <Divider
                borderColor="whiteAlpha.300"
                my={8}
                w="90%"
                mx="auto"
            />

            {/* Bottom Section */}
            <Text textAlign="center" fontSize="sm" opacity={0.7} fontFamily="'Satoshi', sans-serif">
                © {new Date().getFullYear()} Dakshina Dwaraka Dham — ISKCON Thiruvanmiyur.
                All Rights Reserved.
            </Text>

            <Text textAlign="center" fontSize="xs" mt={2} color="whiteAlpha.600" fontFamily="'Satoshi', sans-serif">
                A sacred initiative dedicated to the eternal service of Sri Sri Rukmini Dwarakadhish.
            </Text>
        </Box>
    );
};

export default FooterSection;