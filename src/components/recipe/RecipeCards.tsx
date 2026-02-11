'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCatchStore } from '@/lib/stores/catchStore'
import { Utensils, Clock, Loader2, ChefHat, AlertCircle, RefreshCw } from 'lucide-react'

interface Recipe {
  title: string
  method: string
  ingredients: string[]
  steps: string[]
  cookTime?: number
}

export function RecipeCards() {
  const { confirmedSpecies, confirmedSpeciesName, reset } = useCatchStore()
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedRecipe, setSelectedRecipe] = useState<number | null>(null)

  useEffect(() => {
    loadRecipes()
  }, [confirmedSpecies])

  async function loadRecipes() {
    if (!confirmedSpecies) {
      setError('No species selected. Please identify a fish first.')
      return
    }

    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ speciesId: confirmedSpecies }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to load recipes')
      }

      const data = await response.json()

      if (!data.recipes || data.recipes.length === 0) {
        setError('No recipes found for this species. Try again or select a different fish.')
        setRecipes([])
      } else {
        setRecipes(data.recipes)
      }
    } catch (error) {
      console.error('Recipe error:', error)
      setError(error instanceof Error ? error.message : 'Failed to load recipes')
      setRecipes([])
    } finally {
      setLoading(false)
    }
  }

  function getMethodIcon(method: string) {
    const icons: Record<string, string> = {
      pan_sear: '🍳',
      grill: '🔥',
      ceviche: '🍋',
      bake: '🌡️',
      fry: '🍟',
      smoke: '💨',
    }
    return icons[method] || '🍴'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center px-6">
          <Loader2 className="h-12 w-12 animate-spin text-sky-500 mx-auto" />
          <p className="mt-4 text-slate-400">Finding perfect recipes...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center px-6 max-w-md">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Oops!</h2>
          <p className="text-slate-400 mb-6">{error}</p>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 border-slate-700"
              onClick={reset}
            >
              Start Over
            </Button>
            <Button
              className="flex-1 bg-sky-600 hover:bg-sky-700"
              onClick={loadRecipes}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!confirmedSpecies) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center px-6 max-w-md">
          <ChefHat className="h-16 w-16 text-slate-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">No Fish Selected</h2>
          <p className="text-slate-400 mb-6">
            Please identify a fish first to see recipe suggestions.
          </p>
          <Button
            variant="outline"
            className="border-slate-700"
            onClick={reset}
          >
            Start New Catch
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 pb-24">
      <div className="p-6 space-y-6">
        <div className="text-center pt-6">
          <ChefHat className="h-16 w-16 text-sky-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Recipe Ideas</h1>
          <p className="text-slate-400">
            Delicious ways to prepare your {confirmedSpeciesName || 'catch'}
          </p>
        </div>

        {recipes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400 mb-4">No recipes available yet.</p>
            <Button
              className="bg-sky-600 hover:bg-sky-700"
              onClick={loadRecipes}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Load Recipes
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {recipes.map((recipe, index) => (
            <Card
              key={index}
              className="border-slate-800 bg-slate-900 overflow-hidden cursor-pointer hover:border-sky-500 transition-colors"
              onClick={() => setSelectedRecipe(selectedRecipe === index ? null : index)}
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">{getMethodIcon(recipe.method)}</span>
                      <h3 className="text-xl font-semibold text-white">
                        {recipe.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="capitalize">
                        {recipe.method.replace('_', ' ')}
                      </Badge>
                      {recipe.cookTime && (
                        <div className="flex items-center gap-1 text-slate-400 text-sm">
                          <Clock className="h-4 w-4" />
                          {recipe.cookTime} min
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {selectedRecipe === index && (
                  <div className="mt-4 space-y-4 pt-4 border-t border-slate-800">
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                        <Utensils className="h-4 w-4" />
                        Ingredients
                      </h4>
                      <ul className="space-y-1">
                        {recipe.ingredients.map((ingredient, i) => (
                          <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                            <span className="text-sky-500">•</span>
                            {ingredient}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-white mb-2">
                        Instructions
                      </h4>
                      <ol className="space-y-2">
                        {recipe.steps.map((step, i) => (
                          <li key={i} className="text-sm text-slate-300 flex gap-3">
                            <span className="text-sky-500 font-medium flex-shrink-0">
                              {i + 1}.
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            className="flex-1 border-slate-700"
            onClick={reset}
          >
            Start New Catch
          </Button>
          <Button
            className="flex-1 bg-sky-600 hover:bg-sky-700"
            onClick={() => alert('Proof log feature coming soon!')}
          >
            Save to Log
          </Button>
        </div>
      </div>
    </div>
  )
}
