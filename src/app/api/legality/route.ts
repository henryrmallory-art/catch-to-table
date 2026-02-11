import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase/server'
import fs from 'fs'
import path from 'path'

// Simple point-in-polygon algorithm
function isPointInPolygon(point: [number, number], polygon: number[][]) {
  const [lng, lat] = point
  let inside = false

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i]
    const [xj, yj] = polygon[j]

    const intersect = ((yi > lat) !== (yj > lat)) &&
      (lng < (xj - xi) * (lat - yi) / (yj - yi) + xi)
    if (intersect) inside = !inside
  }

  return inside
}

function findStateByCoordinates(latitude: number, longitude: number) {
  try {
    const boundariesPath = path.join(process.cwd(), 'public', 'state-boundaries.json')
    const boundariesData = JSON.parse(fs.readFileSync(boundariesPath, 'utf-8'))

    for (const [stateName, data] of Object.entries(boundariesData)) {
      const stateData = data as any
      const coords = stateData.coordinates

      // Handle both Polygon and MultiPolygon
      if (Array.isArray(coords[0][0][0])) {
        // MultiPolygon
        for (const polygon of coords) {
          if (isPointInPolygon([longitude, latitude], polygon[0])) {
            return stateName
          }
        }
      } else {
        // Single Polygon
        if (isPointInPolygon([longitude, latitude], coords[0])) {
          return stateName
        }
      }
    }
  } catch (error) {
    console.error('Error finding state by coordinates:', error)
  }

  return null
}

export async function POST(request: NextRequest) {
  try {
    const { speciesId, latitude, longitude, fishingMode, measuredLength } = await request.json()
    const supabase = await createServerSupabase()
    const today = new Date().toISOString().split('T')[0]

    // 1. Find jurisdiction by location using client-side boundary checking
    const stateName = findStateByCoordinates(latitude, longitude)

    if (!stateName) {
      return NextResponse.json({
        canKeep: false,
        reasons: ['Could not determine your fishing jurisdiction. Please check your location.'],
        jurisdiction: null,
        regulation: null,
      })
    }

    // Get jurisdiction from database
    const { data: jurisdiction, error: jurisdictionError } = await supabase
      .from('jurisdictions')
      .select('id, name, jurisdiction_type')
      .eq('name', stateName)
      .single()

    if (jurisdictionError || !jurisdiction) {
      return NextResponse.json({
        canKeep: false,
        reasons: [`No regulations found for ${stateName}. Please consult local fishing authorities.`],
        jurisdiction: { name: stateName, jurisdiction_type: 'state' },
        regulation: null,
      })
    }

    // 2. Get regulations for this species in this jurisdiction
    const { data: regulations, error: regError } = await supabase
      .from('regulations')
      .select('*')
      .eq('species_id', speciesId)
      .eq('jurisdiction_id', jurisdiction.id)

    if (regError || !regulations || regulations.length === 0) {
      return NextResponse.json({
        canKeep: false,
        reasons: [`No regulation data found for this species in ${stateName}.`],
        jurisdiction,
        regulations: [],
      })
    }

    // 3. Check legality based on regulations
    const regulation = regulations[0]
    const reasons: string[] = []
    let canKeep = true

    // Check size limits
    if (measuredLength) {
      if (regulation.min_size_inches && measuredLength < regulation.min_size_inches) {
        canKeep = false
        reasons.push(`Below minimum size (${regulation.min_size_inches}"). Measured: ${measuredLength}"`)
      }
      if (regulation.max_size_inches && measuredLength > regulation.max_size_inches) {
        canKeep = false
        reasons.push(`Above maximum size (${regulation.max_size_inches}"). Measured: ${measuredLength}"`)
      }
    }

    // Check season
    if (regulation.season_open && regulation.season_close) {
      const todayDate = new Date(today)
      const seasonOpen = new Date(regulation.season_open)
      const seasonClose = new Date(regulation.season_close)

      if (todayDate < seasonOpen || todayDate > seasonClose) {
        canKeep = false
        reasons.push(`Out of season (open ${seasonOpen.toLocaleDateString()} - ${seasonClose.toLocaleDateString()})`)
      }
    }

    // Add success message if can keep
    if (canKeep) {
      const details = []
      if (regulation.min_size_inches) details.push(`Min: ${regulation.min_size_inches}"`)
      if (regulation.max_size_inches) details.push(`Max: ${regulation.max_size_inches}"`)
      if (regulation.bag_limit_per_person) details.push(`Bag limit: ${regulation.bag_limit_per_person}`)
      reasons.push(`Legal to keep${details.length > 0 ? ` (${details.join(', ')})` : ''}`)
    }

    return NextResponse.json({
      canKeep,
      reasons,
      jurisdiction,
      regulations: [{
        jurisdiction,
        regulation,
        can_keep: canKeep,
        reasons,
      }],
    })
  } catch (error) {
    console.error('Legality check error:', error)
    return NextResponse.json({ error: 'Legality check failed' }, { status: 500 })
  }
}
