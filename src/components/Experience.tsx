import { motion } from 'framer-motion';
import './Experience.css';

const experiences = [
    {
        role: 'Web Development Head',
        organization: 'Google Developer Group on Campus - MMCOE',
        period: '2024 - Present',
        bullets: [
            'Leading web development initiatives and mentoring 50+ student developers',
            'Organized and led hackathons with 200+ participants, driving innovation in the tech community'
        ],
        tech: 'React, TypeScript, Spring Boot, Firebase'
    },
    {
        role: 'Open Source Contributor',
        organization: 'GirlScript Summer of Code (GSSoC)',
        period: '2024',
        bullets: [
            'Contributed to multiple open-source projects, improving documentation and adding features',
            'Collaborated with maintainers globally, following best practices in code review and Git workflows'
        ],
        tech: 'Java, Python, JavaScript, Git'
    },
    {
        role: 'Hackathon Leader & Winner',
        organization: 'Multiple National Hackathons',
        period: '2023 - Present',
        bullets: [
            'Led teams to victory in SIH internal rounds and multiple inter-college hackathons',
            'Developed full-stack solutions under 24-48 hour constraints with production-ready code'
        ],
        tech: 'Spring Boot, React, MySQL, Docker'
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
