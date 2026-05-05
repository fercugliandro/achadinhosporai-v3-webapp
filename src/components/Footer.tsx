import { Link } from 'react-router-dom'
import { SITE_NAME } from '../lib/config'

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">{SITE_NAME}</h3>
            <p className="text-sm">
              Encontre os melhores produtos da Amazon com preços imperdíveis.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Links Úteis</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/disclosure" className="hover:text-orange-400">Divulgação de Afiliados</Link></li>
              <li><Link to="/privacy" className="hover:text-orange-400">Política de Privacidade</Link></li>
              <li><Link to="/terms" className="hover:text-orange-400">Termos de Uso</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Categorias</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/category/tech" className="hover:text-orange-400">Tecnologia</Link></li>
              <li><Link to="/category/home" className="hover:text-orange-400">Casa & Cozinha</Link></li>
              <li><Link to="/category/gaming" className="hover:text-orange-400">Gaming</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} {SITE_NAME}. Todos os preços estão sujeitos a alteração sem aviso prévio.</p>
          <p className="mt-2 text-xs text-gray-500">
            Este site participa do Programa de Associados da Amazon e recebe comissões por compras qualificadas.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
