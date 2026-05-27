import { motion } from 'framer-motion';
import './Gallery.css';

// Import local images from src/galeryy
import img1 from '../galeryy/WhatsApp Image 2026-05-27 at 12.12.15 AM (1).jpeg';
import img2 from '../galeryy/WhatsApp Image 2026-05-27 at 12.12.15 AM (2).jpeg';
import img3 from '../galeryy/WhatsApp Image 2026-05-27 at 12.12.15 AM (3).jpeg';
import img4 from '../galeryy/WhatsApp Image 2026-05-27 at 12.12.15 AM (4).jpeg';
import img5 from '../galeryy/WhatsApp Image 2026-05-27 at 12.12.15 AM (5).jpeg';
import img6 from '../galeryy/WhatsApp Image 2026-05-27 at 12.12.15 AM (6).jpeg';
import img7 from '../galeryy/WhatsApp Image 2026-05-27 at 12.12.15 AM (7).jpeg';
import img8 from '../galeryy/WhatsApp Image 2026-05-27 at 12.12.15 AM.jpeg';
import img9 from '../galeryy/WhatsApp Image 2026-05-27 at 12.12.17 AM (1).jpeg';
import img10 from '../galeryy/WhatsApp Image 2026-05-27 at 12.12.17 AM (2).jpeg';
import img11 from '../galeryy/WhatsApp Image 2026-05-27 at 12.12.17 AM.jpeg';
import img12 from '../galeryy/WhatsApp Image 2026-05-27 at 12.12.18 AM.jpeg';
import img13 from '../galeryy/WhatsApp Image 2026-05-27 at 12.12.20 AM (1).jpeg';
import img14 from '../galeryy/WhatsApp Image 2026-05-27 at 12.12.20 AM (2).jpeg';
import img15 from '../galeryy/WhatsApp Image 2026-05-27 at 12.12.20 AM.jpeg';

const galleryImages = [
    img1,
    img9,
    img2,
    img13,
    img3,
    img10,
    img4,
    img14,
    img5,
    img11,
    img6,
    img12,
    img7,
    img15,
    img8
];

const Gallery = () => {
    // Duplicate the images array to create an infinite seamless loop
    const marqueeImages = [...galleryImages, ...galleryImages];

    return (
        <section className="section gallery-section" id="gallery">
            <div className="container" style={{ maxWidth: '100%', padding: 0 }}>
                <motion.h2
                    className="section-title gallery-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    style={{ paddingLeft: 'var(--space-lg)', paddingRight: 'var(--space-lg)', maxWidth: '1200px', margin: '0 auto var(--space-2xl) auto' }}
                >
                    Gallery
                </motion.h2>

                <div className="gallery-marquee-container">
                    <div className="gallery-marquee">
                        {marqueeImages.map((src, index) => (
                            <div key={index} className="gallery-item-wrapper">
                                <img
                                    src={src}
                                    alt={`Gallery Item ${index + 1}`}
                                    className="gallery-image"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Gallery;
