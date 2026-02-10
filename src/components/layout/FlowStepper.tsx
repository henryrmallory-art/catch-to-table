'use client'

import { useCatchStore, FlowStep } from '@/lib/stores/catchStore'
import { Camera, Fish, Scale, Ruler, Utensils, Check } from 'lucide-react'

const steps: { id: FlowStep; label: string; icon: any }[] = [
  { id: 'camera', label: 'Photo', icon: Camera },
  { id: 'species', label: 'ID', icon: Fish },
  { id: 'legality', label: 'Legal', icon: Scale },
  { id: 'measure', label: 'Measure', icon: Ruler },
  { id: 'handling', label: 'Handle', icon: Utensils },
  { id: 'recipe', label: 'Recipe', icon: Check },
]

export function FlowStepper() {
  const { currentStep, setStep } = useCatchStore()
  const currentIndex = steps.findIndex(s => s.id === currentStep)

  return (
    <div className="flex items-center justify-between gap-2 px-4 py-3 bg-slate-900 border-b border-slate-800">
      {steps.map((step, index) => {
        const Icon = step.icon
        const isCompleted = index < currentIndex
        const isCurrent = index === currentIndex
        const isClickable = index < currentIndex

        return (
          <button
            key={step.id}
            onClick={() => isClickable && setStep(step.id)}
            disabled={!isClickable}
            className={`flex flex-col items-center gap-1 transition-all ${
              isClickable ? 'cursor-pointer' : 'cursor-default'
            }`}
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                isCurrent
                  ? 'border-sky-500 bg-sky-500 text-white'
                  : isCompleted
                  ? 'border-emerald-500 bg-emerald-500 text-white'
                  : 'border-slate-700 bg-slate-800 text-slate-500'
              }`}
            >
              <Icon className="h-5 w-5" />
            </div>
            <span
              className={`text-xs font-medium ${
                isCurrent || isCompleted ? 'text-white' : 'text-slate-500'
              }`}
            >
              {step.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
