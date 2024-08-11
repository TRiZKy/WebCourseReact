import { auth } from '../firebase';

const API_URL = window.location.hostname.includes('localhost')
    ? 'http://localhost:7458/api'
    : process.env.REACT_APP_API_URL;

/**
 * Retrieves the current user's authentication token.
 *
 * @returns {Promise<string|null>} A promise that resolves to the authentication token if the user is signed in, or null if the user is not authenticated.
 */
const getAuthToken = async () => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    return token;
  }
  return null;
};

/**
 * Fetches a list of sensors from the API.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of sensor objects.
 */
export const fetchSensors = async () => {
  const response = await fetch(`${API_URL}/sensors`);
  const data = await response.json();
  return data;
};

/**
 * Fetches data for specific sensors from the API.
 *
 * @param {Array<string>} sensorIds - An array of sensor IDs to fetch data for.
 * @returns {Promise<Array>} A promise that resolves to an array of sensor data objects.
 */
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

/**
 * Retrieves the user's sensor preferences from the API.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of user preferences, or an empty array if no preferences are set.
 */
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

/**
 * Saves the user's selected sensor preferences to the API.
 *
 * @param {Array<string>} selectedSensors - An array of sensor IDs representing the user's selected preferences.
 * @returns {Promise<Object>} A promise that resolves to the response data from the API.
 */
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
