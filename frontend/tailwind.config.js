/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: "'Outfit', sans-serif",
      },
      screens: {
        '2xl': '1536px',
        '3xl': '1920px',
      },
      /*
        Fluid display-text tokens.
        Each `fluid-N` resolves to exactly Npx at a 1440px viewport (the
        approved design width), scales down gently toward ~1280px, and grows
        smoothly toward large monitors with a capped ceiling (~1.3x) so text
        never becomes unreadable on 27"+/4K screens.
        Derived from the px values already used across the site — no new sizes.
        Use for hero/display/heading text only; small UI labels (<=18px) stay fixed.
      */
      fontSize: {
        'fluid-22': ['clamp(1.127rem, 0.4838rem + 0.99vw, 1.788rem)', { lineHeight: '1.25' }],
        'fluid-24': ['clamp(1.230rem, 0.5281rem + 1.08vw, 1.950rem)', { lineHeight: '1.22' }],
        'fluid-26': ['clamp(1.333rem, 0.5719rem + 1.17vw, 2.112rem)', { lineHeight: '1.2' }],
        'fluid-28': ['clamp(1.435rem, 0.6162rem + 1.26vw, 2.275rem)', { lineHeight: '1.2' }],
        'fluid-30': ['clamp(1.538rem, 0.66rem + 1.35vw, 2.438rem)',   { lineHeight: '1.18' }],
        'fluid-32': ['clamp(1.640rem, 0.7037rem + 1.44vw, 2.600rem)', { lineHeight: '1.15' }],
        'fluid-34': ['clamp(1.742rem, 0.7481rem + 1.53vw, 2.763rem)', { lineHeight: '1.15' }],
        'fluid-36': ['clamp(1.845rem, 0.7919rem + 1.62vw, 2.925rem)', { lineHeight: '1.12' }],
        'fluid-38': ['clamp(1.948rem, 0.8363rem + 1.71vw, 3.087rem)', { lineHeight: '1.1' }],
        'fluid-40': ['clamp(2.050rem, 0.88rem + 1.8vw, 3.250rem)',    { lineHeight: '1.1' }],
        'fluid-42': ['clamp(2.152rem, 0.9237rem + 1.89vw, 3.413rem)', { lineHeight: '1.08' }],
      },
      /*
        Fluid page container. `max-w-fluid` widens with the viewport up to a
        ~1600px ceiling so content fills large monitors instead of sitting in a
        narrow centered column, while staying at the current proportions around
        1440px. Pair with `mx-auto` and the fluid gutter padding below.
      */
      maxWidth: {
        'fluid': 'min(94vw, 1600px)',
      },
      spacing: {
        'gutter': 'clamp(1rem, 0.5rem + 2.5vw, 3.5rem)',
      },
    },
  },
  plugins: [],
}
