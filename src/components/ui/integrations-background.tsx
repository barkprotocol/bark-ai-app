'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Logo from '@/components/ui/home/logo';
import { AnimatedBeam } from './animated-beam';
import { Circle } from './circle';

export const IntegrationsBackground = () => {
  // Refs to track individual circle elements for animation connections
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRefs = Array.from({ length: 7 }, () => useRef<HTMLDivElement>(null));

  return (
    <div
      className="absolute inset-0 flex items-center justify-end pr-12"
      ref={containerRef}
    >
      <div className="flex max-h-[180px] max-w-[300px] flex-col items-stretch justify-between gap-6">
        {/* First row of circles */}
        <div className="flex flex-row items-center justify-between">
          <Circle ref={circleRefs[0]} className="transition-transform hover:scale-110">
            <Image src="/integrations/dexscreener.svg" alt="DexScreener" width={24} height={24} />
          </Circle>
          <Circle ref={circleRefs[4]} className="transition-transform hover:scale-110">
            <Image src="/integrations/dialect.svg" alt="Dialect" width={24} height={24} />
          </Circle>
        </div>

        {/* Second row of circles */}
        <div className="flex flex-row items-center justify-between">
          <Circle ref={circleRefs[1]} className="transition-transform hover:scale-110">
            <Image src="/integrations/jupiter.svg" alt="Jupiter" width={24} height={24} />
          </Circle>
          <Circle ref={circleRefs[3]} className="transition-transform hover:scale-110 size-14">
            <div className="size-8">
              <Logo />
            </div>
          </Circle>
          <Circle ref={circleRefs[5]} className="transition-transform hover:scale-110">
            <Image src="/integrations/magic_eden.svg" alt="Magic Eden" width={24} height={24} />
          </Circle>
        </div>

        {/* Third row of circles */}
        <div className="flex flex-row items-center justify-between">
          <Circle ref={circleRefs[2]} className="transition-transform hover:scale-110">
            <Image src="/integrations/pump_fun.svg" alt="Pump Fun" width={24} height={24} />
          </Circle>
          <Circle ref={circleRefs[6]} className="transition-transform hover:scale-110">
            <Image src="/integrations/defined_fi.svg" alt="Defined Fi" width={24} height={24} />
          </Circle>
        </div>
      </div>

      {/* Animated connections between circles */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={circleRefs[0]}
        toRef={circleRefs[3]}
        curvature={-50}
        endYOffset={-8}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={circleRefs[1]}
        toRef={circleRefs[3]}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={circleRefs[2]}
        toRef={circleRefs[3]}
        curvature={50}
        endYOffset={8}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={circleRefs[4]}
        toRef={circleRefs[3]}
        curvature={-50}
        endYOffset={-8}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={circleRefs[5]}
        toRef={circleRefs[3]}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={circleRefs[6]}
        toRef={circleRefs[3]}
        curvature={50}
        endYOffset={8}
        reverse
      />
    </div>
  );
};
