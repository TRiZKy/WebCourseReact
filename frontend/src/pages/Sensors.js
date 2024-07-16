import React from 'react';
import SensorCard from '../components/SensorCard';

const Sensors = () => {
    const sensorData = [
        {
            title: 'Soil pH',
            type: 'line',
            data: [
                { name: 'Jan', value: 6.5 },
                { name: 'Feb', value: 6.7 },
                { name: 'Mar', value: 6.8 },
                { name: 'Apr', value: 7.0 },
                { name: 'May', value: 7.2 }
            ]
        },
        {
            title: 'Light Intensity',
            type: 'bar',
            data: [
                { name: 'Jan', value: 300 },
                { name: 'Feb', value: 400 },
                { name: 'Mar', value: 500 },
                { name: 'Apr', value: 600 },
                { name: 'May', value: 700 }
            ]
        },
        {
            title: 'Air Quality',
            type: 'pie',
            data: [
                { name: 'Jan', value: 50 },
                { name: 'Feb', value: 55 },
                { name: 'Mar', value: 53 },
                { name: 'Apr', value: 52 },
                { name: 'May', value: 60 }
            ]
        }
    ];

    return (
        <div className="container mx-auto p-4 dark:bg-gray-900 dark:text-gray-100">
            <h1 className="text-2xl font-bold mb-4">Sensors</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sensorData.map((sensor, index) => (
                    <SensorCard key={index} title={sensor.title} data={sensor.data} type={sensor.type} />
                ))}
            </div>
        </div>
    );
};

export default Sensors;
