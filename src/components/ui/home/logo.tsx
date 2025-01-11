import Link from 'next/link';
import { cn } from '@/lib/utils';
import { DynamicImage } from '../../dynamic-image';

export default function Logo({
  width = 100,
  height = width,
  className,
  logoUrl = '/',
}: {
  width?: number;
  height?: number;
  className?: string;
  logoUrl?: string;
}) {
  return (
    <div className="relative">
      <Link href={logoUrl}>
        <DynamicImage
          lightSrc="https://ucarecdn.com/bbc74eca-8e0d-4147-8a66-6589a55ae8d0/bark.webp"
          darkSrc="https://ucarecdn.com/bbc74eca-8e0d-4147-8a66-6589a55ae8d0/bark.webp"
          alt="Logo"
          width={width}
          height={height}
          className={cn('select-none', className)}
        />
      </Link>
      <span className="absolute top-0 right-0 text-xs font-semibold text-gray-500"></span>
    </div>
  );
}

interface BrandProps {
  className?: string;
  logoUrl?: string;
}

export function Brand({ className, logoUrl }: BrandProps) {
  return (
    <Link href={logoUrl || 'https://ucarecdn.com/e8f198aa-1473-4f5f-9157-c2be535208dc/BARKAI.png'}>
      <div className="flex items-center gap-2">
        <Logo width={32} logoUrl={logoUrl} />
        <span className="text-x select-none font-bold font-inter text-black">BARK</span>
        <span className="text-x select-none font-medium font-inter text-black">AI</span>
      </div>
    </Link>
  );
}
