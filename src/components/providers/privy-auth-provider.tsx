'use client';

import { ReactNode } from 'react';
import { PrivyProvider } from '@privy-io/react-auth';

export default function PrivyAuthProvider({ children }: { children: ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
      config={{
        appearance: {
          theme: process.env.NEXT_PUBLIC_PRIVY_THEME || 'light',
          accentColor: process.env.NEXT_PUBLIC_PRIVY_ACCENT_COLOR || '#676FFF',
          logo: process.env.NEXT_PUBLIC_PRIVY_LOGO_URL || 'https://ucarecdn.com/c18275e5-d6ca-42d3-9075-676952548776/barkicon.png',
        },
        loginMethods: [
          'email', 'wallet', 'google', 'apple', 'github', 'discord', 'farcaster'
        ],
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
          requireUserPasswordOnCreate: false,
          showWalletUIs: true,
        },
        mfa: {
          noPromptOnMfaRequired: false,
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
