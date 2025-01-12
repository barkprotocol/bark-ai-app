'use client';

import { FC, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import classNames from 'classnames';

const Navbar: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { connect, disconnect, connected } = useWallet();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  // Toggle mobile menu visibility
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Toggle theme between light and dark
  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else setTheme('light');
  };

  const renderNavLinks = () => (
    <>
      <Link href="/" className="hover:text-gray-400 transition">
        Home
      </Link>
      <Link href="/about" className="hover:text-gray-400 transition">
        About
      </Link>
      <Link href="https://docs.barkprotocol.net" className="hover:text-gray-400 transition">
        Docs
      </Link>
    </>
  );

  const renderMobileMenu = () => (
    <div
      className={classNames(
        'md:hidden transition-all duration-300 ease-in-out overflow-hidden',
        {
          'max-h-96': isMenuOpen,
          'max-h-0': !isMenuOpen,
        }
      )}
    >
      <div className="bg-white shadow-lg mt-2">
        <div className="flex flex-col space-y-4 px-6 py-4">
          {renderNavLinks()}
        </div>
        <div className="px-6 py-4">
          {connected ? (
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 rounded-md bg-primary text-black hover:bg-primary/80 transition"
            >
              Disconnect Wallet
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="w-full px-4 py-2 rounded-md bg-primary text-black hover:bg-primary/80 transition"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const handleLogin = async () => {
    try {
      await connect();
      router.push('/home'); // Redirect after login
    } catch (error) {
      console.error('Wallet connection failed', error);
    }
  };

  const handleLogout = () => {
    disconnect();
    router.push('/'); // Redirect after disconnect
  };

  return (
    <nav className={`bg-${theme === 'light' ? 'white' : 'gray-1000'} text-${theme === 'light' ? 'black' : 'white'} shadow-md`}>
      <div className="container mx-auto flex justify-between items-center px-4 py-4">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <img
              src="https://ucarecdn.com/bbc74eca-8e0d-4147-8a66-6589a55ae8d0/bark.webp"
              alt="BARK AI Logo"
              className="w-10 h-10 mr-2"
            />
            <span className={`text-xl font-semibold ${theme === 'light' ? 'text-black' : 'text-white'}`}>
              BARK <span className="font-bold">AI</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {renderNavLinks()}
          {connected ? (
            <button
              onClick={handleLogout}
              className={`px-4 py-2 rounded-md bg-primary text-${theme === 'light' ? 'black' : 'white'} hover:bg-primary/80 transition`}
            >
              Disconnect Wallet
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className={`px-4 py-2 rounded-md bg-primary text-${theme === 'light' ? 'white' : 'black'} hover:bg-primary/80 transition`}
            >
              Connect Wallet
            </button>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`flex items-center justify-center w-10 h-10 rounded-full bg-primary text-${theme === 'light' ? 'black' : 'white'} hover:bg-primary/80 transition`}
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? (
              <Sun className="h-5 w-5 text-white" />
            ) : (
              <Moon className="h-5 w-5 text-black" />
            )}
          </button>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <button
            className={`text-${theme === 'light' ? 'black' : 'white'} hover:text-gray-400`}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {renderMobileMenu()}
    </nav>
  );
};

export default Navbar;
