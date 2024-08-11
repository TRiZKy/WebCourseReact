import { useEffect, useState } from 'react';

/**
 * Custom hook that monitors and returns the current theme mode (dark or light).
 *
 * This hook checks if the document's root element (`<html>`) has the 'dark' class, indicating dark mode.
 * It also sets up a MutationObserver to listen for changes to the 'class' attribute on the root element,
 * updating the state whenever the theme changes.
 *
 * @returns {boolean} `true` if dark mode is enabled, `false` otherwise.
 */
const useDarkMode = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains('dark'));

    useEffect(() => {
        const handleThemeChange = () => {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
        };

        const observer = new MutationObserver(handleThemeChange);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    return isDarkMode;
};

export default useDarkMode;
