import { motion } from 'framer-motion';
import { Award, BadgeCheck, ArrowUpRight } from 'lucide-react';
import './Certifications.css';

const certifications = [
    {
        title: 'Postman Student Expert',
        issuer: 'Postman',
        highlight: 'API Fundamentals',
        icon: BadgeCheck,
        link: 'https://badges.parchment.com/public/assertions/nRl9iczgTaq0HI67KZ-gpQ'
    },
    {
        title: 'Graduate Diploma in IT',
        issuer: 'NASSCOM Foundation',
        highlight: 'C, C++, SQL',
        icon: BadgeCheck,
        link: 'https://drive.google.com/file/d/15UnwsJxZL_ugR_Hwfx4BKQDdJpn0-6Zn/view'
    },
    {
        title: 'AWS Certification',
        issuer: 'Amazon Web Services',
        highlight: 'Cloud',
        icon: BadgeCheck,
        link: 'https://www.credly.com/badges/f85af416-4ae6-4635-ae77-402ef94cc33e'
    },
    {
        title: 'IBM GenAI Fundamentals',
        issuer: 'IBM',
        highlight: 'GenAI',
        icon: BadgeCheck,
        link: '#' // ibm keep imb generative ai course link
    },
    {
        title: 'Internal Smart India Hackathon',
        issuer: 'Smart India Hackathon',
        highlight: 'SIH',
        icon: Award,
        link: 'https://drive.google.com/file/d/1cnXmZBIBo3knru7osxvAU-zIByE49y80/view?usp=sharing'
    },
    {
        title: 'NPTEL Elite Certificate',
        issuer: 'NPTEL / IIT',
        highlight: 'Top 5%',
        icon: Award,
        link: 'https://archive.nptel.ac.in/noc/Ecertificate/?q=NPTEL25CS34S55520414904312662'
    },
    {
        title: 'University Topper',
        issuer: 'University',
        highlight: 'Academic',
        icon: Award,
        link: 'https://drive.google.com/file/d/1f_F1CB9LsXdpgz00mNAumWRBrZVDQ2nW/view'
    },
    {
        title: 'State-Level Gymnastics',
        issuer: 'State Sports Authority',
        highlight: 'Sports',
        icon: Award,
        link: 'https://drive.google.com/file/d/1eMwGMDDoTLn0v2C6i-G8kJwq38Io1eW1/view'
    }
];

const Certifications = () => {
    return (
        <section className="section certifications" id="certifications">
            <div className="container" style={{ maxWidth: '1200px' }}>
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
                            <motion.a
                                key={index}
                                href={cert.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="certification-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                            >
                                <div className="certification-header">
                                    <div className="certification-icon">
                                        <IconComponent size={20} />
                                    </div>
                                    <span className="certification-highlight">{cert.highlight}</span>
                                </div>
                                <div className="certification-content">
                                    <div className="certification-title-container">
                                        <h3 className="certification-title">{cert.title}</h3>
                                        <div className="certification-link-circle">
                                            <ArrowUpRight size={14} />
                                        </div>
                                    </div>
                                    <p className="certification-issuer">{cert.issuer}</p>
                                </div>
                            </motion.a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
