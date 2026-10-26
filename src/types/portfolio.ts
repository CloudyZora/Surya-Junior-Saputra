export enum ThemeMode {
  Paper = 'paper',
  Gallery = 'gallery',
  Obsidian = 'obsidian',
}

export enum GalleryLayout {
  Bento = 'bento',
  StudioTwoCol = 'studio',
  EditorialIndex = 'index',
}

export enum DensityMode {
  Compact = 'compact',
  Balanced = 'balanced',
  Spacious = 'spacious',
}

export enum ImageFitMode {
  Contain = 'contain',
  Cover = 'cover',
}

export type ProfileFocusY = 'top' | 'center' | 'bottom';
export type ProfileZoom = '100' | '110' | '125';

export interface ArtworkItem {
  id: string;
  title: string;
  category: 'Turnaround Karakter' | 'Ensemble & Konsep' | 'Animasi 2D & 3D';
  year: string;
  timeline: string;
  role: string;
  statusNote: string;
  description: string;
  imageUrl: string;
  featured?: boolean;
}

export interface SkillItem {
  id: string;
  name: string;
  level: number;
  tools: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  highlights: string[];
}

export interface CertificateItem {
  id: string;
  title: string;
  subtitle: string;
  issuer: string;
  certificateNumber: string;
  dateIssued: string;
  period: string;
  predicate?: string;
  signatories: string;
  imageUrl: string;
}

export interface MetricItem {
  id: string;
  value: string;
  label: string;
  detail: string;
}

export interface PortfolioData {
  fullName: string;
  brandWordmark: string;
  profileRoleTitle: string;
  profileImageUrl: string;
  profileFocusY: ProfileFocusY;
  profileZoom: ProfileZoom;
  kicker: string;
  heroHeadline: string;
  heroSummary: string;
  location: string;
  email: string;
  availabilityText: string;
  aboutHeading: string;
  aboutLead: string;
  aboutBody: string;
  heroImageUrl: string;
  heroImageCaption: string;
  metrics: MetricItem[];
  artworks: ArtworkItem[];
  skills: SkillItem[];
  experiences: ExperienceItem[];
  certificates: CertificateItem[];
}

export interface UISettings {
  theme: ThemeMode;
  galleryLayout: GalleryLayout;
  density: DensityMode;
  imageFit: ImageFitMode;
  showProfile: boolean;
  showMetrics: boolean;
  showMarquee: boolean;
  showSkills: boolean;
  showCertificate: boolean;
}
