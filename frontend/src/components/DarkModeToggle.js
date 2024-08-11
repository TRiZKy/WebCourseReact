import React, { useContext } from 'react';
import DarkModeToggle from 'react-dark-mode-toggle';
import { ThemeContext } from '../context/ThemeContext';

/**
 * A component that renders a toggle switch for switching between dark mode and light mode.
 * The toggle state is managed using the `ThemeContext`.
 *
 * @component
 * @returns {JSX.Element} A React component that renders a dark mode toggle switch.
 */
const DarkModeToggleComponent = () => {
    const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);

    return (
        <DarkModeToggle
            onChange={setIsDarkMode}
            checked={isDarkMode}
            size={80}
        />
    );
};

export default DarkModeToggleComponent;
