import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase/server'
import { generateRecipe } from '@/lib/ai/client'

export async function POST(request: NextRequest) {
  try {
    const { speciesId } = await request.json()

    if (!speciesId) {
      return NextResponse.json({ error: 'Species ID is required' }, { status: 400 })
    }

    const supabase = await createServerSupabase()

    // 1. Try cached recipes first
    const { data: cached, error: cacheError } = await supabase
      .from('recipes')
      .select('*')
      .eq('species_id', speciesId)
      .limit(3)

    if (cacheError) {
      console.error('Cache fetch error:', cacheError)
    }

    // Transform cached recipes to match expected format
    if (cached && cached.length >= 2) {
      const transformedRecipes = cached.map(recipe => ({
        title: recipe.title,
        method: recipe.method,
        ingredients: Array.isArray(recipe.ingredients)
          ? recipe.ingredients
          : JSON.parse(recipe.ingredients as string),
        steps: Array.isArray(recipe.steps)
          ? recipe.steps
          : JSON.parse(recipe.steps as string),
        cookTime: recipe.cook_time_minutes
      }))
      return NextResponse.json({ recipes: transformedRecipes, source: 'cached' })
    }

    // 2. Get species info for generation
    const { data: species, error: speciesError } = await supabase
      .from('species')
      .select('common_name, flavor_profile')
      .eq('id', speciesId)
      .single()

    if (speciesError || !species) {
      console.error('Species fetch error:', speciesError)
      return NextResponse.json({ error: 'Species not found' }, { status: 404 })
    }

    // 3. Generate recipes via AI
    const methods = ['pan_sear', 'grill', 'ceviche']
    const recipes = await Promise.all(
      methods.map(method => generateRecipe(
        species.common_name,
        species.flavor_profile || 'mild',
        method
      ))
    )

    // 4. Cache the generated recipes (fire and forget)
    for (const recipe of recipes) {
      supabase
        .from('recipes')
        .insert({
          species_id: speciesId,
          title: recipe.title,
          method: recipe.ingredients.length > 0 ? methods[recipes.indexOf(recipe)] : 'pan_sear',
          ingredients: recipe.ingredients,
          steps: recipe.steps,
          cook_time_minutes: recipe.cookTime,
          is_raw_safe: methods[recipes.indexOf(recipe)] === 'ceviche'
        })
        .then(({ error }) => {
          if (error) console.error('Recipe cache error:', error)
        })
    }

    return NextResponse.json({ recipes, source: 'generated' })
  } catch (error) {
    console.error('Recipe error:', error)
    return NextResponse.json({
      error: 'Recipe generation failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
