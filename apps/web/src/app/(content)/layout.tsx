import { type Metadata } from 'next';
import Header from '@/components/layout/header';
import ThemeProvider from '@/components/shared/theme-provider';
import { Toaster } from '@/components/ui/toaster';

export const viewport = {
  width: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function SubLayout({
  children,
  loginDialog,
}: {
  children: React.ReactNode;
  loginDialog: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute='class' defaultTheme='light' enableSystem>
      <Header />
      <main>
        {children}
        {loginDialog}
      </main>
      <Toaster />
    </ThemeProvider>
  );
}
