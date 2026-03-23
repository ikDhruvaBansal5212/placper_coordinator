import { BADGE_COLORS } from './constants.js';

// Get initials from company name
export function getInitials(name) {
  if (!name) return '';

  const words = name.trim().split(/\s+/);

  if (words.length === 1) {
    // Single word - take first 2 letters
    return name.substring(0, 2).toUpperCase();
  }

  // Multiple words - take first letter of first 2 words
  const initials = words
    .slice(0, 2)
    .map(word => word[0])
    .join('')
    .toUpperCase();

  return initials;
}

// Get badge color based on name hash
export function getBadgeColor(name) {
  if (!name) return BADGE_COLORS[0];

  // Sum character codes
  let sum = 0;
  for (let i = 0; i < name.length; i++) {
    sum += name.charCodeAt(i);
  }

  // Return color from array using modulo
  return BADGE_COLORS[sum % 6];
}

// Convert color name to background CSS variable (dim version)
export function colorToBg(colorName) {
  const colorMap = {
    blue: 'var(--blue-dim)',
    purple: 'var(--purple-dim)',
    amber: 'var(--amber-dim)',
    green: 'var(--green-dim)',
    red: 'var(--red-dim)',
    muted: 'rgba(122,127,142,0.12)'
  };

  return colorMap[colorName] || colorMap.muted;
}

// Convert color name to text CSS variable
export function colorToText(colorName) {
  const colorMap = {
    blue: 'var(--blue)',
    purple: 'var(--purple)',
    amber: 'var(--amber)',
    green: 'var(--green)',
    red: 'var(--red)',
    muted: 'var(--muted)'
  };

  return colorMap[colorName] || colorMap.muted;
}

// Get inline style object with background and color
export function colorToStyle(colorName) {
  return {
    background: colorToBg(colorName),
    color: colorToText(colorName)
  };
}
