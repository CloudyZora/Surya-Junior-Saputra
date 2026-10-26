import React, { useState } from 'react';
import { Check, Copy, Mail, SlidersHorizontal } from 'lucide-react';
import { PortfolioData } from '../types/portfolio';

interface ContactFooterProps {
  data: PortfolioData;
  isEditMode: boolean;
  onUpdateField: <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => void;
  onOpenAdjuster: () => void;
}

export const ContactFooter: React.FC<ContactFooterProps> = ({
  data,
  isEditMode,
  onUpdateField,
  onOpenAdjuster,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedBrief, setCopiedBrief] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [projectType, setProjectType] = useState('Desain Karakter 2D');
  const [message, setMessage] = useState('');

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(data.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      setCopiedEmail(false);
    }
  };

  const composedSubject = encodeURIComponent(
    `Kolaborasi ${projectType} — ${senderName || 'Calon Klien / Studio'}`
  );
  const composedBodyText = `Halo ${data.fullName},\n\nNama saya: ${
    senderName || '-'
  }\nKebutuhan: ${projectType}\n\nDetail Pesan:\n${
    message || 'Saya tertarik mendiskusikan kolaborasi kreatif bersama Anda.'
  }\n`;

  const handleCopyBrief = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(
        `Kepada: ${data.email}\nSubjek: Kolaborasi ${projectType}\n\n${composedBodyText}`
      );
      setCopiedBrief(true);
      setTimeout(() => setCopiedBrief(false), 2500);
    } catch {
      setCopiedBrief(false);
    }
  };

  return (
    <footer
      id="kontak"
      className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]/55"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 section-spacing">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--text-muted)] mb-2">
                05. Hubungi &amp; Kolaborasi
              </p>
              <h2 className="font-display font-semibold text-2xl sm:text-3xl tracking-tight text-[var(--text-primary)] headline-balance">
                Mari wujudkan karakter dan cerita visual berikutnya.
              </h2>
              <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-[var(--text-secondary)] max-w-[48ch]">
                Tersedia untuk pengerjaan lembar desain karakter, ilustrasi konsep, maupun
                dukungan produksi animasi 3D.
              </p>

              <div className="mt-8 space-y-4">
                <div>
                  <span className="block text-xs text-[var(--text-muted)]">
                    Surel Langsung
                  </span>
                  {isEditMode ? (
                    <input
                      type="email"
                      value={data.email}
                      onChange={(e) => onUpdateField('email', e.target.value)}
                      aria-label="Alamat email"
                      className="mt-1 w-full max-w-sm px-3 py-1.5 rounded border border-[var(--border-strong)] bg-[var(--bg-elevated)] text-sm text-[var(--text-primary)]"
                    />
                  ) : (
                    <div className="mt-1 flex flex-wrap items-center gap-3">
                      <a
                        href={`mailto:${data.email}`}
                        className="font-mono text-sm sm:text-base font-medium text-[var(--text-primary)] hover:text-[var(--accent-primary)] underline-offset-4 hover:underline"
                      >
                        {data.email}
                      </a>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors whitespace-nowrap shrink-0"
                      >
                        {copiedEmail ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                            <span>Tersalin</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Salin</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <span className="block text-xs text-[var(--text-muted)]">Lokasi</span>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={data.location}
                      onChange={(e) => onUpdateField('location', e.target.value)}
                      aria-label="Lokasi"
                      className="mt-1 w-full max-w-sm px-3 py-1.5 rounded border border-[var(--border-strong)] bg-[var(--bg-elevated)] text-sm text-[var(--text-primary)]"
                    />
                  ) : (
                    <p className="mt-1 text-sm font-medium text-[var(--text-primary)]">
                      {data.location}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Lightweight Brief Composer */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleCopyBrief}
              className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6 sm:p-8 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5"
                  >
                    Nama Anda / Studio
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Contoh: Studio Animasi Nusantara"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/60"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-type"
                    className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5"
                  >
                    Kategori Kebutuhan
                  </label>
                  <select
                    id="contact-type"
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-sm text-[var(--text-primary)]"
                  >
                    <option value="Desain Karakter 2D">Desain Karakter 2D</option>
                    <option value="Animasi 2D (Toon Boom Harmony)">
                      Animasi 2D (Toon Boom Harmony)
                    </option>
                    <option value="Lembar Turnaround Studio">Lembar Turnaround Studio</option>
                    <option value="Produksi Animasi 3D">Produksi Animasi 3D</option>
                    <option value="Tawaran Kerja / Kolaborasi Studio">
                      Tawaran Kerja / Kolaborasi Studio
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5"
                >
                  Ringkasan Proyek atau Pesan
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ceritakan gambaran singkat karakter, gaya visual, atau jadwal produksi..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/60"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href={`mailto:${data.email}?subject=${composedSubject}&body=${encodeURIComponent(
                    composedBodyText
                  )}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-lg bg-[var(--accent-primary)] text-[var(--accent-contrast)] hover:bg-[var(--accent-hover)] transition-colors duration-150 whitespace-nowrap shrink-0"
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  <span>Kirim via Aplikasi Email</span>
                </a>

                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-medium rounded-lg border border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors duration-150 whitespace-nowrap shrink-0"
                >
                  {copiedBrief ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                      <span>Draf Pesan Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" aria-hidden="true" />
                      <span>Salin Draf Pesan</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Quiet Editorial Footer */}
      <div className="border-t border-[var(--border-subtle)] py-6">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <p>
            © {new Date().getFullYear()} {data.fullName}. Portofolio Desain Karakter &amp;
            Animasi.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#top"
              className="hover:text-[var(--text-primary)] transition-colors whitespace-nowrap"
            >
              Kembali ke Atas
            </a>
            <button
              type="button"
              onClick={onOpenAdjuster}
              className="inline-flex items-center gap-1.5 hover:text-[var(--text-primary)] transition-colors whitespace-nowrap"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Pengaturan Tampilan</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
