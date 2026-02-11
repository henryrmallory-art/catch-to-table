import { NextRequest, NextResponse } from 'next/server'
import { identifyFish } from '@/lib/ai/client'
import { createServerSupabase } from '@/lib/supabase/server'
import fs from 'fs'
import path from 'path'

// Helper function to find state name from coordinates
function findStateByCoordinates(latitude: number, longitude: number): string | null {
  try {
    const boundariesPath = path.join(process.cwd(), 'public', 'state-boundaries.json')
    const boundariesData = JSON.parse(fs.readFileSync(boundariesPath, 'utf-8'))

    // Simple point-in-polygon check
    const isPointInPolygon = (point: [number, number], polygon: number[][]) => {
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

    for (const [stateName, data] of Object.entries(boundariesData)) {
      const stateData = data as any
      const coords = stateData.coordinates

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
    console.error('Error finding state:', error)
  }
  return null
}

export async function POST(request: NextRequest) {
  try {
    const { imageBase64, latitude, longitude } = await request.json()

    if (!imageBase64) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 })
    }

    console.log('Received image, length:', imageBase64.length)
    console.log('Location:', latitude, longitude)
    console.log('API Key present:', !!process.env.ANTHROPIC_API_KEY)

    // Determine state from coordinates if provided
    let location
    if (latitude && longitude) {
      const stateName = findStateByCoordinates(latitude, longitude)
      if (stateName) {
        location = { latitude, longitude, stateName }
        console.log('Detected state for fish ID:', stateName)
      }
    }

    // 1. Get AI identification with location context
    const aiResult = await identifyFish(imageBase64, location)
    console.log('AI identification successful:', aiResult)

    // 2. Match against our species database
    const supabase = await createServerSupabase()
    const matchedSuggestions = await Promise.all(
      aiResult.suggestions.map(async (suggestion) => {
        const { data } = await supabase
          .from('species')
          .select('id, common_name, scientific_name, identifying_features, image_url')
          .or(`common_name.ilike.%${suggestion.commonName}%,scientific_name.ilike.%${suggestion.scientificName}%`)
          .limit(1)
          .single()

        return {
          ...suggestion,
          speciesId: data?.id || null,
          dbMatch: data || null,
        }
      })
    )

    return NextResponse.json({ suggestions: matchedSuggestions })
  } catch (error: any) {
    console.error('Fish identification error:', error)
    console.error('Error details:', error.message, error.stack)
    return NextResponse.json({
      error: 'Identification failed',
      details: error.message || String(error)
    }, { status: 500 })
  }
}
