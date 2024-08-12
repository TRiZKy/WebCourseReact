import { auth } from '../firebase';

const API_URL = window.location.hostname.includes('localhost')
    ? 'http://localhost:7458/api'
    : process.env.REACT_APP_API_URL;

/**
 * Retrieves the authentication token for the current user.
 *
 * @async
 * @function getAuthToken
 * @returns {Promise<string|null>} The authentication token if the user is logged in, otherwise `null`.
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
 * Fetches the crops associated with the authenticated user from the backend.
 *
 * @async
 * @function fetchCrops
 * @returns {Promise<Array>} A promise that resolves to an array of crops.
 * @throws Will throw an error if the request fails.
 */
export const fetchCrops = async () => {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}/crops`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch crops');
  }

  const data = await response.json();
  return data;
};

/**
 * Adds a new crop to the backend for the authenticated user.
 *
 * @async
 * @function addCrop
 * @param {Object} crop - The crop object to add.
 * @param {string} crop.name - The name of the crop.
 * @param {string} crop.plantingDate - The planting date of the crop.
 * @param {string} crop.growthStage - The current growth stage of the crop.
 * @param {string} crop.expectedHarvestDate - The expected harvest date of the crop.
 * @param {Array} crop.notes - An array of notes associated with the crop.
 * @returns {Promise<Object>} A promise that resolves to the added crop.
 * @throws Will throw an error if the request fails.
 */
export const addCrop = async (crop) => {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}/crops`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(crop),
  });

  if (!response.ok) {
    const errorMessage = await response.text();  // Capture the error message
    throw new Error(`Failed to add crop: ${errorMessage}`);
  }

  const data = await response.json();
  return data;
};

/**
 * Adds a note to a specific crop in the backend for the authenticated user.
 *
 * @async
 * @function addNote
 * @param {string} cropId - The ID of the crop to which the note will be added.
 * @param {Object} note - The note object to add.
 * @param {string} note.text - The text of the note.
 * @returns {Promise<Object>} A promise that resolves to the updated crop with the added note.
 * @throws Will throw an error if the request fails or if the user is not authenticated.
 */
export const addNote = async (cropId, note) => {
  const token = await getAuthToken();

  if (!token) {
    throw new Error('User not authenticated');
  }

  const response = await fetch(`${API_URL}/crops/${cropId}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(note),
  });

  if (!response.ok) {
    throw new Error('Failed to add note');
  }

  return await response.json();
};
/**
 * Delete a crop from the backend.
 *
 * @param {string} cropId - The ID of the crop to be deleted.
 * @returns {Promise<void>} A promise that resolves when the crop is deleted.
 * @throws Will throw an error if the request fails.
 */
export const deleteCrop = async (cropId) => {
  const token = await getAuthToken();  // Get the token

  if (!token) {
    throw new Error('User not authenticated');
  }

  const response = await fetch(`${API_URL}/crops/${cropId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete crop');
  }
};