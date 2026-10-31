import { useState } from 'react';
import FloatingBackground from '@/components/FloatingBackground';
import Hero from '@/components/Hero';
import OurStory from '@/components/OurStory';
import MemoriesTimeline from '@/components/MemoriesTimeline';
import ReasonCards from '@/components/ReasonCards';
import PhotoGallery from '@/components/PhotoGallery';
import Lightbox from '@/components/Lightbox';
import LoveLetter from '@/components/LoveLetter';
import ForeverCounter from '@/components/ForeverCounter';
import FinalProposal from '@/components/FinalProposal';
import SiteNav from '@/components/SiteNav';
import MusicToggle from '@/components/MusicToggle';

export default function App() {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  const openPhoto = (index: number) => setViewerIndex(index);
  const closePhoto = () => setViewerIndex(null);

  return (
    <>
      <FloatingBackground />
      <main className="relative z-10 overflow-x-hidden">
        <Hero />
        <OurStory onOpenPhoto={openPhoto} />
        <MemoriesTimeline onOpenPhoto={openPhoto} />
        <ReasonCards />
        <PhotoGallery onOpenPhoto={openPhoto} />
        <LoveLetter />
        <ForeverCounter />
        <FinalProposal />
      </main>
      <SiteNav />
      <MusicToggle />
      <Lightbox index={viewerIndex} onClose={closePhoto} onNavigate={setViewerIndex} />
    </>
  );
}
