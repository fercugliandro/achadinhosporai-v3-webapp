export interface Product {
  id: string
  name: string
  slug: string
  price: number
  originalPrice?: number
  image: string
  productUrl: string
  source: string
  category: string
  featured?: boolean
  bestSeller?: boolean
  description?: string
}
