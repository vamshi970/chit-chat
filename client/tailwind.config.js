/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        poppins : 'Poppins',
        manrope : 'Manrope',
      },
      backgroundColor: { 
        messageRight: '#5B96F7',
        messageBg: '#F0F4FA',
      },
      textColor: {
        messageRight: '#696969',
      },
    },
  },
  plugins: [],
}