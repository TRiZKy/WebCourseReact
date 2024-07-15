import React from 'react';
import { Link } from 'react-router-dom';
import BurgerMenu from './BurgerMenu';
import DarkModeToggleComponent from './DarkModeToggle';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      console.log("Failed to log out");
    }
  };

  return (
    <nav className="bg-green-600 dark:bg-gray-800 p-4 relative">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/home" className="text-white text-xl font-bold dark:text-gray-200">AgriPlatform</Link>
        <div className="hidden md:flex space-x-4 items-center">
          <Link to="/" className="text-white dark:text-gray-200">Dashboard</Link>
          <Link to="/analytics" className="text-white dark:text-gray-200">Analytics</Link>
          <Link to="/sensors" className="text-white dark:text-gray-200">Sensors</Link>
          <Link to="/crops" className="text-white dark:text-gray-200">Crops</Link>
          <DarkModeToggleComponent />
          {currentUser ? (
            <button onClick={handleLogout} className="text-white dark:text-gray-200">
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-white dark:text-gray-200">Login</Link>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <BurgerMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
