import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Terms() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Termos de Uso</h1>

          <div className="prose prose-gray max-w-none">
            <p>
              Ao acessar e usar este site, você concorda com estes Termos de Uso. Por favor,
              leia-os atentamente.
            </p>

            <h2>Uso do Site</h2>
            <p>
              Este site tem finalidade informativa e comercial, apresentando produtos e ofertas
              da Amazon e outros parceiros. As informações sobre preços e disponibilidade são
              fornecidas pelos parceiros e podem sofrer alterações sem aviso prévio.
            </p>

            <h2>Links de Afiliados</h2>
            <p>
              Os links deste site podem ser links de afiliados. Ao clicar e comprar, podemos
              receber uma comissão, sem custo adicional para você. Isso nos ajuda a manter o site.
            </p>

            <h2>Limitação de Responsabilidade</h2>
            <p>
              Não garantimos a precisão das informações apresentadas. Não somos responsáveis
              por transações realizadas diretamente com os parceiros (Amazon, etc.) ou por
              problemas relacionados aos produtos adquiridos.
            </p>

            <h2>Alterações</h2>
            <p>
              Reservamos o direito de modificar estes termos a qualquer momento. As alterações
              entram em vigor imediatamente após a publicação nesta página.
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

export default Terms
