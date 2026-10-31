import { Heart } from 'lucide-react';

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
};

export default function SectionHeader({ title, subtitle, align = 'center' }: SectionHeaderProps) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left';
  return (
    <header className={`mb-12 flex flex-col ${alignment}`}>
      <h2 className="font-script text-5xl leading-[1.2] text-burgundy-600 sm:text-6xl">{title}</h2>
      <div className="mt-3 flex items-center gap-3" aria-hidden="true">
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold-400" />
        <Heart className="h-3.5 w-3.5 fill-rose-400 text-rose-400" />
        <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold-400" />
      </div>
      {subtitle && <p className="mt-4 max-w-md text-sm leading-[1.5] text-burgundy-500">{subtitle}</p>}
    </header>
  );
}
