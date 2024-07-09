import React, { useState, useEffect } from 'react';
import { fetchWeatherData } from '../api/weather';
import { getCurrentLocation } from '../api/geolocation';
import SensorCard from '../components/SensorCard';

const Dashboard = () => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getWeather = async () => {
            try {
                const { latitude, longitude } = await getCurrentLocation();
                const data = await fetchWeatherData(latitude, longitude);
                setWeather(data);
            } catch (err) {
                setError(err.message);
            }
        };
        getWeather();
    }, []);

    const sensorData = [
        {
            title: 'Soil Moisture',
            type: 'line',
            data: [
                { name: 'Jan', value: 10 },
                { name: 'Feb', value: 20 },
                { name: 'Mar', value: 30 },
                { name: 'Apr', value: 40 },
                { name: 'May', value: 50 }
            ]
        },
        {
            title: 'Temperature',
            type: 'line',
            data: [
                { name: 'Jan', value: 15 },
                { name: 'Feb', value: 25 },
                { name: 'Mar', value: 35 },
                { name: 'Apr', value: 45 },
                { name: 'May', value: 55 }
            ]
        },
        {
            title: 'Humidity',
            type: 'line',
            data: [
                { name: 'Jan', value: 55 },
                { name: 'Feb', value: 45 },
                { name: 'Mar', value: 35 },
                { name: 'Apr', value: 25 },
                { name: 'May', value: 15 }
            ]
        }
    ];

    return (
        <div className="container mx-auto p-4 dark:bg-gray-900 dark:text-gray-100">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            {error && <p className="text-red-500">{error}</p>}
            {weather ? (
                <div className="mb-4">
                    <h2 className="text-xl">Current Temperature: {weather.current.temp_c}°C</h2>
                    <p>Condition: {weather.current.condition.text}</p>
                </div>
            ) : (
                <p>Loading weather data...</p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sensorData.map((sensor, index) => (
                    <SensorCard key={index} title={sensor.title} data={sensor.data} type={sensor.type} />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
