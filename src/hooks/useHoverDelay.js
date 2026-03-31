import { useState, useRef, useEffect } from 'react';

export const useHoverDelay = (delay = 500) => {
    const [isHovered, setIsHovered] = useState(false);
    const timeoutRef = useRef(null);

    const onMouseEnter = () => {
        timeoutRef.current = setTimeout(() => {
            setIsHovered(true);
        }, delay);
    };

    const onMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsHovered(false);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return { isHovered, onMouseEnter, onMouseLeave };
};
