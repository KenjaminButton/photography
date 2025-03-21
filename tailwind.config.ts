import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#26294D',    // Deep blue-purple
        secondary: '#FDF1F0',  // Soft pink-white
        accent1: '#E092C1',    // Rose pink
        accent2: '#B9A1E4',    // Lavender purple
        background: '#FFFFFF'   // White background
      },
    },
  },
  plugins: [],
};

export default config;
