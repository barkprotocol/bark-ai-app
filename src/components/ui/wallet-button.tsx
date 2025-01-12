import { FC } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useTheme } from 'next-themes';

const WalletButton: FC = () => {
  const { connected, connect, disconnect } = useWallet();
  const { theme } = useTheme();

  return (
    <button
      onClick={connected ? () => disconnect() : () => connect()}
      className={`w-full px-4 py-2 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        theme === 'light'
          ? 'bg-black text-white hover:bg-black/80 focus:ring-black'
          : 'bg-white text-black hover:bg-white/80 focus:ring-white'
      }`}
    >
      {connected ? <span>Disconnect</span> : <span>Connect Wallet</span>}
    </button>
  );
};

export default WalletButton;
