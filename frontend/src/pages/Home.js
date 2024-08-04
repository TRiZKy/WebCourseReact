import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const handleGetStartedClick = () => {
        if (currentUser) {
            navigate('/');
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="relative h-full bg-cover bg-center" style={{ backgroundImage: `url('/agriculture.webp')` }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
                <h1 className="text-5xl font-bold mb-4">Welcome to AgriPlatform</h1>
                <p className="text-xl mb-6">Monitor and manage your fields with ease.</p>
                <button
                    onClick={handleGetStartedClick}
                    className="py-3 px-6 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-all"
                >
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default Home;
