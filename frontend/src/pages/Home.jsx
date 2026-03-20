import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import ResolvedGallery from '../components/ResolvedGallery';
import heroImg from '../assets/hero_corporate.png';
import impactImg from '../assets/impact_real.png';

/* Animated counter hook */
const useCounter = (target, duration = 2000) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let start = 0;
                    const step = target / (duration / 16);
                    const timer = setInterval(() => {
                        start += step;
                        if (start >= target) {
                            setCount(target);
                            clearInterval(timer);
                        } else {
                            setCount(Math.floor(start));
                        }
                    }, 16);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target, duration]);

    return [count, ref];
};

/* Scroll reveal hook */
const useReveal = () => {
    const ref = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.15 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);
    return ref;
};

const Home = () => {
    const featuresRef = useReveal();
    const stepsRef = useReveal();
    const statsRef = useReveal();

    const [complaints, complaintsCounterRef] = useCounter(500);
    const [resolved, resolvedCounterRef] = useCounter(420);
    const [officers, officersCounterRef] = useCounter(35);
    const [villages, villagesCounterRef] = useCounter(12);

    return (
        <div className="hp">
            {/* ===== HERO ===== */}
            <section className="hp-hero" style={{ backgroundImage: `url(${heroImg})` }}>
                <div className="hp-hero-overlay" />
                <div className="hp-hero-orb hp-hero-orb--1" />
                <div className="hp-hero-orb hp-hero-orb--2" />
                <div className="hp-hero-content">
                    <h1>
                        Empowering Villages,<br />
                        <span className="hp-gradient-text">One Complaint at a Time.</span>
                    </h1>
                    <p>
                        A transparent, AI-ready civic platform where citizens report, officers resolve, and communities grow — all in real-time.
                    </p>
                    <div className="hp-hero-btns">
                        <Link to="/register" className="hp-btn hp-btn--primary">
                            Get Started Free →
                        </Link>
                        <Link to="/login" className="hp-btn hp-btn--ghost">
                            Login to Dashboard
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===== STATS BAR ===== */}
            <section className="hp-stats" ref={statsRef}>
                <div className="hp-stats-inner reveal-item">
                    <div className="hp-stat" ref={complaintsCounterRef}>
                        <span className="hp-stat-num">{complaints}+</span>
                        <span className="hp-stat-label">Complaints Filed</span>
                    </div>
                    <div className="hp-stat" ref={resolvedCounterRef}>
                        <span className="hp-stat-num">{resolved}+</span>
                        <span className="hp-stat-label">Issues Resolved</span>
                    </div>
                    <div className="hp-stat" ref={officersCounterRef}>
                        <span className="hp-stat-num">{officers}+</span>
                        <span className="hp-stat-label">Active Officers</span>
                    </div>
                    <div className="hp-stat" ref={villagesCounterRef}>
                        <span className="hp-stat-num">{villages}+</span>
                        <span className="hp-stat-label">Villages Covered</span>
                    </div>
                </div>
            </section>

            {/* ===== FEATURES ===== */}
            <section className="hp-features" ref={featuresRef}>
                <div className="hp-section-header reveal-item">
                    <span className="hp-overline">WHY CHOOSE US</span>
                    <h2>Built for <span className="hp-gradient-text">Real Impact</span></h2>
                    <p>Everything a modern civic system needs — designed to make governance transparent and citizens powerful.</p>
                </div>
                <div className="hp-features-grid reveal-item">
                    {[
                        { icon: '📍', title: 'GPS Mapping', desc: 'Auto-detect locations to pinpoint issues with precision.' },
                        { icon: '📸', title: 'Photo Evidence', desc: 'Officers upload proof — full accountability guaranteed.' },
                        { icon: '📈', title: 'Live Tracking', desc: 'Watch your complaint move from filed → in-progress → resolved.' },
                        { icon: '💬', title: 'Citizen Feedback', desc: 'Rate & review every resolution. Your voice matters.' },
                        { icon: '🛡️', title: 'Role-Based Access', desc: 'Separate dashboards for citizens, officers & admins.' },
                        { icon: '⚡', title: 'Instant Alerts', desc: 'Real-time toast notifications for every action taken.' },
                    ].map((f, i) => (
                        <div className="hp-feature-card" key={i} style={{ animationDelay: `${i * 0.08}s` }}>
                            <div className="hp-feature-icon">{f.icon}</div>
                            <h3>{f.title}</h3>
                            <p>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== HOW IT WORKS ===== */}
            <section className="hp-steps" ref={stepsRef}>
                <div className="hp-section-header reveal-item">
                    <span className="hp-overline">HOW IT WORKS</span>
                    <h2>3 Simple Steps to <span className="hp-gradient-text">Better Governance</span></h2>
                </div>
                <div className="hp-steps-grid reveal-item">
                    {[
                        { num: '01', title: 'Report', desc: 'Citizens submit grievances with GPS location and category.', color: '#3b82f6' },
                        { num: '02', title: 'Assign & Resolve', desc: 'Admins assign officers who update status with photo proof.', color: '#8b5cf6' },
                        { num: '03', title: 'Rate & Track', desc: 'Citizens track progress in real-time and rate the resolution.', color: '#06b6d4' },
                    ].map((s, i) => (
                        <div className="hp-step" key={i} style={{ animationDelay: `${i * 0.15}s` }}>
                            <div className="hp-step-num" style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}88)` }}>
                                {s.num}
                            </div>
                            <h3>{s.title}</h3>
                            <p>{s.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== IMPACT / GALLERY ===== */}
            <section className="hp-impact">
                <div className="hp-impact-banner" style={{ backgroundImage: `url(${impactImg})` }}>
                    <div className="hp-impact-banner-overlay" />
                    <div className="hp-impact-banner-content">
                        <span className="hp-overline" style={{ color: 'rgba(255,255,255,0.7)' }}>COMMUNITY IMPACT</span>
                        <h2>See the <span style={{ color: '#60a5fa' }}>Change</span> We've Made</h2>
                        <p>Browse through resolved grievances — real problems, real solutions.</p>
                    </div>
                </div>
                <div className="hp-impact-gallery">
                    <ResolvedGallery />
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="hp-cta">
                <div className="hp-cta-inner">
                    <h2>Ready to Transform <span className="hp-gradient-text">Your Village?</span></h2>
                    <p>Join hundreds of citizens already making a difference. It takes less than 30 seconds to get started.</p>
                    <div className="hp-hero-btns" style={{ justifyContent: 'center' }}>
                        <Link to="/register" className="hp-btn hp-btn--primary">Create Free Account</Link>
                        <Link to="/login" className="hp-btn hp-btn--ghost">Login →</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
