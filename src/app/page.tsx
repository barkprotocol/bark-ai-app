'use client';

import Hero from '@/components/ui/home/hero';
import ProductPreview from '@/components/ui/home/product-preview';
import Features from '@/components/ui/home/features';
import Navbar from '@/components/ui/home/navbar';
import Footer from '@/components/ui/home/footer';

const Page = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

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
