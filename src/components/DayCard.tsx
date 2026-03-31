'use client'

import { type Day } from '@/lib/data'

interface Props {
  day: Day
  isComplete: boolean
  isExpanded: boolean
  onToggle: (d: number) => void
  onExpand: (d: number) => void
}

const TIPO_COLORS = {
  at: '#3B6B8B',
  nt: '#A85C6E',
  sal: '#4A6741',
}

export default function DayCard({ day, isComplete, isExpanded, onToggle, onExpand }: Props) {
  const dotColor = TIPO_COLORS[day.tipo]

  return (
    <article
      className="rounded-xl mb-2 overflow-hidden transition-all duration-200"
      style={{
        background: isComplete ? '#F5FBF3' : 'white',
        border: isComplete
          ? '1px solid rgba(122,171,107,0.4)'
          : '1px solid #F0EBE1',
        boxShadow: isExpanded ? '0 4px 20px rgba(44,32,24,0.08)' : 'none',
      }}
    >
      {/* Header row */}
      <div
        className="w-full text-left px-4 py-3.5 flex items-center gap-3 group cursor-pointer"
        onClick={() => onExpand(day.d)}
        aria-expanded={isExpanded}
        role="button"
      >
        {/* Check button */}
        <button
          className="flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-200 relative z-10"
          onClick={e => { e.stopPropagation(); onToggle(day.d) }}
          aria-label={isComplete ? 'Desmarcar dia' : 'Marcar como concluído'}
          style={{
            borderColor: isComplete ? '#7AAB6B' : '#D4C4B0',
            background: isComplete ? '#7AAB6B' : 'transparent',
          }}
        >
          {isComplete && (
            <span className="text-white text-xs font-bold leading-none">✓</span>
          )}
        </button>

        {/* Day number */}
        <span
          className="font-serif text-sm flex-shrink-0 w-12"
          style={{ color: '#9C8870' }}
        >
          Dia {day.d}
        </span>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div
            className="text-xs tracking-widest uppercase mb-0.5"
            style={{ color: '#9C8870' }}
          >
            {day.date}
          </div>
          <div
            className="font-serif text-base leading-tight truncate"
            style={{
              color: isComplete ? '#4A6741' : '#2C2018',
              textDecoration: isComplete ? 'line-through' : 'none',
              textDecorationColor: 'rgba(122,171,107,0.5)',
            }}
          >
            {day.theme}
          </div>
        </div>

        {/* Type dot */}
        <span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: dotColor }}
          title={day.tipo === 'at' ? 'Antigo Testamento' : day.tipo === 'nt' ? 'Novo Testamento' : 'Poético'}
        />

        {/* Reference badge */}
        <span
          className="text-xs px-2 py-1 rounded flex-shrink-0 hidden sm:block font-medium"
          style={{
            background: '#FEF9EE',
            border: '1px solid #E8D5B0',
            color: '#8B6E42',
          }}
        >
          {day.ref}
        </span>

        {/* Expand arrow */}
        <span
          className="text-xs flex-shrink-0 transition-transform duration-200"
          style={{
            color: '#9C8870',
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
          aria-hidden="true"
        >
          ▾
        </span>
      </div>

      {/* Expanded body */}
      {isExpanded && (
        <div
          className="px-5 pb-5 pt-1 animate-fade-in"
          style={{ borderTop: '1px solid #F0EBE1' }}
        >
          {/* Ref badge (mobile) */}
          <div className="sm:hidden mb-3">
            <span
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium"
              style={{
                background: '#FEF9EE',
                border: '1px solid #E8D5B0',
                color: '#8B6E42',
              }}
            >
              📖 Leitura de hoje: {day.ref}
            </span>
          </div>

          {/* Desktop ref */}
          <div className="hidden sm:block mb-3">
            <span
              className="inline-flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg font-medium"
              style={{
                background: '#FEF9EE',
                border: '1px solid #E8D5B0',
                color: '#8B6E42',
              }}
            >
              📖 Leitura de hoje: {day.ref}
            </span>
          </div>

          {/* Reflexão */}
          <div
            className="text-xs tracking-[0.2em] uppercase mb-2"
            style={{ color: '#C9A96E' }}
          >
            Reflexão
          </div>
          <p
            className="font-serif text-base leading-relaxed mb-4"
            style={{ color: '#5C4A35' }}
          >
            {day.reflexao}
          </p>

          {/* Oração */}
          <div
            className="rounded-lg p-4"
            style={{
              background: 'linear-gradient(135deg, #FAF5EE, #F5EDE0)',
              borderLeft: '3px solid #C9A96E',
              borderRadius: '0 8px 8px 0',
            }}
          >
            <div className="text-sm mb-1" aria-hidden="true">🙏</div>
            <div
              className="text-xs tracking-[0.2em] uppercase mb-2"
              style={{ color: '#C9A96E' }}
            >
              Motivo de oração
            </div>
            <p
              className="font-serif italic text-sm leading-relaxed"
              style={{ color: '#5C4A35' }}
            >
              {day.oracao}
            </p>
          </div>

          {/* Mark complete button */}
          <button
            onClick={() => onToggle(day.d)}
            className="mt-4 w-full py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
            style={{
              background: isComplete ? 'transparent' : '#2C2018',
              color: isComplete ? '#9C8870' : '#E8D5B0',
              border: isComplete ? '1px solid #D4C4B0' : '1px solid transparent',
            }}
          >
            {isComplete ? '↩ Desmarcar dia' : '✓ Marcar como concluído'}
          </button>
        </div>
      )}
    </article>
  )
}