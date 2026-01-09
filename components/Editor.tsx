
import React, { useMemo } from 'react';
import { TextElement, FontOption, COLOR_PALETTES } from '../constants';
import ColorPicker from './common/ColorPicker';
import { PaintBrushIcon, PlusIcon, TrashIcon, ArrowPathIcon, CloudArrowDownIcon, BookmarkSquareIcon, SparklesIcon, Bars3BottomLeftIcon, Bars3Icon, Bars3BottomRightIcon, Bars3BottomLeftIcon as AlignLeftIcon } from '@heroicons/react/24/outline';
import Accordion from './common/Accordion';
import ColorPalette from './common/ColorPalette';

interface EditorProps {
    fonts: FontOption[];
    activeElement: TextElement | null;
    onUpdate: (id: string, updates: Partial<TextElement>) => void;
    onAdd: (text?: string) => void;
    onDelete: (id: string) => void;
    onReset: () => void;
    onDownload: () => void;
    onSave: () => void;
}

const Editor: React.FC<EditorProps> = ({ fonts, activeElement, onUpdate, onAdd, onDelete, onReset, onDownload, onSave }) => {
    const fontCategories = useMemo(() => {
        const categoryOrder: FontOption['category'][] = ['Elegant Scripts', 'Classic Serif', 'Modern Sans-Serif', 'Global & European', 'Devanagari (Hindi, Marathi)', 'South Asian Scripts', 'Arabic (Urdu)', 'East Asian Scripts'];
        const grouped = fonts.reduce((acc, font) => {
            (acc[font.category] = acc[font.category] || []).push(font);
            return acc;
        }, {} as Record<string, FontOption[]>);

        return categoryOrder.reduce((acc, category) => {
            if (grouped[category]) {
                acc[category] = grouped[category];
            }
            return acc;
        }, {} as Record<string, FontOption[]>);
    }, [fonts]);
    
    if (!activeElement) {
        return (
            <div className="space-y-6">
                <div className="text-center p-8 border-2 border-dashed rounded-lg">
                    <PaintBrushIcon className="w-12 h-12 mx-auto text-gray-300" />
                    <p className="mt-4 text-gray-500">Select text on the preview to edit, or add a new one.</p>
                    <button onClick={() => onAdd()} className="mt-4 btn btn-action-secondary">
                        <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                        Add New Text Layer
                    </button>
                </div>
                <ActionButtons onReset={onReset} onDownload={onDownload} onSave={onSave} />
            </div>
        );
    }
    
    const handleUpdate = (updates: Partial<TextElement>) => {
        onUpdate(activeElement.id, updates);
    };

    const handleGradientUpdate = (index: 0 | 1, color: string) => {
        const newColors: [string, string] = [...(activeElement.gradientColors || [activeElement.color, '#ffffff'])];
        newColors[index] = color;
        handleUpdate({ gradientColors: newColors, color: newColors[0] });
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-playfair font-bold text-gray-700 border-b pb-2">Customization Panel</h2>

            <Accordion title="Basic Styling" icon={<PaintBrushIcon />} defaultOpen>
                <div className="space-y-4 p-4">
                    {/* Text Content */}
                    <ControlWrapper label="Text Content">
                        <textarea
                            id="text-content"
                            rows={3}
                            className="input-control"
                            value={activeElement.text}
                            onChange={(e) => handleUpdate({ text: e.target.value })}
                        />
                    </ControlWrapper>
                    
                    {/* Font Family */}
                    <ControlWrapper label="Font Family">
                        <select
                            id="font-family"
                            value={activeElement.fontFamily}
                            onChange={(e) => handleUpdate({ fontFamily: e.target.value })}
                            className="input-control"
                        >
                            {Object.entries(fontCategories).map(([category, fontsInCategory]) => (
                                <optgroup label={category} key={category}>
                                    {fontsInCategory.map(font => (
                                        <option key={font.name} value={font.name} className={font.className}>
                                            {font.name}
                                        </option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                    </ControlWrapper>

                    {/* Font Size & Color */}
                    <div className="grid grid-cols-2 gap-4">
                        <ControlWrapper label="Font Size">
                            <input
                                type="number"
                                min="8"
                                max="300"
                                className="input-control"
                                value={activeElement.fontSize}
                                onChange={(e) => handleUpdate({ fontSize: parseInt(e.target.value, 10) || 12 })}
                            />
                        </ControlWrapper>
                        <ControlWrapper label="Color">
                            <ColorPicker color={activeElement.color} onChange={(color) => handleUpdate({ color, gradientColors: undefined })} />
                        </ControlWrapper>
                    </div>

                    <ColorPalette palettes={COLOR_PALETTES} onColorSelect={(color) => handleUpdate({ color, gradientColors: undefined })} />

                     {/* Styling & Alignment */}
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center space-x-2">
                             <span className="text-sm font-medium text-gray-700">Style:</span>
                            <button onClick={() => handleUpdate({ bold: !activeElement.bold })} className={`btn-toggle font-bold ${activeElement.bold ? 'btn-toggle-active' : 'btn-toggle-inactive'}`}>B</button>
                            <button onClick={() => handleUpdate({ italic: !activeElement.italic })} className={`btn-toggle italic ${activeElement.italic ? 'btn-toggle-active' : 'btn-toggle-inactive'}`}>I</button>
                        </div>
                         <div className="flex items-center space-x-1">
                             <span className="text-sm font-medium text-gray-700">Align:</span>
                            <button onClick={() => handleUpdate({ textAlign: 'left' })} className={`btn-toggle ${activeElement.textAlign === 'left' ? 'btn-toggle-active' : 'btn-toggle-inactive'}`}><AlignLeftIcon className="w-5 h-5" /></button>
                            <button onClick={() => handleUpdate({ textAlign: 'center' })} className={`btn-toggle ${activeElement.textAlign === 'center' ? 'btn-toggle-active' : 'btn-toggle-inactive'}`}><Bars3Icon className="w-5 h-5" /></button>
                            <button onClick={() => handleUpdate({ textAlign: 'right' })} className={`btn-toggle ${activeElement.textAlign === 'right' ? 'btn-toggle-active' : 'btn-toggle-inactive'}`}><Bars3BottomRightIcon className="w-5 h-5" /></button>
                        </div>
                    </div>
                </div>
            </Accordion>
            
            <Accordion title="Advanced Effects" icon={<SparklesIcon />}>
                <div className="space-y-4 p-4">
                    {/* Shadow */}
                    <ControlWrapper label="Shadow">
                         <div className="p-3 bg-gray-50 rounded-lg space-y-3">
                            <div className="grid grid-cols-2 gap-4">
                               <ColorPicker color={activeElement.shadowColor || '#000000'} onChange={(c) => handleUpdate({ shadowColor: c })} />
                               <RangeSlider label="Blur" value={activeElement.shadowBlur || 0} min={0} max={50} onChange={(v) => handleUpdate({ shadowBlur: v })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                               <RangeSlider label="Offset X" value={activeElement.shadowOffsetX || 0} min={-50} max={50} onChange={(v) => handleUpdate({ shadowOffsetX: v })} />
                               <RangeSlider label="Offset Y" value={activeElement.shadowOffsetY || 0} min={-50} max={50} onChange={(v) => handleUpdate({ shadowOffsetY: v })} />
                            </div>
                        </div>
                    </ControlWrapper>
                    {/* Outline */}
                    <ControlWrapper label="Outline">
                         <div className="p-3 bg-gray-50 rounded-lg space-y-3">
                            <div className="grid grid-cols-2 gap-4">
                                <ColorPicker color={activeElement.strokeColor || '#000000'} onChange={(c) => handleUpdate({ strokeColor: c })} />
                                <RangeSlider label="Width" value={activeElement.strokeWidth || 0} min={0} max={20} onChange={(v) => handleUpdate({ strokeWidth: v })} />
                            </div>
                        </div>
                    </ControlWrapper>
                     {/* Gradient */}
                    <ControlWrapper label="Gradient">
                        <div className="p-3 bg-gray-50 rounded-lg space-y-3">
                            <div className="grid grid-cols-2 gap-4">
                                <ColorPicker color={activeElement.gradientColors?.[0] || activeElement.color} onChange={(c) => handleGradientUpdate(0, c)} />
                                <ColorPicker color={activeElement.gradientColors?.[1] || '#ffffff'} onChange={(c) => handleGradientUpdate(1, c)} />
                            </div>
                            <select
                                className="input-control"
                                value={activeElement.gradientDirection || 'vertical'}
                                onChange={(e) => handleUpdate({ gradientDirection: e.target.value as 'vertical' | 'horizontal' })}
                            >
                                <option value="vertical">Vertical</option>
                                <option value="horizontal">Horizontal</option>
                            </select>
                        </div>
                    </ControlWrapper>
                </div>
            </Accordion>
            
            <Accordion title="Typography" icon={<Bars3BottomLeftIcon />}>
                <div className="space-y-4 p-4">
                     <RangeSlider label="Letter Spacing" value={activeElement.letterSpacing || 0} min={-10} max={50} onChange={(v) => handleUpdate({ letterSpacing: v })} />
                     <RangeSlider label="Line Height" value={(activeElement.lineHeight || 1.2) * 100} min={80} max={300} onChange={(v) => handleUpdate({ lineHeight: v / 100 })} displayValue={`${(activeElement.lineHeight || 1.2).toFixed(2)}`} />
                </div>
            </Accordion>

            {/* Actions */}
            <div className="flex space-x-3 pt-4">
                <button onClick={() => onAdd()} className="btn btn-secondary flex-1">
                    <PlusIcon className="mr-2 h-5 w-5" /> Add New Text
                </button>
                <button onClick={() => onDelete(activeElement.id)} className="btn btn-danger flex-1">
                    <TrashIcon className="mr-2 h-5 w-5" /> Delete Layer
                </button>
            </div>
            
            <hr className="my-6"/>
            
            <ActionButtons onReset={onReset} onDownload={onDownload} onSave={onSave} />
        </div>
    );
};

const ControlWrapper = ({ label, children }: {label: string, children: React.ReactNode}) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        {children}
    </div>
);

const RangeSlider = ({ label, value, min, max, onChange, displayValue }: { label: string, value: number, min: number, max: number, onChange: (v: number) => void, displayValue?: string }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}: <span className="font-bold">{displayValue || value}</span></label>
        <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
    </div>
);


const ActionButtons = ({onReset, onDownload, onSave}: {onReset: () => void, onDownload: () => void, onSave: () => void}) => (
    <div className="space-y-3 pt-4">
        <button onClick={onDownload} className="btn btn-primary w-full">
            <CloudArrowDownIcon className="mr-2 h-6 w-6" />
            Download Invitation
        </button>
        <div className="grid grid-cols-2 gap-3">
            <button onClick={onSave} className="btn btn-action-secondary w-full">
                <BookmarkSquareIcon className="mr-2 h-5 w-5" />
                Save Design
            </button>
            <button onClick={onReset} className="btn btn-secondary w-full">
                <ArrowPathIcon className="mr-2 h-5 w-5" />
                Reset
            </button>
        </div>
    </div>
);


export default Editor;
