'use client';

import Link from 'next/link';
import { DynamicImage } from '../../dynamic-image';
import { cn } from '@/lib/utils';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  logoUrl?: string;
}

export const Logo = ({ width = 100, height = width, className, logoUrl = '/' }: LogoProps) => (
  <div className="relative">
    <Link href={logoUrl}>
      <DynamicImage
        lightSrc="https://ucarecdn.com/bbc74eca-8e0d-4147-8a66-6589a55ae8d0/bark.webp"
        alt="Logo"
        width={width}
        height={height}
        className={cn('select-none', className)}
        darkSrc=""
      />
    </Link>
  </div>
);

interface BrandProps {
  className?: string;
  logoUrl?: string;
}

export const Brand = ({ className, logoUrl = '/' }: BrandProps) => (
  <Link href={logoUrl}>
    <div className={cn('flex items-center gap-2', className)}>
      <Logo width={32} height={32} logoUrl={logoUrl} />
      <div className="flex items-baseline gap-1">
        <span className="text-lg font-bold font-inter text-black select-none">BARK</span>
        <span className="text-lg font-medium font-inter text-gray-700 select-none">AI</span>
      </div>
    </div>
  </Link>
);
