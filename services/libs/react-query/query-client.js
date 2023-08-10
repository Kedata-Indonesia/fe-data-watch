import { Alert } from '@/components/base/alert';
import { QueryCache, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query) {
        Alert.error({
          title: 'Error',
          text: 'Your session may expired' ?? 'Something went wrong',
        });
      }
    },
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      cacheTime: Infinity,
      retry: 2,
      retryDelay: 1000,
      networkMode: 'always',
      useErrorBoundary: false,
    },
    mutations: {
      cacheTime: Infinity,
      networkMode: 'always',
      retry: 2,
      retryDelay: 1000,
      useErrorBoundary: false,
    },
  },
});

export default queryClient;
