// /components/CropCard.js
import React, { useState } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const CropCard = ({ crop, onAddNote, onDeleteCrop }) => {
    const [note, setNote] = useState('');

    const handleAddNote = () => {
        if (!note) return;
        onAddNote(crop._id, note);
        setNote('');
    };

    const handleDeleteCrop = () => {
        if (window.confirm('Are you sure you want to delete this crop?')) {
            onDeleteCrop(crop._id);
        }
    };

    return (
        <div className="p-4 border rounded-lg shadow-lg bg-white dark:bg-gray-800 dark:text-gray-100 relative">
            <h2 className="text-xl font-semibold mb-2">{crop.name}</h2>
            <p><strong>Planting Date:</strong> {moment(crop.plantingDate).format('LL')}</p>
            <p><strong>Growth Stage:</strong> {crop.growthStage}</p>
            <p><strong>Expected Harvest Date:</strong> {moment(crop.expectedHarvestDate).format('LL')}</p>
            {crop.image && (
                <img
                    src={`data:image/png;base64,${btoa(
                        String.fromCharCode(...new Uint8Array(crop.image.data))
                    )}`} // Convert the binary data to a Base64 string
                    alt="Crop"
                    className="mt-4 w-full h-48 object-cover"
                />
            )}
            <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Notes Timeline</h3>
                <div className="space-y-4">
                    {crop.notes.map((note, index) => (
                        <div key={index} className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                                    {moment(note.date).format('D')}
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    {moment(note.date).format('MMMM YYYY')}
                                </div>
                                <div className="text-sm text-gray-700 dark:text-gray-200">
                                    {note.text}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-2">
                <textarea
                    placeholder="Add a note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                />
                <button
                    onClick={handleAddNote}
                    className="mt-2 py-2 px-4 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition-all"
                >
                    Add Note
                </button>
            </div>
            <button
                onClick={handleDeleteCrop}
                className="absolute bottom-4 right-4 p-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-all"
            >
                <FontAwesomeIcon icon={faTrashAlt} />
            </button>
        </div>
    );
};

export default CropCard;
