import React, { useState, useEffect } from 'react';
import { fetchSensorData, getUserPreferences } from '../api/sensors';
import SensorCard from '../components/SensorCard';
import useDarkMode from '../hooks/useDarkMode';
import { HashLoader } from "react-spinners";
import {fetchCrops} from "../api/crops";

const Dashboard = () => {
  const [sensorData, setSensorData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('6h'); // Default time range
  const [crops, setCrops] = useState([]); // State to store fetched crops
  const [selectedCrop, setSelectedCrop] = useState(''); // State for selected crop
  const isDarkMode = useDarkMode();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userPreferences = await getUserPreferences();
        const sensorIds = userPreferences.map(sensor => sensor._id);
        const data = await fetchSensorData(sensorIds);
        setSensorData(data);
        setFilteredData(filterDataByTimeRange(data, timeRange));

        // Fetch crops data
        const cropsData = await fetchCrops();
        setCrops(cropsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredData(filterDataByTimeRange(sensorData, timeRange));
  }, [timeRange, sensorData]);

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };

  const handleCropChange = (event) => {
    setSelectedCrop(event.target.value);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const filterDataByTimeRange = (data, range) => {
    const now = Date.now();
    let startTime;

    switch (range) {
      case '6h':
        startTime = now - 6 * 60 * 60 * 1000; // Last 6 hours
        break;
      case '12h':
        startTime = now - 12 * 60 * 60 * 1000; // Last 12 hours
        break;
      case 'day':
        startTime = now - 24 * 60 * 60 * 1000; // Last 24 hours
        break;
      case 'week':
        startTime = now - 7 * 24 * 60 * 60 * 1000; // Last 7 days
        break;
      case 'month':
        startTime = now - 30 * 24 * 60 * 60 * 1000; // Last 30 days
        break;
      default:
        startTime = now - 6 * 60 * 60 * 1000;
    }

    return data.map(sensor => ({
      ...sensor,
      readings: sensor.readings.filter(reading => new Date(reading.time).getTime() >= startTime)
    }));
  };

  if (loading) {
    return (
        <div className="flex items-center justify-center h-full">
          <HashLoader color="#0bae12" size={200} />
        </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        <div className="mb-4">
          <label htmlFor="timeRange" className="mr-2 dark:text-gray-200">Time Range:</label>
          <select
              id="timeRange"
              value={timeRange}
              onChange={handleTimeRangeChange}
              className={`p-2 border rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
          >
            <option value="6h">Last 6 Hours</option>
            <option value="12h">Last 12 Hours</option>
            <option value="day">Last 24 Hours</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
          </select>
        </div>

        {/* Add a select tag for crop selection */}
        <div className="mb-4">
          <label htmlFor="cropSelect" className="mr-2 dark:text-gray-200">Select Crop:</label>
          <select
              id="cropSelect"
              value={selectedCrop}
              onChange={handleCropChange}
              className={`p-2 border rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
          >
            <option value="">Select a crop</option>
            {crops.map(crop => (
                <option key={crop._id} value={crop._id}>
                  {crop.name}
                </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(filteredData && filteredData.length && selectedCrop && crops.length > 0)   ? (
              filteredData.map((sensor) => (
                  <SensorCard
                      key={sensor._id}
                      title={sensor.name +': '+ crops.find(crop => crop._id === selectedCrop)?.name || 'No Crop Selected'}
                      data={sensor.readings}
                      xLabel={sensor.xLabel}
                      yLabel={sensor.yLabel}
                      type="line"
                  />
              ))
          ) : (filteredData.length === 0) ? (
              <div>Please Select Sensors to be shown</div>
          ) : (crops.length === 0) ?
              <div>Please Add Crops to be shown</div> : (
              <div>Please Select a Crop to be shown</div>
          )}
        </div>
      </div>
  );
};

export default Dashboard;
