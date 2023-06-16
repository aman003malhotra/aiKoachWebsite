/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.{html,js,css}",
    "./src/**/*.{html,js,css}",
    "./views/*.{html,js,ejs}",
    "./views/**/*.{html,js,ejs}",
    "./node_modules/tw-elements/dist/js/**/*.js",
    "./node_modules/editorjs-parser/build/Parser.node.js",
  ],
  plugins: [require("tw-elements/dist/plugin.cjs")],
  corePlugins: {
    preflight: true,
    tableLayout: true
  }
}