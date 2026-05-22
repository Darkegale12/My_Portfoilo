import { useRef } from 'react';
import type { ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

type BlurScrollSectionProps = {
  children: ReactNode;
  blurStrength?: number;
  offset?: [string, string];
};

const BlurScrollSection = ({
  children,
  blurStrength = 10,
  offset = ['0 1', '0.4 1'],
}: BlurScrollSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as any,
  });

  const blur = useTransform(scrollYProgress, [0, 1], [blurStrength, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  return (
    <div ref={ref}>
      <motion.div
        style={{
          filter: useTransform(blur, (v) => `blur(${v}px)`),
          opacity,
          willChange: 'filter, opacity',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default BlurScrollSection;