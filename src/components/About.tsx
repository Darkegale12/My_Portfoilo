import { motion } from 'framer-motion';
import './About.css';

const About = () => {
    return (
        <section className="section about" id="about">
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    About Me
                </motion.h2>

                <motion.div
                    className="about-content"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <p className="about-text">
                        I'm a <strong>backend-focused full-stack engineer</strong> based in Pune, India,
                        currently pursuing my degree with a <strong>perfect 10 CGPA</strong>. My passion lies
                        in building robust, scalable systems that solve real-world problems.
                    </p>

                    <p className="about-text">
                        With strong foundations in <strong>Java, Spring Boot, and REST APIs</strong>, I architect
                        solutions that prioritize clean code, performance, and maintainability. Recently, I've been
                        exploring the intersection of backend engineering and AI, building intelligent systems
                        powered by LLMs and AI agents.
                    </p>

                    <p className="about-text">
                        As the <strong>Web Development Head at GDG on Campus</strong>, I lead developer communities,
                        mentor aspiring engineers, and organize hackathons that bring together the brightest minds
                        to build innovative solutions.
                    </p>

                    <p className="about-text about-cta">
                        I'm always interested in challenging projects and opportunities to grow. Let's connect.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
