import '@/styles/globals.css';
import Head from 'next/head';
import { queryClient } from '@/services/libs/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import { DefaultSeo } from 'next-seo';
import SEO_CONFIG from '@/next-seo.config';

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || (page => page);

  return (
    <QueryClientProvider client={queryClient}>
      {/* <Head>
        <title>Empowering Data Analysis with Free - Data Watch</title>
      </Head> */}
      <GoogleAnalytics trackPageViews={{ ignoreHashChange: true }} />
      {getLayout(<Component {...pageProps} />)}
      <DefaultSeo {...SEO_CONFIG} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
