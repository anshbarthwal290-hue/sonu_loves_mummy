import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import FadeIn, { easeOut } from '@/components/FadeIn';
import { finale } from '@/content/loveContent';

type Burst = {
  id: number;
  x: number;
  y: number;
  rotate: number;
  scale: number;
  color: string;
  isHeart: boolean;
};

type Position = { x: number; y: number };

const BURST_COLORS = ['#E8799A', '#D85C84', '#F4BCC9', '#D4AF72', '#E6CC9A', '#FFF8EE'];
const BURST_COUNT = 36;

function createBurst(): Burst[] {
  return Array.from({ length: BURST_COUNT }, (_, id) => {
    const angle = (Math.PI * 2 * id) / BURST_COUNT + Math.random() * 0.4;
    const distance = 120 + Math.random() * 180;
    return {
      id,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance - 40,
      rotate: Math.random() * 540 - 270,
      scale: 0.7 + Math.random() * 0.8,
      color: BURST_COLORS[id % BURST_COLORS.length],
      isHeart: id % 3 === 0,
    };
  });
}

function randomNoPosition(current: Position): Position {
  let newX = current.x;
  let newY = current.y;
  for (let i = 0; i < 6; i++) {
    const rx = (Math.random() * 2 - 1) * 150;
    const ry = (Math.random() * 2 - 1) * 75;
    const distFromCurrent = Math.hypot(rx - current.x, ry - current.y);
    const distFromCenter = Math.hypot(rx, ry);
    // Ensure it moves away from current spot and doesn't overlap center (Yes button area)
    if (distFromCurrent > 70 && distFromCenter > 50) {
      newX = rx;
      newY = ry;
      break;
    }
  }
  return { x: newX, y: newY };
}

export default function FinalProposal() {
  const [accepted, setAccepted] = useState(false);
  const [bursts, setBursts] = useState<Burst[]>([]);
  const [noPosition, setNoPosition] = useState<Position>({ x: 0, y: 0 });
  const [noTapCount, setNoTapCount] = useState(0);

  const noLabel = useMemo(() => {
    if (noTapCount === 0) return finale.noLabel;
    return finale.noTaunts[(noTapCount - 1) % finale.noTaunts.length];
  }, [noTapCount]);

  const handleYes = (e: React.MouseEvent | React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setBursts(createBurst());
    setAccepted(true);
  };

  const handleNo = (e: React.MouseEvent | React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setNoPosition((prev) => randomNoPosition(prev));
    setNoTapCount((count) => count + 1);
  };

  return (
    <section id="forever" className="relative flex min-h-[80svh] items-center overflow-hidden px-6 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-xl text-center">
        <FadeIn>
          <div className="relative rounded-[2.5rem] border border-white/70 bg-white/55 px-6 py-14 shadow-soft backdrop-blur-xl sm:px-12 sm:py-16">
            <AnimatePresence mode="wait">
              {accepted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: easeOut }}
                  className="flex flex-col items-center"
                >
                  <Heart className="mb-6 h-12 w-12 animate-glow-pulse fill-rose-500 text-rose-500" />
                  <h2 className="font-script text-5xl leading-[1.2] text-burgundy-600 sm:text-6xl">
                    {finale.successTitle}
                  </h2>
                  <p className="mt-6 font-body text-base leading-[1.5] text-burgundy-600/90">{finale.successBody}</p>
                </motion.div>
              ) : (
                <motion.div
                  key="question"
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center"
                >
                  <h2 className="font-script text-5xl leading-[1.2] text-burgundy-600 sm:text-6xl">{finale.title}</h2>

                  <div className="mt-12 flex w-full flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-8">
                    <button
                      type="button"
                      onPointerDown={handleYes}
                      onClick={handleYes}
                      className="min-h-14 min-w-[10rem] cursor-pointer rounded-full bg-gradient-to-r from-rose-500 to-burgundy-600 px-10 py-4 font-body text-base font-medium text-cream-50 shadow-glow transition duration-300 hover:scale-105 hover:shadow-[0_0_36px_8px_rgba(216,92,132,0.45)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-4 focus-visible:ring-offset-cream-100"
                    >
                      {finale.yesLabel}
                    </button>

                    <motion.button
                      type="button"
                      onPointerDown={handleNo}
                      onClick={handleNo}
                      animate={{ x: noPosition.x, y: noPosition.y }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="min-h-14 min-w-[8rem] cursor-pointer rounded-full border border-burgundy-500/30 bg-white/70 px-8 py-4 font-body text-base text-burgundy-600 shadow-soft transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                    >
                      {noLabel}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {accepted &&
              bursts.map((burst) => (
                <motion.span
                  key={burst.id}
                  aria-hidden="true"
                  initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0.4 }}
                  animate={{ x: burst.x, y: burst.y, opacity: 0, rotate: burst.rotate, scale: burst.scale }}
                  transition={{ duration: 1.8 + (burst.id % 4) * 0.2, ease: easeOut }}
                  className="pointer-events-none absolute left-1/2 top-1/2 -ml-2 -mt-2"
                >
                  {burst.isHeart ? (
                    <Heart className="h-4 w-4 fill-current" style={{ color: burst.color }} />
                  ) : (
                    <span className="block h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: burst.color }} />
                  )}
                </motion.span>
              ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
