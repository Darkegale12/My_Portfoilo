import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import herosME from './herosME.png';
import './EarthHero.css';

const EarthHero = () => {
    const ref = useRef<HTMLDivElement>(null);
    
    // Track scroll progress within this section
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    // Move the text down by 300px as the user scrolls, ducking it behind the planet
    const titleY = useTransform(scrollYProgress, [0, 1], [0, 300]);

    return (
        <section ref={ref} className="earth-hero-section">
            <div className="stars-layer"></div>
            
            <motion.h1 
                className="earth-hero-title"
                style={{ y: titleY }}
            >
                VISHWAJEET
            </motion.h1>
            
            {/* Wrapper forces the planet to stay within horizontal bounds and correctly z-indexed */}
            <div className="earth-horizon-wrapper">
                <div className="earth-horizon-container">
                    <div className="earth-texture"></div>
                    <div className="sun-flare-minimal"></div>
                    {/* Overlay to fade the earth down into black */}
                    <div className="earth-fade-overlay"></div>
                </div>
            </div>

            <div className="earth-hero-me">
                <img src={herosME} alt="Hero" />
            </div>
        </section>
    );
};

export default EarthHero;
