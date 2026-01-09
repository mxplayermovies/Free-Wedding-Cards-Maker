
import React, { useState } from 'react';
import { BookmarkSquareIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface SaveModalProps {
    onClose: () => void;
    onSave: (name: string) => void;
}

const SaveModal: React.FC<SaveModalProps> = ({ onClose, onSave }) => {
    const [name, setName] = useState('');

    const handleSave = () => {
        if (name.trim()) {
            onSave(name.trim());
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
                <button 
                    onClick={onClose} 
                    className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600"
                    aria-label="Close"
                >
                    <XMarkIcon className="w-6 h-6" />
                </button>
                <div className="text-center">
                    <BookmarkSquareIcon className="w-12 h-12 mx-auto text-indigo-500" />
                    <h3 className="text-xl font-bold font-playfair mt-4 text-gray-800">Name Your Creation</h3>
                    <p className="text-gray-600 mt-2 text-sm">
                        Give your design a name so you can easily identify it.
                    </p>
                </div>
                <div className="mt-6">
                    <label htmlFor="creation-name" className="block text-sm font-medium text-gray-700 mb-1">
                        Creation Name
                    </label>
                    <input
                        type="text"
                        id="creation-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input-control w-full"
                        placeholder="e.g., John & Jane's Invite"
                        autoFocus
                    />
                </div>
                <div className="mt-6 flex gap-3">
                    <button onClick={onClose} className="btn btn-secondary w-full">
                        Cancel
                    </button>
                    <button 
                        onClick={handleSave} 
                        className="btn btn-action-secondary w-full"
                        disabled={!name.trim()}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SaveModal;
