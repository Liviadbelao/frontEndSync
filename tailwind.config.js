/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit', // Ativando o JIT
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ], // Garanta que as classes sejam purgadas corretamente
  darkMode: false, // ou 'media' ou 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
