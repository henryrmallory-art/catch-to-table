export function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'))
      return
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    })
  })
}

export function formatCoordinates(lat: number, lng: number): string {
  const latDir = lat >= 0 ? 'N' : 'S'
  const lngDir = lng >= 0 ? 'E' : 'W'

  return `${Math.abs(lat).toFixed(4)}° ${latDir}, ${Math.abs(lng).toFixed(4)}° ${lngDir}`
}

// Calculate distance between two points in miles
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 3958.8 // Earth's radius in miles
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180)
}

/**
 * Calculate perpendicular distance from point to line segment
 * Returns distance in miles
 */
export function pointToLineSegmentDistance(
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

  return calculateDistance(py, px, yy, xx)
}

/**
 * Calculate minimum distance from a point to a polygon boundary
 * Returns distance in miles
 */
export function distanceToPolygonBoundary(
  point: [number, number],
  polygon: number[][]
): number {
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

/**
 * Check if point is near a state boundary
 * Returns { isNear: boolean, distance: number (in miles), nearbyStates: string[] }
 */
export function checkBoundaryProximity(
  latitude: number,
  longitude: number,
  currentState: string,
  allBoundaries: Record<string, { coordinates: number[][][] | number[][][][] }>,
  thresholdMiles: number = 0.5
): {
  isNear: boolean
  distance: number
  nearbyStates: string[]
} {
  let minDistance = Infinity
  const nearbyStates: string[] = []

  // Calculate distance to current state boundary
  const currentBoundary = allBoundaries[currentState]
  if (currentBoundary) {
    const coords = currentBoundary.coordinates

    // Handle both Polygon and MultiPolygon
    if (Array.isArray(coords[0][0][0])) {
      // MultiPolygon
      for (const polygon of coords as number[][][][]) {
        const distance = distanceToPolygonBoundary([longitude, latitude], polygon[0])
        minDistance = Math.min(minDistance, distance)
      }
    } else {
      // Single Polygon
      const distance = distanceToPolygonBoundary([longitude, latitude], (coords as number[][][])[0])
      minDistance = Math.min(minDistance, distance)
    }
  }

  // If we're near the boundary, check which neighboring states we might be approaching
  if (minDistance <= thresholdMiles) {
    for (const [stateName, data] of Object.entries(allBoundaries)) {
      if (stateName === currentState) continue

      const coords = data.coordinates
      let stateMinDistance = Infinity

      // Handle both Polygon and MultiPolygon
      if (Array.isArray(coords[0][0][0])) {
        // MultiPolygon
        for (const polygon of coords as number[][][][]) {
          const distance = distanceToPolygonBoundary([longitude, latitude], polygon[0])
          stateMinDistance = Math.min(stateMinDistance, distance)
        }
      } else {
        // Single Polygon
        const distance = distanceToPolygonBoundary([longitude, latitude], (coords as number[][][])[0])
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
}
