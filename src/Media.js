import { useEffect, useMemo, useState } from 'react'
import MasonryGallery from './components/MasonryGallery'
import Lightbox from './components/Lightbox'
import { GALLERY_ITEMS } from './gallery/galleryData'
import SharedHeader from './SharedHeader'
import SiteFooter from './SiteFooter'

export default function Media() {
  const [activeIndex, setActiveIndex] = useState(null)
  const [originRect, setOriginRect] = useState(null)

  useEffect(() => {
    const prev = document.body.style.background
    document.body.style.background = '#ffffff'
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
        <div className="galleryShell" style={{ flex: 1, minHeight: 0 }}>
          <h1 style={{ fontFamily: '"Caveat", cursive', fontWeight: 'bold', fontSize: 'clamp(28px, 5vw, 48px)', color: '#000', textAlign: 'center', margin: '240px 0 16px' }}>
            Photography
          </h1>
          <main className="galleryMain">
            <MasonryGallery
              items={items}
              onSelect={(idx, rect) => {
                setActiveIndex(idx)
                setOriginRect(rect)
              }}
            />
          </main>
          <h2 style={{ fontFamily: '"Caveat", cursive', fontWeight: 'bold', fontSize: 'clamp(28px, 5vw, 48px)', color: '#000', textAlign: 'center', margin: '80px 0 40px' }}>
            Videos
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '0 auto 40px', padding: '0 20px', maxWidth: '900px' }}>
            <a
              href="https://www.youtube.com/watch?v=DW1SckzGBg8"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block', width: '100%', position: 'relative' }}
            >
              <img
                src="https://img.youtube.com/vi/DW1SckzGBg8/maxresdefault.jpg"
                alt="Watch video"
                style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(0,0,0,0.2)',
              }}>
                <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                  <circle cx="36" cy="36" r="36" fill="rgba(0,0,0,0.55)" />
                  <polygon points="28,20 28,52 56,36" fill="#fff" />
                </svg>
              </div>
            </a>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '0 auto 80px', padding: '0 20px', maxWidth: '900px' }}>
            <a
              href="https://youtu.be/tdeDJqS11ew"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block', width: '100%', position: 'relative' }}
            >
              <img
                src="https://img.youtube.com/vi/tdeDJqS11ew/maxresdefault.jpg"
                alt="Watch video"
                style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(0,0,0,0.2)',
              }}>
                <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                  <circle cx="36" cy="36" r="36" fill="rgba(0,0,0,0.55)" />
                  <polygon points="28,20 28,52 56,36" fill="#fff" />
                </svg>
              </div>
            </a>
          </div>
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
