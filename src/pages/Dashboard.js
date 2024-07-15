import React, { useState, useEffect } from 'react';
import { fetchSensorData } from '../api/sensors';
import { getCurrentLocation } from '../api/geolocation';
import SensorCard from '../components/SensorCard';
import WeatherWidget from '../components/WeatherWidget';

const Dashboard = () => {
  const [sensors, setSensors] = useState([]);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchSensorData();
        setSensors(data);
      } catch (err) {
        setError(err.message);
      }
    };
    getData();

    const fetchLocation = async () => {
      try {
        const loc = await getCurrentLocation();
        setLocation(loc);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchLocation();
  }, []);

  return (
      <div className="container mx-auto p-4 dark:bg-gray-900 dark:text-gray-100">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {location && <WeatherWidget latitude={location.latitude} longitude={location.longitude} />}
          {sensors.map((sensor) => (
              <SensorCard
                  key={sensor.sensorId}
                  title={`${sensor.type} (${sensor.location})`}
                  data={sensor.data.map(({ timestamp, value }) => ({
                    name: new Date(timestamp).toLocaleTimeString(),
                    value
                  }))}
                  type="line"
              />
          ))}
        </div>
      </div>
  );
};

export default Dashboard;
