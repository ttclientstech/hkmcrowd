import React, { useState } from "react";
import { Box, Input, List, ListItem } from "@chakra-ui/react";

const AutoSuggestInput = ({ label, value, onChange, suggestions }) => {
    const [filtered, setFiltered] = useState([]);
    const [show, setShow] = useState(false);

    const handleInput = (e) => {
        const val = e.target.value;
        onChange(e);

        if (val.length === 0) {
            setFiltered([]);
            setShow(false);
            return;
        }

        const match = suggestions.filter((s) =>
            s.toLowerCase().startsWith(val.toLowerCase())
        );

        setFiltered(match);
        setShow(true);
    };

    const handleSelect = (selected) => {
        onChange({ target: { name: label.toLowerCase(), value: selected } });
        setFiltered([]);
        setShow(false);
    };

    return (
        <Box position="relative" w="100%">
            <Input
                name={label.toLowerCase()}
                placeholder={label}
                value={value}
                onChange={handleInput}
                border="1px solid #CCC"
            />

            {show && filtered.length > 0 && (
                <List
                    position="absolute"
                    bg="white"
                    zIndex={10}
                    w="100%"
                    border="1px solid #DDD"
                    borderRadius="5px"
                    maxH="150px"
                    overflowY="auto"
                >
                    {filtered.map((item) => (
                        <ListItem
                            key={item}
                            px={3}
                            py={2}
                            cursor="pointer"
                            _hover={{ background: "#f0f0f0" }}
                            onClick={() => handleSelect(item)}
                        >
                            {item}
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
};

export default AutoSuggestInput;
