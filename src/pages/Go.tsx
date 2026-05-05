import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Go() {
  const { id } = useParams<{ id: string }>()
  const [shortlinks, setShortlinks] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/shortlinks.json')
      .then((res) => res.json())
      .then((data) => setShortlinks(data))
      .catch(() => setShortlinks({}))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!loading && id) {
      const url = shortlinks[id]
      if (url) {
        window.location.href = url
      }
    }
  }, [id, shortlinks, loading])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Redirecionando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-xl font-semibold text-gray-900 mb-2">Link não encontrado</p>
        <a href="/" className="text-orange-600 hover:underline">Voltar para Home</a>
      </div>
    </div>
  )
}

export default Go
