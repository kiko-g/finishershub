/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  darkMode: "class",
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4090dd", 
        secondary: "#aa88ff",
        tertiary: "#0d9488", // c4b5fd
        navy: "#0f1419",
        dark: "#242936",
        darker: "#1e222c",
        darkest: "#1a1e28",
        darkish: "#333640",
        light: "#f2f4f7",
        lighter: "#f7f7f7",
        lightest: "#fcfcfc",
        lightish: "#ebedf0",
        twitch: "#6441a5",
        twitter: "#1da1f2",
        youtube: "#ff0000",
        github: "#333333",
        linktree: "#40e09e",
      },
      maxWidth: {
        screen: "100vw",
      },
      fontSize: {
        xxs: "0.6rem",
      },
      fontFamily: {
        sans: [
          "Inter var, sans-serif",
          {
            fontFeatureSettings: '"cv11", "ss01"',
            fontVariationSettings: '"opsz" 32',
          },
        ],
        prose: ["Inter", ...defaultTheme.fontFamily.sans],
        lexend: ["Lexend", ...defaultTheme.fontFamily.sans],
        mono: ["Fira Code", ...defaultTheme.fontFamily.mono],
      },
      keyframes: {
        dark: {
          "0%, 100%": { transform: "rotate(5deg)" },
          "50%": { transform: "rotate(-5deg)" },
        },
        light: {
          "0%, 100%": { transform: "rotate(5deg)" },
          "50%": { transform: "rotate(-5deg)" },
        },
        "bounce-horizontal": {
          "0%, 100%": { transform: "translateX(25%)" },
          "50%": { transform: "translateX(0)" },
        },
      },
      animation: {
        dark: "dark 400ms ease-in-out",
        light: "light 400ms ease-in-out",
        "bounce-horizontal": "bounce-horizontal 1s infinite",
        "pulse-500": "pulse 500ms cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      blur: {
        xxs: "1px",
        xs: "3px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
