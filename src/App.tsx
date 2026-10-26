/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useState } from 'react';
import { AboutSkillsSection } from './components/AboutSkillsSection';
import { AdjusterDrawer } from './components/AdjusterDrawer';
import { ArtworkEditorModal } from './components/ArtworkEditorModal';
import { CertificateSection } from './components/CertificateSection';
import { ContactFooter } from './components/ContactFooter';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { LightboxModal } from './components/LightboxModal';
import { ProfileSection } from './components/ProfileSection';
import { WorksSection } from './components/WorksSection';
import {
  DEFAULT_UI_SETTINGS,
  INITIAL_PORTFOLIO_DATA,
} from './data/initialPortfolio';
import {
  ArtworkItem,
  GalleryLayout,
  PortfolioData,
  UISettings,
} from './types/portfolio';

const STORAGE_DATA_KEY = 'surya_portfolio_data_v2';
const STORAGE_SETTINGS_KEY = 'surya_portfolio_settings_v1';

function loadStoredJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return { ...fallback, ...JSON.parse(raw) };
  } catch {
    return fallback;
  }
}

export default function App() {
  const [data, setData] = useState<PortfolioData>(() =>
    loadStoredJson(STORAGE_DATA_KEY, INITIAL_PORTFOLIO_DATA)
  );
  const [settings, setSettings] = useState<UISettings>(() =>
    loadStoredJson(STORAGE_SETTINGS_KEY, DEFAULT_UI_SETTINGS)
  );

  const [adjusterOpen, setAdjusterOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [inspectedArtwork, setInspectedArtwork] = useState<ArtworkItem | null>(
    null
  );
  const [lightboxCollection, setLightboxCollection] = useState<ArtworkItem[]>(
    []
  );
  const [editorModalOpen, setEditorModalOpen] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState<ArtworkItem | null>(null);

  // Sync CSS custom property attributes onto root <html> element for fast, zero-jank theming
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', settings.theme);
    root.setAttribute('data-density', settings.density);
    try {
      localStorage.setItem(STORAGE_SETTINGS_KEY, JSON.stringify(settings));
    } catch {
      // Ignore storage quota errors gracefully
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_DATA_KEY, JSON.stringify(data));
    } catch {
      // Ignore storage quota errors gracefully
    }
  }, [data]);

  const handleUpdateField = useCallback(
    <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => {
      setData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const handleUpdateSettings = useCallback((patch: Partial<UISettings>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
  }, []);

  const handleInspectFromGallery = useCallback(
    (art: ArtworkItem) => {
      setLightboxCollection(data.artworks);
      setInspectedArtwork(art);
    },
    [data.artworks]
  );

  const handleInspectCertificate = useCallback(
    (selected: ArtworkItem, allCertificateItems: ArtworkItem[]) => {
      setLightboxCollection(allCertificateItems);
      setInspectedArtwork(selected);
    },
    []
  );

  const handleSaveArtwork = useCallback((saved: ArtworkItem) => {
    setData((prev) => {
      const exists = prev.artworks.some((item) => item.id === saved.id);
      const nextArtworks = exists
        ? prev.artworks.map((item) => (item.id === saved.id ? saved : item))
        : [saved, ...prev.artworks];
      return { ...prev, artworks: nextArtworks };
    });
  }, []);

  const handleDeleteArtwork = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      artworks: prev.artworks.filter((item) => item.id !== id),
    }));
  }, []);

  const handleExportJson = useCallback(() => {
    const payload = JSON.stringify({ data, settings }, null, 2);
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portofolio-surya-junior-saputra.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [data, settings]);

  const handleImportJson = useCallback(
    (imported: { data?: PortfolioData; settings?: UISettings }) => {
      if (imported.data) {
        setData({ ...INITIAL_PORTFOLIO_DATA, ...imported.data });
      }
      if (imported.settings) {
        setSettings({ ...DEFAULT_UI_SETTINGS, ...imported.settings });
      }
    },
    []
  );

  const handleResetAll = useCallback(() => {
    setData(INITIAL_PORTFOLIO_DATA);
    setSettings(DEFAULT_UI_SETTINGS);
    setIsEditMode(false);
    try {
      localStorage.removeItem(STORAGE_DATA_KEY);
      localStorage.removeItem(STORAGE_SETTINGS_KEY);
    } catch {
      // Ignore storage errors
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-canvas)] text-[var(--text-primary)]">
      <Header
        brandWordmark={data.brandWordmark}
        showProfile={settings.showProfile}
        showSkills={settings.showSkills}
        showCertificate={settings.showCertificate}
      />

      <main className="flex-1">
        <HeroSection
          data={data}
          settings={settings}
          isEditMode={isEditMode}
          onOpenAdjuster={() => setAdjusterOpen(true)}
          onToggleEditMode={() => setIsEditMode((prev) => !prev)}
          onInspectArtwork={handleInspectFromGallery}
          onUpdateField={handleUpdateField}
        />

        {settings.showProfile && (
          <ProfileSection
            data={data}
            isEditMode={isEditMode}
            onUpdateField={handleUpdateField}
          />
        )}

        <WorksSection
          artworks={data.artworks}
          galleryLayout={settings.galleryLayout}
          imageFit={settings.imageFit}
          isEditMode={isEditMode}
          onChangeLayout={(galleryLayout: GalleryLayout) =>
            handleUpdateSettings({ galleryLayout })
          }
          onInspectArtwork={handleInspectFromGallery}
          onAddArtwork={() => {
            setEditingArtwork(null);
            setEditorModalOpen(true);
          }}
          onEditArtwork={(art) => {
            setEditingArtwork(art);
            setEditorModalOpen(true);
          }}
          onDeleteArtwork={handleDeleteArtwork}
        />

        <AboutSkillsSection
          data={data}
          showSkills={settings.showSkills}
          isEditMode={isEditMode}
          onUpdateField={handleUpdateField}
        />

        {settings.showCertificate && (
          <CertificateSection
            certificates={data.certificates}
            isEditMode={isEditMode}
            onInspectCertificate={handleInspectCertificate}
            onUpdateCertificates={(next) =>
              handleUpdateField('certificates', next)
            }
          />
        )}
      </main>

      <ContactFooter
        data={data}
        isEditMode={isEditMode}
        onUpdateField={handleUpdateField}
        onOpenAdjuster={() => setAdjusterOpen(true)}
      />

      <AdjusterDrawer
        isOpen={adjusterOpen}
        settings={settings}
        data={data}
        isEditMode={isEditMode}
        onClose={() => setAdjusterOpen(false)}
        onUpdateSettings={handleUpdateSettings}
        onToggleEditMode={() => setIsEditMode((prev) => !prev)}
        onUpdateBrand={(wordmark) => {
          setData((prev) => ({
            ...prev,
            brandWordmark: wordmark,
            fullName: wordmark,
          }));
        }}
        onExportJson={handleExportJson}
        onImportJson={handleImportJson}
        onResetAll={handleResetAll}
      />

      <LightboxModal
        artwork={inspectedArtwork}
        allArtworks={
          lightboxCollection.length > 0 ? lightboxCollection : data.artworks
        }
        onClose={() => setInspectedArtwork(null)}
        onSelectArtwork={(art) => setInspectedArtwork(art)}
      />

      <ArtworkEditorModal
        isOpen={editorModalOpen}
        editingArtwork={editingArtwork}
        onClose={() => {
          setEditorModalOpen(false);
          setEditingArtwork(null);
        }}
        onSave={handleSaveArtwork}
      />
    </div>
  );
}
