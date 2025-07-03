import { Flex, Image, Box, Text, useColorModeValue } from "@chakra-ui/react";
import logo from "../../assets/images/newlogo.png";

import { IskconFontColor, IskconBgColor, banner } from "../utils.jsx";

const HeadingBanner = () => {
    // const bgColor = '#54956e';
    // const textColor = useColorModeValue("white", "gray.200");
    const bgColor = '#d582f0';  //'#f4c430'; //'#f4c430';
    const textColor = '#444444'; //useColorModeValue("#444444", "gray.200")

    return (
        <>
        <Flex
            maxW="1200px"
            justifyContent='space-between'
            align="center"
            bg={bgColor}
            h={["150px", "160px", "180px"]}
            direction="row"
            p='0px'
            px={'20px'}
            boxShadow="lg"
        >
            <Image
                src={logo}
                alt="Left Banner"
                boxSize={["100px", "120px", "140px"]}
                width={["150px", "170px", "190px"]}
                border="2px"
                _hover={{ transform: "scale(1.1)", transition: "0.3s" }}
            />
            <Box
                width={'4px'}
                height={["100px", "120px", "140px"]}
                bg="black"
                marginRight="10px"
                marginLeft="10px"
            />
            <Box textAlign="left" flex="1" >
                <Text fontSize={["xs", "sm", "lg"]} fontWeight="bold" color={textColor} >
                    CONCERNED DEVOTEES OF LORD SHRI KRISHNA COMING TOGETHER TO BUILD NORTH KARNATAKA'S BIGGEST MAGNIFICENT SRI RADHA KRISHNA TEMPLE AND CULTURAL COMPLEX
                </Text>
            </Box>
            
        </Flex>
        <Box display={"block"} marginBottom='5px' maxW="1200px" w="100%" mt="-1px" mb="8px" textAlign={"end"}>
            <Text fontSize={["xs", "sm", "lg"]} color={textColor} bg={bgColor}>
                <i>If you build a temple of Krishna, you will be liberated. <span>&nbsp;&nbsp;</span><br/><b>- Srila Prabhupada </b><span>&nbsp;&nbsp;</span></i>
            </Text>
        </Box>
       
        </>
    );
};

export default HeadingBanner;
