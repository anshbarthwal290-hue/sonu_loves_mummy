import { useState } from 'react';
import { Heart, X } from 'lucide-react';

const SECTIONS = [
  { id: 'story', label: 'Our Story' },
  { id: 'memories', label: 'Memories' },
  { id: 'reasons', label: 'Reasons' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'letter', label: 'Love Letter' },
  { id: 'counter', label: 'Our Time' },
  { id: 'forever', label: 'Forever' },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setOpen(false);
  };

  return (
    <nav aria-label="Sections" className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <div
        className={`origin-bottom-right overflow-hidden rounded-3xl border border-white/70 bg-white/80 shadow-soft backdrop-blur-xl transition-all duration-300 ${
          open ? 'visible scale-100 opacity-100' : 'invisible scale-95 opacity-0'
        }`}
      >
        <ul className="flex w-48 flex-col p-2">
          {SECTIONS.map((section) => (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => goTo(section.id)}
                className="flex w-full items-center rounded-2xl px-4 py-3 text-left font-body text-sm text-burgundy-600 transition hover:bg-blush-100 hover:text-burgundy-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={open ? 'Close section menu' : 'Open section menu'}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-burgundy-600 text-cream-50 shadow-glow transition duration-300 hover:scale-105 active:scale-95 animate-glow-pulse focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
      >
        {open ? <X className="h-5 w-5" /> : <Heart className="h-6 w-6 fill-cream-50" />}
      </button>
    </nav>
  );
}
