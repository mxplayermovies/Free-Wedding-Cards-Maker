
import React from 'react';
import { ArrowUturnLeftIcon, EnvelopeIcon, ChatBubbleLeftRightIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { View } from '../../App';

interface ContactProps {
    onBack: () => void;
    onNavigate: (view: View) => void;
}

const Contact: React.FC<ContactProps> = ({ onBack, onNavigate }) => {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Thank you for your message! As this is a demo application, the form is not connected to a server. We appreciate you checking it out!");
    };

    return (
        <div className="bg-white p-6 md:p-10 rounded-lg shadow-xl max-w-4xl mx-auto animate-fade-in">
            <button onClick={onBack} className="btn btn-secondary mb-8">
                <ArrowUturnLeftIcon className="mr-2 h-5 w-5" />
                Back to Editor
            </button>

            <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-800">Get In Touch</h2>
                <p className="mt-4 text-lg text-gray-600">
                    We'd love to hear from you! Whether you have a question, feedback, or just want to say hello.
                </p>
            </div>

            <hr className="my-8" />

            <div className="grid md:grid-cols-2 gap-10 items-start">
                {/* Contact Info */}
                <div className="space-y-6">
                    <InfoBlock
                        icon={<EnvelopeIcon className="w-8 h-8 text-rose-500" />}
                        title="Email Us"
                        content="For support or general inquiries, please email us at:"
                        link="mailto:hello@weddingcardmaker.com"
                        linkText="hello@weddingcardmaker.com"
                    />
                    <InfoBlock
                        icon={<ChatBubbleLeftRightIcon className="w-8 h-8 text-indigo-500" />}
                        title="Feedback"
                        content="Have a suggestion or a feature request? We're all ears!"
                        link="mailto:feedback@weddingcardmaker.com"
                        linkText="feedback@weddingcardmaker.com"
                    />
                     <InfoBlock
                        icon={<QuestionMarkCircleIcon className="w-8 h-8 text-teal-500" />}
                        title="Help & FAQ"
                        content="Check out our frequently asked questions for quick answers."
                        linkText="Visit the FAQ Page"
                        onClick={() => onNavigate('faq')}
                    />
                </div>

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                     <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                        <input type="text" id="name" required className="input-control" />
                    </div>
                     <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                        <input type="email" id="email" required className="input-control" />
                    </div>
                     <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                        <textarea id="message" rows={5} required className="input-control"></textarea>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary w-full">
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

interface InfoBlockProps {
    icon: React.ReactNode;
    title: string;
    content: string;
    linkText: string;
    link?: string;
    onClick?: () => void;
}

const InfoBlock: React.FC<InfoBlockProps> = ({ icon, title, content, link, linkText, onClick }) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">{icon}</div>
        <div>
            <h3 className="text-xl font-bold font-playfair">{title}</h3>
            <p className="text-gray-600 mt-1">{content}</p>
            {onClick ? (
                 <button onClick={onClick} className="text-rose-600 hover:text-rose-800 font-semibold transition-colors mt-1 inline-block text-left">
                    {linkText}
                </button>
            ) : (
                <a href={link} className="text-rose-600 hover:text-rose-800 font-semibold transition-colors mt-1 inline-block">
                    {linkText}
                </a>
            )}
        </div>
    </div>
);


export default Contact;
