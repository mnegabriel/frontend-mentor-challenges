import defaultTheme from "tailwindcss/defaultTheme"

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        moon: "url('/src/assets/images/icon-moon.svg')",
        sun: "url('/src/assets/images/icon-sun.svg')",
        cross: "url('/src/assets/images/icon-cross.svg')",
        check: "url('/src/assets/images/icon-check.svg')",
        "desktop-dark": "url('/src/assets/images/bg-desktop-dark.jpg')",
        "desktop-light": "url('/src/assets/images/bg-desktop-light.jpg')",
        "mobile-dark": "url('/src/assets/images/bg-mobile-dark.jpg')",
        "mobile-light": "url('/src/assets/images/bg-mobile-light.jpg')",
      },
      fontFamily: {
        sans: ['"Josefin Sans"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
