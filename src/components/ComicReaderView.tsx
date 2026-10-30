import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  GitBranch,
  Maximize2,
  Minimize2,
  RotateCcw,
  ScrollText,
  X,
} from 'lucide-react';
import {
  CharacterProfile,
  ChoiceOption,
  ComicPage,
  Episode,
  NarrativeState,
} from '../types/mundie';
import { ComicPanelIllustration } from './ComicPanelIllustration';

interface ComicReaderViewProps {
  episode: Episode;
  characters: CharacterProfile[];
  narrativeState: NarrativeState;
  isImmersive: boolean;
  onToggleImmersive: () => void;
  onToggleSocioemotionalLens: () => void;
  onChangeReaderMode: (mode: 'paginas' | 'vertical') => void;
  onNavigatePage: (episodeId: string, pageId: string) => void;
  onSelectChoice: (
    episode: Episode,
    decisionId: string,
    option: ChoiceOption
  ) => void;
  onRestartEpisode: (episode: Episode) => void;
  onExitReader: () => void;
  onOpenJournal: () => void;
}

const PILOT_BRANCH_SUMMARY = [
  {
    stage1Key: 'A',
    stage1Title: 'Pergunta direta na escada',
    stage1PageId: 'ep01-p5-a',
    skills: 'Comunicação assertiva · Coragem emocional',
    endings: [
      { code: 'A1', pageId: 'ep01-p6-a1', title: 'Honestidade e novo acordo' },
      { code: 'A2', pageId: 'ep01-p6-a2', title: 'Acolhimento ao tempo de Ayla' },
    ],
  },
  {
    stage1Key: 'B',
    stage1Title: 'Afastamento e o bilhete no armário',
    stage1PageId: 'ep01-p5-b',
    skills: 'Autopercepção de limites · Leitura de defesas',
    endings: [
      { code: 'B1', pageId: 'ep01-p6-b1', title: 'Conversa franca no portão' },
      { code: 'B2', pageId: 'ep01-p6-b2', title: 'Sinal de afeto no próprio ritmo' },
    ],
  },
  {
    stage1Key: 'C',
    stage1Title: 'Conversa um a um com Noah',
    stage1PageId: 'ep01-p5-c',
    skills: 'Escuta ativa · Mediação cuidadosa',
    endings: [
      { code: 'C1', pageId: 'ep01-p6-c1', title: 'A própria voz nos degraus' },
      { code: 'C2', pageId: 'ep01-p6-c2', title: 'Escuta sem controle na roda' },
    ],
  },
];

export const ComicReaderView: React.FC<ComicReaderViewProps> = ({
  episode,
  characters,
  narrativeState,
  isImmersive,
  onToggleImmersive,
  onToggleSocioemotionalLens,
  onChangeReaderMode,
  onNavigatePage,
  onSelectChoice,
  onRestartEpisode,
  onExitReader,
  onOpenJournal,
}) => {
  const [branchMapOpen, setBranchMapOpen] = useState(false);
  const [selectedPerspectiveChar, setSelectedPerspectiveChar] =
    useState<string>('mia');

  const progress = narrativeState.progressByEpisode[episode.id];
  const readerMode = narrativeState.readerModePreference;
  const showLens = narrativeState.showSocioemotionalLens ?? true;

  // Build ordered active path of pages based on choices made so far
  const activeStorySequence = useMemo<ComicPage[]>(() => {
    if (!episode.pages || episode.pages.length === 0) return [];
    const pagesMap = new Map<string, ComicPage>(
      episode.pages.map((p) => [p.id, p])
    );
    const startId = episode.startPageId || episode.pages[0].id;
    const sequence: ComicPage[] = [];
    const visitedGuard = new Set<string>();

    let cursorId: string | undefined | null = startId;
    while (cursorId && !visitedGuard.has(cursorId)) {
      const page = pagesMap.get(cursorId);
      if (!page) break;
      visitedGuard.add(cursorId);
      sequence.push(page);

      if (page.decision) {
        const chosenOptId =
          progress?.selectedOptionsByDecision?.[page.decision.id];
        const chosenOpt = page.decision.options.find(
          (o) => o.id === chosenOptId
        );
        if (chosenOpt) {
          cursorId = chosenOpt.nextPageId;
        } else {
          break;
        }
      } else {
        cursorId = page.nextPageId;
      }
    }
    return sequence;
  }, [episode, progress]);

  const currentPageIndex = useMemo(() => {
    if (activeStorySequence.length === 0) return 0;
    if (!progress?.currentPageId) return 0;
    const idx = activeStorySequence.findIndex(
      (p) => p.id === progress.currentPageId
    );
    return idx >= 0 ? idx : 0;
  }, [activeStorySequence, progress?.currentPageId]);

  const currentPage = activeStorySequence[currentPageIndex] || episode.pages[0];

  const totalPossibleEndings = useMemo(() => {
    const count = episode.pages.filter((p) => Boolean(p.isEnding)).length;
    return count > 0 ? count : 1;
  }, [episode.pages]);

  const expectedRunLength = useMemo(() => {
    if (episode.id === 'ep-01') return 6;
    return Math.max(activeStorySequence.length, 1);
  }, [episode.id, activeStorySequence.length]);

  const progressPercentage = useMemo(() => {
    if (!currentPage) return 0;
    if (readerMode === 'vertical') {
      return Math.min(
        100,
        Math.round((activeStorySequence.length / expectedRunLength) * 100)
      );
    }
    return Math.min(
      100,
      Math.round(((currentPageIndex + 1) / expectedRunLength) * 100)
    );
  }, [
    currentPage,
    readerMode,
    activeStorySequence.length,
    expectedRunLength,
    currentPageIndex,
  ]);

  // Mobilized skills along the active playthrough
  const activeRunSkills = useMemo(() => {
    const skills = new Set<string>();
    activeStorySequence.forEach((p) => {
      if (p.decision) {
        const chosenId = progress?.selectedOptionsByDecision?.[p.decision.id];
        const opt = p.decision.options.find((o) => o.id === chosenId);
        opt?.mobilizedSkills.forEach((s) => skills.add(s));
      }
    });
    return Array.from(skills);
  }, [activeStorySequence, progress?.selectedOptionsByDecision]);

  useEffect(() => {
    if (readerMode !== 'paginas') return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (e.key === 'ArrowRight') {
        const nextPage = activeStorySequence[currentPageIndex + 1];
        if (nextPage) {
          onNavigatePage(episode.id, nextPage.id);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else if (e.key === 'ArrowLeft') {
        const prevPage = activeStorySequence[currentPageIndex - 1];
        if (prevPage) {
          onNavigatePage(episode.id, prevPage.id);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else if (e.key === 'Escape') {
        if (branchMapOpen) setBranchMapOpen(false);
        else if (isImmersive) onToggleImmersive();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    readerMode,
    activeStorySequence,
    currentPageIndex,
    episode.id,
    onNavigatePage,
    isImmersive,
    onToggleImmersive,
    branchMapOpen,
  ]);

  if (!episode.pages || episode.pages.length === 0) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="text-xs font-medium tracking-widest text-[#586174] uppercase">
          Episódio {String(episode.number).padStart(2, '0')} · Em produção editorial
        </p>
        <h1 className="mt-3 font-serif text-3xl font-semibold text-[#1D2230]">
          {episode.title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#586174]">
          {episode.synopsis}
        </p>
        <div className="mt-8 border border-[#E5DED0] bg-[#F4EFE6] p-6 text-left">
          <p className="text-xs font-semibold tracking-wider text-[#244B8A] uppercase">
            Trecho do roteiro original
          </p>
          <p className="mt-2 font-serif text-base leading-relaxed text-[#1D2230] italic">
            “{episode.scriptExcerpt}”
          </p>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={onExitReader}
            className="inline-flex items-center gap-2 border border-[#1D2230] px-5 py-2.5 text-sm font-medium text-[#1D2230] transition-colors hover:bg-[#1D2230] hover:text-white whitespace-nowrap shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar à Biblioteca
          </button>
        </div>
      </section>
    );
  }

  const renderLearningNote = (page: ComicPage) => {
    if (!showLens || !page.learningNote) return null;
    return (
      <aside
        aria-label="Lente de aprendizagem socioemocional"
        className="border border-[#D8CFC0] bg-[#F4EFE6] p-5 text-[#1D2230]"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#244B8A]">
          <span className="font-semibold tracking-wider uppercase">
            Lente Socioemocional · {page.learningNote.skillFocus}
          </span>
          <span className="text-[#586174]"> Aprendizagem integrada à narrativa</span>
        </div>
        <h3 className="mt-1.5 font-serif text-base font-semibold text-[#1D2230]">
          {page.learningNote.pedagogicalTitle}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-[#384152]">
          {page.learningNote.insight}
        </p>
      </aside>
    );
  };

  const renderDecisionBox = (page: ComicPage) => {
    if (!page.decision) return null;
    const selectedOptId =
      progress?.selectedOptionsByDecision?.[page.decision.id];

    return (
      <div
        aria-label="Momento de decisão interativa"
        className="my-8 border-2 border-[#1D2230] bg-[#FBF8F3] p-6 sm:p-8 text-[#1D2230] shadow-sm"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5DED0] pb-4">
          <span className="text-xs font-semibold tracking-widest text-[#DD6452] uppercase">
            {page.decision.stageLabel || 'Momento de Decisão · Entre Nós'}
          </span>
          {selectedOptId && (
            <span className="text-xs text-[#586174]">
              Escolha ativa · Clique em outra opção se quiser recalcular o caminho
            </span>
          )}
        </div>

        <h3 className="mt-4 font-serif text-2xl font-semibold text-[#1D2230]">
          {page.decision.promptTitle}
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#586174]">
          {page.decision.promptSubtitle}
        </p>

        <div className="mt-6 grid grid-cols-1 gap-3.5">
          {page.decision.options.map((opt) => {
            const isChosen = selectedOptId === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onSelectChoice(episode, page.decision!.id, opt)}
                className={`group flex w-full items-start gap-4 border p-4 sm:p-5 text-left transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#244B8A] ${
                  isChosen
                    ? 'border-[#244B8A] bg-[#E8EFFB]'
                    : 'border-[#D8CFC0] bg-white hover:border-[#244B8A] hover:bg-[#F7F9FE]'
                }`}
              >
                <span
                  className={`flex h-9 min-w-9 px-2 shrink-0 items-center justify-center font-mono text-xs font-semibold transition-colors ${
                    isChosen
                      ? 'bg-[#244B8A] text-white'
                      : 'border border-[#1D2230] bg-[#FBF8F3] text-[#1D2230] group-hover:bg-[#244B8A] group-hover:text-white group-hover:border-[#244B8A]'
                  }`}
                >
                  {opt.keyLabel}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-base font-semibold text-[#1D2230]">
                    {opt.label}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[#586174]">
                    {opt.subtleContext}
                  </p>
                  {showLens && (
                    <p className="mt-2 text-xs text-[#6E56AF]">
                      Soft skills em ação: {opt.mobilizedSkills.join(' · ')}
                    </p>
                  )}
                  {isChosen && (
                    <p className="mt-2 text-xs font-semibold text-[#244B8A]">
                      Caminho selecionado nesta leitura →
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderEndingCard = (page: ComicPage) => {
    if (!page.isEnding) return null;
    const discoveredCount = progress?.discoveredEndings?.length || 1;
    const perspectives = page.characterPerspectives;

    return (
      <div className="mt-10 space-y-6 border-2 border-[#1D2230] bg-[#FBF8F3] p-6 sm:p-8 text-[#1D2230]">
        {/* Top Synthesis Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5DED0] pb-4 text-xs text-[#586174]">
          <span className="font-semibold tracking-wider text-[#244B8A] uppercase">
            Síntese da Experiência · Desfecho {page.endingCode || ''}
          </span>
          <span className="font-mono tabular-nums">
            {discoveredCount} de {totalPossibleEndings} desfechos descobertos no Piloto 01
          </span>
        </div>

        <div>
          <h3 className="font-serif text-2xl font-semibold text-[#1D2230]">
            {page.endingTitle || 'O que fica entre nós'}
          </h3>
          {page.endingReflection && (
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#343C4E]">
              {page.endingReflection}
            </p>
          )}
        </div>

        {/* Soft Skills Mobilized in this 2-stage playthrough */}
        {activeRunSkills.length > 0 && (
          <div className="border border-[#E5DED0] bg-[#F4EFE6] p-4">
            <p className="text-xs font-semibold tracking-wider text-[#244B8A] uppercase">
              Soft skills mobilizadas pelas suas decisões neste percurso
            </p>
            <p className="mt-1.5 text-sm font-medium text-[#1D2230]">
              {activeRunSkills.join(' · ')}
            </p>
          </div>
        )}

        {/* Interactive 4-Character Perspectives ("O Que Cada Um Vivia") */}
        {perspectives && (
          <div className="border-t border-[#E5DED0] pt-5">
            <p className="text-xs font-semibold tracking-wider text-[#6E56AF] uppercase">
              Empatia em Perspectiva · O que passava pela cabeça de cada um
            </p>
            <div
              role="tablist"
              aria-label="Ouvir o ponto de vista de cada personagem"
              className="mt-3 flex flex-wrap gap-2"
            >
              {(['mia', 'ayla', 'noah', 'leo'] as const).map((charId) => {
                const charObj = characters.find((c) => c.id === charId);
                const active = selectedPerspectiveChar === charId;
                return (
                  <button
                    key={charId}
                    role="tab"
                    aria-selected={active}
                    type="button"
                    onClick={() => setSelectedPerspectiveChar(charId)}
                    className={`border px-3.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                      active
                        ? 'border-[#1D2230] bg-[#1D2230] text-white'
                        : 'border-[#D8CFC0] bg-white text-[#1D2230] hover:bg-[#F4EFE6]'
                    }`}
                  >
                    {charObj?.name || charId}
                  </button>
                );
              })}
            </div>

            {perspectives[selectedPerspectiveChar] && (
              <blockquote className="mt-3 border border-[#E5DED0] bg-white p-4 font-serif text-base leading-relaxed text-[#252B3B] italic">
                {perspectives[selectedPerspectiveChar]}
              </blockquote>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 border-t border-[#E5DED0] pt-5">
          {episode.id === 'ep-01' && (
            <button
              type="button"
              onClick={() => setBranchMapOpen(true)}
              className="inline-flex items-center gap-2 bg-[#244B8A] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1B3A6E] whitespace-nowrap shrink-0"
            >
              <GitBranch className="h-4 w-4" />
              Ver Mapa das 6 Consequências
            </button>
          )}
          <button
            type="button"
            onClick={onOpenJournal}
            className="border border-[#1D2230] bg-white px-4 py-2.5 text-sm font-medium text-[#1D2230] transition-colors hover:bg-[#1D2230] hover:text-white whitespace-nowrap shrink-0"
          >
            Registrar no Diário de Escolhas
          </button>
          <button
            type="button"
            onClick={() => {
              onNavigatePage(episode.id, 'ep01-p4');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium text-[#586174] transition-colors hover:text-[#1D2230] whitespace-nowrap shrink-0"
          >
            <RotateCcw className="h-4 w-4" />
            Voltar à 1ª Decisão
          </button>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        isImmersive
          ? 'bg-[#181B24] text-[#FBF8F3]'
          : 'bg-[#FBF8F3] text-[#1D2230]'
      }`}
    >
      {/* Slim Reader Control Bar (respecting < 15% mobile sticky cap) */}
      <div
        className={`sticky top-0 z-30 border-b backdrop-blur-md ${
          isImmersive
            ? 'border-white/12 bg-[#181B24]/92 text-[#FBF8F3]'
            : 'border-[#E5DED0] bg-[#FBF8F3]/95 text-[#1D2230]'
        }`}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
          <div className="flex min-w-0 items-center gap-2.5">
            <button
              type="button"
              onClick={onExitReader}
              className={`inline-flex items-center gap-1 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                isImmersive
                  ? 'text-white/80 hover:text-white'
                  : 'text-[#586174] hover:text-[#1D2230]'
              }`}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Sair</span>
            </button>
            <span aria-hidden="true" className="opacity-30">
              ·
            </span>
            <p className="truncate font-serif text-sm sm:text-base font-semibold">
              {episode.id === 'ep-01' ? 'Piloto 01' : `Ep. ${String(episode.number).padStart(2, '0')}`} — {episode.title}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Interactive Socioemotional Lens Toggle */}
            <button
              type="button"
              onClick={onToggleSocioemotionalLens}
              title="Alternar notas de aprendizagem socioemocional"
              className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                showLens
                  ? 'border-[#244B8A] bg-[#244B8A] text-white'
                  : isImmersive
                  ? 'border-white/25 text-white/80 hover:bg-white/10'
                  : 'border-[#D4CBB9] text-[#586174] hover:text-[#1D2230]'
              }`}
            >
              {showLens ? (
                <Eye className="h-3.5 w-3.5" />
              ) : (
                <EyeOff className="h-3.5 w-3.5" />
              )}
              <span className="hidden lg:inline">Lente Socioemocional</span>
              <span className="lg:hidden">Lente</span>
            </button>

            {/* Interactive Branch Tree Map Button for Pilot 01 */}
            {episode.id === 'ep-01' && (
              <button
                type="button"
                onClick={() => setBranchMapOpen(true)}
                className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  isImmersive
                    ? 'border-white/25 text-white hover:bg-white/10'
                    : 'border-[#D4CBB9] text-[#1D2230] hover:bg-[#F4EFE6]'
                }`}
              >
                <GitBranch className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Mapa de Caminhos</span>
              </button>
            )}

            {/* Segmented Mode Control: Páginas vs Webtoon */}
            <div
              role="group"
              aria-label="Modo de navegação do leitor"
              className={`hidden sm:flex items-center rounded-md p-0.5 text-xs ${
                isImmersive ? 'bg-white/10' : 'bg-[#EAE3D5]'
              }`}
            >
              <button
                type="button"
                onClick={() => onChangeReaderMode('paginas')}
                className={`inline-flex items-center gap-1 rounded-sm px-2.5 py-1 font-medium transition-colors whitespace-nowrap shrink-0 ${
                  readerMode === 'paginas'
                    ? isImmersive
                      ? 'bg-white text-[#181B24]'
                      : 'bg-white text-[#1D2230] shadow-2xs'
                    : isImmersive
                    ? 'text-white/75 hover:text-white'
                    : 'text-[#586174] hover:text-[#1D2230]'
                }`}
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>Páginas</span>
              </button>
              <button
                type="button"
                onClick={() => onChangeReaderMode('vertical')}
                className={`inline-flex items-center gap-1 rounded-sm px-2.5 py-1 font-medium transition-colors whitespace-nowrap shrink-0 ${
                  readerMode === 'vertical'
                    ? isImmersive
                      ? 'bg-white text-[#181B24]'
                      : 'bg-white text-[#1D2230] shadow-2xs'
                    : isImmersive
                    ? 'text-white/75 hover:text-white'
                    : 'text-[#586174] hover:text-[#1D2230]'
                }`}
              >
                <ScrollText className="h-3.5 w-3.5" />
                <span>Webtoon</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onToggleImmersive}
              title={isImmersive ? 'Sair do modo imersivo' : 'Ativar modo imersivo'}
              className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                isImmersive
                  ? 'border-white/25 text-white hover:bg-white/10'
                  : 'border-[#D4CBB9] text-[#1D2230] hover:bg-[#F4EFE6]'
              }`}
            >
              {isImmersive ? (
                <Minimize2 className="h-3.5 w-3.5" />
              ) : (
                <Maximize2 className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Thin Editorial Progress Bar */}
        <div
          className={`h-1 w-full ${
            isImmersive ? 'bg-white/10' : 'bg-[#EAE3D5]'
          }`}
        >
          <div
            className="h-full bg-[#244B8A] transition-all duration-200"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Main Comic Canvas */}
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
        {readerMode === 'paginas' && currentPage ? (
          <article key={currentPage.id} className="space-y-6">
            {/* Page Header */}
            <header className="flex flex-wrap items-baseline justify-between gap-2 border-b border-current/12 pb-3">
              <div>
                <p
                  className={`font-mono text-xs tabular-nums ${
                    isImmersive ? 'text-white/65' : 'text-[#586174]'
                  }`}
                >
                  {currentPage.pageNumberLabel}
                  {currentPage.branchTag ? ` · ${currentPage.branchTag}` : ''}
                </p>
                <h1 className="mt-0.5 font-serif text-2xl font-semibold">
                  {currentPage.title}
                </h1>
              </div>

              {/* Quick Page Jump / Reread Breadcrumbs */}
              <div className="flex items-center gap-1.5">
                {activeStorySequence.map((seqPage, idx) => {
                  const active = seqPage.id === currentPage.id;
                  return (
                    <button
                      key={seqPage.id}
                      type="button"
                      onClick={() => {
                        onNavigatePage(episode.id, seqPage.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      aria-label={`Ir para ${seqPage.pageNumberLabel}`}
                      className={`h-7 min-w-7 px-1.5 font-mono text-xs tabular-nums transition-colors ${
                        active
                          ? 'bg-[#244B8A] font-semibold text-white'
                          : isImmersive
                          ? 'bg-white/10 text-white/75 hover:bg-white/20'
                          : 'bg-[#EAE3D5] text-[#454D5E] hover:bg-[#DCD3C1]'
                      }`}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </button>
                  );
                })}
              </div>
            </header>

            {/* Sequential Panels */}
            <div className="space-y-6 text-[#1D2230]">
              {currentPage.panels.map((panel, pIdx) => (
                <ComicPanelIllustration
                  key={panel.id}
                  panel={panel}
                  panelIndex={pIdx}
                />
              ))}
            </div>

            {/* Socioemotional Learning Note (when Lens is active) */}
            {renderLearningNote(currentPage)}

            {/* Interactive Decision Node (if present on this page) */}
            {renderDecisionBox(currentPage)}

            {/* Ending Summary & Multi-Perspective Synthesis */}
            {renderEndingCard(currentPage)}

            {/* Paginated Footer Controls */}
            <footer className="flex items-center justify-between gap-4 border-t border-current/12 pt-6">
              <button
                type="button"
                disabled={currentPageIndex === 0}
                onClick={() => {
                  const prev = activeStorySequence[currentPageIndex - 1];
                  if (prev) {
                    onNavigatePage(episode.id, prev.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className={`inline-flex items-center gap-2 border px-4 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-35 whitespace-nowrap shrink-0 ${
                  isImmersive
                    ? 'border-white/25 text-white hover:bg-white/10'
                    : 'border-[#1D2230] text-[#1D2230] hover:bg-[#F4EFE6]'
                }`}
              >
                <ChevronLeft className="h-4 w-4" />
                Página anterior
              </button>

              <span
                className={`font-mono text-xs tabular-nums ${
                  isImmersive ? 'text-white/65' : 'text-[#586174]'
                }`}
              >
                {currentPageIndex + 1} / {expectedRunLength}
              </span>

              {activeStorySequence[currentPageIndex + 1] ? (
                <button
                  type="button"
                  onClick={() => {
                    const next = activeStorySequence[currentPageIndex + 1];
                    if (next) {
                      onNavigatePage(episode.id, next.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className="inline-flex items-center gap-2 bg-[#244B8A] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1B3A6E] whitespace-nowrap shrink-0"
                >
                  Próxima página
                  <ChevronRight className="h-4 w-4" />
                </button>
              ) : currentPage.decision ? (
                <span
                  className={`text-xs italic ${
                    isImmersive ? 'text-white/70' : 'text-[#586174]'
                  }`}
                >
                  Faça uma escolha acima para abrir a próxima cena
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => onRestartEpisode(episode)}
                  className={`inline-flex items-center gap-1.5 border px-4 py-2.5 text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                    isImmersive
                      ? 'border-white/25 text-white hover:bg-white/10'
                      : 'border-[#1D2230] text-[#1D2230] hover:bg-[#F4EFE6]'
                  }`}
                >
                  <RotateCcw className="h-4 w-4" />
                  Reler do início
                </button>
              )}
            </footer>
          </article>
        ) : (
          /* VERTICAL WEBTOON CONTINUOUS SCROLL MODE */
          <div className="space-y-14">
            {activeStorySequence.map((page) => (
              <article key={page.id} className="space-y-6">
                <header className="border-b border-current/12 pb-2">
                  <p
                    className={`font-mono text-xs tabular-nums ${
                      isImmersive ? 'text-white/65' : 'text-[#586174]'
                    }`}
                  >
                    {page.pageNumberLabel}
                    {page.branchTag ? ` · ${page.branchTag}` : ''}
                  </p>
                  <h2 className="font-serif text-xl font-semibold">
                    {page.title}
                  </h2>
                </header>

                <div className="space-y-6 text-[#1D2230]">
                  {page.panels.map((panel, pIdx) => (
                    <ComicPanelIllustration
                      key={panel.id}
                      panel={panel}
                      panelIndex={pIdx}
                    />
                  ))}
                </div>

                {renderLearningNote(page)}
                {renderDecisionBox(page)}
                {renderEndingCard(page)}
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Interactive Pilot 01 Narrative & Soft Skills Map Modal */}
      {branchMapOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="pilot-map-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1D2230]/65 p-4 backdrop-blur-[2px]"
          onClick={() => setBranchMapOpen(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto border-2 border-[#1D2230] bg-[#FBF8F3] p-6 sm:p-8 text-[#1D2230] shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#E5DED0] pb-4">
              <div>
                <p className="text-xs font-semibold tracking-widest text-[#244B8A] uppercase">
                  Arquitetura Narrativa · MUNDIÊ Piloto 01
                </p>
                <h2
                  id="pilot-map-title"
                  className="mt-1 font-serif text-2xl font-semibold text-[#1D2230]"
                >
                  Mapa de Decisões, Soft Skills e Consequências
                </h2>
                <p className="mt-1 text-xs text-[#586174]">
                  Tronco inicial (Páginas 01 a 04) → 3 rotas de aproximação → 6 desfechos reais
                </p>
              </div>
              <button
                type="button"
                onClick={() => setBranchMapOpen(false)}
                aria-label="Fechar mapa de caminhos"
                className="p-1.5 text-[#586174] hover:bg-[#EAE3D5] hover:text-[#1D2230]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {PILOT_BRANCH_SUMMARY.map((branch) => {
                const visitedStage1 = progress?.visitedPageIds?.includes(
                  branch.stage1PageId
                );
                return (
                  <div
                    key={branch.stage1Key}
                    className="border border-[#D8CFC0] bg-white p-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="font-mono text-xs font-semibold text-[#244B8A]">
                          ROTA {branch.stage1Key}
                        </span>
                        <span aria-hidden="true"> · </span>
                        <span className="font-serif text-lg font-semibold text-[#1D2230]">
                          {branch.stage1Title}
                        </span>
                      </div>
                      <span className="text-xs text-[#6E56AF]">
                        {branch.skills}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {branch.endings.map((end) => {
                        const unlocked =
                          progress?.discoveredEndings?.includes(end.pageId);
                        return (
                          <div
                            key={end.code}
                            className={`border p-3.5 text-xs ${
                              unlocked
                                ? 'border-[#244B8A] bg-[#E8EFFB]'
                                : 'border-[#E5DED0] bg-[#FBF8F3]'
                            }`}
                          >
                            <div className="flex items-center justify-between font-mono">
                              <span className="font-semibold text-[#1D2230]">
                                Desfecho {end.code}
                              </span>
                              <span
                                className={
                                  unlocked
                                    ? 'font-semibold text-[#244B8A]'
                                    : 'text-[#586174]'
                                }
                              >
                                {unlocked ? 'Descoberto' : 'Por explorar'}
                              </span>
                            </div>
                            <p className="mt-1 font-medium text-[#343C4E]">
                              {end.title}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    {visitedStage1 && (
                      <div className="mt-3 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            setBranchMapOpen(false);
                            onNavigatePage(episode.id, branch.stage1PageId);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="text-xs font-semibold text-[#244B8A] hover:underline"
                        >
                          Revisitar 2ª decisão da Rota {branch.stage1Key} →
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#E5DED0] pt-5">
              <p className="text-xs text-[#586174]">
                Dica: volte à Página 04 para testar outra reação inicial de Mia.
              </p>
              <button
                type="button"
                onClick={() => {
                  setBranchMapOpen(false);
                  onNavigatePage(episode.id, 'ep01-p4');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-[#244B8A] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1B3A6E] whitespace-nowrap shrink-0"
              >
                Ir para a 1ª Decisão (Página 04)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
