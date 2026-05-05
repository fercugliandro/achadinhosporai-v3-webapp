import { Product } from '../types/product'
import { getAffiliateUrl } from '../lib/amazon'

function ProductCard({ product, horizontal }: { product: Product; horizontal?: boolean }) {
  const affiliateUrl = getAffiliateUrl(product.amazonUrl)
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  if (horizontal) {
    return (
      <div className="flex flex-col sm:flex-row bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden border border-gray-100">
        <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0">
          <img src={product.image} alt={product.name} className="w-full h-full object-contain p-4" />
          {discount > 0 && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{discount}%
            </span>
          )}
        </div>
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
            {product.description && (
              <p className="text-sm text-gray-600 mb-2">{product.description}</p>
            )}
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-orange-600">R$ {product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">R$ {product.originalPrice.toFixed(2)}</span>
              )}
            </div>
          </div>
          <a
            href={affiliateUrl}
            target="_blank"
            rel="nofollow noopener"
            className="mt-3 bg-orange-600 text-white text-center py-2 px-4 rounded-lg hover:bg-orange-700 transition font-medium"
          >
            Ver Oferta na Amazon →
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden border border-gray-100 flex flex-col">
      <div className="relative aspect-square">
        <img src={product.image} alt={product.name} className="w-full h-full object-contain p-4" />
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{discount}%
          </span>
        )}
        {product.bestSeller && (
          <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
            Mais Vendido
          </span>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
        <div className="mt-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl font-bold text-orange-600">R$ {product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">R$ {product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <a
            href={affiliateUrl}
            target="_blank"
            rel="nofollow noopener"
            className="block w-full bg-orange-600 text-white text-center py-2 px-4 rounded-lg hover:bg-orange-700 transition font-medium"
          >
            Ver Oferta →
          </a>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
