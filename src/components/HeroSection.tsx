import React, { useState } from 'react';
import { ArrowUpRight, Maximize2, Pencil, SlidersHorizontal } from 'lucide-react';
import { ArtworkItem, PortfolioData, UISettings } from '../types/portfolio';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  data: PortfolioData;
  settings: UISettings;
  isEditMode: boolean;
  onOpenAdjuster: () => void;
  onToggleEditMode: () => void;
  onInspectArtwork: (artwork: ArtworkItem) => void;
  onUpdateField: <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  data,
  settings,
  isEditMode,
  onOpenAdjuster,
  onToggleEditMode,
  onInspectArtwork,
  onUpdateField,
}) => {
  const showcaseArtworks = data.artworks.slice(0, 5);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const currentArtwork = showcaseArtworks[activeSlideIndex] || data.artworks[0];

  return (
    <section id="top" className="pt-8 sm:pt-12 pb-6">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        {/* Adjustable Workspace Utility Strip (below header, unobtrusive & fast) */}
        <div className="mb-8 pb-4 border-b border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs sm:text-[13px] text-[var(--text-secondary)]">
            {isEditMode ? (
              <input
                type="text"
                value={data.kicker}
                onChange={(e) => onUpdateField('kicker', e.target.value)}
                aria-label="Keterangan profesi dan lokasi"
                className="w-full sm:w-[420px] px-2.5 py-1 rounded border border-[var(--border-strong)] bg-[var(--bg-elevated)] text-[var(--text-primary)] text-xs"
              />
            ) : (
              data.kicker
            )}
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleEditMode}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors duration-150 whitespace-nowrap shrink-0 ${
                isEditMode
                  ? 'bg-[var(--accent-primary)] text-[var(--accent-contrast)] border-[var(--accent-primary)]'
                  : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--border-strong)]'
              }`}
            >
              <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{isEditMode ? 'Selesai Edit' : 'Edit Konten'}</span>
            </button>

            <button
              type="button"
              onClick={onOpenAdjuster}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors duration-150 whitespace-nowrap shrink-0"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Sesuaikan Tampilan</span>
            </button>
          </div>
        </div>

        {/* 2-Column Hero Split with Equal Height Stretch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              {isEditMode ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">
                      Judul Utama Hero
                    </label>
                    <textarea
                      rows={3}
                      value={data.heroHeadline}
                      onChange={(e) => onUpdateField('heroHeadline', e.target.value)}
                      className="w-full p-3 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-elevated)] font-display text-2xl font-semibold text-[var(--text-primary)]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">
                      Ringkasan Pendek
                    </label>
                    <textarea
                      rows={4}
                      value={data.heroSummary}
                      onChange={(e) => onUpdateField('heroSummary', e.target.value)}
                      className="w-full p-3 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-elevated)] text-sm text-[var(--text-secondary)]"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="font-display font-semibold tracking-tight text-[clamp(2.2rem,3.8vw,3.55rem)] leading-[1.08] text-[var(--text-primary)] headline-balance">
                    {data.heroHeadline}
                  </h1>
                  <p className="mt-5 text-[15px] sm:text-base leading-[1.68] text-[var(--text-secondary)] max-w-[62ch]">
                    {data.heroSummary}
                  </p>
                </>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#karya"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg bg-[var(--accent-primary)] text-[var(--accent-contrast)] hover:bg-[var(--accent-hover)] transition-colors duration-150 whitespace-nowrap shrink-0"
                >
                  <span>Lihat Karya Pilihan</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>

                <a
                  href="#sertifikat"
                  className="inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-lg border border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors duration-150 whitespace-nowrap shrink-0"
                >
                  Sertifikasi Studio &amp; 3D
                </a>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-[var(--border-subtle)]">
              {isEditMode ? (
                <input
                  type="text"
                  value={data.availabilityText}
                  onChange={(e) => onUpdateField('availabilityText', e.target.value)}
                  aria-label="Status ketersediaan kolaborasi"
                  className="w-full px-2.5 py-1.5 rounded border border-[var(--border-strong)] bg-[var(--bg-elevated)] text-xs text-[var(--text-secondary)]"
                />
              ) : (
                <p className="text-xs sm:text-[13px] text-[var(--text-muted)]">
                  {data.availabilityText}
                </p>
              )}
            </div>
          </div>

          {/* Right Column: Interactive Showcase Frame at Matching Height */}
          <div className="lg:col-span-6 flex flex-col">
            {currentArtwork && (
              <div className="h-full min-h-[340px] lg:min-h-[430px] rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 sm:p-5 flex flex-col justify-between">
                <div className="relative flex-1 min-h-[250px] sm:min-h-[320px] rounded-xl overflow-hidden bg-[var(--bg-elevated)] border border-[var(--border-subtle)] group">
                  <button
                    type="button"
                    onClick={() => onInspectArtwork(currentArtwork)}
                    aria-label={`Perbesar karya ${currentArtwork.title}`}
                    className="w-full h-full block text-left cursor-zoom-in"
                  >
                    <ResilientImage
                      src={currentArtwork.imageUrl}
                      alt={currentArtwork.title}
                      fit="contain"
                      priority={true}
                      containerClassName="w-full h-full min-h-[250px] sm:min-h-[320px] p-2 sm:p-3 bg-[var(--bg-elevated)]"
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() => onInspectArtwork(currentArtwork)}
                    className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-canvas)]/90 backdrop-blur-sm border border-[var(--border-subtle)] text-xs font-medium text-[var(--text-primary)] opacity-95 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap shrink-0"
                  >
                    <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Inspeksi Detail</span>
                  </button>
                </div>

                {/* Caption & Quick Sheet Selector */}
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[var(--text-primary)] truncate">
                      {currentArtwork.title}
                    </p>
                    <p className="text-xs text-[var(--text-muted)] truncate mt-0.5">
                      {currentArtwork.category} · {currentArtwork.statusNote}
                    </p>
                  </div>

                  {showcaseArtworks.length > 1 && (
                    <div
                      role="tablist"
                      aria-label="Pilih lembar pratinjau karya"
                      className="flex items-center gap-1 p-1 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-subtle)] shrink-0 self-start sm:self-auto"
                    >
                      {showcaseArtworks.map((art, idx) => (
                        <button
                          key={art.id}
                          type="button"
                          role="tab"
                          aria-selected={activeSlideIndex === idx}
                          onClick={() => setActiveSlideIndex(idx)}
                          className={`px-2.5 py-1 text-xs font-mono tabular-nums rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 ${
                            activeSlideIndex === idx
                              ? 'bg-[var(--accent-primary)] text-[var(--accent-contrast)] font-medium'
                              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                          }`}
                        >
                          0{idx + 1}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Full-Width 4-Column Metric Row Below Hero Split */}
        {settings.showMetrics && (
          <div className="mt-10 sm:mt-12 grid grid-cols-2 lg:grid-cols-4 border-y border-[var(--border-subtle)] divide-y sm:divide-y-0 sm:divide-x divide-[var(--border-subtle)]">
            {data.metrics.map((metric, idx) => (
              <div
                key={metric.id}
                className={`py-5 ${
                  idx === 0
                    ? 'pr-4 sm:pr-6'
                    : idx === data.metrics.length - 1
                    ? 'pl-4 sm:pl-6'
                    : 'px-4 sm:px-6'
                }`}
              >
                <div className="font-display font-semibold text-2xl sm:text-3xl tracking-tight text-[var(--text-primary)] tabular-nums">
                  {metric.value}
                </div>
                <div className="mt-1 text-xs sm:text-sm font-medium text-[var(--text-primary)]">
                  {metric.label}
                </div>
                <div className="mt-0.5 text-xs text-[var(--text-muted)]">{metric.detail}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Subtle Editorial Marquee Ribbon Divider */}
      {settings.showMarquee && (
        <div
          aria-hidden="true"
          className="mt-8 border-y border-[var(--border-subtle)] bg-[var(--bg-surface)] py-3 overflow-hidden select-none"
        >
          <div className="animate-marquee text-xs font-medium tracking-wide text-[var(--text-secondary)]">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex items-center gap-8 pr-8 whitespace-nowrap">
                <span>Desain Karakter 2D</span>
                <span>·</span>
                <span>Toon Boom Harmony</span>
                <span>·</span>
                <span>Funymation Studio Yogyakarta</span>
                <span>·</span>
                <span>Lembar Studi Turnaround 6 Sudut</span>
                <span>·</span>
                <span>Produksi Animasi 3D</span>
                <span>·</span>
                <span>SMK Komputama Majenang</span>
                <span>·</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
