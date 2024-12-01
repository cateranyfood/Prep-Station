'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function QueryProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // SSR friendly stale time
        staleTime: 60 * 1000, // 1 minute
        // Disable auto refetch in production for performance
        refetchOnWindowFocus: process.env.NODE_ENV === 'development',
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}