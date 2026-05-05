import ProductCard from './ProductCard'
import { Product } from '../types/product'

function ProductGrid({
  products,
  title,
  horizontal,
}: {
  products: Product[]
  title?: string
  horizontal?: boolean
}) {
  if (products.length === 0) {
    return (
      <p className="text-gray-500 text-center py-8">
        Nenhum produto encontrado nesta categoria.
      </p>
    )
  }

  return (
    <section>
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      )}
      <div
        className={
          horizontal
            ? 'space-y-4'
            : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
        }
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} horizontal={horizontal} />
        ))}
      </div>
    </section>
  )
}

export default ProductGrid
