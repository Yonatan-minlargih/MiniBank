import React from 'react';
import { Link } from 'react-router-dom';
import {
    LogoIcon, CheckCircleIcon, ShieldIcon, ServerIcon,
    LockIcon, CompliantIcon, RocketIcon, KeyIcon, GlobeIcon, TwitterIcon
} from './icons/Icons';
import './Landing.css';

const Navigation = () => (
    <nav className="navbar">
        <div className="navbar-brand">
            <div className="logo-icon"><LogoIcon /></div>
            <span className="brand-name">
                <span style={{ color: 'var(--accent-orange)' }}>NIGUS</span> Bank
            </span>
        </div>
        <div className="navbar-links">
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <a href="#support">Support</a>
        </div>
        <div className="navbar-actions">
            <Link to="/login" className="login-link">Login</Link>
            <Link to="/register" className="btn-primary">Open Account</Link>
        </div>
    </nav>
);

const HeroContent = () => (
    <div className="hero-content">
        <div className="badge">
            <CheckCircleIcon width="14" height="14" /> NOW LIVE IN ADDIS ABABA
        </div>
        <h1 className="hero-title">
            The Future of<br /> Banking <span className="text-orange">in</span><br />
            <span className="text-orange">Ethiopia</span>
        </h1>
        <p className="hero-subtitle">
            Experience secure, modular, and lightning-fast digital finance powered by advanced micro-frontend architecture.
        </p>
        <div className="hero-cta">
            <Link to="/register" className="btn-primary">Get Started</Link>
            <a href="#features" className="btn-outline">Learn More</a>
        </div>
        <p className="hero-stats"><strong>10k+</strong> active users this month</p>
    </div>
);

const TrustBanner = () => (
    <section className="trust-banner">
        <p className="trust-title">TRUSTED BY LEADING FINANCIAL INSTITUTIONS & SECURITY STANDARDS</p>
        <div className="trust-logos">
            <div className="trust-item"><ShieldIcon /> PCI-DSS Level 1</div>
            <div className="trust-item"><ServerIcon /> CBE Partner</div>
            <div className="trust-item"><LockIcon /> AES-256 Secure</div>
            <div className="trust-item"><CompliantIcon /> NBE Compliant</div>
        </div>
    </section>
);

const Features = () => (
    <section className="features-grid" id="features">
        <div className="feature-card">
            <div className="feature-icon"><RocketIcon /></div>
            <h3>Micro-frontend Speed</h3>
            <p>Modular architecture ensures zero downtime and lightning-fast loading speeds across the continent.</p>
        </div>
        <div className="feature-card">
            <div className="feature-icon"><KeyIcon /></div>
            <h3>Bank-Grade Security</h3>
            <p>End-to-end encryption with biometric authentication keeps your financial data under lock and key.</p>
        </div>
        <div className="feature-card">
            <div className="feature-icon"><GlobeIcon /></div>
            <h3>Local Integration</h3>
            <p>Native support for Ethiopian payment gateways and local financial regulations built right in.</p>
        </div>
    </section>
);

const Footer = () => (
    <footer className="footer">
        <div className="footer-content">
            <div className="footer-brand">
                <LogoIcon style={{ marginRight: '8px' }} />
                <span><span style={{ color: 'var(--accent-orange)' }}>NIGUS</span> Bank</span>
            </div>
            <div className="footer-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
            </div>
            <div className="footer-social">
                <a href="#" className="social-icon"><TwitterIcon /></a>
            </div>
        </div>
        <div className="footer-bottom">
            <p>&copy; 2026 NIGUS Bank. All rights reserved. Licensed by the National Bank of Ethiopia.</p>
        </div>
    </footer>
);

const DashboardMockup = () => (
    <div className="dashboard-mockup">
        <div className="mockup-header">
            <span className="dot dot-red"></span><span className="dot dot-yellow"></span><span className="dot dot-green"></span>
        </div>
        <div className="mockup-body">
            <div className="mockup-line w-30"></div><div className="mockup-line w-50"></div>
            <div className="mockup-main">
                <div className="mockup-overlay-text">DASHBOARD PREVIEW</div>
            </div>
            <div className="mockup-line w-full"></div>
        </div>
        <div className="floating-badge">
            <div className="badge-icon"><ShieldIcon /></div>
            <div className="badge-content">
                <span className="badge-label">TRANSFER SENT</span>
                <span className="badge-amount">+ ETB 24,500.00</span>
            </div>
        </div>
    </div>
);

const Landing = () => (
    <div className="landing-page">
        <Navigation />
        <section className="hero-section">
            <HeroContent />
            <div className="hero-image"><DashboardMockup /></div>
        </section>
        <TrustBanner />
        <Features />
        <Footer />
    </div>
);

export default Landing;
