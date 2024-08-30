import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AppRouter } from '@vidoso-fe-task/routes';
import { ROOT_ELEMENT_ID } from '@vidoso-fe-task/constants';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById(ROOT_ELEMENT_ID) as HTMLElement
);

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  </StrictMode>
);
