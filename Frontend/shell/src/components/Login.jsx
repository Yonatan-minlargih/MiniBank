import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';

const Login = () => {
    const [step, setStep] = useState(1); // 1 = credentials, 2 = verify code
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(59);

    useEffect(() => {
        if (step === 2 && timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [step, timeLeft]);

    const handleSendCode = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const handleVerify = (e) => {
        e.preventDefault();
        navigate('/dashboard');
    };

    return (
        <AuthLayout>
            <div className="form-wrapper">
                {step === 1 ? (
                    <>
                        <div className="form-header">
                            <h2>Welcome Back</h2>
                            <p>Sign in to your account to continue.</p>
                        </div>

                        <form onSubmit={handleSendCode}>
                            <div className="form-group">
                                <label>Phone Number or Email</label>
                                <div className="input-icon-wrapper">
                                    <svg className="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                    <input type="text" className="form-control" required />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <div className="input-icon-wrapper password-input">
                                    <svg className="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
                                    <input type="password" className="form-control" required />
                                    <svg className="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                </div>
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <span style={{ fontSize: '0.95rem', color: 'var(--text-light)' }}>New to NIGUS Bank? <Link style={{ color: 'var(--primary-green)', fontWeight: '700' }} to="/register">Create an account</Link></span>
                            </div>

                            <button type="submit" className="btn-primary btn-block">Send Login Code</button>
                        </form>
                    </>
                ) : (
                    <>
                        <div className="form-header">
                            <h2>Enter Verification Code</h2>
                            <p>We've sent a 6-digit code to <strong>+251 9xx xxx xxxx</strong></p>
                        </div>

                        <form onSubmit={handleVerify}>
                            <div className="otp-container">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <input key={i} type="text" className="otp-box" maxLength={1} required />
                                ))}
                            </div>

                            <button type="submit" className="btn-primary btn-block" style={{ marginTop: '1rem', marginBottom: '2rem' }}>Verify & Login</button>
                        </form>

                        <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-light)' }}>
                            Didn't receive code? <span style={{ color: 'var(--primary-green)', fontWeight: '600', cursor: 'pointer' }}>Resend code in 0:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>
                        </p>
                    </>
                )}
            </div>
        </AuthLayout>
    );
};

export default Login;
