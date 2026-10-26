import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCw, X, ZoomIn, ZoomOut } from 'lucide-react';
import { ArtworkItem } from '../types/portfolio';
import { ResilientImage } from './ResilientImage';

interface LightboxModalProps {
  artwork: ArtworkItem | null;
  allArtworks: ArtworkItem[];
  onClose: () => void;
  onSelectArtwork: (artwork: ArtworkItem) => void;
}

const ROTATION_CLASSES = [
  'rotate-0',
  'rotate-90',
  'rotate-180',
  '-rotate-90',
] as const;

export const LightboxModal: React.FC<LightboxModalProps> = ({
  artwork,
  allArtworks,
  onClose,
  onSelectArtwork,
}) => {
  const [zoomed, setZoomed] = useState(false);
  const [rotationStep, setRotationStep] = useState(0);

  const currentIndex = artwork
    ? allArtworks.findIndex((item) => item.id === artwork.id)
    : -1;
  const hasNavigation = currentIndex !== -1 && allArtworks.length > 1;

  const goPrev = () => {
    if (!hasNavigation) return;
    const prevIdx = (currentIndex - 1 + allArtworks.length) % allArtworks.length;
    setZoomed(false);
    setRotationStep(0);
    onSelectArtwork(allArtworks[prevIdx]);
  };

  const goNext = () => {
    if (!hasNavigation) return;
    const nextIdx = (currentIndex + 1) % allArtworks.length;
    setZoomed(false);
    setRotationStep(0);
    onSelectArtwork(allArtworks[nextIdx]);
  };

  useEffect(() => {
    setZoomed(false);
    setRotationStep(0);
  }, [artwork?.id]);

  useEffect(() => {
    if (!artwork) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasNavigation) goPrev();
      if (e.key === 'ArrowRight' && hasNavigation) goNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  if (!artwork) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Pratinjau penuh ${artwork.title}`}
      className="fixed inset-0 z-50 bg-[#09090b]/95 text-[#f4f4f5] flex flex-col justify-between"
    >
      {/* Top Bar */}
      <div className="px-5 sm:px-8 py-4 border-b border-white/10 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-display text-base sm:text-lg font-semibold truncate">
            {artwork.title}
          </h3>
          <p className="text-xs text-zinc-400 truncate">
            {artwork.category} · {artwork.timeline} · {artwork.statusNote}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setRotationStep((prev) => (prev + 1) % 4)}
            aria-label="Putar gambar 90 derajat"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 transition-colors whitespace-nowrap"
          >
            <RotateCw className="w-4 h-4" />
            <span className="hidden sm:inline">Putar</span>
          </button>

          <button
            type="button"
            onClick={() => setZoomed((z) => !z)}
            aria-label={zoomed ? 'Perkecil gambar' : 'Perbesar gambar'}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 transition-colors whitespace-nowrap"
          >
            {zoomed ? (
              <>
                <ZoomOut className="w-4 h-4" />
                <span>100%</span>
              </>
            ) : (
              <>
                <ZoomIn className="w-4 h-4" />
                <span>Perbesar Detail</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup pratinjau"
            className="w-10 h-10 inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 hover:bg-white/15 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main High-Resolution Stage */}
      <div className="relative flex-1 overflow-auto flex items-center justify-center p-4 sm:p-8">
        {hasNavigation && (
          <button
            type="button"
            onClick={goPrev}
            aria-label="Sebelumnya"
            className="fixed left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-white/15 bg-black/60 hover:bg-black/85 inline-flex items-center justify-center text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        <div
          className={`transition-transform duration-200 ${
            ROTATION_CLASSES[rotationStep]
          } ${
            zoomed
              ? 'w-[1400px] max-w-none cursor-zoom-out'
              : 'w-full max-w-5xl max-h-[72vh] cursor-zoom-in'
          }`}
          onClick={() => setZoomed((z) => !z)}
        >
          <ResilientImage
            src={artwork.imageUrl}
            alt={artwork.title}
            fit="contain"
            priority={true}
            containerClassName="w-full h-full rounded-xl bg-white p-2 sm:p-4"
          />
        </div>

        {hasNavigation && (
          <button
            type="button"
            onClick={goNext}
            aria-label="Berikutnya"
            className="fixed right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-white/15 bg-black/60 hover:bg-black/85 inline-flex items-center justify-center text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Bottom Caption & Index */}
      <div className="px-5 sm:px-8 py-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-zinc-300">
        <p className="max-w-3xl leading-relaxed">{artwork.description}</p>
        {hasNavigation && (
          <span className="font-mono text-zinc-400 tabular-nums shrink-0">
            {String(currentIndex + 1).padStart(2, '0')} /{' '}
            {String(allArtworks.length).padStart(2, '0')}
          </span>
        )}
      </div>
    </div>
  );
};
