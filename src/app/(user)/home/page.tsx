import { Metadata } from 'next';
import { HomeContent } from './home-content';

// Define metadata for the page
export const metadata: Metadata = {
  title: 'Home',
  description: 'Your AI assistant for everything Solana',
  keywords: ['Solana', 'AI assistant', 'Blockchain'],
  author: 'BARK Protocol',
  openGraph: {
    title: 'Home',
    description: 'Your AI assistant for everything Solana',
    url: 'https://ai.barkprotocol.net/home',
    // image: '/og-image.png', // Uncomment when image is available
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home',
    description: 'Your AI assistant for everything Solana',
    // image: '/x-image.png', // Uncomment when image is available
  },
};

export default function HomePage() {
  return <HomeContent />;
}
