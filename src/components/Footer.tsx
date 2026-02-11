import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
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
