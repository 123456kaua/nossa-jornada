'use client'

export default function Hero() {
  return (
    <header
      className="relative overflow-hidden text-center px-6 pt-12 pb-10"
      style={{
        background: 'linear-gradient(160deg, #1C1410 0%, #3C2A1C 40%, #6B4E2E 100%)',
      }}
    >
      {/* Star pattern overlay */}
      <div
        className="absolute inset-0 pattern-bg opacity-50"
        aria-hidden="true"
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(201,169,110,0.15) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        <div
          className="text-2xl mb-4 tracking-[0.5em] float"
          style={{ color: 'rgba(201,169,110,0.5)' }}
          aria-hidden="true"
        >
          ✦
        </div>

        <h1
          className="font-serif font-light leading-tight"
          style={{
            fontSize: 'clamp(30px, 7vw, 52px)',
            color: '#E8D5B0',
            letterSpacing: '0.05em',
          }}
        >
          Nossa Jornada
          <br />
          <em style={{ color: '#C9A96E', fontStyle: 'italic' }}>com Deus</em>
        </h1>

        <p
          className="mt-3 text-xs tracking-[0.3em] uppercase"
          style={{ color: 'rgba(232,213,176,0.55)' }}
        >
          Plano devocional para dois
        </p>

        <div
          className="inline-flex items-center gap-3 mt-5 px-5 py-2 rounded-full text-sm"
          style={{
            background: 'rgba(201,169,110,0.12)',
            border: '1px solid rgba(201,169,110,0.25)',
            color: '#E8D5B0',
          }}
        >
          <span>30 mar 2026</span>
          <span style={{ color: 'rgba(201,169,110,0.5)' }}>→</span>
          <span>31 dez 2026</span>
          <span style={{ color: 'rgba(201,169,110,0.5)' }}>·</span>
          <span>276 dias</span>
        </div>
      </div>
    </header>
  )
}
