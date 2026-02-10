import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { speciesId, latitude, longitude, fishingMode, measuredLength } = await request.json()
    const supabase = await createServerSupabase()
    const today = new Date().toISOString().split('T')[0]

    // 1. Find jurisdiction by location
    const { data: jurisdictions, error: geoError } = await supabase
      .rpc('get_jurisdiction_by_location', { lat: latitude, lng: longitude })

    if (geoError || !jurisdictions?.length) {
      return NextResponse.json({
        canKeep: false,
        reasons: ['Could not determine your fishing jurisdiction. Please check your location.'],
        jurisdiction: null,
        regulation: null,
      })
    }

    // 2. Check legality against each matching jurisdiction (state + federal)
    const results = await Promise.all(
      jurisdictions.map(async (j: any) => {
        const { data } = await supabase.rpc('check_legality', {
          p_species_id: speciesId,
          p_jurisdiction_id: j.jurisdiction_id,
          p_date: today,
          p_fishing_mode: fishingMode || 'all',
          p_measured_length: measuredLength || null,
        })
        return { jurisdiction: j, legality: data }
      })
    )

    // 3. Most restrictive rule wins
    const canKeep = results.every(r => r.legality?.can_keep !== false)
    const allReasons = results.flatMap(r => r.legality?.reasons || [])
    const primaryJurisdiction = jurisdictions.find((j: any) => j.jurisdiction_type === 'state') || jurisdictions[0]

    return NextResponse.json({
      canKeep,
      reasons: allReasons,
      jurisdiction: primaryJurisdiction,
      regulations: results.map(r => ({
        jurisdiction: r.jurisdiction,
        ...r.legality,
      })),
    })
  } catch (error) {
    console.error('Legality check error:', error)
    return NextResponse.json({ error: 'Legality check failed' }, { status: 500 })
  }
}
