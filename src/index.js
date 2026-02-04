import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles.css'
import App from './App'
import Page2Home from './Page2'
import Page3 from './Page3'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/page2" element={<Page2Home />} />
      <Route path="/page3" element={<Page3 />} />
    </Routes>
  </BrowserRouter>
)
