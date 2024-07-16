import React, { useState, useEffect } from 'react';
import { fetchCrops } from '../api/crops';
import CropCard from '../components/CropCard';

const CropManagement = () => {
  const [crops, setCrops] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCrops = async () => {
      try {
        const data = await fetchCrops();
        setCrops(data);
      } catch (err) {
        setError(err.message);
      }
    };
    getCrops();
  }, []);

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-4">Crop Management</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {crops.map((crop) => (
          <CropCard key={crop.id} crop={crop} />
        ))}
      </div>
    </div>
  );
};

export default CropManagement;
