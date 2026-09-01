/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FBFAF7",
        "paper-2": "#F4F1E9",
        ink: "#14181B",
        "ink-2": "#3D4348",
        "ink-3": "#6B7178",
        rule: "#E4E0D7",
        "rule-2": "#D3CEC0",
        teal: {
          DEFAULT: "#0F5257",
          soft: "#0F525714",
          ink: "#0A3A3E",
        },
        claret: "#8A3A3A",
        sage: "#3F6B52",
        amber: "#9A6B1E",
      },
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1rem", letterSpacing: "0.08em" }],
      },
      maxWidth: {
        doc: "1180px",
        prose: "68ch",
      },
      boxShadow: {
        card: "0 1px 2px rgba(20,24,27,0.04), 0 12px 32px -12px rgba(20,24,27,0.12)",
        lift: "0 24px 60px -20px rgba(20,24,27,0.22)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s cubic-bezier(0.16,1,0.3,1) both",
      },
    },
  },
  plugins: [],
};
