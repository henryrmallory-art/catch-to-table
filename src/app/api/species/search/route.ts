import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json()

    if (!query) {
      return NextResponse.json({ error: 'No query provided' }, { status: 400 })
    }

    const supabase = await createServerSupabase()

    // Search for species by common name or scientific name
    const { data, error } = await supabase
      .from('species')
      .select('id, common_name, scientific_name, identifying_features, image_url')
      .or(`common_name.ilike.%${query}%,scientific_name.ilike.%${query}%`)
      .limit(1)
      .single()

    if (error || !data) {
      return NextResponse.json({ species: null }, { status: 404 })
    }

    return NextResponse.json({ species: data })
  } catch (error: any) {
    console.error('Species search error:', error)
    return NextResponse.json({
      error: 'Search failed',
      details: error.message
    }, { status: 500 })
  }
}
