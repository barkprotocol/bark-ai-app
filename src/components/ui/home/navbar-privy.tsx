'use client';

import { FC, useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';

const Navbar: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { login, user, logout } = usePrivy();
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const renderNavLinks = () => (
    <>
      <Link href="/" className="hover:text-gray-400 transition">
        Home
      </Link>
      <Link href="/about" className="hover:text-gray-400 transition">
        About
      </Link>
      <Link href="/docs" className="hover:text-gray-400 transition">
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
          {user ? (
            <button
              onClick={logout}
              className="w-full px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/80 transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={login}
              className="w-full px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/80 transition"
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
      await login();
      // After login, redirect to the dashboard or another page
      router.push('/home');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/'); // Redirect to homepage after logout
  };

  return (
    <nav className="bg-white text-gray-950 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 py-4">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <img
              src="https://ucarecdn.com/bbc74eca-8e0d-4147-8a66-6589a55ae8d0/bark.webp"
              alt="BARK AI Logo"
              className="w-10 h-10 mr-2"
            />
            <span className="text-xl font-semibold text-black">
              BARK <span className="font-bold">AI</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {renderNavLinks()}
          {user ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/80 transition"
              aria-label="Logout"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/80 transition"
              aria-label="Login"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <button
            className="text-gray-950 hover:text-gray-400"
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
