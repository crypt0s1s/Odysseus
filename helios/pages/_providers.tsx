import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StoreProvider, rootStore } from '../api';

const queryClient = new QueryClient()

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider value={rootStore}>
          {children}
      </StoreProvider>
    </QueryClientProvider>
  )
}
