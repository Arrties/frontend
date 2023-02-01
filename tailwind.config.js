/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        Pretendard: ['Pretendard', 'sans-serif'],
      },
      fontSize: {
        10: '0.625rem',
        11: '0.688rem',
        12: '0.75rem',
        14: '0.875rem',
        15: '0.938rem',
        16: '1rem',
        18: '1.125rem',
        20: '1.25rem',
        24: '1.5rem',
      },
      colors: {
        brand: '#FC6554',
        font: {
          400: '#999999',
          500: '#767676',
          900: '#191919',
        },
        line: {
          1: '#191919',
          2: '#DBDBDB',
          3: '#EDEDED',
          err: '#FF3120',
        },
        bg: {
          1: '#F1F1F5',
          2: '#F8F8FA',
        },
      },
      animation: {
        bounce1: 'bounce 2s ease-in-out infinite ',
        bounce2: 'bounce 2s 0.5s ease-in-out infinite ',
        bounce3: 'bounce 2s 1s ease-in-out infinite ',
      },
      keyframes: {
        bounce: {
          '0%, 20%': { trasnsform: `translate(0,0)` },

          '50%': {
            transform: 'translateY(-150%)',
          },
          '85%, 100%': {
            trasnsform: `translate(0,0)`,
          },
        },
      },
    },
  },

  plugins: [require('@tailwindcss/forms'), require('@headlessui/tailwindcss')],
};
