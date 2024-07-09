import React, { useContext } from 'react';
import DarkModeToggle from 'react-dark-mode-toggle';
import { ThemeContext } from '../context/ThemeContext';

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
