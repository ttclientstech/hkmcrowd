import React, { useState } from 'react';
import { Box, Flex, Text, Heading, Progress, Button, Input, InputGroup, SimpleGrid, Image, Stack, Icon } from '@chakra-ui/react';
import { FaLock } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

const HomeSinglePage = () => {
    const { id } = useParams();
   // const { data: user, isLoading } = useQuery(['user', id], () => getSingleUser(id));
   // if (isLoading || !user) {
        return <Text>Loading...</Text>;
   // }

    // Destructure campaigner data (field names should match your API)
    const campaignerName = "Aneesh";
    const campaignerImage = "https://i.postimg.cc/x8LFpFHJ/Krishna-wallpaper-for-Home-710x488.jpg";
    const campaignerMessage = "my personal message";
    const raised = 1000;
    const goal = 5000;

    // Donation calculation: 1 Sq Ft = ₹5001
    const costPerSqFt = 5001;
    const [sqft, setSqft] = useState(1);
    const [customSqFt, setCustomSqFt] = useState('');

    const handlePreset = (value) => {
        setSqft(value);
        setCustomSqFt('');
    };
    const handleCustomChange = (e) => {
        setCustomSqFt(e.target.value);
        setSqft(0);
    };
    const selectedSqFt = customSqFt ? Number(customSqFt) : sqft;
    const donationAmount = selectedSqFt * costPerSqFt;

    return (
        <Box>
            {/* Top Navigation - fixed over banner */}
            <Flex as="nav" position="fixed" top="0" w="100%" p={4} align="center" justify="space-between" bg="whiteAlpha.900" boxShadow="md" zIndex="overlay">
                <Flex align="center" gap={4}>
                    <Button variant="link" color="teal.600">Donate</Button>
                    <Button variant="link" color="teal.600">Contact</Button>
                </Flex>
                <Image src="/temple-logo.png" alt="Temple Logo" boxSize="50px" objectFit="contain" />
            </Flex>

            {/* Campaigner Info and Donation Section */}
            <Box pt={24} px={4} bgGradient="linear(to-b, teal.50, teal.100)">
                <Flex direction={{ base: 'column', md: 'row' }} align="start" maxW="6xl" mx="auto" py={10} px={4} gap={8}>
                    {/* Campaigner Section */}
                    <Box flex="1" textAlign="center">
                        <Heading as="h2" size="xl" color="teal.700">
                            {campaignerName} needs your support to raise {goal} Square Feet
                        </Heading>
                        <Box mt={4} borderRadius="full" overflow="hidden" boxSize="150px" mx="auto">
                            <Image src={campaignerImage} alt={campaignerName} objectFit="cover" />
                        </Box>
                        <Text mt={4} fontSize="lg" color="gray.700">
                            {campaignerMessage}
                        </Text>
                        <Text mt={2} fontSize="md" color="gray.600">
                            Please donate for square feet seva and support the construction of this grand temple.
                        </Text>
                    </Box>

                    {/* Donation Box */}
                    <Box flex="1" bg="white" borderRadius="lg" boxShadow="xl" p={6}>
                        <Heading as="h3" size="md" color="teal.600" textAlign="center">
                            Donation Progress
                        </Heading>
                        <Text mt={2} fontSize="md" textAlign="center" color="gray.600">
                            {((raised / goal) * 100).toFixed(2)}% ({raised} Sq Ft) of {goal} Sq Ft raised
                        </Text>
                        <Progress value={(raised / goal) * 100} size="lg" colorScheme="teal" mt={3} borderRadius="md" />

                        <Stack mt={6} spacing={4}>
                            <Heading as="h4" size="sm" color="gray.700" textAlign="center">
                                Select Square Feet
                            </Heading>
                            <Flex wrap="wrap" justify="center" gap={2}>
                                {[1, 5, 11, 25].map((num) => (
                                    <Button
                                        key={num}
                                        colorScheme={sqft === num ? 'teal' : 'gray'}
                                        variant={sqft === num ? 'solid' : 'outline'}
                                        onClick={() => handlePreset(num)}
                                    >
                                        {num} Sq Ft
                                    </Button>
                                ))}
                            </Flex>
                            <InputGroup>
                                <Input
                                    type="number"
                                    placeholder="Custom Sq Ft"
                                    value={customSqFt}
                                    onChange={handleCustomChange}
                                    textAlign="center"
                                    focusBorderColor="teal.400"
                                />
                            </InputGroup>
                            <Text fontSize="lg" fontWeight="bold" textAlign="center">
                                Amount: ₹{donationAmount.toLocaleString()}
                            </Text>
                            <Button colorScheme="teal" size="lg" leftIcon={<Icon as={FaLock} />} width="100%">
                                Secure Payment
                            </Button>
                        </Stack>
                    </Box>
                </Flex>
            </Box>

            {/* Testimonials Section */}
            <Box bg="gray.50" py={10}>
                <Heading as="h3" size="lg" textAlign="center" mb={8} color="teal.700">
                    Testimonials
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} maxW="5xl" mx="auto">
                    <Box bg="white" p={6} borderRadius="md" boxShadow="lg">
                        <Text fontStyle="italic">
                            “I am delighted to learn that... Vrindavan Chandrodaya Mandir is taking shape in the sacred land of Vrindavan.”
                        </Text>
                        <Text fontWeight="bold" mt={4} textAlign="right">
                            — Sri Narendra Modi, Prime Minister of India:contentReference
                        </Text>
                    </Box>
                    <Box bg="white" p={6} borderRadius="md" boxShadow="lg">
                        <Text fontStyle="italic">
                            “This is not just a building but a symbol of faith & devotion of thousands of devotees. Everyone should donate one square feet.”
                        </Text>
                        <Text fontWeight="bold" mt={4} textAlign="right">
                            — Devi Chitralekha, Renowned Spiritual Speaker:contentReference
                        </Text>
                    </Box>
                    <Box bg="white" p={6} borderRadius="md" boxShadow="lg">
                        <Text fontStyle="italic">
                            “I felt blissful taking part in the temple's wonderful activities...Everyone should donate.”
                        </Text>
                        <Text fontWeight="bold" mt={4} textAlign="right">
                            — Sonu Sood, Actor:contentReference[oaicite:10]
                        </Text>
                    </Box>
                    <Box bg="white" p={6} borderRadius="md" boxShadow="lg">
                        <Text fontStyle="italic">
                            “It's an amazing project and I think you should all donate for this.”
                        </Text>
                        <Text fontWeight="bold" mt={4} textAlign="right">
                            — Anupam Kher, Actor:contentReference[oaicite:11]
                        </Text>
                    </Box>
                </SimpleGrid>
            </Box>
        </Box>
    );
};

export default HomeSinglePage;
