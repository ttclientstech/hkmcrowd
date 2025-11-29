import { Box, Text, Image, Grid, Flex } from "@chakra-ui/react";
import t1 from "../../assets/images/t1.jpeg";
import t2 from "../../assets/images/t2.jpg";

const testimonials = [
    {
        name: "Srinivasan V",
        role: "Head -Field Quality - Nissan Motor India (P) Ltd",
        photo: t1,
        message:
            "Seeing the dedication of the team and the transparency in how each contribution is utilized gave me complete confidence. Supporting this project has brought me deep inner satisfaction and a sense of meaningful service. I feel blessed to play a small part in a mission that uplifts individuals and strengthens spiritual values in society.",
    },
    {
        name: "Aneesh M",
        role: "Senior Software Engineer - Citi Bank",
        photo: t2,
        message:
            "As a working professional, I look for credibility before giving. This project stands out for its clarity, intent, and the positive impact it is already creating.",
    },
];

const TestimonialSection = () => {
    return (
        <Box
            w="100%"
            maxW="1200px"
            mx="auto"
            mt={16}
            px={[4, 6]}
            fontFamily="'Poppins', sans-serif"
        >
            {/* TOP TITLE */}
            <Flex justify="center" mb={3}>
                <Text
                    fontSize="sm"
                    fontWeight="700"
                    bg="#FCECE8"
                    px={6}
                    py={2}
                    borderRadius="full"
                    color="#444"
                    letterSpacing="2px"
                >
                    TESTIMONIALS
                </Text>
            </Flex>

            {/* SUB HEADING */}
            <Text
                fontSize={["2xl", "3xl"]}
                fontWeight="800"
                color="#f48b87"
                textAlign="center"
                mb={10}
                lineHeight="1.3"
            >
                5,000+ Devotees have already <br />
                supported this divine mission
            </Text>

            {/* GRID - 1 per row mobile, 2 tablet, 3 desktop */}
            <Grid
                templateColumns={[
                    "1fr",          // mobile
                    "1fr 1fr",      // tablet
                    "1fr 1fr 1fr"   // desktop
                ]}
                gap={8}
            >
                {testimonials.map((t, i) => (
                    <Box
                        key={i}
                        bg="#0D0D0D"
                        color="white"
                        p={6}
                        borderRadius="20px"
                        boxShadow="0 6px 25px rgba(0,0,0,0.25)"
                    >
                        {/* Top User Row */}
                        <Flex align="center" mb={4}>
                            <Image
                                src={t.photo}
                                w="50px"
                                h="50px"
                                borderRadius="full"
                                objectFit="cover"
                                mr={4}
                            />
                            <Box>
                                <Text fontWeight="700" fontSize="lg">
                                    {t.name}
                                </Text>
                                <Text fontSize="sm" color="#B8A9F8">
                                    {t.role}
                                </Text>
                            </Box>
                        </Flex>

                        {/* Message */}
                        <Text
                            fontSize="sm"
                            lineHeight="1.6"
                            color="#E5E5E5"
                        >
                            {t.message}
                        </Text>
                    </Box>
                ))}
            </Grid>
        </Box>
    );
};

export default TestimonialSection;