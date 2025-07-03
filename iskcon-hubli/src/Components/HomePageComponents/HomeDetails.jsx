import { Box, Table, Tbody, Td, Tr, VStack, Text, Link } from "@chakra-ui/react";
import React from "react";
import cor from '../../assets/pdfFiles/CertificateofRegistration.pdf';
import csr from '../../assets/pdfFiles/ISKCON_CSR.pdf';
import g from '../../assets/pdfFiles/80G.pdf';

const HomeDetails = () => {
  return (
    <Box
      w={"100%"}
      display={"flex"}
      mt={"2rem"}
      gap={"1.5rem"}
      flexDirection={["column", "column", "column", "row"]}
      p={5}
      bg={"gray.50"}
      borderRadius={"md"}
      boxShadow={"md"}
    >
      <VStack
        w={'100%'}
        alignItems={"flex-start"}
        p={5}
        border={"1px solid"}
        borderColor={"gray.200"}
        borderRadius={"md"}
        bg={"white"}
      >
        <Text textAlign={"left"} fontSize={"2xl"} fontWeight={"bold"} mb={4}>
          ORGANIZATION DETAILS
        </Text>
        <Table w={"100%"}>
          <Tbody>
            <Tr>
              <Td fontWeight={"bold"}>Address:</Td>
              <Td>
                ISKCON Sri Sri Krishna Balarama Temple, Hubballi-Dharwad Road,
                Rayapur, Dharwad 580009, Karnataka, India
              </Td>
            </Tr>
            <Tr>
              <Td fontWeight={"bold"}>Location:</Td>
              <Td>Hubli-Dharwad, Karnataka, India</Td>
            </Tr>
            <Tr>
              <Td fontWeight={"bold"}>About the org:</Td>
              <Td>
                The International Society for Krishna Consciousness, abbreviated
                as ISKCON, known colloquially as the Movement of Hare Krishna,
                is a Gaudiya Vaishnava Hindu religious organization.
              </Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">Certificates:</Td>
              <Td>
                <VStack alignItems={'flex-start'} spacing={2}>
                  <Link href={cor} target="_blank" rel="noopener noreferrer" color="blue.500" textDecoration="underline">
                    Certificate of Registration
                  </Link>
                  <Link href={csr} target="_blank" rel="noopener noreferrer" color="blue.500" textDecoration="underline">
                    ISKCON CSR
                  </Link>
                  <Link href={g} target="_blank" rel="noopener noreferrer" color="blue.500" textDecoration="underline">
                    80G Certificate
                  </Link>
                </VStack>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </VStack>
    </Box>
  );
};

export default HomeDetails;
