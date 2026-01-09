
import React, { useRef, useEffect, useImperativeHandle, forwardRef, useState, useCallback } from 'react';
import { Template, TextElement, CardSize } from '../constants';

interface CanvasPreviewProps {
    template: Template;
    cardSize: CardSize;
    textElements: TextElement[];
    onTextElementsChange: React.Dispatch<React.SetStateAction<TextElement[]>>;
    activeTextElementId: string | null;
    onActiveTextElementIdChange: (id: string | null) => void;
}

const CanvasPreview = forwardRef((props: CanvasPreviewProps, ref) => {
    const { template, cardSize, textElements, onTextElementsChange, activeTextElementId, onActiveTextElementIdChange } = props;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [elementStart, setElementStart] = useState({ x: 0, y: 0 });
    const [isReadyToDraw, setIsReadyToDraw] = useState(false);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        let isMounted = true;
        setIsReadyToDraw(false);
        
        const img = new Image();
        img.crossOrigin = "anonymous";

        img.onload = async () => {
            try {
                // Attempt to load all fonts used in the text elements.
                const fontPromises = textElements.map(el => 
                    document.fonts.load(`${el.bold ? 'bold ' : ''}${el.italic ? 'italic ' : ''}12px "${el.fontFamily}"`)
                );
                await Promise.all(fontPromises);
            } catch (error) {
                // If a font fails to load, log a warning but don't block rendering.
                // The browser will use a fallback font, which is better than showing nothing.
                console.warn("One or more fonts failed to load, but rendering will continue.", error);
            } finally {
                // CRITICAL: Ensure the canvas is made visible even if fonts fail.
                if (isMounted) {
                    imageRef.current = img;
                    setIsReadyToDraw(true);
                }
            }
        };

        // Set src after defining onload to handle cached images correctly.
        img.src = template.path;
        
        return () => { isMounted = false; };
    }, [template.path, textElements]);

    const drawCanvas = useCallback((forExport = false, enhancement = false) => {
        const canvas = canvasRef.current;
        const img = imageRef.current;
        if (!canvas || !img) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        // Background Fill & Image Scaling (Cover logic)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const cardRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        let finalImgWidth, finalImgHeight, offsetX, offsetY;

        if (cardRatio > imgRatio) { // Card is wider than image
            finalImgWidth = canvas.width;
            finalImgHeight = canvas.width / imgRatio;
            offsetX = 0;
            offsetY = (canvas.height - finalImgHeight) / 2;
        } else { // Card is taller than or same aspect as image
            finalImgHeight = canvas.height;
            finalImgWidth = canvas.height * imgRatio;
            offsetY = 0;
            offsetX = (canvas.width - finalImgWidth) / 2;
        }

        const currentScale = Math.max(canvas.width / template.originalWidth, canvas.height / template.originalHeight);
        setScale(currentScale);

        ctx.drawImage(img, offsetX, offsetY, finalImgWidth, finalImgHeight);
        
        if (enhancement) {
            ctx.filter = 'brightness(1.03) saturate(1.05) contrast(1.02)';
            ctx.drawImage(canvas, 0, 0); // Apply filter by drawing canvas on itself
            ctx.filter = 'none'; // Reset filter
        }

        // Text Drawing
        textElements.forEach(el => {
            const scaledX = el.x * currentScale + (cardSize.width - template.originalWidth * currentScale) / 2;
            const scaledY = el.y * currentScale + (cardSize.height - template.originalHeight * currentScale) / 2;
            const scaledFontSize = el.fontSize * currentScale;

            const fontStyle = `${el.italic ? 'italic ' : ''}${el.bold ? 'bold ' : ''}${scaledFontSize}px "${el.fontFamily}"`;
            ctx.font = fontStyle;
            ctx.textAlign = el.textAlign;
            if (ctx.letterSpacing !== undefined) {
                 ctx.letterSpacing = `${(el.letterSpacing || 0) * currentScale}px`;
            }

            ctx.shadowColor = el.shadowColor || 'transparent';
            ctx.shadowBlur = (el.shadowBlur || 0) * currentScale;
            ctx.shadowOffsetX = (el.shadowOffsetX || 0) * currentScale;
            ctx.shadowOffsetY = (el.shadowOffsetY || 0) * currentScale;
            
            if (el.gradientColors && el.gradientColors.length === 2) {
                const gradient = el.gradientDirection === 'horizontal' 
                    ? ctx.createLinearGradient(scaledX - (el.width*currentScale)/2, scaledY, scaledX + (el.width*currentScale)/2, scaledY)
                    : ctx.createLinearGradient(scaledX, scaledY - scaledFontSize, scaledX, scaledY + scaledFontSize);
                gradient.addColorStop(0, el.gradientColors[0]);
                gradient.addColorStop(1, el.gradientColors[1]);
                ctx.fillStyle = gradient;
            } else {
                ctx.fillStyle = el.color;
            }

            ctx.strokeStyle = el.strokeColor || 'transparent';
            ctx.lineWidth = (el.strokeWidth || 0) * currentScale;

            const lines = el.text.split('\n');
            const lineHeight = scaledFontSize * (el.lineHeight || 1.2);

            lines.forEach((line, index) => {
                const yPos = scaledY + (index * lineHeight);
                if (el.strokeWidth && el.strokeWidth > 0) {
                    ctx.strokeText(line, scaledX, yPos);
                }
                ctx.fillText(line, scaledX, yPos);
            });

            ctx.shadowColor = 'transparent';
            if (ctx.letterSpacing !== undefined) {
                 ctx.letterSpacing = '0px';
            }

            if (!forExport && el.id === activeTextElementId) {
                ctx.strokeStyle = 'rgba(236, 72, 153, 0.8)';
                ctx.lineWidth = 2;
                ctx.setLineDash([6, 3]);
                const linesCount = lines.length;
                const totalTextHeight = (linesCount * lineHeight) - (scaledFontSize * ( (el.lineHeight || 1.2) - 1));

                let textBlockXOffset = 0;
                if (el.textAlign === 'center') textBlockXOffset = (el.width*currentScale) / 2;
                else if (el.textAlign === 'right') textBlockXOffset = (el.width*currentScale);
                
                ctx.strokeRect(scaledX - textBlockXOffset - 10, scaledY - scaledFontSize, (el.width*currentScale) + 20, totalTextHeight + 10);
                ctx.setLineDash([]);
            }
        });
    }, [textElements, activeTextElementId, template, cardSize]);
    
    useEffect(() => {
        if (isReadyToDraw) {
            drawCanvas();
        }
    }, [isReadyToDraw, drawCanvas]);

    useImperativeHandle(ref, () => ({
        getImageDataUrl: (): string | null => {
            const canvas = canvasRef.current;
            if (!canvas) return null;
            drawCanvas(true, true); // Draw for export with enhancement
            const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
            drawCanvas(false, false); // Redraw for live preview
            return dataUrl;
        },
        generateImage: (filename: string) => {
            const dataUrl = (ref as any).current.getImageDataUrl();
            if (dataUrl) {
                const link = document.createElement('a');
                const safeFilename = filename.replace(/[^a-z0-9_.-]/gi, '_');
                link.download = `${safeFilename || 'invitation'}.jpg`;
                link.href = dataUrl;
                link.click();
            }
        }
    }));

    const getMousePos = (e: React.MouseEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        };
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        const pos = getMousePos(e);
        const clickedElement = [...textElements].reverse().find(el => {
             const scaledX = el.x * scale + (cardSize.width - template.originalWidth * scale) / 2;
             const scaledY = el.y * scale + (cardSize.height - template.originalHeight * scale) / 2;
             const scaledFontSize = el.fontSize * scale;
             const linesCount = el.text.split('\n').length;
             const lineHeight = scaledFontSize * (el.lineHeight || 1.2);
             const totalTextHeight = (linesCount * lineHeight) - (scaledFontSize * ((el.lineHeight || 1.2) -1) );
             
             let textBlockXOffset = 0;
             if (el.textAlign === 'center') textBlockXOffset = (el.width*scale) / 2;
             else if (el.textAlign === 'right') textBlockXOffset = (el.width*scale);
             
             const box = { x: scaledX - textBlockXOffset, y: scaledY - scaledFontSize, w: el.width*scale, h: totalTextHeight };
             return pos.x > box.x && pos.x < box.x + box.w && pos.y > box.y && pos.y < box.y + box.h;
        });

        if (clickedElement) {
            onActiveTextElementIdChange(clickedElement.id);
            setIsDragging(true);
            setDragStart({ x: pos.x, y: pos.y });
            setElementStart({ x: clickedElement.x, y: clickedElement.y });
        } else {
             onActiveTextElementIdChange(null);
        }
    };
    
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !activeTextElementId) return;
        const pos = getMousePos(e);
        const dx = (pos.x - dragStart.x) / scale;
        const dy = (pos.y - dragStart.y) / scale;
        
        onTextElementsChange(prev => prev.map(el => 
            el.id === activeTextElementId ? { ...el, x: elementStart.x + dx, y: elementStart.y + dy } : el
        ));
    };
    
    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div style={{ position: 'relative', width: '100%', paddingBottom: `${(cardSize.height/cardSize.width) * 100}%` }}>
             {!isReadyToDraw && <div className="absolute inset-0 flex items-center justify-center bg-gray-100">Loading...</div>}
            <canvas
                ref={canvasRef}
                width={cardSize.width}
                height={cardSize.height}
                className={`absolute top-0 left-0 w-full h-full object-contain cursor-grab ${isDragging ? 'cursor-grabbing' : ''} transition-opacity duration-300 ${isReadyToDraw ? 'opacity-100' : 'opacity-0'}`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            />
        </div>
    );
});
CanvasPreview.displayName = 'CanvasPreview';
export default CanvasPreview;
