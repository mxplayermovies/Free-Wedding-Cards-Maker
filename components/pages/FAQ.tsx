
import React, { useState } from 'react';
import { ArrowUturnLeftIcon, QuestionMarkCircleIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { FAQS } from '../../constants';

interface FAQProps {
    onBack: () => void;
}

const FAQ: React.FC<FAQProps> = ({ onBack }) => {
    return (
        <div className="bg-white p-6 md:p-10 rounded-lg shadow-xl max-w-4xl mx-auto animate-fade-in">
            <button onClick={onBack} className="btn btn-secondary mb-8">
                <ArrowUturnLeftIcon className="mr-2 h-5 w-5" />
                Back to Editor
            </button>

            <div className="text-center">
                 <QuestionMarkCircleIcon className="w-16 h-16 mx-auto text-rose-500" />
                <h2 className="mt-4 text-4xl md:text-5xl font-playfair font-bold text-gray-800">Frequently Asked Questions</h2>
                <p className="mt-4 text-lg text-gray-600">
                    Have questions? We've got answers.
                </p>
            </div>

            <hr className="my-8" />

            <div className="space-y-4">
                {FAQS.map((faq, index) => (
                    <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
            </div>
        </div>
    );
};


const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-200 rounded-lg">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left p-4 focus:outline-none"
            >
                <span className="text-lg font-semibold text-gray-800">{question}</span>
                <ChevronDownIcon
                    className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>
            {isOpen && (
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                    <p className="text-gray-600 leading-relaxed">{answer}</p>
                </div>
            )}
        </div>
    );
};

export default FAQ;
