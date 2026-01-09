
import React from 'react';
import { CardSize } from '../constants';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';

interface SizeSelectorProps {
    sizes: CardSize[];
    selectedSize: CardSize;
    onSelect: (size: CardSize) => void;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({ sizes, selectedSize, onSelect }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="flex items-center text-2xl font-playfair font-bold text-gray-700 mb-4">
                <ArrowsRightLeftIcon className="w-7 h-7 mr-3 text-gray-500"/>
                Select Card Size
            </h2>
            <div className="flex flex-wrap gap-3">
                {sizes.map(size => (
                    <button
                        key={size.name}
                        onClick={() => onSelect(size)}
                        className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                            selectedSize.width === size.width && selectedSize.height === size.height 
                                ? 'bg-rose-600 text-white border-rose-600 shadow-md' 
                                : 'bg-white text-gray-700 border-gray-300 hover:border-rose-400 hover:text-rose-500'
                        }`}
                    >
                        <span className="font-semibold">{size.name}</span>
                        {size.description && <span className="text-sm ml-2 opacity-80">({size.description})</span>}
                    </button>
                ))}
            </div>
             <p className="text-sm text-gray-500 mt-3">Choose the final dimensions for your invitation. The design will automatically adapt.</p>
        </div>
    );
};

export default SizeSelector;
