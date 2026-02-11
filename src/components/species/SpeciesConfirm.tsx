'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCatchStore } from '@/lib/stores/catchStore'
import { formatConfidence } from '@/lib/utils/format'
import { Check, AlertCircle, Loader2, Edit3 } from 'lucide-react'

export function SpeciesConfirm() {
  const {
    photoBase64,
    photoUrl,
    latitude,
    longitude,
    speciesSuggestions,
    setSuggestions,
    confirmSpecies,
    setStep,
  } = useCatchStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [manualEntry, setManualEntry] = useState(false)
  const [manualName, setManualName] = useState('')
  const [manualLength, setManualLength] = useState('')

  useEffect(() => {
    if (photoBase64 && speciesSuggestions.length === 0) {
      identifyFish()
    }
  }, [photoBase64])

  async function identifyFish() {
    if (!photoBase64) return

    setLoading(true)
    setError(null)

    try {
      console.log('Sending identification request, image length:', photoBase64.length)
      console.log('Location for fish ID:', latitude, longitude)

      const response = await fetch('/api/identify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: photoBase64,
          latitude,
          longitude
        }),
      })

      console.log('Response status:', response.status)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        console.error('API error:', errorData)
        throw new Error(errorData.details || errorData.error || 'Failed to identify fish')
      }

      const data = await response.json()
      console.log('Identification successful:', data)
      setSuggestions(data.suggestions)
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to identify fish. Please try again.'
      setError(errorMessage)
      console.error('Identification error:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleConfirm(suggestion: any) {
    if (!suggestion.speciesId) {
      alert('This species is not in our database yet. Please choose another.')
      return
    }

    // "Not Sure" mode - low confidence warning
    if (suggestion.confidence < 0.7) {
      const proceed = confirm(
        `⚠️ LOW CONFIDENCE (${Math.round(suggestion.confidence * 100)}%)\n\n` +
        `We're not very confident about this identification. ` +
        `When in doubt, it's best to RELEASE the fish to protect the species.\n\n` +
        `Do you want to continue with "${suggestion.commonName}"?\n\n` +
        `✓ YES - Check regulations but consider releasing\n` +
        `✗ NO - Try manual entry or take another photo`
      )

      if (!proceed) {
        return
      }
    }

    confirmSpecies(suggestion.speciesId, suggestion.commonName)
    setStep('legality')
  }

  async function handleManualEntry() {
    if (!manualName.trim()) {
      setError('Please enter a fish name')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Try to find species in database
      const response = await fetch('/api/species/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: manualName }),
      })

      if (response.ok) {
        const data = await response.json()
        if (data.species) {
          confirmSpecies(data.species.id, data.species.common_name)
          if (manualLength) {
            const length = parseFloat(manualLength)
            if (!isNaN(length)) {
              useCatchStore.getState().setMeasurement(length, 'manual')
            }
          }
          setStep('legality')
          return
        }
      }

      // Species not found, but allow proceeding with manual entry
      alert(`"${manualName}" not found in our database. You can still check general regulations, but species-specific rules may not be available.`)
      confirmSpecies('manual', manualName)
      if (manualLength) {
        const length = parseFloat(manualLength)
        if (!isNaN(length)) {
          useCatchStore.getState().setMeasurement(length, 'manual')
        }
      }
      setStep('legality')
    } catch (err: any) {
      setError('Failed to search species. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      {/* Photo Preview */}
      {photoUrl && (
        <div className="relative h-64 w-full">
          <img
            src={photoUrl}
            alt="Caught fish"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950" />
        </div>
      )}

      <div className="p-6 space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Identify Your Catch</h2>
          <p className="text-slate-400 mt-1">
            Select the species that best matches your fish
          </p>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-sky-500" />
            <p className="mt-4 text-slate-400">Analyzing your catch...</p>
          </div>
        )}

        {error && (
          <Card className="border-rose-500 bg-rose-950/20 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-rose-200 font-medium">Identification Failed</p>
                <p className="text-rose-300 text-sm mt-1">{error}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={identifyFish}
                >
                  Try Again
                </Button>
              </div>
            </div>
          </Card>
        )}

        {!loading && speciesSuggestions.length > 0 && (
          <div className="space-y-3">
            {speciesSuggestions.map((suggestion, index) => (
              <Card
                key={index}
                className="border-slate-800 bg-slate-900 p-4 cursor-pointer hover:border-sky-500 transition-colors"
                onClick={() => handleConfirm(suggestion)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-white">
                        {suggestion.commonName}
                      </h3>
                      <Badge
                        variant={suggestion.confidence > 0.7 ? 'default' : 'secondary'}
                        className={
                          suggestion.confidence > 0.7
                            ? 'bg-emerald-500'
                            : 'bg-amber-500'
                        }
                      >
                        {formatConfidence(suggestion.confidence)}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-400 italic mb-2">
                      {suggestion.scientificName}
                    </p>
                    <div className="space-y-1">
                      {suggestion.keyFeatures?.slice(0, 3).map((feature: string, i: number) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-sky-500 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-slate-300">{feature}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  {suggestion.dbMatch?.image_url && (
                    <img
                      src={suggestion.dbMatch.image_url}
                      alt={suggestion.commonName}
                      className="h-20 w-20 rounded object-cover"
                    />
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

        {!manualEntry && (
          <>
            <Button
              variant="outline"
              className="w-full border-slate-700"
              onClick={() => setManualEntry(true)}
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Enter Manually
            </Button>

            <Button
              variant="outline"
              className="w-full border-slate-700"
              onClick={() => setStep('camera')}
            >
              Take Another Photo
            </Button>
          </>
        )}

        {manualEntry && (
          <Card className="border-slate-800 bg-slate-900 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Manual Entry</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Fish Name *
                </label>
                <input
                  type="text"
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  placeholder="e.g., Red Snapper, Bass"
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Length (inches, optional)
                </label>
                <input
                  type="number"
                  value={manualLength}
                  onChange={(e) => setManualLength(e.target.value)}
                  placeholder="e.g., 18"
                  step="0.1"
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleManualEntry}
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Checking...
                    </>
                  ) : (
                    'Continue'
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setManualEntry(false)
                    setManualName('')
                    setManualLength('')
                  }}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
