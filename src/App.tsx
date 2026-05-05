import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Category from './pages/Category'
import Disclosure from './pages/Disclosure'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Go from './pages/Go'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:slug" element={<Category />} />
        <Route path="/go/:id" element={<Go />} />
        <Route path="/disclosure" element={<Disclosure />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
