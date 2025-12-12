import React from "react";
import { Flex, Image } from "@chakra-ui/react";
import templeLogo from "../../assets/images/transparent_logo.png";

const Navbar = ({ campaignerName, campaignerImage }) => (
    <Flex
        justify="space-between"
        align="center"
        px={[4, 8]}
        py={4}
        // ✅ UPDATED STYLES START
        bg="rgba(2, 12, 27, 0.6)"       // Semi-transparent deep navy
        backdropFilter="blur(10px)"     // Frosted glass effect
        borderBottom="1px solid rgba(255, 255, 255, 0.05)" // Subtle light border for dark mode
        boxShadow="none"                // Removed shadow for a cleaner integration
        // ✅ UPDATED STYLES END
    >
        <Image src={templeLogo} alt="Temple Logo" height="40px" width="85px"/>

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