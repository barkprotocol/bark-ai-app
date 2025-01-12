import React from 'react';
import PrivyAuthProvider from '@/components/providers/privy-auth-provider';

function App({ Component, pageProps }) {
  return (
    <PrivyAuthProvider>
      <Component {...pageProps} />
    </PrivyAuthProvider>
  );
}

export default App;
