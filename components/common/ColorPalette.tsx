
import React from 'react';
import { ColorPalette as Palette } from '../../constants';

interface ColorPaletteProps {
    palettes: Palette[];
    onColorSelect: (color: string) => void;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ palettes, onColorSelect }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Color Palettes</label>
            <div className="space-y-3">
                {palettes.map(palette => (
                    <div key={palette.name}>
                        <p className="text-xs text-gray-500 mb-1">{palette.name}</p>
                        <div className="flex items-center space-x-2">
                            {palette.colors.map(color => (
                                <button
                                    key={color}
                                    title={color}
                                    onClick={() => onColorSelect(color)}
                                    className="w-6 h-6 rounded-full border border-gray-300 shadow-sm transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ColorPalette;
