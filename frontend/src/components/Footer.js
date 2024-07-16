import React from 'react';

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
