import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef5ff",
          100: "#d9e7ff",
          200: "#bcd5ff",
          300: "#8ebaff",
          400: "#5993ff",
          500: "#3470ff",
          600: "#1d4ff4",
          700: "#163ce0",
          800: "#1832b5",
          900: "#1a318f",
          950: "#141f56",
        },
        ink: {
          50: "#f6f7f9",
          100: "#ebeef3",
          200: "#d3dae4",
          300: "#adbacd",
          400: "#8094b1",
          500: "#607699",
          600: "#4c5e7f",
          700: "#3f4d68",
          800: "#374257",
          900: "#21283a",
          950: "#0e1320",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "ui-monospace", "Menlo", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px 0 rgb(15 23 42 / 0.04), 0 1px 3px 0 rgb(15 23 42 / 0.06)",
        soft: "0 8px 24px -8px rgb(15 23 42 / 0.10)",
      },
    },
  },
  plugins: [],
};

export default config;
