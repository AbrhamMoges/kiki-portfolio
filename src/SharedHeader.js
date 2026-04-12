import { useState, useEffect } from 'react'
import NavHamburger from './NavHamburger'
import HeaderKalkidane from './HeaderKalkidane'

/**
 * Same header bar as Home (logo menu — Kalkidane — spacer). Not used on splash.
 */
export default function SharedHeader() {
  const [opacity, setOpacity] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    setOpacity(1)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <header
      style={{
        width: '100%',
        padding: isMobile ? '0px 20px' : '0px 40px',
        paddingTop: isMobile ? '0px' : '0px',
        marginTop: isMobile ? '-24px' : '-24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        boxSizing: 'border-box',
        overflow: 'visible',
      }}
    >
      <NavHamburger opacity={opacity} />

      <HeaderKalkidane isMobile={isMobile} opacity={opacity} />

      <div
        aria-hidden
        style={{
          flex: 1,
          minWidth: 0,
          opacity,
          transition: 'opacity 2s ease-in-out',
        }}
      />
    </header>
  )
}
