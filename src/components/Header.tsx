import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  brandWordmark: string;
  showProfile: boolean;
  showSkills: boolean;
  showCertificate: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  brandWordmark,
  showProfile,
  showSkills,
  showCertificate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Profil', href: '#profil', visible: showProfile },
    { label: 'Karya', href: '#karya', visible: true },
    { label: 'Keahlian', href: '#keahlian', visible: showSkills },
    { label: 'Sertifikat', href: '#sertifikat', visible: showCertificate },
    { label: 'Kontak', href: '#kontak', visible: true },
  ].filter((item) => item.visible);

  return (
    <header className="sticky top-0 z-30 bg-[var(--bg-canvas)]/92 backdrop-blur-md border-b border-[var(--border-subtle)]">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="font-display text-lg font-semibold tracking-tight text-[var(--text-primary)] whitespace-nowrap shrink-0"
        >
          {brandWordmark}
        </a>

        {/* Zone 2: 4–5 concise single-line navigation links */}
        <nav
          aria-label="Navigasi utama"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[var(--text-secondary)]"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-[var(--text-primary)] underline-offset-4 hover:underline transition-colors duration-150 whitespace-nowrap shrink-0 py-1"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <a
            href="#kontak"
            className="hidden md:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--accent-primary)] text-[var(--accent-contrast)] hover:bg-[var(--accent-hover)] transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            Hubungi Saya
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors duration-150"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          aria-label="Navigasi seluler"
          className="md:hidden border-t border-[var(--border-subtle)] bg-[var(--bg-canvas)] px-5 py-4 flex flex-col gap-2"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#kontak"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold rounded-lg bg-[var(--accent-primary)] text-[var(--accent-contrast)]"
          >
            Hubungi Saya
          </a>
        </nav>
      )}
    </header>
  );
};
