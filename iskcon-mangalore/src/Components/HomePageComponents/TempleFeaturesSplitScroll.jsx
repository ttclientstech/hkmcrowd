// TempleFeaturesSplitScroll.jsx
import React, { useEffect, useRef, useState } from "react";
import { Box, Grid, Image, Text, VStack, useBreakpointValue, HStack } from "@chakra-ui/react";

/**
 * USAGE:
 * import TempleFeaturesSplitScroll from "./TempleFeaturesSplitScroll";
 * <TempleFeaturesSplitScroll />
 *
 * Replace image imports/paths below with your actual assets.
 */

// example imports (replace with your project paths)
import img_annadanam from "../assets/images/annadanam_hall_1.png";
import img_festival from "../assets/images/festival_hall_1.png";
import img_kalamadhuryam from "../assets/images/kalamadhuryam_1.png";
import img_harinam from "../assets/images/harinaam_mandap_1.png";
import img_icvk from "../assets/images/icvk_1.png";
import img_gitalife from "../assets/images/gita_life_1.png";

const FEATURES = [
    {
        id: "altar",
        title: "Main Krishna Altar",
        desc:
            "A majestic sanctum for darshan and seva — designed for daily kirtan, mantra and intimate worship.",
        img: img_annadanam,
        alt: "Main Krishna altar – Dakshina Dwaraka Dham"
    },
    {
        id: "festival",
        title: "Temple & Festival Hall",
        desc:
            "A grand hall for festivals, cultural events and large congregational programs.",
        img: img_festival,
        alt: "Festival hall – Dakshina Dwaraka Dham"
    },
    {
        id: "annadanam",
        title: "Annadānam Hall",
        desc:
            "A dedicated kitchen & dining space to serve Mahā-prasādam to devotees and the community.",
        img: img_kalamadhuryam,
        alt: "Annadanam hall – Dakshina Dwaraka Dham"
    },
    {
        id: "harinam",
        title: "Harinām Mandap",
        desc:
            "Open mandap for harinam sankirtan, meditation sessions and soulful gatherings.",
        img: img_harinam,
        alt: "Harinam mandap – Dakshina Dwaraka Dham"
    },
    {
        id: "icvk",
        title: "ICVK – Kids Programs",
        desc:
            "Indian Culture & Values for Kids — curriculum that blends character, art and devotion.",
        img: img_icvk,
        alt: "ICVK programs – Dakshina Dwaraka Dham"
    },
    {
        id: "gitalife",
        title: "Gita Life – Youth & Families",
        desc:
            "Practical Gita-based programs for youth and families: workshops, counseling and community activities.",
        img: img_gitalife,
        alt: "Gita Life program – Dakshina Dwaraka Dham"
    },
];

const TempleFeaturesSplitScroll = () => {
    const isMobile = useBreakpointValue({ base: true, md: false });

    // currently visible feature index (for desktop pinned image)
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef(null);
    const itemRefs = useRef([]);

    // ensure array length matches FEATURES
    itemRefs.current = [];

    const addItemRef = (el) => {
        if (el && !itemRefs.current.includes(el)) itemRefs.current.push(el);
    };

    useEffect(() => {
        if (isMobile) return; // desktop behavior only

        // IntersectionObserver to detect which block is centered / entering view.
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const idx = Number(entry.target.getAttribute("data-idx"));
                        // slight debounce guard
                        setActiveIndex(idx);
                    }
                });
            },
            {
                root: null,
                threshold: 0.55, // item must be ~55% visible to activate
            }
        );

        itemRefs.current.forEach((el) => obs.observe(el));

        return () => obs.disconnect();
    }, [isMobile]);

    return (
        <Box
            as="section"
            w="100%"
            maxW="1200px"
            mx="auto"
            px={[4, 6]}
            py={[8, 12]}
            fontFamily="'Poppins', sans-serif"
        >
            <Text
                textAlign="center"
                fontSize={["xl", "2xl"]}
                fontWeight="700"
                color="#082032"
                mb={8}
            >
                What’s inside Dakshina Dwaraka Dham
            </Text>

            {/* Desktop: left pinned image + right scrolling text
          Mobile: stacked cards */}
            {isMobile ? (
                // Mobile stacked cards (image above text)
                <VStack spacing={6} align="stretch">
                    {FEATURES.map((f, i) => (
                        <Box
                            key={f.id}
                            borderRadius="14px"
                            boxShadow="0 8px 30px rgba(4,10,25,0.06)"
                            overflow="hidden"
                            bg="white"
                        >
                            <Image src={f.img} alt={f.alt} w="100%" h="220px" objectFit="cover" />
                            <Box p={4}>
                                <Text fontSize="lg" fontWeight="700" color="#082032" mb={2}>
                                    {f.title}
                                </Text>
                                <Text color="#475569" fontSize="md" lineHeight="1.6">{f.desc}</Text>
                            </Box>
                        </Box>
                    ))}
                </VStack>
            ) : (
                // Desktop two-column layout
                <Grid templateColumns="430px 1fr" gap={10} alignItems="start" ref={containerRef}>
                    {/* Left: pinned image area */}
                    <Box position="sticky" top="84px" height="60vh" alignSelf="start">
                        {/* layered images with crossfade */}
                        <Box position="relative" w="100%" h="100%" borderRadius="14px" overflow="hidden" boxShadow="0 12px 40px rgba(2,6,23,0.12)">
                            {FEATURES.map((f, i) => {
                                const visible = i === activeIndex;
                                return (
                                    <Image
                                        key={f.id}
                                        src={f.img}
                                        alt={f.alt}
                                        objectFit="cover"
                                        w="100%"
                                        h="100%"
                                        position="absolute"
                                        top="0"
                                        left="0"
                                        transition="opacity 600ms ease, transform 700ms ease"
                                        opacity={visible ? 1 : 0}
                                        transform={visible ? "scale(1)" : "scale(1.03)"}
                                        loading={i === 0 || i === activeIndex ? "eager" : "lazy"}
                                    />
                                );
                            })}
                        </Box>

                        {/* optional caption below image */}
                        <Box mt={4}>
                            <HStack spacing={3}>
                                <Box
                                    w="10px"
                                    h="10px"
                                    borderRadius="4px"
                                    bg="#F28A7E" // coral small accent
                                />
                                <Text fontSize="sm" color="#475569">Explore the spaces built for devotion, culture & service</Text>
                            </HStack>
                        </Box>
                    </Box>

                    {/* Right: scrollable text items */}
                    <VStack spacing={10} align="stretch">
                        {FEATURES.map((f, idx) => (
                            <Box
                                key={f.id}
                                data-idx={idx}
                                ref={addItemRef}
                                p={6}
                                borderRadius="10px"
                                bg="#ffffff"
                                boxShadow="0 6px 20px rgba(7,12,30,0.04)"
                            >
                                <Text fontSize="lg" fontWeight="800" color="#082032" mb={3}>
                                    {f.title}
                                </Text>
                                <Text color="#475569" fontSize="md" lineHeight="1.7">
                                    {f.desc}
                                </Text>
                            </Box>
                        ))}
                    </VStack>
                </Grid>
            )}
        </Box>
    );
};

export default TempleFeaturesSplitScroll;