import type { Preview } from '@storybook/react';
import '../ui/tailwind.css';
import { Inter } from 'next/font/google';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';

export const inter = Inter({
  subsets: ['latin'],
  weight: ['200', '400', '500', '600', '700'],
  variable: '--font-title',
});
// export const satoshi = localFont({
//   src: [
//     {
//       path: "../public/fonts/satoshi/Satoshi-Variable.woff2",
//       weight: "300 900",
//       style: "normal",
//     },
//     {
//       path: "../public/fonts/satoshi/Satoshi-VariableItalic.woff2",
//       weight: "300 900",
//       style: "italic",
//     }
//   ],
//   fallback: ["Arial", "sans-serif"],
//   variable: "--font-body",
//   display: 'swap',
// })

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      values: [{ name: 'Enigma', value: '#111316' }],
      default: 'Enigma',
    },
  },
};

export default preview;
