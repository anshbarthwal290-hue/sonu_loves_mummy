import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
};

const offsets = {
  up: { x: 0, y: 32 },
  left: { x: -32, y: 0 },
  right: { x: 32, y: 0 },
  none: { x: 0, y: 0 },
};

export default function FadeIn({ children, className, delay = 0, direction = 'up' }: FadeInProps) {
  const offset = offsets[direction];
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: easeOut, delay }}
    >
      {children}
    </motion.div>
  );
}
