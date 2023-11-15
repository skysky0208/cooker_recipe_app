/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        // 'カラー名': 'カラーコード'
        'logo-orange': '#fcba3d',
        'logo-darkorange': '#fdaa0d',
      },
    },
  },
  plugins: [],
}

