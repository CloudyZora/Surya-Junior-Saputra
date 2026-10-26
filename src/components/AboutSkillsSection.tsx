import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { ExperienceItem, PortfolioData, SkillItem } from '../types/portfolio';

interface AboutSkillsSectionProps {
  data: PortfolioData;
  showSkills: boolean;
  isEditMode: boolean;
  onUpdateField: <K extends keyof PortfolioData>(
    key: K,
    value: PortfolioData[K]
  ) => void;
}

export const AboutSkillsSection: React.FC<AboutSkillsSectionProps> = ({
  data,
  showSkills,
  isEditMode,
  onUpdateField,
}) => {
  if (!showSkills) return null;

  const handleSkillChange = (id: string, patch: Partial<SkillItem>) => {
    const next = data.skills.map((skill) =>
      skill.id === id ? { ...skill, ...patch } : skill
    );
    onUpdateField('skills', next);
  };

  const handleAddSkill = () => {
    const newSkill: SkillItem = {
      id: `skill-${Date.now()}`,
      name: 'Keahlian Baru',
      level: 85,
      tools: 'Teknik · Perangkat Lunak',
    };
    onUpdateField('skills', [...data.skills, newSkill]);
  };

  const handleRemoveSkill = (id: string) => {
    onUpdateField(
      'skills',
      data.skills.filter((s) => s.id !== id)
    );
  };

  const handleExperienceChange = (
    id: string,
    patch: Partial<ExperienceItem>
  ) => {
    const next = data.experiences.map((exp) =>
      exp.id === id ? { ...exp, ...patch } : exp
    );
    onUpdateField('experiences', next);
  };

  const handleAddExperience = () => {
    const newExp: ExperienceItem = {
      id: `exp-${Date.now()}`,
      role: 'Peran / Posisi Kreatif',
      organization: 'Nama Studio atau Institusi',
      period: '2025',
      highlights: [
        'Deskripsi kontribusi utama pada proyek desain atau produksi animasi.',
      ],
    };
    onUpdateField('experiences', [newExp, ...data.experiences]);
  };

  const handleRemoveExperience = (id: string) => {
    onUpdateField(
      'experiences',
      data.experiences.filter((e) => e.id !== id)
    );
  };

  return (
    <section
      id="keahlian"
      className="section-spacing border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]/45"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Production Experience */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between gap-4 mb-8">
              <div>
                <p className="text-xs font-medium text-[var(--text-muted)] mb-1.5">
                  03. Riwayat Proyek &amp; Pengalaman
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
                  Pengalaman Produksi
                </h2>
              </div>

              {isEditMode && (
                <button
                  type="button"
                  onClick={handleAddExperience}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-[var(--border-strong)] bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:bg-[var(--bg-surface)] whitespace-nowrap shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Tambah Riwayat</span>
                </button>
              )}
            </div>

            <div className="divide-y divide-[var(--border-subtle)] border-t border-[var(--border-subtle)]">
              {data.experiences.map((exp) => (
                <div key={exp.id} className="py-6 first:pt-6">
                  {isEditMode ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) =>
                            handleExperienceChange(exp.id, {
                              role: e.target.value,
                            })
                          }
                          aria-label="Peran pengalaman"
                          className="flex-1 px-2.5 py-1.5 rounded border border-[var(--border-strong)] bg-[var(--bg-elevated)] text-sm font-semibold text-[var(--text-primary)]"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveExperience(exp.id)}
                          aria-label="Hapus riwayat ini"
                          className="p-2 rounded border border-[var(--border-subtle)] text-red-600 hover:bg-[var(--bg-surface)]"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={exp.organization}
                          onChange={(e) =>
                            handleExperienceChange(exp.id, {
                              organization: e.target.value,
                            })
                          }
                          aria-label="Organisasi"
                          className="px-2.5 py-1.5 rounded border border-[var(--border-strong)] bg-[var(--bg-elevated)] text-xs text-[var(--text-secondary)]"
                        />
                        <input
                          type="text"
                          value={exp.period}
                          onChange={(e) =>
                            handleExperienceChange(exp.id, {
                              period: e.target.value,
                            })
                          }
                          aria-label="Periode waktu"
                          className="px-2.5 py-1.5 rounded border border-[var(--border-strong)] bg-[var(--bg-elevated)] text-xs font-mono text-[var(--text-secondary)]"
                        />
                      </div>
                      <textarea
                        rows={3}
                        value={exp.highlights.join('\n')}
                        onChange={(e) =>
                          handleExperienceChange(exp.id, {
                            highlights: e.target.value
                              .split('\n')
                              .filter((line) => line.trim().length > 0),
                          })
                        }
                        aria-label="Poin pencapaian (satu per baris)"
                        className="w-full p-2.5 rounded border border-[var(--border-strong)] bg-[var(--bg-elevated)] text-xs text-[var(--text-secondary)]"
                      />
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="font-display text-lg font-semibold text-[var(--text-primary)]">
                          {exp.role}
                        </h3>
                        <span className="font-mono text-xs text-[var(--text-muted)] tabular-nums">
                          {exp.period}
                        </span>
                      </div>
                      <p className="mt-1 text-xs font-medium text-[var(--accent-primary)]">
                        {exp.organization}
                      </p>
                      <ul className="mt-3 space-y-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                        {exp.highlights.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <span
                              aria-hidden="true"
                              className="text-[var(--text-muted)] select-none"
                            >
                              —
                            </span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Adjustable Skill Proficiency Bars */}
          <div className="lg:col-span-5">
            <div className="flex items-center justify-between gap-4 mb-8">
              <div>
                <p className="text-xs font-medium text-[var(--text-muted)] mb-1.5">
                  Kompetensi Teknis
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
                  Keahlian &amp; Fokus
                </h2>
              </div>

              {isEditMode && (
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-[var(--border-strong)] bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:bg-[var(--bg-surface)] whitespace-nowrap shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Tambah</span>
                </button>
              )}
            </div>

            <div className="space-y-6 border-t border-[var(--border-subtle)] pt-6">
              {data.skills.map((skill) => (
                <div key={skill.id}>
                  {isEditMode ? (
                    <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={skill.name}
                          onChange={(e) =>
                            handleSkillChange(skill.id, {
                              name: e.target.value,
                            })
                          }
                          aria-label="Nama keahlian"
                          className="flex-1 px-2 py-1 rounded border border-[var(--border-strong)] bg-[var(--bg-canvas)] text-xs font-semibold text-[var(--text-primary)]"
                        />
                        <span className="font-mono text-xs font-medium tabular-nums text-[var(--text-primary)]">
                          {skill.level}%
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill.id)}
                          aria-label={`Hapus keahlian ${skill.name}`}
                          className="p-1 text-red-600 hover:bg-[var(--bg-surface)] rounded"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <input
                        type="range"
                        min={20}
                        max={100}
                        value={skill.level}
                        onChange={(e) =>
                          handleSkillChange(skill.id, {
                            level: Number(e.target.value),
                          })
                        }
                        aria-label={`Persentase ${skill.name}`}
                        className="w-full accent-[var(--accent-primary)]"
                      />
                      <input
                        type="text"
                        value={skill.tools}
                        onChange={(e) =>
                          handleSkillChange(skill.id, {
                            tools: e.target.value,
                          })
                        }
                        aria-label="Sub-keahlian atau perangkat"
                        className="w-full px-2 py-1 rounded border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-xs text-[var(--text-muted)]"
                      />
                    </div>
                  ) : (
                    <>
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="text-sm font-semibold text-[var(--text-primary)]">
                          {skill.name}
                        </span>
                        <span className="font-mono text-xs font-medium text-[var(--text-primary)] tabular-nums shrink-0">
                          {skill.level}%
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                        {skill.tools}
                      </p>
                      <progress
                        value={skill.level}
                        max={100}
                        aria-label={skill.name}
                        className="skill-progress mt-2.5 block"
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
