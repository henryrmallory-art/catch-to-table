import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const speciesId = searchParams.get('speciesId')

    const supabase = await createServerSupabase()

    // Build query
    let query = supabase
      .from('recipes')
      .select(`
        *,
        species:species_id (
          id,
          common_name,
          scientific_name,
          flavor_profile,
          water_type
        )
      `)
      .order('created_at', { ascending: false })

    // Filter by species if provided
    if (speciesId) {
      query = query.eq('species_id', speciesId)
    }

    const { data: recipes, error } = await query

    if (error) {
      console.error('Recipes fetch error:', error)
      return NextResponse.json({ error: 'Failed to fetch recipes' }, { status: 500 })
    }

    // Transform recipes to match expected format
    const transformedRecipes = (recipes || []).map(recipe => ({
      id: recipe.id,
      title: recipe.title,
      method: recipe.method,
      ingredients: Array.isArray(recipe.ingredients)
        ? recipe.ingredients
        : JSON.parse(recipe.ingredients as string),
      steps: Array.isArray(recipe.steps)
        ? recipe.steps
        : JSON.parse(recipe.steps as string),
      cookTime: recipe.cook_time_minutes,
      isRawSafe: recipe.is_raw_safe,
      species: recipe.species
    }))

    return NextResponse.json({ recipes: transformedRecipes })
  } catch (error) {
    console.error('Recipes API error:', error)
    return NextResponse.json({
      error: 'Failed to fetch recipes',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
