import { motion } from 'framer-motion';
import { Github, Youtube } from 'lucide-react';
import GitHubGrid from './GitHubGrid';
import './Projects.css';

// Real project images from components folder
import project1Img from './Project1.png';
import project2Img from './Project2.png';
import project3Img from './Project3.png';
import project5Img from './Project5.png';
import project6Img from './Project6.png';

const projects = [
    {
        name: 'AyurSutra',
        description: 'A comprehensive digital Ayurvedic solution for clinics to manage patient records, treatment schedules, and therapy tracking efficiently. The platform integrates modern technology with traditional Ayurvedic practices to streamline clinical workflows. SIH 2025 nominated project.',
        tech: ['Spring Boot', 'MySQL', 'JWT', 'React', 'AI Summarization'],
        image: project1Img,
        github: 'https://github.com/Darkegale12/AyurSutra-Panchakarma-Management-Website-',
        youtube: null,
    },
    {
        name: 'AI Startup Analyzer',
        description: 'An intelligent system that analyzes startup ideas, evaluates market potential, generates actionable insights, and performs autonomous research to assist entrepreneurs in validating and refining their startup concepts.',
        tech: ['Python', 'Tableau', 'RAG', 'SQL'],
        image: project2Img,
        github: 'https://github.com/Darkegale12/Ai-Startup-Analyst',
        youtube: null,
    },
    {
        name: 'Plutus AI',
        description: 'A Cardano Web3 Hackathon Bangalore finalist-nominated project focused on smart marketing solutions using Sukusomi multi-agent systems on the Cardano blockchain. The platform leverages Web3 technologies and multi-agent architecture to create decentralized and intelligent marketing strategies.',
        tech: ['Multi-Agent Systems', 'Web3', 'Cardano', 'Sukusomi'],
        image: project3Img,
        github: 'https://github.com/Darkegale12/Plutus-AI',
        youtube: 'https://www.youtube.com/watch?v=zHRflJDhpro',
    },
    {
        name: 'Student Management System',
        description: 'An enterprise-based student management platform with role-based access control, CRUD operations, and clean architecture for efficient academic data management.',
        tech: ['Spring Boot', 'Hibernate', 'MySQL', 'Thymeleaf'],
        image: '/project3.png',
        github: 'https://github.com/Darkegale12/Spring-Boot-Student-Mangement',
        youtube: null,
    },
    {
        name: 'Splitwise AI',
        description: 'A Mumbai Hackathon nominated project that helps users split bills among friends efficiently. The system uses AI agents and backend APIs to automate expense tracking and simplify group expense management.',
        tech: ['React', 'Python', 'Spring Boot', 'AI Agents', 'API Handling'],
        image: project5Img,
        github: 'https://github.com/Darkegale12/TSEC-Hacks',
        youtube: 'https://www.youtube.com/watch?v=66NoL9VdBX8&t=205s',
    },
    {
        name: 'Library Management System',
        description: 'Developed a Java Hibernate backend using layered architecture (Controller, Service, DAO), integrated REST APIs and MySQL for efficient data management.',
        tech: ['Java', 'Spring Boot', 'REST APIs', 'MySQL'],
        image: project6Img,
        github: 'https://github.com/Darkegale12/Hibernate_Library_Management-Backend-',
        youtube: null,
    },
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
                            className="project-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                        >
                            {/* Image with GitHub icon overlay */}
                            <div className="project-image-wrapper">
                                <img
                                    src={project.image}
                                    alt={project.name}
                                    className="project-image"
                                    loading="lazy"
                                />
                                <div className="project-overlay-links">
                                    {project.youtube && (
                                        <a
                                            href={project.youtube}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-icon-link project-yt-link"
                                            aria-label={`${project.name} YouTube demo`}
                                        >
                                            <Youtube size={18} />
                                        </a>
                                    )}
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-icon-link project-github-link"
                                            aria-label={`${project.name} GitHub repo`}
                                        >
                                            <Github size={18} />
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Card body */}
                            <div className="project-body">
                                <h3 className="project-name">{project.name}</h3>

                                <div className="project-tech">
                                    {project.tech.map((t, i) => (
                                        <span key={i} className="tech-tag">{t}</span>
                                    ))}
                                </div>

                                <p className="project-description">{project.description}</p>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* GitHub Activity — inside projects section */}
                <GitHubGrid />
            </div>
        </section>
    );
};

export default Projects;
