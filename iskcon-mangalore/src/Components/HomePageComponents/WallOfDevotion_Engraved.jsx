import React, { useMemo } from "react";
import {
    Box,
    Grid,
    Text,
    VStack,
    HStack,
    Tooltip,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    useDisclosure,
    useBreakpointValue,
} from "@chakra-ui/react";

// 🎨  Theme colors
const NAVY = "#082032";
const GOLD_TEXT = "#7A6235";
const GREEN_BORDER = "#3DA35D";
const BG_MARBLE = "url('/textures/marble_light.jpg')"; // optional subtle marble texture
const TOTAL_BLOCKS = 500;

// 🧘‍♀️ Dummy donor data (20 donors)
const dummyDonors = [
    { name: "Ramesh Kumar", sqft: 25 },
    { name: "Anita Devi", sqft: 15 },
    { name: "Sunil Gupta", sqft: 10 },
    { name: "Kiran Prakash", sqft: 30 },
    { name: "Nirmala S", sqft: 20 },
    { name: "Rajesh Iyer", sqft: 40 },
    { name: "Priya Lakshmi", sqft: 35 },
    { name: "Vivek Sharma", sqft: 15 },
    { name: "Meena G", sqft: 25 },
    { name: "Arjun Rao", sqft: 10 },
    { name: "Deepa M", sqft: 20 },
    { name: "Suresh N", sqft: 25 },
    { name: "Geetha B", sqft: 15 },
    { name: "Balaji D", sqft: 10 },
    { name: "Kavitha P", sqft: 25 },
    { name: "Ravi Shankar", sqft: 40 },
    { name: "Manoj V", sqft: 30 },
    { name: "Lakshmi Priya", sqft: 20 },
    { name: "Narayana Swamy", sqft: 30 },
    { name: "Raghavendra", sqft: 20 },
];

const WallOfDevotion_Engraved = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const columns = useBreakpointValue({ base: 15, md: 25 });

    // auto-fill donor blocks sequentially
    const filledBlocks = useMemo(() => {
        let filled = [];
        let cursor = 0;
        dummyDonors.forEach((d) => {
            for (let i = 0; i < d.sqft && cursor < TOTAL_BLOCKS; i++) {
                filled.push({ index: cursor, name: d.name });
                cursor++;
            }
        });
        return filled;
    }, []);
    const filledSet = new Set(filledBlocks.map((b) => b.index));

    const donorByIndex = (i) => filledBlocks.find((b) => b.index === i)?.name || null;

    return (
        <Box textAlign="center" mt={10} fontFamily="'Poppins', sans-serif">
            {/* --- Heading --- */}
            <Text fontSize={["2xl", "3xl"]} fontWeight="600" color={NAVY} mb={3}>
                Wall of Devotion
            </Text>
            <Text
                fontSize={["md", "lg"]}
                color="#4A5568"
                maxW="700px"
                mx="auto"
                lineHeight="1.6"
                mb={3}
            >
                Every engraved plaque represents a sacred square foot of Dakshina Dwaraka Dham,
                eternally carrying the devotion of those who contributed.
            </Text>
            <Text fontSize="sm" color="#6B7280">
                Hover over each golden plaque to see the devotee’s name.
            </Text>

            <Button
                onClick={onOpen}
                mt={6}
                px={8}
                bg={NAVY}
                color="white"
                borderRadius="50px"
                _hover={{ bg: "#0B2C49" }}
            >
                View Wall of Devotion
            </Button>

            {/* --- Modal --- */}
            <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered scrollBehavior="inside">
                <ModalOverlay bg="rgba(0,0,0,0.6)" backdropFilter="blur(3px)" />
                <ModalContent
                    borderRadius="20px"
                    p={[4, 6]}
                    maxH="90vh"
                    overflow="hidden"
                    bgImage={BG_MARBLE}
                    bgSize="cover"
                    bgPosition="center"
                >
                    <ModalHeader textAlign="center" fontSize="2xl" color={NAVY}>
                        Wall of Devotion
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={6}>
                            <Text
                                textAlign="center"
                                fontSize="md"
                                color="#5A5A5A"
                                maxW="600px"
                                lineHeight="1.6"
                            >
                                Each golden plaque below represents the devotion of a kind contributor.
                                May this sacred wall stand as a symbol of unity and service to Lord Krishna.
                            </Text>

                            {/* --- Wall Grid --- */}
                            <Box
                                w="100%"
                                overflowX="auto"
                                px={2}
                                py={3}
                                borderRadius="12px"
                                bg="rgba(255,255,255,0.6)"
                                boxShadow="inset 0 0 8px rgba(0,0,0,0.05)"
                            >
                                <Grid
                                    templateColumns={`repeat(${columns}, minmax(48px, 1fr))`}
                                    gap={2}
                                    justifyContent="center"
                                    mx="auto"
                                >
                                    {Array.from({ length: TOTAL_BLOCKS }).map((_, i) => {
                                        const donor = donorByIndex(i);
                                        const filled = filledSet.has(i);

                                        return (
                                            <Tooltip
                                                key={i}
                                                label={filled ? donor : "Available for offering"}
                                                bg={NAVY}
                                                color="white"
                                                fontSize="xs"
                                                hasArrow
                                                placement="top"
                                            >
                                                <Box
                                                    w="48px"
                                                    h="48px"
                                                    borderRadius="8px"
                                                    textAlign="center"
                                                    display="flex"
                                                    alignItems="center"
                                                    justifyContent="center"
                                                    transition="all 0.25s ease"
                                                    bgGradient={
                                                        filled
                                                            ? "linear(to-b, #FFF8E1, #F7E8B5)"
                                                            : "linear(to-b, #FFFFFF, #F9FAF9)"
                                                    }
                                                    border={
                                                        filled
                                                            ? "1px solid rgba(180,150,80,0.5)"
                                                            : `1.5px solid ${GREEN_BORDER}`
                                                    }
                                                    boxShadow={
                                                        filled
                                                            ? "inset 0 1px 2px rgba(255,255,255,0.8), inset 0 -1px 3px rgba(150,120,50,0.25)"
                                                            : "inset 0 0 2px rgba(0,0,0,0.05)"
                                                    }
                                                    _hover={
                                                        filled
                                                            ? {
                                                                boxShadow:
                                                                    "0 0 10px rgba(255,215,0,0.45), inset 0 0 4px rgba(255,215,0,0.4)",
                                                                transform: "scale(1.08)",
                                                            }
                                                            : {
                                                                boxShadow: "0 0 8px rgba(61,163,93,0.25)",
                                                                transform: "scale(1.05)",
                                                            }
                                                    }
                                                >
                                                    {filled && (
                                                        <Text
                                                            fontSize="xs"
                                                            color={GOLD_TEXT}
                                                            fontWeight="600"
                                                            textShadow="0 1px 0 rgba(255,255,255,0.6)"
                                                            px="2px"
                                                            noOfLines={2}
                                                        >
                                                            {donor.split(" ")[0]}
                                                        </Text>
                                                    )}
                                                </Box>
                                            </Tooltip>
                                        );
                                    })}
                                </Grid>
                            </Box>

                            {/* --- Legend --- */}
                            <HStack justify="center" spacing={6} mt={4}>
                                <HStack>
                                    <Box
                                        w="22px"
                                        h="22px"
                                        borderRadius="6px"
                                        bgGradient="linear(to-b, #FFF8E1, #F7E8B5)"
                                        border="1px solid rgba(180,150,80,0.5)"
                                    />
                                    <Text fontSize="sm" color={NAVY}>
                                        Engraved (Claimed)
                                    </Text>
                                </HStack>
                                <HStack>
                                    <Box
                                        w="22px"
                                        h="22px"
                                        bg="white"
                                        border={`1.5px solid ${GREEN_BORDER}`}
                                        borderRadius="6px"
                                    />
                                    <Text fontSize="sm" color={NAVY}>
                                        Available
                                    </Text>
                                </HStack>
                            </HStack>
                        </VStack>
                    </ModalBody>

                    <ModalFooter justifyContent="center">
                        <Button
                            borderRadius="50px"
                            bgGradient="linear(to-r, #FFD369, #FFC947)"
                            color={NAVY}
                            px={8}
                            py={5}
                            fontWeight="600"
                            _hover={{
                                bgGradient: "linear(to-r, #FFD66B, #FFCB52)",
                                boxShadow: "0 0 10px rgba(255,215,0,0.4)",
                            }}
                        >
                            Add Your Name to the Wall
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default WallOfDevotion_Engraved;
