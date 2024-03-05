import { type Metadata } from 'next';
import Header from '@/components/layout/header';
import ThemeProvider from '@/components/shared/theme-provider';
import { Toaster } from '@/components/ui/toaster';

export default function SubLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute='class' defaultTheme='light' enableSystem>
      <Header />
      <main>{children}</main>
      <Toaster />
    </ThemeProvider>
  );
}
