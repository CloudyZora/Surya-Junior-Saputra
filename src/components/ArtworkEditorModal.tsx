import React, { useEffect, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { ArtworkItem } from '../types/portfolio';
import { compressImageToDataUrl } from '../utils/imageUpload';

interface ArtworkEditorModalProps {
  isOpen: boolean;
  editingArtwork: ArtworkItem | null;
  onClose: () => void;
  onSave: (artwork: ArtworkItem) => void;
}

export const ArtworkEditorModal: React.FC<ArtworkEditorModalProps> = ({
  isOpen,
  editingArtwork,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] =
    useState<ArtworkItem['category']>('Turnaround Karakter');
  const [year, setYear] = useState('2025');
  const [timeline, setTimeline] = useState('2025');
  const [role, setRole] = useState('Character Designer');
  const [statusNote, setStatusNote] = useState('Full Body · Sketch & Finishing');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (editingArtwork) {
      setTitle(editingArtwork.title);
      setCategory(editingArtwork.category);
      setYear(editingArtwork.year);
      setTimeline(editingArtwork.timeline);
      setRole(editingArtwork.role);
      setStatusNote(editingArtwork.statusNote);
      setDescription(editingArtwork.description);
      setImageUrl(editingArtwork.imageUrl);
    } else {
      setTitle('');
      setCategory('Turnaround Karakter');
      setYear(String(new Date().getFullYear()));
      setTimeline('2025');
      setRole('2D Character Designer');
      setStatusNote('Full Body · Final');
      setDescription('');
      setImageUrl('/assets/aistudio/WhatsApp_Image_2025-07-31_at_13.58.34_f0c0f1fe.jpeg');
    }
  }, [editingArtwork, isOpen]);

  if (!isOpen) return null;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const compressed = await compressImageToDataUrl(file, 1280, 0.88);
    setImageUrl(compressed);
    e.target.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({
      id: editingArtwork ? editingArtwork.id : `art-${Date.now()}`,
      title: title.trim(),
      category,
      year: year.trim() || '2025',
      timeline: timeline.trim() || year.trim() || '2025',
      role: role.trim() || 'Designer',
      statusNote: statusNote.trim() || 'Final',
      description: description.trim(),
      imageUrl: imageUrl.trim(),
      featured: editingArtwork?.featured ?? false,
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={editingArtwork ? 'Edit karya' : 'Tambah karya baru'}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 bg-black/50 backdrop-blur-[1px]"
      />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-6 space-y-4"
      >
        <div className="flex items-center justify-between gap-4 pb-3 border-b border-[var(--border-subtle)]">
          <h3 className="font-display text-lg font-semibold text-[var(--text-primary)]">
            {editingArtwork ? 'Edit Detail Karya' : 'Tambah Karya Portofolio'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup jendela"
            className="w-8 h-8 inline-flex items-center justify-center rounded-lg border border-[var(--border-subtle)] text-[var(--text-primary)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div>
          <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
            Judul Karya
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Contoh: Studi Karakter Utama"
            className="w-full px-3 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-sm text-[var(--text-primary)]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
              Kategori
            </label>
            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as ArtworkItem['category'])
              }
              className="w-full px-3 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-sm text-[var(--text-primary)]"
            >
              <option value="Turnaround Karakter">Turnaround Karakter</option>
              <option value="Ensemble & Konsep">Ensemble &amp; Konsep</option>
              <option value="Animasi 2D & 3D">Animasi 2D &amp; 3D</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
              Tahun
            </label>
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-sm font-mono text-[var(--text-primary)]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
              Peran Anda
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-sm text-[var(--text-primary)]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
              Catatan Tahap / Format
            </label>
            <input
              type="text"
              value={statusNote}
              onChange={(e) => setStatusNote(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-sm text-[var(--text-primary)]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
            Gambar Karya (Unggah Berkas atau Path Lokal)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="/assets/aistudio/..."
              className="flex-1 px-3 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-xs text-[var(--text-primary)]"
            />
            <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] text-xs font-medium text-[var(--text-primary)] cursor-pointer hover:bg-[var(--bg-elevated)] whitespace-nowrap shrink-0">
              <Upload className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Pilih Foto</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
            Deskripsi Karya
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Jelaskan konteks desain, teknik, dan tujuan karya ini..."
            className="w-full px-3 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-sm text-[var(--text-primary)]"
          />
        </div>

        <div className="pt-2 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-xs font-semibold rounded-lg bg-[var(--accent-primary)] text-[var(--accent-contrast)] hover:bg-[var(--accent-hover)]"
          >
            Simpan Karya
          </button>
        </div>
      </form>
    </div>
  );
};
