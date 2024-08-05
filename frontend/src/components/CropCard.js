import React, { useState, useRef } from 'react';
import { addNote } from '../api/crops';

const CropCard = ({ crop }) => {
    const [noteText, setNoteText] = useState('');
    const [notes, setNotes] = useState([...crop.notes]); // Ensure immutability by spreading crop.notes
    const isAddingNote = useRef(false);

    const handleAddNote = async () => {
        if (isAddingNote.current) return;
        if (noteText.trim()) {
            isAddingNote.current = true;
            const newNote = { id: `note-${notes.length + 1}`, date: new Date().toISOString().split('T')[0], text: noteText };
            await addNote(crop.id, newNote);
            setNotes((prevNotes) => {
                const updatedNotes = [...prevNotes, newNote];
                return updatedNotes;
            });
            setNoteText('');
            isAddingNote.current = false;
        }
    };

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 m-4 bg-white dark:bg-gray-800">
            <div className="font-bold text-xl mb-2 dark:text-gray-200">{crop.name}</div>
            <p className="text-gray-700 dark:text-gray-300">Planting Date: {crop.plantingDate}</p>
            <p className="text-gray-700 dark:text-gray-300">Growth Stage: {crop.growthStage}</p>
            <p className="text-gray-700 dark:text-gray-300">Expected Harvest Date: {crop.expectedHarvestDate}</p>
            <div className="mt-4">
                <h3 className="font-bold dark:text-gray-200">Notes</h3>
                <ul className="list-disc pl-5">
                    {notes.map((note) => (
                        <li key={note.id} className="text-gray-700 dark:text-gray-300">{note.date}: {note.text}</li>
                    ))}
                </ul>
                <div className="mt-2">
                    <input
                        type="text"
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        placeholder="Add a note"
                        className="w-full px-2 py-1 border border-gray-300 rounded-md"
                    />
                    <button
                        onClick={handleAddNote}
                        className="mt-2 w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                        Add Note
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CropCard;
