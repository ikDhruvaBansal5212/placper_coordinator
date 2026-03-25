import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useApp } from '../context/AppContext';
import StatCard from '../components/ui/StatCard';
import AppCard from '../components/ui/AppCard';
import EmptyState from '../components/ui/EmptyState';
import Button from '../components/ui/Button';
import { formatDate, dateUrgencyColor } from '../utils/dateUtils';
import { SOURCE_LABELS } from '../utils/constants';

export default function Dashboard() {
  const { apps } = useApp();
  const navigate = useNavigate();

  const todayFormatted = format(new Date(), 'EEEE, d MMMM yyyy');

  const upcoming = apps
    .filter((a) => a.deadline)
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 4);

  const recentApps = [...apps].reverse().slice(0, 3);

  return (
    <div>
      {/* TOP BAR */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 28,
        }}
      >
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>
            Dashboard
          </h1>
          <p
            style={{
              fontSize: 13,
              color: 'var(--muted)',
              fontFamily: 'DM Mono',
            }}
          >
            {todayFormatted}
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => navigate('/applications', { state: { openModal: true } })}
        >
          + Quick Add
        </Button>
      </div>

      {/* STATS ROW */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 12,
          marginBottom: 28,
        }}
      >
        <StatCard label="Total Applied" value={apps.length} color="accent" />
        <StatCard
          label="Active Rounds"
          value={
            apps.filter(
              (a) => a.status === 'test' || a.status === 'interview'
            ).length
          }
          color="amber"
        />
        <StatCard
          label="Offers"
          value={apps.filter((a) => a.status === 'offer').length}
          color="green"
        />
        <StatCard
          label="Rejected"
          value={apps.filter((a) => a.status === 'rejected').length}
          color="red"
        />
      </div>

      {/* TWO-COLUMN LAYOUT */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 20,
        }}
      >
        {/* LEFT - Upcoming Deadlines */}
        <div>
          <div
            style={{
              fontSize: 11,
              fontFamily: 'DM Mono',
              textTransform: 'uppercase',
              letterSpacing: 1,
              color: 'var(--muted)',
              marginBottom: 14,
            }}
          >
            UPCOMING DEADLINES
          </div>
          {upcoming.length > 0 ? (
            upcoming.map((app) => (
              <div
                key={app.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  padding: '12px 16px',
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    width: 3,
                    height: 36,
                    borderRadius: 2,
                    background: dateUrgencyColor(app.deadline),
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>
                    {app.company} — {app.role}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      fontFamily: 'DM Mono',
                      color: 'var(--muted)',
                    }}
                  >
                    {SOURCE_LABELS[app.source]} · {app.resume || 'No resume'}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    fontFamily: 'DM Mono',
                    color: dateUrgencyColor(app.deadline),
                  }}
                >
                  {formatDate(app.deadline)}
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: 'var(--muted)', fontSize: 13 }}>
              No deadlines set yet
            </p>
          )}
        </div>

        {/* RIGHT - Recent Applications */}
        <div>
          <div
            style={{
              fontSize: 11,
              fontFamily: 'DM Mono',
              textTransform: 'uppercase',
              letterSpacing: 1,
              color: 'var(--muted)',
              marginBottom: 14,
            }}
          >
            RECENT APPLICATIONS
          </div>
          {recentApps.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {recentApps.map((app) => (
                <AppCard
                  key={app.id}
                  app={app}
                  compact={true}
                  onEdit={() => {}}
                  onDelete={() => {}}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="📋"
              title="No applications yet"
              subtitle="Click Quick Add to start"
            />
          )}
        </div>
      </div>
    </div>
  );
}
