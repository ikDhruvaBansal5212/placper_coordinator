import { useApp } from '../context/AppContext';
import { formatDate, dateUrgencyColor } from '../utils/dateUtils';
import EmptyState from '../components/ui/EmptyState';
import { STATUS_LABELS } from '../utils/constants';

export default function Timeline() {
  const { apps } = useApp();

  const withDates = apps
    .filter((a) => a.deadline)
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  return (
    <div>
      {/* TOP BAR */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>
          Timeline
        </h1>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>
          All exams, interviews & deadlines
        </p>
      </div>

      {/* EMPTY STATE */}
      {withDates.length === 0 ? (
        <EmptyState
          icon="📅"
          title="No deadlines set"
          subtitle="Add deadlines to your applications to see them here"
        />
      ) : (
        /* TIMELINE LIST */
        <div>
          {withDates.map((app, index) => (
            <div
              key={app.id}
              style={{
                display: 'flex',
                gap: 16,
                paddingBottom: 20,
              }}
            >
              {/* LEFT SIDE */}
              <div
                style={{
                  width: 80,
                  flexShrink: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {/* Date text */}
                <div
                  style={{
                    fontSize: 11,
                    fontFamily: 'DM Mono',
                    color: 'var(--muted)',
                    textAlign: 'center',
                  }}
                >
                  {new Date(app.deadline + 'T00:00:00').toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                  })}
                </div>

                {/* Colored dot */}
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    margin: '6px 0',
                    background: dateUrgencyColor(app.deadline),
                  }}
                />

                {/* Vertical line - don't render for last item */}
                {index < withDates.length - 1 && (
                  <div
                    style={{
                      width: 1,
                      flex: 1,
                      background: 'var(--border)',
                    }}
                  />
                )}
              </div>

              {/* RIGHT CARD */}
              <div
                style={{
                  flex: 1,
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  padding: '12px 16px',
                }}
              >
                {/* Company */}
                <div style={{ fontSize: 13, fontWeight: 700 }}>
                  {app.company}
                </div>

                {/* Status + formatted date */}
                <div
                  style={{
                    fontSize: 11,
                    fontFamily: 'DM Mono',
                    color: dateUrgencyColor(app.deadline),
                    marginTop: 2,
                  }}
                >
                  {STATUS_LABELS[app.status]} · {formatDate(app.deadline)}
                </div>

                {/* Notes preview */}
                {app.notes && (
                  <div
                    style={{
                      fontSize: 12,
                      color: 'var(--muted)',
                      marginTop: 6,
                    }}
                  >
                    {app.notes.length > 80
                      ? app.notes.slice(0, 80) + '...'
                      : app.notes}
                  </div>
                )}

                {/* Platform link */}
                {app.platformlink && (
                  <a
                    href={app.platformlink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      fontSize: 11,
                      color: 'var(--blue)',
                      marginTop: 4,
                      textDecoration: 'none',
                    }}
                  >
                    ↗ Open Portal
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
