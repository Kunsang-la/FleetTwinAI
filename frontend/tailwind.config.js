/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#111827',
          800: '#1f2937',
          700: '#374151',
          600: '#4b5563',
        },
        brand: {
          blue: '#3b82f6',
          orange: '#f97316',
          red: '#ef4444',
          green: '#22c55e',
        }
      }
    },
  },
  plugins: [],
}
