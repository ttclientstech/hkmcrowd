import React from "react";
import { Flex, Image } from "@chakra-ui/react";
import templeLogo from "../../assets/images/transparent_logo.png";

const Navbar = ({ campaignerName, campaignerImage }) => (
    <Flex
        justify="space-between"
        align="center"
        px={[4, 8]}
        py={4}
        bg="white"
        borderBottom="1px solid rgba(0,0,0,0.08)"
        boxShadow="sm"
    >
        <Image src={templeLogo} alt="Temple Logo" boxSize="65px" />

        <Image
            src={campaignerImage}
            alt={campaignerName}
            boxSize="60px"
            borderRadius="full"
            border="2px solid #FFD45E"
            objectFit="cover"
        />
    </Flex>
);

export default Navbar;
