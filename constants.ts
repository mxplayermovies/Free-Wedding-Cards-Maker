
export interface TextElement {
    id: string;
    text: string;
    fontFamily: string;
    fontSize: number;
    color: string;
    x: number;
    y: number;
    width: number;
    bold: boolean;
    italic: boolean;
    textAlign: 'left' | 'center' | 'right';
    // Advanced properties
    shadowColor?: string;
    shadowBlur?: number;
    shadowOffsetX?: number;
    shadowOffsetY?: number;
    strokeColor?: string;
    strokeWidth?: number;
    gradientColors?: [string, string];
    gradientDirection?: 'vertical' | 'horizontal';
    letterSpacing?: number;
    lineHeight?: number;
}

export interface Template {
    id: string;
    name: string;
    path: string;
    thumbnail: string;
    originalWidth: number;
    originalHeight: number;
    defaultTextElements: TextElement[];
}

export interface CardSize {
    name: string;
    width: number;
    height: number;
    description?: string;
}

export interface FontOption {
    name: string;
    className: string;
    category: 'Elegant Scripts' | 'Classic Serif' | 'Modern Sans-Serif' | 'Global & European' | 'Devanagari (Hindi, Marathi)' | 'South Asian Scripts' | 'Arabic (Urdu)' | 'East Asian Scripts';
}

export interface LanguagePreset {
    code: string;
    name: string;
    exampleCouple: string;
    examplePhrase: string;
    suggestedFont: string;
}

export interface ColorPalette {
    name: string;
    colors: string[];
}


// Card Sizes @ 300 DPI for print-quality resolution
export const CARD_SIZES: CardSize[] = [
    { name: 'Portrait', width: 1500, height: 2100, description: '5" x 7"' },
    { name: 'Small Portrait', width: 1200, height: 1800, description: '4" x 6"' },
    { name: 'Story / Reel', width: 1080, height: 1920, description: '9:16' },
    { name: 'Landscape', width: 2100, height: 1500, description: '7" x 5"' },
    { name: 'Small Landscape', width: 1800, height: 1200, description: '6" x 4"' },
    { name: 'Square', width: 1500, height: 1500, description: '5" x 5"' },
];

const fontCategories = {
    scripts: 'Elegant Scripts' as const,
    serif: 'Classic Serif' as const,
    sans: 'Modern Sans-Serif' as const,
    global: 'Global & European' as const,
    devanagari: 'Devanagari (Hindi, Marathi)' as const,
    southAsian: 'South Asian Scripts' as const,
    arabic: 'Arabic (Urdu)' as const,
    eastAsian: 'East Asian Scripts' as const,
}

export const FONTS: FontOption[] = [
    // Elegant Scripts
    { name: 'Great Vibes', className: 'font-great-vibes', category: fontCategories.scripts },
    { name: 'Dancing Script', className: 'font-dancing-script', category: fontCategories.scripts },
    { name: 'Alex Brush', className: 'font-alex-brush', category: fontCategories.scripts },
    
    // Classic Serif
    { name: 'Playfair Display', className: 'font-playfair', category: fontCategories.serif },
    { name: 'Cormorant Garamond', className: 'font-cormorant', category: fontCategories.serif },
    { name: 'Merriweather', className: 'font-merriweather', category: fontCategories.serif },
    { name: 'Lora', className: 'font-lora', category: fontCategories.serif },

    // Modern Sans-Serif
    { name: 'Lato', className: 'font-lato', category: fontCategories.sans },
    { name: 'Montserrat', className: 'font-montserrat', category: fontCategories.sans },
    { name: 'Poppins', className: 'font-poppins', category: fontCategories.sans },
    
    // Global & European
    { name: 'Roboto', className: 'font-roboto', category: fontCategories.global },
    { name: 'Open Sans', className: 'font-open-sans', category: fontCategories.global },
    { name: 'Nunito', className: 'font-nunito', category: fontCategories.global },
    
    // Devanagari (Hindi / Marathi)
    { name: 'Tiro Devanagari Hindi', className: 'font-tiro-devanagari', category: fontCategories.devanagari },
    { name: 'Noto Sans Devanagari', className: 'font-noto-sans-devanagari', category: fontCategories.devanagari },

    // Other South Asian Scripts
    { name: 'Noto Sans Gujarati', className: 'font-noto-sans-gujarati', category: fontCategories.southAsian },
    { name: 'Noto Sans Gurmukhi', className: 'font-noto-sans-gurmukhi', category: fontCategories.southAsian },
    { name: 'Noto Sans Bengali', className: 'font-noto-sans-bengali', category: fontCategories.southAsian },
    { name: 'Noto Sans Tamil', className: 'font-noto-sans-tamil', category: fontCategories.southAsian },
    { name: 'Noto Sans Telugu', className: 'font-noto-sans-telugu', category: fontCategories.southAsian },
    { name: 'Noto Sans Kannada', className: 'font-noto-sans-kannada', category: fontCategories.southAsian },
    
    // Arabic (Urdu)
    { name: 'Almarai', className: 'font-almarai', category: fontCategories.arabic },
    { name: 'Noto Naskh Arabic', className: 'font-noto-naskh', category: fontCategories.arabic },

    // East Asian
    { name: 'Noto Sans JP', className: 'font-noto-sans-jp', category: fontCategories.eastAsian },
    { name: 'Noto Sans KR', className: 'font-noto-sans-kr', category: fontCategories.eastAsian },
    { name: 'Noto Sans Thai', className: 'font-noto-sans-thai', category: fontCategories.eastAsian },
];

export const LANGUAGES: LanguagePreset[] = [
    { code: 'en', name: 'English', exampleCouple: 'Jane & John', examplePhrase: 'Are Getting Married', suggestedFont: 'Playfair Display' },
    // Indian Languages
    { code: 'hi', name: 'हिन्दी (Hindi)', exampleCouple: 'प्रिया और रोहन', examplePhrase: 'विवाह बंधन में बंध रहे हैं', suggestedFont: 'Tiro Devanagari Hindi' },
    { code: 'mr', name: 'मराठी (Marathi)', exampleCouple: 'प्रिया आणि रोहन', examplePhrase: 'आमच्या लग्नाला नक्की यायचं!', suggestedFont: 'Noto Sans Devanagari' },
    { code: 'gu', name: 'ગુજરાતી (Gujarati)', exampleCouple: 'પriya અને રોહન', examplePhrase: 'અમારા લગ્નમાં આપનું સ્વાગત છે', suggestedFont: 'Noto Sans Gujarati' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)', exampleCouple: 'ਪ੍ਰਿਆ ਅਤੇ ਰੋਹਨ', examplePhrase: 'ਸਾਡੇ ਵਿਆਹ \'ਤੇ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ', suggestedFont: 'Noto Sans Gurmukhi' },
    { code: 'bn', name: 'বাংলা (Bengali)', exampleCouple: 'প্রিয়া ও রোহন', examplePhrase: 'আমাদের বিয়েতে আপনাকে আমন্ত্রণ', suggestedFont: 'Noto Sans Bengali' },
    { code: 'ta', name: 'தமிழ் (Tamil)', exampleCouple: 'பிரியா மற்றும் ரோகன்', examplePhrase: 'எங்கள் திருமணத்திற்கு உங்களை வரவேற்கிறோம்', suggestedFont: 'Noto Sans Tamil' },
    { code: 'te', name: 'తెలుగు (Telugu)', exampleCouple: 'ప్రియ మరియు రోహన్', examplePhrase: 'మా వివాహానికి మిమ్మల్ని ఆహ్వానిస్తున్నాము', suggestedFont: 'Noto Sans Telugu' },
    { code: 'kn', name: 'ಕನ್ನಡ (Kannada)', exampleCouple: 'ಪ್ರಿಯಾ ಮತ್ತು ರೋಹನ್', examplePhrase: 'ನಮ್ಮ ವಿವಾಹಕ್ಕೆ ನಿಮಗೆ ಸ್ವಾಗತ', suggestedFont: 'Noto Sans Kannada' },
    { code: 'ur', name: 'اردو (Urdu)', exampleCouple: 'پریہ اور روہن', examplePhrase: 'ہماری شادی میں آپ کا استقبال ہے۔', suggestedFont: 'Noto Naskh Arabic' },
    // International Languages
    { code: 'es', name: 'Español (Spanish)', exampleCouple: 'Sofía & Mateo', examplePhrase: 'Se Casan', suggestedFont: 'Lora' },
    { code: 'fr', name: 'Français (French)', exampleCouple: 'Chloé & Louis', examplePhrase: 'Se Marient', suggestedFont: 'Cormorant Garamond' },
    { code: 'de', name: 'Deutsch (German)', exampleCouple: 'Hanna & Leon', examplePhrase: 'Heiraten', suggestedFont: 'Playfair Display' },
    { code: 'it', name: 'Italiano (Italian)', exampleCouple: 'Giulia & Marco', examplePhrase: 'Si Sposano', suggestedFont: 'Cormorant Garamond' },
    { code: 'pt', name: 'Português (Portuguese)', exampleCouple: 'Sofia & Lucas', examplePhrase: 'Vão se Casar', suggestedFont: 'Lora' },
    { code: 'ru', name: 'Русский (Russian)', exampleCouple: 'Анна и Артём', examplePhrase: 'Приглашают на свадьбу', suggestedFont: 'Lora' },
    { code: 'ar', name: 'العربية (Arabic)', exampleCouple: 'فاطمة ومحمد', examplePhrase: 'يتزوجون', suggestedFont: 'Noto Naskh Arabic' },
    { code: 'ja', name: '日本語 (Japanese)', exampleCouple: 'さくら & 蓮', examplePhrase: '結婚します', suggestedFont: 'Noto Sans JP' },
    { code: 'ko', name: '한국어 (Korean)', exampleCouple: '서연 & 민준', examplePhrase: '결혼합니다', suggestedFont: 'Noto Sans KR' },
    { code: 'th', name: 'ไทย (Thai)', exampleCouple: 'มานี และ ชูใจ', examplePhrase: 'ขอเชิญร่วมงานมงคลสมรส', suggestedFont: 'Noto Sans Thai' },
    { code: 'tr', name: 'Türkçe (Turkish)', exampleCouple: 'Zeynep & Yusuf', examplePhrase: 'Evleniyor', suggestedFont: 'Merriweather' },
    { code: 'vi', name: 'Tiếng Việt (Vietnamese)', exampleCouple: 'Linh & Anh', examplePhrase: 'Trân trọng kính mời', suggestedFont: 'Roboto' },
    { code: 'he', name: 'עברית (Hebrew)', exampleCouple: 'נועה ואיתי', examplePhrase: 'מזמינים אתכם לחתונה', suggestedFont: 'Open Sans' },
];

export const COLOR_PALETTES: ColorPalette[] = [
    {
        name: 'Classic Romance',
        colors: ['#F1E4E8', '#D3B8C0', '#A48D93', '#6A5E63', '#FFFFFF'],
    },
    {
        name: 'Gilded Emerald',
        colors: ['#004225', '#F5F5DC', '#FFD700', '#E5C100', '#5C5C3D'],
    },
    {
        name: 'Regal Navy & Gold',
        colors: ['#001F3F', '#F5F5F5', '#C0C0C0', '#FFD700', '#877D69'],
    },
    {
        name: 'Sunset Glow',
        colors: ['#FEC89A', '#F9D6B4', '#FFB396', '#FF8C69', '#DE6B48'],
    },
    {
        name: 'Dusty Rose & Sage',
        colors: ['#BDB2A7', '#D8C3C6', '#EFE5E0', '#A89895', '#8A9A8A'],
    },
    {
        name: 'Oceanic Bliss',
        colors: ['#B2D8D8', '#6A9D9D', '#4D7C7C', '#F0EBE3', '#D4B996'],
    },
];

const createDefaultTextElements = (elements: Omit<TextElement, 'lineHeight'>[]): TextElement[] => {
    return elements.map(el => ({ ...el, lineHeight: 1.2 }));
};

export const TEMPLATES: Template[] = [
    {
        id: 'template1',
        name: 'Elegant Floral',
        path: '/templates/template1.jpg',
        thumbnail: '/templates/template1_thumb.jpg',
        originalWidth: 1200,
        originalHeight: 1800,
        defaultTextElements: createDefaultTextElements([
            { id: 't1_1', text: 'Jane Doe', x: 600, y: 550, width: 800, fontFamily: 'Great Vibes', fontSize: 120, color: '#4a4a4a', bold: false, italic: false, textAlign: 'center' },
            { id: 't1_2', text: '&', x: 600, y: 700, width: 200, fontFamily: 'Playfair Display', fontSize: 80, color: '#5a5a5a', bold: false, italic: false, textAlign: 'center' },
            { id: 't1_3', text: 'John Smith', x: 600, y: 850, width: 800, fontFamily: 'Great Vibes', fontSize: 120, color: '#4a4a4a', bold: false, italic: false, textAlign: 'center' },
        ])
    },
    {
        id: 'template6',
        name: 'Sacred Mandala',
        path: '/templates/template6.jpg',
        thumbnail: '/templates/template6_thumb.jpg',
        originalWidth: 1200,
        originalHeight: 1800,
        defaultTextElements: createDefaultTextElements([
            { id: 't6_1', text: 'श्री गणेशाय नमः', x: 600, y: 250, width: 800, fontFamily: 'Tiro Devanagari Hindi', fontSize: 60, color: '#8c5a2b', bold: false, italic: false, textAlign: 'center' },
            { id: 't6_2', text: 'Priya & Rohan', x: 600, y: 800, width: 1000, fontFamily: 'Cormorant Garamond', fontSize: 150, color: '#333', bold: true, italic: false, textAlign: 'center' },
        ])
    },
    {
        id: 'template7',
        name: 'Emerald Geometric',
        path: '/templates/template7.jpg',
        thumbnail: '/templates/template7_thumb.jpg',
        originalWidth: 1200,
        originalHeight: 1800,
        defaultTextElements: createDefaultTextElements([
            { id: 't7_1', text: 'SAVE THE DATE', x: 600, y: 400, width: 800, fontFamily: 'Montserrat', fontSize: 40, color: '#F0E6D2', bold: true, italic: false, textAlign: 'center', letterSpacing: 5 },
            { id: 't7_2', text: 'Aisha\n&\nZayn', x: 600, y: 800, width: 800, fontFamily: 'Playfair Display', fontSize: 160, color: '#FFFFFF', bold: false, italic: false, textAlign: 'center' },
        ])
    },
    {
        id: 'template8',
        name: 'Celestial Night',
        path: '/templates/template8.jpg',
        thumbnail: '/templates/template8_thumb.jpg',
        originalWidth: 1200,
        originalHeight: 1800,
        defaultTextElements: createDefaultTextElements([
            { id: 't8_1', text: 'Join us under the stars', x: 600, y: 500, width: 800, fontFamily: 'Dancing Script', fontSize: 60, color: '#f0e6d2', bold: false, italic: false, textAlign: 'center' },
            { id: 't8_2', text: 'LUNA & ORION', x: 600, y: 850, width: 1000, fontFamily: 'Cormorant Garamond', fontSize: 160, color: '#ffffff', bold: true, italic: false, textAlign: 'center', shadowColor: 'rgba(0,0,0,0.3)', shadowBlur: 10, shadowOffsetY: 5 },
            { id: 't8_3', text: 'ARE TYING THE KNOT', x: 600, y: 1050, width: 800, fontFamily: 'Montserrat', fontSize: 32, color: '#f0e6d2', bold: false, italic: false, textAlign: 'center', letterSpacing: 3 },
        ])
    },
    {
        id: 'template2',
        name: 'Classic Gold',
        path: '/templates/template2.jpg',
        thumbnail: '/templates/template2_thumb.jpg',
        originalWidth: 1200,
        originalHeight: 1800,
        defaultTextElements: createDefaultTextElements([
            { id: 't2_1', text: 'Together with their families', x: 600, y: 300, width: 800, fontFamily: 'Dancing Script', fontSize: 48, color: '#c09a63', bold: false, italic: false, textAlign: 'center' },
            { id: 't2_2', text: 'Olivia & Liam', x: 600, y: 550, width: 1000, fontFamily: 'Playfair Display', fontSize: 150, color: '#333333', bold: true, italic: false, textAlign: 'center' },
        ])
    },
    {
        id: 'template3',
        name: 'Modern Minimalist',
        path: '/templates/template3.jpg',
        thumbnail: '/templates/template3_thumb.jpg',
        originalWidth: 1200,
        originalHeight: 1800,
        defaultTextElements: createDefaultTextElements([
            { id: 't3_1', text: 'ARE GETTING MARRIED', x: 600, y: 400, width: 800, fontFamily: 'Montserrat', fontSize: 40, color: '#888888', bold: true, italic: false, textAlign: 'center', letterSpacing: 4 },
            { id: 't3_2', text: 'Sophia\n&\nBenjamin', x: 600, y: 750, width: 800, fontFamily: 'Playfair Display', fontSize: 130, color: '#333333', bold: false, italic: false, textAlign: 'center' },
        ])
    },
    {
        id: 'template4',
        name: 'Rustic Charm',
        path: '/templates/template4.jpg',
        thumbnail: '/templates/template4_thumb.jpg',
        originalWidth: 1200,
        originalHeight: 1800,
        defaultTextElements: createDefaultTextElements([
            { id: 't4_1', text: 'You are invited to the wedding of', x: 600, y: 400, width: 800, fontFamily: 'Dancing Script', fontSize: 60, color: '#5C3D2E', bold: false, italic: false, textAlign: 'center' },
            { id: 't4_2', text: 'Emily & Noah', x: 600, y: 600, width: 900, fontFamily: 'Playfair Display', fontSize: 140, color: '#4A3F35', bold: true, italic: false, textAlign: 'center' },
        ])
    },
    {
        id: 'template5',
        name: 'Art Deco Glamour',
        path: '/templates/template5.jpg',
        thumbnail: '/templates/template5_thumb.jpg',
        originalWidth: 1200,
        originalHeight: 1800,
        defaultTextElements: createDefaultTextElements([
            { id: 't5_1', text: 'THE WEDDING OF', x: 600, y: 600, width: 800, fontFamily: 'Montserrat', fontSize: 40, color: '#BFA181', bold: true, italic: false, textAlign: 'center', letterSpacing: 5 },
            { id: 't5_2', text: 'CHLOE & JAMES', x: 600, y: 750, width: 1000, fontFamily: 'Playfair Display', fontSize: 110, color: '#2C3E50', bold: true, italic: false, textAlign: 'center', letterSpacing: 2 },
        ])
    },
    {
        id: 'template9',
        name: 'Ocean Breeze',
        path: '/templates/template9.jpg',
        thumbnail: '/templates/template9_thumb.jpg',
        originalWidth: 1200,
        originalHeight: 1800,
        defaultTextElements: createDefaultTextElements([
            { id: 't9_1', text: 'Together by the sea', x: 600, y: 700, width: 800, fontFamily: 'Dancing Script', fontSize: 70, color: '#ffffff', bold: false, italic: false, textAlign: 'center', shadowColor: 'rgba(0,0,0,0.2)', shadowBlur: 5, shadowOffsetY: 2 },
            { id: 't9_2', text: 'Maya & Kai', x: 600, y: 850, width: 1000, fontFamily: 'Playfair Display', fontSize: 150, color: '#ffffff', bold: true, italic: false, textAlign: 'center', shadowColor: 'rgba(0,0,0,0.2)', shadowBlur: 8, shadowOffsetY: 4 },
        ])
    },
    {
        id: 'template10',
        name: 'Autumn Vineyard',
        path: '/templates/template10.jpg',
        thumbnail: '/templates/template10_thumb.jpg',
        originalWidth: 1800,
        originalHeight: 1200,
        defaultTextElements: createDefaultTextElements([
            { id: 't10_1', text: 'AVA & ETHAN', x: 900, y: 500, width: 1200, fontFamily: 'Cormorant Garamond', fontSize: 160, color: '#4a2c2a', bold: true, italic: false, textAlign: 'center' },
            { id: 't10_2', text: 'Invite you to celebrate their wedding', x: 900, y: 650, width: 1000, fontFamily: 'Lato', fontSize: 40, color: '#6d4c41', bold: false, italic: false, textAlign: 'center' },
        ])
    },
    {
        id: 'template11',
        name: 'Winter Wonderland',
        path: '/templates/template11.jpg',
        thumbnail: '/templates/template11_thumb.jpg',
        originalWidth: 1200,
        originalHeight: 1800,
        defaultTextElements: createDefaultTextElements([
            { id: 't11_1', text: 'Clara & Frederick', x: 600, y: 800, width: 1000, fontFamily: 'Great Vibes', fontSize: 150, color: '#2c3e50', bold: false, italic: false, textAlign: 'center' },
            { id: 't11_2', text: 'request the pleasure of your company at their winter wedding', x: 600, y: 1000, width: 800, fontFamily: 'Montserrat', fontSize: 30, color: '#34495e', bold: false, italic: false, textAlign: 'center' },
        ])
    },
    {
        id: 'template12',
        name: 'Urban Chic',
        path: '/templates/template12.jpg',
        thumbnail: '/templates/template12_thumb.jpg',
        originalWidth: 1200,
        originalHeight: 1800,
        defaultTextElements: createDefaultTextElements([
            { id: 't12_1', text: 'GETTING HITCHED', x: 600, y: 850, width: 800, fontFamily: 'Poppins', fontSize: 100, color: '#ffffff', bold: true, italic: false, textAlign: 'center' },
            { id: 't12_2', text: 'ZOE + LEO', x: 600, y: 980, width: 600, fontFamily: 'Montserrat', fontSize: 60, color: '#ffffff', bold: false, italic: false, textAlign: 'center' },
        ])
    },
    {
        id: 'template13',
        name: 'Japanese Blossom',
        path: '/templates/template13.jpg',
        thumbnail: '/templates/template13_thumb.jpg',
        originalWidth: 1200,
        originalHeight: 1800,
        defaultTextElements: createDefaultTextElements([
            { id: 't13_1', text: '結婚式', x: 600, y: 500, width: 800, fontFamily: 'Noto Sans JP', fontSize: 100, color: '#333', bold: false, italic: false, textAlign: 'center' },
            { id: 't13_2', text: 'ひな & 湊', x: 600, y: 900, width: 1000, fontFamily: 'Great Vibes', fontSize: 160, color: '#c16c84', bold: false, italic: false, textAlign: 'center' },
        ])
    },
];

export const FAQS = [
    {
        question: "Is this wedding card maker really free to use?",
        answer: "Yes, absolutely! Our tool is 100% free. There are no hidden charges, no watermarks on your downloads, and no premium features to unlock. Our goal is to provide a high-quality design tool that's accessible to everyone."
    },
    {
        question: "How are my designs and creations saved?",
        answer: "Your designs are saved in your browser's session storage. This means they are available as long as you keep the browser tab open. IMPORTANT: If you close the tab or your browser, your saved creations will be deleted. Be sure to download any designs you want to keep permanently."
    },
    {
        question: "Can I use my own photos or templates?",
        answer: "Currently, our editor supports customizing the beautiful, professionally designed templates we provide. We do not support uploading personal photos or external templates at this time, but it's a feature we are considering for the future!"
    },
    {
        question: "What format can I download my invitation in?",
        answer: "You can download your final wedding card as a high-quality JPEG image. This format is perfect for sharing digitally via email, social media, or messaging apps like WhatsApp."
    },
    {
        question: "Can I edit a design after I have saved it?",
        answer: "Yes! Any design you save during your session will appear in the 'Your Saved Creations' gallery. Simply click the 'Edit' button on any saved card to load it back into the live preview editor for further changes."
    },
    {
        question: "Is there a limit to how many invitations I can create or download?",
        answer: "No, there are no limits. You can create, customize, and download as many different wedding invitations as you like. Feel free to experiment with different templates and styles!"
    }
];
