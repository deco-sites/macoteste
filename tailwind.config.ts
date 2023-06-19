import daisyui from "daisyui";
import type { Config } from "tailwindcss";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    extend: {
      container: { center: true },
      colors: {
        secondary: "#306F95",
        btnDhelf: "#003153",
        accent: "#005EB8",
        white: "#FFF",
        footer: "#1e1e1e",
        btnHover:"#1f2b37"
      },
    },
  },
} satisfies Config;
