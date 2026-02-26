import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';

const Register = () => {
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        // Simulate successful registration
        setTimeout(() => {
            navigate('/dashboard');
        }, 500);
    };

    return (
        <AuthLayout>
            <div className="form-wrapper">
                <div className="form-header">
                    <h2>Create your account</h2>
                    <p>Join Ethiopia's premium digital banking platform today.</p>
                </div>

                <form onSubmit={handleRegister}>
                    <div className="split-row">
                        <div className="form-group">
                            <label>First Name</label>
                            <input type="text" className="form-control" placeholder="e.g. Amha" required />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" className="form-control" placeholder="e.g. Kifle" required />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Email Address</label>
                        <div className="input-icon-wrapper">
                            <svg className="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                            <input type="email" className="form-control" placeholder="email@example.com" required />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Phone Number</label>
                        <div style={{ display: 'flex' }}>
                            <div style={{
                                backgroundColor: '#f9fafb', border: '1px solid var(--border-light)',
                                borderRight: 'none', padding: '12px 16px', borderRadius: '8px 0 0 8px',
                                color: 'var(--text-light)', borderRight: '1px solid var(--border-light)'
                            }}>
                                +251
                            </div>
                            <input type="tel" className="form-control" placeholder="9xx xxx xxxx" style={{ borderRadius: '0 8px 8px 0', borderLeft: 'none' }} required />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <div className="input-icon-wrapper password-input">
                            <svg className="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
                            <input type="password" className="form-control" placeholder="••••••••" required />
                            <svg className="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <div className="input-icon-wrapper password-input">
                            <svg className="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                            <input type="password" className="form-control" placeholder="••••••••" required />
                        </div>
                    </div>

                    <div className="checkbox-group">
                        <input type="checkbox" id="terms" required />
                        <label htmlFor="terms">I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.</label>
                    </div>

                    <button type="submit" className="btn-primary btn-block">Create Account</button>
                </form>

                <p className="switch-auth">
                    Already have an account? <Link to="/login">Log in here</Link>
                </p>
            </div>
        </AuthLayout>
    );
};

export default Register;
