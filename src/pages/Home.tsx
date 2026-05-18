import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductGrid from '../components/ProductGrid'
import Pagination from '../components/Pagination'
import AdUnit from '../components/AdUnit'
import { CATEGORIES, SITE_NAME, SITE_DESCRIPTION } from '../lib/config'
import { Product } from '../types/product'

const ITEMS_PER_PAGE = 20

function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

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

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  const featured = products.filter(p => p.featured)
  const bestSellers = products.filter(p => p.bestSeller)

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
  )

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-slate-50">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 font-medium">Carregando produtos...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-400 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 py-20 text-center">
            <span className="inline-block bg-orange-500/20 text-orange-300 text-xs font-semibold px-3 py-1 rounded-full mb-5 uppercase tracking-widest border border-orange-500/30">
              Novidades todos os dias
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
              {SITE_NAME}
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              {SITE_DESCRIPTION}
            </p>
            <a
              href="#products"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3.5 rounded-2xl transition-colors duration-200 shadow-lg shadow-orange-500/25"
            >
              Ver Ofertas Agora
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </section>

        {/* Categories */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-xl font-bold text-slate-800 mb-5 text-center">
            Categorias Populares
          </h2>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                to={`/category/${cat.slug}`}
                className="bg-white border border-slate-100 p-3 rounded-2xl text-center hover:border-orange-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 shadow-sm"
              >
                <div className="text-2xl mb-1">{cat.emoji}</div>
                <div className="text-xs font-semibold text-slate-700 leading-tight">{cat.name}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Ad Unit - After Categories */}
        <section className="max-w-7xl mx-auto px-4 py-4">
          <AdUnit adSlot="4555302221" adFormat="horizontal" />
        </section>

        {/* Featured Products */}
        {featured.length > 0 && (
          <section id="products" className="max-w-7xl mx-auto px-4 py-10">
            <ProductGrid products={featured} title="⭐ Destaques da Semana" />
          </section>
        )}

        {/* Ad Unit - After Featured Products */}
        <section className="max-w-7xl mx-auto px-4 py-4">
          <AdUnit adSlot="7047717127" adFormat="rectangle" />
        </section>

        {/* Best Sellers */}
        {bestSellers.length > 0 && (
          <section className="bg-white py-10">
            <div className="max-w-7xl mx-auto px-4">
              <ProductGrid products={bestSellers} title="🔥 Mais Vendidos" />
            </div>
          </section>
        )}

        {/* Ad Unit - Before All Products */}
        <section className="max-w-7xl mx-auto px-4 py-4">
          <AdUnit adSlot="5620971889" adFormat="auto" />
        </section>

        {/* All Products with Search + Pagination */}
        <section id="all-products" className="max-w-7xl mx-auto px-4 py-10">
          {/* Search Bar */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-5">Todos os Achadinhos</h2>
            <div className="relative max-w-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Buscar produtos, categorias..."
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-shadow text-sm font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                  aria-label="Limpar busca"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="mt-2 text-sm text-slate-500">
                {filteredProducts.length === 0
                  ? 'Nenhum produto encontrado.'
                  : `${filteredProducts.length} produto${filteredProducts.length !== 1 ? 's' : ''} encontrado${filteredProducts.length !== 1 ? 's' : ''}`}
              </p>
            )}
          </div>

          <ProductGrid products={paginatedProducts} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Home
