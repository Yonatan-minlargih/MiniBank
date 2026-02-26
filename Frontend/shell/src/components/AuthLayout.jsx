import React from 'react';
import { Link } from 'react-router-dom';
import { LogoIcon, CheckCircleIcon, ShieldIcon, SupportIcon } from './icons/Icons';
import './AuthLayout.css';

const AuthSidebar = () => (
    <div className="auth-sidebar">
        <Link to="/" className="auth-brand">
            <div className="logo-icon-small"><LogoIcon width="20" height="20" /></div>
            <span style={{ color: 'white', fontWeight: 700, fontSize: '1.25rem' }}>
                <span style={{ color: 'var(--accent-orange)' }}>NIGUS</span> Bank
            </span>
        </Link>
        <div className="auth-hero">
            <h1 className="auth-title">
                Experience<br /> Premium<br /> <span className="text-orange">Digital Banking.</span>
            </h1>
            <p className="auth-subtitle">
                Join over 2 million Ethiopians who trust MiniBank for their daily financial needs. Fast, secure, and reliable.
            </p>
            <div className="auth-features">
                <div className="feature-row">
                    <div className="feature-icon-circle"><CheckCircleIcon width="14" height="14" /></div>
                    <div className="feature-text">
                        <h4>Instant Account Opening</h4>
                        <p>Get your account number in under 2 minutes.</p>
                    </div>
                </div>
                <div className="feature-row">
                    <div className="feature-icon-circle"><ShieldIcon width="14" height="14" /></div>
                    <div className="feature-text">
                        <h4>Secure ETB Transfers</h4>
                        <p>Bank-grade security for all your nationwide transfers.</p>
                    </div>
                </div>
                <div className="feature-row">
                    <div className="feature-icon-circle"><SupportIcon /></div>
                    <div className="feature-text">
                        <h4>24/7 Premium Support</h4>
                        <p>Our team is always here to help you via chat or phone.</p>
                    </div>
                </div>
            </div>
            <div className="testimonial-card">
                <p>"NIGUS Bank has completely changed how I manage my business finances in Addis. The interface is intuitive and the speed is unmatched."</p>
                <div className="author">
                    <div className="avatar">A</div>
                    <div className="author-info"><strong>Abiy Ahmed</strong><span>PM</span></div>
                </div>
            </div>
        </div>
    </div>
);

const AuthFooter = () => (
    <div className="auth-footer">
        <div className="lang-selector">
            <span className="active">ENGLISH</span>
            <span>AMHARIC</span>
            <span>AFAN OROMO</span>
        </div>
        <div className="footer-links-row">
            <p className="copyright">© 2024 MiniBank Ethiopia. All rights reserved.</p>
            <div className="links">
                <a href="#">Help</a><a href="#">Legal</a><a href="#">Contact</a>
            </div>
        </div>
    </div>
);

const AuthLayout = ({ children }) => {
    return (
        <div className="auth-layout">
            <AuthSidebar />
            <div className="auth-content">
                <div className="auth-form-container">
                    {children}
                </div>
                <AuthFooter />
            </div>
        </div>
    );
};

export default AuthLayout;
