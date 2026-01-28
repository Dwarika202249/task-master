/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
    colors: {
      primary: "#2563EB",      // Focus Blue – main actions, buttons
      secondary: "#0F172A",    // Deep Workspace – app background
      surface: "#111827",      // Cards, panels
      muted: "#94A3B8",        // Secondary text, labels

      accent: "#22C55E",       // Success / Completed tasks
      warning: "#F59E0B",      // Pending / At-risk tasks
      danger: "#EF4444",       // Overdue / Errors
      info: "#38BDF8",         // Info badges

      border: "#1F2937",       // Subtle borders
    },

    fontFamily: {
      sans: ["Inter", "system-ui", "sans-serif"],
    },

    boxShadow: {
      card: "0 8px 30px rgba(0,0,0,0.35)",
    },

    borderRadius: {
      xl: "14px",
    },
  },
},

  plugins: [],
}