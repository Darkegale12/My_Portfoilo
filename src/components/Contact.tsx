import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, ArrowUpRight } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    return (
        <section className="section contact" id="contact">
            <div className="container">
                <motion.div
                    className="contact-content"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="contact-title">Let's build something impactful.</h2>
                    <p className="contact-description">
                        I'm currently open to new opportunities and interesting projects.
                        Whether you have a question or just want to say hi, my inbox is always open.
                    </p>

                    <div className="contact-links">
                        <a
                            href="mailto:vishwajeet12.messi@gmail.com"
                            className="contact-link"
                        >
                            <Mail size={20} />
                            <span>vishwajeet12.messi@gmail.com</span>
                            <ArrowUpRight size={16} className="link-arrow" />
                        </a>

                        <a
                            href="https://www.linkedin.com/in/vishwajeet-more-68178a328"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-link"
                        >
                            <Linkedin size={20} />
                            <span>LinkedIn</span>
                            <ArrowUpRight size={16} className="link-arrow" />
                        </a>

                        <a
                            href="https://github.com/Darkegale12"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-link"
                        >
                            <Github size={20} />
                            <span>GitHub</span>
                            <ArrowUpRight size={16} className="link-arrow" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
