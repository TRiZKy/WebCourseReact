import React, { useState, useEffect } from 'react';
import { fetchSensors, saveUserPreferences, getUserPreferences } from '../api/sensors';

const SensorSelection = () => {
    const [sensors, setSensors] = useState([]);
    const [selectedSensors, setSelectedSensors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const sensors = await fetchSensors();
            setSensors(sensors);
            const userPreferences = await getUserPreferences();
            setSelectedSensors(userPreferences);
        };
        fetchData();
    }, []);

    const handleSelectionChange = (sensorId) => {
        if (selectedSensors.includes(sensorId)) {
            setSelectedSensors(selectedSensors.filter(id => id !== sensorId));
        } else {
            setSelectedSensors([...selectedSensors, sensorId]);
        }
    };

    const handleSave = async () => {
        await saveUserPreferences(selectedSensors);
        alert('Preferences saved!');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Select Sensors</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sensors.map(sensor => (
                    <div key={sensor._id} className="p-4 border rounded">
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedSensors.includes(sensor._id)}
                                onChange={() => handleSelectionChange(sensor._id)}
                            />
                            {sensor.name}
                        </label>
                    </div>
                ))}
            </div>
            <button onClick={handleSave} className="mt-4 py-2 px-4 bg-blue-500 text-white rounded">Save Preferences</button>
        </div>
    );
};

export default SensorSelection;
