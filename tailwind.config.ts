import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      // From Small to big
      xs: "375px",
      xxl: "1440px",
      ...defaultTheme.screens,
    },
    extend: {
      boxShadow: {
        1: "0px 2px 20px 0px rgba(0, 0, 0, 0.02)",
        2: "0px 4px 12px 0px rgba(0, 0, 0, 0.02)",
        3: "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)",
      },
      fontFamily: {
        inter: "var(--font-inter)",
        "bai-jamjuree": "var(--font-bai-jamjuree)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "black-shade": {
          1: "#141414",
          2: "#111114",
          3: "#0E0D0F",
          4: "#101828",
          5: "#1A1A1A",
        },
        "gray-shade": {
          1: "#808080",
          2: "#8C8C8F",
          3: "#5F5E66",
          4: "#EAECF0",
          5: "#969699",
        },
        "blue-shade": {
          1: "#00020A",
          2: "#EEFF9B",
          3: "#839F00",
          4: "#FFBE18",
        },
        "green-shade": {
          1: "#51AE26",
          2: "#BAFF9B",
          3: "#51AE26",
          4: "#FFBE18",
        },
        "white-shade": {
          1: "#F7F7F7",
          2: "#FBFBFB",
        },
        "red-shade": {
          1: "#E34B4B",
          2: "#FF5454",
          3: "#FFD4D4",
        },
      },
    },
  },
  plugins: [],
};
export default config;
