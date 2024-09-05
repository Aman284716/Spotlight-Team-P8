/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'zoom-in-out': {
          '0%, 100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
          '50%': {
            transform: 'scale(1.1)',
            opacity: '0.9',
          },
        },
      },
      animation: {
        'zoom-in-out': 'zoom-in-out 2s infinite',
      },
    },
  },
  plugins: [],
}

