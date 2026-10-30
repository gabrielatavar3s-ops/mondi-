import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import {
  CharacterProfile,
  Episode,
  NarrativeState,
} from '../types/mundie';

interface CharactersViewProps {
  characters: CharacterProfile[];
  episodes: Episode[];
  narrativeState: NarrativeState;
  onStartEpisode: (episodeId: string) => void;
}

export const CharactersView: React.FC<CharactersViewProps> = ({
  characters,
  episodes,
  narrativeState,
  onStartEpisode,
}) => {
  const [selectedCharId, setSelectedCharId] = useState<string>(
    characters[0]?.id || 'mia'
  );
  const [imgFailedMap, setImgFailedMap] = useState<Record<string, boolean>>({});

  const activeChar =
    characters.find((c) => c.id === selectedCharId) || characters[0];

  const relatedEpisodes = episodes.filter((ep) =>
    activeChar ? ep.characters.includes(activeChar.id) : false
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 pb-24">
      <header className="border-b border-[#E5DED0] pb-8">
        <p className="text-xs font-semibold tracking-[0.16em] text-[#6E56AF] uppercase">
          Fichas Visuais & Perfis Narrativos
        </p>
        <h1 className="mt-2 font-serif text-4xl font-semibold text-[#1D2230]">
          Personagens de Entre Nós
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#586174]">
          Cada integrante da turma enxerga os acontecimentos da escola a partir de sua
          própria história, humor e inseguranças. Conheça os perfis e veja como suas
          escolhas nos episódios transformam os vínculos entre eles.
        </p>

        {/* Character Selector Tabs */}
        <div
          role="tablist"
          aria-label="Selecionar ficha de personagem"
          className="mt-8 flex flex-wrap items-center gap-2"
        >
          {characters.map((char) => {
            const isSelected = char.id === activeChar?.id;
            return (
              <button
                key={char.id}
                role="tab"
                aria-selected={isSelected}
                type="button"
                onClick={() => setSelectedCharId(char.id)}
                className={`border px-5 py-2.5 text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'border-[#1D2230] bg-[#1D2230] text-white'
                    : 'border-[#D8CFC0] bg-white text-[#1D2230] hover:bg-[#F4EFE6]'
                }`}
              >
                {char.name} · {char.age} anos
              </button>
            );
          })}
        </div>
      </header>

      {/* Featured Character Dossier (2-column asymmetric gallery presentation) */}
      {activeChar && (
        <section className="mt-10 grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12">
          {/* Portrait Sheet Column */}
          <div className="lg:col-span-5">
            <figure className="overflow-hidden border border-[#1D2230]/20 bg-[#F4EFE6]">
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                {!imgFailedMap[activeChar.id] && activeChar.portraitUrl ? (
                  <img
                    src={activeChar.portraitUrl}
                    alt={`Ficha ilustrada de ${activeChar.name}, ${activeChar.age} anos`}
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setImgFailedMap((prev) => ({
                        ...prev,
                        [activeChar.id]: true,
                      }))
                    }
                    className="h-full w-full object-cover object-top"
                  />
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center p-8 text-center"
                    style={{ backgroundColor: activeChar.softBgHex }}
                  >
                    <p className="font-serif text-2xl font-semibold text-[#1D2230]">
                      {activeChar.name}
                    </p>
                  </div>
                )}
              </div>
              <figcaption className="border-t border-[#E5DED0] bg-white px-5 py-3.5 text-xs text-[#586174]">
                <span className="font-semibold text-[#1D2230]">Identidade visual: </span>
                {activeChar.visualSignature}
              </figcaption>
            </figure>
          </div>

          {/* Editorial Character Sheet Details */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <div className="space-y-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#586174]">
                  <span className="font-mono font-medium text-[#1D2230] tabular-nums">
                    {activeChar.age} anos
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{activeChar.shortRole}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">
                    Presente em {relatedEpisodes.length} episódios
                  </span>
                </div>

                <h2 className="mt-2 font-serif text-4xl font-semibold text-[#1D2230]">
                  {activeChar.name}
                </h2>
              </div>

              <blockquote className="border-y border-[#E5DED0] py-4 font-serif text-xl leading-relaxed text-[#252B3B] italic">
                {activeChar.signatureQuote}
              </blockquote>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-semibold tracking-wider text-[#586174] uppercase">
                    Perfil & Cotidiano
                  </h3>
                  <p className="mt-1.5 max-w-2xl text-base leading-relaxed text-[#2E3646]">
                    {activeChar.biography}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6 border-t border-[#E5DED0] pt-5 sm:grid-cols-2">
                  <div>
                    <h3 className="text-xs font-semibold tracking-wider text-[#586174] uppercase">
                      Traços Marcantes
                    </h3>
                    <p className="mt-1.5 text-sm font-medium text-[#1D2230]">
                      {activeChar.personalityTraits.join(' · ')}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold tracking-wider text-[#DD6452] uppercase">
                      Conflito Interno
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#2E3646]">
                      {activeChar.internalConflict}
                    </p>
                  </div>
                </div>

                {/* Live Relationship State from Reader's Narrative Choices */}
                {narrativeState.relationshipStates[activeChar.id] && (
                  <div className="border border-[#D8CFC0] bg-[#F4EFE6] p-5">
                    <p className="text-xs font-semibold tracking-wider text-[#244B8A] uppercase">
                      Estado Narrativo Atual (Conforme suas escolhas)
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#1D2230]">
                      {narrativeState.relationshipStates[activeChar.id]}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Episodes featuring this character */}
            <div className="mt-8 border-t border-[#E5DED0] pt-6">
              <h3 className="text-xs font-semibold tracking-wider text-[#586174] uppercase">
                Episódios com {activeChar.name}
              </h3>
              <div className="mt-3 divide-y divide-[#EDE6D8] border border-[#E5DED0] bg-white">
                {relatedEpisodes.slice(0, 5).map((ep) => (
                  <div
                    key={ep.id}
                    className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
                  >
                    <div className="min-w-0">
                      <span className="font-mono text-xs text-[#586174] tabular-nums">
                        Ep. {String(ep.number).padStart(2, '0')} ·{' '}
                      </span>
                      <span className="font-medium text-[#1D2230]">{ep.title}</span>
                      <span className="hidden sm:inline text-xs text-[#586174]">
                        {' '}
                        — {ep.theme}
                      </span>
                    </div>
                    {ep.pages.length > 0 ? (
                      <button
                        type="button"
                        onClick={() => onStartEpisode(ep.id)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#244B8A] hover:underline whitespace-nowrap shrink-0"
                      >
                        <BookOpen className="h-3.5 w-3.5" />
                        Ler agora
                      </button>
                    ) : (
                      <span className="text-xs text-[#586174] whitespace-nowrap shrink-0">
                        Em breve
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
