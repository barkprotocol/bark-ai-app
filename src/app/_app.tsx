import { AppProps } from 'next/app';
import { WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { clusterApiUrl, Cluster } from '@solana/web3.js';
import { ThemeProvider } from 'next-themes';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import Navbar from '@/components/ui/home/navbar';
import '../styles/globals.css';

// Ensure network is typed as Cluster | undefined
const network: Cluster = (process.env.NEXT_PUBLIC_SOLANA_NETWORK as Cluster) || 'mainnet-beta';
const endpoint = clusterApiUrl(network);

function BarkAiApp({ Component, pageProps }: AppProps) {
  // Define wallet adapters
  const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
  ];

  return (
    // Wrap everything in ThemeProvider and ConnectionProvider
    <ThemeProvider attribute="class"> {/* Ensure correct theme attribute for dark mode */}
      <ConnectionProvider endpoint={endpoint}>
        {/* Wrap with WalletProvider to enable wallet connection */}
        <WalletProvider wallets={wallets} autoConnect>
          {/* Navigation bar */}
          <Navbar />
          {/* Render the component */}
          <Component {...pageProps} />
        </WalletProvider>
      </ConnectionProvider>
    </ThemeProvider>
  );
}

export default BarkAiApp;
