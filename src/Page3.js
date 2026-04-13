import { useState, useEffect } from 'react'
import SharedHeader from './SharedHeader'
import SiteFooter from './SiteFooter'

export default function Page3() {
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    const prev = document.body.style.background
    document.body.style.background = '#ffffff'
    setOpacity(1)
    return () => {
      document.body.style.background = prev || '#151515'
    }
  }, [])

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
      <SharedHeader />
      <div
        className="pageWithFooter"
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '140px 40px 40px',
            boxSizing: 'border-box',
            opacity,
            transition: 'opacity 2s ease-in-out',
          }}
        >
          <img
            src="/kiki.png"
            alt="Kiki"
            style={{
              width: 'auto',
              maxWidth: 'min(360px, 85vw)',
              height: 'auto',
              objectFit: 'contain',
              marginBottom: '32px',
              display: 'block',
            }}
          />
          <p
            style={{
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontSize: 'clamp(14px, 2.5vw, 18px)',
              lineHeight: 1.6,
              color: '#000000',
              margin: 0,
              maxWidth: '720px',
              textAlign: 'center',
            }}
          >
            Kalkidane Negewo is an Ethiopian-American creative professional born in Dallas, Texas. She holds a degree in Geography & The Environments, grounding her work in the intersections of place, resources, & global systems.
          </p>
          <p
            style={{
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontSize: 'clamp(14px, 2.5vw, 18px)',
              lineHeight: 1.6,
              color: '#000000',
              margin: '1em 0 0 0',
              maxWidth: '720px',
              textAlign: 'center',
              textIndent: '1.5em',
            }}
          >
            She began her career at the final stage of the luxury fashion supply chain, spending two years in e-commerce operations at Bergdorf Goodman & Neiman Marcus. Her work has since expanded upstream, now engaging with the initial stages of the fashion supply chain through global trade operations of natural fibers. Engaging in research, short stories, & video essays, she explores fashion as a cultural & economic force shaped by geography, labor, & exchanges. Her work is committed to intentionally moving the conversation forward.
          </p>
          <p
            style={{
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontSize: 'clamp(14px, 2.5vw, 18px)',
              lineHeight: 1.6,
              color: '#000000',
              margin: '1em 0 0 0',
              maxWidth: '720px',
              textAlign: 'center',
              textIndent: '1.5em',
            }}
          >
            The core message of Kalkidane's guiding belief: Always Have Faith. The dream placed within you is yours to see through.
          </p>
        </div>
        <SiteFooter />
      </div>
    </>
  )
}
