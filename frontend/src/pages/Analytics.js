import React from 'react';
import SensorCard from '../components/SensorCard';

const Analytics = () => {
    const sensorData = [
        {
            title: 'Yield Prediction',
            type: 'line',
            data: [
                { name: 'Jan', value: 12 },
                { name: 'Feb', value: 19 },
                { name: 'Mar', value: 3 },
                { name: 'Apr', value: 5 },
                { name: 'May', value: 2 },
                { name: 'Jun', value: 3 }
            ]
        },
        {
            title: 'Pest Incidence',
            type: 'bar',
            data: [
                { name: 'Jan', value: 2 },
                { name: 'Feb', value: 3 },
                { name: 'Mar', value: 4 },
                { name: 'Apr', value: 5 },
                { name: 'May', value: 6 },
                { name: 'Jun', value: 7 }
            ]
        },
        {
            title: 'Water Usage Efficiency',
            type: 'pie',
            data: [
                { name: 'Jan', value: 1 },
                { name: 'Feb', value: 3 },
                { name: 'Mar', value: 5 },
                { name: 'Apr', value: 7 },
                { name: 'May', value: 9 },
                { name: 'Jun', value: 11 }
            ]
        }
    ];

    return (
        <div className="container mx-auto p-4 dark:bg-gray-900 dark:text-gray-100">
            <h1 className="text-2xl font-bold mb-4">Analytics</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sensorData.map((sensor, index) => (
                    <SensorCard key={index} title={sensor.title} data={sensor.data} type={sensor.type} />
                ))}
            </div>
        </div>
    );
};

export default Analytics;
