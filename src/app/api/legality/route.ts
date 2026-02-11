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

// Calculate distance between two points using Haversine formula (in miles)
function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3959 // Earth's radius in miles
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function toRad(degrees: number): number {
  return (degrees * Math.PI) / 180
}

// Calculate perpendicular distance from point to line segment
function pointToLineSegmentDistance(
  px: number,
  py: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  const A = px - x1
  const B = py - y1
  const C = x2 - x1
  const D = y2 - y1

  const dot = A * C + B * D
  const lenSq = C * C + D * D
  let param = -1

  if (lenSq !== 0) {
    param = dot / lenSq
  }

  let xx, yy

  if (param < 0) {
    xx = x1
    yy = y1
  } else if (param > 1) {
    xx = x2
    yy = y2
  } else {
    xx = x1 + param * C
    yy = y1 + param * D
  }

  return haversineDistance(py, px, yy, xx)
}

// Calculate minimum distance from a point to a polygon boundary
function distanceToPolygonBoundary(point: [number, number], polygon: number[][]): number {
  const [lng, lat] = point
  let minDistance = Infinity

  for (let i = 0; i < polygon.length; i++) {
    const j = (i + 1) % polygon.length
    const [x1, y1] = polygon[i]
    const [x2, y2] = polygon[j]

    const distance = pointToLineSegmentDistance(lng, lat, x1, y1, x2, y2)
    minDistance = Math.min(minDistance, distance)
  }

  return minDistance
}

// Check if point is near a state boundary
function checkBoundaryProximity(
  latitude: number,
  longitude: number,
  currentState: string
): {
  isNear: boolean
  distance: number
  nearbyStates: string[]
} {
  try {
    const boundariesPath = path.join(process.cwd(), 'public', 'state-boundaries.json')
    const boundariesData = JSON.parse(fs.readFileSync(boundariesPath, 'utf-8'))
    const thresholdMiles = 0.5

    let minDistance = Infinity
    const nearbyStates: string[] = []

    // Calculate distance to current state boundary
    const currentBoundary = boundariesData[currentState]
    if (currentBoundary) {
      const coords = currentBoundary.coordinates

      // Handle both Polygon and MultiPolygon
      if (Array.isArray(coords[0][0][0])) {
        // MultiPolygon
        for (const polygon of coords) {
          const distance = distanceToPolygonBoundary([longitude, latitude], polygon[0])
          minDistance = Math.min(minDistance, distance)
        }
      } else {
        // Single Polygon
        const distance = distanceToPolygonBoundary([longitude, latitude], coords[0])
        minDistance = Math.min(minDistance, distance)
      }
    }

    // If we're near the boundary, check which neighboring states we might be approaching
    if (minDistance <= thresholdMiles) {
      for (const [stateName, data] of Object.entries(boundariesData)) {
        if (stateName === currentState) continue

        const stateData = data as any
        const coords = stateData.coordinates
        let stateMinDistance = Infinity

        // Handle both Polygon and MultiPolygon
        if (Array.isArray(coords[0][0][0])) {
          // MultiPolygon
          for (const polygon of coords) {
            const distance = distanceToPolygonBoundary([longitude, latitude], polygon[0])
            stateMinDistance = Math.min(stateMinDistance, distance)
          }
        } else {
          // Single Polygon
          const distance = distanceToPolygonBoundary([longitude, latitude], coords[0])
          stateMinDistance = Math.min(stateMinDistance, distance)
        }

        // If this neighboring state is also very close, add it to the list
        if (stateMinDistance <= thresholdMiles * 2) {
          nearbyStates.push(stateName)
        }
      }
    }

    return {
      isNear: minDistance <= thresholdMiles,
      distance: minDistance,
      nearbyStates: nearbyStates.slice(0, 3), // Limit to 3 nearby states
    }
  } catch (error) {
    console.error('Error checking boundary proximity:', error)
    return { isNear: false, distance: Infinity, nearbyStates: [] }
  }
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

    // 2. Check boundary proximity
    const boundaryCheck = checkBoundaryProximity(latitude, longitude, stateName)
    const boundaryWarning = boundaryCheck.isNear
      ? `⚠️ You are within ${boundaryCheck.distance.toFixed(2)} miles of the ${stateName} border${boundaryCheck.nearbyStates.length > 0 ? ` (near ${boundaryCheck.nearbyStates.join(', ')})` : ''}. Be aware that regulations may differ across state lines.`
      : null

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

    // Get species info to show helpful message
    const { data: speciesInfo } = await supabase
      .from('species')
      .select('common_name, water_type')
      .eq('id', speciesId)
      .single()

    if (regError || !regulations || regulations.length === 0) {
      // Determine if this species just isn't found in this location
      const speciesName = speciesInfo?.common_name || 'this species'
      const waterType = speciesInfo?.water_type

      // Landlocked states (no ocean access)
      const landlocked = ['Vermont', 'West Virginia', 'Kentucky', 'Tennessee', 'Arkansas',
                          'Oklahoma', 'Montana', 'Wyoming', 'Colorado', 'Utah', 'Idaho',
                          'Nevada', 'New Mexico', 'Arizona', 'North Dakota', 'South Dakota',
                          'Nebraska', 'Kansas', 'Iowa', 'Missouri', 'Ohio', 'Indiana', 'Illinois',
                          'Wisconsin', 'Minnesota', 'Michigan', 'Pennsylvania']

      const isLandlocked = landlocked.includes(stateName)
      const isSaltwater = waterType === 'saltwater'

      let reason = `No regulation data found for ${speciesName} in ${stateName}.`

      if (isLandlocked && isSaltwater) {
        reason = `⚠️ ${speciesName} is not found in ${stateName}. This is a saltwater species, and ${stateName} is landlocked. Please verify your identification or location.`
      } else {
        // Check if species exists in ANY state
        const { count: totalCount } = await supabase
          .from('regulations')
          .select('*', { count: 'exact', head: true })
          .eq('species_id', speciesId)

        if (totalCount === 0) {
          reason = `${speciesName} regulations are not yet in our database.`
        } else {
          reason = `⚠️ ${speciesName} is not typically found in ${stateName} waters. Please verify your identification.`
        }
      }

      return NextResponse.json({
        canKeep: false,
        reasons: [reason],
        jurisdiction,
        regulations: [],
        speciesNotFound: true,
        boundaryWarning,
      })
    }

    // 3. Check legality based on regulations
    const regulation = regulations[0]
    const reasons: string[] = []
    let canKeep = true

    // Add boundary warning to reasons if applicable
    if (boundaryWarning) {
      reasons.push(boundaryWarning)
    }

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
      boundaryWarning,
    })
  } catch (error) {
    console.error('Legality check error:', error)
    return NextResponse.json({ error: 'Legality check failed' }, { status: 500 })
  }
}
