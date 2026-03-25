import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Calendar, Archive, PenLine } from 'lucide-react';

const NAV_LINKS = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/applications', label: 'Applications', icon: FileText },
  { to: '/timeline', label: 'Timeline', icon: Calendar },
  { to: '/resumes', label: 'Resume Vault', icon: Archive },
  { to: '/planner', label: 'Daily Planner', icon: PenLine },
];

export default function Sidebar({ isCollapsed = false }) {
  const [hoveredLink, setHoveredLink] = useState(null);

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: isCollapsed ? 56 : 220,
        height: '100vh',
        background: 'var(--surface)',
        borderRight: '1px solid var(--border)',
        padding: isCollapsed ? '24px 8px' : '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        zIndex: 10,
        transition: 'width 0.3s, padding 0.3s',
      }}
    >
      {/* LOGO AREA */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: isCollapsed ? 'center' : 'flex-start',
          gap: 8,
          paddingBottom: 20,
          borderBottom: '1px solid var(--border)',
          marginBottom: 12,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            background: 'var(--accent)',
            borderRadius: '50%',
          }}
        />
        {!isCollapsed && (
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: 'var(--accent)',
              letterSpacing: -0.3,
            }}
          >
            Placement Hub
          </div>
        )}
      </div>

      {/* NAV LINKS */}
      {NAV_LINKS.map((link) => {
        const Icon = link.icon;
        return (
          <NavLink
            key={link.to}
            to={link.to}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: isCollapsed ? 'center' : 'flex-start',
              gap: 10,
              padding: isCollapsed ? '9px' : '9px 10px',
              borderRadius: 'var(--radius)',
              fontSize: 13,
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'all 0.15s',
              color: isActive
                ? 'var(--accent)'
                : hoveredLink === link.to
                ? 'var(--text)'
                : 'var(--muted)',
              background: isActive
                ? 'var(--accent-dim)'
                : hoveredLink === link.to
                ? 'var(--surface2)'
                : 'transparent',
            })}
            onMouseEnter={() => setHoveredLink(link.to)}
            onMouseLeave={() => setHoveredLink(null)}
          >
            {({ isActive }) => (
              <>
                <Icon size={16} style={{ opacity: isActive ? 1 : 0.7 }} />
                {!isCollapsed && link.label}
              </>
            )}
          </NavLink>
        );
      })}

      {/* BOTTOM FOOTER - only show when not collapsed */}
      {!isCollapsed && (
        <div
          style={{
            marginTop: 'auto',
            background: 'var(--surface2)',
            borderRadius: 'var(--radius)',
            padding: '12px 10px',
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 600 }}>My Profile</div>
          <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
            3rd Year · Engineering
          </div>
        </div>
      )}
    </div>
  );
}
