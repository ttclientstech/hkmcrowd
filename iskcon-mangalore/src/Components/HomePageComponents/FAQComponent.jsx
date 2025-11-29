// src/Components/HomePageComponents/FAQComponent.jsx

import React, { useState } from "react";
import {
    Box,
    Text,
    Flex,
    IconButton,
    Collapse,
    Divider,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

const faqData = [
    {
        question: "What is the purpose of the Dakshina Dwaraka Dham project?",
        answer:
            "The project aims to build a grand spiritual and cultural complex in Chennai dedicated to Lord Sri Krishna.",
    },
    {
        question: "How does my donation help?",
        answer:
            "Every donation contributes directly to the construction of the temple and spreading spiritual values.",
    },
    {
        question: "Do I receive any spiritual benefits?",
        answer:
            "Supporting temple construction is considered one of the highest spiritual services according to scriptures.",
    },
    {
        question: "Will I get 80G tax exemption?",
        answer:
            "Yes, eligible donations receive 80G tax exemption as per government regulations.",
    },
    {
        question: "Can I donate on behalf of someone else?",
        answer:
            "Yes, you can offer your donation in the name of your family, ancestors, or loved ones.",
    },
    {
        question: "Will I receive updates about the construction?",
        answer:
            "Yes, regular progress updates and milestone reports will be shared with all donors.",
    },
    {
        question: "Is there a minimum donation amount?",
        answer:
            "Donations start from ₹5001 per square feet, but supporters may contribute any amount above the minimum.",
    },
    {
        question: "Can international donors contribute?",
        answer:
            "Yes, donors from across the world are welcome to contribute to this sacred project.",
    },
];

const FAQComponent = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const [showAll, setShowAll] = useState(false);

    const displayedFaqs = showAll ? faqData : faqData.slice(0, 4);

    const toggleQuestion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <Box w="100%" maxW="900px" mx="auto" mt={16} px={[4, 6]}>

            {/* Title */}
            <Text
                textAlign="center"
                fontSize={["2xl", "3xl"]}
                fontWeight="800"
                mb={8}
                fontFamily="'Poppins', sans-serif"
            >
                Frequently Asked Questions
            </Text>

            {/* FAQ List */}
            {displayedFaqs.map((item, index) => (
                <Box
                    key={index}
                    bg="#F7F7F7"
                    borderRadius="10px"
                    mb={4}
                    px={6}
                    py={4}
                    boxShadow="sm"
                >
                    <Flex justify="space-between" align="center">
                        <Text
                            fontSize="md"
                            fontWeight="600"
                            color="#222"
                            fontFamily="'Poppins', sans-serif"
                        >
                            {item.question}
                        </Text>

                        <IconButton
                            icon={
                                openIndex === index ? <MinusIcon /> : <AddIcon />
                            }
                            size="sm"
                            variant="ghost"
                            onClick={() => toggleQuestion(index)}
                        />
                    </Flex>

                    {/* Answer section */}
                    <Collapse in={openIndex === index} animateOpacity>
                        <Divider my={3} />
                        <Text
                            fontSize="sm"
                            color="#444"
                            lineHeight="1.6"
                            fontFamily="'Poppins', sans-serif"
                            pb={2}
                        >
                            {item.answer}
                        </Text>
                    </Collapse>
                </Box>
            ))}

            {/* Show More / Show Less */}
            <Flex justify="center" mt={4}>
                <Text
                    fontSize="md"
                    fontWeight="600"
                    color="#5eb0ff"
                    cursor="pointer"
                    onClick={() => setShowAll(!showAll)}
                    fontFamily="'Poppins', sans-serif"
                >
                    {showAll ? "Show Less" : "Show More"}
                </Text>
            </Flex>
        </Box>
    );
};

export default FAQComponent;
