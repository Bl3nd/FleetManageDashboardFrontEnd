/*import type {Config} from 'tailwindcss'*/

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter var', ...defaultTheme.fontFamily.sans],
			}
		},
		colors: {
			transparent: 'transparent',
			'red': '#D10000',
			'white': '#FBFDFE',
			'neutral': {
				50: '#fafafa',
				100: '#f5f5f5',
				200: '#e5e5e5',
				300: '#d4d4d4',
				400: '#a3a3a3',
				500: '#737373',
				600: '#525252',
				700: '#404040',
				800: '#262626',
				900: '#171717',
				950: '#0a0a0a',
			},
			'blue': {
				100: '#5155bf',
				200: '#272ca9',
				300: '#060b93',
				400: '#050976',
				500: '#040768',
				600: '#040659',
				700: '#03054a',
				800: '#02043b',
			},
			'light-blue': {
				100: '#d0e8f4',
				200: '#c1e1f1',
				300: '#b1d8ec',
				400: '#a0c4d5',
				500: '#7d98a6',
				600: '#6b828e',
				700: '#47575f',
				800: '#354147',
				900: '#242b2f',
			},
			'accent': '#366b96',
			'background': {
				100: '#ECF0F3',
			},
		},
	},
	plugins: [
		require("@tailwindcss/forms")
	],
};