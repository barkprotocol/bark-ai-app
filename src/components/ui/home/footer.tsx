'use client';

import { FC } from 'react';
import { useTheme } from 'next-themes';
import { FaTelegramPlane } from 'react-icons/fa';
import { BsMedium } from 'react-icons/bs';

const Footer: FC = () => {
  const { theme } = useTheme();

  return (
    <footer
      className={`py-8 ${
        theme === 'light' ? 'bg-white text-gray-600' : 'bg-gray-1000 text-gray-400'
      }`}
    >
      <div className="container mx-auto text-center">
        <h3 className="text-lg text-gray-800 font-semibold mb-4">Follow Us</h3>
        <div className="mt-6 flex justify-center space-x-6">
          {/* Telegram */}
          <a
            href="https://t.me/bark-protocol"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            className="text-2xl hover:text-blue-500"
          >
            <FaTelegramPlane />
          </a>

          {/* X (formerly Twitter) */}
          <a
            href="https://x.com/bark_protocol"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (formerly Twitter)"
            className="text-2xl font-bold hover:text-blue-400"
          >
            X
          </a>

          {/* Medium */}
          <a
            href="https://medium.com/@ybarkprotocol"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Medium"
            className="text-2xl hover:text-black dark:hover:text-white"
          >
            <BsMedium />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
