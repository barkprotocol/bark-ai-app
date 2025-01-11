import { CSSProperties, FC, ReactNode, ElementType } from 'react';

import { cn } from '@/lib/utils';

interface AnimatedShinyTextProps {
  children: ReactNode;
  className?: string;
  shimmerWidth?: number;
  as?: ElementType; // Allow changing the element type (e.g., "h1", "div")
}

const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
  children,
  className,
  shimmerWidth = 100,
  as: Component = 'p', // Default to 'p', but can be overridden
}) => {
  return (
    <Component
      style={{
        '--shiny-width': `${shimmerWidth}px`,
      } as CSSProperties}
      className={cn(
        'mx-auto max-w-md text-neutral-600/70 dark:text-neutral-400/70',
        'animate-shiny-text bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shiny-width)_100%] [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]',
        'bg-gradient-to-r from-transparent via-black/80 via-50% to-transparent  dark:via-white/80',
        className
      )}
    >
      {children}
    </Component>
  );
};

export default AnimatedShinyText;