import mockCrops from '../mockData/crops';

let crops = [...mockCrops];

export const fetchCrops = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(crops);
    }, 500);
  });
};

export const addCrop = async (crop) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      crops.push(crop);
      resolve(crop);
    }, 500);
  });
};

export const addNote = async (cropId, note) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const crop = crops.find(c => c.id === cropId);
      if (crop) {
        crop.notes.push(note);
      }
      resolve(note);
    }, 500);
  });
};
