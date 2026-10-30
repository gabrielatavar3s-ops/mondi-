import React, { useState } from 'react';
import { BookOpen, Compass, RotateCcw, Trash2 } from 'lucide-react';
import { Episode, NarrativeState } from '../types/mundie';

interface JournalViewProps {
  episodes: Episode[];
  narrativeState: NarrativeState;
  onSaveReflection: (decisionId: string, note: string) => void;
  onStartEpisode: (episodeId: string) => void;
  onJumpToDecision: (episodeId: string, pageId: string) => void;
  onResetAllProgress: () => void;
}

export const JournalView: React.FC<JournalViewProps> = ({
  episodes,
  narrativeState,
  onSaveReflection,
  onStartEpisode,
  onJumpToDecision,
  onResetAllProgress,
}) => {
  const [savedNoticeId, setSavedNoticeId] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  const pilotEp = episodes.find((e) => e.id === 'ep-01') || episodes[0];
  const pilotProgress = pilotEp
    ? narrativeState.progressByEpisode[pilotEp.id]
    : undefined;

  // Deduplicated skills mobilized across all decisions made
  const allMobilizedSkills = Array.from(
    new Set(narrativeState.choiceHistory.flatMap((c) => c.mobilizedSkills))
  );

  const handleReflectionChange = (decisionId: string, text: string) => {
    onSaveReflection(decisionId, text);
    setSavedNoticeId(decisionId);
    window.setTimeout(() => {
      setSavedNoticeId((prev) => (prev === decisionId ? null : prev));
    }, 1800);
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 pb-24">
      {/* Header */}
      <header className="border-b border-[#E5DED0] pb-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-[#244B8A] uppercase">
              Espaço Pessoal & Privado de Leitura
            </p>
            <h1 className="mt-2 font-serif text-4xl font-semibold text-[#1D2230]">
              Meu Diário de Escolhas
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#586174]">
              Aqui ficam registrados os caminhos que você experimentou nas histórias,
              as habilidades socioemocionais que entraram em cena e perguntas para
              olhar cada situação por outros ângulos — sem notas, rankings ou respostas certas.
            </p>
          </div>

          {narrativeState.choiceHistory.length > 0 && (
            <div>
              {!confirmReset ? (
                <button
                  type="button"
                  onClick={() => setConfirmReset(true)}
                  className="inline-flex items-center gap-1.5 border border-[#D8CFC0] bg-white px-3.5 py-2 text-xs font-medium text-[#586174] hover:border-[#DD6452] hover:text-[#DD6452] whitespace-nowrap shrink-0"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Limpar histórico local
                </button>
              ) : (
                <div className="flex items-center gap-2 border border-[#DD6452] bg-[#FCEAE6] px-3 py-2 text-xs">
                  <span className="font-medium text-[#1D2230]">Apagar registros?</span>
                  <button
                    type="button"
                    onClick={() => {
                      onResetAllProgress();
                      setConfirmReset(false);
                    }}
                    className="bg-[#DD6452] px-2.5 py-1 font-semibold text-white whitespace-nowrap shrink-0"
                  >
                    Confirmar
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmReset(false)}
                    className="px-2 py-1 text-[#586174] hover:text-[#1D2230] whitespace-nowrap shrink-0"
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <p className="mt-4 text-xs text-[#586174]">
          Privacidade garantida: suas escolhas e anotações ficam salvas exclusivamente no armazenamento local deste navegador.
        </p>
      </header>

      {/* Empty State if no choices made yet */}
      {narrativeState.choiceHistory.length === 0 ? (
        <section className="mt-12 border border-[#D8CFC0] bg-[#F4EFE6] p-8 sm:p-12 text-center">
          <Compass className="mx-auto h-8 w-8 text-[#244B8A]" />
          <h2 className="mt-4 font-serif text-2xl font-semibold text-[#1D2230]">
            Seu diário está esperando sua primeira decisão
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-[#586174]">
            Ao ler o Episódio 01 (“Todo Mundo Menos Eu”), você chegará a um momento
            decisivo na Página 04. Escolha como Mia reage para registrar seu caminho aqui.
          </p>
          {pilotEp && (
            <button
              type="button"
              onClick={() => onStartEpisode(pilotEp.id)}
              className="mt-6 inline-flex items-center gap-2 bg-[#244B8A] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1B3A6E] whitespace-nowrap shrink-0"
            >
              <BookOpen className="h-4 w-4" />
              Ler Episódio 01 agora
            </button>
          )}
        </section>
      ) : (
        <div className="mt-10 space-y-12">
          {/* Summary Overview Row (Non-evaluative, descriptive) */}
          <section className="grid grid-cols-1 gap-6 border border-[#E5DED0] bg-white p-6 sm:grid-cols-3">
            <div>
              <p className="text-xs font-medium text-[#586174]">
                Decisões experimentadas
              </p>
              <p className="mt-1 font-serif text-3xl font-semibold text-[#1D2230] tabular-nums">
                {narrativeState.choiceHistory.length}
              </p>
              <p className="mt-1 text-xs text-[#586174]">
                Registros cronológicos de leitura
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-[#586174]">
                Desfechos no Piloto 01
              </p>
              <p className="mt-1 font-serif text-3xl font-semibold text-[#244B8A] tabular-nums">
                {pilotProgress?.discoveredEndings?.length || 0} /{' '}
                {pilotEp?.pages.filter((p) => Boolean(p.isEnding)).length || 6}
              </p>
              <p className="mt-1 text-xs text-[#586174]">
                Consequências narrativas descobertas
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-[#586174]">
                Habilidades mobilizadas
              </p>
              <p className="mt-1.5 text-sm leading-relaxed font-medium text-[#1D2230]">
                {allMobilizedSkills.join(' · ')}
              </p>
            </div>
          </section>

          {/* Decision Cards & Personal Reflection Prompts */}
          <section className="space-y-6">
            <h2 className="font-serif text-2xl font-semibold text-[#1D2230]">
              Suas escolhas e descobertas
            </h2>

            {narrativeState.choiceHistory.map((record) => {
              const ep = episodes.find((e) => e.id === record.episodeId);
              const decisionPage = ep?.pages.find(
                (p) => p.decision?.id === record.decisionId
              );
              const otherOptions =
                decisionPage?.decision?.options.filter(
                  (o) => o.id !== record.optionId
                ) || [];

              return (
                <article
                  key={record.id}
                  className="border border-[#D8CFC0] bg-white p-6 sm:p-8"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EFE9DC] pb-3 text-xs text-[#586174]">
                    <div>
                      <span className="font-semibold text-[#1D2230]">
                        {record.episodeTitle}
                      </span>
                      <span aria-hidden="true"> · </span>
                      <span>Alternativa {record.optionKey}</span>
                    </div>
                    <time className="font-mono tabular-nums">
                      {new Date(record.timestamp).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </time>
                  </div>

                  <h3 className="mt-4 font-serif text-xl font-semibold text-[#1D2230]">
                    “{record.chosenLabel}”
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-[#384152]">
                    {record.consequenceSummary}
                  </p>

                  <div className="mt-4 text-xs text-[#586174]">
                    <span className="font-semibold text-[#244B8A]">
                      Habilidades mobilizadas nesta escolha:{' '}
                    </span>
                    {record.mobilizedSkills.join(' · ')}
                  </div>

                  {/* Reflection Box */}
                  <div className="mt-6 border border-[#E5DED0] bg-[#FBF8F3] p-5">
                    <label
                      htmlFor={`refl-${record.id}`}
                      className="block font-serif text-base font-medium text-[#1D2230]"
                    >
                      Para pensar: {record.reflectionQuestion}
                    </label>
                    <textarea
                      id={`refl-${record.id}`}
                      rows={3}
                      value={
                        narrativeState.personalReflections[record.decisionId] || ''
                      }
                      onChange={(e) =>
                        handleReflectionChange(record.decisionId, e.target.value)
                      }
                      placeholder="Se quiser, escreva aqui o que você faria ou o que achou da reação dos personagens..."
                      className="mt-3 w-full border border-[#D8CFC0] bg-white px-3.5 py-2.5 text-sm text-[#1D2230] placeholder:text-[#8C93A4] focus:border-[#244B8A] focus:outline-none"
                    />
                    <div className="mt-1.5 flex items-center justify-between text-[11px] text-[#586174]">
                      <span>Anotação privada salva neste aparelho</span>
                      {savedNoticeId === record.decisionId && (
                        <span className="font-medium text-[#244B8A]">
                          Salvo automaticamente
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Other Possibilities Section */}
                  {otherOptions.length > 0 && (
                    <div className="mt-6 border-t border-[#EFE9DC] pt-5">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold tracking-wider text-[#6E56AF] uppercase">
                            Outras possibilidades naquela manhã
                          </p>
                          <ul className="mt-2 space-y-1 text-xs text-[#586174]">
                            {otherOptions.map((o) => (
                              <li key={o.id}>
                                <span className="font-mono font-semibold text-[#1D2230]">
                                  {o.keyLabel})
                                </span>{' '}
                                {o.label}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {ep && decisionPage && (
                          <button
                            type="button"
                            onClick={() =>
                              onJumpToDecision(ep.id, decisionPage.id)
                            }
                            className="inline-flex items-center gap-1.5 border border-[#1D2230] px-4 py-2 text-xs font-medium text-[#1D2230] transition-colors hover:bg-[#1D2230] hover:text-white whitespace-nowrap shrink-0"
                          >
                            <RotateCcw className="h-3.5 w-3.5" />
                            Experimentar outro caminho
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </section>
        </div>
      )}
    </div>
  );
};
