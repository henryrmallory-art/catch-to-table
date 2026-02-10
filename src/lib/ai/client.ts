import Anthropic from '@anthropic-ai/sdk'

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function identifyFish(imageBase64: string): Promise<{
  suggestions: Array<{
    commonName: string
    scientificName: string
    confidence: number
    keyFeatures: string[]
  }>
}> {
  try {
    console.log('Calling Anthropic API with model: claude-sonnet-4-5-20250929')
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: [
          {
            type: 'image',
            source: { type: 'base64', media_type: 'image/jpeg', data: imageBase64 }
          },
          {
            type: 'text',
            text: `You are a marine biologist and expert fish identifier. Analyze this fish photo and return your top 3 species identifications.

Return ONLY valid JSON in this exact format (no markdown, no backticks):
{
  "suggestions": [
    {
      "commonName": "Species Name",
      "scientificName": "Genus species",
      "confidence": 0.92,
      "keyFeatures": ["feature 1", "feature 2", "feature 3"]
    }
  ]
}

Consider: body shape, coloring, fin structure, mouth shape, markings, and any visible habitat context. If the image is unclear or not a fish, return confidence below 0.3.`
          }
        ]
      }]
    })

    console.log('Anthropic API response received')
    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    console.log('Response text:', text.substring(0, 200))
    return JSON.parse(text.replace(/```json|```/g, '').trim())
  } catch (error: any) {
    console.error('Anthropic API error:', error)
    console.error('Error status:', error.status)
    console.error('Error message:', error.message)
    throw error
  }
}

export async function generateRecipe(speciesName: string, flavorProfile: string, method: string): Promise<{
  title: string
  ingredients: string[]
  steps: string[]
  cookTime: number
}> {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 512,
    messages: [{
      role: 'user',
      content: `Generate a simple ${method} recipe for ${speciesName} (flavor: ${flavorProfile}).

Return ONLY valid JSON:
{
  "title": "Recipe Title",
  "ingredients": ["ingredient 1", "ingredient 2", "ingredient 3", "ingredient 4", "ingredient 5"],
  "steps": ["step 1", "step 2", "step 3", "step 4", "step 5"],
  "cookTime": 12
}

Rules: Exactly 5 ingredients. Exactly 5 steps. Keep it simple and achievable on a boat or at a campsite.`
    }]
  })

  const text = response.content[0].type === 'text' ? response.content[0].text : ''
  return JSON.parse(text.replace(/```json|```/g, '').trim())
}
