import '@/styles/globals.css';
import { useEffect } from 'react';
import { queryClient } from '@/services/libs/react-query';
import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import { DefaultSeo } from 'next-seo';
import { hotjar } from 'react-hotjar';
import SEO_CONFIG from '@/next-seo.config';
import { ToastContainer } from 'react-toastify';
import { Router } from 'next/router';
import nProgress from 'nprogress';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-loading-skeleton/dist/skeleton.css';
import 'swiper/css';
import 'swiper/css/pagination';

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || (page => page);

  useEffect(() => {
    hotjar.initialize(process.env.NEXT_PUBLIC_HJID, process.env.NEXT_PUBLIC_HJSV);
  }, []);

  useEffect(() => {
    Router.events.on('routeChangeStart', nProgress.start);
    Router.events.on('routeChangeComplete', nProgress.done);
    Router.events.on('routeChangeError', nProgress.done);

    return () => {
      Router.events.off('routeChangeStart', nProgress.start);
      Router.events.off('routeChangeComplete', nProgress.done);
      Router.events.off('routeChangeError', nProgress.done);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        {/* <Head>
        <title>Empowering Data Analysis with Free - Data Watch</title>
      </Head> */}
        <GoogleAnalytics trackPageViews={{ ignoreHashChange: true }} />
        {getLayout(<Component {...pageProps} />)}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme="light"
          pauseOnHover
          pauseOnFocusLoss
          draggable
          closeOnClick={false}
        />
        <DefaultSeo {...SEO_CONFIG} />
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  );
}
