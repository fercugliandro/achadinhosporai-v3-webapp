import { Link } from 'react-router-dom'
import { Product } from '../types/product'
import { getAffiliateUrl } from '../lib/amazon'

const STORE_INFO: Record<string, { name: string; color: string }> = {
  amazon: { name: 'Amazon', color: 'bg-[#232F3E]' },
  mercadolivre: { name: 'Mercado Livre', color: 'bg-[#2D3277]' },
}

function ProductCard({ product, horizontal }: { product: Product; horizontal?: boolean }) {
  const affiliateUrl = getAffiliateUrl(product.productUrl, product.source)
  const store = STORE_INFO[product.source] || { name: 'Loja', color: 'bg-slate-600' }

  const hasDiscount = product.originalPrice && product.originalPrice > product.price
  const discount = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0
  const savings = hasDiscount ? product.originalPrice! - product.price : 0

  if (horizontal) {
    return (
      <div className="flex flex-col sm:flex-row bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200">
        <Link
          to={`/product/${product.slug}`}
          className="relative h-44 w-full sm:w-44 sm:h-auto flex-shrink-0 bg-slate-50 flex items-center justify-center"
        >
          <img src={product.image} alt={product.name} className="max-h-40 max-w-full object-contain p-3" />
          {discount > 0 && (
            <span className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
              -{discount}%
            </span>
          )}
        </Link>
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <Link to={`/product/${product.slug}`} className="group">
              <h3 className="font-semibold text-slate-800 mb-1 group-hover:text-orange-600 transition-colors line-clamp-2">
                {product.name}
              </h3>
            </Link>
            {product.description && (
              <p className="text-sm text-slate-500 mb-3 line-clamp-2">{product.description}</p>
            )}
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-orange-500">R$ {product.price.toFixed(2)}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-slate-400 line-through">R$ {product.originalPrice.toFixed(2)}</span>
              )}
            </div>
          </div>
          <a
            href={affiliateUrl}
            target="_blank"
            rel="nofollow noopener"
            className="mt-4 inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2.5 px-5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25"
          >
            Comprar na {store.name}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col relative">
      <Link to={`/product/${product.slug}`} className="relative h-56 flex items-center justify-center bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-52 max-w-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
        />
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-gradient-to-br from-red-500 to-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
            -{discount}%
          </span>
        )}
        <span className={`absolute top-3 right-3 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-md ${store.color}`}>
          {store.name}
        </span>
      </Link>
      <div className="p-4 flex-1 flex flex-col">
        <Link to={`/product/${product.slug}`} className="group/title">
          <h3 className="font-medium text-slate-800 mb-3 line-clamp-2 text-sm leading-snug group-hover/title:text-orange-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-xl font-bold text-orange-500">R$ {product.price.toFixed(2)}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-slate-400 line-through">R$ {product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          {savings > 0 && discount > 0 && (
            <p className="text-xs text-emerald-600 font-medium mb-3">
              Economize R$ {savings.toFixed(2)} (-{discount}%)
            </p>
          )}
          <a
            href={affiliateUrl}
            target="_blank"
            rel="nofollow noopener"
            className="flex items-center justify-center gap-1.5 w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-orange-500/30"
          >
            Comprar na {store.name}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
