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
        // Dark hero
        background: "#0A0A0A",
        surface: "#111111",
        surfaceBorder: "#222222",
        surfaceElevated: "#191919",
        // Light editorial
        cream: "#F0ECE5",
        creamDark: "#E3DDD5",
        creamBorder: "#D5CFC7",
        ink: "#111111",
        inkLight: "#555555",
        // Accent
        filmRed: "#C84B2F",
        filmRedLight: "#D9614A",
        cinemaAmber: "#C84B2F",
        cinemaCyan: "#5B8FA8",
        cinemaGold: "#C8A84B",
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      boxShadow: {
        editorial: "0 1px 0 0 rgba(0,0,0,0.12)",
        card: "0 4px 24px 0 rgba(0,0,0,0.08)",
        glowRed: "0 0 40px -8px rgba(200, 75, 47, 0.4)",
        glowAmber: "0 0 40px -8px rgba(200, 75, 47, 0.3)",
        glowCyan: "0 0 40px -8px rgba(91, 143, 168, 0.3)",
        glass: "0 8px 32px rgba(0,0,0,0.45)",
        glowCinema: "0 0 50px -10px rgba(200, 75, 47, 0.2)",
      },
      fontSize: {
        "display-hero": ["clamp(5rem,22vw,22rem)", { lineHeight: "0.9", letterSpacing: "-0.03em" }],
      },
      animation: {
        "float": "float 4s ease-in-out infinite",
        "marquee": "marquee 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
