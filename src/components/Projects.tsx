import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import './Projects.css';

const projects = [
    {
        name: 'AyurSutra',
        tagline: 'Panchakarma Management System',
        description: 'A comprehensive digital solution for Ayurvedic clinics to manage patient records, treatment schedules, and therapy tracking. SIH 2024 nominated project addressing real healthcare challenges.',
        tech: ['Spring Boot', 'React', 'MySQL', 'REST APIs', 'JWT Auth'],
        github: 'https://github.com/Darkegale12',
        live: null,
        featured: true
    },
    {
        name: 'AI Startup Analyzer',
        tagline: 'Multi-agent AI system for startup evaluation',
        description: 'Built an intelligent system using AI agents to analyze startups, evaluate market potential, and provide actionable insights. Features autonomous research and report generation.',
        tech: ['Spring Boot', 'Python', 'Gemini API', 'React', 'PostgreSQL'],
        github: 'https://github.com/Darkegale12',
        live: null,
        featured: true
    },
    {
        name: 'Student Management System',
        tagline: 'Full-stack CRUD application',
        description: 'Enterprise-grade student management platform with role-based access control, comprehensive CRUD operations, and clean RESTful API architecture.',
        tech: ['Spring Boot', 'Hibernate', 'MySQL', 'Thymeleaf', 'Bootstrap'],
        github: 'https://github.com/Darkegale12',
        live: null,
        featured: false
    },
    {
        name: 'GPT Clone Chatbot',
        tagline: 'AI-powered conversational interface',
        description: 'Modern chatbot application powered by Google Gemini API with streaming responses, conversation history, and a polished user interface.',
        tech: ['React', 'Node.js', 'Gemini API', 'TypeScript', 'CSS3'],
        github: 'https://github.com/Darkegale12',
        live: null,
        featured: false
    }
];

const Projects = () => {
    return (
        <section className="section projects" id="projects">
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Projects
                </motion.h2>

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <motion.article
                            key={index}
                            className={`project-card ${project.featured ? 'featured' : ''}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="project-content">
                                <div className="project-header">
                                    <h3 className="project-name">{project.name}</h3>
                                    <div className="project-links">
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="project-link"
                                                aria-label="View on GitHub"
                                            >
                                                <Github size={20} />
                                            </a>
                                        )}
                                        {project.live && (
                                            <a
                                                href={project.live}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="project-link"
                                                aria-label="View live demo"
                                            >
                                                <ExternalLink size={20} />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <p className="project-tagline">{project.tagline}</p>
                                <p className="project-description">{project.description}</p>

                                <div className="project-tech">
                                    {project.tech.map((tech, i) => (
                                        <span key={i} className="tech-tag">{tech}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
