import image16 from "../assets/images/transparent_logo.png";
import {
    Box,
    Flex,
    Button,
    Text,
    Icon,
    HStack,
    Image
} from "@chakra-ui/react";
import { FaPhoneAlt } from "react-icons/fa";
import PoppinFont from "./PoppinFont";

const VCMTopHeaderTab = () => {

    const donateYellow = "#FFD400";
    const headerBg = "#2F3F51";

    return (
    <Box bg={headerBg} fontFamily="'Poppins', sans-serif" color="white" py={3} boxShadow="sm">
        <PoppinFont />
        <Flex maxW="1200px" mx="auto" align="center" px={[4, 6]} justify="space-between">
            <HStack spacing={4} align="center">
                {/* Logo left - use your image16 if available, else text */}
                <HStack spacing={3} align="center">
                    <Image src={image16} alt="logo" boxSize="44px" objectFit="contain" />
                </HStack>
            </HStack>

            <HStack spacing={4}>
                <Button
                    bg={donateYellow}
                    color="#111"
                    _hover={{ bg: "#ffd400" }}
                    fontWeight={800}
                    px={6}
                    py={3}
                >
                    Donate
                </Button>

                <HStack bg="rgba(255,255,255,0.95)" px={3} py={2} borderRadius="md" color="#111" spacing={2}>
                    <Icon as={FaPhoneAlt} />
                    <Text fontWeight={700} fontSize="sm">+91-6282408921</Text>
                </HStack>
            </HStack>
        </Flex>
    </Box>
    );
};

export default VCMTopHeaderTab;