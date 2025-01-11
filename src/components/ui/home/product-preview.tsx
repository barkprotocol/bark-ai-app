'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { BorderBeam } from '@/components/ui/border-beam';
import BlurFade from '@/components/ui/blur-fade';

const ProductPreview = () => {
  // Track the scroll progress
  const { scrollYProgress } = useScroll();

  // Define transformations based on scrollYProgress
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [30, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 1]);

  return (
    <section className="relative w-full py-12">
      <BlurFade delay={0.6} className="mx-auto max-w-screen-2xl px-6">
        <div className="relative">
          {/* Product images */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={{
              rotateX,
              scale,
              opacity,
              transformPerspective: 1000,
            }}
            transition={{
              type: 'spring',
              stiffness: 50,
              damping: 20,
              delay: 0.5,
            }}
            className="relative mx-auto w-full max-w-[1200px] will-change-transform"
          >
            <div className="group relative overflow-hidden rounded-2xl border bg-card shadow-2xl">
              {/* Light mode image */}
              <div className="relative dark:hidden">
                <Image
                  src="/product.png"
                  alt="BARK AI Interface"
                  width={1200}
                  height={675}
                  className="w-full rounded-2xl"
                  priority
                />
              </div>
              {/* Dark mode image */}
              <div className="relative hidden dark:block">
                <Image
                  src="/product_dark.png"
                  alt="BARK AI Interface"
                  width={1200}
                  height={675}
                  className="w-full rounded-2xl"
                  priority
                />
              </div>
              <BorderBeam
                className="opacity-0 group-hover:opacity-100"
                duration={10}
                size={300}
              />
            </div>

            {/* Decorative elements */}
            <div className="absolute -left-4 -top-4 h-72 w-72 animate-blob rounded-full bg-primary/5 mix-blend-multiply blur-xl" />
            <div className="animation-delay-2000 absolute -right-4 -top-4 h-72 w-72 animate-blob rounded-full bg-secondary/5 mix-blend-multiply blur-xl" />
          </motion.div>
        </div>
      </BlurFade>
    </section>
  );
};

export default ProductPreview;
