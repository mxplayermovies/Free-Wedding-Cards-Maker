
import React from 'react';
import { ArrowUturnLeftIcon, HeartIcon, SparklesIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

interface AboutProps {
    onBack: () => void;
}

const About: React.FC<AboutProps> = ({ onBack }) => {
    return (
        <div className="bg-white p-6 md:p-10 rounded-lg shadow-xl max-w-4xl mx-auto animate-fade-in">
            <button onClick={onBack} className="btn btn-secondary mb-8">
                <ArrowUturnLeftIcon className="mr-2 h-5 w-5" />
                Back to Editor
            </button>

            <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-800">About Our Free Wedding Card Maker</h2>
                <p className="mt-4 text-lg text-gray-600">
                    Helping you create beautiful memories, one invitation at a time.
                </p>
            </div>

            <hr className="my-8" />

            <div className="space-y-10 text-gray-700">
                <p className="text-lg leading-relaxed">
                    Welcome to your new favorite wedding tool! We believe that creating the perfect wedding invitation shouldn't be complicated or expensive. Our mission is to provide an intuitive, powerful, and completely free platform for couples around the world to design the wedding card of their dreams.
                </p>

                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <FeatureCard
                        icon={<HeartIcon className="w-12 h-12 text-rose-500" />}
                        title="Made with Love, for Love"
                        description="This tool was born from a passion for design and a desire to make wedding planning a little bit easier. Every template and feature is crafted with care."
                    />
                    <FeatureCard
                        icon={<SparklesIcon className="w-12 h-12 text-indigo-500" />}
                        title="Completely Free, No Catches"
                        description="No hidden fees, no subscriptions, no watermarks. Just a high-quality tool for you to use. Download your final design and share it freely."
                    />
                    <FeatureCard
                        icon={<GlobeAltIcon className="w-12 h-12 text-teal-500" />}
                        title="Global & Accessible"
                        description="With support for multiple languages and a wide array of fonts, we aim to serve couples from all cultures and backgrounds."
                    />
                </div>

                <p className="text-lg leading-relaxed">
                    We're constantly working to improve the tool and add new templates and features. Your special day deserves a special invitation, and we're honored to be a small part of your journey.
                </p>
            </div>
        </div>
    );
};

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
    <div className="flex flex-col items-center">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-bold font-playfair mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

export default About;
