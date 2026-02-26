import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import './global.css';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
// Lazy load the MFEs. The names correspond to the remotes configured in Webpack.
// If the profile module is not running, we must handle the failure gracefully.
const ProfileMFE = React.lazy(() => import('profileMFE/Profile').catch(() => {
    return { default: () => <div>Error loading Profile component. Ensure profile-mfe is running.</div> };
}));


const DashboardLayout = () => {
    return (
        <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
            <div style={{ width: '250px', backgroundColor: 'var(--sidebar-bg)', color: 'white' }}>
                <h2>NIGUS Bank Sidebar</h2>
                <ul>
                    <li><a href="/dashboard" style={{ color: 'white' }}>Dashboard</a></li>
                    <li><a href="/dashboard/settings" style={{ color: 'white' }}>Settings</a></li>
                </ul>
            </div>
            <div style={{ flex: 1, backgroundColor: 'var(--bg-off-white)' }}>
                <header style={{ padding: '1rem', backgroundColor: 'white', borderBottom: '1px solid var(--border-light)' }}>
                    Top Header Space
                </header>
                <main style={{ padding: '2rem' }}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

const DashboardHome = () => <div><h2>Dashboard Home (TBD by other teams)</h2></div>;

const App = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading App...</div>}>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route path="/dashboard" element={<DashboardLayout />}>
                        <Route index element={<DashboardHome />} />
                        <Route path="settings" element={
                            <Suspense fallback={<div>Loading Settings MFE...</div>}>
                                <ProfileMFE />
                            </Suspense>
                        } />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}
