/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "health-blue-light": "#9CCBFB",
        "health-blue-reguler": "#286DA8",
        "health-blue-medium": "#1F4E78",
        "health-blue-dark": "#004A7C",
        "health-red-light": "#A82828",
        "health-red-dark": "#6F1C1C",
      },
    },
  },
  plugins: [],
};
