import { Link } from 'react-router-dom'
import { SITE_NAME, CATEGORIES } from '../lib/config'

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="text-2xl">🛍️</span>
              <span className="text-lg font-extrabold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent tracking-tight">
                {SITE_NAME}
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Encontre os melhores produtos com os melhores preços. Curadoria feita especialmente para você.
            </p>
            <div className="flex gap-3">
              <Link to="/produtos" className="text-sm text-orange-400 hover:text-orange-300 transition-colors font-medium">
                Ver Todos os Produtos →
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-5 text-xs uppercase tracking-widest">Categorias</h4>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
              {CATEGORIES.map(cat => (
                <Link
                  key={cat.slug}
                  to={`/category/${cat.slug}`}
                  className="text-sm text-slate-400 hover:text-orange-400 transition-colors py-0.5"
                >
                  {cat.emoji} {cat.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-5 text-xs uppercase tracking-widest">Links</h4>
            <div className="flex flex-col gap-2">
              <Link to="/disclosure" className="text-sm text-slate-400 hover:text-orange-400 transition-colors py-0.5">Divulgação</Link>
              <Link to="/privacy" className="text-sm text-slate-400 hover:text-orange-400 transition-colors py-0.5">Privacidade</Link>
              <Link to="/terms" className="text-sm text-slate-400 hover:text-orange-400 transition-colors py-0.5">Termos de Uso</Link>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-5 text-xs uppercase tracking-widest">Sobre</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Site parceiro Amazon e Mercado Livre. Os preços podem variar sem aviso prévio.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {SITE_NAME}. Todos os direitos reservados.</p>
          <p>Este site participa do Programa de Associados da Amazon e recebe comissões por compras qualificadas.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
