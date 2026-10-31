import { useEffect, useRef, useState, type KeyboardEvent } from 'react';

type PhotoProps = {
  src: string;
  alt: string;
  className?: string;
  natural?: boolean;
  imagePosition?: string;
  onClick?: () => void;
};

export default function Photo({
  src,
  alt,
  className = '',
  natural = false,
  imagePosition = 'center',
  onClick,
}: PhotoProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) setLoaded(true);
  }, [src]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `View photo: ${alt}` : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={`group relative flex flex-col rounded-2xl bg-white/90 p-2.5 shadow-soft ring-1 ring-white/80 transition duration-500 ${
        onClick
          ? 'cursor-zoom-in hover:-translate-y-1 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500'
          : ''
      } ${className}`}
    >
      <div className={`relative overflow-hidden rounded-xl bg-blush-200 ${natural ? '' : 'min-h-0 flex-1'}`}>
        <div
          className={`absolute inset-0 bg-gradient-to-br from-blush-200 to-rose-300/60 transition-opacity duration-700 ${
            loaded || failed ? 'opacity-0' : 'animate-pulse opacity-100'
          }`}
        />
        {failed && (
          <div className="absolute inset-0 flex items-center justify-center p-4 text-center text-sm text-rose-700">
            This photo couldn't be loaded.
          </div>
        )}
        <img
          src={src}
          alt={alt}
          ref={imgRef}
          decoding="async"
          draggable={false}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          style={{ objectPosition: imagePosition }}
          className={`transition-all duration-700 ${
            natural ? 'block h-auto w-full' : 'absolute inset-0 h-full w-full object-cover'
          } ${loaded ? 'scale-100 opacity-100' : 'scale-105 opacity-0'} ${onClick ? 'group-hover:scale-105' : ''}`}
        />
      </div>
    </div>
  );
}
