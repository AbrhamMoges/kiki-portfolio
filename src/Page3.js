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
            transition: 'opacity 5s ease 0.5s',
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
            <strong>Kalkidane Negewo</strong>
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
            An Ethiopian, born in Dallas, Texas. She graduated in Geography & The Environments, grounding her work in the intersections of place, resources, & global systems.
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
            She began her career at the final stage of the luxury fashion supply chain, spending two years in e-commerce operations at Bergdorf Goodman & Neiman Marcus. Her work has since expanded upstream, working in the initial stages of the fashion supply chain & global trade of natural fibers. Through different creative systems, she explores fashion as part of the cultural & economic landscape. Her work is committed to intentionally moving the conversation forward.
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
            The core message of Kalkidane&apos;s guiding belief:{' '}
            <strong>Always Believe</strong>.
            <br />
            The dream placed within you is yours to see through.
          </p>
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <img src="/contact-artwork.png" alt="Contact" style={{ height: '160px', width: 'auto', mixBlendMode: 'multiply' }} />
          </div>
          <p style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '13px', fontWeight: 'bold', color: '#000', margin: '20px 0 24px', textAlign: 'center', width: '100%', maxWidth: '720px' }}>
            General Inquiries — @kstaura
          </p>
          <div style={{
            display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
            justifyContent: 'center', gap: '40px',
            marginBottom: '60px', padding: '0',
            maxWidth: '720px', width: '100%',
          }}>
            {[
              { label: 'Instagram', value: '@kstaura', href: 'https://www.instagram.com/kstaura/' },
              { label: 'Twitter', value: '@kstaura', href: 'https://x.com/kstaura' },
              { label: 'Substack', value: '@kstaura', href: 'https://substack.com/@kstaura' },
              { label: 'TikTok', value: '@kikidouluhmeh', href: 'https://www.tiktok.com/@kikidouluhmeh' },
              { label: 'YouTube', value: '@kstaura', href: 'https://www.youtube.com/@kstaura' },
              { label: 'Email', value: 'kstaura.info@gmail.com', href: 'mailto:kstaura.info@gmail.com' },
            ].map(({ label, value, href }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '13px', color: '#000', marginBottom: '4px' }}>{label}</span>
                <a href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <span style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '13px', fontWeight: 'bold', color: '#000',  }}>{value}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
        <SiteFooter />
      </div>
    </>
  )
}
