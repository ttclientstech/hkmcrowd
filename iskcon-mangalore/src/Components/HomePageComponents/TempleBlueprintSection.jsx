import { Box, Text, Grid, Flex } from "@chakra-ui/react";
import { FaPrayingHands, FaLeaf, FaPeopleCarry, FaChild, FaHandsHelping, FaGopuram } from "react-icons/fa";

const TempleBlueprintSection = () => {
    const items = [
        {
            icon: FaGopuram,
            title: "Main Krishna Altar",
            desc: "A majestic sanctum where devotees receive darshan & divine blessings.",
        },
        {
            icon: FaPeopleCarry,
            title: "Temple & Festival Hall",
            desc: "A grand cultural hall for kirtans, festivals & spiritual gatherings.",
        },
        {
            icon: FaHandsHelping,
            title: "Annadānam Hall",
            desc: "A dedicated prasadam hall serving free meals to all visitors.",
        },
        {
            icon: FaPrayingHands,
            title: "Harinām Mandap",
            desc: "A serene space for japa, sankirtan, meditation & reflection.",
        },
        {
            icon: FaChild,
            title: "ICVK Children’s Program",
            desc: "A joyful center teaching kids values, culture & devotion.",
        },
        {
            icon: FaLeaf,
            title: "Gita Life Program",
            desc: "Programs empowering youth & families with Gita-based wisdom.",
        },
    ];

    return (
        <Box
            w="100%"
            maxW="1200px"
            mx="auto"
            px={[4, 6]}
            mt={16}
            mb={4}
            fontFamily="'Poppins', sans-serif"
        >
            {/* Title Block */}
            <Box textAlign="center" mb={10} position="relative">
                <Text
                    fontSize={["2xl", "3xl"]}
                    fontWeight="700"
                    color="#082032"
                    mb={2}
                >
                    Inside Dakshina Dwaraka Dham
                </Text>

                {/* Gold underline */}
                <Box
                    w="80px"
                    h="4px"
                    bg="#E2C275"
                    borderRadius="2px"
                    mx="auto"
                />

                <Text
                    mt={4}
                    color="#555"
                    fontSize={["md", "lg"]}
                    maxW="650px"
                    mx="auto"
                    lineHeight="1.6"
                >
                    Each contribution helps build sacred spaces that uplift hearts, nurture values,
                    and bring thousands closer to Lord Krishna.
                </Text>
            </Box>

            {/* GRID */}
            <Grid
                templateColumns={["1fr", "1fr", "1fr 1fr", "1fr 1fr 1fr"]}
                gap={6}
            >
                {items.map((item, i) => (
                    <Flex
                        key={i}
                        direction="column"
                        p={5}
                        bg="white"
                        borderRadius="14px"
                        boxShadow="0 4px 18px rgba(0,0,0,0.08)"
                        border="1px solid #f1f1f1"
                        _hover={{
                            transform: "translateY(-4px)",
                            boxShadow: "0 6px 24px rgba(0,0,0,0.12)",
                        }}
                        transition="0.25s ease"
                    >
                        {/* Icon */}
                        <Flex
                            w="60px"
                            h="60px"
                            borderRadius="50%"
                            bg="#F28A7E20" // coral tinted background
                            justify="center"
                            align="center"
                            mb={4}
                        >
                            <Box
                                as={item.icon}
                                fontSize="28px"
                                color="#F28A7E"
                            />
                        </Flex>

                        <Text fontWeight="700" fontSize="lg" color="#082032" mb={2}>
                            {item.title}
                        </Text>

                        <Text fontSize="sm" color="#555" lineHeight="1.55">
                            {item.desc}
                        </Text>
                    </Flex>
                ))}
            </Grid>
        </Box>
    );
};

export default TempleBlueprintSection;
