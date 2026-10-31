import { useEffect, useMemo, useRef, useState } from 'react';
import { Music, Pause, Play } from 'lucide-react';
import { createLoveMusic } from '@/lib/loveMusic';

const FIRST_GESTURE_EVENTS = ['pointerdown', 'keydown', 'touchstart', 'click', 'scroll'] as const;

export default function MusicToggle() {
  const music = useMemo(() => createLoveMusic(), []);
  const [playing, setPlaying] = useState(false);
  const playingRef = useRef(false);

  useEffect(() => {
    const begin = async () => {
      if (playingRef.current) return;
      try {
        await music.start();
        playingRef.current = true;
        setPlaying(true);
        removeGestureListeners();
      } catch (err) {
        // Autoplay policy: waiting for user gesture
      }
    };

    const removeGestureListeners = () => {
      FIRST_GESTURE_EVENTS.forEach((event) => window.removeEventListener(event, handleGesture));
    };

    const handleGesture = () => {
      begin();
    };

    // Try starting immediately on load
    begin();

    FIRST_GESTURE_EVENTS.forEach((event) => window.addEventListener(event, handleGesture, { passive: true }));

    return () => {
      removeGestureListeners();
      playingRef.current = false;
      music.stop();
    };
  }, [music]);

  const toggle = async () => {
    if (playingRef.current) {
      playingRef.current = false;
      music.stop();
      setPlaying(false);
    } else {
      try {
        await music.start();
        playingRef.current = true;
        setPlaying(true);
      } catch (err) {
        console.warn('Could not play audio:', err);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? 'Pause background music' : 'Play background music'}
      aria-pressed={playing}
      className="fixed bottom-5 left-5 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/70 bg-white/60 text-burgundy-600 shadow-soft backdrop-blur-md transition duration-300 hover:scale-105 hover:shadow-glow active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
    >
      {playing ? <Pause className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5" />}
      <Music className={`absolute -right-0.5 -top-0.5 h-3.5 w-3.5 text-rose-500 ${playing ? 'animate-pulse' : 'opacity-0'}`} />
    </button>
  );
}
