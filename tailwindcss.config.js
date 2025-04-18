const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	prefix: "",
	content: [
		'./pages/**/*.{ts,tsx,vue}',
		'./components/**/*.{ts,tsx,vue}',
		'./app/**/*.{ts,tsx,vue}',
		'./src/**/*.{ts,tsx,vue}',
	],
	theme: {
		extend: {
			colors: {
				primary: colors.blue,
				secondary: colors.orange,
				accent: colors.yellow,
				neutral: colors.gray,
			}
		}
	},
	prefix: "",
	plugins: [],
}

