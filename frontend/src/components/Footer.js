import React from 'react';

/**
 * A functional component that renders the footer for the AgriPlatform application.
 * The footer includes the current year and a copyright message.
 *
 * @component
 * @returns {JSX.Element} A React component that displays the footer with dynamic year and branding.
 */
const Footer = () => {
    return (
        <footer className="bg-green-600 dark:bg-gray-800 p-4">
            <div className="container mx-auto text-center text-white dark:text-gray-200">
                &copy; {new Date().getFullYear()} AgriPlatform. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
