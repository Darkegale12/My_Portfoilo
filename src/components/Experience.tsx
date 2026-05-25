import { motion } from 'framer-motion';
import './Experience.css';

const experiences = [
    {
        role: 'Software Development Engineer Intern (Remote)',
        organization: 'Arsha Consultancy LLC, USA',
        period: 'Jan 2026 – Present',
        bullets: [
            'Developing dynamic dashboards and interactive mapping solutions for real-world applications.',
            'Currently contributing to the PCMC project, focusing on scalable web solutions and data-driven visualization systems deployed in production environments.'
        ],
        tech: 'Web Solutions, Data Visualization, Mapping'
    },
    {
        role: 'Web Development Head (On Campus)',
        organization: 'Google Developers Group — MMCOE',
        period: '2025 – Present',
        bullets: [
            'Leading web development initiatives and organizing technical activities within the Google Developers Group campus chapter.'
        ],
        tech: 'Web Development, Leadership'
    },
    {
        role: 'Backend Intern',
        organization: 'SPCL',
        period: 'Aug 2025 – Oct 2025',
        bullets: [
            'Developed backend modules using Core Java and collaborated with the engineering team on ERP system enhancements.',
            'Gained practical exposure to enterprise backend architecture, code integration, and real-world deployment workflows.'
        ],
        tech: 'Core Java, Enterprise Architecture, ERP Systems'
    },
    {
        role: 'GirlScript Summer of Code Contributor',
        organization: 'Open Source Connect',
        period: '2025',
        bullets: [
            'Contributed to open-source repositories while learning collaborative development workflows using Git and GitHub.',
            'Implemented Firebase Authentication and explored GitHub Actions for automated CI/CD workflows.'
        ],
        tech: 'Git, GitHub Actions, Firebase, CI/CD'
    }
];

const Experience = () => {
    return (
        <section className="section experience" id="experience">
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Experience
                </motion.h2>

                <div className="experience-list">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            className="experience-item"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="experience-timeline">
                                <div className="timeline-dot" />
                                {index < experiences.length - 1 && <div className="timeline-line" />}
                            </div>

                            <div className="experience-content">
                                <div className="experience-header">
                                    <div>
                                        <h3 className="experience-role">{exp.role}</h3>
                                        <p className="experience-org">{exp.organization}</p>
                                    </div>
                                    <span className="experience-period">{exp.period}</span>
                                </div>

                                <ul className="experience-bullets">
                                    {exp.bullets.map((bullet, i) => (
                                        <li key={i}>{bullet}</li>
                                    ))}
                                </ul>

                                <p className="experience-tech">{exp.tech}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
