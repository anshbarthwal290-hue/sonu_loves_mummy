import FadeIn from '@/components/FadeIn';
import Photo from '@/components/Photo';
import SectionHeader from '@/components/SectionHeader';
import { photos, story } from '@/content/loveContent';

type OurStoryProps = {
  onOpenPhoto: (index: number) => void;
};

export default function OurStory({ onOpenPhoto }: OurStoryProps) {
  return (
    <section id="story" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto grid max-w-5xl items-center gap-14 md:grid-cols-2 md:gap-20">
        <FadeIn direction="left" className="mx-auto w-full max-w-xs md:max-w-sm">
          <Photo
            src={photos[story.photoIndex].src}
            alt={photos[story.photoIndex].alt}
            onClick={() => onOpenPhoto(story.photoIndex)}
            className="aspect-[4/5] -rotate-2 md:rotate-2"
          />
        </FadeIn>

        <FadeIn direction="right" delay={0.15}>
          <div className="rounded-3xl border border-white/70 bg-white/55 p-7 shadow-soft backdrop-blur-md sm:p-10">
            <SectionHeader title={story.title} align="left" />
            <div className="space-y-5 font-body text-base leading-[1.5] text-burgundy-600/90">
              {story.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
