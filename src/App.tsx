/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import {
  CharacterProfile,
  ChoiceOption,
  ChoiceRecord,
  Episode,
  NarrativeState,
  NavigationTab,
  Season,
} from './types/mundie';
import {
  GENERATED_ASSETS,
  INITIAL_CHARACTERS,
  INITIAL_EPISODES,
  INITIAL_NARRATIVE_STATE,
  INITIAL_SEASONS,
} from './data/initialMundieData';
import { HomeView } from './components/HomeView';
import { LibraryView } from './components/LibraryView';
import { CharactersView } from './components/CharactersView';
import { ComicReaderView } from './components/ComicReaderView';
import { JournalView } from './components/JournalView';
import { EditorialStudioView } from './components/EditorialStudioView';

const STORAGE_KEYS = {
  narrative: 'mundie_historias_narrative_v2',
  seasons: 'mundie_historias_seasons_v2',
  episodes: 'mundie_historias_episodes_v3',
  characters: 'mundie_historias_characters_v2',
};

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('inicio');
  const [activeEpisodeId, setActiveEpisodeId] = useState<string>('ep-01');
  const [studioTargetEpisodeId, setStudioTargetEpisodeId] = useState<
    string | null
  >(null);
  const [isImmersiveReader, setIsImmersiveReader] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const [seasons, setSeasons] = useState<Season[]>(() =>
    loadFromStorage(STORAGE_KEYS.seasons, INITIAL_SEASONS)
  );
  const [episodes, setEpisodes] = useState<Episode[]>(() =>
    loadFromStorage(STORAGE_KEYS.episodes, INITIAL_EPISODES)
  );
  const [characters, setCharacters] = useState<CharacterProfile[]>(() =>
    loadFromStorage(STORAGE_KEYS.characters, INITIAL_CHARACTERS)
  );
  const [narrativeState, setNarrativeState] = useState<NarrativeState>(() =>
    loadFromStorage(STORAGE_KEYS.narrative, INITIAL_NARRATIVE_STATE)
  );

  // Persist changes cleanly in localStorage (safe handling if quota reached on large image imports)
  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEYS.narrative,
        JSON.stringify(narrativeState)
      );
    } catch {
      // Ignore quota errors while keeping in-memory state intact
    }
  }, [narrativeState]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEYS.seasons,
        JSON.stringify(seasons)
      );
    } catch {
      // Ignore quota errors
    }
  }, [seasons]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEYS.episodes,
        JSON.stringify(episodes)
      );
    } catch {
      // Ignore quota errors
    }
  }, [episodes]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEYS.characters,
        JSON.stringify(characters)
      );
    } catch {
      // Ignore quota errors
    }
  }, [characters]);

  const navigateToTab = (tab: NavigationTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    if (tab !== 'leitor') {
      setIsImmersiveReader(false);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartEpisode = (episodeId: string, targetPageId?: string) => {
    const ep = episodes.find((e) => e.id === episodeId);
    if (!ep) return;

    const firstPageId = ep.startPageId || ep.pages[0]?.id || '';
    setNarrativeState((prev) => {
      const existing = prev.progressByEpisode[episodeId];
      const nextCurrentPage =
        targetPageId || existing?.currentPageId || firstPageId;
      return {
        ...prev,
        progressByEpisode: {
          ...prev.progressByEpisode,
          [episodeId]: {
            episodeId,
            currentPageId: nextCurrentPage,
            visitedPageIds: Array.from(
              new Set([...(existing?.visitedPageIds || []), nextCurrentPage])
            ),
            selectedOptionsByDecision:
              existing?.selectedOptionsByDecision || {},
            discoveredEndings: existing?.discoveredEndings || [],
            completed: existing?.completed || false,
            lastReadAt: new Date().toISOString(),
          },
        },
      };
    });

    setActiveEpisodeId(episodeId);
    setActiveTab('leitor');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigatePage = (episodeId: string, pageId: string) => {
    const ep = episodes.find((e) => e.id === episodeId);
    const targetPage = ep?.pages.find((p) => p.id === pageId);

    setNarrativeState((prev) => {
      const existing = prev.progressByEpisode[episodeId];
      const discovered = new Set(existing?.discoveredEndings || []);
      if (targetPage?.isEnding) {
        discovered.add(targetPage.id);
      }
      return {
        ...prev,
        progressByEpisode: {
          ...prev.progressByEpisode,
          [episodeId]: {
            episodeId,
            currentPageId: pageId,
            visitedPageIds: Array.from(
              new Set([...(existing?.visitedPageIds || []), pageId])
            ),
            selectedOptionsByDecision:
              existing?.selectedOptionsByDecision || {},
            discoveredEndings: Array.from(discovered),
            completed: Boolean(existing?.completed || targetPage?.isEnding),
            lastReadAt: new Date().toISOString(),
          },
        },
      };
    });
  };

  const handleSelectChoice = (
    episode: Episode,
    decisionId: string,
    option: ChoiceOption
  ) => {
    const nextPage = episode.pages.find((p) => p.id === option.nextPageId);

    // Find if there is a further ending page in this branch so completion tracks smoothly in vertical mode too
    const subsequentPage = nextPage?.nextPageId
      ? episode.pages.find((p) => p.id === nextPage.nextPageId)
      : undefined;

    const record: ChoiceRecord = {
      id: `choice-${Date.now()}`,
      episodeId: episode.id,
      episodeTitle: `Ep. ${String(episode.number).padStart(2, '0')} — ${episode.title}`,
      decisionId,
      optionId: option.id,
      optionKey: option.keyLabel,
      chosenLabel: option.label,
      consequenceSummary: option.consequenceSummary,
      mobilizedSkills: option.mobilizedSkills,
      reflectionQuestion: option.reflectionQuestion,
      timestamp: new Date().toISOString(),
    };

    setNarrativeState((prev) => {
      const existing = prev.progressByEpisode[episode.id];
      const discovered = new Set(existing?.discoveredEndings || []);
      if (nextPage?.isEnding) discovered.add(nextPage.id);
      if (
        prev.readerModePreference === 'vertical' &&
        subsequentPage?.isEnding
      ) {
        discovered.add(subsequentPage.id);
      }

      // Avoid duplicating identical consecutive choice clicks while keeping distinct path explorations
      const filteredHistory = prev.choiceHistory.filter(
        (c) => !(c.decisionId === decisionId && c.optionId === option.id)
      );

      return {
        ...prev,
        choiceHistory: [record, ...filteredHistory],
        relationshipStates: {
          ...prev.relationshipStates,
          ...option.relationshipNotes,
        },
        progressByEpisode: {
          ...prev.progressByEpisode,
          [episode.id]: {
            episodeId: episode.id,
            currentPageId: option.nextPageId,
            visitedPageIds: Array.from(
              new Set([
                ...(existing?.visitedPageIds || []),
                option.nextPageId,
              ])
            ),
            selectedOptionsByDecision: {
              ...(existing?.selectedOptionsByDecision || {}),
              [decisionId]: option.id,
            },
            discoveredEndings: Array.from(discovered),
            completed: Boolean(
              existing?.completed ||
                nextPage?.isEnding ||
                (prev.readerModePreference === 'vertical' &&
                  subsequentPage?.isEnding)
            ),
            lastReadAt: new Date().toISOString(),
          },
        },
      };
    });

    if (narrativeState.readerModePreference === 'paginas') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRestartEpisode = (episode: Episode) => {
    const startId = episode.startPageId || episode.pages[0]?.id || '';
    setNarrativeState((prev) => {
      const existing = prev.progressByEpisode[episode.id];
      return {
        ...prev,
        progressByEpisode: {
          ...prev.progressByEpisode,
          [episode.id]: {
            episodeId: episode.id,
            currentPageId: startId,
            visitedPageIds: startId ? [startId] : [],
            selectedOptionsByDecision: {},
            // Preserve discovered endings count across replays so reader sees all branches unlocked
            discoveredEndings: existing?.discoveredEndings || [],
            completed: existing?.completed || false,
            lastReadAt: new Date().toISOString(),
          },
        },
      };
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveReflection = (decisionId: string, note: string) => {
    setNarrativeState((prev) => ({
      ...prev,
      personalReflections: {
        ...prev.personalReflections,
        [decisionId]: note,
      },
    }));
  };

  const handleResetAllProgress = () => {
    setNarrativeState(INITIAL_NARRATIVE_STATE);
    window.localStorage.removeItem(STORAGE_KEYS.narrative);
  };

  const handleSaveEpisode = (updatedEpisode: Episode) => {
    setEpisodes((prev) => {
      const exists = prev.some((e) => e.id === updatedEpisode.id);
      if (exists) {
        return prev.map((e) =>
          e.id === updatedEpisode.id ? updatedEpisode : e
        );
      }
      return [...prev, updatedEpisode];
    });
  };

  const handleResetEditorialCatalog = () => {
    setSeasons(INITIAL_SEASONS);
    setEpisodes(INITIAL_EPISODES);
    setCharacters(INITIAL_CHARACTERS);
    window.localStorage.removeItem(STORAGE_KEYS.seasons);
    window.localStorage.removeItem(STORAGE_KEYS.episodes);
    window.localStorage.removeItem(STORAGE_KEYS.characters);
  };

  const activeEpisode =
    episodes.find((e) => e.id === activeEpisodeId) || episodes[0];
  const pilotProgress = narrativeState.progressByEpisode['ep-01'];

  const navItems: { id: NavigationTab; label: string }[] = [
    { id: 'inicio', label: 'Início' },
    { id: 'biblioteca', label: 'Biblioteca' },
    { id: 'personagens', label: 'Personagens' },
    { id: 'diario', label: 'Meu Diário' },
    { id: 'editorial', label: 'Estúdio Editorial' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F3] text-[#1D2230]">
      {/* Strict 3-Zone Top Bar Contract (Hidden when inside Comic Reader to avoid double sticky chrome) */}
      {activeTab !== 'leitor' && (
        <header className="sticky top-0 z-40 border-b border-[#E5DED0] bg-[#FBF8F3]/95 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-4">
            {/* Zone 1: Single-line Brand Lockup */}
            <button
              type="button"
              onClick={() => navigateToTab('inicio')}
              className="inline-flex items-center gap-2.5 font-serif text-xl font-bold tracking-tight text-[#1D2230] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#244B8A]"
            >
              <span className="h-9 w-9 shrink-0 overflow-hidden rounded-full border border-[#D8CFC0] bg-[#FAF3EB]">
                <img
                  src={GENERATED_ASSETS.mundieBrandLogo}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full scale-[1.55] object-cover object-[50%_24%]"
                />
              </span>
              <span>MUNDIÊ Histórias</span>
            </button>

            {/* Zone 2: 5 Concise Single-Line Navigation Links */}
            <nav
              aria-label="Navegação principal"
              className="hidden md:flex items-center gap-7 text-sm font-medium text-[#586174]"
            >
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      if (item.id === 'editorial') {
                        setStudioTargetEpisodeId(null);
                      }
                      navigateToTab(item.id);
                    }}
                    className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                      isActive
                        ? 'border-[#244B8A] text-[#1D2230] font-semibold'
                        : 'border-transparent hover:text-[#1D2230] hover:border-[#D4CBB9]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: 1 Primary Action (+ Mobile Menu Button on small viewports) */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => handleStartEpisode('ep-01')}
                className="bg-[#244B8A] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1B3A6E] whitespace-nowrap shrink-0"
              >
                {pilotProgress ? 'Continuar Piloto 01' : 'Ler Piloto 01'}
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen((v) => !v)}
                aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
                className="md:hidden p-2 text-[#1D2230] hover:bg-[#EAE3D5]"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Drawer Menu */}
          {mobileMenuOpen && (
            <nav
              aria-label="Menu móvel"
              className="border-t border-[#E5DED0] bg-[#FBF8F3] px-6 py-4 md:hidden"
            >
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => navigateToTab(item.id)}
                    className={`py-1.5 text-left text-sm font-medium ${
                      activeTab === item.id
                        ? 'font-semibold text-[#244B8A]'
                        : 'text-[#464F62]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </nav>
          )}
        </header>
      )}

      {/* Main Content Router */}
      <main className="flex-1">
        {activeTab === 'inicio' && seasons[0] && (
          <HomeView
            season={seasons[0]}
            episodes={episodes}
            characters={characters}
            narrativeState={narrativeState}
            onStartEpisode={(epId, targetPageId) =>
              handleStartEpisode(epId, targetPageId)
            }
            onNavigateTab={navigateToTab}
          />
        )}

        {activeTab === 'biblioteca' && (
          <LibraryView
            seasons={seasons}
            episodes={episodes}
            characters={characters}
            narrativeState={narrativeState}
            onStartEpisode={(epId) => handleStartEpisode(epId)}
            onEditEpisodeInStudio={(epId) => {
              setStudioTargetEpisodeId(epId);
              navigateToTab('editorial');
            }}
          />
        )}

        {activeTab === 'personagens' && (
          <CharactersView
            characters={characters}
            episodes={episodes}
            narrativeState={narrativeState}
            onStartEpisode={(epId) => handleStartEpisode(epId)}
          />
        )}

        {activeTab === 'leitor' && activeEpisode && (
          <ComicReaderView
            episode={activeEpisode}
            characters={characters}
            narrativeState={narrativeState}
            isImmersive={isImmersiveReader}
            onToggleImmersive={() => setIsImmersiveReader((v) => !v)}
            onToggleSocioemotionalLens={() =>
              setNarrativeState((prev) => ({
                ...prev,
                showSocioemotionalLens: !(
                  prev.showSocioemotionalLens ?? true
                ),
              }))
            }
            onChangeReaderMode={(mode) =>
              setNarrativeState((prev) => ({
                ...prev,
                readerModePreference: mode,
              }))
            }
            onNavigatePage={handleNavigatePage}
            onSelectChoice={handleSelectChoice}
            onRestartEpisode={handleRestartEpisode}
            onExitReader={() => navigateToTab('inicio')}
            onOpenJournal={() => navigateToTab('diario')}
          />
        )}

        {activeTab === 'diario' && (
          <JournalView
            episodes={episodes}
            narrativeState={narrativeState}
            onSaveReflection={handleSaveReflection}
            onStartEpisode={(epId) => handleStartEpisode(epId)}
            onJumpToDecision={(epId, pageId) =>
              handleStartEpisode(epId, pageId)
            }
            onResetAllProgress={handleResetAllProgress}
          />
        )}

        {activeTab === 'editorial' && (
          <EditorialStudioView
            seasons={seasons}
            episodes={episodes}
            characters={characters}
            initialSelectedEpisodeId={studioTargetEpisodeId}
            onAddSeason={(s) => setSeasons((prev) => [...prev, s])}
            onSaveEpisode={handleSaveEpisode}
            onAddCharacter={(c) => setCharacters((prev) => [...prev, c])}
            onPreviewEpisode={(epId) => handleStartEpisode(epId)}
            onResetEditorialCatalog={handleResetEditorialCatalog}
          />
        )}
      </main>

      {/* Quiet Editorial Footer (Hidden inside Reader) */}
      {activeTab !== 'leitor' && (
        <footer className="border-t border-[#E5DED0] bg-[#F4EFE6]">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-6 py-10 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <img
                src={GENERATED_ASSETS.mundieBrandLogo}
                alt="MUNDIÊ Editora — Histórias que abrem mundos"
                className="h-16 w-16 shrink-0 object-contain mix-blend-multiply"
              />
              <div>
                <p className="font-serif text-base font-semibold text-[#1D2230]">
                  MUNDIÊ Editora · Histórias que abrem mundos
                </p>
                <p className="mt-1 text-xs text-[#586174]">
                  Seu mundo. Suas histórias. Mil descobertas. · Ambiente seguro sem coleta de dados pessoais.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-[#586174]">
              <button
                type="button"
                onClick={() => navigateToTab('biblioteca')}
                className="hover:text-[#1D2230] whitespace-nowrap"
              >
                Coleção Entre Nós
              </button>
              <button
                type="button"
                onClick={() => navigateToTab('personagens')}
                className="hover:text-[#1D2230] whitespace-nowrap"
              >
                Personagens
              </button>
              <button
                type="button"
                onClick={() => navigateToTab('diario')}
                className="hover:text-[#1D2230] whitespace-nowrap"
              >
                Meu Diário de Escolhas
              </button>
              <button
                type="button"
                onClick={() => navigateToTab('editorial')}
                className="hover:text-[#1D2230] whitespace-nowrap"
              >
                Estúdio Editorial
              </button>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
