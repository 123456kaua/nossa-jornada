'use client'

import { useState } from 'react'

interface Props {
  coupleId: string
}

export default function SyncBadge({ coupleId }: Props) {
  const [copied, setCopied] = useState(false)

  if (!coupleId) return null

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(coupleId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  return (
    <div
      className="mx-4 my-3 px-4 py-2.5 rounded-xl flex items-center justify-between gap-3"
      style={{
        background: 'white',
        border: '1px solid #F0EBE1',
      }}
    >
      <div className="min-w-0">
        <div
          className="text-xs tracking-[0.15em] uppercase mb-0.5"
          style={{ color: '#9C8870' }}
        >
          Código do casal
        </div>
        <div
          className="font-mono text-sm font-medium"
          style={{ color: '#2C2018' }}
        >
          {coupleId}
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={copy}
          className="text-xs px-3 py-1.5 rounded-lg transition-all duration-200"
          style={{
            background: copied ? 'rgba(74,103,65,0.1)' : '#FAF7F2',
            border: '1px solid #E8D5B0',
            color: copied ? '#4A6741' : '#8B6E42',
          }}
          title="Copiar código para sincronizar com o parceiro"
        >
          {copied ? '✓ Copiado' : 'Copiar'}
        </button>
        <div
          className="w-2 h-2 rounded-full"
          style={{ background: '#7AAB6B' }}
          title="Progresso salvo localmente"
        />
      </div>
    </div>
  )
}
