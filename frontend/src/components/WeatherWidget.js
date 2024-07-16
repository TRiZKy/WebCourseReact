import React, { useState, useEffect } from 'react';
import { fetchWeatherData } from '../api/weather';

const WeatherWidget = ({ latitude, longitude }) => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getWeather = async () => {
            try {
                const data = await fetchWeatherData(latitude, longitude);
                setWeather(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        getWeather();
    }, [latitude, longitude]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 m-4 bg-white dark:bg-gray-800">
            <h2 className="font-bold text-xl mb-2 dark:text-gray-200">Weather in {weather.location.name}</h2>
            <p className="text-gray-700 dark:text-gray-300">Temperature: {weather.current.temp_c} °C</p>
            <p className="text-gray-700 dark:text-gray-300">Condition: {weather.current.condition.text}</p>
            <img src={weather.current.condition.icon} alt="weather icon" />
        </div>
    );
};

export default WeatherWidget;
