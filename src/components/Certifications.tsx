import { motion } from 'framer-motion';
import { Award, BadgeCheck } from 'lucide-react';
import './Certifications.css';

const certifications = [
    {
        title: 'NPTEL Elite Certificate',
        issuer: 'NPTEL / IIT',
        highlight: 'Top 5%',
        icon: Award
    },
    {
        title: 'Postman Student Expert',
        issuer: 'Postman',
        highlight: 'API Testing',
        icon: BadgeCheck
    },
    {
        title: 'IBM Generative AI Fundamentals',
        issuer: 'IBM',
        highlight: 'GenAI',
        icon: BadgeCheck
    }
];

const Certifications = () => {
    return (
        <section className="section certifications" id="certifications">
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Certifications
                </motion.h2>

                <div className="certifications-grid">
                    {certifications.map((cert, index) => {
                        const IconComponent = cert.icon;
                        return (
                            <motion.div
                                key={index}
                                className="certification-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="certification-icon">
                                    <IconComponent size={24} />
                                </div>
                                <div className="certification-content">
                                    <h3 className="certification-title">{cert.title}</h3>
                                    <p className="certification-issuer">{cert.issuer}</p>
                                </div>
                                <span className="certification-highlight">{cert.highlight}</span>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
