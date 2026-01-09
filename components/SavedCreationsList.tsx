
import React, { useState, useEffect, useCallback } from 'react';
import { SavedCreation } from '../App';
import { ArrowDownTrayIcon, TrashIcon, ExclamationTriangleIcon, InformationCircleIcon, XMarkIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { FaFacebook, FaWhatsapp } from 'react-icons/fa';

interface SavedCreationsListProps {
    creations: SavedCreation[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onClearAll: () => void;
}

const SavedCreationsList: React.FC<SavedCreationsListProps> = ({ creations, onEdit, onDelete, onClearAll }) => {
    if (creations.length === 0) {
        return null;
    }

    return (
        <div className="mt-12">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-playfair font-bold text-gray-700">Your Saved Creations</h2>
                <button onClick={onClearAll} className="btn btn-danger btn-sm">
                    <TrashIcon className="mr-2 h-4 w-4" />
                    Clear All
                </button>
            </div>
             <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                            Your creations are saved for this session only.
                            <strong className="font-semibold"> They will be deleted when you close this browser tab.</strong>
                        </p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {creations.map(creation => (
                    <CreationCard key={creation.id} creation={creation} onEdit={onEdit} onDelete={onDelete} />
                ))}
            </div>
        </div>
    );
};

interface CreationCardProps {
    creation: SavedCreation;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const CreationCard: React.FC<CreationCardProps> = ({ creation, onEdit, onDelete }) => {
    const [isDesktopShareModalOpen, setIsDesktopShareModalOpen] = useState(false);
    const [shareService, setShareService] = useState('');
    const [canShareFiles, setCanShareFiles] = useState(false);

    useEffect(() => {
        const checkShareAbility = async () => {
            if (navigator.share) {
                const blob = await dataUrlToBlob(creation.imageDataUrl);
                const file = new File([blob], `${creation.name}.jpg`, { type: 'image/jpeg' });
                if (navigator.canShare && navigator.canShare({ files: [file] })) {
                    setCanShareFiles(true);
                }
            }
        };
        checkShareAbility();
    }, [creation.imageDataUrl, creation.name]);

    const dataUrlToBlob = async (dataUrl: string): Promise<Blob> => {
        const res = await fetch(dataUrl);
        return await res.blob();
    };

    const shareImageFile = useCallback(async () => {
        try {
            const blob = await dataUrlToBlob(creation.imageDataUrl);
            const safeFilename = creation.name.replace(/[^a-z0-9_.-]/gi, '_') || 'invitation';
            const file = new File([blob], `${safeFilename}.jpg`, { type: 'image/jpeg' });
            await navigator.share({
                title: creation.name,
                text: 'I just created my wedding invitation!',
                files: [file],
            });
        } catch (error) {
            console.error('Error sharing directly:', error);
            if ((error as DOMException).name !== 'AbortError') {
                 alert("Sharing failed. Please try downloading the image and sharing it manually.");
            }
        }
    }, [creation.imageDataUrl, creation.name]);

    const handleSocialShareClick = (service: string) => {
        if (canShareFiles) {
            shareImageFile();
        } else {
            setShareService(service);
            setIsDesktopShareModalOpen(true);
        }
    };

    const safeFilename = creation.name.replace(/[^a-z0-9_.-]/gi, '_') || 'invitation';
    
    return (
        <>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                <img src={creation.imageDataUrl} alt={creation.name} className="w-full h-auto object-cover border-b" />
                <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-bold text-gray-800 truncate" title={creation.name}>{creation.name}</h3>
                    <p className="text-xs text-gray-500 mb-3">Saved: {new Date(creation.timestamp).toLocaleTimeString()}</p>
                    <div className="mt-auto space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                             <a href={creation.imageDataUrl} download={`${safeFilename}.jpg`} className="btn btn-primary btn-sm w-full">
                                <ArrowDownTrayIcon className="mr-2 h-4 w-4" /> Download
                            </a>
                            <button onClick={() => onEdit(creation.id)} className="btn btn-action-secondary btn-sm w-full">
                                <PencilSquareIcon className="mr-2 h-4 w-4" /> Edit
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                             <button onClick={() => handleSocialShareClick('Facebook')} className="btn btn-facebook w-full !text-sm !px-2 !py-2">
                                <FaFacebook className="mr-2 h-4 w-4" /> Facebook
                            </button>
                            <button onClick={() => handleSocialShareClick('WhatsApp')} className="btn btn-whatsapp w-full !text-sm !px-2 !py-2">
                                <FaWhatsapp className="mr-2 h-4 w-4" /> WhatsApp
                            </button>
                        </div>
                        <button onClick={() => onDelete(creation.id)} className="btn btn-secondary w-full !text-xs justify-center">
                            <TrashIcon className="mr-1 h-4 w-4" /> Delete
                        </button>
                    </div>
                </div>
            </div>

            {isDesktopShareModalOpen && (
                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md text-center relative">
                        <button 
                            onClick={() => setIsDesktopShareModalOpen(false)} 
                            className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600"
                            aria-label="Close"
                        >
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                        <InformationCircleIcon className="w-12 h-12 mx-auto text-sky-500" />
                        <h3 className="text-xl font-bold font-playfair mt-4 text-gray-800">Share on {shareService}</h3>
                        <p className="text-gray-600 mt-2 text-sm">
                            To share your invitation on a desktop, you need to download it first.
                        </p>
                         <p className="text-gray-600 mt-2 text-sm">
                             This tool is private and doesn't upload your image online, so a direct link can't be created.
                        </p>
                        <div className="mt-6 space-y-3">
                            <a href={creation.imageDataUrl} download={`${safeFilename}.jpg`} className="btn btn-primary w-full" onClick={() => setIsDesktopShareModalOpen(false)}>
                                <ArrowDownTrayIcon className="mr-2 h-5 w-5" />
                                Download Image & Share
                            </a>
                            <button onClick={() => setIsDesktopShareModalOpen(false)} className="btn btn-secondary w-full">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SavedCreationsList;
