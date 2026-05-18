import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductGrid from '../components/ProductGrid'
import type { Category } from '../lib/config'
import { CATEGORIES } from '../lib/config'
import { Product } from '../types/product'
import AdUnit from '../components/AdUnit'

const SUBCATEGORIES: Record<string, { slug: string; name: string; emoji: string }[]> = {
  pets: [
    { slug: 'pets_cachorro', name: 'Cachorro', emoji: '🐕' },
    { slug: 'pets_gato', name: 'Gato', emoji: '🐱' },
  ],
}

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

        const match = (category as Category)?.match ?? [slug]
        const filtered = data.filter(p => match.includes(p.category))
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
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-[3px] border-orange-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-500 font-medium text-sm">Carregando produtos...</p>
          </div>
        </main>
        <Footer />
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

  const subcategories = slug ? SUBCATEGORIES[slug] : undefined

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold text-orange-500 uppercase tracking-widest">Categoria</span>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mt-1">
              {category.emoji} {category.name}
            </h1>
            <p className="text-slate-500 text-sm mt-2">
              {products.length} {products.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
            </p>
          </div>

          {/* Ad Unit - Top of Category */}
          <div className="mb-6">
          <AdUnit
            adSlot="2994808548"
            adFormat="horizontal"
            className="bg-gray-100 rounded-xl p-4 text-center min-h-[100px]"
          />
          </div>

          {subcategories ? (
            subcategories.map((sub: { slug: string; name: string; emoji: string }) => {
              const subProducts = products.filter(p => p.category === sub.slug)
              if (subProducts.length === 0) return null
              return (
                <div key={sub.slug} className="mb-10">
                  <ProductGrid products={subProducts} title={`${sub.emoji} ${sub.name}`} />
                </div>
              )
            })
          ) : (
            <ProductGrid products={products} />
          )}

          {/* Ad Unit - Bottom of Category */}
          <div className="mt-8">
          <AdUnit
            adSlot="1681726873"
            adFormat="rectangle"
            className="bg-gray-100 rounded-xl p-4 text-center min-h-[250px]"
          />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Category
