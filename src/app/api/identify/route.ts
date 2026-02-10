import { NextRequest, NextResponse } from 'next/server'
import { identifyFish } from '@/lib/ai/client'
import { createServerSupabase } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { imageBase64 } = await request.json()

    if (!imageBase64) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 })
    }

    // 1. Get AI identification
    const aiResult = await identifyFish(imageBase64)

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
  } catch (error) {
    console.error('Fish identification error:', error)
    return NextResponse.json({ error: 'Identification failed' }, { status: 500 })
  }
}
