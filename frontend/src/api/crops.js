import { auth } from '../firebase';

const API_URL = window.location.hostname.includes('localhost')
    ? 'http://localhost:7458/api'
    : process.env.REACT_APP_API_URL;

/**
 * Retrieves the authentication token of the current user.
 * @returns {Promise<string|null>} The authentication token or null if the user is not authenticated.
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
 * Fetches the list of crops from the API.
 * @returns {Promise<Object[]>} The list of crops.
 * @throws {Error} If the request fails.
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
 * Adds a new crop to the API.
 * @param {Object} crop - The crop data to add.
 * @param {string} crop.name - The name of the crop.
 * @param {string} crop.plantingDate - The planting date of the crop.
 * @param {string} crop.growthStage - The growth stage of the crop.
 * @param {string} crop.expectedHarvestDate - The expected harvest date of the crop.
 * @param {Object[]} crop.notes - The notes associated with the crop.
 * @param {string} crop.notes[].text - The text of a note.
 * @param {File} [imageFile] - The image file of the crop.
 * @returns {Promise<Object>} The added crop data.
 * @throws {Error} If the request fails.
 */
export const addCrop = async (crop, imageFile) => {
  const token = await getAuthToken();

  const formData = new FormData();
  formData.append('name', crop.name);
  formData.append('plantingDate', crop.plantingDate);
  formData.append('growthStage', crop.growthStage);
  formData.append('expectedHarvestDate', crop.expectedHarvestDate);
  crop.notes.forEach((note, index) => {
    formData.append(`notes[${index}][text]`, note.text);
  });

  if (imageFile) {
    formData.append('image', imageFile);
  }

  const response = await fetch(`${API_URL}/crops`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Failed to add crop: ${errorMessage}`);
  }

  const data = await response.json();
  return data;
};

/**
 * Adds a new note to a specific crop.
 * @param {string} cropId - The ID of the crop.
 * @param {Object} note - The note data to add.
 * @param {string} note.text - The text of the note.
 * @returns {Promise<Object>} The added note data.
 * @throws {Error} If the user is not authenticated or the request fails.
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
 * Deletes a specific crop from the API.
 * @param {string} cropId - The ID of the crop to delete.
 * @returns {Promise<void>} Resolves if the crop is deleted successfully.
 * @throws {Error} If the user is not authenticated or the request fails.
 */
export const deleteCrop = async (cropId) => {
  const token = await getAuthToken();

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