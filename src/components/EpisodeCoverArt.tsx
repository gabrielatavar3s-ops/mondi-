import React, { useState } from 'react';
import { Episode } from '../types/mundie';
import { GENERATED_ASSETS } from '../data/initialMundieData';

interface EpisodeCoverArtProps {
  episode: Episode;
  className?: string;
}

const COVER_CONFIG: Record<
  string,
  {
    bgGradient: string;
    accentColor: string;
    imageSrc: string;
    objectPosition: string;
    overlayTint: string;
    motif: 'lockers' | 'camera' | 'court' | 'nightchat' | 'notes' | 'houses' | 'mirror' | 'headphones' | 'print' | 'steps';
  }
> = {
  ep01: {
    bgGradient: 'from-[#244B8A] via-[#4C6BA3] to-[#F4C3A7]',
    accentColor: '#F4C3A7',
    imageSrc: GENERATED_ASSETS.ep01PilotScene,
    objectPosition: '76% center',
    overlayTint: 'from-[#17233B]/85 via-[#17233B]/35 to-transparent',
    motif: 'lockers',
  },
  ep02: {
    bgGradient: 'from-[#DD6452] via-[#E99B82] to-[#FBF8F3]',
    accentColor: '#FCEAE6',
    imageSrc: GENERATED_ASSETS.leoPortrait,
    objectPosition: 'center 22%',
    overlayTint: 'from-[#2E1A18]/85 via-[#2E1A18]/30 to-transparent',
    motif: 'camera',
  },
  ep03: {
    bgGradient: 'from-[#335C87] via-[#6C8CB3] to-[#F3C8AE]',
    accentColor: '#FBECE3',
    imageSrc: GENERATED_ASSETS.noahPortrait,
    objectPosition: 'center 18%',
    overlayTint: 'from-[#182638]/85 via-[#182638]/35 to-transparent',
    motif: 'court',
  },
  ep04: {
    bgGradient: 'from-[#2D274B] via-[#5E508D] to-[#9B8EC7]',
    accentColor: '#ECE7F8',
    imageSrc: GENERATED_ASSETS.aylaPortrait,
    objectPosition: 'center 20%',
    overlayTint: 'from-[#19152C]/90 via-[#19152C]/45 to-[#2D274B]/20',
    motif: 'nightchat',
  },
  ep05: {
    bgGradient: 'from-[#23436E] via-[#4D729E] to-[#E8D8C8]',
    accentColor: '#DCE6F7',
    imageSrc: GENERATED_ASSETS.noahPortrait,
    objectPosition: '50% 25%',
    overlayTint: 'from-[#142338]/88 via-[#142338]/35 to-transparent',
    motif: 'notes',
  },
  ep06: {
    bgGradient: 'from-[#8F5347] via-[#C98A72] to-[#F5DFCE]',
    accentColor: '#FBECE3',
    imageSrc: GENERATED_ASSETS.heroEntreNos,
    objectPosition: '28% center',
    overlayTint: 'from-[#2B1D1A]/85 via-[#2B1D1A]/35 to-transparent',
    motif: 'houses',
  },
  ep07: {
    bgGradient: 'from-[#2C4E86] via-[#7A63B6] to-[#F2C6B2]',
    accentColor: '#ECE7F8',
    imageSrc: GENERATED_ASSETS.miaPortrait,
    objectPosition: 'center 18%',
    overlayTint: 'from-[#1B2238]/85 via-[#1B2238]/30 to-transparent',
    motif: 'mirror',
  },
  ep08: {
    bgGradient: 'from-[#4F3F7A] via-[#8574B5] to-[#DFD8F2]',
    accentColor: '#ECE7F8',
    imageSrc: GENERATED_ASSETS.aylaPortrait,
    objectPosition: 'center 28%',
    overlayTint: 'from-[#1F1A33]/88 via-[#1F1A33]/38 to-transparent',
    motif: 'headphones',
  },
  ep09: {
    bgGradient: 'from-[#3B3042] via-[#8F4D49] to-[#E6A38E]',
    accentColor: '#FCEAE6',
    imageSrc: GENERATED_ASSETS.leoPortrait,
    objectPosition: 'center 26%',
    overlayTint: 'from-[#231922]/90 via-[#231922]/45 to-transparent',
    motif: 'print',
  },
  ep10: {
    bgGradient: 'from-[#244B8A] via-[#7A63B6] to-[#F4C3A7]',
    accentColor: '#FBF8F3',
    imageSrc: GENERATED_ASSETS.heroEntreNos,
    objectPosition: 'center center',
    overlayTint: 'from-[#1A2030]/85 via-[#1A2030]/30 to-transparent',
    motif: 'steps',
  },
};

export const EpisodeCoverArt: React.FC<EpisodeCoverArtProps> = ({
  episode,
  className = '',
}) => {
  const [imgFailed, setImgFailed] = useState(false);
  const cfg = COVER_CONFIG[episode.coverVariant] || COVER_CONFIG.ep01;
  const effectiveImage = episode.customCoverUrl || cfg.imageSrc;
  const formattedNumber = String(episode.number).padStart(2, '0');

  return (
    <div
      className={`relative aspect-[3/4] w-full overflow-hidden bg-gradient-to-br ${cfg.bgGradient} select-none ${className}`}
    >
      {/* Artwork layer with Zero-Broken-Image resilient fallback */}
      {!imgFailed && effectiveImage && (
        <img
          src={effectiveImage}
          alt={`Capa ilustrada do episódio ${formattedNumber}: ${episode.title}`}
          referrerPolicy="no-referrer"
          onError={() => setImgFailed(true)}
          style={{ objectPosition: cfg.objectPosition }}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      )}

      {/* Subtle graphic-novel motif overlay differentiating each cover */}
      <svg
        aria-hidden="true"
        viewBox="0 0 300 400"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-35 mix-blend-screen"
      >
        <rect
          x="12"
          y="12"
          width="276"
          height="376"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="0.8"
          strokeOpacity="0.55"
        />
        {cfg.motif === 'camera' && (
          <g stroke="#FFF" strokeWidth="1.2" fill="none" opacity="0.7">
            <path d="M32 62 V38 H56" />
            <path d="M268 62 V38 H244" />
            <path d="M32 260 V284 H56" />
            <path d="M268 260 V284 H244" />
          </g>
        )}
        {cfg.motif === 'nightchat' && (
          <g fill="#FFFFFF" opacity="0.22">
            <rect x="34" y="54" width="136" height="28" rx="10" />
            <rect x="120" y="94" width="144" height="28" rx="10" />
            <circle cx="140" cy="142" r="3" />
            <circle cx="150" cy="142" r="3" />
            <circle cx="160" cy="142" r="3" />
          </g>
        )}
        {cfg.motif === 'print' && (
          <g stroke="#FFFFFF" strokeDasharray="5 4" strokeWidth="1.3" fill="none" opacity="0.65">
            <rect x="28" y="48" width="244" height="190" />
          </g>
        )}
        {cfg.motif === 'notes' && (
          <g stroke="#FFFFFF" strokeWidth="0.7" opacity="0.3">
            <line x1="24" y1="68" x2="276" y2="68" />
            <line x1="24" y1="98" x2="276" y2="98" />
            <line x1="24" y1="128" x2="276" y2="128" />
          </g>
        )}
        {cfg.motif === 'mirror' && (
          <line
            x1="150"
            y1="20"
            x2="150"
            y2="380"
            stroke="#FFFFFF"
            strokeWidth="0.9"
            strokeOpacity="0.4"
          />
        )}
      </svg>

      {/* Measured contrast scrim for editorial legibility */}
      <div className={`absolute inset-0 bg-gradient-to-t ${cfg.overlayTint}`} />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 to-transparent" />

      {/* Editorial Masthead on Cover */}
      <div className="absolute inset-x-5 top-5 flex items-center justify-between text-[11px] font-medium tracking-[0.14em] text-white/90">
        <span>MUNDIÊ · ENTRE NÓS</span>
        <span className="font-mono tabular-nums">EP. {formattedNumber}</span>
      </div>

      {/* Bottom Book-Jacket Title Lockup */}
      <div className="absolute inset-x-5 bottom-5 flex flex-col justify-end">
        <p className="mb-1.5 text-[11px] font-medium text-white/80">
          {episode.theme}
        </p>
        <h3 className="font-serif text-xl leading-snug font-semibold text-white drop-shadow-xs">
          {episode.title}
        </h3>
      </div>
    </div>
  );
};
