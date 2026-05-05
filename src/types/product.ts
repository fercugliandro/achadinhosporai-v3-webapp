export interface Product {
  id: string
  name: string
  slug: string
  price: number
  originalPrice?: number
  image: string
  amazonUrl: string
  category: string
  featured?: boolean
  bestSeller?: boolean
  description?: string
}
