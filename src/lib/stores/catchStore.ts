import { create } from 'zustand'

export type FlowStep = 'camera' | 'species' | 'legality' | 'measure' | 'handling' | 'recipe' | 'done'

interface CatchState {
  // Flow
  currentStep: FlowStep
  setStep: (step: FlowStep) => void

  // Photo
  photoBase64: string | null
  photoUrl: string | null
  setPhoto: (base64: string, url?: string) => void

  // Location
  latitude: number | null
  longitude: number | null
  jurisdictionId: string | null
  jurisdictionName: string | null
  fishingMode: 'shore' | 'private_boat' | 'for_hire'
  setLocation: (lat: number, lng: number) => void
  setJurisdiction: (id: string, name: string) => void
  setFishingMode: (mode: 'shore' | 'private_boat' | 'for_hire') => void

  // Species
  speciesSuggestions: Array<{
    commonName: string
    scientificName: string
    confidence: number
    keyFeatures: string[]
    speciesId?: string
    dbMatch?: any
  }>
  confirmedSpecies: string | null // species ID
  confirmedSpeciesName: string | null
  setSuggestions: (suggestions: any[]) => void
  confirmSpecies: (id: string, name: string) => void

  // Legality
  legalityResult: {
    canKeep: boolean
    reasons: string[]
    regulation: any
    jurisdiction?: any
    regulations?: any[]
    boundaryWarning?: string | null
  } | null
  setLegality: (result: any) => void

  // Measurement
  measuredLength: number | null
  measurementMethod: 'ar_ruler' | 'reference_object' | 'manual' | null
  setMeasurement: (length: number, method: 'ar_ruler' | 'reference_object' | 'manual') => void

  // Decision
  decision: 'keep' | 'release' | null
  setDecision: (d: 'keep' | 'release') => void

  // Crew
  crewSize: number
  setCrewSize: (n: number) => void

  // Reset
  reset: () => void
}

const initialState = {
  currentStep: 'camera' as FlowStep,
  photoBase64: null,
  photoUrl: null,
  latitude: null,
  longitude: null,
  jurisdictionId: null,
  jurisdictionName: null,
  fishingMode: 'shore' as const,
  speciesSuggestions: [],
  confirmedSpecies: null,
  confirmedSpeciesName: null,
  legalityResult: null,
  measuredLength: null,
  measurementMethod: null,
  decision: null,
  crewSize: 1,
}

export const useCatchStore = create<CatchState>((set) => ({
  ...initialState,
  setStep: (step) => set({ currentStep: step }),
  setPhoto: (base64, url) => set({ photoBase64: base64, photoUrl: url || null }),
  setLocation: (lat, lng) => set({ latitude: lat, longitude: lng }),
  setJurisdiction: (id, name) => set({ jurisdictionId: id, jurisdictionName: name }),
  setFishingMode: (mode) => set({ fishingMode: mode }),
  setSuggestions: (suggestions) => set({ speciesSuggestions: suggestions }),
  confirmSpecies: (id, name) => set({ confirmedSpecies: id, confirmedSpeciesName: name }),
  setLegality: (result) => set({ legalityResult: result }),
  setMeasurement: (length, method) => set({ measuredLength: length, measurementMethod: method }),
  setDecision: (d) => set({ decision: d }),
  setCrewSize: (n) => set({ crewSize: n }),
  reset: () => set(initialState),
}))
