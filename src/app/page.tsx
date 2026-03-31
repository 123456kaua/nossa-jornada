'use client'

import { useState, useMemo } from 'react'
import { DAYS_DATA, BLOCOS, type Tipo } from '@/lib/data'
import { useProgress } from '@/lib/useProgress'
import Hero from '@/components/Hero'
import ProgressBar from '@/components/ProgressBar'
import FilterBar from '@/components/FilterBar'
import DayCard from '@/components/DayCard'
import BlocoHeader from '@/components/BlocoHeader'
import SyncBadge from '@/components/SyncBadge'

export type Filter = 'all' | 'done' | 'pending' | 'at' | 'nt' | 'sal'

export default function Home() {
  const [filter, setFilter] = useState<Filter>('all')
  const [search, setSearch] = useState('')
  const [expandedDay, setExpandedDay] = useState<number | null>(null)
  const progress = useProgress()

  const filteredDays = useMemo(() => {
    const q = search.toLowerCase()
    return DAYS_DATA.filter(day => {
      if (filter === 'done' && !progress.isComplete(day.d)) return false
      if (filter === 'pending' && progress.isComplete(day.d)) return false
      if (filter === 'at' && day.tipo !== 'at') return false
      if (filter === 'nt' && day.tipo !== 'nt') return false
      if (filter === 'sal' && day.tipo !== 'sal') return false
      if (q) {
        const text = `${day.theme} ${day.ref} ${day.reflexao} ${day.oracao}`.toLowerCase()
        if (!text.includes(q)) return false
      }
      return true
    })
  }, [filter, search, progress.completed])

  // Group days by bloco for display
  const groupedDays = useMemo(() => {
    const groups: { blocoNum: number; days: typeof DAYS_DATA }[] = []
    let currentBloco = -1
    
    for (const day of filteredDays) {
      if (day.bloco !== currentBloco) {
        currentBloco = day.bloco
        groups.push({ blocoNum: day.bloco, days: [] })
      }
      groups[groups.length - 1].days.push(day)
    }
    return groups
  }, [filteredDays])

  const handleToggle = (dayNum: number) => {
    progress.toggleDay(dayNum)
  }

  const handleExpand = (dayNum: number) => {
    setExpandedDay(prev => prev === dayNum ? null : dayNum)
  }

  return (
    <main className="max-w-2xl mx-auto pb-16">
      <Hero />
      
      <ProgressBar
        completed={progress.completedCount}
        total={progress.totalDays}
        percentage={progress.percentage}
      />

      <SyncBadge coupleId={progress.coupleId} />

      <FilterBar
        current={filter}
        onFilter={setFilter}
        search={search}
        onSearch={setSearch}
      />

      <div className="px-4">
        {groupedDays.length === 0 ? (
          <div className="text-center py-16 text-ink-light font-serif italic text-lg">
            Nenhum dia encontrado para esse filtro.
          </div>
        ) : (
          groupedDays.map(group => (
            <div key={group.blocoNum}>
              <BlocoHeader 
                bloco={BLOCOS[group.blocoNum - 1]} 
                completedInBloco={group.days.filter(d => progress.isComplete(d.d)).length}
                totalInBloco={group.days.length}
              />
              {group.days.map(day => (
                <DayCard
                  key={day.d}
                  day={day}
                  isComplete={progress.isComplete(day.d)}
                  isExpanded={expandedDay === day.d}
                  onToggle={handleToggle}
                  onExpand={handleExpand}
                />
              ))}
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="text-center mt-12 pb-8 px-4">
        <div className="text-gold opacity-60 text-xl mb-3">✦ ✦ ✦</div>
        <p className="font-serif italic text-ink-light text-sm">
          &ldquo;E se alguém puder vencer um só, dois resistirão contra ele;
          <br />o cordão de três dobras não se rompe facilmente.&rdquo;
        </p>
        <p className="text-xs text-ink-light/60 mt-1 tracking-widest uppercase">Eclesiastes 4:12</p>
      </div>
    </main>
  )
}
