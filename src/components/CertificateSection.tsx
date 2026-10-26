import React, { useState } from 'react';
import { Maximize2, Plus, Trash2, Upload } from 'lucide-react';
import { ArtworkItem, CertificateItem } from '../types/portfolio';
import { compressImageToDataUrl } from '../utils/imageUpload';
import { ResilientImage } from './ResilientImage';

interface CertificateSectionProps {
  certificates: CertificateItem[];
  isEditMode: boolean;
  onInspectCertificate: (
    selected: ArtworkItem,
    allCertificateItems: ArtworkItem[]
  ) => void;
  onUpdateCertificates: (next: CertificateItem[]) => void;
}

export const CertificateSection: React.FC<CertificateSectionProps> = ({
  certificates,
  isEditMode,
  onInspectCertificate,
  onUpdateCertificates,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const safeIndex =
    certificates.length === 0
      ? -1
      : Math.min(activeIndex, certificates.length - 1);
  const currentCert = safeIndex >= 0 ? certificates[safeIndex] : null;

  const toArtworkItem = (cert: CertificateItem): ArtworkItem => ({
    id: cert.id,
    title: `${cert.title} — ${cert.issuer}`,
    category: 'Animasi 2D & 3D',
    year: '2025',
    timeline: cert.period,
    role: cert.issuer,
    statusNote: `No. ${cert.certificateNumber}`,
    description: `${cert.subtitle}. Diterbitkan ${cert.dateIssued}. Pengesah: ${cert.signatories}.`,
    imageUrl: cert.imageUrl,
  });

  const handleOpenLightbox = (cert: CertificateItem) => {
    const allItems = certificates.map(toArtworkItem);
    onInspectCertificate(toArtworkItem(cert), allItems);
  };

  const handleFieldChange = (
    id: string,
    patch: Partial<CertificateItem>
  ) => {
    const next = certificates.map((c) =>
      c.id === id ? { ...c, ...patch } : c
    );
    onUpdateCertificates(next);
  };

  const handleAddCertificate = () => {
    const newCert: CertificateItem = {
      id: `cert-${Date.now()}`,
      title: 'Sertifikat Kompetensi Baru',
      subtitle: 'Deskripsi singkat program atau pencapaian',
      issuer: 'Nama Studio / Institusi',
      certificateNumber: '001/SERT/2025',
      dateIssued: '2025',
      period: '2025',
      predicate: 'Baik',
      signatories: 'Pimpinan Institusi',
      imageUrl: '/assets/aistudio/IMG_20261025_184120_bb398d35.jpg',
    };
    const next = [...certificates, newCert];
    onUpdateCertificates(next);
    setActiveIndex(next.length - 1);
  };

  const handleRemoveCertificate = (id: string) => {
    const next = certificates.filter((c) => c.id !== id);
    onUpdateCertificates(next);
    setActiveIndex(0);
  };

  const handleUploadImage = async (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const compressed = await compressImageToDataUrl(file, 1400, 0.88);
    handleFieldChange(id, { imageUrl: compressed });
    e.target.value = '';
  };

  return (
    <section
      id="sertifikat"
      className="section-spacing border-t border-[var(--border-subtle)]"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[var(--border-subtle)]">
          <div>
            <p className="text-xs font-medium text-[var(--text-muted)] mb-2">
              04. Bukti &amp; Pengakuan Kompetensi Industri
            </p>
            <h2 className="font-display font-semibold text-2xl sm:text-3xl tracking-tight text-[var(--text-primary)] headline-balance">
              Sertifikasi Studio &amp; Produksi Animasi
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[var(--text-muted)] tabular-nums">
              {certificates.length} Dokumen Resmi
            </span>
            {isEditMode && (
              <button
                type="button"
                onClick={handleAddCertificate}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-[var(--accent-primary)] text-[var(--accent-contrast)] hover:bg-[var(--accent-hover)] transition-colors whitespace-nowrap shrink-0"
              >
                <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Tambah Sertifikat</span>
              </button>
            )}
          </div>
        </div>

        {/* Active Certificate Master-Detail View */}
        {currentCert && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Certificate Verification Metadata */}
            <div className="lg:col-span-5">
              {isEditMode ? (
                <div className="space-y-3 p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-[var(--text-muted)]">
                      Edit Sertifikat Aktif
                    </span>
                    {certificates.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveCertificate(currentCert.id)}
                        className="inline-flex items-center gap-1 px-2 py-1 text-xs text-red-600 hover:bg-[var(--bg-elevated)] rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus</span>
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={currentCert.title}
                    onChange={(e) =>
                      handleFieldChange(currentCert.id, { title: e.target.value })
                    }
                    aria-label="Judul sertifikat"
                    className="w-full px-3 py-1.5 rounded border border-[var(--border-strong)] bg-[var(--bg-elevated)] text-sm font-semibold text-[var(--text-primary)]"
                  />
                  <input
                    type="text"
                    value={currentCert.subtitle}
                    onChange={(e) =>
                      handleFieldChange(currentCert.id, {
                        subtitle: e.target.value,
                      })
                    }
                    aria-label="Subjudul sertifikat"
                    className="w-full px-3 py-1.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-xs text-[var(--text-secondary)]"
                  />
                  <input
                    type="text"
                    value={currentCert.issuer}
                    onChange={(e) =>
                      handleFieldChange(currentCert.id, { issuer: e.target.value })
                    }
                    aria-label="Penerbit sertifikat"
                    className="w-full px-3 py-1.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-xs text-[var(--text-primary)]"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={currentCert.certificateNumber}
                      onChange={(e) =>
                        handleFieldChange(currentCert.id, {
                          certificateNumber: e.target.value,
                        })
                      }
                      aria-label="Nomor sertifikat"
                      className="px-2.5 py-1.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-xs font-mono text-[var(--text-primary)]"
                    />
                    <input
                      type="text"
                      value={currentCert.period}
                      onChange={(e) =>
                        handleFieldChange(currentCert.id, {
                          period: e.target.value,
                        })
                      }
                      aria-label="Masa pelaksanaan"
                      className="px-2.5 py-1.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-xs text-[var(--text-primary)]"
                    />
                  </div>
                  <input
                    type="text"
                    value={currentCert.signatories}
                    onChange={(e) =>
                      handleFieldChange(currentCert.id, {
                        signatories: e.target.value,
                      })
                    }
                    aria-label="Penandatangan"
                    className="w-full px-3 py-1.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-xs text-[var(--text-primary)]"
                  />
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[var(--border-strong)] bg-[var(--bg-elevated)] text-xs font-medium text-[var(--text-primary)] cursor-pointer">
                    <Upload className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Ganti Foto Sertifikat</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleUploadImage(currentCert.id, e)}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)]">
                    <span className="font-mono tabular-nums">
                      0{safeIndex + 1} / 0{certificates.length}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{currentCert.issuer}</span>
                  </div>

                  <h3 className="mt-2 font-display font-semibold text-xl sm:text-2xl tracking-tight text-[var(--text-primary)] headline-balance">
                    {currentCert.title}
                  </h3>

                  <p className="mt-2.5 text-sm sm:text-[15px] leading-relaxed text-[var(--text-secondary)]">
                    {currentCert.subtitle}
                  </p>

                  <dl className="mt-6 divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)] text-xs sm:text-sm">
                    <div className="py-3 flex items-baseline justify-between gap-4">
                      <dt className="text-[var(--text-muted)] shrink-0">
                        Nomor Dokumen
                      </dt>
                      <dd className="font-mono text-[var(--text-primary)] tabular-nums text-right">
                        {currentCert.certificateNumber}
                      </dd>
                    </div>
                    <div className="py-3 flex items-baseline justify-between gap-4">
                      <dt className="text-[var(--text-muted)] shrink-0">
                        Periode Program
                      </dt>
                      <dd className="text-[var(--text-primary)] tabular-nums text-right">
                        {currentCert.period}
                      </dd>
                    </div>
                    {currentCert.predicate && (
                      <div className="py-3 flex items-baseline justify-between gap-4">
                        <dt className="text-[var(--text-muted)] shrink-0">
                          Keterangan / Predikat
                        </dt>
                        <dd className="font-semibold text-[var(--accent-primary)] text-right">
                          {currentCert.predicate}
                        </dd>
                      </div>
                    )}
                    <div className="py-3 flex items-baseline justify-between gap-4">
                      <dt className="text-[var(--text-muted)] shrink-0">
                        Tanggal Terbit
                      </dt>
                      <dd className="text-[var(--text-primary)] tabular-nums text-right">
                        {currentCert.dateIssued}
                      </dd>
                    </div>
                    <div className="py-3 flex items-baseline justify-between gap-4">
                      <dt className="text-[var(--text-muted)] shrink-0">
                        Pengesah
                      </dt>
                      <dd className="text-[var(--text-primary)] text-right">
                        {currentCert.signatories}
                      </dd>
                    </div>
                  </dl>

                  <button
                    type="button"
                    onClick={() => handleOpenLightbox(currentCert)}
                    className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg border border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors duration-150 whitespace-nowrap shrink-0"
                  >
                    <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Perbesar Dokumen Sertifikat</span>
                  </button>
                </>
              )}
            </div>

            {/* Right: Crisp Certificate Preview */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 sm:p-5">
                <button
                  type="button"
                  onClick={() => handleOpenLightbox(currentCert)}
                  aria-label={`Perbesar ${currentCert.title}`}
                  className="w-full rounded-xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-elevated)] block cursor-zoom-in group"
                >
                  <ResilientImage
                    src={currentCert.imageUrl}
                    alt={`${currentCert.title} — Surya Junior Saputra`}
                    fit="contain"
                    containerClassName="w-full aspect-[16/11] p-2 sm:p-4 bg-[var(--bg-elevated)]"
                    className="group-hover:scale-[1.01] transition-transform duration-200"
                  />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3-Column Certificate Selector Strip */}
        {certificates.length > 1 && (
          <div
            role="tablist"
            aria-label="Daftar sertifikat resmi"
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {certificates.map((cert, index) => {
              const isSelected = index === safeIndex;
              return (
                <button
                  key={cert.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveIndex(index)}
                  className={`p-4 rounded-xl border text-left flex items-center gap-4 transition-colors duration-150 ${
                    isSelected
                      ? 'border-[var(--accent-primary)] bg-[var(--accent-soft)]'
                      : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)]'
                  }`}
                >
                  <div className="w-20 h-14 rounded-lg overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-elevated)] shrink-0">
                    <ResilientImage
                      src={cert.imageUrl}
                      alt={cert.title}
                      fit="cover"
                      containerClassName="w-full h-full"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-mono text-[var(--text-muted)] tabular-nums truncate">
                      {cert.certificateNumber}
                    </div>
                    <div className="mt-0.5 text-xs sm:text-sm font-semibold text-[var(--text-primary)] truncate">
                      {cert.title}
                    </div>
                    <div className="mt-0.5 text-xs text-[var(--text-secondary)] truncate">
                      {cert.issuer}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
