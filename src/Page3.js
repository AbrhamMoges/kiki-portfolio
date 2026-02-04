import { useEffect } from 'react'

export default function Page3() {
  useEffect(() => {
    const prev = document.body.style.background
    document.body.style.background = '#ffffff'
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
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          boxSizing: 'border-box',
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
          Kalkidane Negewo is an Ethiopian-American creative and researcher born in Dallas, Texas. She holds a degree in Geography & Environmental Science, grounding her work in the intersections of place, resources, and global systems.
          {' '}
          She began her career at the final stage of the luxury fashion supply chain, spending three years in e-commerce operations at Bergdorf Goodman. Her work has since expanded upstream, now engaging with the early stages of the fashion supply chain through global trade operations of natural fibers.
          {' '}
          Through research, short stories, and video essays, Kalkidane explores fashion as a cultural and economic force—one shaped by geography, labor, and global exchange. Her creative and consulting work is driven by curiosity, systems-thinking, and a commitment to continual growth.
          {' '}
          At the core of her work is a guiding belief: Always Have Faith. The dream placed within you is yours to see through.
        </p>
      </div>
    </>
  )
}
