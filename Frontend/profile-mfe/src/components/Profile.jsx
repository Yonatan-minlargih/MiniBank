import React from 'react';
import './Profile.css';

const Profile = () => {
    return (
        <div className="settings-page">
            <h1 className="page-title">Settings</h1>

            <div className="settings-layout">
                <div className="settings-sidebar">
                    <button className="settings-tab active">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                        Profile
                    </button>
                    <button className="settings-tab">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
                        Notifications
                    </button>
                </div>

                <div className="settings-content">
                    {/* Profile Info Card */}
                    <div className="settings-card">
                        <div className="card-header">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            <h2>Profile Information</h2>
                        </div>
                        <div className="card-body">
                            <div className="profile-grid">
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input type="text" className="form-control" defaultValue="Eyob Habtie" />
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input type="email" className="form-control" defaultValue="eyobhabtie@gmail.com" />
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input type="tel" className="form-control" defaultValue="+251 953 607 861" />
                                </div>
                                <div className="form-group">
                                    <label>Address</label>
                                    <textarea className="form-control" rows="2" defaultValue="Gurd shola, Addis Ababa, Ethiopia"></textarea>
                                </div>
                            </div>
                            <div className="card-actions">
                                <button className="btn-primary">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Security Card */}
                    <div className="settings-card">
                        <div className="card-header">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                            <h2>Security & Access</h2>
                        </div>
                        <div className="card-body">
                            <div className="security-row">
                                <div className="security-info">
                                    <div className="security-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /></svg></div>
                                    <div>
                                        <h4>Account Password</h4>
                                        <p>Last changed 3 months ago</p>
                                    </div>
                                </div>
                                <button className="btn-secondary">Change Password</button>
                            </div>

                            <div className="security-row">
                                <div className="security-info">
                                    <div className="security-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></svg></div>
                                    <div>
                                        <h4>Two-Factor Authentication</h4>
                                        <p>Secure your account with an extra layer of security</p>
                                    </div>
                                </div>
                                <div className="toggle-switch">
                                    <input type="checkbox" id="2fa-toggle" defaultChecked />
                                    <label htmlFor="2fa-toggle" className="toggle-slider"></label>
                                    <span className="toggle-label">ON</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
