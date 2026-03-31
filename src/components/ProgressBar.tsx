'use client'

interface Props {
  completed: number
  total: number
  percentage: number
}

const MILESTONES = [
  { pct: 25, label: '✦ 25% — Fundamentos', id: 'm25' },
  { pct: 50, label: '✦ 50% — Meio caminho', id: 'm50' },
  { pct: 75, label: '✦ 75% — Quase lá', id: 'm75' },
  { pct: 100, label: '✦ Completo!', id: 'm100' },
]

export default function ProgressBar({ completed, total, percentage }: Props) {
  return (
    <section
      className="px-5 py-5 border-b"
      style={{ background: 'white', borderColor: '#F0EBE1' }}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-xs tracking-[0.2em] uppercase"
          style={{ color: '#9C8870' }}
        >
          Progresso geral
        </span>
        <span
          className="font-serif text-xl"
          style={{ color: '#8B6E42' }}
        >
          {completed} / {total} dias ({percentage}%)
        </span>
      </div>

      {/* Progress track */}
      <div
        className="relative h-1.5 rounded-full overflow-hidden"
        style={{ background: '#F0EBE1' }}
      >
        <div
          className="absolute left-0 top-0 h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${percentage}%`,
            background: 'linear-gradient(90deg, #8B6E42, #C9A96E)',
          }}
        />
        {/* Milestone markers */}
        {MILESTONES.slice(0, 3).map(m => (
          <div
            key={m.id}
            className="absolute top-0 h-full w-px"
            style={{
              left: `${m.pct}%`,
              background: percentage >= m.pct ? 'rgba(255,255,255,0.5)' : 'rgba(201,169,110,0.3)',
            }}
          />
        ))}
      </div>

      {/* Milestone badges */}
      <div className="flex gap-2 mt-3 flex-wrap">
        {MILESTONES.map(m => {
          const done = percentage >= m.pct
          return (
            <span
              key={m.id}
              className="text-xs px-3 py-1 rounded-full transition-all duration-300"
              style={{
                background: done ? 'rgba(201,169,110,0.15)' : '#F0EBE1',
                border: done ? '1px solid rgba(201,169,110,0.4)' : '1px solid transparent',
                color: done ? '#8B6E42' : '#9C8870',
                fontWeight: done ? 500 : 400,
              }}
            >
              {m.label}
            </span>
          )
        })}
      </div>
    </section>
  )
}
