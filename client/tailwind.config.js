/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        float: 'float 30s linear infinite',
        'float-slow': 'float 40s linear infinite',
        'move-on-hover': 'moveOnHover 1s ease-in-out',
        leaf: 'leaf 10s ease-in-out infinite',
        'leaf-slow': 'leaf 15s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        moveOnHover: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0)' },
        },
        leaf: {
          '0%': { transform: 'translateY(-100%) rotate(0deg)' },
          '50%': { transform: 'translateY(50%) rotate(180deg)' },
          '100%': { transform: 'translateY(-100%) rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}

