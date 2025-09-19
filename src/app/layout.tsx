import '@/styles/globals.css';
import '@/styles/burger-menu.css';
import '@/styles/card.css';
import '@/styles/countries.css';
import '@/styles/favourite.css';
import '@/styles/header.css';
import '@/styles/random.css';
import '@/styles/toggle.css';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Countries App',
  description: 'Browse countries and view details',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
