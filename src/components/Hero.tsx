import { motion } from 'framer-motion';
import { ArrowDown, FileText } from 'lucide-react';
import VariableProximity from './VariableProximity';
import ProfileCard from './ProfileCard';
import profilePic from './profilePic.jpeg';
import './Hero.css';

interface HeroProps {
    id?: string;
}

const Hero = ({ id = "hero" }: HeroProps) => {
    const scrollToProjects = () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="hero" id={id}>
            <div className="container hero-container">
                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <motion.div
                        className="hero-title"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <VariableProximity
                            label="Vishwajeet More"
                            className="hero-name-proximity"
                            fromFontVariationSettings="'wght' 400"
                            toFontVariationSettings="'wght' 900"
                            radius={150}
                            falloff="linear"
                        />
                    </motion.div>

                    <motion.h2
                        className="hero-subtitle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <span>Full-Stack Engineer</span>
                        <span className="dot-separator">●</span>
                        <span>AI-ML</span>
                        <span className="dot-separator">●</span>
                        <span>AI Agents</span>
                    </motion.h2>

                    <motion.p
                        className="hero-description"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <img 
                            src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=24&pause=500&duration=2000&width=800&lines=AI+%26+ML+Explorer;Full-Stack+Developer;Building+Intelligent+%26+Scalable+Solutions;Always+Learning+New+Tech" 
                            alt="Typing Effect" 
                            style={{ maxWidth: '100%', height: 'auto' }} 
                        />
                    </motion.p>

                    <motion.div
                        className="hero-tech"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <span>Spring Boot</span>
                        <span className="separator">·</span>
                        <span>MySQL</span>
                        <span className="separator">·</span>
                        <span>React</span>
                        <span className="separator">·</span>
                        <span>AI Agents</span>
                        <span className="separator">·</span>
                        <span>LangGraph</span>
                    </motion.div>

                    <motion.div
                        className="hero-actions"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <button className="btn btn-primary" onClick={scrollToProjects}>
                            View Projects
                            <ArrowDown size={16} />
                        </button>
                        <a
                            href="/updating_resume.pdf"
                            className="btn btn-secondary"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FileText size={16} />
                            Download Resume
                        </a>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="hero-profile-card"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
                >
                    <ProfileCard
                        avatarUrl={profilePic}
                        name="Vishwajeet More"
                        title="Full-Stack Engineer"
                        handle="vishwajeet"
                        status="Available for work"
                        contactText="Contact Me"
                        showUserInfo={true}
                        enableTilt={true}
                        behindGlowEnabled={true}
                        behindGlowColor="rgba(100,149,237,0.5)"
                        onContactClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
