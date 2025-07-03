import { Box, HStack, Image, VStack, Text, useColorMode } from '@chakra-ui/react';
import React from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

import Banner from "../../assets/images/mandir_nirman_seva_banner.jpeg";

import { IskconGradientLight, IskconFontColor, IskconGradientDark } from '../utils';

const DetailPageHeader = ({ themeColor, getSingleUser, image16 }) => {
  const { colorMode } = useColorMode();
  // const bgGradient = colorMode === 'light' ? 'linear(to-r, teal.500, green.500)' : 'linear(to-r, teal.200, green.200)';
  const bgGradient = colorMode === 'light' ? IskconGradientLight : IskconGradientDark;

  return (
    <>
    <Box
      w={"100%"}
      bgGradient={bgGradient}
      bg={'#d582f0'}
      py={"2rem"}
      px={["1.5rem", "2rem", "3rem"]}
    >
      <Box w={"100%"} maxW={"1200px"} mx={"auto"} color={'#444444'}>
        <Text
          fontWeight={"bold"}
          fontSize={["1.2rem", "1.5rem", "2rem"]}
          w={["99%", "85%", "70%"]}
          maxW={"650px"}
          lineHeight={"2.2rem"}
        >
          {getSingleUser?.campaignDetails?.campaignName}'S CAMPAIGN TO BUILD A
          MAGNIFICENT SRI RADHA KRISHNA TEMPLE AND CULTURAL COMPLEX IN
          HUBLI-DHARWAD, KARNATAKA.
        </Text>
        <VStack alignItems={"flex-start"} gap={"1rem"} mt={"1rem"} >
          <HStack>
            <Box>
              <FaLocationDot />
            </Box>
            <Text>Hubli-Dharwad, Karnataka, India</Text>
          </HStack>


          <Link to={'/'}>
            <HStack>
              <Box
                w={"80px"}
                h={"80px"}
                overflow={"hidden"}
                borderRadius={"50%"}
                border={"2px solid white"}
              >
                <Image
                  h={"100%"}
                  w={"100%"}
                  objectFit={"cover"}
                  src={image16}
                />
              </Box>
              <VStack alignItems={"flex-start"} gap={"2px"}>
                <Text fontWeight={"bold"}>ISKCON HUBLI-DHARWAD</Text>
                <Text fontWeight={"bold"} color={"#83009D"} fontStyle={"italic"}>Go to Homepage</Text>
              </VStack>
            </HStack>
          </Link>


        </VStack>
      </Box>
    </Box>
    
    <Image
      src={Banner}
    />
    </>
  );
};

export default DetailPageHeader;
