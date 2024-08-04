import { auth } from '../firebase';

const API_URL = window.location.hostname.includes('localhost')
    ? 'http://localhost:7458/api'
    : process.env.REACT_APP_API_URL;
const getAuthToken = async () => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    return token;
  }
  return null;
};

export const fetchSensors = async () => {
  const response = await fetch(`${API_URL}/sensors`);
  const data = await response.json();
  return data;
};

export const fetchSensorData = async (sensorIds) => {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}/sensors/data`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ sensorIds }),
  });
  const data = await response.json();
  return data;
};

export const getUserPreferences = async () => {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}/sensors/user/preferences`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return Array.isArray(data) ? data : [];
};

export const saveUserPreferences = async (selectedSensors) => {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}/sensors/user/preferences`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ selectedSensors }),
  });
  const data = await response.json();
  return data;
};
