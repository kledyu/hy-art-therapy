import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/App';
import { Toaster } from '@/components/ui/sonner';
async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('@/mocks/browser');

  return worker.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
      <Toaster position='top-center' richColors />
    </StrictMode>
  );
});
