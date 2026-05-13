import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Product } from '../types/product'
import { CATEGORIES } from '../lib/config'
import { getAffiliateUrl } from '../lib/amazon'

function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
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

        const found = data.find((p) => p.slug === slug)
        setProduct(found || null)
      } catch {
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-gray-600">Carregando...</p>
        </main>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-900 mb-2">Produto não encontrado</p>
            <Link to="/" className="text-orange-600 hover:underline">Voltar para Home</Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const affiliateUrl = getAffiliateUrl(product.amazonUrl)
  const category = CATEGORIES.find((c) => c.slug === product.category)
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <nav className="text-sm text-gray-500 mb-8">
            <Link to="/" className="hover:text-orange-600">Home</Link>
            {category && (
              <>
                <span className="mx-2">›</span>
                <Link to={`/category/${category.slug}`} className="hover:text-orange-600">
                  {category.emoji} {category.name}
                </Link>
              </>
            )}
            <span className="mx-2">›</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              <div className="bg-gray-50 rounded-xl flex items-center justify-center p-8">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-w-full max-h-[400px] object-contain"
                />
              </div>

              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2">
                  {category && (
                    <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                      {category.emoji} {category.name}
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="text-sm font-bold bg-red-500 text-white px-3 py-1 rounded-full">
                      -{discount}%
                    </span>
                  )}
                  {product.bestSeller && (
                    <span className="text-sm font-bold bg-yellow-500 text-white px-3 py-1 rounded-full">
                      Mais Vendido
                    </span>
                  )}
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

                {product.description && (
                  <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
                )}

                <div className="flex items-baseline gap-3 mb-8">
                  <span className="text-4xl font-bold text-orange-600">
                    R$ {product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-400 line-through">
                      R$ {product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <a
                  href={affiliateUrl}
                  target="_blank"
                  rel="nofollow noopener"
                  className="inline-block bg-orange-600 text-white text-center py-4 px-8 rounded-xl text-lg font-bold hover:bg-orange-700 transition"
                >
                  Ver Oferta na Amazon →
                </a>

                <p className="text-xs text-gray-400 mt-4">
                  * Preço sujeito a alteração. Ao clicar e comprar, podemos receber comissão.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ProductDetail
