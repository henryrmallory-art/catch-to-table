import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase/server'
import { generateRecipe } from '@/lib/ai/client'

export async function POST(request: NextRequest) {
  try {
    const { speciesId } = await request.json()
    const supabase = await createServerSupabase()

    // 1. Try cached recipes first
    const { data: cached } = await supabase
      .from('recipes')
      .select('*')
      .eq('species_id', speciesId)
      .limit(3)

    if (cached && cached.length >= 2) {
      return NextResponse.json({ recipes: cached, source: 'cached' })
    }

    // 2. Get species info for generation
    const { data: species } = await supabase
      .from('species')
      .select('common_name, flavor_profile')
      .eq('id', speciesId)
      .single()

    if (!species) {
      return NextResponse.json({ error: 'Species not found' }, { status: 404 })
    }

    // 3. Generate recipes via AI
    const methods = ['pan_sear', 'grill', 'ceviche']
    const recipes = await Promise.all(
      methods.map(method => generateRecipe(species.common_name, species.flavor_profile || 'mild', method))
    )

    return NextResponse.json({ recipes, source: 'generated' })
  } catch (error) {
    console.error('Recipe error:', error)
    return NextResponse.json({ error: 'Recipe generation failed' }, { status: 500 })
  }
}
