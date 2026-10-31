import { motion } from 'framer-motion';
import { ChevronDown, Heart } from 'lucide-react';
import { hero, photos } from '@/content/loveContent';

const words = hero.headline.split(' ');

export default function Hero() {
  const photo = photos[hero.photoIndex];

  return (
    <section id="hero" className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
      <motion.img
        src={photo.src}
        alt={photo.alt}
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 h-full w-full object-cover object-[center_25%]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-rose-600/30 via-burgundy-600/50 to-burgundy-700/90" />

      <div className="relative z-10 flex flex-col items-center px-6 pb-16 pt-32 text-center sm:pb-24">
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          animate={{ opacity: 1, letterSpacing: '0.35em' }}
          transition={{ duration: 1.6, delay: 0.2 }}
          className="mb-6 font-body text-[11px] font-medium uppercase text-blush-100 sm:text-xs"
        >
          {hero.eyebrow}
        </motion.p>

        <h1 className="font-script text-[3.25rem] leading-[1.2] text-cream-50 drop-shadow-[0_2px_18px_rgba(92,23,41,0.55)] sm:text-7xl md:text-8xl">
          {words.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.5 + index * 0.14, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block pr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.a
          href="#story"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6, duration: 1 }}
          className="group mt-14 flex flex-col items-center gap-2 font-body text-xs uppercase tracking-[0.25em] text-blush-100 transition hover:text-cream-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur-sm transition group-hover:bg-white/20">
            <Heart className="h-4 w-4 animate-scroll-bob fill-rose-300 text-rose-300" />
          </span>
          <span>{hero.scrollLabel}</span>
          <ChevronDown className="h-4 w-4 animate-scroll-bob" />
        </motion.a>
      </div>
    </section>
  );
}
