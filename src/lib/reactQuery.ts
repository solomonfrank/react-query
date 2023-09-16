import { DefaultOptions, QueryClient } from "@tanstack/react-query";

const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: import.meta.env.PROD,
    retry: false,
    staleTime: 3000,
  },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });
