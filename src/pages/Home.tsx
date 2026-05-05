import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductGrid from '../components/ProductGrid'
import { CATEGORIES, SITE_NAME, SITE_DESCRIPTION } from '../lib/config'
import { Product } from '../types/product'

function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const githubUrl = (import.meta as any).env.VITE_PRODUCTS_URL
        const localUrl = '/data/products.json'

        if (githubUrl) {
          try {
            const res = await fetch(githubUrl)
            if (res.ok) {
              const data = await res.json()
              setProducts(data)
              setLoading(false)
              return
            }
          } catch {
            // fallback
          }
        }

        const res = await fetch(localUrl)
        const data = await res.json()
        setProducts(data)
      } catch (error) {
        console.error('Error loading products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const featured = products.filter(p => p.featured)
  const bestSellers = products.filter(p => p.bestSeller)
  const allProducts = products

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
              {SITE_NAME}
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              {SITE_DESCRIPTION}
            </p>
            <a
              href="#products"
              className="inline-block bg-white text-orange-600 font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition"
            >
              Ver Ofertas Agora
            </a>
          </div>
        </section>

        {/* Categories */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Categorias Populares
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                to={`/category/${cat.slug}`}
                className="bg-white p-4 rounded-xl shadow text-center hover:shadow-md transition hover:-translate-y-1"
              >
                <div className="text-3xl mb-2">{cat.emoji}</div>
                <div className="font-medium text-gray-900">{cat.name}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        {featured.length > 0 && (
          <section id="products" className="max-w-7xl mx-auto px-4 py-12">
            <ProductGrid products={featured} title="⭐ Destaques da Semana" />
          </section>
        )}

        {/* Best Sellers */}
        {bestSellers.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 py-12 bg-white">
            <ProductGrid products={bestSellers} title="🔥 Mais Vendidos" />
          </section>
        )}

        {/* All Products */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <ProductGrid products={allProducts} title="Todos os Achadinhos" />
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Home
