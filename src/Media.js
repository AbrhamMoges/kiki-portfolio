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
          <div style={{ textAlign: 'center', margin: '240px 0 16px' }}>
            <img src="/photography-artwork.png" alt="Photography" style={{ height: '320px', width: 'auto', mixBlendMode: 'multiply' }} />
          </div>
          <main className="galleryMain">
            <MasonryGallery
              items={items}
              onSelect={(idx, rect) => {
                setActiveIndex(idx)
                setOriginRect(rect)
              }}
            />
          </main>
          <div style={{ textAlign: 'center', margin: '80px 0 40px' }}>
            <img src="/video-artwork.png" alt="Videos" style={{ height: '320px', width: 'auto', mixBlendMode: 'multiply' }} />
          </div>
          {/* 1. Ethiopian New Year */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 auto 40px', padding: '0 20px', maxWidth: '900px', width: '100%' }}>
            <a href="https://youtu.be/M4m-bnWGuDw" target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', position: 'relative' }}>
              <img src="https://img.youtube.com/vi/M4m-bnWGuDw/hqdefault.jpg" alt="Watch video" style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)' }}>
                <svg width="72" height="72" viewBox="0 0 72 72" fill="none"><circle cx="36" cy="36" r="36" fill="rgba(0,0,0,0.55)" /><polygon points="28,20 28,52 56,36" fill="#fff" /></svg>
              </div>
            </a>
            <div style={{ width: '100%', marginTop: '12px', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '13px', color: '#000', lineHeight: 1.7 }}>
              <div><strong>Ethiopian New Year</strong></div>
              <div>Director: Kalkidane Negewo</div>
            </div>
          </div>
          {/* 2. Hunchos Music Video */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 auto 40px', padding: '0 20px', maxWidth: '900px', width: '100%' }}>
            <a href="https://www.youtube.com/watch?v=DW1SckzGBg8" target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', position: 'relative' }}>
              <img src="https://img.youtube.com/vi/DW1SckzGBg8/maxresdefault.jpg" alt="Watch video" style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)' }}>
                <svg width="72" height="72" viewBox="0 0 72 72" fill="none"><circle cx="36" cy="36" r="36" fill="rgba(0,0,0,0.55)" /><polygon points="28,20 28,52 56,36" fill="#fff" /></svg>
              </div>
            </a>
            <div style={{ width: '100%', marginTop: '12px', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '13px', color: '#000', lineHeight: 1.7 }}>
              <div><strong>Hunchos" Music Video</strong></div>
              <div>Director: Kalkidane Negewo</div>
              <div>Videographer: RyanTheCrashDummy</div>
            </div>
          </div>
          {/* 3. Black History Month */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 auto 40px', padding: '0 20px', maxWidth: '900px', width: '100%' }}>
            <a href="https://youtu.be/wSbTQ6Jtp2Q" target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', position: 'relative' }}>
              <img src="https://img.youtube.com/vi/wSbTQ6Jtp2Q/maxresdefault.jpg" alt="Watch video" style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)' }}>
                <svg width="72" height="72" viewBox="0 0 72 72" fill="none"><circle cx="36" cy="36" r="36" fill="rgba(0,0,0,0.55)" /><polygon points="28,20 28,52 56,36" fill="#fff" /></svg>
              </div>
            </a>
            <div style={{ width: '100%', marginTop: '12px', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '13px', color: '#000', lineHeight: 1.7 }}>
              <div><strong>Black History Month</strong></div>
              <div>Edit: Kalkidane Negewo</div>
            </div>
          </div>
          {/* 4. International Women's Day */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 auto 80px', padding: '0 20px', maxWidth: '900px', width: '100%' }}>
            <a href="https://youtu.be/tdeDJqS11ew" target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', position: 'relative' }}>
              <img src="https://img.youtube.com/vi/tdeDJqS11ew/maxresdefault.jpg" alt="Watch video" style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)' }}>
                <svg width="72" height="72" viewBox="0 0 72 72" fill="none"><circle cx="36" cy="36" r="36" fill="rgba(0,0,0,0.55)" /><polygon points="28,20 28,52 56,36" fill="#fff" /></svg>
              </div>
            </a>
            <div style={{ width: '100%', marginTop: '12px', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '13px', color: '#000', lineHeight: 1.7 }}>
              <div><strong>International Women's Day</strong></div>
              <div>Shot &amp; Edit: Kalkidane Negewo</div>
            </div>
          </div>
          {/* Elonte Kairos */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 auto 80px', padding: '0 20px', maxWidth: '900px', width: '100%' }}>
            <video
              controls
              style={{ width: '100%', aspectRatio: '16/9', display: 'block', backgroundColor: '#000' }}
            >
              <source src="/elonte-kairos.mov" type="video/mp4" />
            </video>
            <div style={{ width: '100%', marginTop: '12px', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '13px', color: '#000', lineHeight: 1.7 }}>
              <div>Photography Assistant: Kalkidane Negewo</div>
              <div>Videography: Anthony Ferrell</div>
            </div>
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
