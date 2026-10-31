import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import FadeIn from '@/components/FadeIn';
import SectionHeader from '@/components/SectionHeader';
import { reasons } from '@/content/loveContent';

export default function ReasonCards() {
  return (
    <section id="reasons" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeader title={reasons.title} subtitle={reasons.subtitle} />

        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-5">
          {reasons.items.map((text, index) => (
            <FadeIn key={text} delay={(index % 5) * 0.06}>
              <ReasonCard number={index + 1} text={text} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

type ReasonCardProps = {
  number: number;
  text: string;
};

function ReasonCard({ number, text }: ReasonCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFlipped((value) => !value)}
      aria-pressed={flipped}
      aria-label={`Reason ${number}. Tap to ${flipped ? 'hide' : 'reveal'}.`}
      className="group relative aspect-[4/5] w-full [perspective:1000px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-4 focus-visible:ring-offset-cream-100 rounded-2xl"
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-full w-full [transform-style:preserve-3d]"
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/60 bg-gradient-to-br from-rose-500 via-rose-600 to-burgundy-600 text-cream-50 shadow-soft transition duration-500 group-hover:shadow-glow [backface-visibility:hidden]">
          <Heart className="mb-2 h-6 w-6 animate-glow-pulse fill-cream-50 text-cream-50 sm:h-8 sm:w-8" />
          <span className="font-script text-5xl leading-none sm:text-6xl">{String(number).padStart(2, '0')}</span>
          <span className="mt-3 font-body text-[10px] uppercase tracking-[0.25em] text-blush-100">Tap to open</span>
        </div>

        <div className="absolute inset-0 flex items-center justify-center rounded-2xl border border-gold-300/70 bg-white/85 p-5 text-center shadow-soft backdrop-blur-md [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="font-body text-sm leading-[1.5] text-burgundy-700 sm:text-base">{text}</p>
        </div>
      </motion.div>
    </button>
  );
}
