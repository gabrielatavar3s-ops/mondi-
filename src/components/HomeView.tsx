import React, { useState } from 'react';
import { ArrowRight, BookOpen, GitBranch } from 'lucide-react';
import {
  CharacterProfile,
  Episode,
  NarrativeState,
  NavigationTab,
  Season,
} from '../types/mundie';
import { EpisodeCoverArt } from './EpisodeCoverArt';
import { GENERATED_ASSETS } from '../data/initialMundieData';

interface HomeViewProps {
  season: Season;
  episodes: Episode[];
  characters: CharacterProfile[];
  narrativeState: NarrativeState;
  onStartEpisode: (episodeId: string, targetPageId?: string) => void;
  onNavigateTab: (tab: NavigationTab) => void;
}

const INTERACTIVE_PILLARS_PREVIEW = [
  {
    key: 'A',
    choiceLabel: 'Perguntar diretamente na frente do grupo',
    sceneImg: GENERATED_ASSETS.ep01BranchAStairs,
    skills: 'Comunicação assertiva · Coragem emocional · Checagem de suposições',
    consequence:
      'Revela o presente surpresa na hora, mas expõe a timidez de Ayla sobre um problema familiar — pedindo uma 2ª decisão sobre como equilibrar sinceridade e acolhimento.',
  },
  {
    key: 'B',
    choiceLabel: 'Fingir que não se importou e se afastar',
    sceneImg: GENERATED_ASSETS.ep01BranchBLockerNote,
    skills: 'Autopercepção de limites · Leitura de defesas emocionais',
    consequence:
      'Protege o orgulho de Mia cedo, mas cria um espelho: os amigos pensam que ela não quer conversa — até um bilhete deixado por Ayla no armário abrir uma nova escolha.',
  },
  {
    key: 'C',
    choiceLabel: 'Conversar primeiro com Noah em particular',
    sceneImg: GENERATED_ASSETS.ep01BranchCCorridorNoah,
    skills: 'Escuta ativa · Mediação cuidadosa · Empatia em perspectiva',
    consequence:
      'Desmonta o mal-entendido sem plateia e expõe a mania de Noah de controlar tudo sozinho — levando a decidir como devolver a voz ao grupo no recreio.',
  },
];

export const HomeView: React.FC<HomeViewProps> = ({
  season,
  episodes,
  characters,
  narrativeState,
  onStartEpisode,
  onNavigateTab,
}) => {
  const [heroImgFailed, setHeroImgFailed] = useState(false);
  const [previewBranchKey, setPreviewBranchKey] = useState<'A' | 'B' | 'C'>('A');

  const pilotEpisode = episodes.find((e) => e.id === 'ep-01') || episodes[0];
  const pilotProgress = pilotEpisode
    ? narrativeState.progressByEpisode[pilotEpisode.id]
    : undefined;
  const previewEpisodes = episodes.slice(0, 4);

  const activePreviewBranch =
    INTERACTIVE_PILLARS_PREVIEW.find((b) => b.key === previewBranchKey) ||
    INTERACTIVE_PILLARS_PREVIEW[0];

  return (
    <div className="space-y-20 pb-20">
      {/* 1. Editorial Marquee Hero: MUNDIÊ — PILOTO 01 */}
      <section className="border-b border-[#E5DED0] bg-[#FBF8F3]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
          <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12">
            {/* Editorial Copy Column */}
            <div className="flex flex-col justify-between lg:col-span-6">
              <div>
                <div className="mb-4 flex items-center gap-4">
                  <img
                    src={GENERATED_ASSETS.mundieBrandLogo}
                    alt="Selo MUNDIÊ Editora — Histórias que abrem mundos"
                    className="h-20 w-20 shrink-0 object-contain mix-blend-multiply"
                  />
                  <div>
                    <p className="text-xs font-semibold tracking-[0.16em] text-[#244B8A] uppercase">
                      MUNDIÊ Editora · Piloto 01
                    </p>
                    <p className="mt-0.5 text-xs text-[#586174]">
                      Coleção Entre Nós · Histórias que abrem mundos
                    </p>
                  </div>
                </div>

                <h1 className="mt-2 font-serif text-4xl leading-[1.12] font-semibold tracking-tight text-[#1D2230] sm:text-5xl">
                  Todo Mundo Menos Eu
                </h1>

                <p className="mt-3 font-serif text-xl text-[#464F62] italic">
                  “Seu mundo. Suas histórias. Mil descobertas.”
                </p>

                <p className="mt-5 max-w-xl text-base leading-relaxed text-[#464F62]">
                  Uma HQ digital interativa que transforma conflitos reais da
                  pré-adolescência em aprendizagem socioemocional envolvente — unindo
                  decisões narrativas encadeadas, soft skills vivas e consequências reais.
                </p>
              </div>

              <div className="mt-8 border-t border-[#E5DED0] pt-6">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#586174]">
                  <span className="font-semibold text-[#1D2230]">
                    Formato: HQ Digital Interativa
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">2 atos de decisão</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">6 desfechos reais</span>
                  <span aria-hidden="true">·</span>
                  <span>10 a 14 anos</span>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  {pilotEpisode && (
                    <button
                      type="button"
                      onClick={() => onStartEpisode(pilotEpisode.id)}
                      className="inline-flex items-center gap-2.5 bg-[#244B8A] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#1B3A6E] whitespace-nowrap shrink-0"
                    >
                      <BookOpen className="h-4 w-4" />
                      {pilotProgress
                        ? 'Continuar Piloto 01'
                        : 'Iniciar Experiência · Piloto 01'}
                    </button>
                  )}

                  {pilotEpisode && (
                    <button
                      type="button"
                      onClick={() => onStartEpisode(pilotEpisode.id, 'ep01-p4')}
                      className="inline-flex items-center gap-2 border border-[#1D2230] bg-transparent px-5 py-3.5 text-sm font-medium text-[#1D2230] transition-colors hover:bg-[#F4EFE6] whitespace-nowrap shrink-0"
                    >
                      <GitBranch className="h-4 w-4" />
                      Ir direto à 1ª Decisão
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Hero Illustration Column */}
            <div className="lg:col-span-6">
              <figure className="relative h-full min-h-[340px] overflow-hidden border border-[#1D2230]/15 bg-gradient-to-br from-[#244B8A] via-[#7A63B6] to-[#F4C3A7]">
                {!heroImgFailed && (
                  <img
                    src={GENERATED_ASSETS.ep01PilotScene}
                    alt="Mia observando Ayla, Leo e Noah conversarem perto dos armários no pátio da escola em Todo Mundo Menos Eu"
                    referrerPolicy="no-referrer"
                    onError={() => setHeroImgFailed(true)}
                    className="h-full w-full object-cover object-right lg:h-full"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#191E2B]/85 via-[#191E2B]/20 to-transparent" />
                <figcaption className="absolute inset-x-6 bottom-5 flex flex-wrap items-end justify-between gap-4 text-white">
                  <div>
                    <p className="text-xs tracking-wider text-white/80 uppercase">
                      Episódio 01 · Exclusão e Pertencimento
                    </p>
                    <p className="mt-0.5 font-serif text-2xl font-semibold">
                      {season.title} — {season.tagline}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-white/85 tabular-nums">
                    {pilotProgress?.discoveredEndings?.length || 0}/6 finais explorados
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>

          {/* 3-Pillar Differential Strip */}
          <div className="mt-10 grid grid-cols-1 gap-6 border-t border-[#E5DED0] pt-8 sm:grid-cols-3">
            <div>
              <h2 className="font-serif text-lg font-semibold text-[#1D2230]">
                01. Decisões Narrativas Reais
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-[#586174]">
                Duas etapas de escolha encadeadas alteram cenas, enquadramentos,
                diálogos e o estado emocional dos quatro amigos.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-lg font-semibold text-[#1D2230]">
                02. Soft Skills em Ação
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-[#586174]">
                Assertividade, autopercepção, escuta ativa e checagem de suposições
                vivenciadas dentro da história — com Lente Socioemocional ativável.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-lg font-semibold text-[#1D2230]">
                03. Consequências sem Moralismo
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-[#586174]">
                Sem notas ou respostas “certas”: cada caminho protege algo importante
                e revela os quatro pontos de vista do mesmo fim de semana.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Learning Proof: How Story Becomes Learning in Piloto 01 */}
      {pilotEpisode && (
        <section className="mx-auto max-w-7xl px-6">
          <div className="border border-[#D8CFC0] bg-[#F4EFE6] p-6 sm:p-10">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#DCD3C2] pb-6">
              <div>
                <p className="text-xs font-semibold tracking-[0.14em] text-[#DD6452] uppercase">
                  Prova de Conceito · Aprendizagem Experiencial
                </p>
                <h2 className="mt-1 font-serif text-3xl font-semibold text-[#1D2230]">
                  Como uma cena vira aprendizagem no Piloto 01
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#464F62]">
                  Na Página 04, Mia precisa decidir o que fazer após o silêncio no grupo e a foto de sábado. Alterne abaixo para espiar como cada rota mobiliza habilidades e consequências distintas:
                </p>
              </div>

              {/* Functional Segmented Selector */}
              <div
                role="tablist"
                aria-label="Simular rotas do Piloto 01"
                className="flex items-center gap-1 rounded-md bg-[#E2D9C8] p-1"
              >
                {INTERACTIVE_PILLARS_PREVIEW.map((b) => (
                  <button
                    key={b.key}
                    role="tab"
                    aria-selected={previewBranchKey === b.key}
                    type="button"
                    onClick={() => setPreviewBranchKey(b.key as 'A' | 'B' | 'C')}
                    className={`rounded-sm px-3.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                      previewBranchKey === b.key
                        ? 'bg-white text-[#1D2230] shadow-2xs'
                        : 'text-[#586174] hover:text-[#1D2230]'
                    }`}
                  >
                    Rota {b.key}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <div className="h-full min-h-[260px] overflow-hidden border-2 border-[#1D2230] bg-[#1D2230]">
                  <img
                    src={activePreviewBranch.sceneImg}
                    alt={`Cena ilustrada da Rota ${activePreviewBranch.key}`}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between lg:col-span-6">
                <div className="space-y-4">
                  <p className="font-mono text-xs font-semibold text-[#244B8A] uppercase">
                    Escolha {activePreviewBranch.key} na Página 04
                  </p>
                  <h3 className="font-serif text-2xl font-semibold text-[#1D2230]">
                    “{activePreviewBranch.choiceLabel}”
                  </h3>

                  <div className="border-y border-[#DCD3C2] py-4">
                    <p className="text-xs font-semibold tracking-wider text-[#6E56AF] uppercase">
                      Soft skills mobilizadas
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#1D2230]">
                      {activePreviewBranch.skills}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold tracking-wider text-[#586174] uppercase">
                      Consequência narrativa real
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-[#343C4E]">
                      {activePreviewBranch.consequence}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => onStartEpisode(pilotEpisode.id)}
                    className="inline-flex items-center gap-2 bg-[#DD6452] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#C65240] whitespace-nowrap shrink-0"
                  >
                    Ler Piloto 01 desde a Página 01
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigateTab('diario')}
                    className="text-sm font-medium text-[#244B8A] hover:underline whitespace-nowrap shrink-0"
                  >
                    Abrir Meu Diário de Escolhas →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Main Characters Quartet Preview */}
      <section className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#E5DED0] pb-5">
          <div>
            <p className="text-xs font-semibold tracking-[0.14em] text-[#6E56AF] uppercase">
              Elenco de Todo Mundo Menos Eu
            </p>
            <h2 className="mt-1 font-serif text-3xl font-semibold text-[#1D2230]">
              Quatro perspectivas para o mesmo fim de semana
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('personagens')}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#244B8A] hover:underline whitespace-nowrap shrink-0"
          >
            Ver fichas completas e estado das relações
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {characters.slice(0, 4).map((char) => (
            <article
              key={char.id}
              onClick={() => onNavigateTab('personagens')}
              className="group cursor-pointer border border-[#E5DED0] bg-white transition-colors hover:border-[#244B8A]"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F4EFE6]">
                <img
                  src={char.portraitUrl}
                  alt={`Retrato ilustrado de ${char.name}, ${char.age} anos`}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-5">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-serif text-xl font-semibold text-[#1D2230]">
                    {char.name}
                  </h3>
                  <span className="font-mono text-xs text-[#586174] tabular-nums">
                    {char.age} anos
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#586174]">
                  {char.personalityTraits.slice(0, 3).join(' · ')}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#384152] line-clamp-3">
                  {char.internalConflict}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Curated Season Preview */}
      <section className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#E5DED0] pb-5">
          <div>
            <p className="text-xs font-semibold tracking-[0.14em] text-[#244B8A] uppercase">
              Coleção Entre Nós · Visão de Temporada
            </p>
            <h2 className="mt-1 font-serif text-3xl font-semibold text-[#1D2230]">
              Do Piloto 01 à jornada de 10 episódios
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('biblioteca')}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#244B8A] hover:underline whitespace-nowrap shrink-0"
          >
            Explorar os 10 episódios da temporada
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {previewEpisodes.map((ep) => (
            <article
              key={ep.id}
              onClick={() =>
                ep.pages.length > 0
                  ? onStartEpisode(ep.id)
                  : onNavigateTab('biblioteca')
              }
              className="group flex cursor-pointer flex-col justify-between border border-[#E5DED0] bg-white transition-colors hover:border-[#244B8A]"
            >
              <div>
                <EpisodeCoverArt episode={ep} />
                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-xs text-[#586174]">
                    <span className="font-mono tabular-nums">
                      Ep. {String(ep.number).padStart(2, '0')}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">{ep.estimatedMinutes} min</span>
                    <span aria-hidden="true">·</span>
                    <span className={ep.pages.length > 0 ? 'font-semibold text-[#244B8A]' : ''}>
                      {ep.pages.length > 0 ? 'Piloto Interativo' : 'Catálogo'}
                    </span>
                  </div>
                  <h3 className="mt-2 font-serif text-lg font-semibold text-[#1D2230]">
                    {ep.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#586174] line-clamp-3">
                    {ep.synopsis}
                  </p>
                </div>
              </div>
              <div className="border-t border-[#F0EAE0] px-5 py-3 text-xs font-medium text-[#244B8A]">
                {ep.pages.length > 0 ? 'Ler Piloto 01 agora →' : 'Ver sinopse e roteiro →'}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
