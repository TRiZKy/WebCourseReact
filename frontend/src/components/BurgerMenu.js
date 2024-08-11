import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import DarkModeToggleComponent from './DarkModeToggle';
import './BurgerMenu.css';
import { useAuth } from "../context/AuthContext";

/**
 * A component that renders a burger menu for navigation.
 * The menu includes links to various sections of the application,
 * a dark mode toggle, and a login/logout option based on user authentication status.
 *
 * @component
 * @example
 * return (
 *   <BurgerMenu />
 * )
 */
const BurgerMenu = () => {
    const { currentUser, logout } = useAuth();

    /**
     * Handles the user logout process.
     *
     * @async
     * @function
     * @returns {Promise<void>}
     */
    const handleLogout = async () => {
        try {
            await logout();
        } catch {
            console.log("Failed to log out");
        }
    };

    return (
        <Menu right>
            <Link to="/home" className="menu-item">Home</Link>
            <Link to="/" className="menu-item">Dashboard</Link>
            <Link to="/analytics" className="menu-item">Analytics</Link>
            <Link to="/sensors" className="menu-item">Sensors</Link>
            <Link to="/crops" className="menu-item">Crops</Link>
            <Link to="/sensor-selection" className="menu-item">Sensor Selection</Link>
            {currentUser ? (
                <button onClick={handleLogout} className="menu-item">
                    Logout
                </button>
            ) : (
                <Link to="/login" className="menu-item">Login</Link>
            )}
            <div className="menu-item">
                <DarkModeToggleComponent />
            </div>
        </Menu>
    );
};

export default BurgerMenu;
