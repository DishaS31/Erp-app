/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        noto: ["Noto Sans", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      fontSize: {
        tiny: "12.8px",
      },
    },
  },
  plugins: [],
}

