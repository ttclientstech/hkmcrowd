// src/Components/HomePageComponents/FAQComponent.jsx

import React, { useState } from "react";
import {
    Box,
    Text,
    Flex,
    Collapse,
    Divider,
    IconButton,
} from "@chakra-ui/react";
import { FaPlus, FaMinus } from "react-icons/fa";

// FAQ DATA
const faqData = [
    {
        question: "What is the goal of this campaign?",
        answer:
            "The goal of the current campaign is to raise donations for Dakshina Dwaraka Dham-Cultural Complex construction in Thiruvanmiyur, Chennai.",
    },
    {
        question: "How does my donation help?",
        answer:
            "Every donation contributes directly to the construction of the temple and spreading spiritual values.",
    },
    {
        question: "When will I receive Prasadam?",
        answer:
            "You can expect to receive prasadam within a maximum of one month of your donation. Please note that prasadam will only be sent to donors inside India.",
    },
    {
        question: "Will I get 80G tax exemption?",
        answer:
            "Yes, all donations will receive 80G tax exemption as per government regulations.",
    },
    {
        question: "Who is the inspiration behind this project?",
        answer:
            "Srila Prabhupada, Founder-Acarya of Worldwide Hare Krishna Movement, is the inspiration behind this project. He once told:\n" +
            "\n" +
            "\"This is Krishna-Conscious vision: Oh! there are so many skyscrapers. Why not construct a nice skyscraper temple for Krishna? This is Krishna Consciousness.\"\n" +
            "\n" +
            "This project was conceived following the above instruction.",
    },
    {
        question: "Where is Dakshina Dwaraka Dham-Cultural Complex located in Chennai?",
        answer:
            "Thiruvanmiyur, Chennai. Full Address :  Hare Krishna Movement , 63, 1st Seaward Rd, Valmiki Nagar, Thiruvanmiyur, Chennai, Tamil Nadu 600041",
    },
    {
        question: "Is there a minimum donation amount?",
        answer:
            "Rs 500.",
    },
    {
        question: "When will construction will get completed?",
        answer:
            "If we get the required donation, full phase construction expected to complete on 2026",
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
            {/* TITLE */}
            <Text
                textAlign="center"
                fontSize={["xl", "2xl"]}
                fontWeight="500"
                mb={8}
                color="#082032"
                fontFamily="'Poppins', sans-serif"
            >
                Frequently Asked <Text as="span" color="#E63946">Questions</Text>
            </Text>

            {/* FAQ LIST */}
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

                        {/* ICON BUTTON USING react-icons */}
                        <IconButton
                            icon={
                                openIndex === index ? (
                                    <FaMinus size={14} />
                                ) : (
                                    <FaPlus size={14} />
                                )
                            }
                            size="sm"
                            variant="ghost"
                            onClick={() => toggleQuestion(index)}
                            aria-label="Toggle FAQ"
                        />
                    </Flex>

                    {/* ANSWER */}
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

            {/* SHOW MORE / LESS */}
            <Flex justify="center" mt={4}>
                <Text
                    fontSize="md"
                    fontWeight="600"
                    color="#082032"
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