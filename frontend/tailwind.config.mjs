/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      boxShadow: {
        glow: "0 0 15px rgba(90,18,54,0.3)",
        floating: "0 10px 25px rgba(0,0,0,0.15)",
      },

      borderRadius: {
        pill: "2rem",
      },

      transitionTimingFunction: {
        bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        soft: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        in: "cubic-bezier(0.4, 0, 1, 1)",
        out: "cubic-bezier(0, 0, 0.2, 1)",
        inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};
