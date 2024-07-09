import React from 'react';
import { Link } from 'react-router-dom';
import BurgerMenu from './BurgerMenu';
import DarkModeToggleComponent from './DarkModeToggle';

const Navbar = () => {
    return (
        <nav className="bg-green-600 dark:bg-gray-800 p-4 relative">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-xl font-bold dark:text-gray-200">AgriPlatform</Link>
                <div className="hidden md:flex space-x-4 items-center">
                    <Link to="/dashboard" className="text-white dark:text-gray-200">Dashboard</Link>
                    <Link to="/analytics" className="text-white dark:text-gray-200">Analytics</Link>
                    <Link to="/sensors" className="text-white dark:text-gray-200">Sensors</Link>
                    <DarkModeToggleComponent />
                </div>
                <div className="md:hidden flex items-center">
                    <BurgerMenu />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
