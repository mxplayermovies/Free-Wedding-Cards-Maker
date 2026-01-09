
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Template, TextElement, FontOption, TEMPLATES, FONTS, LanguagePreset, LANGUAGES, CardSize, CARD_SIZES } from './constants';
import Editor from './components/Editor';
import CanvasPreview from './components/CanvasPreview';
import TemplateSelector from './components/TemplateSelector';
import Header from './components/Header';
import LanguageSelector from './components/LanguageSelector';
import SavedCreationsList from './components/SavedCreationsList';
import SizeSelector from './components/SizeSelector';
import SaveModal from './components/SaveModal';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import FAQ from './components/pages/FAQ';
import SchemaInjector from './components/common/SchemaInjector';


interface CanvasRef {
    generateImage: (filename: string) => void;
    getImageDataUrl: () => string | null;
}

export interface SavedCreation {
    id: string;
    name: string;
    imageDataUrl: string; // For the preview card
    timestamp: number;
    // Project data for re-editing
    templateId: string;
    cardSize: CardSize;
    textElements: TextElement[];
}

export type View = 'editor' | 'about' | 'contact' | 'faq';

const App: React.FC = () => {
    const mainEditorRef = useRef<HTMLDivElement>(null);
    const [view, setView] = useState<View>('editor');
    const [selectedTemplate, setSelectedTemplate] = useState<Template>(TEMPLATES[0]);
    const [selectedCardSize, setSelectedCardSize] = useState<CardSize>({
        name: 'Default',
        width: TEMPLATES[0].originalWidth,
        height: TEMPLATES[0].originalHeight,
    });
    const [textElements, setTextElements] = useState<TextElement[]>(selectedTemplate.defaultTextElements);
    const [activeTextElementId, setActiveTextElementId] = useState<string | null>(textElements.length > 0 ? textElements[0].id : null);
    const [savedCreations, setSavedCreations] = useState<SavedCreation[]>([]);
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

    const canvasRef = useRef<CanvasRef>(null);

    useEffect(() => {
        try {
            const savedData = sessionStorage.getItem('savedWeddingCreations');
            if (savedData) {
                setSavedCreations(JSON.parse(savedData));
            }
        } catch (error)
        {
            console.error("Could not access session storage:", error);
        }
    }, []);

    const handleTemplateSelect = useCallback((template: Template) => {
        setSelectedTemplate(template);
        setTextElements(template.defaultTextElements);
        setActiveTextElementId(template.defaultTextElements.length > 0 ? template.defaultTextElements[0].id : null);
        // Reset card size to the native aspect ratio of the new template
        setSelectedCardSize({ name: 'Default', width: template.originalWidth, height: template.originalHeight });
    }, []);

    const handleCardSizeSelect = useCallback((size: CardSize) => {
        setSelectedCardSize(size);
    }, []);

    const updateTextElement = useCallback((id: string, updates: Partial<TextElement>) => {
        setTextElements(prev => prev.map(el => el.id === id ? { ...el, ...updates } : el));
    }, []);

    const addTextElement = useCallback((text: string = "New Text") => {
        const newElement: TextElement = {
            id: Date.now().toString(),
            text,
            fontFamily: 'Lato',
            fontSize: 48,
            color: '#333333',
            x: selectedTemplate.originalWidth / 2,
            y: selectedTemplate.originalHeight / 2,
            width: 400,
            bold: false,
            italic: false,
            textAlign: 'center',
            lineHeight: 1.2,
        };
        setTextElements(prev => [...prev, newElement]);
        setActiveTextElementId(newElement.id);
    }, [selectedTemplate]);

    const deleteTextElement = useCallback((id: string) => {
        setTextElements(prev => prev.filter(el => el.id !== id));
        if (activeTextElementId === id) {
            setActiveTextElementId(prev => {
                const remaining = textElements.filter(el => el.id !== id);
                return remaining.length > 0 ? remaining[0].id : null;
            });
        }
    }, [activeTextElementId, textElements]);

    const handleDownload = () => {
        // Simple download with default name from editor
        canvasRef.current?.generateImage('wedding-invitation');
    };

    const handleSave = () => {
        setIsSaveModalOpen(true);
    };

    const handleConfirmSave = (creationName: string) => {
        const imageDataUrl = canvasRef.current?.getImageDataUrl();
        if (imageDataUrl) {
            const newCreation: SavedCreation = {
                id: Date.now().toString(),
                name: creationName,
                imageDataUrl,
                timestamp: Date.now(),
                // Save project data
                templateId: selectedTemplate.id,
                cardSize: selectedCardSize,
                textElements: textElements,
            };
            const updatedCreations = [...savedCreations, newCreation];
            try {
                sessionStorage.setItem('savedWeddingCreations', JSON.stringify(updatedCreations));
                setSavedCreations(updatedCreations);
            } catch (error) {
                console.error("Could not save to session storage:", error);
                alert("Could not save the image. Your browser's storage might be full or private mode might be enabled.");
            }
        }
        setIsSaveModalOpen(false);
    };
    
    const handleDeleteCreation = (id: string) => {
         const updatedCreations = savedCreations.filter(c => c.id !== id);
         try {
            sessionStorage.setItem('savedWeddingCreations', JSON.stringify(updatedCreations));
            setSavedCreations(updatedCreations);
        } catch (error) {
            console.error("Could not update session storage:", error);
        }
    };

    const handleEditCreation = (id: string) => {
        const creationToEdit = savedCreations.find(c => c.id === id);
        if (!creationToEdit) return;

        const templateToLoad = TEMPLATES.find(t => t.id === creationToEdit.templateId);
        if (!templateToLoad) {
            alert("The original template for this design could not be found.");
            return;
        }

        // Restore state from the saved project
        setSelectedTemplate(templateToLoad);
        setSelectedCardSize(JSON.parse(JSON.stringify(creationToEdit.cardSize))); // Deep copy for safety
        setTextElements(JSON.parse(JSON.stringify(creationToEdit.textElements))); // Deep copy for safety
        setActiveTextElementId(creationToEdit.textElements.length > 0 ? creationToEdit.textElements[0].id : null);
        
        // Note: The old version is NOT deleted. This is a safer UX.
        // The user can save a new copy after editing if they choose.

        // Scroll to the editor so the user can see their loaded design
        mainEditorRef.current?.scrollIntoView({ behavior: 'smooth' });
    };


    const handleClearAllCreations = () => {
        try {
            sessionStorage.removeItem('savedWeddingCreations');
            setSavedCreations([]);
        } catch (error) {
            console.error("Could not clear from session storage:", error);
        }
    };

    const resetToDefaults = useCallback(() => {
        setTextElements(selectedTemplate.defaultTextElements);
        setActiveTextElementId(selectedTemplate.defaultTextElements.length > 0 ? selectedTemplate.defaultTextElements[0].id : null);
    }, [selectedTemplate]);

    const handleLanguageChange = useCallback((language: LanguagePreset) => {
        const defaultProps = {
            id: '', text: '', fontFamily: 'Lato', fontSize: 40, color: '#333333',
            x: selectedTemplate.originalWidth / 2, y: selectedTemplate.originalHeight / 2, width: 600,
            bold: false, italic: false, textAlign: 'center' as const
        };

        const baseProps1 = selectedTemplate.defaultTextElements[0] || defaultProps;
        const baseProps2 = selectedTemplate.defaultTextElements[1] || defaultProps;

        const newTextElements: TextElement[] = [
            {
                ...baseProps1,
                id: 'lang_1',
                text: language.exampleCouple,
                fontFamily: language.suggestedFont,
                fontSize: 120,
                x: selectedTemplate.originalWidth / 2,
                y: selectedTemplate.originalHeight / 2 - 80,
            },
            {
                ...baseProps2,
                id: 'lang_2',
                text: language.examplePhrase,
                fontFamily: baseProps2.fontFamily || 'Lato',
                fontSize: 40,
                x: selectedTemplate.originalWidth / 2,
                y: selectedTemplate.originalHeight / 2 + 100,
            }
        ];
        setTextElements(newTextElements);
        setActiveTextElementId(newTextElements[0].id);
    }, [selectedTemplate]);

    const handleBackToEditor = () => {
        setView('editor');
    }

    const activeTextElement = textElements.find(el => el.id === activeTextElementId) || null;

    const renderView = () => {
        switch (view) {
            case 'about':
                return <About onBack={handleBackToEditor} />;
            case 'contact':
                return <Contact onBack={handleBackToEditor} onNavigate={setView} />;
            case 'faq':
                return <FAQ onBack={handleBackToEditor} />;
            case 'editor':
            default:
                return (
                    <>
                        <TemplateSelector templates={TEMPLATES} selectedTemplate={selectedTemplate} onSelect={handleTemplateSelect} />
                        <SizeSelector sizes={CARD_SIZES} selectedSize={selectedCardSize} onSelect={handleCardSizeSelect} />
                        <LanguageSelector languages={LANGUAGES} onSelect={handleLanguageChange} />
                        <div ref={mainEditorRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start scroll-mt-10">
                            <div className="lg:col-span-4 bg-white p-6 rounded-lg shadow-xl order-2 lg:order-1">
                                <Editor
                                    fonts={FONTS}
                                    activeElement={activeTextElement}
                                    onUpdate={updateTextElement}
                                    onAdd={addTextElement}
                                    onDelete={deleteTextElement}
                                    onReset={resetToDefaults}
                                    onDownload={handleDownload}
                                    onSave={handleSave}
                                />
                            </div>
                            <div className="lg:col-span-8 flex flex-col items-center justify-center order-1 lg:order-2">
                                <h2 className="text-2xl font-playfair font-bold text-gray-700 mb-4">Live Preview</h2>
                                <div className="w-full shadow-2xl rounded-lg overflow-hidden bg-white border">
                                    <CanvasPreview
                                        ref={canvasRef}
                                        template={selectedTemplate}
                                        cardSize={selectedCardSize}
                                        textElements={textElements}
                                        onTextElementsChange={setTextElements}
                                        activeTextElementId={activeTextElementId}
                                        onActiveTextElementIdChange={setActiveTextElementId}
                                    />
                                </div>
                            </div>
                        </div>
                        <SavedCreationsList 
                            creations={savedCreations}
                            onEdit={handleEditCreation}
                            onDelete={handleDeleteCreation} 
                            onClearAll={handleClearAllCreations}
                        />
                    </>
                );
        }
    };


    return (
        <div className="min-h-screen text-gray-800 flex flex-col">
            <SchemaInjector view={view} />
            <Navbar onNavigate={setView} />
            <Header />
            <main className="container mx-auto p-4 md:p-8 space-y-8 flex-grow">
               {renderView()}
            </main>

            {isSaveModalOpen && (
                <SaveModal 
                    onClose={() => setIsSaveModalOpen(false)} 
                    onSave={handleConfirmSave} 
                />
            )}
            <Footer />
        </div>
    );
};

export default App;
