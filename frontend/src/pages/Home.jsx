import { Link } from 'react-router-dom';
import ResolvedGallery from '../components/ResolvedGallery';
import heroImg from '../assets/hero_village.png';
import featuresImg from '../assets/features_smart.png';
import impactImg from '../assets/impact_community.png';

const Home = () => {
    return (
        <div className="home-page-modern">
            {/* Hero Section */}
            <section className="hero-modern" style={{ backgroundImage: `linear-gradient(rgba(10, 25, 47, 0.6), rgba(10, 25, 47, 0.8)), url(${heroImg})` }}>
                <div className="hero-content-modern">
                    <h1 className="hero-title">Welcome to the Future of <br /><span>Village Development</span></h1>
                    <p className="hero-subtitle">A transparent, digital ecosystem empowering citizens to shape their community. Report, track, and witness change in real-time.</p>
                    <div className="hero-actions">
                        <Link to="/register" className="btn-modern btn-glow">Get Started</Link>
                        <Link to="/login" className="btn-modern btn-outline">Login</Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-modern" id="features">
                <div className="features-container">
                    <div className="features-image-wrapper">
                        <img src={featuresImg} alt="Smart Village Features" className="features-img" />
                    </div>
                    <div className="features-text">
                        <h2 className="section-title">Smart Infrastructure, <br/><span>Smarter Governance</span></h2>
                        <div className="features-list">
                            <div className="feature-item">
                                <span className="feature-icon">📍</span>
                                <div>
                                    <h3>Geolocation Reporting</h3>
                                    <p>Pinpoint issues precisely for faster response times.</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">📈</span>
                                <div>
                                    <h3>Live Tracking</h3>
                                    <p>Monitor your grievance status from submission to resolution.</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">📸</span>
                                <div>
                                    <h3>Verified Proof of Work</h3>
                                    <p>Officers upload photo evidence confirming task completion.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact Section */}
            <section className="impact-modern" id="impact">
                <div className="impact-header" style={{ backgroundImage: `linear-gradient(rgba(244, 244, 244, 0.85), rgba(244, 244, 244, 0.95)), url(${impactImg})` }}>
                    <div className="impact-header-content">
                        <h2 className="section-title">Community <br/><span>Impact</span></h2>
                        <p style={{fontSize: '1.2rem', color: '#555'}}>Real change begins with visibility. Explore the issues our administration has successfully resolved below.</p>
                    </div>
                </div>
                <div className="impact-gallery-wrapper">
                    <ResolvedGallery />
                </div>
            </section>
        </div>
    );
};

export default Home;
