import Tag from './Tag';
import Button from './Button';
import { formatDate, dateUrgencyColor } from '../../utils/dateUtils';
import { SOURCE_LABELS, SOURCE_COLORS, STATUS_COLORS, STATUS_LABELS } from '../../utils/constants';
import { getInitials, getBadgeColor, colorToStyle } from '../../utils/colorUtils';

export default function AppCard({ app, compact = false, onEdit, onDelete }) {
  const getCurrentStepIndex = () => {
    if (!app.steps || !app.status) return -1;

    const statusLower = app.status.toLowerCase();
    return app.steps.findIndex(step =>
      step.toLowerCase().includes(statusLower) ||
      statusLower.includes(step.toLowerCase())
    );
  };

  const currentStepIndex = getCurrentStepIndex();

  return (
    <div
      style={{
        display: 'flex',
        gap: 14,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px 18px',
        transition: 'all 0.15s',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--border2)';
        e.currentTarget.style.background = 'var(--surface2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.background = 'var(--surface)';
      }}
    >
      {/* LEFT - Company Badge */}
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 'var(--radius)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 14,
          fontWeight: 700,
          flexShrink: 0,
          letterSpacing: -0.5,
          ...colorToStyle(getBadgeColor(app.company)),
        }}
      >
        {getInitials(app.company)}
      </div>

      {/* RIGHT - Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* TOP ROW */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 8,
          }}
        >
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>
              {app.company}
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>
              {app.role}
              {app.deadline && (
                <span
                  style={{
                    marginLeft: 8,
                    color: dateUrgencyColor(app.deadline),
                    fontSize: 11,
                    fontFamily: 'DM Mono',
                  }}
                >
                  {formatDate(app.deadline)}
                </span>
              )}
            </div>
          </div>

          {!compact && (
            <div style={{ display: 'flex', gap: 8 }}>
              <Button size="sm" variant="secondary" onClick={() => onEdit(app.id)}>
                Edit
              </Button>
              <Button size="sm" variant="danger" onClick={() => onDelete(app.id)}>
                Delete
              </Button>
            </div>
          )}
        </div>

        {/* TAGS ROW */}
        <div
          style={{
            display: 'flex',
            gap: 6,
            flexWrap: 'wrap',
            marginBottom: compact ? 0 : 10,
          }}
        >
          <Tag color={SOURCE_COLORS[app.source]} label={SOURCE_LABELS[app.source]} />
          <Tag color="purple" label={app.resume || 'No resume'} />
          <Tag color={STATUS_COLORS[app.status]} label={STATUS_LABELS[app.status]} />
          {app.platformlink && (
            <a href={app.platformlink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <Tag color="muted" label="↗ Link" />
            </a>
          )}
        </div>

        {/* STEPS ROW */}
        {!compact && app.steps && app.steps.length > 0 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              flexWrap: 'wrap',
            }}
          >
            {app.steps.map((step, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div
                  style={{
                    fontSize: 10,
                    fontFamily: 'DM Mono',
                    padding: '3px 8px',
                    borderRadius: 20,
                    border: '1px solid var(--border)',
                    color: 'var(--muted)',
                    ...(index < currentStepIndex && {
                      background: 'var(--green-dim)',
                      borderColor: 'transparent',
                      color: 'var(--green)',
                    }),
                    ...(index === currentStepIndex && {
                      background: 'var(--amber-dim)',
                      borderColor: 'transparent',
                      color: 'var(--amber)',
                      fontWeight: 600,
                    }),
                  }}
                >
                  {step}
                </div>
                {index < app.steps.length - 1 && (
                  <span style={{ fontSize: 10, color: 'var(--border2)' }}>›</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
