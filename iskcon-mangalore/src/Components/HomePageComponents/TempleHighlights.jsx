import React, { useState } from "react";
import { Box, Flex, Text, VStack, Icon, Image, Heading, Button, useColorModeValue } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlaceOfWorship, FaUtensils, FaMusic, FaChild, FaUsers, FaBookOpen } from "react-icons/fa";

// Placeholder images - Replace these with your actual imported images
// Example: import altarImg from '../../assets/images/image14.jpg';
import bannerBg from "../../assets/images/002_temple_night_view.jpeg"; // Fallback image

const MotionBox = motion(Box);

const highlightsData = [
    {
        id: "altar",
        title: "Divine Altar",
        subtitle: "The Heart of the Complex",
        description: "A magnificent, intricately carved altar for Lord Sri Krishna. This will be the spiritual powerhouse where thousands will find peace, prayer, and connection every single day.",
        icon: FaPlaceOfWorship,
        color: "#D4AF37", // Gold
        img: bannerBg // Replace with Altar Image
    },
    {
        id: "annadanam",
        title: "Annadanam Hall",
        subtitle: "Food for the Soul",
        description: "No one goes hungry within 10 miles of a temple. Our massive Annadanam Hall will serve hot, sanctified, nutritious meals (Prasadam) to thousands of visitors freely.",
        icon: FaUtensils,
        color: "#E53E3E", // Red
        img: bannerBg // Replace with Food Distribution Image
    },
    {
        id: "hall",
        title: "Festival Hall",
        subtitle: "Culture & Celebration",
        description: "A grand venue to host vibrant festivals like Janmashtami and Ratha Yatra. This space brings the community together, preserving our rich traditions for future generations.",
        icon: FaUsers,
        color: "#3182CE", // Blue
        img: bannerBg // Replace with Festival Image
    },
    {
        id: "harinam",
        title: "Harinam Mandap",
        subtitle: "The Sound of Divinity",
        description: "A dedicated acoustic space for the continuous chanting of the Holy Names. A spiritual oasis where the mantra resonates 24/7 to bring peace to the world.",
        icon: FaMusic,
        color: "#D69E2E", // Orange
        img: bannerBg // Replace with Kirtan Image
    },
    {
        id: "kids",
        title: "ICVK Kids",
        subtitle: "Shaping Future Leaders",
        description: "Indian Culture & Values for Kids (ICVK). A specialized wing dedicated to imparting character-building education and values to children through fun and spirituality.",
        icon: FaChild,
        color: "#38A169", // Green
        img: bannerBg // Replace with Kids Class Image
    },
    {
        id: "youth",
        title: "Gita Life",
        subtitle: "Wisdom for Life",
        description: "Empowering youth and families with the timeless wisdom of the Bhagavad Gita. Workshops and seminars that help modern people lead balanced, stress-free lives.",
        icon: FaBookOpen,
        color: "#805AD5", // Purple
        img: bannerBg // Replace with Youth Class Image
    }
];

const TempleHighlights = () => {
    const [activeTab, setActiveTab] = useState(highlightsData[0]);

    return (
        <Box py={10} px={[4, 0]} w="100%" maxW="1200px" mx="auto">
            {/* Section Header */}
            <VStack spacing={2} mb={8} textAlign="center">
                <Text fontSize="sm" fontWeight="bold" letterSpacing="widest" color="#D4AF37" textTransform="uppercase">
                    Inside Dakshina Dwaraka Dham
                </Text>
                <Heading as="h2" size="xl" color="#2C0A0A" fontFamily="'Cinzel', serif">
                    Build More Than Just a Temple
                </Heading>
                <Text color="gray.600" maxW="600px">
                    Explore the spiritual and social impact centers you are helping to create.
                </Text>
            </VStack>

            {/* Main Interactive Block */}
            <Flex
                direction={["column", "column", "row"]}
                bg="white"
                borderRadius="2xl"
                boxShadow="xl"
                overflow="hidden"
                minH="500px"
                border="1px solid #E2E8F0"
            >

                {/* LEFT: Navigation Tabs (The Menu) */}
                <Flex
                    direction={["row", "row", "column"]}
                    w={["100%", "100%", "35%"]}
                    bg="#F7FAFC"
                    overflowX={["auto", "auto", "visible"]} // Scrollable on mobile
                    borderRight={["none", "none", "1px solid #E2E8F0"]}
                    borderBottom={["1px solid #E2E8F0", "1px solid #E2E8F0", "none"]}
                >
                    {highlightsData.map((item) => {
                        const isActive = activeTab.id === item.id;
                        return (
                            <Flex
                                key={item.id}
                                as="button"
                                onClick={() => setActiveTab(item)}
                                align="center"
                                p={5}
                                cursor="pointer"
                                transition="all 0.3s"
                                bg={isActive ? "white" : "transparent"}
                                borderLeft={["none", "none", isActive ? `5px solid ${item.color}` : "5px solid transparent"]}
                                borderBottom={["none", "none", isActive ? "none" : "1px solid #E2E8F0"]}
                                _hover={{ bg: "white" }}
                                minW={["160px", "200px", "auto"]} // Ensure width on mobile scroll
                            >
                                <Flex
                                    align="center" justify="center"
                                    w="40px" h="40px" borderRadius="full"
                                    bg={isActive ? item.color : "gray.200"}
                                    color={isActive ? "white" : "gray.500"}
                                    mr={4}
                                    transition="all 0.3s"
                                >
                                    <Icon as={item.icon} boxSize={5} />
                                </Flex>
                                <VStack align="flex-start" spacing={0} display={["block", "block", "flex"]}>
                                    <Text fontWeight="bold" color={isActive ? "#2C0A0A" : "gray.500"} fontSize="md">
                                        {item.title}
                                    </Text>
                                    {/* Hide subtitle on very small screens if needed */}
                                </VStack>
                            </Flex>
                        );
                    })}
                </Flex>

                {/* RIGHT: Content Display (The Stage) */}
                <Box w={["100%", "100%", "65%"]} position="relative" bg="black">
                    <AnimatePresence mode="wait">
                        <MotionBox
                            key={activeTab.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            position="absolute"
                            top="0" left="0" w="100%" h="100%"
                        >
                            {/* Background Image with Overlay */}
                            <Image
                                src={activeTab.img}
                                w="100%" h="100%"
                                objectFit="cover"
                                opacity="0.6"
                            />
                            <Box
                                position="absolute" top="0" left="0" w="100%" h="100%"
                                bgGradient="linear(to-t, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)"
                            />

                            {/* Content Text */}
                            <Flex
                                position="absolute"
                                bottom="0" left="0" w="100%"
                                p={[6, 8, 10]}
                                direction="column"
                                align="flex-start"
                            >
                                <Flex align="center" mb={2}>
                                    <Icon as={activeTab.icon} color={activeTab.color} boxSize={6} mr={2} />
                                    <Text color={activeTab.color} fontWeight="bold" letterSpacing="wide" textTransform="uppercase" fontSize="sm">
                                        {activeTab.subtitle}
                                    </Text>
                                </Flex>

                                <Heading color="white" fontSize={["2xl", "3xl", "4xl"]} mb={4} fontFamily="'Cinzel', serif">
                                    {activeTab.title}
                                </Heading>

                                <Text color="gray.200" fontSize={["md", "lg"]} lineHeight="1.6" mb={6} maxW="90%">
                                    {activeTab.description}
                                </Text>
                            </Flex>
                        </MotionBox>
                    </AnimatePresence>
                </Box>

            </Flex>
        </Box>
    );
};

export default TempleHighlights;