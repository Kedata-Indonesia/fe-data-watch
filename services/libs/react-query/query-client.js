import { QueryCache, QueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query) {
        toast.error(error?.response?.data?.message ?? 'Something went wrong');
      }
    },
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      cacheTime: Infinity,
      retry: 3,
      retryDelay: 1000,
      networkMode: 'always',
    },
    mutations: {
      cacheTime: Infinity,
      networkMode: 'always',
      retry: 2,
      retryDelay: 1000,
    },
  },
});

export default queryClient;
