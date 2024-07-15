import mockSensors from '../mockData/sensors';

export const fetchSensorData = async () => {
  // Simulate a network request
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockSensors);
    }, 500);
  });
};
