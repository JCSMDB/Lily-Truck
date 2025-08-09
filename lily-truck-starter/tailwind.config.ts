import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: "#FFD400", // jaune poussin
          orange: "#FF8C00",
          black: "#0B0B0B"
        }
      }
    }
  },
  plugins: []
};
export default config;
