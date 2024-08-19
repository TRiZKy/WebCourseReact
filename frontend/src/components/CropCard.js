import React, { useState } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

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

/**
 * Component representing a card for displaying crop details, adding notes, and deleting the crop.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.crop - The crop data.
 * @param {string} props.crop._id - The unique identifier of the crop.
 * @param {string} props.crop.name - The name of the crop.
 * @param {string} props.crop.plantingDate - The planting date of the crop.
 * @param {string} props.crop.growthStage - The growth stage of the crop.
 * @param {string} props.crop.expectedHarvestDate - The expected harvest date of the crop.
 * @param {Array<Object>} props.crop.notes - The notes associated with the crop.
 * @param {string} props.crop.notes[].text - The text of a note.
 * @param {Date} props.crop.notes[].date - The date of the note.
 * @param {Object} [props.crop.image] - The image data of the crop.
 * @param {Uint8Array} [props.crop.image.data] - The binary data of the image.
 * @param {Function} props.onAddNote - Callback function to add a note to the crop.
 * @param {Function} props.onDeleteCrop - Callback function to delete the crop.
 * @returns {JSX.Element} The rendered crop card component.
 */
const CropCard = ({ crop, onAddNote, onDeleteCrop }) => {
    const [note, setNote] = useState('');

    /**
     * Handles adding a new note to the crop.
     * If no note is selected, the function returns early.
     */
    const handleAddNote = () => {
        if (!note) return;
        onAddNote(crop._id, note);
        setNote('');
    };

    /**
     * Handles the deletion of the crop.
     * Prompts the user with a confirmation before proceeding with deletion.
     */
    const handleDeleteCrop = () => {
        if (window.confirm('Are you sure you want to delete this crop?')) {
            onDeleteCrop(crop._id);
        }
    };

    return (
        <div className="p-4 border rounded-lg shadow-lg bg-white dark:bg-gray-800 dark:text-gray-100 relative flex flex-col justify-between h-full">
            <div>
                <h2 className="text-xl font-semibold mb-2">{crop.name}</h2>
                <p><strong>Planting Date:</strong> {moment(crop.plantingDate).format('LL')}</p>
                <p><strong>Growth Stage:</strong> {crop.growthStage}</p>
                <p><strong>Expected Harvest Date:</strong> {moment(crop.expectedHarvestDate).format('LL')}</p>
                {crop.image && (
                    <img
                        src={`data:image/png;base64,${btoa(
                            String.fromCharCode(...new Uint8Array(crop.image.data))
                        )}`}
                        alt="Crop"
                        className="mt-4 w-full h-48 object-contain"
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
            </div>
            <div className="mt-4">
                <select
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                >
                    <option value="" disabled>Select a note</option>
                    {noteOptions.map((note, index) => (
                        <option key={index} value={note}>
                            {note}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mt-4 flex justify-between items-center">
                <button
                    onClick={handleAddNote}
                    className="py-2 px-4 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition-all"
                >
                    Add Note
                </button>
                <button
                    onClick={handleDeleteCrop}
                    className="p-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-all"
                >
                    <FontAwesomeIcon icon={faTrashAlt} />
                </button>
            </div>
        </div>
    );
};

export default CropCard;
