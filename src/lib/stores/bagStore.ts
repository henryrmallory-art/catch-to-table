import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CatchEntry {
  speciesId: string
  speciesName: string
  timestamp: number
  length: number | null
  kept: boolean
}

interface BagState {
  // Trip info
  tripStartTime: number | null
  crewSize: number
  lastResetCheck: number

  // Catches
  catches: CatchEntry[]

  // Actions
  addCatch: (speciesId: string, speciesName: string, length: number | null, kept: boolean) => void
  removeCatch: (index: number) => void
  setCrewSize: (size: number) => void
  getCatchesBySpecies: (speciesId: string) => CatchEntry[]
  getKeptCountBySpecies: (speciesId: string) => number
  getTotalKept: () => number
  getTotalCatches: () => number
  checkMidnightReset: () => void
  resetTrip: () => void
}

function shouldResetAtMidnight(lastCheck: number): boolean {
  const now = new Date()
  const lastCheckDate = new Date(lastCheck)

  // Reset if it's a new day
  return now.toDateString() !== lastCheckDate.toDateString()
}

export const useBagStore = create<BagState>()(
  persist(
    (set, get) => ({
      tripStartTime: Date.now(),
      crewSize: 1,
      lastResetCheck: Date.now(),
      catches: [],

      addCatch: (speciesId, speciesName, length, kept) => {
        // Auto-check for midnight reset before adding
        get().checkMidnightReset()

        set((state) => ({
          catches: [
            ...state.catches,
            {
              speciesId,
              speciesName,
              timestamp: Date.now(),
              length,
              kept,
            },
          ],
        }))
      },

      removeCatch: (index) => {
        set((state) => ({
          catches: state.catches.filter((_, i) => i !== index),
        }))
      },

      setCrewSize: (size) => {
        set({ crewSize: Math.max(1, size) })
      },

      getCatchesBySpecies: (speciesId) => {
        return get().catches.filter((c) => c.speciesId === speciesId)
      },

      getKeptCountBySpecies: (speciesId) => {
        return get().catches.filter((c) => c.speciesId === speciesId && c.kept).length
      },

      getTotalKept: () => {
        return get().catches.filter((c) => c.kept).length
      },

      getTotalCatches: () => {
        return get().catches.length
      },

      checkMidnightReset: () => {
        const { lastResetCheck } = get()

        if (shouldResetAtMidnight(lastResetCheck)) {
          console.log('Midnight reset triggered')
          get().resetTrip()
        } else {
          set({ lastResetCheck: Date.now() })
        }
      },

      resetTrip: () => {
        set({
          tripStartTime: Date.now(),
          lastResetCheck: Date.now(),
          catches: [],
        })
      },
    }),
    {
      name: 'catch-to-table-bag-storage',
    }
  )
)
