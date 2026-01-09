
import React, { useEffect } from 'react';
import { View } from '../../App';
import { FAQS } from '../../constants';

interface SchemaInjectorProps {
    view: View;
}

const SchemaInjector: React.FC<SchemaInjectorProps> = ({ view }) => {

    useEffect(() => {
        let schema: object | null = null;
        const url = "https://free-wedding-cards-maker.vercel.app/";

        switch (view) {
            case 'editor':
                schema = {
                    "@context": "https://schema.org",
                    "@type": "HowTo",
                    "name": "How to Create a Free Wedding Invitation",
                    "description": "A simple guide to designing your custom wedding card using our free online tool.",
                    "estimatedCost": {
                        "@type": "MonetaryAmount",
                        "currency": "USD",
                        "value": "0"
                    },
                    "supply": {
                        "@type": "HowToSupply",
                        "name": "A modern web browser"
                    },
                    "tool": {
                        "@type": "HowToTool",
                        "name": "Free Online Wedding Card Maker"
                    },
                    "step": [
                        {
                            "@type": "HowToStep",
                            "name": "Choose a Template",
                            "text": "Select a beautiful, professionally designed template to start your creation.",
                            "url": url,
                            "image": `${url}og-image.jpg`
                        },
                        {
                            "@type": "HowToStep",
                            "name": "Customize Text",
                            "text": "Edit the names, dates, and messages. Add new text layers as needed.",
                            "url": url
                        },
                        {
                            "@type": "HowToStep",
                            "name": "Adjust Styles",
                            "text": "Personalize your invitation by changing fonts, colors, sizes, and applying advanced effects like shadows and gradients.",
                            "url": url
                        },
                        {
                            "@type": "HowToStep",
                            "name": "Download Your Card",
                            "text": "Once you are happy with your design, download the final invitation as a high-quality JPEG image, ready to be shared.",
                            "url": url
                        }
                    ]
                };
                break;
            case 'faq':
                schema = {
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": FAQS.map(faq => ({
                        "@type": "Question",
                        "name": faq.question,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": faq.answer
                        }
                    }))
                };
                break;
            case 'about':
                schema = {
                    "@context": "https://schema.org",
                    "@type": "AboutPage",
                    "name": "About Our Free Wedding Card Maker",
                    "url": `${url}#about`,
                    "description": "Learn about our mission to provide a free, high-quality tool for creating beautiful wedding invitations."
                };
                break;
            case 'contact':
                schema = {
                    "@context": "https://schema.org",
                    "@type": "ContactPage",
                    "name": "Contact Us",
                    "url": `${url}#contact`,
                    "description": "Get in touch with the team behind the Free Wedding Card Maker for questions or feedback."
                };
                break;
        }

        const scriptElement = document.getElementById('app-schema');
        if (scriptElement) {
            scriptElement.textContent = schema ? JSON.stringify(schema, null, 2) : '';
        }

    }, [view]);

    return null; // This component does not render anything
};

export default SchemaInjector;
