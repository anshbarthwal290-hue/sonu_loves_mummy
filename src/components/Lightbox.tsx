import { useEffect } from 'react';
import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { photos } from '@/content/loveContent';

type LightboxProps = {
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

const SWIPE_DISTANCE = 80;
const SWIPE_VELOCITY = 500;

export default function Lightbox({ index, onClose, onNavigate }: LightboxProps) {
  const total = photos.length;

  useEffect(() => {
    if (index === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onNavigate((index + 1) % total);
      if (event.key === 'ArrowLeft') onNavigate((index - 1 + total) % total);
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [index, onClose, onNavigate, total]);

  const handleDragEnd = (_event: unknown, info: PanInfo) => {
    if (index === null) return;
    const goingNext = info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY;
    const goingPrevious = info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY;
    if (goingNext) onNavigate((index + 1) % total);
    if (goingPrevious) onNavigate((index - 1 + total) % total);
  };

  const navButtonClass =
    'absolute top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-cream-50 backdrop-blur-sm transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 sm:flex';

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-burgundy-700/95 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onClose();
            }}
            aria-label="Close photo"
            className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-cream-50 backdrop-blur-sm transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onNavigate((index - 1 + total) % total);
            }}
            aria-label="Previous photo"
            className={`${navButtonClass} left-4`}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onNavigate((index + 1) % total);
            }}
            aria-label="Next photo"
            className={`${navButtonClass} right-4`}
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <motion.div
            key={index}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.5}
            onDragEnd={handleDragEnd}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.35 }}
            onClick={(event) => event.stopPropagation()}
            className="flex h-full w-full touch-pan-y items-center justify-center p-4 sm:p-16"
          >
            <img
              src={photos[index].src}
              alt={photos[index].alt}
              draggable={false}
              className="max-h-[80vh] max-w-full select-none rounded-2xl object-contain shadow-2xl"
            />
          </motion.div>

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-body text-xs tracking-[0.2em] text-blush-100">
            {index + 1} / {total}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
