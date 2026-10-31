import FadeIn from '@/components/FadeIn';
import Photo from '@/components/Photo';
import SectionHeader from '@/components/SectionHeader';
import { gallery, photos } from '@/content/loveContent';

type PhotoGalleryProps = {
  onOpenPhoto: (index: number) => void;
};

export default function PhotoGallery({ onOpenPhoto }: PhotoGalleryProps) {
  return (
    <section id="gallery" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeader title={gallery.title} subtitle={gallery.subtitle} />

        <div className="columns-2 gap-4 sm:gap-6 md:columns-3">
          {photos.map((photo, index) => (
            <FadeIn key={photo.src} delay={(index % 2) * 0.1} className="mb-4 break-inside-avoid sm:mb-6">
              <Photo src={photo.src} alt={photo.alt} natural onClick={() => onOpenPhoto(index)} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
