import '@/styles/globals.css';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { queryClient } from '@/services/libs/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import { DefaultSeo } from 'next-seo';
import { hotjar } from 'react-hotjar';
import SEO_CONFIG from '@/next-seo.config';

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || (page => page);

  useEffect(() => {
    hotjar.initialize(process.env.NEXT_PUBLIC_HJID, process.env.NEXT_PUBLIC_HJSV);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GoogleAnalytics trackPageViews={{ ignoreHashChange: true }} />
      <DefaultSeo {...SEO_CONFIG} />
      {getLayout(<Component {...pageProps} />)}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
