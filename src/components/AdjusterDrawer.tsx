import React, { useEffect, useRef, useState } from 'react';
import { Download, RotateCcw, Upload, X } from 'lucide-react';
import {
  DensityMode,
  GalleryLayout,
  ImageFitMode,
  PortfolioData,
  ThemeMode,
  UISettings,
} from '../types/portfolio';

interface AdjusterDrawerProps {
  isOpen: boolean;
  settings: UISettings;
  data: PortfolioData;
  isEditMode: boolean;
  onClose: () => void;
  onUpdateSettings: (patch: Partial<UISettings>) => void;
  onToggleEditMode: () => void;
  onUpdateBrand: (wordmark: string) => void;
  onExportJson: () => void;
  onImportJson: (imported: { data?: PortfolioData; settings?: UISettings }) => void;
  onResetAll: () => void;
}

export const AdjusterDrawer: React.FC<AdjusterDrawerProps> = ({
  isOpen,
  settings,
  data,
  isEditMode,
  onClose,
  onUpdateSettings,
  onToggleEditMode,
  onUpdateBrand,
  onExportJson,
  onImportJson,
  onResetAll,
}) => {
  const [confirmReset, setConfirmReset] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setConfirmReset(false);
      setImportError(null);
      return;
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (parsed && (parsed.data || parsed.settings)) {
          onImportJson(parsed);
          setImportError(null);
        } else {
          setImportError('Format berkas JSON tidak sesuai.');
        }
      } catch {
        setImportError('Gagal membaca berkas JSON.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Panel penyesuaian tampilan portofolio"
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 bg-black/45 backdrop-blur-[1px]"
      />

      {/* Drawer Content */}
      <div className="relative z-10 w-full max-w-md h-full bg-[var(--bg-canvas)] border-l border-[var(--border-subtle)] flex flex-col justify-between overflow-y-auto">
        <div>
          <div className="sticky top-0 z-10 bg-[var(--bg-canvas)]/95 backdrop-blur-sm px-6 py-4 border-b border-[var(--border-subtle)] flex items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-lg font-semibold text-[var(--text-primary)]">
                Sesuaikan Portofolio
              </h2>
              <p className="text-xs text-[var(--text-muted)]">
                Perubahan tersimpan otomatis di peramban Anda
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup panel pengaturan"
              className="w-9 h-9 inline-flex items-center justify-center rounded-lg border border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 space-y-7">
            {/* 1. Theme Palette */}
            <div>
              <span className="block text-xs font-semibold text-[var(--text-primary)] mb-2.5">
                Tema Warna (60-30-10)
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  {
                    id: ThemeMode.Paper,
                    label: 'Editorial',
                    bgClass: 'bg-[#f9f8f4]',
                    accentClass: 'bg-[#2436b8]',
                  },
                  {
                    id: ThemeMode.Gallery,
                    label: 'Galeri Putih',
                    bgClass: 'bg-[#ffffff]',
                    accentClass: 'bg-[#1d4ed8]',
                  },
                  {
                    id: ThemeMode.Obsidian,
                    label: 'Studio Gelap',
                    bgClass: 'bg-[#09090b]',
                    accentClass: 'bg-[#f2b705]',
                  },
                ].map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => onUpdateSettings({ theme: preset.id })}
                    className={`p-3 rounded-xl border text-left transition-colors duration-150 ${
                      settings.theme === preset.id
                        ? 'border-[var(--accent-primary)] bg-[var(--accent-soft)]'
                        : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-2">
                      <span
                        className={`w-4 h-4 rounded-full border border-black/15 ${preset.bgClass}`}
                      />
                      <span
                        className={`w-4 h-4 rounded-full ${preset.accentClass}`}
                      />
                    </div>
                    <span className="block text-xs font-medium text-[var(--text-primary)] whitespace-nowrap truncate">
                      {preset.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Gallery Layout */}
            <div>
              <span className="block text-xs font-semibold text-[var(--text-primary)] mb-2.5">
                Tata Letak Galeri Karya
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: GalleryLayout.Bento, label: 'Bento' },
                  { id: GalleryLayout.StudioTwoCol, label: '2-Kolom' },
                  { id: GalleryLayout.EditorialIndex, label: 'Indeks' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onUpdateSettings({ galleryLayout: opt.id })}
                    className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap ${
                      settings.galleryLayout === opt.id
                        ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)] text-[var(--accent-contrast)]'
                        : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--border-strong)]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Image Framing & Spatial Density */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="block text-xs font-semibold text-[var(--text-primary)] mb-2">
                  Proporsi Gambar
                </span>
                <div className="flex items-center gap-1 p-1 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                  <button
                    type="button"
                    onClick={() => onUpdateSettings({ imageFit: ImageFitMode.Contain })}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                      settings.imageFit === ImageFitMode.Contain
                        ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-xs'
                        : 'text-[var(--text-secondary)]'
                    }`}
                  >
                    Utuh
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateSettings({ imageFit: ImageFitMode.Cover })}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                      settings.imageFit === ImageFitMode.Cover
                        ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-xs'
                        : 'text-[var(--text-secondary)]'
                    }`}
                  >
                    Penuh
                  </button>
                </div>
              </div>

              <div>
                <span className="block text-xs font-semibold text-[var(--text-primary)] mb-2">
                  Kepadatan Ruang
                </span>
                <div className="flex items-center gap-1 p-1 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                  {[
                    { id: DensityMode.Compact, label: 'Rapat' },
                    { id: DensityMode.Balanced, label: 'Normal' },
                    { id: DensityMode.Spacious, label: 'Leluasa' },
                  ].map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => onUpdateSettings({ density: d.id })}
                      className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                        settings.density === d.id
                          ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-xs'
                          : 'text-[var(--text-secondary)]'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. Section Visibility Toggles */}
            <div>
              <span className="block text-xs font-semibold text-[var(--text-primary)] mb-2.5">
                Visibilitas Bagian Halaman
              </span>
              <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
                {[
                  {
                    key: 'showProfile' as const,
                    label: 'Kolom Profil Wajah (Oval)',
                  },
                  {
                    key: 'showMetrics' as const,
                    label: 'Baris Angka Ringkasan',
                  },
                  {
                    key: 'showMarquee' as const,
                    label: 'Pita Pembatas Editorial',
                  },
                  {
                    key: 'showSkills' as const,
                    label: 'Keahlian & Pengalaman',
                  },
                  {
                    key: 'showCertificate' as const,
                    label: 'Sertifikat Penghargaan',
                  },
                ].map((item) => (
                  <label
                    key={item.key}
                    className="py-2.5 flex items-center justify-between gap-4 cursor-pointer text-xs sm:text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  >
                    <span>{item.label}</span>
                    <input
                      type="checkbox"
                      checked={settings[item.key]}
                      onChange={(e) =>
                        onUpdateSettings({ [item.key]: e.target.checked })
                      }
                      className="w-4 h-4 rounded accent-[var(--accent-primary)]"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* 5. Brand Name & Direct Content Edit Mode */}
            <div className="space-y-3">
              <div>
                <label
                  htmlFor="brand-wordmark-input"
                  className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5"
                >
                  Nama Identitas di Navigasi Atas
                </label>
                <input
                  id="brand-wordmark-input"
                  type="text"
                  value={data.brandWordmark}
                  onChange={(e) => onUpdateBrand(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-sm text-[var(--text-primary)]"
                />
              </div>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={onToggleEditMode}
                  className={`w-full py-2.5 px-4 rounded-lg text-xs font-semibold border transition-colors ${
                    isEditMode
                      ? 'bg-[var(--accent-primary)] text-[var(--accent-contrast)] border-[var(--accent-primary)]'
                      : 'border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]'
                  }`}
                >
                  {isEditMode
                    ? 'Nonaktifkan Mode Edit Teks & Karya'
                    : 'Aktifkan Mode Edit Teks & Karya di Halaman'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Data Backup & Reset */}
        <div className="p-6 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]/60 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={onExportJson}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:border-[var(--border-strong)] whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Ekspor JSON</span>
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:border-[var(--border-strong)] whitespace-nowrap"
            >
              <Upload className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Impor JSON</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json,.json"
              onChange={handleFileImport}
              className="hidden"
            />
          </div>

          {importError && (
            <p className="text-xs text-red-600">{importError}</p>
          )}

          {!confirmReset ? (
            <button
              type="button"
              onClick={() => setConfirmReset(true)}
              className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Kembalikan ke Setelan Awal</span>
            </button>
          ) : (
            <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-elevated)]">
              <span className="text-xs text-[var(--text-primary)]">
                Reset semua perubahan?
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setConfirmReset(false)}
                  className="px-2.5 py-1 text-xs rounded border border-[var(--border-subtle)] text-[var(--text-secondary)]"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onResetAll();
                    setConfirmReset(false);
                  }}
                  className="px-2.5 py-1 text-xs font-semibold rounded bg-red-600 text-white"
                >
                  Ya, Reset
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
