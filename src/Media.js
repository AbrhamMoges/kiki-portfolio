import { useEffect, useMemo, useState } from 'react'
import MasonryGallery from './components/MasonryGallery'
import Lightbox from './components/Lightbox'
import { GALLERY_ITEMS } from './gallery/galleryData'
import SharedHeader from './SharedHeader'
import SiteFooter from './SiteFooter'

export default function Media() {
  const [opacity, setOpacity] = useState(0)
  const [activeIndex, setActiveIndex] = useState(null)
  const [originRect, setOriginRect] = useState(null)

  useEffect(() => {
    const prev = document.body.style.background
    document.body.style.background = '#ffffff'
    setOpacity(1)
    return () => {
      document.body.style.background = prev || '#151515'
    }
  }, [])

  const items = useMemo(() => GALLERY_ITEMS, [])

  const isOpen = activeIndex != null
  const close = () => {
    setActiveIndex(null)
    setOriginRect(null)
  }

  const navigate = (dir) => {
    if (activeIndex == null) return
    const next = (activeIndex + dir + items.length) % items.length
    setActiveIndex(next)
    setOriginRect(null)
  }

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#ffffff',
          zIndex: 0,
        }}
      />
      <div className="pageWithFooter" style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        <SharedHeader />
        <div className="galleryShell" style={{ opacity, transition: 'opacity 400ms ease', flex: 1, minHeight: 0 }}>
          <main className="galleryMain">
            <MasonryGallery
              items={items}
              onSelect={(idx, rect) => {
                setActiveIndex(idx)
                setOriginRect(rect)
              }}
            />
          </main>
        </div>
        <SiteFooter />
      </div>

      <Lightbox
        isOpen={isOpen}
        items={items}
        index={activeIndex}
        originRect={originRect}
        onClose={close}
        onNavigate={navigate}
      />
    </>
  )
}
