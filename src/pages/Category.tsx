import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductGrid from '../components/ProductGrid'
import { CATEGORIES } from '../lib/config'
import { Product } from '../types/product'

function Category() {
  const { slug } = useParams<{ slug: string }>()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const category = CATEGORIES.find(c => c.slug === slug)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const githubUrl = (import.meta as any).env.VITE_PRODUCTS_URL
        const localUrl = '/data/products.json'

        let data: Product[] = []
        if (githubUrl) {
          try {
            const res = await fetch(githubUrl)
            if (res.ok) {
              data = await res.json()
            }
          } catch {
            // fallback
          }
        }

        if (data.length === 0) {
          const res = await fetch(localUrl)
          data = await res.json()
        }

        const filtered = data.filter(p => p.category === slug)
        setProducts(filtered)
      } catch (error) {
        console.error('Error loading products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Categoria não encontrada</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {category.emoji} {category.name}
            </h1>
            <p className="text-gray-600 mt-2">
              {products.length} {products.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
            </p>
          </div>
          <ProductGrid products={products} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Category
