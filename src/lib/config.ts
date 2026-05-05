export const SITE_NAME = 'Achadinhos'
export const SITE_DESCRIPTION = 'Os melhores achadinhos da Amazon com preços imperdíveis'

export const CATEGORIES = [
  { slug: 'tech', name: 'Tecnologia', emoji: '💻' },
  { slug: 'home', name: 'Casa & Cozinha', emoji: '🏠' },
  { slug: 'gaming', name: 'Gaming', emoji: '🎮' },
  { slug: 'fitness', name: 'Fitness', emoji: '💪' },
  { slug: 'beauty', name: 'Beleza', emoji: '✨' },
  { slug: 'bebes', name: 'Bebês', emoji: '👶' },
]

export const AMAZON_TAG = (import.meta as any).env.VITE_AMAZON_TAG || 'yourtag-20'
