
import React from 'react';
import { View } from '../App';

interface NavbarProps {
    onNavigate: (view: View) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
    return (
        <nav className="bg-rose-50/50 backdrop-blur-sm sticky top-0 z-40 border-b border-rose-100">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex items-center justify-end h-14">
                    <div className="flex items-center space-x-6">
                        <button
                            onClick={() => onNavigate('about')}
                            className="text-gray-600 hover:text-rose-600 font-medium transition-colors text-sm"
                        >
                            About Us
                        </button>
                        <button
                            onClick={() => onNavigate('faq')}
                            className="text-gray-600 hover:text-rose-600 font-medium transition-colors text-sm"
                        >
                            FAQ
                        </button>
                        <button
                            onClick={() => onNavigate('contact')}
                            className="text-gray-600 hover:text-rose-600 font-medium transition-colors text-sm"
                        >
                            Contact Us
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
