'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useCatchStore } from '@/lib/stores/catchStore'
import { createClient } from '@/lib/supabase/client'
import { Fish, ArrowRight } from 'lucide-react'

interface HandlingNotes {
  bleed?: boolean
  ice_method?: string
  gut_timing?: string
  fillet_style?: string
}

export function HandlingChecklist() {
  const { confirmedSpecies, confirmedSpeciesName, decision, setStep } = useCatchStore()
  const [handlingNotes, setHandlingNotes] = useState<HandlingNotes | null>(null)
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})

  useEffect(() => {
    loadHandlingNotes()
  }, [confirmedSpecies])

  async function loadHandlingNotes() {
    if (!confirmedSpecies) return

    const supabase = createClient()
    const { data } = await supabase
      .from('species')
      .select('handling_notes')
      .eq('id', confirmedSpecies)
      .single()

    if (data?.handling_notes) {
      setHandlingNotes(data.handling_notes as HandlingNotes)
    }
  }

  function getHandlingSteps(): { id: string; label: string; description: string }[] {
    if (!handlingNotes) return []

    const steps: { id: string; label: string; description: string }[] = []

    if (handlingNotes.bleed) {
      steps.push({
        id: 'bleed',
        label: 'Bleed Immediately',
        description: 'Cut gills or tail to remove blood for better flavor',
      })
    }

    if (handlingNotes.ice_method) {
      const iceLabel = handlingNotes.ice_method.replace('_', ' ')
      steps.push({
        id: 'ice',
        label: `Place in ${iceLabel}`,
        description: 'Keep fish cold to preserve quality',
      })
    }

    if (handlingNotes.gut_timing) {
      const timing = handlingNotes.gut_timing === 'immediately'
        ? 'as soon as possible'
        : handlingNotes.gut_timing === 'soon'
        ? 'within 1-2 hours'
        : 'before storage'

      steps.push({
        id: 'gut',
        label: `Gut fish ${timing}`,
        description: 'Remove internal organs to prevent spoilage',
      })
    }

    if (decision === 'keep' && handlingNotes.fillet_style) {
      steps.push({
        id: 'fillet',
        label: `Fillet: ${handlingNotes.fillet_style.replace('_', ' ')}`,
        description: 'Prepare fish according to species characteristics',
      })
    }

    return steps
  }

  const steps = getHandlingSteps()

  return (
    <div className="min-h-screen bg-slate-950 p-6 pb-24">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center pt-6">
          <Fish className="h-16 w-16 text-sky-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">
            {decision === 'keep' ? 'Handling Guide' : 'Safe Release'}
          </h1>
          <p className="text-slate-400">
            {decision === 'keep'
              ? `Proper handling ensures best quality for ${confirmedSpeciesName}`
              : `Handle gently to give this ${confirmedSpeciesName} the best chance`}
          </p>
        </div>

        {decision === 'release' && (
          <Card className="border-emerald-800 bg-emerald-950/20 p-6">
            <h3 className="text-lg font-semibold text-emerald-200 mb-3">
              Best Practices for Catch & Release
            </h3>
            <ul className="space-y-2 text-emerald-100">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500">•</span>
                Keep fish in water as much as possible
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500">•</span>
                Wet hands before handling
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500">•</span>
                Remove hook gently, use pliers if needed
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500">•</span>
                Hold in water facing current until it swims away
              </li>
            </ul>
          </Card>
        )}

        {decision === 'keep' && steps.length > 0 && (
          <Card className="border-slate-800 bg-slate-900 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Handling Checklist
            </h3>
            <div className="space-y-4">
              {steps.map((step) => (
                <label
                  key={step.id}
                  className="flex items-start gap-3 cursor-pointer group"
                >
                  <Checkbox
                    checked={checkedItems[step.id] || false}
                    onCheckedChange={(checked) =>
                      setCheckedItems({ ...checkedItems, [step.id]: !!checked })
                    }
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <p className="text-white font-medium group-hover:text-sky-400 transition-colors">
                      {step.label}
                    </p>
                    <p className="text-sm text-slate-400 mt-0.5">
                      {step.description}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </Card>
        )}

        <Button
          size="lg"
          className="w-full bg-sky-600 hover:bg-sky-700"
          onClick={() => setStep(decision === 'keep' ? 'recipe' : 'done')}
        >
          {decision === 'keep' ? 'See Recipes' : 'Finish'}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
