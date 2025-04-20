/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        secondary: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        dark: {
          bg: '#121212',
          card: '#1e1e1e',
          border: '#2e2e2e',
          text: '#e0e0e0',
          'text-secondary': '#a0a0a0',
        },
        danger: "#FF4F5A", // Soft red for errors
        success: "#50D27E", // Soft green for success messages
        warning: "#FFB542", // Soft orange for warnings
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: "0.75rem", // Slightly larger for a refined feel
        md: "1rem", // Large corners for a more refined design
        lg: "1.5rem", // More rounded for a sophisticated look
        full: "9999px",
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 15px rgba(14, 165, 233, 0.3)',
        'dark': '0 2px 15px -3px rgba(0, 0, 0, 0.2), 0 10px 20px -2px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-in',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        ".btn": {
          padding: "0.75rem 1.25rem", // Slightly larger padding for buttons
          borderRadius: theme("borderRadius.DEFAULT"),
          fontWeight: "600", // Slightly bold for a refined look
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background-color 0.2s, transform 0.2s, box-shadow 0.2s",
        },
        ".btn-primary": {
          backgroundColor: theme("colors.primary.DEFAULT"),
          color: "#fff",
          "&:hover": {
            backgroundColor: theme("colors.primary.dark"),
            transform: "scale(1.05)",
            boxShadow: theme("boxShadow.glow"),
          },
        },
        ".btn-secondary": {
          backgroundColor: theme("colors.secondary.DEFAULT"),
          color: "#333",
          "&:hover": {
            backgroundColor: theme("colors.secondary.dark"),
            transform: "scale(1.05)",
            boxShadow: theme("boxShadow.glow"),
          },
        },
      });
    }),
  ],
};
