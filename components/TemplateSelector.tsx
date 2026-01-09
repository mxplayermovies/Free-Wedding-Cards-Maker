
import React, { useState } from 'react';
import { Template } from '../constants';

interface TemplateSelectorProps {
    templates: Template[];
    selectedTemplate: Template;
    onSelect: (template: Template) => void;
}

const INITIAL_VISIBLE_COUNT = 8;

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ templates, selectedTemplate, onSelect }) => {
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

    const showMoreTemplates = () => {
        setVisibleCount(templates.length);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-playfair font-bold text-gray-700 mb-4">Choose a Template</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {templates.slice(0, visibleCount).map(template => (
                    <div
                        key={template.id}
                        onClick={() => onSelect(template)}
                        className={`cursor-pointer group rounded-lg overflow-hidden border-4 transition-all duration-200 ${
                            selectedTemplate.id === template.id ? 'border-rose-500 shadow-xl' : 'border-transparent hover:border-rose-300'
                        }`}
                    >
                        <img
                            src={template.thumbnail}
                            alt={template.name}
                            className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-300"
                        />
                        <p className="text-center bg-gray-50 py-2 text-sm text-gray-700 font-medium group-hover:bg-rose-50 transition-colors">{template.name}</p>
                    </div>
                ))}
            </div>
            {visibleCount < templates.length && (
                <div className="text-center mt-6">
                    <button
                        onClick={showMoreTemplates}
                        className="px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors"
                    >
                        Load More Templates
                    </button>
                </div>
            )}
        </div>
    );
};

export default TemplateSelector;
