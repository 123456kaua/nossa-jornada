'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  loadProgressFromCloud,
  markDayComplete,
  unmarkDayComplete,
  subscribeToProgress,
} from './supabase'

const LOCAL_KEY = 'njcd_completed_v2'
const COUPLE_ID_KEY = 'njcd_couple_id'

function loadLocal(): Set<number> {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = localStorage.getItem(LOCAL_KEY)
    if (raw) return new Set(JSON.parse(raw) as number[])
  } catch {}
  return new Set()
}

function saveLocal(completed: Set<number>) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify([...completed]))
  } catch {}
}

export function getCoupleId(): string {
  return "marido e mulher"
}

console.log("COUPLE ID:", coupleId)

export function useProgress() {
  const [completed, setCompleted] = useState<Set<number>>(new Set())
  const [isLoaded, setIsLoaded] = useState(false)
  const [coupleId, setCoupleId] = useState('')
  const [isSyncing, setIsSyncing] = useState(false)

  useEffect(() => {
    const local = loadLocal()
    setCompleted(local)
    const id = getCoupleId()
    setCoupleId(id)

    // Try to merge with cloud
    loadProgressFromCloud(id).then((cloud) => {
      if (cloud.size > 0) {
        const merged = new Set([...local, ...cloud])
        setCompleted(merged)
        saveLocal(merged)
      }
      setIsLoaded(true)
    }).catch(() => {
      setIsLoaded(true)
    })
  }, [])

  // Real-time subscription
  useEffect(() => {
    if (!coupleId) return
    const unsub = subscribeToProgress(coupleId, (dayNum, isComplete) => {
      setCompleted(prev => {
        const next = new Set(prev)
        if (isComplete) next.add(dayNum)
        else next.delete(dayNum)
        saveLocal(next)
        return next
      })
    })
    return unsub
  }, [coupleId])

  const toggleDay = useCallback(async (dayNum: number, userName?: string) => {
    setCompleted(prev => {
      const next = new Set(prev)
      const willComplete = !prev.has(dayNum)
      if (willComplete) next.add(dayNum)
      else next.delete(dayNum)
      saveLocal(next)
      
      // Sync to cloud in background
      if (willComplete) {
        markDayComplete(coupleId, dayNum, userName || 'partner')
      } else {
        unmarkDayComplete(coupleId, dayNum)
      }
      
      return next
    })
  }, [coupleId])

  const isComplete = useCallback((dayNum: number) => completed.has(dayNum), [completed])
  const completedCount = completed.size
  const totalDays = 276
  const percentage = Math.round((completedCount / totalDays) * 100)

  return {
    completed,
    isLoaded,
    coupleId,
    isSyncing,
    toggleDay,
    isComplete,
    completedCount,
    totalDays,
    percentage,
  }
}
