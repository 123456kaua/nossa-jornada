'use client'

import type { Bloco } from '@/lib/data'

interface Props {
  bloco: Bloco
  completedInBloco: number
  totalInBloco: number
}

export default function BlocoHeader({ bloco, completedInBloco, totalInBloco }: Props) {
  const pct = totalInBloco > 0 ? Math.round((completedInBloco / totalInBloco) * 100) : 0

  return (
    <div className="mt-8 mb-4 first:mt-4">
      <div className="flex items-end justify-between mb-1">
        <div>
          <span
            className="text-xs tracking-[0.25em] uppercase font-medium"
            style={{ color: bloco.color }}
          >
            Bloco {bloco.num}
          </span>
          <h2
            className="font-serif text-xl leading-tight mt-0.5"
            style={{ color: '#2C2018' }}
          >
            {bloco.title}
          </h2>
          <p
            className="text-xs mt-0.5"
            style={{ color: '#9C8870' }}
          >
            {bloco.subtitle}
          </p>
        </div>
        <span
          className="text-xs mb-1 flex-shrink-0 ml-4"
          style={{ color: '#9C8870' }}
        >
          {completedInBloco}/{totalInBloco}
        </span>
      </div>
      {/* Mini progress for this bloco */}
      <div
        className="h-0.5 rounded-full overflow-hidden mt-2"
        style={{ background: '#F0EBE1' }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            background: bloco.color,
            opacity: 0.7,
          }}
        />
      </div>
    </div>
  )
}
