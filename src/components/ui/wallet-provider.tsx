import { FC, ReactNode } from 'react';
import {
  WalletProvider as SolanaWalletProvider,
  ConnectionProvider,
} from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { usePrivy } from '@privy-io/react-auth';

// Define available wallets
const wallets = [
  new PhantomWalletAdapter(),
  new SolflareWalletAdapter(),
];

interface WalletProviderProps {
  children: ReactNode;
}

const WalletProvider: FC<WalletProviderProps> = ({ children }) => {
  const { user } = usePrivy(); // Access Privy user context

  // Dynamic selection of network (Mainnet/Devnet)
  const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'mainnet-beta';
  const endpoint =
    network === 'mainnet-beta'
      ? 'https://api.mainnet-beta.solana.com'
      : 'https://api.devnet.solana.com';

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider wallets={wallets} autoConnect>
        {user ? (
          <>{children}</> // Only render children if the user is authenticated
        ) : (
          <div className="unauthenticated">
            <p>Please log in to continue</p>
          </div>
        )}
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
};

export default WalletProvider;
