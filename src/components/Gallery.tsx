import { motion } from 'framer-motion';
import './Gallery.css';

const galleryImages = [
    'https://picsum.photos/600/400?random=1',
    'https://picsum.photos/600/400?random=2',
    'https://picsum.photos/600/400?random=3',
    'https://picsum.photos/600/400?random=4',
    'https://picsum.photos/600/400?random=5',
    'https://picsum.photos/600/400?random=6',
    'https://picsum.photos/600/400?random=7',
    'https://picsum.photos/600/400?random=8',
    'https://picsum.photos/600/400?random=9'
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
