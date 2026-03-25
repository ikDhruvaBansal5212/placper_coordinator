export default function StatCard({ label, value, color = 'accent' }) {
  const cardStyle = {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '16px 18px',
  };

  const labelStyle = {
    fontSize: 11,
    color: 'var(--muted)',
    fontFamily: 'DM Mono',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
  };

  const colorMap = {
    accent: 'var(--accent)',
    amber: 'var(--amber)',
    green: 'var(--green)',
    red: 'var(--red)',
  };

  const valueStyle = {
    fontSize: 28,
    fontWeight: 700,
    letterSpacing: -1,
    color: colorMap[color] || 'var(--text)',
  };

  return (
    <div style={cardStyle}>
      <div style={labelStyle}>{label}</div>
      <div style={valueStyle}>{value}</div>
    </div>
  );
}
