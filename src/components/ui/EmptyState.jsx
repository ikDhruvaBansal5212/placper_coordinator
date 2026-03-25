export default function EmptyState({ icon = '📋', title, subtitle, action }) {
  const outerStyle = {
    textAlign: 'center',
    padding: '60px 20px',
  };

  const iconStyle = {
    fontSize: 40,
    marginBottom: 16,
    opacity: 0.4,
  };

  const titleStyle = {
    fontSize: 16,
    fontWeight: 600,
    color: 'var(--muted)',
    marginBottom: 8,
  };

  const subtitleStyle = {
    fontSize: 13,
    color: 'var(--muted)',
    opacity: 0.7,
    marginBottom: 20,
  };

  return (
    <div style={outerStyle}>
      <div style={iconStyle}>{icon}</div>
      <div style={titleStyle}>{title}</div>
      <div style={subtitleStyle}>{subtitle}</div>
      {action && <div>{action}</div>}
    </div>
  );
}
