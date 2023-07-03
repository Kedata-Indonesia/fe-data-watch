import '@/styles/globals.css';
import { queryClient } from '@/services/libs/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Empowering Data Analysis with Free - Data Watch</title>
      </Head>
      <GoogleAnalytics trackPageViews={{ ignoreHashChange: true }} />
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
