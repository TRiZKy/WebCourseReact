import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import DarkModeToggleComponent from './DarkModeToggle';
import './BurgerMenu.css';

const BurgerMenu = () => {
    return (
        <Menu right>
            <Link to="/" className="menu-item">Home</Link>
            <Link to="/dashboard" className="menu-item">Dashboard</Link>
            <Link to="/analytics" className="menu-item">Analytics</Link>
            <Link to="/sensors" className="menu-item">Sensors</Link>
            <div className="menu-item">
                <DarkModeToggleComponent />
            </div>
        </Menu>
    );
};

export default BurgerMenu;
