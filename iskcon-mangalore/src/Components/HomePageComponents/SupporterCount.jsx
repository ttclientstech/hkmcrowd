import React, { useState, useEffect, useRef } from "react";
import { Text } from "@chakra-ui/react";

const SupporterCount = () => {
    const [count, setCount] = useState(0);
    const finalValue = 5000; // Your real supporter count
    const ref = useRef(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);

                    let start = 0;
                    const duration = 1500; // 1.5 seconds
                    const stepTime = 10;
                    const increment = finalValue / (duration / stepTime);

                    const counter = setInterval(() => {
                        start += increment;
                        if (start >= finalValue) {
                            setCount(finalValue);
                            clearInterval(counter);
                        } else {
                            setCount(Math.floor(start));
                        }
                    }, stepTime);
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [hasAnimated, finalValue]);

    return (
        <Text
            ref={ref}
            fontSize="1.1em"
            fontWeight="800"
            color="#5eb0ff"
            textAlign="center"
            mb={10}
            lineHeight="1.3"
        >
            <Text as="span" color="#f48b87">{count.toLocaleString()}+ Supporters</Text> have already <br />
            contributed to this divine mission
        </Text>
    );
};

export default SupporterCount;