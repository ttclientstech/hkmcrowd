import React from "react";
import { Flex, Image } from "@chakra-ui/react";
import templeLogo from "../../assets/images/transparent_logo.png";

const Navbar = ({ campaignerName, campaignerImage }) => (
    <Flex
        justify="space-between"
        align="center"
        px={[4, 8]}
        py={3}
        bg="rgba(255,255,255,0.05)"
        borderBottom="1px solid rgba(255,255,255,0.1)"
    >
        <Image src={templeLogo} alt="Temple Logo" boxSize="60px" />
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
