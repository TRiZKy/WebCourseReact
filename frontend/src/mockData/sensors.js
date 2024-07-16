const mockSensors = [
  {
    sensorId: 'sensor-1',
    type: 'Soil Moisture',
    location: 'Field 1',
    data: [
      { timestamp: '2024-07-10T08:00:00Z', value: 30 },
      { timestamp: '2024-07-10T09:00:00Z', value: 32 },
      { timestamp: '2024-07-10T10:00:00Z', value: 33 }
    ]
  },
  {
    sensorId: 'sensor-2',
    type: 'Temperature',
    location: 'Field 1',
    data: [
      { timestamp: '2024-07-10T08:00:00Z', value: 25 },
      { timestamp: '2024-07-10T09:00:00Z', value: 26 },
      { timestamp: '2024-07-10T10:00:00Z', value: 27 }
    ]
  }
];

export default mockSensors;
