import React from "react";
import {
    Box,
    Flex,
    Text,
    Icon,
    useBreakpointValue,
    VisuallyHidden,
} from "@chakra-ui/react";
import {
    FaBuilding,
    FaLandmark,
    FaMountain,
    FaUniversity,
    FaChild,
    FaBook,
} from "react-icons/fa";

/**
 * Temple Highlights — Mobile-first responsive chip scroller
 *
 * Mobile: horizontal scroller with two visible chips (snap)
 * Desktop: grid-like layout with wrap (no horizontal scroll)
 */

const NAVY = "#082032";
const CHIP_BG = "rgba(8,32,50,0.04)";

const HIGHLIGHTS = [
    { id: 1, icon: FaBuilding, title: "Beach-side Temple" },
    { id: 2, icon: FaMountain, title: "Tallest in Chennai" },
    { id: 3, icon: FaLandmark, title: "Pallava Architecture" },
    { id: 4, icon: FaUniversity, title: "40,000 sq. ft. build-up" },
    { id: 5, icon: FaChild, title: "ICVK - Kids Program" },
    { id: 6, icon: FaBook, title: "Gita Life Program" },
    { id: 7, icon: FaLandmark, title: "Final phase construction in-progress" },
];

const TempleHighlights = () => {
    // true for mobile screens (base / sm)
    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <Box
            w="100%"
            maxW="1200px"
            mx="auto"
            px={[4, 6]}
            mt={12}
            fontFamily={`'Poppins', sans-serif`}
        >
            <Text
                textAlign="center"
                fontSize={["xl", "2xl"]}
                fontWeight="700"
                color={NAVY}
                mb={6}
            >
                Temple Highlights
            </Text>

            {/* Mobile: horizontal scroll container */}
            <Box
                as="section"
                // Desktop: disable horizontal scroll
                overflowX={isMobile ? "auto" : "visible"}
                // Hide vertical overflow just in case
                overflowY="hidden"
                // Only allow pointer scrolling on mobile
                css={
                    isMobile
                        ? {
                            WebkitOverflowScrolling: "touch",
                            scrollSnapType: "x mandatory",
                            // hide default scrollbar in webkit
                            "&::-webkit-scrollbar": { display: "none" },
                        }
                        : {}
                }
            >
                <Flex
                    gap={4}
                    // On mobile we keep inline row (chips scroll horizontally)
                    flexDirection="row"
                    // Desktop: wrap to rows
                    flexWrap={isMobile ? "nowrap" : "wrap"}
                    align="flex-start"
                >
                    {HIGHLIGHTS.map((h, idx) => (
                        <Box
                            key={h.id}
                            // Mobile width: ~48% so 2 visible chips
                            // Tablet/desktop: auto width with wrap
                            minW={isMobile ? "48%" : "auto"}
                            flex={isMobile ? "0 0 48%" : "0 1 auto"}
                            scrollSnapAlign={isMobile ? "center" : undefined}
                            bg={CHIP_BG}
                            borderRadius="14px"
                            boxShadow="0 6px 18px rgba(8,32,50,0.06)"
                            p={4}
                            display="flex"
                            alignItems="center"
                        >
                            <Flex
                                w="44px"
                                h="44px"
                                borderRadius="10px"
                                align="center"
                                justify="center"
                                mr={3}
                                flexShrink={0}
                                // subtle lighter background for icon tile
                                bg="white"
                                boxShadow="0 2px 6px rgba(8,32,50,0.06)"
                            >
                                <Icon as={h.icon} color={NAVY} boxSize={5} />
                                <VisuallyHidden>{h.title}</VisuallyHidden>
                            </Flex>

                            <Box>
                                <Text fontSize="md" color={NAVY} fontWeight="700" lineHeight="1.05">
                                    {h.title}
                                </Text>
                            </Box>
                        </Box>
                    ))}
                </Flex>
            </Box>

            {/* Desktop hint: small spacing below */}
            <Box h={[3, 4, 6]} />
        </Box>
    );
};

export default TempleHighlights;