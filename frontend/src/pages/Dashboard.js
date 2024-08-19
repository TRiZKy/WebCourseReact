import React, { useState, useEffect } from 'react';
import { fetchSensorData, getUserPreferences } from '../api/sensors';
import SensorCard from '../components/SensorCard';
import useDarkMode from '../hooks/useDarkMode';
import { HashLoader } from "react-spinners";
import { fetchCrops } from "../api/crops";

/**
 * Dashboard component for displaying sensor data and crop selection.
 *
 * @component
 * @returns {JSX.Element} The rendered Dashboard component.
 */
const Dashboard = () => {
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState({}); // Per-sensor time range
  const [crops, setCrops] = useState([]); // State to store fetched crops
  const [selectedCrop, setSelectedCrop] = useState(''); // State for selected crop
  const isDarkMode = useDarkMode();

  /**
   * Fetches user preferences and sensor data, as well as crop data on component mount.
   * Initializes the time range for each sensor.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userPreferences = await getUserPreferences();
        const sensorIds = userPreferences.map(sensor => sensor._id);
        const data = await fetchSensorData(sensorIds);
        setSensorData(data);

        // Fetch crops data
        const cropsData = await fetchCrops();
        setCrops(cropsData);

        // Initialize timeRange with default values for each sensor
        const initialTimeRange = {};
        data.forEach(sensor => {
          initialTimeRange[sensor._id] = '6h'; // Default time range
        });
        setTimeRange(initialTimeRange);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /**
   * Handles the change of time range for a specific sensor.
   *
   * @param {string} sensorId - The ID of the sensor whose time range is being changed.
   * @param {Object} event - The event object representing the change in time range.
   */
  const handleTimeRangeChange = (sensorId, event) => {
    setTimeRange({
      ...timeRange,
      [sensorId]: event.target.value,
    });
  };

  /**
   * Handles the change of selected crop.
   *
   * @param {Object} event - The event object representing the change in selected crop.
   */
  const handleCropChange = (event) => {
    setSelectedCrop(event.target.value);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  /**
   * Filters sensor data by the selected time range.
   *
   * @param {Object} sensor - The sensor data to filter.
   * @param {string} range - The selected time range.
   * @returns {Array<Object>} The filtered sensor data.
   */
  const filterDataByTimeRange = (sensor, range) => {
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

    return sensor.readings.filter(reading => new Date(reading.time).getTime() >= startTime);
  };

  if (loading) {
    return (
        <div className="flex items-center justify-center h-full">
          <HashLoader color={isDarkMode ? "#ffffff" : "#0bae12"} size={200} />
        </div>
    );
  }

  if (error) {
    return (
        <div className="flex items-center justify-center h-full text-red-600">
          <p>Error: {error}</p>
        </div>
    );
  }

  return (
      <div className="container mx-auto p-6 h-full">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-900 dark:text-white">Dashboard</h1>

        {/* Crop Selection */}
        <div className="flex justify-center mb-6">
          <label htmlFor="cropSelect" className="mr-2 font-medium text-gray-900 dark:text-gray-200 content-center">Select Crop:</label>
          <select
              id="cropSelect"
              value={selectedCrop}
              onChange={handleCropChange}
              className="p-2 border rounded-lg bg-white text-black dark:bg-gray-800 dark:text-white"
          >
            <option value="">Select a crop</option>
            {crops.map(crop => (
                <option key={crop._id} value={crop._id}>
                  {crop.name}
                </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {sensorData.length > 0 && selectedCrop && crops.length > 0 ? (
              sensorData.map(sensor => (
                  <div key={sensor._id} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4"
                       style={{flex: "1 0 400px"}}>
                    <div className="m-4">
                      <label htmlFor={`timeRange-${sensor._id}`}
                             className="block mb-2 font-medium text-gray-900 dark:text-gray-200">Time Range:</label>
                      <select
                          id={`timeRange-${sensor._id}`}
                          value={timeRange[sensor._id]}
                          onChange={e => handleTimeRangeChange(sensor._id, e)}
                          className="p-2 border rounded-lg w-full bg-white text-black dark:bg-gray-700 dark:text-white"
                      >
                        <option value="6h">Last 6 Hours</option>
                        <option value="12h">Last 12 Hours</option>
                        <option value="day">Last 24 Hours</option>
                        <option value="week">Last 7 Days</option>
                        <option value="month">Last 30 Days</option>
                      </select>
                    </div>

                    <SensorCard
                        title={`${sensor.name}: ${crops.find(crop => crop._id === selectedCrop)?.name || 'No Crop Selected'}`}
                        data={filterDataByTimeRange(sensor, timeRange[sensor._id])}
                        xLabel={sensor.xLabel}
                        yLabel={sensor.yLabel}
                        type="line"
                    />
                  </div>
              ))
          ) : (
              <div className="flex-grow text-center font-semibold text-lg text-gray-900 dark:text-gray-200">
                {crops.length === 0 ? "Please Add Crops to be shown" : sensorData.length === 0 ? "Please Select Sensors to be shown" : "Please Select a Crop to be shown"}
              </div>
          )}
        </div>
      </div>
  );
};

export default Dashboard;
