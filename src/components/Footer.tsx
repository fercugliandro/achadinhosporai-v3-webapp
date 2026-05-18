import { Link } from 'react-router-dom'
import { SITE_NAME, CATEGORIES } from '../lib/config'

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🛍️</span>
              <span className="text-lg font-extrabold text-white tracking-tight">{SITE_NAME}</span>
            </div>
            <p className="text-sm leading-relaxed">
              Encontre os melhores produtos da Amazon e outros Sellers com preços imperdíveis.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">Categorias</h4>
            <div className="grid grid-cols-2 gap-1">
              {CATEGORIES.map(cat => (
                <Link
                  key={cat.slug}
                  to={`/category/${cat.slug}`}
                  className="text-sm hover:text-orange-400 transition-colors py-0.5"
                >
                  {cat.emoji} {cat.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">Links</h4>
            <div className="flex flex-col gap-1">
              <Link to="/disclosure" className="text-sm hover:text-orange-400 transition-colors py-0.5">Divulgação</Link>
              <Link to="/privacy" className="text-sm hover:text-orange-400 transition-colors py-0.5">Privacidade</Link>
              <Link to="/terms" className="text-sm hover:text-orange-400 transition-colors py-0.5">Termos de Uso</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-8 text-center text-xs text-slate-500 space-y-1">
          <p>© {new Date().getFullYear()} {SITE_NAME}. Todos os preços estão sujeitos a alteração sem aviso prévio.</p>
          <p>Este site participa do Programa de Associados da Amazon e recebe comissões por compras qualificadas.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
