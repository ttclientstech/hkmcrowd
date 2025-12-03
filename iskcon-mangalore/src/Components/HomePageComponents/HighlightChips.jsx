import { Box, Text, Flex, Icon, SimpleGrid } from "@chakra-ui/react";
import {
    FaWater,
    FaMountain,
    FaGopuram,
    FaRulerCombined,
    FaTools,
} from "react-icons/fa";

const NAVY = "#082032";

const HighlightChips = () => {
    const highlights = [
        { icon: FaWater, label: "Beachside Temple" },
        { icon: FaMountain, label: "Tallest in Chennai" },
        { icon: FaGopuram, label: "Pallava Architecture" },
        { icon: FaRulerCombined, label: "40,000 sq ft Complex" },
        { icon: FaTools, label: "Construction In Progress" },
    ];

    return (
        <Box
            w="100%"
            maxW="1000px"
            mx="auto"
            mt={10}
            px={[4, 6]}
            fontFamily="'Poppins', sans-serif"
        >
            {/* ---------- DESKTOP VIEW (GRID) ---------- */}
            <Box display={["none", "none", "block"]}>
                <SimpleGrid columns={[3, 4]} spacing={5}>
                    {highlights.map((item, i) => (
                        <Flex
                            key={i}
                            align="center"
                            gap={3}
                            px={4}
                            py={4}
                            bg="white"
                            borderRadius="14px"
                            boxShadow="0 4px 14px rgba(0,0,0,0.08)"
                        >
                            <Icon as={item.icon} boxSize={5} color={NAVY} />
                            <Text fontWeight="600" color={NAVY} fontSize="md">
                                {item.label}
                            </Text>
                        </Flex>
                    ))}
                </SimpleGrid>
            </Box>

            {/* ---------- MOBILE VIEW (HORIZONTAL SCROLL) ---------- */}
            <Box
                display={["block", "block", "none"]}
                overflowX="auto"
                whiteSpace="nowrap"
                css={{
                    "&::-webkit-scrollbar": {
                        display: "none",
                    },
                }}
                mt={3}
                pb={2}
            >
                <Flex gap={4}>
                    {highlights.map((item, i) => (
                        <Flex
                            key={i}
                            align="center"
                            gap={2}
                            px={4}
                            py={3}
                            minW="200px"
                            bg="white"
                            borderRadius="14px"
                            boxShadow="0 4px 14px rgba(0,0,0,0.08)"
                        >
                            <Icon as={item.icon} boxSize={5} color={NAVY} />
                            <Text fontWeight="600" color={NAVY} fontSize="sm" noOfLines={1}>
                                {item.label}
                            </Text>
                        </Flex>
                    ))}
                </Flex>
            </Box>
        </Box>
    );
};

export default HighlightChips;