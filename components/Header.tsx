
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-white border-b border-gray-200">
            <div className="container mx-auto px-4 md:px-8 py-5">
                <div className="text-center w-full">
                     <h1 className="text-3xl md:text-4xl font-playfair font-bold text-gray-800">
                        Free Wedding Card Maker
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Create your perfect digital invitation in minutes.</p>
                </div>
            </div>
        </header>
    );
};

export default Header;
