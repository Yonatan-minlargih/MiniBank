import React from 'react';
import Profile from './components/Profile';

const App = () => {
  return (
    <div style={{ padding: '2rem', backgroundColor: '#f3f4f6', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      {/* Inject global-like variables strictly for standalone mode */}
      <style>{`
          :root {
            --primary-green: #298d5a;
            --primary-green-hover: #227b4c;
            --text-dark: #1f2937;
            --text-light: #6b7280;
            --bg-light: #ffffff;
            --bg-off-white: #f3f4f6;
            --border-light: #e5e7eb;
            --input-bg: #f9fafb;
          }
          * { box-sizing: border-box; font-family: 'Inter', sans-serif; }
       `}</style>
      <Profile />
    </div>
  );
};

export default App;
