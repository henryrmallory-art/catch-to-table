'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCatchStore } from '@/lib/stores/catchStore'
import { Ruler, Check } from 'lucide-react'

export function MeasureMode() {
  const { confirmedSpeciesName, measuredLength, setMeasurement, setStep } = useCatchStore()
  const [length, setLength] = useState(measuredLength?.toString() || '')

  function handleSubmit() {
    const lengthNum = parseFloat(length)
    if (lengthNum && lengthNum > 0) {
      setMeasurement(lengthNum, 'manual')
      setStep('legality') // Go back to legality to re-check with new measurement
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-md mx-auto pt-12 space-y-6">
        <div className="text-center">
          <Ruler className="h-16 w-16 text-sky-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Measure Your Catch</h1>
          <p className="text-slate-400">
            Accurate measurement ensures you're following regulations for {confirmedSpeciesName}
          </p>
        </div>

        <Card className="border-slate-800 bg-slate-900 p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="length" className="text-white">
                Length (inches)
              </Label>
              <div className="flex gap-3 mt-2">
                <Input
                  id="length"
                  type="number"
                  step="0.1"
                  placeholder="Enter length"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white text-2xl text-center"
                  autoFocus
                />
                <Button
                  size="lg"
                  className="bg-sky-600 hover:bg-sky-700"
                  onClick={handleSubmit}
                  disabled={!length || parseFloat(length) <= 0}
                >
                  <Check className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="text-sm text-slate-400 space-y-2 pt-4 border-t border-slate-800">
              <p className="font-medium text-white">Measurement Tips:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Measure from tip of snout to end of tail (total length)</li>
                <li>Lay fish flat on a measuring board</li>
                <li>Ensure tail is pinched closed</li>
                <li>Round down to nearest 1/4 inch</li>
              </ul>
            </div>
          </div>
        </Card>

        <Button
          variant="outline"
          className="w-full border-slate-700"
          onClick={() => setStep('legality')}
        >
          Skip Measurement
        </Button>
      </div>
    </div>
  )
}
