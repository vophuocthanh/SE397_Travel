import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Toaster } from 'sonner';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Toaster richColors position='top-right' />
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
