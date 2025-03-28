const options = require("./config"); //options from config.js
const plugin = require('tailwindcss/plugin');

const allPlugins = {
  typography: require("@tailwindcss/typography"),
  forms: require("@tailwindcss/forms"),
  containerQueries: require("@tailwindcss/container-queries"),
};

const plugins = Object.keys(allPlugins)
  .filter((k) => options.plugins[k])
  .map((k) => {
    if (k in options.plugins && options.plugins[k]) {
      return allPlugins[k];
    }
  });

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,php,twig}"],
  darkMode: "class",
  separator: ':',
  important: true,
  theme: {
    //screen size
    screens: {
      'xxs': '375px',
      'xs': '480px',
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      'xxl':  '1400px',
      'xxxl': '1600px'
    },

    //color
    colors: {
      inherit: 'inherit',
      transparent: 'transparent',
      brand: {
        1: '#254336',
        2: '#6B8A7A',
        3: '#B7B597',
        4: '#DAD3BE',
      },
      palette: {
        text: '#000000',
        background: '#F9EFE7',
        highlight: '#FFE872'
      },

      //text primary color
      'primary-01': '#0E0D35',
      'primary-02': '#27264A',
      'primary-03': '#3E3D5D',
      'primary-04': '#575672',
      'primary-05': '#6E6E86',
      'primary-06': '#868599',
      'primary-07': '#9F9EAE',
      'primary-08': '#B7B7C3',
      'primary-09': '#CFCFD7',
      'primary-10': '#E7E7EB',

      //text sub color
      'sub-01': '#626C7A',
      'sub-02': '#707986',
      'sub-03': '#7D8591',
      'sub-04': '#8C939C',
      'sub-05': '#999FA7',

      //color
      'white': '#FFFFFF',
      'grey-pale': '#F4F6F9',
      'red-light': '#F15E75',
      'tael': '#25F4EE',
      'blue-light': '#E7F6FD',

      //message alert
      'message-alert': '#FD2C55',
      'message-warning': '#FFC300',
      'message-success-01': '#00D764',
      'message-success-02': '#0D6EFD',

      //grey
      'grey': '#f7f7f9',
      'grey-100': '#F6F6F6',
      'grey-150': '#EBEBEB',
      'grey-300': '#CCCCCC',
      'grey-400': '#B0B2B3',
      'grey-600': '#B7B4B9',
      'grey-800': '#6F7072',
    },

    //spacing (marging & padding)
    spacing: {
      '0': '0',
      '1': '0.063rem',
      '2': '0.125rem',
      '3': '0.188rem',
      '4': '0.25rem',
      '5': '0.313rem',
      '6': '0.375rem',
      '7': '0.438rem',
      '8': '0.5rem',
      '9': '0.563rem',
      '10': '0.625rem',
      '11': '0.688rem',
      '12': '0.75rem',
      '13': '0.813rem',
      '14': '0.875rem',
      '15': '0.938rem',
      '16': '1rem',
      '17': '1.063rem',
      '18': '1.125rem',
      '19': '1.188rem',
      '20': '1.25rem',
      '21': '1.313ren',
      '22': '1.375em',
      '23': '1.438rem',
      '24': '1.5rem',
      '25': '1.563rem',
      '26': '1.625rem',
      '27': '1.688rem',
      '28': '1.75rem',
      '29': '1.813rem',
      '30': '1.875rem',
      '31': '1.938rem',
      '32': '2rem',
      '33': '2.063rem',
      '34': '2.125rem',
      '35': '2.188rem',
      '36': '2.25rem',
      '37': '2.313rem',
      '38': '2.375rem',
      '39': '2.438rem',
      '40': '2.5rem',
      '41': '2.563rem',
      '42': '2.625rem',
      '43': '2.688rem',
      '44': '2.75rem',
      '45': '2.813rem',
      '46': '2.875rem',
      '47': '2.938rem',
      '48': '3rem',
      '49': '3.063rem',
      '50': '3.125rem',
      '51': '3.188rem',
      '52': '3.25rem',
      '53': '3.313rem',
      '54': '3.375rem',
      '55': '3.438rem',
      '56': '3.5rem',
      '57': '3.563rem',
      '58': '3.625rem',
      '59': '3.688rem',
      '60': '3.75rem',
      '61': '3.813rem',
      '62': '3.875rem',
      '63': '3.938rem',
      '64': '4rem',
      '65': '4.063rem',
      '66': '4.125rem',
      '67': '4.188rem',
      '68': '4.25rem',
      '69': '4.313rem',
      '70': '4.375rem',
      '72': '4.5rem',
      '80': '5rem',
      '86': '5.375rem',
      '90': '5.625rem',
      '100': '6.25rem',
      '120': '7.5rem'
    },

    //font
    fontFamily: {
      body: '"Mulish", serif',
      heading: '"Abril Fatface", serif',
      faBrand: 'fa-brand',
      faRegular: 'fa-regular',
      faSolid: 'fa-solid',
      yeseva: 'Yeseva One',
    },

    //font size in rem
    fontSize: {
      '12': '0.75rem',
      '14': '0.875rem',
      '15': '0.938rem',
      '16': '1rem',
      '18': '1.125rem',
      '20': '1.25rem',
      '22': '1.375em',
      '24': '1.5rem',
      '26': '1.625rem',
      '28': '1.75rem',
      '30': '1.875rem',
      '32': '2rem',
      '36': '2.25rem',
      '40': '2.5rem',
      '48': '3rem',
    },

    //font weight
    fontWeight: {
      '100': '100',
      '200': '200',
      '300': '300',
      '400': '400',
      '500': '500',
      '600': '600',
      '700': '700',
      '800': '800',
      '900': '900',
    },

    //letters spacing
    letterSpacing: {
      default:  '0',
      '0.4':   '0.4px', //0.4 px
      '1':    '1px' // 1px
    },

    //rouded or border radius
    borderRadius: {
      '0': '0',
      '4': '4px',
      '6': '6px',
      '8': '8px',
      '16': '16px',
      '24': '24px',
      '99': '999999px'
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.inherit-font': {'font-family': 'inherit'},
        '.inherit-size': {'font-size': 'inherit'},
        '.inherit-weight': {'font-weight': 'inherit',},
        '.inherit-leading': {'line-height': 'inherit'},
        '.inherit-tracking': {'letter-spacing': 'inherit'},
        '.inherit-color': {'color': 'inherit'},
        '.inherit-align': {'text-align': 'inherit'},
        '.no-decoration': {'text-decoration': 'none'},
        '.no-outline': {'outline': 'none'},
        '.no-shadow': {'box-shadow': 'none'}
      })
    })
  ]
};
