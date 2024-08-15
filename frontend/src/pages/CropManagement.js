// /pages/CropManagement.js
import React, { useState, useEffect } from 'react';
import { fetchCrops, addCrop, addNote, deleteCrop } from '../api/crops';
import CropCard from '../components/CropCard';
import Modal from '../components/Modal';

const CropManagement = () => {
    const [crops, setCrops] = useState([]);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [validationError, setValidationError] = useState('');
    const [selectedNote, setSelectedNote] = useState(''); // State for selected note from dropdown
    const [newCrop, setNewCrop] = useState({
        name: '',
        plantingDate: '',
        growthStage: '',
        expectedHarvestDate: '',
        notes: [],
    });
    const [imageFile, setImageFile] = useState(null); // State to store the selected image file

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

    // Possible notes for dropdown
    const noteOptions = [
        'Germination',
        'Sowing',
        'Pre-bloom',
        'Irrigation',
        'Fertilization',
        'Pest Control',
        'Weeding',
        'Harvesting',
    ];

    const handleAddCrop = async () => {
        if (!newCrop.name || !newCrop.plantingDate || !newCrop.growthStage || !newCrop.expectedHarvestDate) {
            setValidationError('All fields are required.');
            return;
        }

        try {
            const cropToAdd = {
                ...newCrop,
                notes: newCrop.notes.map(noteText => ({ text: noteText })),
            };

            const addedCrop = await addCrop(cropToAdd, imageFile); // Pass the image file to the API
            setCrops([...crops, addedCrop]);
            setNewCrop({
                name: '',
                plantingDate: '',
                growthStage: '',
                expectedHarvestDate: '',
                notes: [],
            });
            setImageFile(null); // Clear the selected image file
            setValidationError('');
            setIsModalOpen(false);
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleAddNote = async (cropId, noteText) => {
        try {
            const updatedCrop = await addNote(cropId, { text: noteText });
            setCrops(crops.map(crop => crop._id === cropId ? updatedCrop : crop));
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteCrop = async (cropId) => {
        try {
            await deleteCrop(cropId);
            setCrops(crops.filter(crop => crop._id !== cropId));
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    };
    const handleNoteChange = (e) => {
        const note = e.target.value;
        setSelectedNote(note);
        setNewCrop({ ...newCrop, notes: [...newCrop.notes, note] }); // Add the selected note to the notes array
    };
    return (
        <div className="container mx-auto p-4 dark:bg-gray-900 dark:text-gray-100">
            <h1 className="text-3xl font-bold mb-6 text-center">Crop Management</h1>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <div className="flex justify-center mb-6">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="py-2 px-6 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all"
                >
                    Add New Crop
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {crops.map((crop) => (
                    <CropCard key={crop._id} crop={crop} onAddNote={handleAddNote} onDeleteCrop={handleDeleteCrop} />
                ))}
            </div>

            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <h2 className="text-2xl font-bold mb-4">Add a New Crop</h2>
                    {validationError && <p className="text-red-500 mb-4">{validationError}</p>}
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block mb-1 dark:text-gray-200">Crop Name</label>
                            <input
                                type="text"
                                placeholder="Enter crop name"
                                value={newCrop.name}
                                onChange={(e) => setNewCrop({...newCrop, name: e.target.value})}
                                className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 dark:text-gray-200">Planting Date</label>
                            <span className="block text-sm text-gray-500 dark:text-gray-400 mb-1">The day of planting the crop</span>
                            <input
                                type="date"
                                value={newCrop.plantingDate}
                                onChange={(e) => setNewCrop({...newCrop, plantingDate: e.target.value})}
                                className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 dark:text-gray-200">Growth Stage</label>
                            <input
                                type="text"
                                placeholder="Enter growth stage"
                                value={newCrop.growthStage}
                                onChange={(e) => setNewCrop({...newCrop, growthStage: e.target.value})}
                                className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 dark:text-gray-200">Expected Harvest Date</label>
                            <span className="block text-sm text-gray-500 dark:text-gray-400 mb-1">The day of expected harvest of the plant</span>
                            <input
                                type="date"
                                value={newCrop.expectedHarvestDate}
                                onChange={(e) => setNewCrop({...newCrop, expectedHarvestDate: e.target.value})}
                                className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 dark:text-gray-200">Add Note</label>
                            <select
                                value={selectedNote}
                                onChange={handleNoteChange}
                                className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                            >
                                <option value="" disabled>Select a note</option>
                                {noteOptions.map((note, index) => (
                                    <option key={index} value={note}>
                                        {note}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block mb-1 dark:text-gray-200">Upload Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImageFile(e.target.files[0])}
                                className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end mt-6">
                        <button
                            onClick={handleAddCrop}
                            className="py-2 px-6 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition-all"
                        >
                            Save Crop
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default CropManagement;
