import { useEffect, useLayoutEffect, useRef, useState, useId } from 'react'
import { useNavigate } from 'react-router-dom'

export const HOME_IMG_ABOUT = '/About%20kiki.jpg'
export const HOME_IMG_MEDIA = '/Media%20Alternative%20.jpeg'
export const HOME_IMG_JOURNAL = '/New%20Digital%20Journal.jpg'

/**
 * Site nav: Kstaura logo opens the menu (Home / About / Media / Digital Journal). Splash excluded.
 */
const VIEWPORT_EDGE = 16

export default function NavHamburger() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [panelStyle, setPanelStyle] = useState({ top: 0, left: VIEWPORT_EDGE, width: 280 })
  const menuWrapRef = useRef(null)
  const buttonRef = useRef(null)
  const panelRef = useRef(null)
  const menuNavId = useId().replace(/:/g, '')

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  useLayoutEffect(() => {
    if (!menuOpen || !buttonRef.current) return
    const update = () => {
      const r = buttonRef.current.getBoundingClientRect()
      const left = Math.max(VIEWPORT_EDGE, r.left)
      const top = r.bottom + 6
      const w = Math.min(280, Math.max(0, window.innerWidth - left - VIEWPORT_EDGE))
      setPanelStyle({ top, left, width: w })
    }
    update()
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, true)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update, true)
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onPointer = (e) => {
      const inWrap = menuWrapRef.current?.contains(e.target)
      const inPanel = panelRef.current?.contains(e.target)
      if (!inWrap && !inPanel) setMenuOpen(false)
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('touchstart', onPointer, { passive: true })
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('touchstart', onPointer)
    }
  }, [menuOpen])

  const goHomePage = () => {
    setMenuOpen(false)
    navigate('/home')
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 50)
  }

  const goDigitalJournal = () => {
    setMenuOpen(false)
    navigate('/digital-journal')
  }

  return (
    <div
      ref={menuWrapRef}
      className="page2HamburgerWrap"
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        className="page2HamburgerBtn"
        aria-expanded={menuOpen}
        aria-controls={menuNavId}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setMenuOpen((o) => !o)}
      >
        <img
          src="/Kstaura Black logo.png"
          alt=""
          className="page2NavLogoImg"
          draggable={false}
          loading="eager"
          fetchPriority="high"
          onError={(e) => {
            console.error('Image failed to load:', e.target.src)
            e.target.style.border = '2px solid red'
          }}
        />
      </button>
      {menuOpen ? (
        <nav
          ref={panelRef}
          id={menuNavId}
          className="page2MenuPanel"
          role="navigation"
          aria-label="Page sections"
          style={{
            top: panelStyle.top,
            left: panelStyle.left,
            width: panelStyle.width,
          }}
        >
          <button type="button" className="page2MenuItem" onClick={goHomePage}>
            <img src="/home-artwork.png" alt="Home" style={{ height: '48px', width: 'auto', mixBlendMode: 'multiply', display: 'block' }} />
          </button>
          <button
            type="button"
            className="page2MenuItem"
            onClick={() => {
              setMenuOpen(false)
              navigate('/page3')
            }}
          >
            <img src="/about-artwork.png" alt="About Me" style={{ height: '48px', width: 'auto', mixBlendMode: 'multiply', display: 'block' }} />
          </button>
          <button
            type="button"
            className="page2MenuItem"
            onClick={() => {
              setMenuOpen(false)
              navigate('/media')
            }}
          >
            <img src="/multimedia-artwork.png" alt="Media" style={{ height: '48px', width: 'auto', mixBlendMode: 'multiply', display: 'block' }} />
          </button>
          <button type="button" className="page2MenuItem" onClick={goDigitalJournal}>
            <img src="/blog-artwork.png" alt="Digital Journal" style={{ height: '48px', width: 'auto', mixBlendMode: 'multiply', display: 'block' }} />
          </button>
        </nav>
      ) : null}
    </div>
  )
}
