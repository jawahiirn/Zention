'use client';

import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { del, get, set } from 'idb-keyval';
import type { ReactNode } from 'react';
import { getQueryClient } from '@/services/query-client';

const persister =
  typeof window !== 'undefined'
    ? createAsyncStoragePersister({
        storage: {
          getItem: (key: string) => get<string>(key),
          setItem: (key: string, value: string) => set(key, value),
          removeItem: (key: string) => del(key),
        },
      })
    : undefined;

interface Props {
  children: ReactNode;
}

export const QueryProvider = ({ children }: Props) => {
  const queryClient = getQueryClient();

  if (!persister) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    );
  }

  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister, maxAge: Infinity }}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </PersistQueryClientProvider>
  );
};
