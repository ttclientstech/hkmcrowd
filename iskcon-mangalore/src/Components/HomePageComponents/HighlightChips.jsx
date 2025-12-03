import { Box, Text, Flex, Icon, SimpleGrid } from "@chakra-ui/react";
import {
    FaWater,
    FaMountain,
    FaGopuram,
    FaRulerCombined,
    FaTools,
} from "react-icons/fa";

const NAVY = "#082032"; // your theme navy color

const HighlightChips = () => {
    const highlights = [
        { icon: FaWater, label: "Beachside Temple" },
        { icon: FaMountain, label: "Tallest in Chennai" },
        { icon: FaGopuram, label: "Pallava Architecture" },
        { icon: FaRulerCombined, label: "40,000 sq ft Complex" },
        { icon: FaTools, label: "Final Phase Construction In Progress" },
    ];

    return (
        <Box
            w="100%"
            maxW="1000px"
            mx="auto"
            mt={10}
            px={[4, 6]}
        >
            {/* GRID: 2 per row on mobile, 3 per row on tablet, auto on desktop */}
            <SimpleGrid
                columns={[2, 3, 4]}
                spacing={4}
            >
                {highlights.map((item, i) => (
                    <Flex
                        key={i}
                        align="center"
                        gap={2}
                        px={3}
                        py={3}
                        bg="white"
                        borderRadius="14px"
                        boxShadow="0 4px 12px rgba(0,0,0,0.08)"
                    >
                        <Icon as={item.icon} color={NAVY} boxSize={5} /> {/* NAVY ICON */}
                        <Text
                            fontSize="sm"
                            fontWeight="600"
                            color={NAVY}
                            noOfLines={1}
                        >
                            {item.label}
                        </Text>
                    </Flex>
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default HighlightChips;