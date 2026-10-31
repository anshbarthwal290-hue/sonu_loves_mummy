import { motion } from 'framer-motion';
import FadeIn, { easeOut } from '@/components/FadeIn';
import Photo from '@/components/Photo';
import SectionHeader from '@/components/SectionHeader';
import { photos, timeline } from '@/content/loveContent';

type MemoriesTimelineProps = {
  onOpenPhoto: (index: number) => void;
};

export default function MemoriesTimeline({ onOpenPhoto }: MemoriesTimelineProps) {
  return (
    <section id="memories" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl">
        <SectionHeader title={timeline.title} />

        <ol className="relative">
          <motion.span
            aria-hidden="true"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 2, ease: easeOut }}
            className="absolute bottom-0 left-4 top-0 w-px origin-top bg-gradient-to-b from-rose-300 via-gold-400 to-rose-300 sm:left-1/2 sm:-translate-x-1/2"
          />

          {timeline.moments.map((moment, index) => {
            const isRight = index % 2 === 1;
            return (
              <li key={moment.title} className="relative mb-14 pl-14 last:mb-0 sm:pl-0">
                <span
                  aria-hidden="true"
                  className="absolute left-4 top-6 flex h-3 w-3 -translate-x-1/2 items-center justify-center rounded-full bg-rose-500 ring-4 ring-blush-100 sm:left-1/2"
                />
                <FadeIn
                  direction={isRight ? 'right' : 'left'}
                  className={`sm:w-[calc(50%-2.5rem)] ${isRight ? 'sm:ml-auto' : ''}`}
                >
                  <article className="rounded-3xl border border-white/70 bg-white/60 p-4 shadow-soft backdrop-blur-md">
                    <Photo
                      src={photos[moment.photoIndex].src}
                      alt={photos[moment.photoIndex].alt}
                      onClick={() => onOpenPhoto(moment.photoIndex)}
                      className="mb-4 aspect-[4/3]"
                    />
                    <p className="font-body text-[11px] font-medium uppercase tracking-[0.2em] text-burgundy-500">
                      {moment.date}
                    </p>
                    <h3 className="mt-1 font-script text-4xl leading-[1.2] text-burgundy-600">{moment.title}</h3>
                    <p className="mt-2 font-body text-sm leading-[1.5] text-burgundy-600/85">{moment.caption}</p>
                  </article>
                </FadeIn>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
