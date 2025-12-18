import React from "react";
import { Box, Text, Grid, GridItem, Image, Flex, Icon, useBreakpointValue } from "@chakra-ui/react";
import { FaExpand, FaCube } from "react-icons/fa";

// PLEASE UPDATE THESE IMPORTS WITH YOUR NEW 3D RENDER IMAGES
import render1 from "../../assets/images/ddd_arc_1.jpg"; // Main View
import render2 from "../../assets/images/ddd_arc_4.jpg";    // Side/Aerial View
import render3 from "../../assets/images/ddd_arc_2.jpg";           // Close-up View
import render4 from "../../assets/images/ddd_arc_3.jpg";    // Interior View

// Theme Constants
const NAVY = "#082032";
const GOLD = "#D4AF37";
const TEXT_DARK = "#1A1A1A";

const ImageCard = ({ src, title, icon, height }) => {
    return (
        <Box
            w="100%"
            h={height}
            position="relative"
            borderRadius="16px"
            overflow="hidden"
            role="group"
            boxShadow="0 10px 30px rgba(0,0,0,0.15)"
            borderBottom={`4px solid ${NAVY}`}
        >
            {/* Image with Zoom Effect */}
            <Image
                src={src}
                alt={title}
                w="100%"
                h="100%"
                objectFit="cover"
                transition="transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                _groupHover={{ transform: "scale(1.05)" }}
            />

            {/* Gradient Overlay */}
            <Box
                position="absolute"
                inset="0"
                bgGradient="linear(to-t, rgba(8,32,50,0.85) 0%, rgba(8,32,50,0) 40%)"
                transition="opacity 0.3s ease"
            />

            {/* Content Overlay */}
            <Flex
                position="absolute"
                bottom="0"
                left="0"
                w="100%"
                p={4}
                align="center"
                justify="space-between"
            >
                <Flex align="center" gap={3}>
                    <Box
                        bg="rgba(255,255,255,0.2)"
                        backdropFilter="blur(5px)"
                        p={2}
                        borderRadius="full"
                        color={GOLD}
                    >
                        <Icon as={icon} w={4} h={4} />
                    </Box>
                    <Text
                        color="white"
                        fontFamily="'Poppins', sans-serif"
                        fontWeight="600"
                        fontSize={["sm", "md"]}
                        letterSpacing="0.5px"
                    >
                        {title}
                    </Text>
                </Flex>
            </Flex>
        </Box>
    );
};

const TempleArchitecturalShowcase = () => {
    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <Box
            as="section"
            w="100%"
            maxW="1200px"
            mx="auto"
            px={[4, 6]}
            mt={18}
            mb={12}
            fontFamily="'Poppins', sans-serif"
        >
            {/* --- HEADER SECTION --- */}
            <Box textAlign="center" mb={10}>

                {/* Main Title */}
                <Text
                    fontSize={["3xl", "3xl", "4xl"]}
                    fontWeight="800"
                    color={NAVY}
                    lineHeight="1.2"
                    mb={3}
                >
                    Architectural <Text as="span" color="#E63946">Vision</Text>
                </Text>

                {/* Subtitle / Description */}
                <Text
                    fontSize={["md", "md"]}
                    color="black"
                    opacity={0.8}
                    maxW="700px"
                    mx="auto"
                    fontFamily="'Poppins', sans-serif"
                >
                    A fusion of traditional Pallava craftsmanship and modern engineering.
                    Explore the visualizations of Chennai's Dakshina Dwaraka Dham.
                </Text>
            </Box>

            {/* --- IMAGE GRID (BENTO STYLE) --- */}
            <Grid
                templateColumns={["1fr", "1fr", "repeat(12, 1fr)"]}
                templateRows={["auto", "auto", "repeat(2, 250px)"]} // Fixed height rows for desktop
                gap={4}
            >
                {/* 1. MAIN HERO IMAGE (Large - Left Side) */}
                <GridItem colSpan={[1, 1, 8]} rowSpan={[1, 1, 2]}>
                    <ImageCard
                        src={render1}
                        title="Grand Front View"
                        icon={FaCube}
                        height="100%" // Fills the grid cell
                    />
                </GridItem>

                {/* 2. SECONDARY IMAGE (Top Right) */}
                <GridItem colSpan={[1, 1, 4]} rowSpan={[1, 1, 1]}>
                    <ImageCard
                        src={render2}
                        title="Aerial Perspective"
                        icon={FaExpand}
                        height={isMobile ? "250px" : "100%"}
                    />
                </GridItem>

                {/* 3. TERTIARY IMAGE (Bottom Right Split A) */}
                <GridItem colSpan={[1, 1, 2]} rowSpan={[1, 1, 1]}>
                    <ImageCard
                        src={render3}
                        title="Thiruvanmiyur Beach View"
                        icon={FaCube}
                        height={isMobile ? "200px" : "100%"}
                    />
                </GridItem>

                {/* 4. TERTIARY IMAGE (Bottom Right Split B) */}
                <GridItem colSpan={[1, 1, 2]} rowSpan={[1, 1, 1]}>
                    <ImageCard
                        src={render4}
                        title="Side View"
                        icon={FaCube}
                        height={isMobile ? "200px" : "100%"}
                    />
                </GridItem>
            </Grid>
        </Box>
    );
};

export default TempleArchitecturalShowcase;