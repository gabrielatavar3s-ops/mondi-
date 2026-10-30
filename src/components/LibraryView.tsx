import React, { useMemo, useState } from 'react';
import { BookOpen, Edit3, Search, X } from 'lucide-react';
import {
  CharacterProfile,
  Episode,
  NarrativeState,
  Season,
} from '../types/mundie';
import { EpisodeCoverArt } from './EpisodeCoverArt';

interface LibraryViewProps {
  seasons: Season[];
  episodes: Episode[];
  characters: CharacterProfile[];
  narrativeState: NarrativeState;
  onStartEpisode: (episodeId: string) => void;
  onEditEpisodeInStudio: (episodeId: string) => void;
}

const SUGGESTED_SKILL_FILTERS = [
  'Exclusão',
  'Bullying',
  'Ansiedade',
  'Empatia',
  'Autoestima',
  'Solidão',
];

function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export const LibraryView: React.FC<LibraryViewProps> = ({
  seasons,
  episodes,
  characters,
  narrativeState,
  onStartEpisode,
  onEditEpisodeInStudio,
}) => {
  const [selectedSeasonId, setSelectedSeasonId] = useState<string>(
    seasons[0]?.id || 'season-entre-nos'
  );
  // Local component state for the search filter query
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [characterFilter, setCharacterFilter] = useState<string>('todos');
  const [statusFilter, setStatusFilter] = useState<'todos' | 'disponivel'>('todos');
  const [inspectedEpisode, setInspectedEpisode] = useState<Episode | null>(null);

  const currentSeason =
    seasons.find((s) => s.id === selectedSeasonId) || seasons[0];

  const charNameMap = useMemo(() => {
    const map: Record<string, string> = {};
    characters.forEach((c) => {
      map[c.id] = c.name;
    });
    return map;
  }, [characters]);

  const seasonEpisodes = useMemo(
    () => episodes.filter((ep) => ep.seasonId === currentSeason?.id),
    [episodes, currentSeason?.id]
  );

  const normalizedFilterQuery = useMemo(
    () => normalizeText(filterQuery),
    [filterQuery]
  );

  // Filter existing episodes array based on title or associated socioemotional skills
  const filteredEpisodes = useMemo(() => {
    const queryTokens = normalizedFilterQuery
      ? normalizedFilterQuery.split(/\s+/).filter(Boolean)
      : [];

    return seasonEpisodes
      .filter((ep) => {
        if (queryTokens.length === 0) return true;

        const normalizedTitle = normalizeText(ep.title);
        const normalizedTheme = normalizeText(ep.theme);
        const normalizedSkills = ep.skills.map((skill) => normalizeText(skill));

        return queryTokens.every(
          (token) =>
            normalizedTitle.includes(token) ||
            normalizedSkills.some((skill) => skill.includes(token)) ||
            normalizedTheme.includes(token)
        );
      })
      .filter((ep) =>
        characterFilter === 'todos'
          ? true
          : ep.characters.includes(characterFilter)
      )
      .filter((ep) =>
        statusFilter === 'todos' ? true : ep.pages.length > 0
      )
      .sort((a, b) => a.number - b.number);
  }, [seasonEpisodes, normalizedFilterQuery, characterFilter, statusFilter]);

  const hasActiveFilters =
    normalizedFilterQuery.length > 0 ||
    characterFilter !== 'todos' ||
    statusFilter !== 'todos';

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 pb-24">
      {/* Season Header */}
      <header className="border-b border-[#E5DED0] pb-8">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-[#244B8A] uppercase">
              Catálogo Editorial · Coleção {currentSeason?.ageRange}
            </p>
            <h1 className="mt-2 font-serif text-4xl font-semibold text-[#1D2230]">
              Temporada {String(currentSeason?.number || 1).padStart(2, '0')}:{' '}
              {currentSeason?.title}
            </h1>
            <p className="mt-2 font-serif text-lg text-[#4A5366] italic">
              “{currentSeason?.tagline}”
            </p>
          </div>

          {seasons.length > 1 && (
            <div className="flex items-center gap-1 rounded-md bg-[#EAE3D5] p-1">
              {seasons.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedSeasonId(s.id)}
                  className={`rounded-sm px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    s.id === currentSeason?.id
                      ? 'bg-white text-[#1D2230] shadow-2xs'
                      : 'text-[#586174] hover:text-[#1D2230]'
                  }`}
                >
                  T{s.number} · {s.title}
                </button>
              ))}
            </div>
          )}
        </div>

        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#586174]">
          {currentSeason?.editorialNote}
        </p>

        {/* Search Bar filtering episodes by Title or Socioemotional Skills */}
        <div className="mt-8 border border-[#D8CFC0] bg-[#F4EFE6] p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label
              htmlFor="episode-filter-input"
              className="text-xs font-semibold tracking-wider text-[#1D2230] uppercase"
            >
              Buscar episódio por título ou habilidade socioemocional
            </label>
            <span
              aria-live="polite"
              className="font-mono text-xs text-[#586174] tabular-nums"
            >
              {filteredEpisodes.length} de {seasonEpisodes.length} episódios
            </span>
          </div>

          <div className="relative mt-2.5">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#586174]"
            />
            <input
              id="episode-filter-input"
              role="searchbox"
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setFilterQuery('');
              }}
              placeholder="Pesquisar por título ou habilidade socioemocional (ex.: Todo Mundo Menos Eu, empatia, bullying, ansiedade)..."
              className="w-full border border-[#D8CFC0] bg-white py-3 pr-10 pl-10 text-sm text-[#1D2230] placeholder:text-[#7D8597] transition-colors focus:border-[#244B8A] focus:outline-none"
            />
            {filterQuery && (
              <button
                type="button"
                onClick={() => setFilterQuery('')}
                aria-label="Limpar busca"
                className="absolute top-1/2 right-2.5 -translate-y-1/2 p-1 text-[#586174] hover:text-[#1D2230]"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Quick Socioemotional Skill Filter Buttons */}
          <div
            role="group"
            aria-label="Filtrar rapidamente por habilidade socioemocional"
            className="mt-3 flex flex-wrap items-center gap-2 text-xs"
          >
            <span className="text-[#586174]">Habilidades e temas:</span>
            {SUGGESTED_SKILL_FILTERS.map((term) => {
              const isSelected = normalizedFilterQuery === normalizeText(term);
              return (
                <button
                  key={term}
                  type="button"
                  onClick={() => setFilterQuery(isSelected ? '' : term)}
                  className={`border px-2.5 py-1 font-medium transition-colors whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'border-[#244B8A] bg-[#244B8A] text-white'
                      : 'border-[#D8CFC0] bg-white text-[#1D2230] hover:border-[#244B8A]'
                  }`}
                >
                  {term}
                </button>
              );
            })}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={() => {
                  setFilterQuery('');
                  setCharacterFilter('todos');
                  setStatusFilter('todos');
                }}
                className="ml-auto text-xs font-medium text-[#244B8A] hover:underline whitespace-nowrap shrink-0"
              >
                Limpar filtros
              </button>
            )}
          </div>
        </div>

        {/* Interactive Secondary Filter Controls (Character & Availability) */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <div
            role="group"
            aria-label="Filtrar episódios por personagem"
            className="flex flex-wrap items-center gap-1 rounded-md bg-[#EAE3D5] p-1"
          >
            <button
              type="button"
              onClick={() => setCharacterFilter('todos')}
              className={`rounded-sm px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                characterFilter === 'todos'
                  ? 'bg-white text-[#1D2230] shadow-2xs'
                  : 'text-[#586174] hover:text-[#1D2230]'
              }`}
            >
              Todos os personagens
            </button>
            {characters.map((char) => (
              <button
                key={char.id}
                type="button"
                onClick={() => setCharacterFilter(char.id)}
                className={`rounded-sm px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  characterFilter === char.id
                    ? 'bg-white text-[#1D2230] shadow-2xs'
                    : 'text-[#586174] hover:text-[#1D2230]'
                }`}
              >
                {char.name}
              </button>
            ))}
          </div>

          <div
            role="group"
            aria-label="Filtrar disponibilidade de leitura"
            className="flex items-center gap-1 rounded-md bg-[#EAE3D5] p-1"
          >
            <button
              type="button"
              onClick={() => setStatusFilter('todos')}
              className={`rounded-sm px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                statusFilter === 'todos'
                  ? 'bg-white text-[#1D2230] shadow-2xs'
                  : 'text-[#586174] hover:text-[#1D2230]'
              }`}
            >
              Coleção completa ({seasonEpisodes.length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('disponivel')}
              className={`rounded-sm px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                statusFilter === 'disponivel'
                  ? 'bg-white text-[#1D2230] shadow-2xs'
                  : 'text-[#586174] hover:text-[#1D2230]'
              }`}
            >
              Prontos para ler
            </button>
          </div>
        </div>
      </header>

      {/* Episode Catalog Grid */}
      {filteredEpisodes.length === 0 ? (
        <div className="mt-12 border border-[#E5DED0] bg-[#F4EFE6] p-10 text-center">
          <p className="font-serif text-xl text-[#1D2230]">
            Nenhum episódio encontrado para “{filterQuery || 'este filtro'}”.
          </p>
          <p className="mt-1.5 text-xs text-[#586174]">
            Tente buscar por parte do título ou por habilidades como empatia, exclusão, bullying ou ansiedade.
          </p>
          <button
            type="button"
            onClick={() => {
              setFilterQuery('');
              setCharacterFilter('todos');
              setStatusFilter('todos');
            }}
            className="mt-4 border border-[#1D2230] px-4 py-2 text-xs font-medium text-[#1D2230] hover:bg-white whitespace-nowrap shrink-0"
          >
            Limpar busca e filtros
          </button>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredEpisodes.map((ep) => {
            const isReadable = ep.pages.length > 0;
            const epProgress = narrativeState.progressByEpisode[ep.id];
            const castLabel = ep.characters
              .map((id) => charNameMap[id] || id)
              .join(', ');

            return (
              <article
                key={ep.id}
                className="group flex flex-col justify-between border border-[#E5DED0] bg-white transition-colors hover:border-[#244B8A]"
              >
                <div>
                  <button
                    type="button"
                    onClick={() =>
                      isReadable
                        ? onStartEpisode(ep.id)
                        : setInspectedEpisode(ep)
                    }
                    className="block w-full text-left focus-visible:outline-2 focus-visible:outline-[#244B8A]"
                  >
                    <EpisodeCoverArt episode={ep} />
                  </button>

                  <div className="p-5">
                    {/* Unboxed Clean Metadata */}
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#586174]">
                      <span className="font-mono font-medium text-[#1D2230] tabular-nums">
                        Episódio {String(ep.number).padStart(2, '0')}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">
                        {ep.estimatedMinutes} min
                      </span>
                      <span aria-hidden="true">·</span>
                      <span
                        className={
                          isReadable
                            ? 'font-semibold text-[#244B8A]'
                            : 'text-[#6E56AF]'
                        }
                      >
                        {isReadable
                          ? epProgress?.completed
                            ? 'Lido'
                            : 'Interativo disponível'
                          : ep.status === 'em_producao'
                          ? 'Arte em produção'
                          : 'Roteiro editorial'}
                      </span>
                    </div>

                    <h2 className="mt-2 font-serif text-xl font-semibold text-[#1D2230]">
                      {ep.title}
                    </h2>
                    <p className="mt-0.5 text-xs font-medium text-[#244B8A]">
                      {ep.theme}
                    </p>

                    <p className="mt-3 text-sm leading-relaxed text-[#4A5366]">
                      {ep.synopsis}
                    </p>

                    <dl className="mt-4 space-y-1.5 border-t border-[#F0EAE0] pt-3 text-xs text-[#586174]">
                      <div>
                        <dt className="inline font-semibold text-[#1D2230]">
                          Personagens:{' '}
                        </dt>
                        <dd className="inline">{castLabel}</dd>
                      </div>
                      <div>
                        <dt className="inline font-semibold text-[#1D2230]">
                          Habilidades:{' '}
                        </dt>
                        <dd className="inline">
                          {ep.skills.map((skill, idx) => {
                            const isMatched =
                              normalizedFilterQuery.length > 0 &&
                              normalizeText(skill).includes(
                                normalizedFilterQuery
                              );
                            return (
                              <React.Fragment key={skill}>
                                {idx > 0 && <span aria-hidden="true"> · </span>}
                                <button
                                  type="button"
                                  onClick={() => setFilterQuery(skill)}
                                  className={`hover:text-[#244B8A] hover:underline ${
                                    isMatched
                                      ? 'font-semibold text-[#244B8A] underline'
                                      : ''
                                  }`}
                                >
                                  {skill}
                                </button>
                              </React.Fragment>
                            );
                          })}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 border-t border-[#E5DED0] bg-[#FBF8F3] px-5 py-3">
                  {isReadable ? (
                    <button
                      type="button"
                      onClick={() => onStartEpisode(ep.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#244B8A] hover:underline whitespace-nowrap shrink-0"
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      {epProgress ? 'Continuar HQ' : 'Ler HQ Interativa'}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setInspectedEpisode(ep)}
                      className="text-xs font-semibold text-[#1D2230] hover:text-[#244B8A] hover:underline whitespace-nowrap shrink-0"
                    >
                      Ler ficha e prévia →
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setInspectedEpisode(ep)}
                    className="text-xs text-[#586174] hover:text-[#1D2230] whitespace-nowrap shrink-0"
                  >
                    Detalhes
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Episode Editorial Dossier Modal */}
      {inspectedEpisode && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-ep-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1D2230]/60 p-4 backdrop-blur-[2px]"
          onClick={() => setInspectedEpisode(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-[#1D2230] bg-[#FBF8F3] p-6 sm:p-8 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#E5DED0] pb-4">
              <div>
                <p className="font-mono text-xs text-[#244B8A] uppercase tabular-nums">
                  Temporada 01 · Episódio{' '}
                  {String(inspectedEpisode.number).padStart(2, '0')}
                </p>
                <h2
                  id="modal-ep-title"
                  className="mt-1 font-serif text-2xl font-semibold text-[#1D2230]"
                >
                  {inspectedEpisode.title}
                </h2>
                <p className="mt-0.5 text-sm text-[#586174]">
                  {inspectedEpisode.theme} · {inspectedEpisode.estimatedMinutes}{' '}
                  min estimados
                </p>
              </div>
              <button
                type="button"
                onClick={() => setInspectedEpisode(null)}
                aria-label="Fechar detalhes do episódio"
                className="p-1.5 text-[#586174] hover:bg-[#EAE3D5] hover:text-[#1D2230]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 space-y-5 text-sm leading-relaxed text-[#343C4E]">
              <div>
                <h3 className="text-xs font-semibold tracking-wider text-[#586174] uppercase">
                  Sinopse Editorial
                </h3>
                <p className="mt-1.5 text-base text-[#1D2230]">
                  {inspectedEpisode.synopsis}
                </p>
              </div>

              <div className="border border-[#E5DED0] bg-[#F4EFE6] p-4">
                <h3 className="text-xs font-semibold tracking-wider text-[#244B8A] uppercase">
                  Recorte de Roteiro · MUNDIÊ
                </h3>
                <p className="mt-2 font-serif text-base text-[#1D2230] italic">
                  “{inspectedEpisode.scriptExcerpt}”
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 border-t border-[#E5DED0] pt-4 sm:grid-cols-2">
                <div>
                  <h4 className="text-xs font-semibold text-[#1D2230]">
                    Personagens em cena
                  </h4>
                  <p className="mt-1 text-xs text-[#586174]">
                    {inspectedEpisode.characters
                      .map((id) => charNameMap[id] || id)
                      .join(' · ')}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#1D2230]">
                    Habilidades socioemocionais
                  </h4>
                  <p className="mt-1 text-xs text-[#586174]">
                    {inspectedEpisode.skills.join(' · ')}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-end gap-3 border-t border-[#E5DED0] pt-5">
              <button
                type="button"
                onClick={() => {
                  const id = inspectedEpisode.id;
                  setInspectedEpisode(null);
                  onEditEpisodeInStudio(id);
                }}
                className="inline-flex items-center gap-1.5 border border-[#1D2230] px-4 py-2.5 text-xs font-medium text-[#1D2230] hover:bg-[#EAE3D5] whitespace-nowrap shrink-0"
              >
                <Edit3 className="h-3.5 w-3.5" />
                Abrir no Estúdio Editorial
              </button>

              {inspectedEpisode.pages.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    const id = inspectedEpisode.id;
                    setInspectedEpisode(null);
                    onStartEpisode(id);
                  }}
                  className="inline-flex items-center gap-1.5 bg-[#244B8A] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#1B3A6E] whitespace-nowrap shrink-0"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  Ler Episódio Agora
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
