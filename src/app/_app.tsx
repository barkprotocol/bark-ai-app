import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import WalletProvider from '@/components/ui/wallet-provider';
import Navbar from '@/components/ui/home/navbar';
import '../styles/globals.css';

function BarkAiApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <WalletProvider>
        <Navbar />
        <Component {...pageProps} />
      </WalletProvider>
    </ThemeProvider>
  );
}

export default BarkAiApp;
