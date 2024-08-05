import mockCrops from '../mockData/crops';

let crops = [...mockCrops];

export const fetchCrops = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...crops]); // Ensure immutability
    }, 500);
  });
};

export const addCrop = async (crop) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      crops = [...crops, crop]; // Ensure immutability
      resolve(crop);
    }, 500);
  });
};

export const addNote = async (cropId, note) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      crops = crops.map(crop => {
        if (crop.id === cropId) {
          return { ...crop, notes: [...crop.notes, note] }; // Ensure immutability
        }
        return crop;
      });
      resolve(note);
    }, 500);
  });
};
