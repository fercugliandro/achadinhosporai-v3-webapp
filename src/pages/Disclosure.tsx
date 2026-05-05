import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Disclosure() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Divulgação de Afiliados</h1>

          <div className="prose prose-gray max-w-none">
            <p>
              Este site participa do Programa de Associados da Amazon (Amazon Associates) e outros
              programas de afiliados. Isso significa que podemos receber uma comissão sobre compras
              feitas através dos links deste site, sem custo adicional para você.
            </p>

            <h2>Como funciona</h2>
            <p>
              Quando você clica em um link de afiliado e realiza uma compra na Amazon, recebemos
              uma pequena comissão. Isso nos ajuda a manter o site e continuar trazendo os melhores
              achadinhos para você.
            </p>

            <h2>Transparência</h2>
            <p>
              Todas os preços e disponibilidade dos produtos estão sujeitos a alterações sem aviso
              prévio. As imagens dos produtos são fornecidas pela Amazon e estão sujeitas a direitos
              autorais. Recomendamos sempre verificar o preço final no site da Amazon antes de efetuar
              a compra.
            </p>

            <h2>Compromisso</h2>
            <p>
              Nossa prioridade é trazer produtos que realmente acreditamos e que oferecem valor.
              Nossa participação em programas de afiliados não influencia nossas recomendações.
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

export default Disclosure
