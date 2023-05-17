import defaultTheme from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'
import { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        mono: ['Menlo', ...defaultTheme.fontFamily.mono],
        source: ['Source Sans Pro', ...defaultTheme.fontFamily.sans],
        'ubuntu-mono': ['Ubuntu Mono', ...defaultTheme.fontFamily.mono],
        system: defaultTheme.fontFamily.sans,
        flow: 'Flow',
      },
      colors: {
        ...colors,
        primary: {
          50: '#E0F2F1',
          100: '#B2DFDB',
          200: '#80CBC4',
          300: '#4DB6AC',
          400: '#26A69A',
          500: '#009688',
          600: '#00897B',
          700: '#00796B',
          800: '#00695C',
          900: '#004D40',
        },
        secondary: {
          50: '#fce6e3',
          100: '#ffc4b2',
          200: '#ff9e80',
          300: '#fb774f',
          400: '#f8592a',
          500: '#f43900',
          600: '#e93300',
          700: '#dc2c00',
          800: '#ce2300',
          900: '#b51200',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config
