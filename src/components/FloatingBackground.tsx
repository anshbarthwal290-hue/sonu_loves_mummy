import { useMemo } from 'react';
import { Heart } from 'lucide-react';

type Particle = {
  id: number;
  left: number;
  duration: number;
  delay: number;
  size: number;
  isHeart: boolean;
};

const PARTICLE_COUNT = 16;

function createParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, id) => ({
    id,
    left: Math.random() * 100,
    duration: 14 + Math.random() * 12,
    delay: -Math.random() * 20,
    size: 10 + Math.random() * 14,
    isHeart: id % 3 !== 0,
  }));
}

export default function FloatingBackground() {
  const particles = useMemo(createParticles, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {particles.map((particle) =>
        particle.isHeart ? (
          <Heart
            key={particle.id}
            className="absolute bottom-0 animate-heart-float fill-rose-300/60 text-rose-300/60 will-change-transform"
            style={{
              left: `${particle.left}%`,
              width: particle.size,
              height: particle.size,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ) : (
          <span
            key={particle.id}
            className="absolute -top-10 animate-petal-fall rounded-[100%_0_100%_0] bg-blush-300/70 will-change-transform"
            style={{
              left: `${particle.left}%`,
              width: particle.size,
              height: particle.size * 0.7,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ),
      )}
    </div>
  );
}
