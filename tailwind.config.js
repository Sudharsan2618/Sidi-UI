/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#B3D9FF", // Light blue
          DEFAULT: "#64A9FF", // Soft blue
          dark: "#3879D2", // Deep blue
        },
        secondary: {
          light: "#E9F4FF", // Very light blue
          DEFAULT: "#A3C6FF", // Light sky blue
          dark: "#3A7FB1", // Slightly deeper blue
        },
        neutral: {
          light: "#F9F9F9", // Very light gray for background
          DEFAULT: "#E1E1E1", // Soft neutral gray
          dark: "#B0B0B0", // Slightly darker gray for accents
        },
        danger: "#FF4F5A", // Soft red for errors
        success: "#50D27E", // Soft green for success messages
        warning: "#FFB542", // Soft orange for warnings
      },
      fontFamily: {
        sans: ["Inter", "Roboto", "sans-serif"], // Keeping your original fonts
        mono: ["Fira Code", "monospace"], // Great for coding contexts
      },
      borderRadius: {
        DEFAULT: "0.75rem", // Slightly larger for a refined feel
        md: "1rem", // Large corners for a more refined design
        lg: "1.5rem", // More rounded for a sophisticated look
        full: "9999px",
      },
      boxShadow: {
        blueGlow:
          "0 4px 6px -1px rgba(100, 169, 255, 0.2), 0 2px 4px -2px rgba(100, 169, 255, 0.1)", // Soft blue glow
      },

      keyframes: {
        'ping-cube': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.5)', opacity: '0.6' },
        },
      },
      animation: {
        'ping-cube': 'ping-cube 0.8s infinite',
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
            boxShadow: theme("boxShadow.blueGlow"),
          },
        },
        ".btn-secondary": {
          backgroundColor: theme("colors.secondary.DEFAULT"),
          color: "#333",
          "&:hover": {
            backgroundColor: theme("colors.secondary.dark"),
            transform: "scale(1.05)",
            boxShadow: theme("boxShadow.blueGlow"),
          },
        },
      });
    }),
  ],
};
