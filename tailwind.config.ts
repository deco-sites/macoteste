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
        btnHover: "#1f2b37",
      },
      customClasses: {
        "line-clamp-2": {
          "text-overflow": "ellipsis",
          overflow: "hidden",
          display: "-webkit-box",
          "-webkit-line-clamp": "2",
          "-webkit-box-orient": "vertical",
          "white-space": "normal",
        },
        "check": {
          "background": "red",
          "color": "red!important",
        },
      },
    },
  },
} satisfies Config;
