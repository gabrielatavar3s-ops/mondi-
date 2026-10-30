import React, { useState } from 'react';
import { BubblePosition, ComicPanel, DialogueBubble } from '../types/mundie';
import { GENERATED_ASSETS } from '../data/initialMundieData';

interface ComicPanelIllustrationProps {
  panel: ComicPanel;
  panelIndex: number;
}

const POSITION_CLASSES: Record<BubblePosition, string> = {
  'top-left': 'self-start mr-auto',
  'top-right': 'self-end ml-auto',
  'bottom-left': 'self-start mr-auto mt-auto',
  'bottom-right': 'self-end ml-auto mt-auto',
  'center-left': 'self-start mr-auto my-auto',
  'center-right': 'self-end ml-auto my-auto',
};

const TINT_OVERLAYS: Record<NonNullable<ComicPanel['atmosphereTint']>, string> = {
  warm: 'bg-gradient-to-tr from-[#243757]/25 via-transparent to-[#F4C3A7]/25',
  cool: 'bg-gradient-to-b from-[#1E2E4F]/35 via-[#244B8A]/15 to-[#1A2030]/45',
  lavender: 'bg-gradient-to-tr from-[#352957]/35 via-[#7A63B6]/15 to-[#F4C3A7]/20',
  coral: 'bg-gradient-to-tr from-[#362023]/30 via-transparent to-[#DD6452]/20',
  neutral: 'bg-gradient-to-t from-[#1D2230]/25 via-transparent to-transparent',
};

const BubbleItem: React.FC<{ bubble: DialogueBubble }> = ({ bubble }) => {
  const posClass = POSITION_CLASSES[bubble.position] || 'self-start';

  if (bubble.style === 'narracao') {
    return (
      <div
        className={`max-w-[90%] sm:max-w-[76%] bg-[#FBF8F3]/96 border border-[#D8CFC0] px-4 py-3 text-[14px] sm:text-[15px] leading-relaxed text-[#1D2230] shadow-sm ${posClass}`}
      >
        {bubble.speaker && (
          <p className="mb-1 text-[11px] font-semibold tracking-wider text-[#6E56AF] uppercase">
            {bubble.speaker}
          </p>
        )}
        <p className="font-serif italic text-[#252B3B]">{bubble.text}</p>
      </div>
    );
  }

  if (bubble.style === 'pensamento') {
    return (
      <div
        className={`relative max-w-[88%] sm:max-w-[70%] rounded-2xl border border-[#C9C2E3] bg-[#F6F4FC]/95 px-4 py-3 text-[14px] sm:text-[15px] leading-snug text-[#27233A] shadow-sm backdrop-blur-[2px] ${posClass}`}
      >
        {bubble.speaker && (
          <span className="mb-1 block text-[11px] font-semibold text-[#6E56AF]">
            {bubble.speaker} · pensamento
          </span>
        )}
        <p className="italic">{bubble.text}</p>
      </div>
    );
  }

  if (bubble.style === 'sussurro') {
    return (
      <div
        className={`relative max-w-[85%] sm:max-w-[66%] rounded-2xl border border-dashed border-[#8E96A8] bg-white/95 px-4 py-2.5 text-[13.5px] sm:text-[14.5px] leading-snug text-[#394152] shadow-sm ${posClass}`}
      >
        {bubble.speaker && (
          <span className="mb-0.5 block text-[11px] font-semibold text-[#586174]">
            {bubble.speaker} (baixo)
          </span>
        )}
        <p>{bubble.text}</p>
      </div>
    );
  }

  // Default speech bubble ('fala')
  return (
    <div
      className={`relative max-w-[88%] sm:max-w-[68%] rounded-2xl border border-[#1D2230]/85 bg-white/97 px-4 py-3 text-[14px] sm:text-[15px] leading-snug text-[#1D2230] shadow-sm ${posClass}`}
    >
      {bubble.speaker && (
        <span className="mb-0.5 block text-[11px] font-bold tracking-wide text-[#244B8A] uppercase">
          {bubble.speaker}
        </span>
      )}
      <p className="font-medium">{bubble.text}</p>
    </div>
  );
};

export const ComicPanelIllustration: React.FC<ComicPanelIllustrationProps> = ({
  panel,
  panelIndex,
}) => {
  const [imgError, setImgError] = useState(false);
  const [secondaryImgError, setSecondaryImgError] = useState(false);

  const heightClass =
    panel.framing === 'wide'
      ? 'min-h-[340px] sm:min-h-[430px]'
      : panel.framing === 'split'
      ? 'min-h-[340px] sm:min-h-[400px]'
      : panel.framing === 'closeup'
      ? 'min-h-[300px] sm:min-h-[360px]'
      : 'min-h-[320px] sm:min-h-[390px]';

  const renderIllustratedArtwork = () => {
    // Special 2D Graphic-Novel Insert 1: Group Chat "Quarteto do Pátio"
    if (panel.visualPreset === 'phone-group-chat' && !panel.imageUrl) {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#2B3D63] via-[#3F537D] to-[#7A63B6] p-5 sm:p-8">
          {/* Illustrated desk ambience lines */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
            viewBox="0 0 600 400"
          >
            <line x1="0" y1="310" x2="600" y2="250" stroke="#FBF8F3" strokeWidth="1.5" />
            <rect x="44" y="250" width="130" height="95" rx="4" fill="none" stroke="#FBF8F3" strokeWidth="1.5" />
          </svg>

          {/* 2D Comic Phone Screen Card */}
          <div className="relative z-0 w-full max-w-sm rounded-2xl border-2 border-[#1D2230] bg-[#FBF8F3] p-4 shadow-md">
            <div className="flex items-center justify-between border-b border-[#E5DED0] pb-2.5">
              <div>
                <p className="text-xs font-bold text-[#1D2230]">Quarteto do Pátio</p>
                <p className="text-[11px] text-[#586174]">Ayla, Leo, Noah, Você</p>
              </div>
              <span className="font-mono text-[11px] text-[#586174] tabular-nums">16:40</span>
            </div>

            <div className="my-3.5 space-y-2.5">
              <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-xs border border-[#244B8A]/25 bg-[#DCE6F7] px-3.5 py-2.5 text-xs text-[#1D2230]">
                <p>Gente, alguém anima tomar sorvete na sexta depois da aula? Terminei os rascunhos da feira!</p>
                <div className="mt-1.5 flex items-center justify-end gap-1.5 text-[10px] text-[#244B8A]">
                  <span className="font-mono tabular-nums">16:40</span>
                  <span>· Visualizado por todos</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1 text-[11px] text-[#586174]">
                <span className="inline-block rounded-lg border border-dashed border-[#C7BFE0] bg-[#ECE7F8]/70 px-2.5 py-1 italic">
                  18:45 — nenhuma nova mensagem
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Special 2D Graphic-Novel Insert 2: Ayla's folded locker note (Path B)
    if (panel.visualPreset === 'branch-b-ayla-note' && !panel.imageUrl) {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#413663] via-[#6B5B99] to-[#E6C7BA] p-6 sm:p-10">
          <div className="relative w-full max-w-md -rotate-1 rounded-sm border border-[#1D2230]/40 bg-[#FFFDF9] p-6 shadow-md">
            {/* Grid paper lines */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #DCE6F7 1px, transparent 1px), linear-gradient(to bottom, #DCE6F7 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />
            <div className="relative flex items-center justify-between border-b border-[#E5DED0] pb-2 text-[11px] text-[#6E56AF]">
              <span>Folha destacada de caderno · Armário 14</span>
              <span>12h35</span>
            </div>
            <p className="relative mt-3 font-serif text-sm leading-relaxed text-[#27233A] italic">
              Dobrada duas vezes com um pequeno desenho de estrela roxa no canto.
            </p>
          </div>
        </div>
      );
    }

    // Special 2D Story Frame Overlay for Page 03 Saturday Story
    if (panel.visualPreset === 'saturday-story-post') {
      return (
        <div className="absolute inset-0 bg-[#232030]">
          {!imgError && panel.imageUrl && (
            <img
              src={panel.imageUrl}
              alt={panel.altText}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              style={{ objectPosition: panel.imageObjectPosition || '68% 35%' }}
              className="h-full w-full object-cover opacity-92"
            />
          )}
          {/* Story UI graphic frame */}
          <div className="pointer-events-none absolute inset-x-4 top-4 flex flex-col gap-2">
            <div className="flex gap-1.5">
              <div className="h-1 flex-1 rounded-full bg-white/90" />
              <div className="h-1 flex-1 rounded-full bg-white/35" />
            </div>
            <div className="flex items-center justify-between text-xs text-white drop-shadow-xs">
              <span className="font-semibold">@leo.sardas · Papelaria & Café Sol</span>
              <span className="font-mono text-[11px] opacity-85">18 min</span>
            </div>
          </div>
          <div className="pointer-events-none absolute right-5 bottom-16 rotate-[-2deg] rounded-md bg-[#1D2230]/85 px-3 py-1.5 text-xs font-medium text-[#FBF8F3] shadow-xs">
            “Missão cumprida (quase deu tudo errado kkk)”
          </div>
        </div>
      );
    }

    // Split diptych framing for conversational reaction beats
    if (panel.framing === 'split') {
      const secondaryImg =
        panel.visualPreset === 'friends-awkward-pause'
          ? GENERATED_ASSETS.ep01PilotScene
          : panel.visualPreset === 'branch-a-reveal'
          ? GENERATED_ASSETS.aylaPortrait
          : panel.visualPreset === 'branch-c-plan-reveal'
          ? GENERATED_ASSETS.noahPortrait
          : GENERATED_ASSETS.heroEntreNos;

      return (
        <div className="absolute inset-0 grid grid-cols-1 sm:grid-cols-2 gap-1.5 bg-[#1D2230]">
          <div className="relative h-full w-full overflow-hidden bg-[#2A3B5C]">
            {!imgError && panel.imageUrl && (
              <img
                src={panel.imageUrl}
                alt={panel.altText}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                style={{ objectPosition: panel.imageObjectPosition || 'center 22%' }}
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <div className="relative hidden sm:block h-full w-full overflow-hidden bg-[#3D3356]">
            {!secondaryImgError && (
              <img
                src={secondaryImg}
                alt=""
                aria-hidden="true"
                referrerPolicy="no-referrer"
                onError={() => setSecondaryImgError(true)}
                style={{ objectPosition: '55% 26%' }}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        </div>
      );
    }

    // Standard single-frame comic art or custom uploaded image
    if (!imgError && panel.imageUrl) {
      return (
        <img
          src={panel.imageUrl}
          alt={panel.altText}
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          style={{ objectPosition: panel.imageObjectPosition || 'center 30%' }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      );
    }

    // Resilient editorial graphic novel fallback if a custom panel awaits artwork
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#E6ECF8] via-[#F4EFE6] to-[#FBECE3] p-8 text-center">
        <p className="font-mono text-xs tracking-wider text-[#586174] uppercase">
          Quadro {String(panelIndex + 1).padStart(2, '0')} · Ilustração em preparo
        </p>
        <p className="mt-2 max-w-md font-serif text-lg text-[#1D2230]">{panel.title}</p>
        <p className="mt-1 max-w-md text-xs text-[#586174]">{panel.altText}</p>
      </div>
    );
  };

  const tintClass = TINT_OVERLAYS[panel.atmosphereTint || 'neutral'];

  return (
    <figure className="overflow-hidden border-2 border-[#1D2230] bg-[#F4EFE6] shadow-xs">
      {/* Optional Narrative Top Strip Caption */}
      {panel.sceneCaption && (
        <figcaption className="border-b-2 border-[#1D2230] bg-[#FBF8F3] px-4 py-2.5 text-[13.5px] sm:text-[14px] leading-relaxed font-medium text-[#2A3142]">
          {panel.sceneCaption}
        </figcaption>
      )}

      {/* Main Illustrated Panel Frame */}
      <div className={`relative flex flex-col justify-between p-4 sm:p-6 ${heightClass}`}>
        {renderIllustratedArtwork()}

        {/* Atmospheric Color Grade Scrim */}
        <div className={`pointer-events-none absolute inset-0 ${tintClass}`} />

        {/* Integrated Speech & Thought Bubbles */}
        <div className="relative z-10 flex flex-1 flex-col justify-between gap-4">
          {panel.bubbles.map((bubble) => (
            <BubbleItem key={bubble.id} bubble={bubble} />
          ))}
        </div>
      </div>
    </figure>
  );
};
