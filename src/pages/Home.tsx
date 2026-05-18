import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductGrid from '../components/ProductGrid'
import Pagination from '../components/Pagination'
import AdUnit from '../components/AdUnit'
import { CATEGORIES, SITE_NAME, SITE_DESCRIPTION } from '../lib/config'
import { Product } from '../types/product'

const ITEMS_PER_PAGE = 20

function Home() {
  const navigate = useNavigate()
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

  const filteredProducts = featured.filter(p =>
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-grid" />
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-500 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-orange-400 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 py-24 md:py-32 text-center">
            <span className="inline-block bg-orange-500/15 text-orange-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest border border-orange-500/25">
              ✨ Novidades todos os dias
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-5 tracking-tight text-balance leading-[1.1]">
              {SITE_NAME}
            </h1>
            <p className="text-lg md:text-xl text-slate-300/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              {SITE_DESCRIPTION}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#products"
                className="inline-flex items-center gap-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-0.5 text-base"
              >
                Ver Ofertas Agora
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              <Link
                to="/produtos"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-200 border border-white/10 hover:border-white/20 backdrop-blur-sm text-base"
              >
                Todos os Produtos
              </Link>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent" />
        </section>

        {/* Categories */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold text-orange-500 uppercase tracking-widest">Navegue por</span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mt-1">Categorias Populares</h2>
            <p className="text-slate-500 text-sm mt-2">Encontre o que você precisa</p>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                to={`/category/${cat.slug}`}
                className="group bg-white border border-slate-100 p-4 rounded-2xl text-center hover:border-orange-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 shadow-sm"
              >
                <div className="text-3xl mb-2 transition-transform duration-300 group-hover:scale-110">{cat.emoji}</div>
                <div className="text-xs font-semibold text-slate-700 leading-tight group-hover:text-orange-600 transition-colors">{cat.name}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Ad Unit - After Categories */}
        <section className="max-w-7xl mx-auto px-4 py-4">
          <AdUnit adSlot="4555302221" adFormat="horizontal" />
        </section>

        {/* Featured Products with Search + Pagination */}
        {featured.length > 0 && (
          <section id="products" className="max-w-7xl mx-auto px-4 py-16">
            <div className="text-center mb-10">
              <span className="text-xs font-semibold text-orange-500 uppercase tracking-widest">Ofertas em Destaque</span>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mt-1">⭐ Destaques da Semana</h2>
            </div>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto mb-10">
              <div className="relative">
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
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      const q = (e.target as HTMLInputElement).value.trim()
                      navigate(q ? `/produtos?q=${encodeURIComponent(q)}` : '/produtos')
                    }
                  }}
                  placeholder="Buscar em Destaques..."
                  className="w-full pl-12 pr-12 py-4 bg-white border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 text-sm font-medium"
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
              <div className="flex items-center justify-between mt-3">
                {searchQuery && (
                  <p className="text-sm text-slate-500">
                    {filteredProducts.length === 0
                      ? 'Nenhum produto encontrado nos Destaques.'
                      : `${filteredProducts.length} resultado${filteredProducts.length !== 1 ? 's' : ''} nos Destaques`}
                  </p>
                )}
                <p className="text-xs text-slate-400 ml-auto">
                  Pressione <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-xs font-mono border border-slate-200">Enter</kbd> para buscar em{' '}
                  <Link to="/produtos" className="text-orange-500 hover:text-orange-600 font-medium underline">
                    todos os produtos
                  </Link>
                </p>
              </div>
            </div>

            <ProductGrid products={paginatedProducts} />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              scrollTo="#products"
            />
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default Home
