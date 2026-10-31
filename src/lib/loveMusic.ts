const MUSIC_URL = 'https://res.cloudinary.com/dy9voteoc/video/upload/v1793463209/Emai-Poyave-Full-SnapYT.App_kjplgj.mp3';

export type LoveMusic = {
  start: () => Promise<void>;
  stop: () => void;
  isPlaying: () => boolean;
};

export function createLoveMusic(): LoveMusic {
  let audio: HTMLAudioElement | null = null;

  const getAudio = () => {
    if (!audio) {
      audio = new Audio(MUSIC_URL);
      audio.loop = true;
      audio.volume = 0.6;
      audio.preload = 'auto';
    }
    return audio;
  };

  return {
    async start() {
      const a = getAudio();
      await a.play();
    },
    stop() {
      if (audio) {
        audio.pause();
      }
    },
    isPlaying() {
      return audio ? !audio.paused && audio.currentTime > 0 && !audio.ended : false;
    },
  };
}
