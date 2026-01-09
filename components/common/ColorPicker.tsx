
import React from 'react';

interface ColorPickerProps {
    color: string;
    onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
    return (
        <div className="relative mt-1">
            <input
                type="color"
                value={color}
                onChange={(e) => onChange(e.target.value)}
                className="absolute w-full h-full opacity-0 cursor-pointer"
            />
            <div className="w-full h-10 border border-gray-300 rounded-md flex items-center px-2" style={{ backgroundColor: color }}>
                <span className="text-sm" style={{ color: isDark(color) ? '#FFF' : '#000' }}>
                    {color.toUpperCase()}
                </span>
            </div>
        </div>
    );
};

// Helper function to determine if a color is dark
function isDark(color: string): boolean {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.5;
}

export default ColorPicker;
