interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  scrollTo?: string
}

function Pagination({ currentPage, totalPages, onPageChange, scrollTo }: PaginationProps) {
  if (totalPages <= 1) return null

  const getPages = () => {
    const pages: (number | '...')[] = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (currentPage > 3) pages.push('...')
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i)
      }
      if (currentPage < totalPages - 2) pages.push('...')
      pages.push(totalPages)
    }
    return pages
  }

  const scrollToTarget = () => {
    if (scrollTo) {
      const el = document.querySelector(scrollTo)
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 20
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleChange = (page: number) => {
    onPageChange(page)
    scrollToTarget()
  }

  const btnBase = 'flex items-center gap-1 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200'

  return (
    <div className="flex items-center justify-center gap-1.5 mt-12">
      <button
        onClick={() => handleChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${btnBase} text-slate-500 hover:text-orange-600 hover:bg-orange-50 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-500`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Anterior
      </button>

      <div className="flex items-center gap-1">
        {getPages().map((page, idx) =>
          page === '...' ? (
            <span key={`dots-${idx}`} className="w-9 h-9 flex items-center justify-center text-slate-400 text-sm">
              …
            </span>
          ) : (
            <button
              key={page}
              onClick={() => handleChange(page)}
              className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all duration-200 ${
                page === currentPage
                  ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-md shadow-orange-500/20'
                  : 'text-slate-600 hover:bg-orange-50 hover:text-orange-600'
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        onClick={() => handleChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${btnBase} text-slate-500 hover:text-orange-600 hover:bg-orange-50 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-500`}
      >
        Próxima
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

export default Pagination
