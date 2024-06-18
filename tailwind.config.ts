/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        // 'inner-lg': 'inset 0 4px 8px 0 rgb(0 0 0 / 0.25)',
      }
    },
  },
  plugins: [],
}

