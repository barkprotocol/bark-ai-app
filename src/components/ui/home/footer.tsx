'use client';

import { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className="bg-white text-gray-400 py-8">
      <div className="container mx-auto text-center">
        <p>&copy; 2025 BARK Protocol. All Rights Reserved.</p>
        <div className="mt-4">
          <a href="#" className="mx-4 hover:text-gray-400">Privacy Policy</a>
          <a href="#" className="mx-4 hover:text-gray-400">Terms of Use</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
