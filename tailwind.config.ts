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
      },
      "keyframes": {
        "bounce": {
          "0%, 100%": {
            transform: "translateY(-5%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)"
          },
          "50%": {
            transform: "translateY(0)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)"
          }
        },
        "rain": {
          "0%": {
            top: "95vh"
          },
          "100%": {
            top: "205vh"
          }
        },
        "roll": {
          "0%": {
            transform: "rotate(0deg)"
          },
          "100%": {
            transform: "rotate(360deg)"
          }
        }
      }
    },
  },
  plugins: [],
}

