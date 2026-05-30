import { motion } from 'framer-motion';
import FancyButton from './formoreButton';
import './GitHubGrid.css';

const GitHubGrid = () => {
    const username = 'Darkegale12';

    return (
        <div className="github-grid" id="github" style={{ marginTop: '30px' }}>
            <div className="container">
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

                    <div className="github-stats" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <FancyButton onClick={() => window.open('https://github.com/Darkegale12?tab=repositories', '_blank')} />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default GitHubGrid;
