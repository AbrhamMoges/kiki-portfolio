import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './styles.css'
import App from './App'
import Page2Home from './Page2'
import Page3 from './Page3'
import Media from './Media'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/home" element={<Page2Home />} />
      <Route path="/page2" element={<Navigate to="/home" replace />} />
      <Route path="/page3" element={<Page3 />} />
      <Route path="/media" element={<Media />} />
    </Routes>
  </BrowserRouter>
)
