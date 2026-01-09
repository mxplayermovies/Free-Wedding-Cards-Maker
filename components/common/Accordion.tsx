
import React, { useState } from 'react';
import { ChevronUpIcon } from '@heroicons/react/24/solid';

interface AccordionProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ title, icon, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border rounded-lg overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-3 bg-gray-50 hover:bg-gray-100 focus:outline-none"
            >
                <div className="flex items-center">
                    <span className="w-6 h-6 mr-3 text-gray-500">{icon}</span>
                    <span className="font-semibold text-gray-700">{title}</span>
                </div>
                <ChevronUpIcon className={`w-5 h-5 text-gray-500 transform transition-transform ${isOpen ? '' : 'rotate-180'}`} />
            </button>
            {isOpen && (
                <div className="border-t">
                    {children}
                </div>
            )}
        </div>
    );
};

export default Accordion;
