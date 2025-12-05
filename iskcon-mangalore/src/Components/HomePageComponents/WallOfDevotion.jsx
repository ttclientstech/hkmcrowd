import React, { useState, useMemo } from "react";
import {
    Box,
    Grid,
    Text,
    VStack,
    HStack,
    Tooltip,
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    useBreakpointValue,
} from "@chakra-ui/react";

const NAVY = "#082032";
const GOLD = "#FFD66B";
const GREEN_BORDER = "#3DA35D";
const BG_LIGHT = "#FAFAFA";

// 🧱 Dummy donor list for demo (20 donors, variable sqft)
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

const TOTAL_BLOCKS = 500;

const WallOfDevotion = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const columns = useBreakpointValue({ base: 15, md: 25 }); // mobile vs desktop

    // Assign donors to sequential blocks based on sqft
    const filledBlocks = useMemo(() => {
        let filledIndices = [];
        let cursor = 0;
        dummyDonors.forEach((donor) => {
            for (let i = 0; i < donor.sqft && cursor < TOTAL_BLOCKS; i++) {
                filledIndices.push({ index: cursor, name: donor.name });
                cursor++;
            }
        });
        return filledIndices;
    }, []);

    const filledSet = new Set(filledBlocks.map((b) => b.index));

    const getDonorByIndex = (index) =>
        filledBlocks.find((b) => b.index === index)?.name || null;

    return (
        <Box textAlign="center" mt={10} fontFamily="'Poppins', sans-serif">
            <Text fontSize={["2xl", "3xl"]} fontWeight="600" color={NAVY} mb={3}>
                Wall of Devotion
            </Text>
            <Text
                fontSize={["md", "lg"]}
                color="#4A5568"
                maxW="700px"
                mx="auto"
                lineHeight="1.6"
                mb={2}
            >
                Each block represents a sacred square foot of the temple.
                <br />
                Hover over golden blocks to see the devotees who’ve offered their seva.
            </Text>

            <Button
                onClick={onOpen}
                bg={NAVY}
                color="white"
                px={8}
                mt={6}
                borderRadius="50px"
                _hover={{ bg: "#0A2A46" }}
            >
                View Wall of Devotion
            </Button>

            {/* MODAL */}
            <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered scrollBehavior="inside">
                <ModalOverlay bg="rgba(0,0,0,0.6)" backdropFilter="blur(2px)" />
                <ModalContent bg={BG_LIGHT} borderRadius="16px" p={[4, 6]} maxH="90vh" overflow="hidden">
                    <ModalHeader textAlign="center" fontSize="2xl" color={NAVY}>
                        Wall of Devotion
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={6}>
                            <Text
                                textAlign="center"
                                fontSize="md"
                                color="#555"
                                maxW="600px"
                                lineHeight="1.6"
                            >
                                Each golden block represents a devotee who has offered their contribution
                                towards the sacred construction of Dakshina Dwaraka Dham.
                                <br />
                                Hover over a golden block to view their name.
                            </Text>

                            {/* WALL GRID */}
                            <Box
                                w="100%"
                                overflowX="auto"
                                px={2}
                                py={3}
                                borderRadius="12px"
                                bg="white"
                                boxShadow="0 4px 16px rgba(0,0,0,0.05)"
                            >
                                <Grid
                                    templateColumns={`repeat(${columns}, minmax(22px, 1fr))`}
                                    gap={1.5}
                                    justifyContent="center"
                                    mx="auto"
                                >
                                    {Array.from({ length: TOTAL_BLOCKS }).map((_, i) => {
                                        const donor = getDonorByIndex(i);
                                        const isFilled = filledSet.has(i);
                                        return (
                                            <Tooltip
                                                key={i}
                                                label={
                                                    isFilled
                                                        ? `${donor}`
                                                        : "Available for sponsorship"
                                                }
                                                hasArrow
                                                bg={NAVY}
                                                color="white"
                                                placement="top"
                                                fontSize="xs"
                                            >
                                                <Box
                                                    w="22px"
                                                    h="22px"
                                                    borderRadius="4px"
                                                    bg={isFilled ? GOLD : "white"}
                                                    border={isFilled ? "1px solid #D5B556" : `1.5px solid ${GREEN_BORDER}`}
                                                    transition="all 0.2s ease"
                                                    _hover={{
                                                        transform: isFilled ? "scale(1.15)" : "scale(1.05)",
                                                        boxShadow: isFilled
                                                            ? "0 0 8px rgba(255,214,107,0.6)"
                                                            : "0 0 6px rgba(61,163,93,0.3)",
                                                    }}
                                                />
                                            </Tooltip>
                                        );
                                    })}
                                </Grid>
                            </Box>

                            {/* LEGEND */}
                            <HStack justify="center" spacing={6} mt={2}>
                                <HStack>
                                    <Box w="20px" h="20px" bg={GOLD} borderRadius="4px" />
                                    <Text fontSize="sm" color={NAVY}>
                                        Already Claimed
                                    </Text>
                                </HStack>
                                <HStack>
                                    <Box
                                        w="20px"
                                        h="20px"
                                        bg="white"
                                        border={`1.5px solid ${GREEN_BORDER}`}
                                        borderRadius="4px"
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
                            _hover={{ bgGradient: "linear(to-r, #FFD66B, #FFCB52)" }}
                        >
                            Add Your Name to the Wall
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default WallOfDevotion;