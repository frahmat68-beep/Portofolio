import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050608",
        surface: "#0D0E12",
        surfaceBorder: "#1C1F28",
        surfaceElevated: "#14161E",
        cinemaAmber: "#F59E0B",
        cinemaCyan: "#06B6D4",
        cinemaGold: "#D4AF37",
        a24Red: "#E11D48",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-cinzel)", "var(--font-syne)", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.45)",
        glowAmber: "0 0 35px -5px rgba(245, 158, 11, 0.3)",
        glowCyan: "0 0 35px -5px rgba(6, 182, 212, 0.3)",
        glowCinema: "0 0 50px -10px rgba(212, 175, 55, 0.2)",
      },
      animation: {
        'film-flicker': 'flicker 0.15s infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
