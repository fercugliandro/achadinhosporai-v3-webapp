import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CATEGORIES } from '../lib/config'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-white/90 backdrop-blur-lg border-b border-slate-200/60 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 group">
            <span className="text-2xl transition-transform duration-300 group-hover:scale-110">🛍️</span>
            <span className="text-xl font-extrabold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent tracking-tight">
              Achadinhos por Aí
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              to="/produtos"
              className="text-sm text-slate-600 hover:text-orange-500 hover:bg-orange-50 px-3 py-1.5 rounded-lg transition-colors font-medium"
            >
              Todos os Produtos
            </Link>
            <span className="w-px h-5 bg-slate-200 mx-1" />
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                to={`/category/${cat.slug}`}
                className="text-sm text-slate-600 hover:text-orange-500 hover:bg-orange-50 px-2.5 py-1.5 rounded-lg transition-colors font-medium whitespace-nowrap"
              >
                {cat.emoji} {cat.name}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-orange-500 hover:bg-orange-50 transition-colors"
            aria-label="Menu"
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-lg animate-fadeIn">
          <div className="px-4 py-3 space-y-1">
            <Link
              to="/produtos"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-sm text-orange-600 hover:text-orange-500 hover:bg-orange-50 px-3 py-2 rounded-lg transition-colors font-semibold"
            >
              <span>📋</span>
              <span>Todos os Produtos</span>
            </Link>
            <hr className="border-slate-100 my-2" />
            <div className="grid grid-cols-2 gap-1">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/category/${cat.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-sm text-slate-700 hover:text-orange-500 hover:bg-orange-50 px-3 py-2 rounded-lg transition-colors font-medium"
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
