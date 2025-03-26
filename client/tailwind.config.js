/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          "base-100": "#f9fafb",
          "base-200": "#f3f4f6",
          "base-300": "#e5e7eb",
        }
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          "base-100": "#020617",
          "base-200": "#0f172a",
          "base-300": "#1e293b",
        }
      }
    ],
    darkTheme: "dark",
    base: true,
    styled: true,
  },
};
