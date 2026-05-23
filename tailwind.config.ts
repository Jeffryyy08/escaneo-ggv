import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ggv: {
          green: '#1B4332',
          light: '#2D6A4F',
          accent: '#52B788',
          brown: '#BC6C25',
          gold: '#D4A373',
          cream: '#FEFAE0',
        }
      },
    },
  },
  plugins: [],
}

export default config