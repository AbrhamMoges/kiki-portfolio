import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './styles.css'
import App from './App'
import Page2Home from './Page2'
import Page3 from './Page3'
import Media from './Media'
import DigitalJournal from './DigitalJournal'
import SeeBothSidesChanel from './SeeBothSidesChanel'
import CostOfSustainabilityFashion from './CostOfSustainabilityFashion'
import MultimediaLanding from './MultimediaLanding'
import Videography from './Videography'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/home" element={<Page2Home />} />
      <Route path="/page2" element={<Navigate to="/home" replace />} />
      <Route path="/page3" element={<Page3 />} />
      <Route path="/multimedia" element={<MultimediaLanding />} />
      <Route path="/videography" element={<Videography />} />
      <Route path="/media" element={<Media />} />
      <Route path="/digital-journal" element={<DigitalJournal />} />
      <Route path="/i-see-both-sides-like-chanel" element={<SeeBothSidesChanel />} />
      <Route
        path="/the-cost-of-sustainability-in-the-world-of-fast-fashion"
        element={<CostOfSustainabilityFashion />}
      />
    </Routes>
  </BrowserRouter>
)
