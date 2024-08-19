import React, { useState, useEffect } from 'react';
import { fetchCrops, addCrop, addNote, deleteCrop } from '../api/crops';
import CropCard from '../components/CropCard';
import AccordionSection from '../components/AccordionSection';

const CropManagement = () => {
    const [crops, setCrops] = useState([]);
    const [error, setError] = useState(null);
    const [validationError, setValidationError] = useState('');
    const [selectedNote, setSelectedNote] = useState('');
    const [newCrop, setNewCrop] = useState({
        name: '',
        plantingDate: '',
        growthStage: '',
        expectedHarvestDate: '',
        notes: [],
    });
    const [imageFile, setImageFile] = useState(null);

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
        if (!newCrop.name || !newCrop.plantingDate || !newCrop.growthStage || !newCrop.expectedHarvestDate || !selectedNote) {
            setValidationError('All fields are required.');
            return;
        }

        try {
            const cropToAdd = {
                ...newCrop,
                notes: newCrop.notes.map(noteText => ({ text: noteText })),
            };

            const addedCrop = await addCrop(cropToAdd, imageFile);
            setCrops([...crops, addedCrop]);
            setNewCrop({
                name: '',
                plantingDate: '',
                growthStage: '',
                expectedHarvestDate: '',
                notes: [],
            });
            setImageFile(null);
            setValidationError('');
            setSelectedNote('');
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
        setNewCrop({ ...newCrop, notes: [...newCrop.notes, note] });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    const aspectRatio = img.width / img.height;
                    canvas.height = 192;
                    canvas.width = 192 * aspectRatio;
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    canvas.toBlob((blob) => {
                        const resizedFile = new File([blob], file.name, { type: file.type });
                        setImageFile(resizedFile);
                    }, file.type);
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const renderFormContent = () => (
        <>
            {validationError && <p className="text-red-500 mb-4">{validationError}</p>}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-8 lg:grid-cols-2 lg:gap-x-8">
                <div>
                    <label className="block mb-2 dark:text-gray-200">Crop Name</label>
                    <input
                        type="text"
                        placeholder="Enter crop name"
                        value={newCrop.name}
                        onChange={(e) => setNewCrop({ ...newCrop, name: e.target.value })}
                        className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                    />
                </div>

                <div>
                    <label className="block mb-2 dark:text-gray-200">Planting Date</label>
                    <input
                        type="date"
                        value={newCrop.plantingDate}
                        onChange={(e) => setNewCrop({ ...newCrop, plantingDate: e.target.value })}
                        className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                    />
                </div>

                <div>
                    <label className="block mb-2 dark:text-gray-200">Growth Stage</label>
                    <input
                        type="text"
                        placeholder="Enter growth stage"
                        value={newCrop.growthStage}
                        onChange={(e) => setNewCrop({ ...newCrop, growthStage: e.target.value })}
                        className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                    />
                </div>

                <div>
                    <label className="block mb-2 dark:text-gray-200">Expected Harvest Date</label>
                    <input
                        type="date"
                        value={newCrop.expectedHarvestDate}
                        onChange={(e) => setNewCrop({ ...newCrop, expectedHarvestDate: e.target.value })}
                        className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                    />
                </div>

                <div>
                    <label className="block mb-2 dark:text-gray-200">Add Note</label>
                    <select
                        value={selectedNote}
                        onChange={handleNoteChange}
                        className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
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
                    <label className="block mb-2 dark:text-gray-200">Upload Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                    />
                </div>
            </div>
            <div className="flex justify-end mt-8">
                <button
                    onClick={handleAddCrop}
                    className="py-3 px-8 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-transform transform hover:scale-105"
                >
                    Save Crop
                </button>
            </div>
        </>
    );

    return (
        <div className="container mx-auto p-6 h-full dark:bg-gray-900 dark:text-gray-100">
            <h1 className="text-4xl font-extrabold text-center mb-8">Crop Management</h1>
            {error && <p className="text-red-600 text-center mb-6">{error}</p>}

            <div className="mb-8">
                <AccordionSection title="Add a New Crop">
                    {renderFormContent()}
                </AccordionSection>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {crops.map((crop) => (
                    <CropCard key={crop._id} crop={crop} onAddNote={handleAddNote} onDeleteCrop={handleDeleteCrop} />
                ))}
            </div>
        </div>
    );
};

export default CropManagement;
