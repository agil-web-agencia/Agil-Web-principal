import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  showText?: boolean;
  withBadge?: boolean;
}

export default function AgilwebLogo({ 
  className = '', 
  size = 'md', 
  showText = true,
  withBadge = false 
}: LogoProps) {
  let iconSize = 32;
  let textClass = 'text-xl';
  let subClass = 'text-[10px]';

  if (typeof size === 'number') {
    iconSize = size;
    if (size <= 24) { textClass = 'text-base'; subClass = 'text-[8px]'; }
    else if (size <= 36) { textClass = 'text-xl'; subClass = 'text-[10px]'; }
    else if (size <= 48) { textClass = 'text-2xl'; subClass = 'text-[11px]'; }
    else { textClass = 'text-4xl'; subClass = 'text-xs'; }
  } else {
    const sizeMap = {
      sm: { icon: 24, text: 'text-lg', sub: 'text-[9px]' },
      md: { icon: 32, text: 'text-xl', sub: 'text-[10px]' },
      lg: { icon: 42, text: 'text-2xl', sub: 'text-[11px]' },
      xl: { icon: 56, text: 'text-4xl', sub: 'text-xs' }
    };
    iconSize = sizeMap[size]?.icon || 32;
    textClass = sizeMap[size]?.text || 'text-xl';
    subClass = sizeMap[size]?.sub || 'text-[10px]';
  }

  return (
    <div className={`inline-flex items-center gap-3 select-none group ${className}`}>
      {/* 3D Kinetic Isometric 'A' Prism Logo Glyph */}
      <div 
        className="relative flex items-center justify-center shrink-0"
        style={{ width: iconSize, height: iconSize }}
      >
        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-primary/30 rounded-xl blur-md group-hover:bg-primary/50 group-hover:blur-lg transition-all duration-500 opacity-80" />
        
        {/* SVG Isometric 'A' Symbol */}
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full relative z-10 filter drop-shadow-[0_0_8px_rgba(19,236,91,0.6)] group-hover:scale-105 transition-transform duration-300"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="agilweb-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#13EC5B" />
              <stop offset="50%" stopColor="#00F59B" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="agilweb-grad-2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>
            <linearGradient id="agilweb-core" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#13EC5B" />
            </linearGradient>
          </defs>

          {/* Isometric Diamond / Triangular Base Facet */}
          <polygon 
            points="50,6 92,78 72,78 50,42 28,78 8,78" 
            fill="url(#agilweb-grad-1)" 
            className="transition-all duration-500 group-hover:brightness-110"
          />

          {/* Inner Dimensional Bridge (The 'A' Crossbar & Modern Cut) */}
          <polygon 
            points="50,48 70,82 58,94 42,94 30,82" 
            fill="url(#agilweb-grad-2)" 
            opacity="0.9"
          />

          {/* Central Apex Core Prism */}
          <polygon 
            points="50,14 62,38 38,38" 
            fill="url(#agilweb-core)" 
            opacity="0.95"
          />

          {/* Quantum Dot / Vertex Spark */}
          <circle cx="50" cy="8" r="3.5" fill="#FFFFFF" className="animate-pulse" />
          <circle cx="92" cy="78" r="2.5" fill="#13EC5B" />
          <circle cx="8" cy="78" r="2.5" fill="#8B5CF6" />
        </svg>
      </div>

      {/* Brand Text Typography */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5 leading-none">
            <span className={`${textClass} font-black tracking-[-0.04em] text-white group-hover:text-primary transition-colors font-display`}>
              Agil<span className="text-primary group-hover:text-white transition-colors">web</span>
            </span>
            <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/10 text-primary/90 border border-primary/30">
              WEB
            </span>
          </div>

          {withBadge && (
            <span className={`${subClass} text-gray-400 font-mono tracking-widest uppercase mt-0.5`}>
              ESTUDIO DIGITAL // CONVERSIÓN
            </span>
          )}
        </div>
      )}
    </div>
  );
}
