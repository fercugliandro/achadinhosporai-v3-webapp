export const SITE_NAME = 'Achadinhos por Aí'
export const SITE_DESCRIPTION = 'Os melhores achadinhos da Amazon e outros Sellers com preços imperdíveis'

export interface Category {
  slug: string
  name: string
  emoji: string
  match?: string[]
}

export const CATEGORIES: Category[] = [
  { slug: 'tech', name: 'Tecnologia', emoji: '💻' },
  { slug: 'home', name: 'Casa & Cozinha', emoji: '🏠' },
  { slug: 'gaming', name: 'Gaming', emoji: '🎮' },
  { slug: 'fitness', name: 'Fitness & Esportes', emoji: '💪' },
  { slug: 'beauty', name: 'Beleza', emoji: '✨' },
  { slug: 'baby', name: 'Bebês', emoji: '👶' },
  { slug: 'bags', name: 'Bolsas & Malas', emoji: '👜' },
  { slug: 'fashion', name: 'Moda', emoji: '👗' },
  { slug: 'pets', name: 'Pets', emoji: '🐾', match: ['pets_cachorro', 'pets_gato'] },
  { slug: 'automotive', name: 'Automotivo', emoji: '🚗' },
]

export const AMAZON_TAG = (import.meta as any).env.VITE_AMAZON_TAG || 'yourtag-20'
