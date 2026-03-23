/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0e0f11',
        surface: '#16181c',
        surface2: '#1e2026',
        bordercol: '#2a2d35',
        border2: '#363a44',
        textcol: '#e8eaf0',
        muted: '#7a7f8e',
        accent: '#c8f060',
        accentdim: 'rgba(200,240,96,0.12)',
        red: '#ff6b6b',
        reddim: 'rgba(255,107,107,0.12)',
        amber: '#ffb84d',
        amberdim: 'rgba(255,184,77,0.12)',
        blue: '#64b5f6',
        bluedim: 'rgba(100,181,246,0.12)',
        green: '#81e6a0',
        greendim: 'rgba(129,230,160,0.12)',
        purple: '#b794f4',
        purpledim: 'rgba(183,148,244,0.12)'
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        mono: ['DM Mono', 'monospace']
      },
      borderRadius: {
        md: '10px',
        lg: '14px'
      }
    }
  },
  plugins: []
}
