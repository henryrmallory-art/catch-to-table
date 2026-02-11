'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCatchStore } from '@/lib/stores/catchStore'
import { useBagStore } from '@/lib/stores/bagStore'
import { formatDate } from '@/lib/utils/format'
import { ThumbsUp, ThumbsDown, Loader2, ExternalLink, Info, AlertTriangle } from 'lucide-react'

export function LegalityCard() {
  const {
    confirmedSpecies,
    confirmedSpeciesName,
    latitude,
    longitude,
    fishingMode,
    measuredLength,
    legalityResult,
    setLegality,
    setDecision,
    setStep,
  } = useCatchStore()
  const { addCatch, getKeptCountBySpecies, crewSize } = useBagStore()
  const [loading, setLoading] = useState(false)

  // Calculate bag limit warning
  const keptCount = confirmedSpecies ? getKeptCountBySpecies(confirmedSpecies) : 0
  const primaryReg = legalityResult?.regulations?.[0]?.regulation
  const bagLimit = primaryReg?.bag_limit_per_person
  const isNearLimit = bagLimit && keptCount >= bagLimit - 1
  const isAtLimit = bagLimit && keptCount >= bagLimit

  useEffect(() => {
    if (confirmedSpecies && latitude && longitude && !legalityResult) {
      checkLegality()
    }
  }, [confirmedSpecies, latitude, longitude])

  async function checkLegality() {
    setLoading(true)

    try {
      const response = await fetch('/api/legality', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          speciesId: confirmedSpecies,
          latitude,
          longitude,
          fishingMode,
          measuredLength,
        }),
      })

      const data = await response.json()
      setLegality(data)
    } catch (error) {
      console.error('Legality check error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-sky-500 mx-auto" />
          <p className="mt-4 text-slate-400">Checking regulations...</p>
        </div>
      </div>
    )
  }

  if (!legalityResult) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <Card className="border-amber-500 bg-amber-950/20 p-6 max-w-md">
          <Info className="h-12 w-12 text-amber-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white text-center mb-2">
            No Regulations Found
          </h3>
          <p className="text-amber-200 text-center">
            We couldn't find regulations for this species in your location.
            Please consult local fishing authorities.
          </p>
          <Button
            className="w-full mt-4"
            onClick={() => setStep('handling')}
          >
            Continue Anyway
          </Button>
        </Card>
      </div>
    )
  }

  const { canKeep, reasons, jurisdiction, regulations } = legalityResult

  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      {/* Hero Decision */}
      <div
        className={`relative py-16 ${
          canKeep
            ? 'bg-gradient-to-b from-emerald-900 to-slate-950'
            : 'bg-gradient-to-b from-rose-900 to-slate-950'
        }`}
      >
        <div className="text-center px-6">
          {canKeep ? (
            <ThumbsUp className="h-24 w-24 text-emerald-400 mx-auto mb-4" />
          ) : (
            <ThumbsDown className="h-24 w-24 text-rose-400 mx-auto mb-4" />
          )}
          <h1 className="text-4xl font-bold text-white mb-2">
            {canKeep ? 'LEGAL TO KEEP' : 'MUST RELEASE'}
          </h1>
          <p className="text-lg text-white/80">{confirmedSpeciesName}</p>
          {jurisdiction && (
            <Badge variant="outline" className="mt-3 border-white/30 text-white">
              {jurisdiction.jurisdiction_name} ({jurisdiction.jurisdiction_type})
            </Badge>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Reasons */}
        {reasons && reasons.length > 0 && (
          <Card className="border-slate-800 bg-slate-900 p-5">
            <h3 className="text-lg font-semibold text-white mb-3">
              {canKeep ? 'Requirements Met' : 'Reason'}
            </h3>
            <ul className="space-y-2">
              {reasons.map((reason, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span
                    className={`h-1.5 w-1.5 rounded-full flex-shrink-0 mt-2 ${
                      canKeep ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                  />
                  <span className="text-slate-300">{reason}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {/* Regulation Details */}
        {primaryReg && (
          <Card className="border-slate-800 bg-slate-900 p-5">
            <h3 className="text-lg font-semibold text-white mb-4">
              Current Regulations
            </h3>
            <div className="space-y-3 text-sm">
              {primaryReg.min_size_inches && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Minimum Size:</span>
                  <span className="text-white font-medium">
                    {primaryReg.min_size_inches}"
                  </span>
                </div>
              )}
              {primaryReg.max_size_inches && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Maximum Size:</span>
                  <span className="text-white font-medium">
                    {primaryReg.max_size_inches}"
                  </span>
                </div>
              )}
              {primaryReg.bag_limit_per_person && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Bag Limit:</span>
                  <span className="text-white font-medium">
                    {primaryReg.bag_limit_per_person} per person
                  </span>
                </div>
              )}
              {primaryReg.season_open && primaryReg.season_close && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Season:</span>
                  <span className="text-white font-medium">
                    {formatDate(primaryReg.season_open)} -{' '}
                    {formatDate(primaryReg.season_close)}
                  </span>
                </div>
              )}
              {primaryReg.fishing_mode && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Applies To:</span>
                  <span className="text-white font-medium capitalize">
                    {primaryReg.fishing_mode.replace('_', ' ')}
                  </span>
                </div>
              )}
            </div>

            {primaryReg.source_url && (
              <Button
                variant="link"
                className="w-full mt-4 text-sky-400"
                onClick={() => window.open(primaryReg.source_url, '_blank')}
              >
                View Official Source
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            )}

            {primaryReg.last_verified_at && (
              <p className="text-xs text-slate-500 text-center mt-2">
                Last verified: {formatDate(primaryReg.last_verified_at)}
              </p>
            )}
          </Card>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          {!measuredLength && primaryReg?.min_size_inches && (
            <Button
              variant="outline"
              className="w-full border-amber-500 text-amber-400 hover:bg-amber-950"
              onClick={() => setStep('measure')}
            >
              Measure Fish to Confirm
            </Button>
          )}

          {/* Bag Limit Warning */}
          {isNearLimit && !isAtLimit && (
            <Card className="border-amber-500 bg-amber-950/20 p-4">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-amber-500 flex-shrink-0" />
                <p className="text-amber-200 text-sm">
                  Warning: You've kept {keptCount}/{bagLimit} {confirmedSpeciesName} today
                </p>
              </div>
            </Card>
          )}

          {isAtLimit && (
            <Card className="border-rose-500 bg-rose-950/20 p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-rose-500 flex-shrink-0" />
                <p className="text-rose-200 text-sm font-medium">
                  BAG LIMIT REACHED: {keptCount}/{bagLimit} {confirmedSpeciesName}
                </p>
              </div>
            </Card>
          )}

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="border-rose-500 text-rose-400 hover:bg-rose-950"
              onClick={() => {
                // Add to bag tracker
                if (confirmedSpecies && confirmedSpeciesName) {
                  addCatch(confirmedSpecies, confirmedSpeciesName, measuredLength, false)
                }
                setDecision('release')
                setStep('handling')
              }}
            >
              I'll Release
            </Button>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              disabled={!canKeep || isAtLimit}
              onClick={() => {
                // Check bag limit
                if (isAtLimit) {
                  alert(`You've reached your bag limit for ${confirmedSpeciesName} (${bagLimit} per person)`)
                  return
                }

                // Add to bag tracker
                if (confirmedSpecies && confirmedSpeciesName) {
                  addCatch(confirmedSpecies, confirmedSpeciesName, measuredLength, true)
                }
                setDecision('keep')
                setStep('handling')
              }}
            >
              I'll Keep {isAtLimit && '(LIMIT REACHED)'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
