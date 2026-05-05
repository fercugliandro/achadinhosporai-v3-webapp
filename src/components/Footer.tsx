
import { SITE_NAME } from '../lib/config'

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">{SITE_NAME}</h3>
            <p className="text-sm">
              Encontre os melhores produtos da Amazon e outros Sellers com preços imperdíveis.
            </p>
          </div>

        </div>

        <div className="border-t border-gray-800 mt-12 pt-12 text-center text-sm">
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
