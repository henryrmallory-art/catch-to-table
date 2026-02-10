'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useBagStore } from '@/lib/stores/bagStore'
import { Users, Fish, Trash2, AlertTriangle, CheckCircle2 } from 'lucide-react'

export function BagTracker() {
  const {
    catches,
    crewSize,
    tripStartTime,
    setCrewSize,
    getCatchesBySpecies,
    getKeptCountBySpecies,
    getTotalKept,
    getTotalCatches,
    removeCatch,
    resetTrip,
    checkMidnightReset,
  } = useBagStore()

  const [showCrewEdit, setShowCrewEdit] = useState(false)
  const [newCrewSize, setNewCrewSize] = useState(crewSize)

  useEffect(() => {
    // Check for midnight reset on mount
    checkMidnightReset()
  }, [])

  // Group catches by species
  const speciesCounts = catches.reduce((acc, catch_) => {
    const key = catch_.speciesId
    if (!acc[key]) {
      acc[key] = {
        speciesId: catch_.speciesId,
        speciesName: catch_.speciesName,
        total: 0,
        kept: 0,
        released: 0,
      }
    }
    acc[key].total++
    if (catch_.kept) {
      acc[key].kept++
    } else {
      acc[key].released++
    }
    return acc
  }, {} as Record<string, { speciesId: string; speciesName: string; total: number; kept: number; released: number }>)

  const speciesArray = Object.values(speciesCounts)

  function handleCrewSizeUpdate() {
    if (newCrewSize >= 1 && newCrewSize <= 99) {
      setCrewSize(newCrewSize)
      setShowCrewEdit(false)
    }
  }

  function formatTripDuration() {
    if (!tripStartTime) return '0h'
    const hours = Math.floor((Date.now() - tripStartTime) / 1000 / 60 / 60)
    const minutes = Math.floor((Date.now() - tripStartTime) / 1000 / 60) % 60
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }

  return (
    <div className="space-y-4">
      {/* Trip Header */}
      <Card className="border-slate-800 bg-slate-900 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Today's Trip</h3>
            <p className="text-sm text-slate-400">Duration: {formatTripDuration()}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (confirm('Reset trip and clear all catches? This cannot be undone.')) {
                resetTrip()
              }
            }}
            className="border-rose-500 text-rose-400 hover:bg-rose-950"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Reset Trip
          </Button>
        </div>

        {/* Crew Size */}
        <div className="flex items-center gap-3">
          <Users className="h-5 w-5 text-sky-500" />
          {showCrewEdit ? (
            <div className="flex items-center gap-2 flex-1">
              <input
                type="number"
                min="1"
                max="99"
                value={newCrewSize}
                onChange={(e) => setNewCrewSize(parseInt(e.target.value) || 1)}
                className="w-20 px-3 py-1 bg-slate-800 border border-slate-700 rounded text-white"
              />
              <Button size="sm" onClick={handleCrewSizeUpdate}>
                Save
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setShowCrewEdit(false)
                  setNewCrewSize(crewSize)
                }}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 flex-1">
              <span className="text-white">
                Crew Size: <span className="font-semibold">{crewSize}</span>
              </span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowCrewEdit(true)}
                className="text-sky-400 hover:text-sky-300"
              >
                Edit
              </Button>
            </div>
          )}
        </div>

        {/* Total Stats */}
        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-800">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{getTotalCatches()}</p>
            <p className="text-sm text-slate-400">Total Caught</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-400">{getTotalKept()}</p>
            <p className="text-sm text-slate-400">Kept</p>
          </div>
        </div>
      </Card>

      {/* Species Breakdown */}
      {speciesArray.length > 0 && (
        <Card className="border-slate-800 bg-slate-900 p-5">
          <h3 className="text-lg font-semibold text-white mb-4">By Species</h3>
          <div className="space-y-3">
            {speciesArray.map((species) => (
              <div
                key={species.speciesId}
                className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Fish className="h-5 w-5 text-sky-500" />
                  <div>
                    <p className="font-medium text-white">{species.speciesName}</p>
                    <p className="text-sm text-slate-400">
                      {species.kept} kept • {species.released} released
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge variant="outline" className="border-emerald-500 text-emerald-400">
                    {species.kept} / person
                  </Badge>
                  {crewSize > 1 && (
                    <p className="text-xs text-slate-500">
                      {species.kept * crewSize} total crew
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Recent Catches */}
      {catches.length > 0 && (
        <Card className="border-slate-800 bg-slate-900 p-5">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Catches</h3>
          <div className="space-y-2">
            {catches.slice(-5).reverse().map((catch_, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {catch_.kept ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                  )}
                  <div>
                    <p className="text-white">{catch_.speciesName}</p>
                    <p className="text-xs text-slate-400">
                      {catch_.length ? `${catch_.length}"` : 'No length'} •{' '}
                      {new Date(catch_.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <Badge variant={catch_.kept ? 'default' : 'outline'}>
                  {catch_.kept ? 'Kept' : 'Released'}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      )}

      {catches.length === 0 && (
        <Card className="border-slate-800 bg-slate-900 p-8 text-center">
          <Fish className="h-12 w-12 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400">No catches recorded yet</p>
          <p className="text-sm text-slate-500 mt-1">
            Catches will be tracked automatically after checking legality
          </p>
        </Card>
      )}
    </div>
  )
}
