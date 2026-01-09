
import React from 'react';
import { LanguagePreset } from '../constants';
import { LanguageIcon } from '@heroicons/react/24/outline';

interface LanguageSelectorProps {
    languages: LanguagePreset[];
    onSelect: (language: LanguagePreset) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ languages, onSelect }) => {
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLanguage = languages.find(lang => lang.code === event.target.value);
        if (selectedLanguage) {
            onSelect(selectedLanguage);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-xl">
            <label htmlFor="language-select" className="flex items-center text-2xl font-playfair font-bold text-gray-700 mb-4">
                 <LanguageIcon className="w-7 h-7 mr-3 text-gray-500"/>
                 Set Starting Language & Text
            </label>
            <select
                id="language-select"
                onChange={handleSelectChange}
                className="block w-full max-w-md pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm rounded-md"
            >
                {languages.map(lang => (
                    <option key={lang.code} value={lang.code}>
                        {lang.name}
                    </option>
                ))}
            </select>
            <p className="text-sm text-gray-500 mt-2 max-w-md">Select a language to populate the card with sample text and a recommended font to get you started.</p>
        </div>
    );
};

export default LanguageSelector;
