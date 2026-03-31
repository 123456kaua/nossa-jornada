import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export interface CompletionRecord {
  id: string
  couple_id: string
  day_number: number
  completed_at: string
  completed_by: string
}

// SQL to create the table in Supabase:
/*
create table couple_progress (
  id uuid default gen_random_uuid() primary key,
  couple_id text not null,
  day_number int not null,
  completed_at timestamptz default now(),
  completed_by text,
  unique(couple_id, day_number)
);

-- Enable realtime
alter publication supabase_realtime add table couple_progress;
*/

export async function loadProgressFromCloud(coupleId: string): Promise<Set<number>> {
  if (!supabase) return new Set()
  
  const { data, error } = await supabase
    .from('couple_progress')
    .select('day_number')
    .eq('couple_id', coupleId)
  
  if (error || !data) return new Set()
  return new Set(data.map((r: { day_number: number }) => r.day_number))
}

export async function markDayComplete(
  coupleId: string, 
  dayNumber: number, 
  completedBy: string
): Promise<boolean> {
  if (!supabase) return false
  
  const { error } = await supabase
    .from('couple_progress')
    .upsert({ couple_id: coupleId, day_number: dayNumber, completed_by: completedBy })
  
  return !error
}

export async function unmarkDayComplete(
  coupleId: string, 
  dayNumber: number
): Promise<boolean> {
  if (!supabase) return false
  
  const { error } = await supabase
    .from('couple_progress')
    .delete()
    .eq('couple_id', coupleId)
    .eq('day_number', dayNumber)
  
  return !error
}

export function subscribeToProgress(
  coupleId: string,
  onUpdate: (dayNumber: number, isComplete: boolean) => void
) {
  if (!supabase) return () => {}
  
  const channel = supabase
    .channel(`progress:${coupleId}`)
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'couple_progress', filter: `couple_id=eq.${coupleId}` },
      (payload) => onUpdate(payload.new.day_number, true)
    )
    .on(
      'postgres_changes',
      { event: 'DELETE', schema: 'public', table: 'couple_progress', filter: `couple_id=eq.${coupleId}` },
      (payload) => onUpdate(payload.old.day_number, false)
    )
    .subscribe()
  
  return () => supabase?.removeChannel(channel)
}
