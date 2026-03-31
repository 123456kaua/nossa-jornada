'use client'

import type { Filter } from '@/app/page'

interface Props {
  current: Filter
  onFilter: (f: Filter) => void
  search: string
  onSearch: (v: string) => void
}

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'pending', label: 'Pendentes' },
  { value: 'done', label: 'Concluídos' },
  { value: 'at', label: '● AT' },
  { value: 'nt', label: '● NT' },
  { value: 'sal', label: '● Poético' },
]

const DOT_COLORS: Partial<Record<Filter, string>> = {
  at: '#3B6B8B',
  nt: '#A85C6E',
  sal: '#4A6741',
}

export default function FilterBar({ current, onFilter, search, onSearch }: Props) {
  return (
    <div
      className="sticky top-0 z-20 border-b"
      style={{ background: 'white', borderColor: '#F0EBE1' }}
    >
      {/* Filter pills */}
      <div className="flex gap-1.5 px-4 pt-3 pb-2 overflow-x-auto scrollbar-hide">
        {FILTERS.map(f => {
          const isActive = current === f.value
          const dotColor = DOT_COLORS[f.value]
          return (
            <button
              key={f.value}
              onClick={() => onFilter(f.value)}
              className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full transition-all duration-200 font-medium"
              style={{
                background: isActive ? '#2C2018' : '#F0EBE1',
                color: isActive
                  ? '#E8D5B0'
                  : dotColor
                  ? dotColor
                  : '#5C4A35',
                border: '1px solid transparent',
              }}
              aria-pressed={isActive}
            >
              {f.label}
            </button>
          )
        })}
      </div>

      {/* Search */}
      <div className="px-4 pb-3">
        <div className="relative">
          <span
            className="absolute left-3 top-1/2 -translate-y-1/2 text-sm pointer-events-none"
            style={{ color: '#9C8870' }}
            aria-hidden="true"
          >
            🔍
          </span>
          <input
            type="search"
            placeholder="Buscar por tema, livro ou palavra..."
            value={search}
            onChange={e => onSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg text-sm outline-none transition-all"
            style={{
              background: '#FAF7F2',
              border: '1px solid #E8D5B0',
              color: '#2C2018',
              fontSize: '14px',
            }}
          />
        </div>
      </div>

      {/* Legend */}
      <div
        className="flex items-center gap-4 px-4 pb-2.5 text-xs flex-wrap"
        style={{ color: '#9C8870' }}
      >
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full inline-block" style={{ background: '#3B6B8B' }} />
          Antigo Testamento
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full inline-block" style={{ background: '#A85C6E' }} />
          Novo Testamento
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full inline-block" style={{ background: '#4A6741' }} />
          Livros Poéticos
        </span>
      </div>
    </div>
  )
}
