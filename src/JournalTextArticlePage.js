import { useEffect } from 'react'
import SharedHeader from './SharedHeader'
import SiteFooter from './SiteFooter'

/**
 * Same shell as journal PDF essays (white page, Caveat title, header/footer)
 * but body content is HTML — no nested PDF scroll areas.
 */
export default function JournalTextArticlePage({ title, children }) {
  useEffect(() => {
    const prev = document.body.style.background
    document.body.style.background = '#ffffff'
    document.documentElement.classList.add('journalArticleHideScrollbars')
    return () => {
      document.body.style.background = prev || '#151515'
      document.documentElement.classList.remove('journalArticleHideScrollbars')
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
          overflowX: 'hidden',
        }}
      >
        <SharedHeader opacity={1} />
        <main
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            paddingLeft: 24,
            paddingRight: 24,
            paddingBottom: 48,
            /* Fixed header + 3D logo (~228px) sits above flow — keep title clear */
            paddingTop: 'max(260px, calc(env(safe-area-inset-top, 0px) + 220px))',
            boxSizing: 'border-box',
            width: '100%',
            maxWidth: '100%',
            margin: '0 auto',
            overflowX: 'hidden',
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
          <article
            className="journalTextArticleBody"
            style={{
              width: 'min(92vw, 820px)',
              maxWidth: '100%',
              margin: '28px auto 0',
              boxSizing: 'border-box',
              overflowX: 'hidden',
            }}
          >
            {children}
          </article>
        </main>
        <SiteFooter />
      </div>
    </>
  )
}
