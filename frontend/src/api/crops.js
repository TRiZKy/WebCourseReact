// /api/crops.js
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
