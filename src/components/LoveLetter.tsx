import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, MailOpen } from 'lucide-react';
import FadeIn, { easeOut } from '@/components/FadeIn';
import SectionHeader from '@/components/SectionHeader';
import { letter } from '@/content/loveContent';

export default function LoveLetter() {
  const [opened, setOpened] = useState(false);

  return (
    <section id="letter" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-xl">
        <SectionHeader title={letter.title} />

        <AnimatePresence mode="wait">
          {opened ? (
            <motion.article
              key="letter"
              initial={{ opacity: 0, y: 48, rotateX: -12 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.9, ease: easeOut }}
              className="relative overflow-hidden rounded-3xl border border-gold-300/70 bg-gradient-to-b from-cream-50 to-cream-200 p-7 shadow-soft sm:p-12"
            >
              <div className="pointer-events-none absolute inset-3 rounded-2xl border border-dashed border-gold-400/40" />
              <div className="relative">
                <p className="font-letter text-3xl leading-[1.2] text-burgundy-600 sm:text-4xl">{letter.greeting}</p>
                <div className="mt-6 space-y-5 font-letter text-2xl leading-[1.5] text-burgundy-700 sm:text-3xl">
                  {letter.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <div className="mt-10 text-right">
                  <p className="font-letter text-2xl leading-[1.2] text-burgundy-600 sm:text-3xl">{letter.signoff}</p>
                  <p className="font-script mt-1 text-4xl leading-[1.2] text-rose-600 sm:text-5xl">{letter.signature}</p>
                </div>
              </div>
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setOpened(false)}
                  className="font-body text-xs uppercase tracking-[0.2em] text-burgundy-500 underline-offset-4 transition hover:text-burgundy-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                >
                  Close letter
                </button>
              </div>
            </motion.article>
          ) : (
            <motion.div key="envelope" exit={{ opacity: 0, y: -24 }} transition={{ duration: 0.5 }}>
              <FadeIn>
                <button
                  type="button"
                  onClick={() => setOpened(true)}
                  aria-label="Open the love letter"
                  className="group relative block aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-br from-blush-100 via-blush-200 to-rose-300/70 shadow-soft transition duration-500 hover:-translate-y-1 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-blush-300 to-blush-200 transition duration-700 [clip-path:polygon(0_0,50%_100%,100%_0)] group-hover:from-rose-300/60"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-blush-200 to-blush-100 [clip-path:polygon(0_100%,50%_0,100%_100%)]"
                  />
                  <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-burgundy-600 shadow-glow animate-glow-pulse transition duration-300 group-hover:scale-110 group-active:scale-95 sm:h-20 sm:w-20">
                    <Heart className="h-7 w-7 fill-cream-50 text-cream-50 sm:h-8 sm:w-8" />
                  </span>
                  <span className="absolute bottom-5 left-0 right-0 flex items-center justify-center gap-2 font-body text-xs uppercase tracking-[0.2em] text-burgundy-600">
                    <MailOpen className="h-4 w-4" />
                    {letter.sealHint}
                  </span>
                </button>
              </FadeIn>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
