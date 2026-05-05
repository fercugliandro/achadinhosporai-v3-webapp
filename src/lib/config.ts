export const SITE_NAME = 'Achadinhos por Aí'
export const SITE_DESCRIPTION = 'Os melhores achadinhos da Amazon e outros Sellers com preços imperdíveis'

export const CATEGORIES = [
  { slug: 'tech', name: 'Tecnologia', emoji: '💻' },
  { slug: 'home', name: 'Casa & Cozinha', emoji: '🏠' },
  { slug: 'gaming', name: 'Gaming', emoji: '🎮' },
  { slug: 'fitness', name: 'Fitness & Esportes', emoji: '💪' },
  { slug: 'beauty', name: 'Beleza', emoji: '✨' },
  { slug: 'bebes', name: 'Bebês', emoji: '👶' },
  { slug: 'bags', name: 'Bolsas & Malas', emoji: '👜' },
  { slug: 'fashion', name: 'Moda', emoji: '👗' },
]

export const AMAZON_TAG = (import.meta as any).env.VITE_AMAZON_TAG || 'yourtag-20'
