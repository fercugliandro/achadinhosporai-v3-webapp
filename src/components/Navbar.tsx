import { Link } from 'react-router-dom'
import { CATEGORIES } from '../lib/config'

function Navbar() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-orange-600">
            Achadinhos por Aí
          </Link>

          <div className="hidden md:flex space-x-6">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                to={`/category/${cat.slug}`}
                className="text-gray-700 hover:text-orange-600 transition"
              >
                {cat.emoji} {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
