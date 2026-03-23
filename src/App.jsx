import AppProvider from './context/AppContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';
import Timeline from './pages/Timeline';
import ResumeVault from './pages/ResumeVault';
import DailyPlanner from './pages/DailyPlanner';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
          <Sidebar />
          <div
            style={{
              marginLeft: '220px',
              flex: 1,
              padding: '32px',
              maxWidth: 'calc(100vw - 220px)',
              overflowY: 'auto'
            }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/resumes" element={<ResumeVault />} />
              <Route path="/planner" element={<DailyPlanner />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
