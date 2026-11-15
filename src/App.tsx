/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Download, Menu, PencilLine, RotateCcw, X } from 'lucide-react';
import {
  DEFAULT_ASSURE_PHASES,
  DEFAULT_CREATOR_PROFILE,
  DEFAULT_PEER_SESSIONS,
  DEFAULT_SUMBER_RUJUKAN,
  DEFAULT_TEMPLATE_CONFIG,
  INITIAL_FEEDBACK,
} from './data/curriculumData';
import {
  AssurePhase,
  CreatorProfile,
  CustomGameEmbed,
  CustomNoteItem,
  FeedbackEntry,
  PeerSessionItem,
  ReferenceItem,
  SectionId,
  SiteTemplateConfig,
} from './types';
import { HeroLanding } from './components/HeroLanding';
import { NotaSection } from './components/NotaSection';
import { AktivitiSection } from './components/AktivitiSection';
import { PentaksiranSection } from './components/PentaksiranSection';
import { GamifikasiSection } from './components/GamifikasiSection';
import {
  MaklumbalasSection,
  MetadataSection,
  RakanPembelajaranSection,
} from './components/KomunitiSections';
import { CanvaExportModal } from './components/CanvaExportModal';

const ALL_MODULES: { id: SectionId; label: string }[] = [
  { id: 'pengenalan', label: 'Pengenalan' },
  { id: 'nota', label: 'Nota' },
  { id: 'aktiviti', label: 'Aktiviti ASSURE' },
  { id: 'pentaksiran', label: 'Pentaksiran' },
  { id: 'interaktif', label: 'Kuiz & Gamifikasi' },
  { id: 'rakan', label: 'Rakan Pembelajaran' },
  { id: 'metadata', label: 'Metadata' },
  { id: 'maklumbalas', label: 'Maklumbalas' },
];

const TOP_NAV_LINKS: { id: SectionId; label: string }[] = [
  { id: 'pengenalan', label: 'Pengenalan' },
  { id: 'nota', label: 'Nota' },
  { id: 'aktiviti', label: 'Aktiviti' },
  { id: 'pentaksiran', label: 'Pentaksiran' },
  { id: 'rakan', label: 'Rakan' },
];

function loadStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

const VALID_SECTIONS: SectionId[] = [
  'pengenalan',
  'nota',
  'aktiviti',
  'pentaksiran',
  'interaktif',
  'rakan',
  'metadata',
  'maklumbalas',
];

function getInitialRouteFromUrl(): { section: SectionId; tab: string | null } {
  if (typeof window === 'undefined') {
    return { section: 'pengenalan', tab: null };
  }
  const params = new URLSearchParams(window.location.search);
  const modulParam = params.get('modul') as SectionId | null;
  const tabParam = params.get('tab') || params.get('mode');
  if (modulParam && VALID_SECTIONS.includes(modulParam)) {
    return { section: modulParam, tab: tabParam };
  }
  return { section: 'pengenalan', tab: null };
}

function updateUrlQuery(section: SectionId, tab?: string | null) {
  if (typeof window === 'undefined') return;
  try {
    const url = new URL(window.location.href);
    url.searchParams.set('modul', section);
    if (tab) {
      url.searchParams.set('tab', tab);
    } else {
      url.searchParams.delete('tab');
    }
    url.searchParams.delete('mode');
    window.history.replaceState({}, '', url.toString());
  } catch {
    // ignore history errors in sandboxed frames
  }
}

export default function App() {
  const initialRoute = getInitialRouteFromUrl();
  const [activeSection, setActiveSection] = useState<SectionId>(
    initialRoute.section
  );
  const [activeSubTab, setActiveSubTab] = useState<string | null>(
    initialRoute.tab
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [canvaModalOpen, setCanvaModalOpen] = useState(false);

  const [profile, setProfile] = useState<CreatorProfile>(() =>
    loadStorage('pulau_geometri_profile_v3', DEFAULT_CREATOR_PROFILE)
  );
  const [templateConfig, setTemplateConfig] = useState<SiteTemplateConfig>(() =>
    loadStorage('pulau_geometri_config_v3', DEFAULT_TEMPLATE_CONFIG)
  );
  const [assurePhases, setAssurePhases] = useState<AssurePhase[]>(() =>
    loadStorage('pulau_geometri_assure_v3', DEFAULT_ASSURE_PHASES)
  );
  const [customNotes, setCustomNotes] = useState<CustomNoteItem[]>(() =>
    loadStorage('pulau_geometri_notes_v2', [])
  );
  const [customGameEmbeds, setCustomGameEmbeds] = useState<CustomGameEmbed[]>(
    () => loadStorage('pulau_geometri_game_embeds_v2', [])
  );
  const [peerSessions, setPeerSessions] = useState<PeerSessionItem[]>(() =>
    loadStorage('pulau_geometri_peers_v2', DEFAULT_PEER_SESSIONS)
  );
  const [references, setReferences] = useState<ReferenceItem[]>(() =>
    loadStorage('pulau_geometri_refs_v2', DEFAULT_SUMBER_RUJUKAN)
  );
  const [feedbackEntries, setFeedbackEntries] = useState<FeedbackEntry[]>(() =>
    loadStorage('pulau_geometri_feedback_v2', INITIAL_FEEDBACK)
  );

  const persist = (key: string, value: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore storage quota overflow for large uploaded media
    }
  };

  useEffect(() => persist('pulau_geometri_profile_v3', profile), [profile]);
  useEffect(
    () => persist('pulau_geometri_config_v3', templateConfig),
    [templateConfig]
  );
  useEffect(
    () => persist('pulau_geometri_assure_v3', assurePhases),
    [assurePhases]
  );
  useEffect(
    () => persist('pulau_geometri_notes_v2', customNotes),
    [customNotes]
  );
  useEffect(
    () => persist('pulau_geometri_game_embeds_v2', customGameEmbeds),
    [customGameEmbeds]
  );
  useEffect(
    () => persist('pulau_geometri_peers_v2', peerSessions),
    [peerSessions]
  );
  useEffect(
    () => persist('pulau_geometri_refs_v2', references),
    [references]
  );
  useEffect(
    () => persist('pulau_geometri_feedback_v2', feedbackEntries),
    [feedbackEntries]
  );

  const navigateTo = (section: SectionId, tab?: string | null) => {
    setActiveSection(section);
    setActiveSubTab(tab ?? null);
    setMobileMenuOpen(false);
    updateUrlQuery(section, tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetTemplate = () => {
    setProfile(DEFAULT_CREATOR_PROFILE);
    setTemplateConfig(DEFAULT_TEMPLATE_CONFIG);
    setAssurePhases(DEFAULT_ASSURE_PHASES);
    setPeerSessions(DEFAULT_PEER_SESSIONS);
    setReferences(DEFAULT_SUMBER_RUJUKAN);
    setEditMode(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc] text-slate-900">
      {/* Three-Zone Top Bar */}
      <header className="sticky top-0 z-40 border-b border-sky-200/40 bg-[#3195e0]/95 text-white backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => navigateTo('pengenalan')}
            className="flex shrink-0 items-center gap-2.5 text-left whitespace-nowrap focus-visible:outline-2 focus-visible:outline-white"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 44 44"
              className="h-8 w-8 shrink-0 text-white"
            >
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <ellipse
                  key={deg}
                  cx="22"
                  cy="11"
                  rx="4.8"
                  ry="8.5"
                  fill="currentColor"
                  transform={`rotate(${deg} 22 22)`}
                />
              ))}
              <circle cx="22" cy="22" r="4.2" fill="#f6f03b" />
            </svg>
            <span className="font-serif-display text-xl tracking-tight text-white">
              Pulau Geometri
            </span>
          </button>

          <nav
            aria-label="Navigasi Utama"
            className="hidden items-center gap-7 md:flex"
          >
            {TOP_NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => navigateTo(link.id)}
                  className={`relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors ${
                    isActive
                      ? 'text-[#f6f03b]'
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute right-0 -bottom-0.5 left-0 h-0.5 rounded-full bg-[#f6f03b]" />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => navigateTo('interaktif')}
              className="rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-900 shadow-sm transition-colors hover:bg-[#f6f03b] whitespace-nowrap shrink-0 sm:text-sm"
            >
              Kuiz Interaktif
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label="Menu Navigasi"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 md:hidden"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-white/20 bg-[#267ec4] px-4 py-3 md:hidden">
            <div className="grid grid-cols-2 gap-2">
              {ALL_MODULES.map((mod) => (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => navigateTo(mod.id)}
                  className={`rounded-lg px-3 py-2 text-left text-xs font-semibold ${
                    activeSection === mod.id
                      ? 'bg-[#f6f03b] text-[#161c08]'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {mod.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Secondary 8-Module Switcher + Template Mode + Export ke Canva */}
      <div className="no-print border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {ALL_MODULES.map((mod, idx) => {
              const active = activeSection === mod.id;
              return (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => navigateTo(mod.id)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                    active
                      ? 'bg-sky-50 text-sky-700 ring-1 ring-sky-200'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {String(idx + 1).padStart(2, '0')}. {mod.label}
                </button>
              );
            })}
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={() => setCanvaModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-bold text-sky-700 whitespace-nowrap transition-colors hover:bg-sky-100"
            >
              <Download className="h-3.5 w-3.5" />
              Eksport ke Canva
            </button>

            <button
              type="button"
              onClick={() => setEditMode((m) => !m)}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-bold whitespace-nowrap transition-colors ${
                editMode
                  ? 'border-amber-400 bg-[#f6f03b] text-[#161c08]'
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <PencilLine className="h-3.5 w-3.5" />
              {editMode ? 'Mod Sunting: Aktif' : 'Sunting Templat'}
            </button>
            {editMode && (
              <button
                type="button"
                onClick={handleResetTemplate}
                title="Pulihkan teks templat asal"
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Set Semula
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className={`flex-1 ${canvaModalOpen ? 'print:hidden' : ''}`}>
        {activeSection === 'pengenalan' && (
          <HeroLanding
            profile={profile}
            templateConfig={templateConfig}
            editMode={editMode}
            onUpdateProfile={setProfile}
            onUpdateConfig={setTemplateConfig}
            onNavigate={navigateTo}
          />
        )}
        {activeSection === 'nota' && (
          <NotaSection
            customNotes={customNotes}
            initialTab={activeSubTab || undefined}
            onTabChange={(tab) => {
              setActiveSubTab(tab);
              updateUrlQuery('nota', tab);
            }}
            onAddNote={(n) => setCustomNotes((prev) => [n, ...prev])}
            onDeleteNote={(id) =>
              setCustomNotes((prev) => prev.filter((item) => item.id !== id))
            }
          />
        )}
        {activeSection === 'aktiviti' && (
          <AktivitiSection
            templateConfig={templateConfig}
            assurePhases={assurePhases}
            editMode={editMode}
            onUpdateConfig={setTemplateConfig}
            onUpdateAssurePhases={setAssurePhases}
          />
        )}
        {activeSection === 'pentaksiran' && <PentaksiranSection />}
        {activeSection === 'interaktif' && (
          <GamifikasiSection
            customEmbeds={customGameEmbeds}
            initialMode={activeSubTab || undefined}
            onModeChange={(mode) => {
              setActiveSubTab(mode);
              updateUrlQuery('interaktif', mode);
            }}
            onAddEmbed={(item) =>
              setCustomGameEmbeds((prev) => [item, ...prev])
            }
            onDeleteEmbed={(id) =>
              setCustomGameEmbeds((prev) =>
                prev.filter((item) => item.id !== id)
              )
            }
          />
        )}
        {activeSection === 'rakan' && (
          <RakanPembelajaranSection
            sessions={peerSessions}
            onAddSession={(item) => setPeerSessions((prev) => [item, ...prev])}
            onDeleteSession={(id) =>
              setPeerSessions((prev) => prev.filter((item) => item.id !== id))
            }
          />
        )}
        {activeSection === 'metadata' && (
          <MetadataSection
            profile={profile}
            references={references}
            onUpdateProfile={setProfile}
            onUpdateReferences={setReferences}
          />
        )}
        {activeSection === 'maklumbalas' && (
          <MaklumbalasSection
            entries={feedbackEntries}
            templateConfig={templateConfig}
            onAddFeedback={(entry) =>
              setFeedbackEntries((prev) => [entry, ...prev])
            }
            onClearFeedback={() => setFeedbackEntries([])}
            onUpdateConfig={setTemplateConfig}
          />
        )}
      </main>

      {/* Canva Export Modal */}
      <CanvaExportModal
        open={canvaModalOpen}
        onClose={() => setCanvaModalOpen(false)}
        profile={profile}
        templateConfig={templateConfig}
        assurePhases={assurePhases}
        peerSessions={peerSessions}
        references={references}
      />

      {/* Clean Footer */}
      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <p className="text-sm font-bold text-slate-900">
              Pulau Geometri · {templateConfig.subjek} ({templateConfig.standardKandungan})
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Dibangunkan oleh {profile.namaPelajar} · {profile.institusi}
            </p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-slate-600">
            {ALL_MODULES.map((mod) => (
              <button
                key={mod.id}
                type="button"
                onClick={() => navigateTo(mod.id)}
                className="hover:text-sky-700"
              >
                {mod.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
