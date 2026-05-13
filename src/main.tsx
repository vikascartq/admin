import { HeroUIProvider } from '@heroui/react';
import { ToastProvider } from "@heroui/toast";
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './context/AuthProvider.tsx';
import './index.css';
import Index from './routes/index.tsx';

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <HeroUIProvider>
      <ToastProvider placement='top-right' />
      <Index />
    </HeroUIProvider>
  </AuthProvider>,
)
