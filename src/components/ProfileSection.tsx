import React, { useRef, useState } from 'react';
import { Camera, SlidersHorizontal, Trash2, User } from 'lucide-react';
import {
  PortfolioData,
  ProfileFocusY,
  ProfileZoom,
} from '../types/portfolio';
import { compressImageToDataUrl } from '../utils/imageUpload';

interface ProfileSectionProps {
  data: PortfolioData;
  isEditMode: boolean;
  onUpdateField: <K extends keyof PortfolioData>(
    key: K,
    value: PortfolioData[K]
  ) => void;
}

const FOCUS_CLASS_MAP: Record<ProfileFocusY, string> = {
  top: 'object-top',
  center: 'object-center',
  bottom: 'object-bottom',
};

const ZOOM_CLASS_MAP: Record<ProfileZoom, string> = {
  '100': 'scale-100',
  '110': 'scale-110',
  '125': 'scale-125',
};

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  data,
  isEditMode,
  onUpdateField,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showFramingTools, setShowFramingTools] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleSelectPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const compressedDataUrl = await compressImageToDataUrl(file, 960, 0.88);
      onUpdateField('profileImageUrl', compressedDataUrl);
      setShowFramingTools(true);
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  return (
    <section
      id="profil"
      className="section-spacing border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]/35"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Dedicated Oval Border Profile Portrait */}
          <div className="lg:col-span-4 flex flex-col items-center">
            {/* Outer Oval Border Mat (True Mathematical Ellipse: aspect 3:4 + 50% radius) */}
            <div className="w-56 sm:w-64 aspect-[3/4] p-2.5 rounded-[50%] border border-[var(--border-strong)] bg-[var(--bg-elevated)] shadow-xs transition-colors duration-150">
              <div className="relative w-full h-full rounded-[50%] overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-surface)] group">
                {data.profileImageUrl ? (
                  <>
                    <img
                      src={data.profileImageUrl}
                      alt={`Foto profil ${data.fullName}`}
                      referrerPolicy="no-referrer"
                      decoding="async"
                      className={`w-full h-full object-cover transition-transform duration-150 ${
                        FOCUS_CLASS_MAP[data.profileFocusY || 'center']
                      } ${ZOOM_CLASS_MAP[data.profileZoom || '100']}`}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      aria-label="Ganti foto profil"
                      className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-150 flex flex-col items-center justify-center text-white px-4 text-center cursor-pointer"
                    >
                      <Camera className="w-6 h-6 mb-1.5" aria-hidden="true" />
                      <span className="text-xs font-semibold">Ganti Foto</span>
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-full flex flex-col items-center justify-center p-6 text-center hover:bg-[var(--accent-soft)] transition-colors duration-150 cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-full border border-[var(--border-strong)] bg-[var(--bg-elevated)] flex items-center justify-center text-[var(--text-secondary)] mb-3">
                      <User className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <span className="font-display text-sm font-semibold text-[var(--text-primary)]">
                      {isUploading ? 'Memproses...' : 'Pasang Foto Wajah'}
                    </span>
                    <span className="mt-1 text-xs text-[var(--text-muted)] max-w-[16ch] leading-snug">
                      Klik untuk memilih foto dari perangkat Anda
                    </span>
                  </button>
                )}
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleSelectPhoto}
              className="hidden"
            />

            {/* Name & Role Caption Under Oval */}
            <div className="mt-5 text-center">
              {isEditMode ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={data.fullName}
                    onChange={(e) => onUpdateField('fullName', e.target.value)}
                    aria-label="Nama lengkap"
                    className="px-3 py-1 rounded border border-[var(--border-strong)] bg-[var(--bg-elevated)] text-sm font-semibold text-center text-[var(--text-primary)]"
                  />
                  <input
                    type="text"
                    value={data.profileRoleTitle}
                    onChange={(e) =>
                      onUpdateField('profileRoleTitle', e.target.value)
                    }
                    aria-label="Jabatan atau peran kreatif"
                    className="block w-full px-3 py-1 rounded border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-xs text-center text-[var(--text-muted)]"
                  />
                </div>
              ) : (
                <>
                  <h3 className="font-display text-lg font-semibold text-[var(--text-primary)]">
                    {data.fullName}
                  </h3>
                  <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                    {data.profileRoleTitle}
                  </p>
                </>
              )}

              {/* Quick Photo Actions */}
              <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-[var(--border-strong)] bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors whitespace-nowrap shrink-0"
                >
                  <Camera className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>
                    {data.profileImageUrl ? 'Ganti Foto' : 'Unggah Foto'}
                  </span>
                </button>

                {data.profileImageUrl && (
                  <button
                    type="button"
                    onClick={() => setShowFramingTools((prev) => !prev)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                      showFramingTools
                        ? 'border-[var(--accent-primary)] bg-[var(--accent-soft)] text-[var(--text-primary)]'
                        : 'border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Atur Posisi</span>
                  </button>
                )}
              </div>

              {/* Adjustable Face Framing Controls (Pure Tailwind Classes) */}
              {data.profileImageUrl && (showFramingTools || isEditMode) && (
                <div className="mt-3 p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-left space-y-2.5 w-64 max-w-full">
                  <div>
                    <span className="block text-[11px] font-medium text-[var(--text-muted)] mb-1">
                      Fokus Vertikal Wajah
                    </span>
                    <div className="grid grid-cols-3 gap-1 p-0.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                      {(
                        [
                          { id: 'top', label: 'Atas' },
                          { id: 'center', label: 'Tengah' },
                          { id: 'bottom', label: 'Bawah' },
                        ] as const
                      ).map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => onUpdateField('profileFocusY', opt.id)}
                          className={`py-1 text-[11px] font-medium rounded-md transition-colors whitespace-nowrap ${
                            (data.profileFocusY || 'center') === opt.id
                              ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-xs'
                              : 'text-[var(--text-secondary)]'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="block text-[11px] font-medium text-[var(--text-muted)] mb-1">
                      Perbesaran Foto
                    </span>
                    <div className="grid grid-cols-3 gap-1 p-0.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                      {(
                        [
                          { id: '100', label: '100%' },
                          { id: '110', label: '110%' },
                          { id: '125', label: '125%' },
                        ] as const
                      ).map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => onUpdateField('profileZoom', opt.id)}
                          className={`py-1 text-[11px] font-mono tabular-nums font-medium rounded-md transition-colors whitespace-nowrap ${
                            (data.profileZoom || '100') === opt.id
                              ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-xs'
                              : 'text-[var(--text-secondary)]'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onUpdateField('profileImageUrl', '');
                      setShowFramingTools(false);
                    }}
                    className="w-full pt-1 inline-flex items-center justify-center gap-1 text-[11px] font-medium text-red-600 hover:underline"
                  >
                    <Trash2 className="w-3 h-3" aria-hidden="true" />
                    <span>Hapus Foto Profil</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Creator Bio & Structured Profile Details */}
          <div className="lg:col-span-8">
            <p className="text-xs font-medium text-[var(--text-muted)] mb-2">
              01. Profil &amp; Tentang Kreator
            </p>

            {isEditMode ? (
              <div className="space-y-3">
                <textarea
                  rows={2}
                  value={data.aboutHeading}
                  onChange={(e) => onUpdateField('aboutHeading', e.target.value)}
                  aria-label="Judul bagian profil"
                  className="w-full p-3 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-elevated)] font-display text-2xl font-semibold text-[var(--text-primary)]"
                />
                <textarea
                  rows={3}
                  value={data.aboutLead}
                  onChange={(e) => onUpdateField('aboutLead', e.target.value)}
                  aria-label="Paragraf pembuka tentang saya"
                  className="w-full p-3 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-elevated)] text-base font-medium text-[var(--text-primary)]"
                />
                <textarea
                  rows={4}
                  value={data.aboutBody}
                  onChange={(e) => onUpdateField('aboutBody', e.target.value)}
                  aria-label="Paragraf detail tentang saya"
                  className="w-full p-3 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-elevated)] text-sm text-[var(--text-secondary)]"
                />
              </div>
            ) : (
              <>
                <h2 className="font-display font-semibold text-2xl sm:text-3xl tracking-tight text-[var(--text-primary)] headline-balance">
                  {data.aboutHeading}
                </h2>
                <p className="mt-4 text-base sm:text-lg font-medium leading-[1.6] text-[var(--text-primary)] max-w-[65ch]">
                  {data.aboutLead}
                </p>
                <p className="mt-3 text-[15px] leading-[1.7] text-[var(--text-secondary)] max-w-[68ch]">
                  {data.aboutBody}
                </p>
              </>
            )}

            {/* Clean Hairline Profile Summary Grid */}
            <dl className="mt-8 pt-6 border-t border-[var(--border-subtle)] grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-xs sm:text-sm">
              <div>
                <dt className="text-[var(--text-muted)]">Pendidikan Kejuruan</dt>
                <dd className="mt-0.5 font-medium text-[var(--text-primary)]">
                  SMK Komputama Majenang · Program Animasi
                </dd>
              </div>
              <div>
                <dt className="text-[var(--text-muted)]">Pengalaman Studio</dt>
                <dd className="mt-0.5 font-medium text-[var(--text-primary)]">
                  Funymation Studio Yogyakarta (PKL 2025)
                </dd>
              </div>
              <div>
                <dt className="text-[var(--text-muted)]">Perangkat &amp; Fokus</dt>
                <dd className="mt-0.5 font-medium text-[var(--text-primary)]">
                  2D Turnaround · Toon Boom Harmony · Animasi 3D
                </dd>
              </div>
              <div>
                <dt className="text-[var(--text-muted)]">Domisili</dt>
                <dd className="mt-0.5 font-medium text-[var(--text-primary)]">
                  {data.location}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};
