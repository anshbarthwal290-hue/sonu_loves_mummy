import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import FadeIn from '@/components/FadeIn';
import SectionHeader from '@/components/SectionHeader';
import { counter, startDate } from '@/content/loveContent';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const startTimestamp = new Date(startDate);

const formattedStart = startTimestamp.toLocaleDateString(undefined, {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

function splitElapsed(elapsed: number) {
  return {
    days: Math.floor(elapsed / DAY),
    hours: Math.floor((elapsed % DAY) / HOUR),
    minutes: Math.floor((elapsed % HOUR) / MINUTE),
    seconds: Math.floor((elapsed % MINUTE) / SECOND),
  };
}

export default function ForeverCounter() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), SECOND);
    return () => window.clearInterval(id);
  }, []);

  const elapsed = splitElapsed(Math.max(0, now - startTimestamp.getTime()));
  const units = [
    { label: 'Days', value: elapsed.days },
    { label: 'Hours', value: elapsed.hours },
    { label: 'Minutes', value: elapsed.minutes },
    { label: 'Seconds', value: elapsed.seconds },
  ];

  return (
    <section id="counter" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <SectionHeader title={counter.title} subtitle={`${counter.subtitle} ${formattedStart}`} />

        <FadeIn>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {units.map((unit) => (
              <div
                key={unit.label}
                className="rounded-3xl border border-white/70 bg-white/55 px-4 py-6 shadow-soft backdrop-blur-md sm:py-8"
              >
                <div className="flex h-14 items-center justify-center overflow-hidden sm:h-16">
                  <motion.span
                    key={unit.value}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="font-body text-4xl font-light tabular-nums text-burgundy-600 sm:text-5xl"
                  >
                    {String(unit.value).padStart(2, '0')}
                  </motion.span>
                </div>
                <p className="mt-2 font-body text-[11px] font-medium uppercase tracking-[0.2em] text-burgundy-500">
                  {unit.label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
