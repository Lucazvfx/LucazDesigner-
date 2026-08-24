import { useMemo } from 'react'

/**
 * Fundo cinematográfico: gradiente radial laranja, linhas curvas douradas,
 * respingos de molho e partículas. Tudo em SVG/CSS — zero requisição extra.
 */
export function AmbientBackdrop({ particles = 18, animated = true }) {
  const dust = useMemo(
    () =>
      Array.from({ length: particles }, (_, i) => ({
        id: i,
        left: `${(i * 37.4) % 100}%`,
        bottom: `${-10 + ((i * 13) % 40)}%`,
        size: 2 + (i % 4),
        duration: `${9 + (i % 7) * 1.6}s`,
        delay: `${(i % 9) * 0.9}s`,
        gold: i % 3 === 0,
      })),
    [particles]
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Base + glow radial laranja */}
      <div className="absolute inset-0 bg-coffee-800" />
      <div className="absolute inset-0 bg-radial-flame" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-coffee-900 to-transparent" />

      {/* Linhas curvas finas douradas */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.35]"
        viewBox="0 0 1200 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <linearGradient id="goldLine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0" />
            <stop offset="45%" stopColor="#e8c860" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M-60 260 C 260 60 620 120 900 -30" stroke="url(#goldLine)" strokeWidth="1.5" />
        <path d="M-60 700 C 300 560 700 780 1260 600" stroke="url(#goldLine)" strokeWidth="1.5" />
        <path d="M1260 180 C 980 300 860 520 980 900" stroke="url(#goldLine)" strokeWidth="1.2" />
        <circle cx="180" cy="150" r="120" stroke="url(#goldLine)" strokeWidth="1" />
        <circle cx="1040" cy="740" r="180" stroke="url(#goldLine)" strokeWidth="1" />
      </svg>

      {/* Meia-tinta pontilhada, como nas artes do feed */}
      <svg className="absolute left-0 top-0 h-64 w-64 opacity-30" viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <pattern id="dots" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.1" fill="#c8102e" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#dots)" />
      </svg>

      {/* Respingos estilizados de molho */}
      <svg
        className="absolute -right-10 top-1/4 h-72 w-72 opacity-[0.22]"
        viewBox="0 0 200 200"
        fill="#f5821f"
        aria-hidden="true"
      >
        <path d="M40 96c0-26 22-48 48-48 30 0 44 18 62 18 10 0 18 8 18 18s-10 16-20 20c-18 8-24 30-46 34-30 6-62-14-62-42Z" />
        <circle cx="24" cy="60" r="7" />
        <circle cx="152" cy="150" r="5" />
        <circle cx="46" cy="156" r="9" />
      </svg>

      {/* Partículas flutuantes */}
      {animated && (
        <div className="absolute inset-0">
          {dust.map((p) => (
            <span
              key={p.id}
              className="absolute rounded-full animate-drift"
              style={{
                left: p.left,
                bottom: p.bottom,
                width: p.size,
                height: p.size,
                animationDuration: p.duration,
                animationDelay: p.delay,
                backgroundColor: p.gold ? '#d4af37' : '#ff9d2e',
                boxShadow: `0 0 ${p.size * 3}px ${p.gold ? '#d4af37' : '#ff9d2e'}`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
