import { motion } from 'framer-motion';
import './Skills.css';

// Using shields.io badges with devicon logos - same style as reference image
const skillCategories = [
    {
        title: 'Full Stack',
        skills: [
            { name: 'Spring Boot', icon: 'springboot', color: '6DB33F' },
            { name: 'Hibernate', icon: 'hibernate', color: '59666C' },
            { name: 'MySQL', icon: 'mysql', color: '4479A1' },
            { name: 'Angular', icon: 'angular', color: 'DD0031' },
            { name: 'React', icon: 'react', color: '61DAFB' },
            { name: 'JDBC', icon: 'java', color: '007396' },
            { name: 'Redis', icon: 'redis', color: 'DC382D' },
            { name: 'Docker', icon: 'docker', color: '2496ED' },
            { name: 'AWS', icon: 'amazonaws', color: '232F3E' },
            { name: 'HTML5', icon: 'html5', color: 'E34F26' }
        ]
    },
    {
        title: 'AI & Data',
        skills: [
            { name: 'Python', icon: 'python', color: '3776AB' },
            { name: 'Scikit--learn', icon: 'scikitlearn', color: 'F7931E' },
            { name: 'TensorFlow', icon: 'tensorflow', color: 'FF6F00' },
            { name: 'Deep Learning', icon: 'pytorch', color: 'EE4C2C' },
            { name: 'Neural Networks', icon: 'opencv', color: '5C3EE8' },
            { name: 'LangChain', icon: 'langchain', color: '1C3C3C' },
            { name: 'LangGraph', icon: 'openai', color: '412991' },
            { name: 'Data Analytics', icon: 'pandas', color: '150458' },
            { name: 'API Handling', icon: 'fastapi', color: '009688' },
            { name: 'API Testing', icon: 'postman', color: 'FF6C37' },
            { name: 'Google Colab', icon: 'googlecolab', color: 'F9AB00' },
            { name: 'Kaggle', icon: 'kaggle', color: '20BEFF' }
        ]
    },
    {
        title: 'Tools & Platforms',
        skills: [
            { name: 'Git', icon: 'git', color: 'F05032' },
            { name: 'GitHub', icon: 'github', color: '181717' },
            { name: 'Postman', icon: 'postman', color: 'FF6C37' },
            { name: 'VS Code', icon: 'visualstudiocode', color: '007ACC' },
            { name: 'Eclipse', icon: 'eclipse', color: '2C2255' },
            { name: 'Maven', icon: 'apachemaven', color: 'C71A36' },
            { name: 'Vercel', icon: 'vercel', color: '000000' },
            { name: 'MySQL Workbench', icon: 'mysql', color: '4479A1' }
        ]
    }
];

const Skills = () => {
    return (
        <section className="section skills" id="skills">
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Skills & Technologies
                </motion.h2>

                <div className="skills-categories">
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={index}
                            className="skill-category"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <h3 className="skill-category-title">{category.title}</h3>
                            <div className="skill-items">
                                {category.skills.map((skill, i) => (
                                    <img
                                        key={i}
                                        src={`https://img.shields.io/badge/${skill.name.replace(/ /g, '%20')}-${skill.color}?style=for-the-badge&logo=${skill.icon}&logoColor=white`}
                                        alt={skill.name}
                                        className="skill-badge-img"
                                    />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
