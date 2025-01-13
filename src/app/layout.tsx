import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import AuthProviders from '@/components/provider-auth';
import { ThemeProvider } from '@/components/provider-theme';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | BARK AI',
    default: 'BARK AI - The Intelligent Copilot for Solana',
  },
  description: 'The Intelligent Copilot Transforming Your Solana Experience',
  icons: {
    icon: 'https://ucarecdn.com/9a2cc40e-f557-4512-82e4-5dbe3e5e07d3/BARKAI.svg',
  },
  // Add other metadata like keywords or Open Graph tags for better SEO
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          `${geistSans.variable} ${geistMono.variable}`,
          'overflow-x-hidden antialiased',
        )}
      >
        <AuthProviders>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main className="overflow-hidden md:overflow-visible">
              {children}
              <Toaster />
            </main>
          </ThemeProvider>
        </AuthProviders>

        {/* Footer Section */}
        <footer className="bg-primary text-primary-foreground py-4 mt-8">
          <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
            <div className="text-center text-gray-200 md:text-left">
              <p>&copy; {new Date().getFullYear()} BARK Protocol. All rights reserved.</p>
            </div>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <a href="/terms" className="text-gray-400 hover:text-accent">
                Terms of Use
              </a>
              <a href="/privacy" className="text-gray-400 hover:text-accent">
                Privacy Policy
              </a>
            </div>
          </div>
        </footer>

        {/* Load Analytics and Speed Insights only on production */}
        {process.env.NODE_ENV === 'production' && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  );
}
