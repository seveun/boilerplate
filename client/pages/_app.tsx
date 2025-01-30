import { UserProvider } from '@/context/userContext';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { AppProps } from 'next/app';
import '@ui/tailwind.css';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';

import { I18nProvider } from '@locales/i18n';
import { Inter } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '900'],
});

function App({ Component, pageProps }: AppProps) {
  return (
    <I18nProvider locale={pageProps.locale}>
      <UserProvider user={pageProps.user}>
        <Component {...pageProps} />
        <SpeedInsights />
      </UserProvider>
    </I18nProvider>
  );
}

export default App;
