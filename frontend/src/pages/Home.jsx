import { Link } from 'react-router-dom';
import ResolvedGallery from '../components/ResolvedGallery';
import heroImg from '../assets/hero_corporate.png';
import featuresImg from '../assets/features_minimal.png';
import impactImg from '../assets/impact_real.png';

const Home = () => {
    return (
        <div className="home-page-modern">
            {/* Hero Section */}
            <section className="hero-modern" style={{ backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.8)), url(${heroImg})` }}>
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
                <div className="features-header" style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <h2 className="section-title">Smart Infrastructure, <br/><span>Smarter Governance</span></h2>
                    <p className="hero-subtitle" style={{ color: '#64748B', maxWidth: '600px', margin: '0 auto' }}>A complete digital toolkit bridging the gap between citizens and administration.</p>
                </div>
                <div className="features-grid-modern">
                    <div className="feature-card-modern">
                        <span className="feature-card-icon">📍</span>
                        <h3>Geolocation Reporting</h3>
                        <p>Pinpoint issues precisely on the map for faster response times and accurate tracking.</p>
                    </div>
                    <div className="feature-card-modern">
                        <span className="feature-card-icon">📈</span>
                        <h3>Live Tracking</h3>
                        <p>Monitor your grievance status from submission to resolution in real-time.</p>
                    </div>
                    <div className="feature-card-modern">
                        <span className="feature-card-icon">📸</span>
                        <h3>Verified Proof of Work</h3>
                        <p>Officers upload photo evidence confirming task completion for full transparency.</p>
                    </div>
                </div>
            </section>

            {/* Impact Section */}
            <section className="impact-modern" id="impact">
                <div className="impact-header" style={{ backgroundImage: `url(${impactImg})` }}>
                    <div className="impact-header-content">
                        <h2 className="section-title">Community <br/><span>Impact</span></h2>
                        <p>Real change begins with visibility. Explore the issues our administration has successfully resolved below.</p>
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
