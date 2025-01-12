import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { createConfig, http } from 'wagmi';
import { mainnet, goerli } from 'wagmi/chains';
import { toPrivyWallet } from '@privy-io/cross-app-connect/rainbow-kit';

// Solana Wallet Adapter imports
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { clusterApiUrl } from '@solana/web3.js';

// Ethereum Wallet Configuration (RainbowKit + Wagmi)
const ethereumConnectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [
        toPrivyWallet({
          id: 'privy-wallet-app-id', // Replace with your actual Privy app ID
          name: 'bark-ai',
          iconUrl: 'https://ucarecdn.com/bbc74eca-8e0d-4147-8a66-6589a55ae8d0/bark.webp',
        }),
      ],
    },
  ],
  {
    appName: 'Privy', // Application name
    projectId: 'Demo', // Project ID from Privy
  },
);

// Solana Wallet Adapter Configuration
const solanaWallets = [
  new PhantomWalletAdapter(),
  new SolflareWalletAdapter(),
];

// Ethereum Configuration using wagmi and RainbowKit
export const ethereumConfig = createConfig({
  chains: [mainnet, goerli], // Add other networks if needed
  transports: {
    [mainnet.id]: http(),
    [goerli.id]: http(),
  },
  connectors: ethereumConnectors,
  ssr: true, // Enable SSR if needed
});

// Solana Wallet Provider Configuration
export const SolanaConfig: React.FC = ({ children }) => {
  return (
    <ConnectionProvider endpoint={clusterApiUrl('mainnet-beta')}>
      <WalletProvider wallets={solanaWallets}>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
};
