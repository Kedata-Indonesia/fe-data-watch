import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
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
