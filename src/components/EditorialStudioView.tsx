import React, { useMemo, useState } from 'react';
import {
  Eye,
  ImagePlus,
  Layers,
  Plus,
  RotateCcw,
  Save,
  Trash2,
  Upload,
} from 'lucide-react';
import {
  BubblePosition,
  BubbleStyle,
  CharacterProfile,
  ChoiceOption,
  ComicPage,
  ComicPanel,
  Episode,
  PanelFraming,
  Season,
} from '../types/mundie';
import { GENERATED_ASSETS } from '../data/initialMundieData';

interface EditorialStudioViewProps {
  seasons: Season[];
  episodes: Episode[];
  characters: CharacterProfile[];
  initialSelectedEpisodeId?: string | null;
  onAddSeason: (season: Season) => void;
  onSaveEpisode: (episode: Episode) => void;
  onAddCharacter: (character: CharacterProfile) => void;
  onPreviewEpisode: (episodeId: string) => void;
  onResetEditorialCatalog: () => void;
}

type StudioSection =
  | 'episodios'
  | 'paginas'
  | 'escolhas'
  | 'personagens'
  | 'temporadas';

export const EditorialStudioView: React.FC<EditorialStudioViewProps> = ({
  seasons,
  episodes,
  characters,
  initialSelectedEpisodeId,
  onAddSeason,
  onSaveEpisode,
  onAddCharacter,
  onPreviewEpisode,
  onResetEditorialCatalog,
}) => {
  const [activeSection, setActiveSection] = useState<StudioSection>(
    initialSelectedEpisodeId ? 'paginas' : 'episodios'
  );
  const [selectedEpisodeId, setSelectedEpisodeId] = useState<string>(
    initialSelectedEpisodeId || episodes[0]?.id || 'ep-01'
  );
  const [selectedPageId, setSelectedPageId] = useState<string>('');
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  // New Season form state
  const [newSeasonTitle, setNewSeasonTitle] = useState('');
  const [newSeasonTagline, setNewSeasonTagline] = useState('');
  const [newSeasonAge, setNewSeasonAge] = useState('10 a 14 anos');
  const [newSeasonNote, setNewSeasonNote] = useState('');

  // New Episode form state
  const [newEpTitle, setNewEpTitle] = useState('');
  const [newEpTheme, setNewEpTheme] = useState('');
  const [newEpSynopsis, setNewEpSynopsis] = useState('');
  const [newEpMinutes, setNewEpMinutes] = useState(8);
  const [newEpSkills, setNewEpSkills] = useState('');
  const [newEpScript, setNewEpScript] = useState('');
  const [newEpChars, setNewEpChars] = useState<string[]>(['mia', 'noah']);

  // New Character form state
  const [newCharName, setNewCharName] = useState('');
  const [newCharAge, setNewCharAge] = useState(12);
  const [newCharRole, setNewCharRole] = useState('');
  const [newCharVisual, setNewCharVisual] = useState('');
  const [newCharTraits, setNewCharTraits] = useState('');
  const [newCharConflict, setNewCharConflict] = useState('');
  const [newCharQuote, setNewCharQuote] = useState('');
  const [newCharPortrait, setNewCharPortrait] = useState<string>(
    GENERATED_ASSETS.miaPortrait
  );

  // New Bubble draft state
  const [bubbleSpeaker, setBubbleSpeaker] = useState('Mia');
  const [bubbleText, setBubbleText] = useState('');
  const [bubbleStyle, setBubbleStyle] = useState<BubbleStyle>('fala');
  const [bubblePos, setBubblePos] = useState<BubblePosition>('top-left');

  const currentEpisode = useMemo(
    () => episodes.find((e) => e.id === selectedEpisodeId) || episodes[0],
    [episodes, selectedEpisodeId]
  );

  const currentPage = useMemo(() => {
    if (!currentEpisode || currentEpisode.pages.length === 0) return null;
    return (
      currentEpisode.pages.find((p) => p.id === selectedPageId) ||
      currentEpisode.pages[0]
    );
  }, [currentEpisode, selectedPageId]);

  const showToast = (msg: string) => {
    setFeedbackToast(msg);
    window.setTimeout(() => {
      setFeedbackToast((prev) => (prev === msg ? null : prev));
    }, 2600);
  };

  // Helper to read local image upload as Data URL
  const readImageFile = (
    file: File,
    onLoaded: (dataUrl: string) => void
  ) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onLoaded(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // --- Handlers ---
  const handleCreateSeason = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSeasonTitle.trim()) return;
    const season: Season = {
      id: `season-${Date.now()}`,
      number: seasons.length + 1,
      title: newSeasonTitle.trim().toUpperCase(),
      tagline: newSeasonTagline.trim() || 'Novas descobertas em quadrinhos.',
      ageRange: newSeasonAge.trim() || '10 a 14 anos',
      editorialNote:
        newSeasonNote.trim() ||
        'Temporada cadastrada pela equipe editorial MUNDIÊ.',
      heroImageUrl: GENERATED_ASSETS.heroEntreNos,
    };
    onAddSeason(season);
    setNewSeasonTitle('');
    setNewSeasonTagline('');
    setNewSeasonNote('');
    showToast(`Temporada "${season.title}" criada.`);
  };

  const handleCreateEpisode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEpTitle.trim()) return;
    const epNumber = episodes.length + 1;
    const newEp: Episode = {
      id: `ep-custom-${Date.now()}`,
      seasonId: seasons[0]?.id || 'season-entre-nos',
      number: epNumber,
      title: newEpTitle.trim(),
      theme: newEpTheme.trim() || 'Convivência e descobertas',
      synopsis:
        newEpSynopsis.trim() || 'Sinopse em elaboração pela equipe MUNDIÊ.',
      characters: newEpChars.length > 0 ? newEpChars : ['mia'],
      estimatedMinutes: Number(newEpMinutes) || 8,
      skills: newEpSkills
        ? newEpSkills
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
        : ['Empatia', 'Escuta ativa'],
      status: 'em_producao',
      coverVariant: 'ep01',
      scriptExcerpt:
        newEpScript.trim() || 'Roteiro em desenvolvimento no Estúdio MUNDIÊ.',
      pages: [],
    };
    onSaveEpisode(newEp);
    setSelectedEpisodeId(newEp.id);
    setNewEpTitle('');
    setNewEpTheme('');
    setNewEpSynopsis('');
    setNewEpSkills('');
    setNewEpScript('');
    showToast(`Episódio "${newEp.title}" adicionado à biblioteca.`);
  };

  const handleAddPageToEpisode = () => {
    if (!currentEpisode) return;
    const nextIdx = currentEpisode.pages.length + 1;
    const newPageId = `${currentEpisode.id}-p${nextIdx}-${Date.now().toString().slice(-4)}`;
    const newPage: ComicPage = {
      id: newPageId,
      pageNumberLabel: `Página ${String(nextIdx).padStart(2, '0')}`,
      title: `Nova Cena ${nextIdx}`,
      nextPageId: null,
      panels: [
        {
          id: `panel-${Date.now()}`,
          order: 1,
          title: 'Quadro 01',
          framing: 'wide',
          visualPreset: 'custom-illustration',
          atmosphereTint: 'warm',
          sceneCaption: 'Narração inicial da cena.',
          altText: 'Ilustração da cena em preparo ou importada pela equipe editorial.',
          bubbles: [
            {
              id: `b-${Date.now()}`,
              speaker: 'Mia',
              text: 'Texto de diálogo demonstrativo da cena.',
              style: 'fala',
              position: 'top-left',
            },
          ],
          aiPromptSpec: {
            scenePrompt: '',
            cameraAngle: 'Plano médio',
            lightingMood: 'Luz natural suave',
            characterRefs: currentEpisode.characters,
            integrationStatus: 'pending_model_connection',
          },
        },
      ],
    };

    // Link previous last non-ending page if sequential
    const updatedPages = currentEpisode.pages.map((p, idx) =>
      idx === currentEpisode.pages.length - 1 && !p.decision && !p.isEnding
        ? { ...p, nextPageId: newPageId }
        : p
    );

    const updatedEpisode: Episode = {
      ...currentEpisode,
      status: 'disponivel',
      startPageId: currentEpisode.startPageId || newPageId,
      pages: [...updatedPages, newPage],
    };
    onSaveEpisode(updatedEpisode);
    setSelectedPageId(newPageId);
    showToast(`${newPage.pageNumberLabel} adicionada a "${currentEpisode.title}".`);
  };

  const handleAddPanelToCurrentPage = () => {
    if (!currentEpisode || !currentPage) return;
    const newPanel: ComicPanel = {
      id: `panel-${Date.now()}`,
      order: currentPage.panels.length + 1,
      title: `Quadro ${String(currentPage.panels.length + 1).padStart(2, '0')}`,
      framing: 'medium',
      visualPreset: 'custom-illustration',
      atmosphereTint: 'neutral',
      altText: 'Quadro aguardando importação de arte 2D.',
      bubbles: [],
      aiPromptSpec: {
        scenePrompt: '',
        cameraAngle: 'Plano americano',
        lightingMood: 'Entardecer acolhedor',
        characterRefs: currentEpisode.characters,
        integrationStatus: 'pending_model_connection',
      },
    };

    const updatedEpisode: Episode = {
      ...currentEpisode,
      pages: currentEpisode.pages.map((p) =>
        p.id === currentPage.id
          ? { ...p, panels: [...p.panels, newPanel] }
          : p
      ),
    };
    onSaveEpisode(updatedEpisode);
    showToast('Novo quadro adicionado à página.');
  };

  const handlePanelUploadIllustration = (panelId: string, file: File) => {
    if (!currentEpisode || !currentPage) return;
    readImageFile(file, (dataUrl) => {
      const updatedEpisode: Episode = {
        ...currentEpisode,
        pages: currentEpisode.pages.map((p) =>
          p.id === currentPage.id
            ? {
                ...p,
                panels: p.panels.map((pan) =>
                  pan.id === panelId
                    ? {
                        ...pan,
                        imageUrl: dataUrl,
                        visualPreset: 'custom-illustration',
                        aiPromptSpec: {
                          scenePrompt: pan.aiPromptSpec?.scenePrompt || '',
                          cameraAngle: pan.aiPromptSpec?.cameraAngle || 'Plano médio',
                          lightingMood: pan.aiPromptSpec?.lightingMood || 'Original importado',
                          characterRefs: currentEpisode.characters,
                          integrationStatus: 'custom_uploaded',
                        },
                      }
                    : pan
                ),
              }
            : p
        ),
      };
      onSaveEpisode(updatedEpisode);
      showToast('Ilustração importada para o quadro.');
    });
  };

  const handleUpdatePanelField = (
    panelId: string,
    patch: Partial<ComicPanel>
  ) => {
    if (!currentEpisode || !currentPage) return;
    const updatedEpisode: Episode = {
      ...currentEpisode,
      pages: currentEpisode.pages.map((p) =>
        p.id === currentPage.id
          ? {
              ...p,
              panels: p.panels.map((pan) =>
                pan.id === panelId ? { ...pan, ...patch } : pan
              ),
            }
          : p
      ),
    };
    onSaveEpisode(updatedEpisode);
  };

  const handleAddBubbleToPanel = (panelId: string) => {
    if (!currentEpisode || !currentPage || !bubbleText.trim()) return;
    const updatedEpisode: Episode = {
      ...currentEpisode,
      pages: currentEpisode.pages.map((p) =>
        p.id === currentPage.id
          ? {
              ...p,
              panels: p.panels.map((pan) =>
                pan.id === panelId
                  ? {
                      ...pan,
                      bubbles: [
                        ...pan.bubbles,
                        {
                          id: `b-${Date.now()}`,
                          speaker:
                            bubbleStyle === 'narracao'
                              ? undefined
                              : bubbleSpeaker.trim(),
                          text: bubbleText.trim(),
                          style: bubbleStyle,
                          position: bubblePos,
                        },
                      ],
                    }
                  : pan
              ),
            }
          : p
      ),
    };
    onSaveEpisode(updatedEpisode);
    setBubbleText('');
    showToast('Balão adicionado ao quadro.');
  };

  const handleRemoveBubble = (panelId: string, bubbleId: string) => {
    if (!currentEpisode || !currentPage) return;
    const updatedEpisode: Episode = {
      ...currentEpisode,
      pages: currentEpisode.pages.map((p) =>
        p.id === currentPage.id
          ? {
              ...p,
              panels: p.panels.map((pan) =>
                pan.id === panelId
                  ? {
                      ...pan,
                      bubbles: pan.bubbles.filter((b) => b.id !== bubbleId),
                    }
                  : pan
              ),
            }
          : p
      ),
    };
    onSaveEpisode(updatedEpisode);
  };

  const handleAttachOrUpdateDecision = (page: ComicPage) => {
    if (!currentEpisode) return;
    if (page.decision) {
      showToast('Esta página já possui um bloco de decisão editável abaixo.');
      return;
    }
    const fallbackTarget =
      currentEpisode.pages.find((p) => p.id !== page.id)?.id || page.id;

    const defaultOptions: ChoiceOption[] = [
      {
        id: `opt-${Date.now()}-a`,
        keyLabel: 'A',
        label: 'Conversar abertamente sobre o que aconteceu.',
        subtleContext: 'Prioriza sinceridade imediata.',
        nextPageId: fallbackTarget,
        consequenceSummary: 'A conversa direta trouxe clareza imediata para a cena.',
        mobilizedSkills: ['Comunicação assertiva', 'Coragem emocional'],
        reflectionQuestion: 'Como falar o que sentimos muda a escuta do outro?',
        relationshipNotes: {},
      },
      {
        id: `opt-${Date.now()}-b`,
        keyLabel: 'B',
        label: 'Observar mais um pouco antes de tomar atitude.',
        subtleContext: 'Ganha tempo para entender o contexto.',
        nextPageId: fallbackTarget,
        consequenceSummary: 'Esperar permitiu notar detalhes que não estavam claros.',
        mobilizedSkills: ['Autopercepção', 'Escuta atenta'],
        reflectionQuestion: 'Quando esperar ajuda e quando aumenta a ansiedade?',
        relationshipNotes: {},
      },
    ];

    const updatedEpisode: Episode = {
      ...currentEpisode,
      pages: currentEpisode.pages.map((p) =>
        p.id === page.id
          ? {
              ...p,
              decision: {
                id: `dec-${Date.now()}`,
                promptTitle: 'Qual caminho seguir agora?',
                promptSubtitle:
                  'Cada escolha leva a página seguinte por uma perspectiva diferente.',
                options: defaultOptions,
              },
            }
          : p
      ),
    };
    onSaveEpisode(updatedEpisode);
    showToast(' Ponto de decisão adicionado à página.');
  };

  const handleUpdateDecisionOption = (
    pageId: string,
    optionId: string,
    patch: Partial<ChoiceOption>
  ) => {
    if (!currentEpisode) return;
    const updatedEpisode: Episode = {
      ...currentEpisode,
      pages: currentEpisode.pages.map((p) =>
        p.id === pageId && p.decision
          ? {
              ...p,
              decision: {
                ...p.decision,
                options: p.decision.options.map((o) =>
                  o.id === optionId ? { ...o, ...patch } : o
                ),
              },
            }
          : p
      ),
    };
    onSaveEpisode(updatedEpisode);
  };

  const handleCreateCharacter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCharName.trim()) return;
    const char: CharacterProfile = {
      id: newCharName.trim().toLowerCase().replace(/\s+/g, '-') + '-' + Date.now().toString().slice(-3),
      name: newCharName.trim(),
      age: Number(newCharAge) || 12,
      shortRole: newCharRole.trim() || 'Estudante da Escola Castro Alves',
      visualSignature:
        newCharVisual.trim() || 'Traços 2D contemporâneos definidos pela equipe de arte.',
      personalityTraits: newCharTraits
        ? newCharTraits
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean)
        : ['Curioso', 'Observador'],
      internalConflict:
        newCharConflict.trim() || 'Em busca de seu espaço na turma.',
      biography:
        newCharConflict.trim() ||
        'Personagem cadastrado pela equipe editorial MUNDIÊ.',
      signatureQuote:
        newCharQuote.trim() || '“Todo mundo tem um jeito próprio de ver as coisas.”',
      portraitUrl: newCharPortrait,
      accentHex: '#244B8A',
      softBgHex: '#E5ECF8',
      appearancesCount: 1,
    };
    onAddCharacter(char);
    setNewCharName('');
    setNewCharRole('');
    setNewCharVisual('');
    setNewCharTraits('');
    setNewCharConflict('');
    setNewCharQuote('');
    showToast(`Personagem "${char.name}" adicionado ao universo MUNDIÊ.`);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 pb-24">
      {/* Studio Header */}
      <header className="border-b border-[#E5DED0] pb-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-[#244B8A] uppercase">
              Ambiente Administrativo · Equipe Criativa MUNDIÊ
            </p>
            <h1 className="mt-2 font-serif text-4xl font-semibold text-[#1D2230]">
              Estúdio Editorial & Narrativo
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#586174]">
              Estruture temporadas, roteiros, páginas de HQ, upload de ilustrações 2D
              reais e árvores de decisões interativas. Qualquer episódio com páginas
              pode ser testado imediatamente no Leitor.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {currentEpisode && currentEpisode.pages.length > 0 && (
              <button
                type="button"
                onClick={() => onPreviewEpisode(currentEpisode.id)}
                className="inline-flex items-center gap-2 bg-[#244B8A] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#1B3A6E] whitespace-nowrap shrink-0"
              >
                <Eye className="h-4 w-4" />
                Pré-visualizar “{currentEpisode.title}” no Leitor
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                onResetEditorialCatalog();
                showToast('Catálogo restaurado para a configuração original.');
              }}
              className="inline-flex items-center gap-1.5 border border-[#D8CFC0] bg-white px-3.5 py-2.5 text-xs font-medium text-[#586174] hover:border-[#1D2230] hover:text-[#1D2230] whitespace-nowrap shrink-0"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Restaurar demonstração padrão
            </button>
          </div>
        </div>

        {feedbackToast && (
          <div
            role="status"
            className="mt-4 border border-[#244B8A] bg-[#E8EFFB] px-4 py-2.5 text-xs font-medium text-[#1D2230]"
          >
            {feedbackToast}
          </div>
        )}

        {/* Studio Navigation Tabs */}
        <div className="mt-8 flex flex-wrap items-center gap-1 rounded-md bg-[#EAE3D5] p-1">
          {(
            [
              { id: 'episodios', label: '1. Episódios & Roteiros' },
              { id: 'paginas', label: '2. Quadros, Páginas & Arte' },
              { id: 'escolhas', label: '3. Escolhas & Ramificações' },
              { id: 'personagens', label: '4. Personagens' },
              { id: 'temporadas', label: '5. Temporadas' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSection(tab.id)}
              className={`rounded-sm px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                activeSection === tab.id
                  ? 'bg-white text-[#1D2230] shadow-2xs'
                  : 'text-[#586174] hover:text-[#1D2230]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* SECTION 1: EPISODES & SCRIPTS */}
      {activeSection === 'episodios' && (
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-serif text-2xl font-semibold text-[#1D2230]">
              Episódios Cadastrados ({episodes.length})
            </h2>
            <div className="divide-y divide-[#E5DED0] border border-[#E5DED0] bg-white">
              {episodes.map((ep) => (
                <div
                  key={ep.id}
                  className="flex flex-wrap items-center justify-between gap-4 p-4 sm:px-5"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-xs text-[#586174]">
                      <span className="font-mono font-semibold text-[#1D2230] tabular-nums">
                        Ep. {String(ep.number).padStart(2, '0')}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{ep.theme}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">
                        {ep.pages.length} pág.
                      </span>
                    </div>
                    <p className="mt-0.5 font-serif text-lg font-semibold text-[#1D2230]">
                      {ep.title}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedEpisodeId(ep.id);
                        setActiveSection('paginas');
                      }}
                      className="border border-[#1D2230] px-3 py-1.5 text-xs font-medium text-[#1D2230] hover:bg-[#F4EFE6] whitespace-nowrap shrink-0"
                    >
                      Editar páginas
                    </button>
                    {ep.pages.length > 0 && (
                      <button
                        type="button"
                        onClick={() => onPreviewEpisode(ep.id)}
                        className="bg-[#244B8A] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#1B3A6E] whitespace-nowrap shrink-0"
                      >
                        Testar HQ
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleCreateEpisode}
            className="lg:col-span-5 space-y-4 border border-[#D8CFC0] bg-[#F4EFE6] p-6"
          >
            <h2 className="font-serif text-2xl font-semibold text-[#1D2230]">
              Cadastrar Novo Episódio
            </h2>

            <div>
              <label className="block text-xs font-semibold text-[#1D2230]">
                Título do episódio
              </label>
              <input
                type="text"
                required
                value={newEpTitle}
                onChange={(e) => setNewEpTitle(e.target.value)}
                placeholder="Ex.: O Lugar Vazio na Mesa"
                className="mt-1 w-full border border-[#D8CFC0] bg-white px-3 py-2 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#1D2230]">
                  Tema central
                </label>
                <input
                  type="text"
                  value={newEpTheme}
                  onChange={(e) => setNewEpTheme(e.target.value)}
                  placeholder="Ex.: Escuta e acolhimento"
                  className="mt-1 w-full border border-[#D8CFC0] bg-white px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1D2230]">
                  Duração (minutos)
                </label>
                <input
                  type="number"
                  min={3}
                  max={30}
                  value={newEpMinutes}
                  onChange={(e) => setNewEpMinutes(Number(e.target.value))}
                  className="mt-1 w-full border border-[#D8CFC0] bg-white px-3 py-2 text-sm font-mono tabular-nums"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1D2230]">
                Sinopse
              </label>
              <textarea
                rows={3}
                value={newEpSynopsis}
                onChange={(e) => setNewEpSynopsis(e.target.value)}
                placeholder="Descreva o conflito cotidiano vivido pelos personagens..."
                className="mt-1 w-full border border-[#D8CFC0] bg-white px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1D2230]">
                Roteiro base / escaleta
              </label>
              <textarea
                rows={3}
                value={newEpScript}
                onChange={(e) => setNewEpScript(e.target.value)}
                placeholder="CENA 01 — PÁTIO INTERNO. Descrição de ação e diálogos iniciais..."
                className="mt-1 w-full border border-[#D8CFC0] bg-white px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1D2230]">
                Habilidades socioemocionais (separadas por vírgula)
              </label>
              <input
                type="text"
                value={newEpSkills}
                onChange={(e) => setNewEpSkills(e.target.value)}
                placeholder="Empatia, Comunicação não violenta, Autonomia"
                className="mt-1 w-full border border-[#D8CFC0] bg-white px-3 py-2 text-sm"
              />
            </div>

            <div>
              <span className="block text-xs font-semibold text-[#1D2230]">
                Personagens participantes
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {characters.map((c) => {
                  const checked = newEpChars.includes(c.id);
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() =>
                        setNewEpChars((prev) =>
                          prev.includes(c.id)
                            ? prev.filter((id) => id !== c.id)
                            : [...prev, c.id]
                        )
                      }
                      className={`border px-2.5 py-1 text-xs font-medium ${
                        checked
                          ? 'border-[#244B8A] bg-[#244B8A] text-white'
                          : 'border-[#D8CFC0] bg-white text-[#586174]'
                      }`}
                    >
                      {c.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 bg-[#1D2230] px-5 py-3 text-xs font-semibold text-white hover:bg-[#2E364B]"
            >
              <Save className="h-4 w-4" />
              Salvar episódio no catálogo
            </button>
          </form>
        </div>
      )}

      {/* SECTION 2: PAGES, PANELS & ILLUSTRATION IMPORT */}
      {activeSection === 'paginas' && currentEpisode && (
        <div className="mt-10 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border border-[#E5DED0] bg-white p-5">
            <div className="flex flex-wrap items-center gap-3">
              <label
                htmlFor="studio-ep-select"
                className="text-xs font-semibold text-[#586174] uppercase"
              >
                Episódio em edição:
              </label>
              <select
                id="studio-ep-select"
                value={currentEpisode.id}
                onChange={(e) => {
                  setSelectedEpisodeId(e.target.value);
                  setSelectedPageId('');
                }}
                className="border border-[#1D2230] bg-[#FBF8F3] px-3 py-2 text-sm font-medium text-[#1D2230]"
              >
                {episodes.map((ep) => (
                  <option key={ep.id} value={ep.id}>
                    Ep. {String(ep.number).padStart(2, '0')} — {ep.title} ({ep.pages.length} págs.)
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Upload Custom Episode Cover */}
              <label className="inline-flex cursor-pointer items-center gap-1.5 border border-[#1D2230] bg-white px-3.5 py-2 text-xs font-medium text-[#1D2230] hover:bg-[#F4EFE6] whitespace-nowrap shrink-0">
                <Upload className="h-3.5 w-3.5" />
                Importar capa da HQ
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      readImageFile(file, (url) => {
                        onSaveEpisode({ ...currentEpisode, customCoverUrl: url });
                        showToast('Capa personalizada importada com sucesso.');
                      });
                    }
                  }}
                />
              </label>

              <button
                type="button"
                onClick={handleAddPageToEpisode}
                className="inline-flex items-center gap-1.5 bg-[#244B8A] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1B3A6E] whitespace-nowrap shrink-0"
              >
                <Plus className="h-3.5 w-3.5" />
                Nova Página de HQ
              </button>
            </div>
          </div>

          {currentEpisode.pages.length === 0 ? (
            <div className="border border-[#D8CFC0] bg-[#F4EFE6] p-10 text-center">
              <Layers className="mx-auto h-8 w-8 text-[#586174]" />
              <h3 className="mt-3 font-serif text-xl font-semibold text-[#1D2230]">
                Este episódio ainda está apenas em roteiro
              </h3>
              <p className="mx-auto mt-1.5 max-w-md text-sm text-[#586174]">
                Clique em “Nova Página de HQ” para começar a montar os quadros, importar ilustrações 2D e torná-lo jogável no leitor.
              </p>
              <button
                type="button"
                onClick={handleAddPageToEpisode}
                className="mt-5 inline-flex items-center gap-2 bg-[#244B8A] px-5 py-2.5 text-xs font-semibold text-white"
              >
                <Plus className="h-4 w-4" />
                Criar Página 01 agora
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              {/* Page List Sidebar */}
              <div className="lg:col-span-3 space-y-2">
                <p className="text-xs font-semibold tracking-wider text-[#586174] uppercase">
                  Páginas do episódio
                </p>
                {currentEpisode.pages.map((p) => {
                  const active = p.id === currentPage?.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedPageId(p.id)}
                      className={`block w-full border p-3 text-left transition-colors ${
                        active
                          ? 'border-[#244B8A] bg-[#E8EFFB]'
                          : 'border-[#E5DED0] bg-white hover:bg-[#F4EFE6]'
                      }`}
                    >
                      <p className="font-mono text-[11px] text-[#586174] tabular-nums">
                        {p.pageNumberLabel}
                      </p>
                      <p className="font-serif text-sm font-semibold text-[#1D2230]">
                        {p.title}
                      </p>
                      <p className="mt-1 text-[11px] text-[#586174]">
                        {p.panels.length} quadro(s)
                        {p.decision ? ' · Com decisão' : ''}
                        {p.isEnding ? ' · Desfecho' : ''}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Active Page & Panels Editor */}
              {currentPage && (
                <div className="lg:col-span-9 space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 border border-[#E5DED0] bg-white p-5">
                    <div className="flex-1 min-w-[220px]">
                      <label className="block text-[11px] font-semibold text-[#586174] uppercase">
                        Título da {currentPage.pageNumberLabel}
                      </label>
                      <input
                        type="text"
                        value={currentPage.title}
                        onChange={(e) => {
                          const updated: Episode = {
                            ...currentEpisode,
                            pages: currentEpisode.pages.map((pg) =>
                              pg.id === currentPage.id
                                ? { ...pg, title: e.target.value }
                                : pg
                            ),
                          };
                          onSaveEpisode(updated);
                        }}
                        className="mt-1 w-full border border-[#D8CFC0] px-3 py-1.5 font-serif text-lg font-semibold text-[#1D2230]"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleAddPanelToCurrentPage}
                      className="inline-flex items-center gap-1.5 border border-[#1D2230] px-4 py-2 text-xs font-semibold text-[#1D2230] hover:bg-[#F4EFE6] whitespace-nowrap shrink-0"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Adicionar Quadro
                    </button>
                  </div>

                  {/* Panels List */}
                  {currentPage.panels.map((panel, idx) => (
                    <div
                      key={panel.id}
                      className="border border-[#D8CFC0] bg-white p-6 space-y-5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EFE9DC] pb-3">
                        <span className="font-mono text-xs font-semibold text-[#244B8A] uppercase tabular-nums">
                          Quadro {String(idx + 1).padStart(2, '0')} · {panel.title}
                        </span>

                        <div className="flex flex-wrap items-center gap-2">
                          <select
                            aria-label="Enquadramento do quadro"
                            value={panel.framing}
                            onChange={(e) =>
                              handleUpdatePanelField(panel.id, {
                                framing: e.target.value as PanelFraming,
                              })
                            }
                            className="border border-[#D8CFC0] bg-[#FBF8F3] px-2.5 py-1 text-xs"
                          >
                            <option value="wide">Plano Geral (Largo)</option>
                            <option value="medium">Plano Médio</option>
                            <option value="closeup">Close-up Emocional</option>
                            <option value="split">Quadro Duplo (Díptico)</option>
                          </select>

                          <label className="inline-flex cursor-pointer items-center gap-1.5 bg-[#1D2230] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#2F374C] whitespace-nowrap shrink-0">
                            <ImagePlus className="h-3.5 w-3.5" />
                            Importar Ilustração Real
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) handlePanelUploadIllustration(panel.id, f);
                              }}
                            />
                          </label>
                        </div>
                      </div>

                      {/* Caption & Alt Text */}
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs font-semibold text-[#1D2230]">
                            Legenda narrativa superior (opcional)
                          </label>
                          <input
                            type="text"
                            value={panel.sceneCaption || ''}
                            onChange={(e) =>
                              handleUpdatePanelField(panel.id, {
                                sceneCaption: e.target.value,
                              })
                            }
                            placeholder="Ex.: Quinta-feira, 10h15 no pátio..."
                            className="mt-1 w-full border border-[#D8CFC0] px-3 py-1.5 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#1D2230]">
                            Descrição acessível da arte (alt text)
                          </label>
                          <input
                            type="text"
                            value={panel.altText}
                            onChange={(e) =>
                              handleUpdatePanelField(panel.id, {
                                altText: e.target.value,
                              })
                            }
                            className="mt-1 w-full border border-[#D8CFC0] px-3 py-1.5 text-xs"
                          />
                        </div>
                      </div>

                      {/* Bubbles Editor */}
                      <div className="border-t border-[#EFE9DC] pt-4">
                        <p className="text-xs font-semibold text-[#1D2230]">
                          Balões de fala e pensamento ({panel.bubbles.length})
                        </p>
                        <div className="mt-2 space-y-2">
                          {panel.bubbles.map((b) => (
                            <div
                              key={b.id}
                              className="flex items-center justify-between gap-3 border border-[#E5DED0] bg-[#FBF8F3] px-3 py-2 text-xs"
                            >
                              <div>
                                <span className="font-semibold text-[#244B8A]">
                                  {b.speaker || 'Narração'} ({b.style}):{' '}
                                </span>
                                <span>{b.text}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveBubble(panel.id, b.id)}
                                aria-label="Remover balão"
                                className="text-[#586174] hover:text-[#DD6452]"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>

                        {/* Add Bubble Inline Controls */}
                        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-12">
                          <input
                            type="text"
                            value={bubbleSpeaker}
                            onChange={(e) => setBubbleSpeaker(e.target.value)}
                            placeholder="Personagem"
                            className="sm:col-span-2 border border-[#D8CFC0] px-2.5 py-1.5 text-xs"
                          />
                          <select
                            value={bubbleStyle}
                            onChange={(e) =>
                              setBubbleStyle(e.target.value as BubbleStyle)
                            }
                            className="sm:col-span-2 border border-[#D8CFC0] px-2 py-1.5 text-xs"
                          >
                            <option value="fala">Fala</option>
                            <option value="pensamento">Pensamento</option>
                            <option value="sussurro">Sussurro</option>
                            <option value="narracao">Narração</option>
                          </select>
                          <select
                            value={bubblePos}
                            onChange={(e) =>
                              setBubblePos(e.target.value as BubblePosition)
                            }
                            className="sm:col-span-2 border border-[#D8CFC0] px-2 py-1.5 text-xs"
                          >
                            <option value="top-left">Topo Esq.</option>
                            <option value="top-right">Topo Dir.</option>
                            <option value="bottom-left">Base Esq.</option>
                            <option value="bottom-right">Base Dir.</option>
                          </select>
                          <input
                            type="text"
                            value={bubbleText}
                            onChange={(e) => setBubbleText(e.target.value)}
                            placeholder="Digite o diálogo do balão..."
                            className="sm:col-span-4 border border-[#D8CFC0] px-2.5 py-1.5 text-xs"
                          />
                          <button
                            type="button"
                            onClick={() => handleAddBubbleToPanel(panel.id)}
                            className="sm:col-span-2 bg-[#244B8A] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1B3A6E] whitespace-nowrap"
                          >
                            + Balão
                          </button>
                        </div>
                      </div>

                      {/* Future AI Model Integration Schema (Explicitly Flagged as Pending) */}
                      <div className="border border-dashed border-[#B8AE99] bg-[#F4EFE6] p-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="text-xs font-semibold text-[#1D2230]">
                            Metadados de Direção de Arte para Futura Integração IA
                          </p>
                          <span className="font-mono text-[11px] text-[#6E56AF]">
                            Recurso de geração automática pendente · Estrutura de dados ativa
                          </span>
                        </div>
                        <p className="mt-1 text-[11px] text-[#586174]">
                          Este protótipo não simula geração por IA em tempo real. Preencha o briefing estruturado abaixo para futura conexão com pipeline de ilustração ou importe arquivos reais acima.
                        </p>
                        <input
                          type="text"
                          value={panel.aiPromptSpec?.scenePrompt || ''}
                          onChange={(e) =>
                            handleUpdatePanelField(panel.id, {
                              aiPromptSpec: {
                                scenePrompt: e.target.value,
                                cameraAngle:
                                  panel.aiPromptSpec?.cameraAngle || 'Plano médio',
                                lightingMood:
                                  panel.aiPromptSpec?.lightingMood || 'Luz suave',
                                characterRefs: currentEpisode.characters,
                                integrationStatus: panel.imageUrl
                                  ? 'custom_uploaded'
                                  : 'pending_model_connection',
                              },
                            })
                          }
                          placeholder="Briefing visual estruturado da cena (cenário, expressão, paleta, iluminação)..."
                          className="mt-2.5 w-full border border-[#D8CFC0] bg-white px-3 py-1.5 text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* SECTION 3: INTERACTIVE CHOICES & BRANCHING */}
      {activeSection === 'escolhas' && currentEpisode && (
        <div className="mt-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border border-[#E5DED0] bg-white p-5">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-[#1D2230]">
                Árvore de Decisões — {currentEpisode.title}
              </h2>
              <p className="mt-1 text-xs text-[#586174]">
                Vincule escolhas A, B ou C a páginas de destino diferentes e registre as habilidades socioemocionais mobilizadas.
              </p>
            </div>
            {currentPage && !currentPage.decision && (
              <button
                type="button"
                onClick={() => handleAttachOrUpdateDecision(currentPage)}
                className="bg-[#DD6452] px-4 py-2 text-xs font-semibold text-white hover:bg-[#C65240] whitespace-nowrap shrink-0"
              >
                + Criar Decisão na {currentPage.pageNumberLabel}
              </button>
            )}
          </div>

          {currentEpisode.pages.filter((p) => Boolean(p.decision)).length === 0 ? (
            <div className="border border-[#D8CFC0] bg-[#F4EFE6] p-8 text-center text-sm text-[#586174]">
              Nenhuma decisão interativa configurada neste episódio ainda. Selecione uma página na aba anterior ou adicione páginas primeiro.
            </div>
          ) : (
            currentEpisode.pages
              .filter((p) => Boolean(p.decision))
              .map((page) => (
                <div
                  key={page.id}
                  className="border border-[#D8CFC0] bg-white p-6 space-y-5"
                >
                  <div className="border-b border-[#EFE9DC] pb-3">
                    <p className="font-mono text-xs text-[#DD6452] uppercase">
                      Ponto de Ramificação · {page.pageNumberLabel} ({page.title})
                    </p>
                    <p className="mt-1 font-serif text-xl font-semibold text-[#1D2230]">
                      {page.decision!.promptTitle}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {page.decision!.options.map((opt) => (
                      <div
                        key={opt.id}
                        className="border border-[#E5DED0] bg-[#FBF8F3] p-4 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="bg-[#244B8A] px-2 py-0.5 font-mono text-xs font-semibold text-white">
                            Opção {opt.keyLabel}
                          </span>
                          <span className="font-mono text-[11px] text-[#586174]">
                            → {opt.nextPageId}
                          </span>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-[#1D2230]">
                            Texto da escolha
                          </label>
                          <textarea
                            rows={2}
                            value={opt.label}
                            onChange={(e) =>
                              handleUpdateDecisionOption(page.id, opt.id, {
                                label: e.target.value,
                              })
                            }
                            className="mt-1 w-full border border-[#D8CFC0] bg-white px-2.5 py-1.5 text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-[#1D2230]">
                            Página de destino (Caminho)
                          </label>
                          <select
                            value={opt.nextPageId}
                            onChange={(e) =>
                              handleUpdateDecisionOption(page.id, opt.id, {
                                nextPageId: e.target.value,
                              })
                            }
                            className="mt-1 w-full border border-[#D8CFC0] bg-white px-2.5 py-1.5 text-xs"
                          >
                            {currentEpisode.pages.map((dest) => (
                              <option key={dest.id} value={dest.id}>
                                {dest.pageNumberLabel} — {dest.title}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-[#1D2230]">
                            Habilidades mobilizadas
                          </label>
                          <input
                            type="text"
                            value={opt.mobilizedSkills.join(', ')}
                            onChange={(e) =>
                              handleUpdateDecisionOption(page.id, opt.id, {
                                mobilizedSkills: e.target.value
                                  .split(',')
                                  .map((s) => s.trim())
                                  .filter(Boolean),
                              })
                            }
                            className="mt-1 w-full border border-[#D8CFC0] bg-white px-2.5 py-1.5 text-xs"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
          )}
        </div>
      )}

      {/* SECTION 4: CHARACTERS */}
      {activeSection === 'personagens' && (
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {characters.map((c) => (
              <div
                key={c.id}
                className="flex gap-4 border border-[#E5DED0] bg-white p-4"
              >
                <img
                  src={c.portraitUrl}
                  alt={c.name}
                  referrerPolicy="no-referrer"
                  className="h-24 w-20 shrink-0 object-cover object-top"
                />
                <div className="min-w-0">
                  <p className="font-serif text-lg font-semibold text-[#1D2230]">
                    {c.name} · {c.age}a
                  </p>
                  <p className="mt-0.5 text-xs text-[#586174]">
                    {c.visualSignature}
                  </p>
                  <p className="mt-2 text-xs text-[#244B8A]">
                    {c.personalityTraits.join(' · ')}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleCreateCharacter}
            className="lg:col-span-5 space-y-4 border border-[#D8CFC0] bg-[#F4EFE6] p-6"
          >
            <h2 className="font-serif text-2xl font-semibold text-[#1D2230]">
              Adicionar Personagem
            </h2>

            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-[#1D2230]">
                  Nome
                </label>
                <input
                  type="text"
                  required
                  value={newCharName}
                  onChange={(e) => setNewCharName(e.target.value)}
                  placeholder="Ex.: Clara"
                  className="mt-1 w-full border border-[#D8CFC0] bg-white px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1D2230]">
                  Idade
                </label>
                <input
                  type="number"
                  min={9}
                  max={17}
                  value={newCharAge}
                  onChange={(e) => setNewCharAge(Number(e.target.value))}
                  className="mt-1 w-full border border-[#D8CFC0] bg-white px-3 py-2 text-sm font-mono tabular-nums"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1D2230]">
                Ficha visual (silhueta, cabelo, roupas)
              </label>
              <input
                type="text"
                value={newCharVisual}
                onChange={(e) => setNewCharVisual(e.target.value)}
                placeholder="Ex.: Cabelo cacheado curto, óculos redondos, cardigã pêssego"
                className="mt-1 w-full border border-[#D8CFC0] bg-white px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1D2230]">
                Traços de personalidade (separados por vírgula)
              </label>
              <input
                type="text"
                value={newCharTraits}
                onChange={(e) => setNewCharTraits(e.target.value)}
                placeholder="Curiosa, Direta, Criativa"
                className="mt-1 w-full border border-[#D8CFC0] bg-white px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1D2230]">
                Conflito socioemocional principal
              </label>
              <textarea
                rows={2}
                value={newCharConflict}
                onChange={(e) => setNewCharConflict(e.target.value)}
                placeholder="Qual dilema interno move este personagem?"
                className="mt-1 w-full border border-[#D8CFC0] bg-white px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="inline-flex cursor-pointer items-center gap-2 border border-[#1D2230] bg-white px-3.5 py-2 text-xs font-medium text-[#1D2230] hover:bg-[#EAE3D5]">
                <Upload className="h-3.5 w-3.5" />
                Importar retrato ilustrado (2D)
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) readImageFile(f, (url) => setNewCharPortrait(url));
                  }}
                />
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1D2230] px-5 py-3 text-xs font-semibold text-white hover:bg-[#2F374C]"
            >
              Cadastrar Personagem
            </button>
          </form>
        </div>
      )}

      {/* SECTION 5: SEASONS */}
      {activeSection === 'temporadas' && (
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-4">
            <h2 className="font-serif text-2xl font-semibold text-[#1D2230]">
              Temporadas MUNDIÊ ({seasons.length})
            </h2>
            {seasons.map((s) => (
              <div
                key={s.id}
                className="border border-[#E5DED0] bg-white p-6"
              >
                <p className="font-mono text-xs text-[#244B8A] uppercase tabular-nums">
                  Temporada {String(s.number).padStart(2, '0')} · {s.ageRange}
                </p>
                <h3 className="mt-1 font-serif text-2xl font-semibold text-[#1D2230]">
                  {s.title}
                </h3>
                <p className="mt-1 font-serif text-base text-[#586174] italic">
                  “{s.tagline}”
                </p>
                <p className="mt-3 text-sm text-[#384152]">{s.editorialNote}</p>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleCreateSeason}
            className="lg:col-span-5 space-y-4 border border-[#D8CFC0] bg-[#F4EFE6] p-6"
          >
            <h2 className="font-serif text-2xl font-semibold text-[#1D2230]">
              Criar Nova Temporada
            </h2>
            <div>
              <label className="block text-xs font-semibold text-[#1D2230]">
                Nome da temporada
              </label>
              <input
                type="text"
                required
                value={newSeasonTitle}
                onChange={(e) => setNewSeasonTitle(e.target.value)}
                placeholder="Ex.: PRÓXIMO CAPÍTULO"
                className="mt-1 w-full border border-[#D8CFC0] bg-white px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1D2230]">
                Frase-conceito
              </label>
              <input
                type="text"
                value={newSeasonTagline}
                onChange={(e) => setNewSeasonTagline(e.target.value)}
                placeholder="Ex.: Crescer também é aprender a mudar de ideia."
                className="mt-1 w-full border border-[#D8CFC0] bg-white px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1D2230]">
                Faixa etária recomendada
              </label>
              <input
                type="text"
                value={newSeasonAge}
                onChange={(e) => setNewSeasonAge(e.target.value)}
                className="mt-1 w-full border border-[#D8CFC0] bg-white px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1D2230]">
                Nota curatorial
              </label>
              <textarea
                rows={3}
                value={newSeasonNote}
                onChange={(e) => setNewSeasonNote(e.target.value)}
                placeholder="Apresentação temática da temporada..."
                className="mt-1 w-full border border-[#D8CFC0] bg-white px-3 py-2 text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#244B8A] px-5 py-3 text-xs font-semibold text-white hover:bg-[#1B3A6E]"
            >
              Criar Temporada
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
