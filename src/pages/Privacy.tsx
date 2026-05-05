import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Privacy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Política de Privacidade</h1>

          <div className="prose prose-gray max-w-none">
            <p>
              Sua privacidade é importante para nós. Esta Política de Privacidade descreve como
              coletamos, usamos e protegemos suas informações ao usar nosso site.
            </p>

            <h2>Coleta de Informações</h2>
            <p>
              Este site não coleta informações pessoais diretamente. Podemos usar ferramentas de
              análise (como Google Analytics) que coletam dados anônimos sobre o uso do site.
            </p>

            <h2>Cookies</h2>
            <p>
              Utilizamos cookies para melhorar sua experiência de navegação e para fins de
              rastreamento de afiliados (Amazon Associates). Você pode desativar os cookies
              nas configurações do seu navegador.
            </p>

            <h2>Links Externos</h2>
            <p>
              Este site contém links para sites externos (Amazon e outros). Não somos responsáveis
              pelas práticas de privacidade desses sites. Recomendamos ler as políticas de privacidade
              de cada site que visitar.
            </p>

            <p className="text-sm text-gray-500 mt-8">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Privacy
