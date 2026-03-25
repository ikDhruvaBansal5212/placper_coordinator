import { useState } from 'react';

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  type = 'button',
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Base styles for all buttons
  const baseStyle = {
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: 'Syne',
    transition: 'all 0.15s',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    outline: 'none',
    opacity: disabled ? 0.5 : 1,
  };

  // Size styles
  const sizeStyles = {
    sm: {
      padding: '5px 10px',
      fontSize: 11,
      borderRadius: 6,
    },
    md: {
      padding: '9px 18px',
      fontSize: 13,
      borderRadius: 'var(--radius)',
    },
  };

  // Variant styles (base + hover)
  const variantStyles = {
    primary: {
      base: {
        background: 'var(--accent)',
        color: '#0e0f11',
        fontWeight: 700,
        border: 'none',
      },
      hover: {},
    },
    secondary: {
      base: {
        background: 'var(--surface2)',
        border: '1px solid var(--border)',
        color: 'var(--muted)',
      },
      hover: {
        borderColor: 'var(--border2)',
        color: 'var(--text)',
      },
    },
    danger: {
      base: {
        background: 'var(--surface2)',
        border: '1px solid var(--border)',
        color: 'var(--muted)',
      },
      hover: {
        borderColor: 'var(--red)',
        color: 'var(--red)',
      },
    },
    ghost: {
      base: {
        background: 'none',
        border: 'none',
        color: 'var(--muted)',
      },
      hover: {
        color: 'var(--text)',
      },
    },
  };

  // Combine all styles
  const buttonStyle = {
    ...baseStyle,
    ...sizeStyles[size],
    ...variantStyles[variant].base,
    ...(isHovered && !disabled ? variantStyles[variant].hover : {}),
  };

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={className}
      style={buttonStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
  );
}
