const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#075985', // #115E59
        secondary: '#155E75',
        tertiary: '#075985',
        fourth: '#1F2937',
        dark: '#242936',
        darker: '#1e222c',
        darkest: '#1a1e28',
        darkish: '#333640',
        light: '#f2f4f7',
        lighter: '#f7f7f7',
        lightest: '#fcfcfc',
        lightish: '#ebedf0',
        navydark: '#1a202c',
      },
      maxWidth: {
        screen: '100vw',
      },
      fontSize: {
        xxs: '0.6rem',
      },
      fontFamily: {
        prose: ['Inter', ...defaultTheme.fontFamily.sans],
        headings: ['Lexend', ...defaultTheme.fontFamily.sans],
        mono: ['Fira Code', ...defaultTheme.fontFamily.mono],
        source: ['Source Sans Pro', ...defaultTheme.fontFamily.sans],
        'ubuntu-mono': ['Ubuntu Mono', ...defaultTheme.fontFamily.mono],
        system: defaultTheme.fontFamily.sans,
        flow: 'Flow',
      },
      keyframes: {
        dark: {
          '0%, 100%': { transform: 'rotate(5deg)' },
          '50%': { transform: 'rotate(-5deg)' },
        },
        light: {
          '0%, 100%': { transform: 'rotate(5deg)' },
          '50%': { transform: 'rotate(-5deg)' },
        },
      },
      animation: {
        dark: 'dark 400ms ease-in-out',
        light: 'light 400ms ease-in-out',
      },
      blur: {
        xxs: '1px',
        xs: '2px',
      }
    },
  },
  plugins: ['gatsby-plugin-postcss'],
}
