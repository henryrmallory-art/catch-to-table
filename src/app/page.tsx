'use client'

import { useCatchStore } from '@/lib/stores/catchStore'
import { FlowStepper } from '@/components/layout/FlowStepper'
import { CameraCapture } from '@/components/camera/CameraCapture'
import { SpeciesConfirm } from '@/components/species/SpeciesConfirm'
import { LegalityCard } from '@/components/legality/LegalityCard'
import { MeasureMode } from '@/components/measure/MeasureMode'
import { HandlingChecklist } from '@/components/handling/HandlingChecklist'
import { RecipeCards } from '@/components/recipe/RecipeCards'

export default function Home() {
  const { currentStep } = useCatchStore()

  return (
    <main className="min-h-screen bg-slate-950">
      {currentStep !== 'camera' && <FlowStepper />}

      {currentStep === 'camera' && <CameraCapture />}
      {currentStep === 'species' && <SpeciesConfirm />}
      {currentStep === 'legality' && <LegalityCard />}
      {currentStep === 'measure' && <MeasureMode />}
      {currentStep === 'handling' && <HandlingChecklist />}
      {currentStep === 'recipe' && <RecipeCards />}

      {currentStep === 'done' && (
        <div className="flex min-h-screen items-center justify-center p-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">
              Great fishing! 🎣
            </h1>
            <p className="text-slate-400 mb-6">
              Your catch has been handled responsibly.
            </p>
            <button
              className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-medium"
              onClick={() => window.location.reload()}
            >
              Start New Catch
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
