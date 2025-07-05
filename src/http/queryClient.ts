import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3,
      retryOnMount: false,
    },
    mutations: {
      onError: (error) => {
        console.log(error);
      },
    },
  },
});

export default queryClient;
