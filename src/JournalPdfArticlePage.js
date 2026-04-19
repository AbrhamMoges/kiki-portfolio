import { useEffect, useState } from 'react'
import SharedHeader from './SharedHeader'
import SiteFooter from './SiteFooter'
import ChanelPdfViewer from './ChanelPdfViewer'

function pdfPublicUrl(filename) {
  const base = process.env.PUBLIC_URL || ''
  return `${base}/${encodeURIComponent(filename)}`
}

/**
 * Shared layout for Digital Journal PDF essays (react-pdf viewer, header, footer).
 */
export default function JournalPdfArticlePage({ title, pdfFileName }) {
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
        <SharedHeader />
        <main
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            padding: '140px 24px 48px',
            boxSizing: 'border-box',
            opacity,
            transition: 'opacity 5s ease 0.5s',
            width: '100%',
            margin: '0 auto',
            minHeight: 0,
          }}
        >
          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <h1
              style={{
                fontFamily: '"Caveat", cursive',
                fontSize: 'clamp(26px, 5vw, 34px)',
                fontWeight: 'bold',
                color: '#000',
                margin: 0,
                textAlign: 'center',
                width: '100%',
              }}
            >
              {title}
            </h1>
          </div>
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              minHeight: 0,
              marginTop: '28px',
            }}
          >
            <div
              style={{
                width: 'min(92vw, 820px)',
                maxWidth: '100%',
                maxHeight: 'min(calc(100vh - 320px), 90vh)',
                margin: '0 auto',
                overflow: 'auto',
                backgroundColor: 'transparent',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              <ChanelPdfViewer fileUrl={pdfPublicUrl(pdfFileName)} />
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    </>
  )
}
