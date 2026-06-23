'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import type { Persister } from '@tanstack/react-query-persist-client';
// import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
// import { createStore, del, get, set } from 'idb-keyval';
import type { ReactNode } from 'react';
import { getQueryClient } from '@/lib/query-client';

// const zentionStore = createStore('zention-db', 'zention-global');

// const persister: Persister | undefined =
//   typeof window !== 'undefined'
//     ? {
//         persistClient: (client) => set('global', client, zentionStore),
//         restoreClient: () => get('global', zentionStore),
//         removeClient: () => del('global', zentionStore),
//       }
//     : undefined;

interface Props {
  children: ReactNode;
}

export const QueryProvider = ({ children }: Props) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
