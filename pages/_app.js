import '@/styles/globals.css';
import Head from 'next/head';
import { queryClient } from '@/services/libs/react-query';
import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import { DefaultSeo } from 'next-seo';
import SEO_CONFIG from '@/next-seo.config';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || (page => page);

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
