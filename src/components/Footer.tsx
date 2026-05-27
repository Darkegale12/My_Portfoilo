import { useState, useEffect } from 'react';
import { Eye, Users } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    const [visits, setVisits] = useState(58);
    const [liveWatchers, setLiveWatchers] = useState(1);

    useEffect(() => {
        // Use local storage to simulate visits counter persisting and incrementing locally
        const storedVisits = localStorage.getItem('portfolio_visits');
        if (storedVisits) {
            const nextVisits = Math.max(parseInt(storedVisits) + 1, 58);
            setVisits(nextVisits);
            localStorage.setItem('portfolio_visits', nextVisits.toString());
        } else {
            setVisits(59); // Start at 58 + 1 for current visit
            localStorage.setItem('portfolio_visits', '59');
        }

        // Simulate live watchers fluctuating slightly
        const interval = setInterval(() => {
            setLiveWatchers(prev => {
                const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or +1
                const next = prev + change;
                return next > 0 ? next : 1; // keep it at least 1
            });
        }, 12000); 

        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="visitor-stats">
                    <div className="stat-item">
                        <Users size={14} className="stat-icon" />
                        <span>Visits: {visits}</span>
                    </div>
                    <div className="stat-item">
                        <span className="live-indicator"></span>
                        <Eye size={14} className="stat-icon" />
                        <span>Active: {liveWatchers}</span>
                    </div>
                </div>
                
                <div className="footer-content">
                    <p className="footer-name">Vishwajeet More</p>
                    <p className="footer-location">Pune, India</p>
                    <p className="footer-year">© {currentYear}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
