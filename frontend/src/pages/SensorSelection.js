import React, { useState, useEffect } from 'react';
import { fetchSensors, saveUserPreferences } from '../api/sensors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons';
import { faSave } from '@fortawesome/free-solid-svg-icons';

const SensorSelection = () => {
    const [sensors, setSensors] = useState([]);
    const [selectedSensors, setSelectedSensors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const sensorsData = await fetchSensors();
            setSensors(sensorsData);
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
            <h1 className="text-3xl font-bold text-center mb-6">Select Sensors</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sensors.map(sensor => (
                    <div key={sensor._id} className="p-6 border rounded-lg shadow-md bg-white dark:bg-gray-800">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedSensors.includes(sensor._id)}
                                onChange={() => handleSelectionChange(sensor._id)}
                                className="hidden"
                            />
                            <FontAwesomeIcon
                                icon={selectedSensors.includes(sensor._id) ? faCheckCircle : faCircle}
                                className={`mr-2 text-2xl ${selectedSensors.includes(sensor._id) ? 'text-blue-500' : 'text-gray-400'}`}
                            />
                            <span className="text-lg dark:text-gray-200">{sensor.name}</span>
                        </label>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-6">
                <button
                    onClick={handleSave}
                    className="flex items-center py-3 px-6 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-all"
                >
                    <FontAwesomeIcon icon={faSave} className="mr-2" />
                    Save Preferences
                </button>
            </div>
        </div>
    );
};

export default SensorSelection;
