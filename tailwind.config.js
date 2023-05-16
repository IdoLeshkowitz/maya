const experimentConfig = require('./public/experimentConfig.json')

console.log(experimentConfig.colors)
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme:{
        colors: experimentConfig.colors,
    },
    plugins: [],
}
