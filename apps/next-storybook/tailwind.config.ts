import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme"

const config: Config = {
  content: [
    './src/stories/**/*.{ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        '4xs': ['0.625rem', '0.875rem'], // '10px', '14px'
        '3xs': ['0.75rem', '1rem'], // '12px', '16px'
        '2xs': ['0.8125rem', '1.125rem'], // '13px', '18px'
        xs: ['0.875rem', '1.25rem'], // '14px', '20px'
        sm: ['0.9375rem', '1.375rem'], // '15px', '22px'
        lg: ['1.125rem', '1.625rem'], // '18px', '26px'
        '2xl': ['1.375rem', '1.875rem'], // '22px', '30px'
        '3xl': ['1.5rem', '2rem'], // '24px', '32px'
        '4xl': ['1.625rem', '2.125rem'], // '26px', '34px'
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
        mono: ['var(--font-roboto-mono)', ...fontFamily.mono],
      },
    },
  },
  plugins: [],
};
export default config;
