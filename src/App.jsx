import AppProvider from './context/AppContext';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';
import Timeline from './pages/Timeline';
import ResumeVault from './pages/ResumeVault';
import DailyPlanner from './pages/DailyPlanner';
import useWindowWidth from './hooks/useWindowWidth';

function AppContent() {
  const windowWidth = useWindowWidth();
  const location = useLocation();
  const isCollapsed = windowWidth < 900;
  const sidebarWidth = isCollapsed ? 56 : 220;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      <Sidebar isCollapsed={isCollapsed} />
      <div
        style={{
          marginLeft: `${sidebarWidth}px`,
          flex: 1,
          padding: '32px',
          maxWidth: `calc(100vw - ${sidebarWidth}px)`,
          overflowY: 'auto'
        }}
      >
        <div key={location.pathname} className="page-enter">
          <Routes>
            <Route path="/" element={<Dashboard windowWidth={windowWidth} />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/resumes" element={<ResumeVault />} />
            <Route path="/planner" element={<DailyPlanner windowWidth={windowWidth} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
