import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'dark-1': '#101010',
        'dark-2': '#181818',
        'dark-darker': '#0f0f0f',
        'dark-hover': '#252525',
        'dark-border': '#4b4b4b',
        'dark-border-2': '#1e1e1e',
        'light-1': '#FFFFFF',
        'light-2': '#9e9e9e',
        'light-3': '#6e6e6e',
        'blue-1': '#6e6e6e',
        'blue-2': '#6e6e6e',
        'blue-3': '#6e6e6e',
        'blue-hover': '#3b94ec',
        'red-1': '#ba1a1a'
      }
    },
  },
  plugins: [],
}
export default config
