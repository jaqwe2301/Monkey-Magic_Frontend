import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00FF00", // 초록색
        secondary: "#000000", // 검정색
      },
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
        jalnan2: ["var(--font-jalnan2)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
