import '@/styles/globals.css';
import { useEffect } from 'react';
import { queryClient } from '@/services/libs/react-query';
import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import { DefaultSeo } from 'next-seo';
import { hotjar } from 'react-hotjar';
import SEO_CONFIG from '@/next-seo.config';
import { Toaster } from 'react-hot-toast';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-loading-skeleton/dist/skeleton.css';
import 'swiper/css';
import 'swiper/css/pagination';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const getLayout = Component.getLayout || (page => page);

  useEffect(() => {
    hotjar.initialize(process.env.NEXT_PUBLIC_HJID, process.env.NEXT_PUBLIC_HJSV);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        {/* <Head>
        <title>Empowering Data Analysis with Free - Data Watch</title>
      </Head> */}
        <GoogleAnalytics trackPageViews={{ ignoreHashChange: true }} />
        {getLayout(<Component {...pageProps} />)}
        <Toaster containerClassName="react-toast" toastOptions={{ className: 'react-toast-el' }} />
        <DefaultSeo {...SEO_CONFIG} />
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  );
}
