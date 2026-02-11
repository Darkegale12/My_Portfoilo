import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import './GitHubGrid.css';

const GitHubGrid = () => {
    const username = 'Darkegale12';

    return (
        <section className="section github-grid" id="github">
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    GitHub Activity
                </motion.h2>

                <motion.div
                    className="github-content"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="github-graph-container">
                        <img
                            src={`https://ghchart.rshah.org/3b82f6/${username}`}
                            alt="GitHub Contribution Graph"
                            className="github-graph"
                        />
                    </div>

                    <div className="github-stats">
                        <a
                            href={`https://github.com/${username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="github-profile-link"
                        >
                            <Github size={20} />
                            <span>View Full Profile</span>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default GitHubGrid;
