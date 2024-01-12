/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'check': "url('/assets/images/icon-check.svg')",
        'desktop-dark': "url('/src/assets/images/bg-desktop-dark.jpg')",
        'desktop-light': "url('/src/assets/images/bg-desktop-light.jpg')",
        'mobile-dark': "url('/src/assets/images/bg-mobile-dark.jpg')",
        'mobile-light': "url('/src/assets/images/bg-mobile-light.jpg')",
      }
    },
  },
  plugins: [],
}

