import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import Hero from './Hero';
import './LaptopScroll.css';

const FRAME_COUNT = 40;

/* Screen region — strictly bounded to fit perfectly inside the physical laptop bezels */
const SCREEN = { left: 0.125, top: 0.095, width: 0.75, height: 0.72 };

const LaptopScroll: React.FC = () => {
    const containerRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loadedCount, setLoadedCount] = useState(0);
    const [screenStyle, setScreenStyle] = useState<React.CSSProperties>({});
    const [screenContentOpacity, setScreenContentOpacity] = useState(0);
    const [scale, setScale] = useState({ x: 1, y: 1, vW: 1200, vH: 650 });

    // Preload frames
    useEffect(() => {
        const preloaded: HTMLImageElement[] = [];
        let count = 0;
        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new Image();
            img.src = `/laptoppme/ezgif-frame-${i.toString().padStart(3, '0')}.jpg`;
            img.onload = () => { count++; setLoadedCount(count); };
            preloaded.push(img);
        }
        setImages(preloaded);
    }, []);

    /* ── Direct scroll tracking (original feel — no spring) ── */
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Animation fills first 55% of scroll; remaining 45% (~270vh) is hold zone
    const frameIndex = useTransform(scrollYProgress, [0, 0.55], [0, FRAME_COUNT - 1]);
    const titleOpacity = useTransform(scrollYProgress, [0, 0.09], [1, 0]);

    /* ── Draw single frame (original approach) ── */
    const drawImage = useCallback((index: number) => {
        if (!canvasRef.current || images.length === 0) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const clamped = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(index)));
        const img = images[clamped];
        if (!img || !img.complete) return;

        // Use the canvas DISPLAY size so cover-fit matches overlay positioning
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const cw = rect.width;
        const ch = rect.height;
        const canvasRatio = cw / ch;
        const imgRatio = img.width / img.height;
        let dw = cw, dh = ch, ox = 0, oy = 0;

        if (canvasRatio > imgRatio) {
            dh = cw / imgRatio;
            oy = (ch - dh) / 2;
        } else {
            dw = ch * imgRatio;
            ox = (cw - dw) / 2;
        }

        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, cw, ch);
        ctx.drawImage(img, ox, oy, dw, dh);
    }, [images]);

    /* ── Compute screen overlay position ── */
    const updateScreenPosition = useCallback(() => {
        if (!canvasRef.current || images.length === 0) return;
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const img = images[FRAME_COUNT - 1];
        if (!img?.complete) return;

        const imgRatio = img.width / img.height;
        const canvasRatio = rect.width / rect.height;
        let dw = rect.width, dh = rect.height, ox = 0, oy = 0;
        if (canvasRatio > imgRatio) {
            dh = rect.width / imgRatio;
            oy = (rect.height - dh) / 2;
        } else {
            dw = rect.height * imgRatio;
            ox = (rect.width - dw) / 2;
        }

        const stickyEl = canvas.closest('.laptop-scroll-sticky');
        if (!stickyEl) return;
        const parentRect = stickyEl.getBoundingClientRect();

        const sl = ox + SCREEN.left * dw + (rect.left - parentRect.left);
        const st = oy + SCREEN.top * dh + (rect.top - parentRect.top);

        const sw = SCREEN.width * dw;
        const sh = SCREEN.height * dh;
        setScreenStyle({
            left: `${sl}px`,
            top: `${st}px`,
            width: `${sw}px`,
            height: `${sh}px`,
        });

        const targetVirtualHeight = 650;
        const uniformScale = sh / targetVirtualHeight;
        const derivedVirtualWidth = sw / uniformScale;
        
        setScale({ x: uniformScale, y: uniformScale, vW: derivedVirtualWidth, vH: targetVirtualHeight });
    }, [images]);

    // Initial draw
    useEffect(() => {
        if (loadedCount === FRAME_COUNT) {
            drawImage(0);
            updateScreenPosition();
        }
    }, [loadedCount, drawImage, updateScreenPosition]);

    // Frame updates (fires while animation is progressing)
    useMotionValueEvent(frameIndex, "change", (latest) => {
        if (loadedCount < FRAME_COUNT) return;
        requestAnimationFrame(() => drawImage(latest));
    });

    // Full scroll progress — handles opacity + hold zone
    useMotionValueEvent(scrollYProgress, "change", (progress) => {
        if (loadedCount < FRAME_COUNT) return;
        updateScreenPosition();
        const opacity = Math.max(0, Math.min(1, (progress - 0.46) / 0.09));
        setScreenContentOpacity(opacity);
        // Keep last frame drawn during hold zone
        if (progress > 0.55) {
            requestAnimationFrame(() => drawImage(FRAME_COUNT - 1));
        }
    });

    // Resize
    useEffect(() => {
        const handleResize = () => {
            if (loadedCount === FRAME_COUNT) {
                const f = Math.round(Math.min(FRAME_COUNT - 1, Math.max(0, frameIndex.get())));
                requestAnimationFrame(() => { drawImage(f); updateScreenPosition(); });
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [loadedCount, frameIndex, drawImage, updateScreenPosition]);

    return (
        <section ref={containerRef} className="laptop-scroll-section" id="laptop-scroll">
            <div className="laptop-scroll-sticky">
                {loadedCount < FRAME_COUNT && (
                    <div className="laptop-scroll-loader">
                        <div className="laptop-scroll-spinner" />
                        <p className="laptop-scroll-loading-text">
                            Loading Cinematic Experience ({Math.round((loadedCount / FRAME_COUNT) * 100)}%)
                        </p>
                    </div>
                )}

                <div className="laptop-canvas-wrapper">
                    <canvas ref={canvasRef} className="laptop-scroll-canvas" />
                </div>

                {loadedCount === FRAME_COUNT && (
                    <motion.div className="laptop-scroll-title" style={{ opacity: titleOpacity }}>
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                        >
                            VISHWAJEET
                        </motion.span>
                    </motion.div>
                )}

                {loadedCount === FRAME_COUNT && screenContentOpacity > 0 && (
                    <div
                        className="laptop-screen-overlay"
                        style={{ 
                            ...screenStyle, 
                            opacity: screenContentOpacity,
                            pointerEvents: screenContentOpacity > 0.5 ? 'auto' : 'none'
                        }}
                    >
                        <div className="laptop-screen-glow" />
                        <div 
                            className="laptop-screen-virtual-container"
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: `${scale.vW}px`,
                                height: `${scale.vH}px`,
                                transform: `scale(${scale.x}, ${scale.y})`,
                                transformOrigin: '0 0',
                                overflow: 'hidden',
                                backgroundColor: '#000'
                            }}
                        >
                            <Hero id="hero-mini" />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default LaptopScroll;
