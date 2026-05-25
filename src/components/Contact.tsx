import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        // Set canvas size correctly matching its CSS size
        const setCanvasSize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        // Constellation properties
        const stars: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
        const numStars = 40; // Reduced from 100
        const maxDistance = 120; // Reduced from 150

        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.3, // Slower motion
                vy: (Math.random() - 0.5) * 0.3,
                radius: Math.random() * 1.5 + 0.5,
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update & draw stars
            for (let i = 0; i < stars.length; i++) {
                const star = stars[i];

                star.x += star.vx;
                star.y += star.vy;

                // Bounce off edges
                if (star.x < 0 || star.x > canvas.width) star.vx *= -1;
                if (star.y < 0 || star.y > canvas.height) star.vy *= -1;

                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
                ctx.fill();

                // Draw lines between nearby stars
                for (let j = i + 1; j < stars.length; j++) {
                    const star2 = stars[j];
                    const dx = star.x - star2.x;
                    const dy = star.y - star2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        ctx.beginPath();
                        ctx.moveTo(star.x, star.y);
                        ctx.lineTo(star2.x, star2.y);
                        const opacity = (1 - distance / maxDistance) * 0.25; // Much lower opacity
                        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', setCanvasSize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section className="section contact-section" id="contact">
            <div className="contact-box">
                <canvas ref={canvasRef} className="constellation-canvas" />
                
                <div className="contact-overlay">
                    <div className="contact-main">
                        <motion.h2 
                            className="contact-title"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            Exploring new challenges
                        </motion.h2>

                        <motion.a 
                            href="https://www.linkedin.com/in/vishwajeet-more-68178a328"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-btn"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            Contact
                        </motion.a>
                    </div>

                    <div className="contact-bottom">
                        <span className="contact-email">vishwajeet12.messi@gmail.com</span>
                        
                        <div className="contact-socials">
                            <a href="mailto:vishwajeet12.messi@gmail.com" aria-label="Email" className="social-icon-btn">
                                <Mail size={24} />
                            </a>
                            <a href="https://www.linkedin.com/in/vishwajeet-more-68178a328" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon-btn">
                                <Linkedin size={24} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
