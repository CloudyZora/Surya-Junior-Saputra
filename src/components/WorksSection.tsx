import React, { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  Columns2,
  LayoutGrid,
  List,
  Pencil,
  Plus,
  Trash2,
} from 'lucide-react';
import {
  ArtworkItem,
  GalleryLayout,
  ImageFitMode,
} from '../types/portfolio';
import { ResilientImage } from './ResilientImage';

interface WorksSectionProps {
  artworks: ArtworkItem[];
  galleryLayout: GalleryLayout;
  imageFit: ImageFitMode;
  isEditMode: boolean;
  onChangeLayout: (layout: GalleryLayout) => void;
  onInspectArtwork: (artwork: ArtworkItem) => void;
  onAddArtwork: () => void;
  onEditArtwork: (artwork: ArtworkItem) => void;
  onDeleteArtwork: (id: string) => void;
}

type CategoryFilter = 'Semua' | ArtworkItem['category'];

const CATEGORIES: CategoryFilter[] = [
  'Semua',
  'Turnaround Karakter',
  'Ensemble & Konsep',
  'Animasi 2D & 3D',
];

export const WorksSection: React.FC<WorksSectionProps> = ({
  artworks,
  galleryLayout,
  imageFit,
  isEditMode,
  onChangeLayout,
  onInspectArtwork,
  onAddArtwork,
  onEditArtwork,
  onDeleteArtwork,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('Semua');

  const filteredArtworks = useMemo(() => {
    if (selectedCategory === 'Semua') return artworks;
    return artworks.filter((item) => item.category === selectedCategory);
  }, [artworks, selectedCategory]);

  return (
    <section id="karya" className="section-spacing">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[var(--border-subtle)]">
          <div>
            <p className="text-xs font-medium text-[var(--text-muted)] mb-2">
              02. Arsip &amp; Portofolio Terpilih
            </p>
            <h2 className="font-display font-semibold text-2xl sm:text-3xl tracking-tight text-[var(--text-primary)] headline-balance">
              Lembar Desain Karakter &amp; Proyek Produksi
            </h2>
          </div>

          {/* Interactive Filter & Adjustable Layout Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Category Segmented Filter */}
            <div
              role="group"
              aria-label="Filter kategori karya"
              className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)]"
            >
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 ${
                    selectedCategory === category
                      ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-xs'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Direct Layout Switcher */}
            <div
              role="group"
              aria-label="Pilih tata letak galeri"
              className="flex items-center gap-1 p-1 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)]"
            >
              <button
                type="button"
                onClick={() => onChangeLayout(GalleryLayout.Bento)}
                title="Tata Letak Bento"
                aria-label="Tata Letak Bento"
                className={`p-1.5 rounded-md transition-colors duration-150 ${
                  galleryLayout === GalleryLayout.Bento
                    ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-xs'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onChangeLayout(GalleryLayout.StudioTwoCol)}
                title="Tata Letak Studio 2-Kolom"
                aria-label="Tata Letak Studio 2-Kolom"
                className={`p-1.5 rounded-md transition-colors duration-150 ${
                  galleryLayout === GalleryLayout.StudioTwoCol
                    ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-xs'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Columns2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onChangeLayout(GalleryLayout.EditorialIndex)}
                title="Tata Letak Daftar Indeks"
                aria-label="Tata Letak Daftar Indeks"
                className={`p-1.5 rounded-md transition-colors duration-150 ${
                  galleryLayout === GalleryLayout.EditorialIndex
                    ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-xs'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {isEditMode && (
              <button
                type="button"
                onClick={onAddArtwork}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-[var(--accent-primary)] text-[var(--accent-contrast)] hover:bg-[var(--accent-hover)] transition-colors duration-150 whitespace-nowrap shrink-0"
              >
                <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Tambah Karya</span>
              </button>
            )}
          </div>
        </div>

        {/* Empty State */}
        {filteredArtworks.length === 0 ? (
          <div className="py-16 text-center border-b border-[var(--border-subtle)]">
            <p className="text-sm text-[var(--text-secondary)]">
              Belum ada karya pada kategori ini.
            </p>
            <button
              type="button"
              onClick={() => setSelectedCategory('Semua')}
              className="mt-3 px-4 py-2 text-xs font-medium rounded-lg border border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors"
            >
              Tampilkan Semua Karya
            </button>
          </div>
        ) : galleryLayout === GalleryLayout.EditorialIndex ? (
          /* Mode 3: Minimalist Editorial Index Rows */
          <div className="divide-y divide-[var(--border-subtle)] border-b border-[var(--border-subtle)]">
            {filteredArtworks.map((artwork, index) => (
              <article
                key={artwork.id}
                className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-6 group"
              >
                <div className="flex items-start sm:items-center gap-5 min-w-0 flex-1">
                  <span className="font-mono text-xs text-[var(--text-muted)] tabular-nums pt-1 sm:pt-0 shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <button
                    type="button"
                    onClick={() => onInspectArtwork(artwork)}
                    className="w-28 h-20 sm:w-36 sm:h-24 rounded-xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-elevated)] shrink-0"
                  >
                    <ResilientImage
                      src={artwork.imageUrl}
                      alt={artwork.title}
                      fit={imageFit}
                      containerClassName="w-full h-full p-1.5 bg-[var(--bg-elevated)]"
                    />
                  </button>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)]">
                      <span>{artwork.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{artwork.timeline}</span>
                      <span aria-hidden="true">·</span>
                      <span>{artwork.role}</span>
                    </div>
                    <h3 className="mt-1 font-display text-lg font-semibold text-[var(--text-primary)]">
                      <button
                        type="button"
                        onClick={() => onInspectArtwork(artwork)}
                        className="text-left hover:text-[var(--accent-primary)] transition-colors"
                      >
                        {artwork.title}
                      </button>
                    </h3>
                    <p className="mt-1 text-sm text-[var(--text-secondary)] line-clamp-2 max-w-[68ch]">
                      {artwork.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  {isEditMode && (
                    <>
                      <button
                        type="button"
                        onClick={() => onEditArtwork(artwork)}
                        aria-label={`Edit ${artwork.title}`}
                        className="p-2 rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteArtwork(artwork.id)}
                        aria-label={`Hapus ${artwork.title}`}
                        className="p-2 rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-red-600 hover:bg-[var(--bg-surface)] transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => onInspectArtwork(artwork)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Lihat Detail</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Mode 1 (Bento Asymmetric) & Mode 2 (2-Column Studio Sheets) */
          <div
            className={`mt-8 grid dynamic-gap ${
              galleryLayout === GalleryLayout.StudioTwoCol
                ? 'grid-cols-1 md:grid-cols-2'
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {filteredArtworks.map((artwork, index) => {
              const isWideBento =
                galleryLayout === GalleryLayout.Bento &&
                selectedCategory === 'Semua' &&
                (index === 0 || index === 5);

              return (
                <article
                  key={artwork.id}
                  className={`group rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] overflow-hidden flex flex-col justify-between transition-transform duration-150 hover:-translate-y-0.5 ${
                    isWideBento ? 'md:col-span-2' : 'col-span-1'
                  }`}
                >
                  <div>
                    <div className="relative aspect-[16/10] bg-[var(--bg-elevated)] border-b border-[var(--border-subtle)] overflow-hidden">
                      <button
                        type="button"
                        onClick={() => onInspectArtwork(artwork)}
                        aria-label={`Buka pratinjau penuh ${artwork.title}`}
                        className="w-full h-full block cursor-zoom-in"
                      >
                        <ResilientImage
                          src={artwork.imageUrl}
                          alt={artwork.title}
                          fit={imageFit}
                          containerClassName={`w-full h-full bg-[var(--bg-elevated)] ${
                            imageFit === ImageFitMode.Contain ? 'p-3 sm:p-4' : ''
                          }`}
                          className="group-hover:scale-[1.02] transition-transform duration-200"
                        />
                      </button>

                      {isEditMode && (
                        <div className="absolute top-3 right-3 flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => onEditArtwork(artwork)}
                            aria-label={`Edit karya ${artwork.title}`}
                            className="p-2 rounded-lg bg-[var(--bg-canvas)]/95 border border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-[var(--bg-surface)]"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDeleteArtwork(artwork.id)}
                            aria-label={`Hapus karya ${artwork.title}`}
                            className="p-2 rounded-lg bg-[var(--bg-canvas)]/95 border border-[var(--border-strong)] text-red-600 hover:bg-[var(--bg-surface)]"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="p-5 sm:p-6">
                      {/* Clean Unboxed Metadata (Zero-Pill Discipline) */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)]">
                        <span>{artwork.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{artwork.year}</span>
                        <span aria-hidden="true">·</span>
                        <span>{artwork.statusNote}</span>
                      </div>

                      <h3 className="mt-2 font-display text-lg sm:text-xl font-semibold tracking-tight text-[var(--text-primary)]">
                        <button
                          type="button"
                          onClick={() => onInspectArtwork(artwork)}
                          className="text-left hover:text-[var(--accent-primary)] transition-colors duration-150"
                        >
                          {artwork.title}
                        </button>
                      </h3>

                      <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                        {artwork.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 sm:px-6 pb-5 pt-2 flex items-center justify-between text-xs text-[var(--text-muted)]">
                    <span>{artwork.role}</span>
                    <button
                      type="button"
                      onClick={() => onInspectArtwork(artwork)}
                      className="inline-flex items-center gap-1 font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>Buka Lembar</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
