export const inputStyle = {
  background: 'var(--bg)',
  border: '1px solid var(--border)',
  color: 'var(--text)',
  padding: '9px 12px',
  borderRadius: 'var(--radius)',
  fontSize: 13,
  fontFamily: 'Syne',
  outline: 'none',
  width: '100%',
  transition: 'border-color 0.15s',
};

export function FormGroup({ label, children }) {
  const labelStyle = {
    fontSize: 11,
    fontWeight: 600,
    color: 'var(--muted)',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    fontFamily: 'DM Mono',
    display: 'block',
    marginBottom: 6,
  };

  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  width = '520px',
}) {
  if (!isOpen) return null;

  const overlayStyle = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.7)',
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
  };

  const modalBoxStyle = {
    background: 'var(--surface)',
    border: '1px solid var(--border2)',
    borderRadius: 'var(--radius-lg)',
    padding: 28,
    width,
    maxWidth: '95vw',
    maxHeight: '90vh',
    overflowY: 'auto',
  };

  const titleStyle = {
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: -0.4,
    marginBottom: 4,
  };

  const subtitleStyle = {
    fontSize: 12,
    color: 'var(--muted)',
    fontFamily: 'DM Mono',
    marginBottom: 24,
  };

  const footerStyle = {
    marginTop: 24,
    borderTop: '1px solid var(--border)',
    paddingTop: 20,
    display: 'flex',
    gap: 10,
    justifyContent: 'flex-end',
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalBoxStyle} onClick={(e) => e.stopPropagation()}>
        <div style={titleStyle}>{title}</div>
        {subtitle && <div style={subtitleStyle}>{subtitle}</div>}
        <div>{children}</div>
        {footer && <div style={footerStyle}>{footer}</div>}
      </div>
    </div>
  );
}
