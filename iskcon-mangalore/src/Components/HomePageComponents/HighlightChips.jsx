import { Box, Text, Flex, Icon } from "@chakra-ui/react";
import {
    FaWater,
    FaMountain,
    FaGopuram,
    FaRulerCombined,
    FaTools,
} from "react-icons/fa";

const HighlightChips = () => {
    const highlights = [
        { icon: FaWater, label: "Beachside Temple" },
        { icon: FaMountain, label: "Tallest in Chennai" },
        { icon: FaGopuram, label: "Pallava Architecture" },
        { icon: FaRulerCombined, label: "40,000 sq ft Complex" },
        { icon: FaTools, label: "Final Phase Construction In Progress" }, // NEW
    ];

    return (
        <Box
            w="100%"
            maxW="1000px"
            mx="auto"
            mt={10}
            px={[3, 4, 6]}
        >
            <Flex
                gap={3}
                overflowX="auto"
                pb={2}
                css={{
                    "&::-webkit-scrollbar": { display: "none" },
                }}
            >
                {highlights.map((item, i) => (
                    <Flex
                        key={i}
                        align="center"
                        gap={2}
                        px={4}
                        py={2}
                        bg="white"
                        borderRadius="30px"
                        border="1px solid #E8D7A8" // soft gold border
                        boxShadow="0px 4px 12px rgba(0,0,0,0.08)"
                        whiteSpace="nowrap"
                        flexShrink={0}
                    >
                        <Icon as={item.icon} color="#C49A3F" boxSize={4} />
                        <Text fontSize="sm" fontWeight="600" color="#082032">
                            {item.label}
                        </Text>
                    </Flex>
                ))}
            </Flex>
        </Box>
    );
};

export default HighlightChips;