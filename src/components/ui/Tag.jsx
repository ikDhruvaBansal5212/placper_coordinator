import { colorToBg, colorToText } from '../../utils/colorUtils';

export default function Tag({ children, color, onClick, href }) {
  const baseStyle = {
    fontSize: 10,
    fontWeight: 600,
    padding: '3px 9px',
    borderRadius: 20,
    fontFamily: 'DM Mono',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    display: 'inline-flex',
    alignItems: 'center',
    border: 'none',
    background: colorToBg(color),
    color: colorToText(color),
    ...(onClick && { cursor: 'pointer' }),
    ...(href && { textDecoration: 'none' }),
  };

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={baseStyle}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <span style={baseStyle} onClick={onClick}>
      {children}
    </span>
  );
}
