'use client';

import { useState } from 'react';
import Hero from '@/components/ui/home/hero';
import ProductPreview from '@/components/ui/home/product-preview';
import Features from '@/components/ui/home/features';
import Navbar from '@/components/ui/home/navbar';
import Footer from '@/components/ui/home/footer';

const Page = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero handleLogin={handleLogin} />

      {/* Product Preview Section */}
      <ProductPreview />

      {/* Features Section */}
      <Features />

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Page;
