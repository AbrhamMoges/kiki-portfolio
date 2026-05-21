import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SharedHeader from './SharedHeader'
import SiteFooter from './SiteFooter'

export const CHANEL_ESSAY_PATH = '/i-see-both-sides-like-chanel'
export const SUSTAINABILITY_ESSAY_PATH = '/the-cost-of-sustainability-in-the-world-of-fast-fashion'
export const SOCCER_FASHION_PATH = '/the-global-influence-of-soccer-and-fashion'

const JOURNAL_ITEMS = [
  {
    file: 'The Cost of Sustainability in the World of Fast Fashion.jpg',
    title: 'The Cost of Sustainability in the World of Fast Fashion',
    href: SUSTAINABILITY_ESSAY_PATH,
  },
  {
    file: 'The Global Influence of Soccer & Fashion.jpg',
    title: 'The Global Influence of Soccer & Fashion',
    href: SOCCER_FASHION_PATH,
    crop: true,
  },
  {
    file: 'I See Both Sides, Like Chanel.jpg',
    title: 'I See Both Sides, Like Chanel',
    href: CHANEL_ESSAY_PATH,
  },
]

function journalImageSrc(filename) {
  const base = process.env.PUBLIC_URL || ''
  return `${base}/${encodeURIComponent(filename)}`
}

/**
 * Digital Journal — same site chrome as Media / About (SharedHeader + footer).
 */
export default function DigitalJournal() {
  const navigate = useNavigate()
  const [opacity, setOpacity] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [hoverIndex, setHoverIndex] = useState(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const prev = document.body.style.background
    document.body.style.background = '#ffffff'
    setOpacity(1)
    return () => {
      document.body.style.background = prev || '#151515'
    }
  }, [])

  // Match Home (Page2) column + frame layout; two columns instead of three.
  const journalColumnContent = isMobile
    ? { width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }
    : {
        width: '100%',
        maxWidth: 'min(520px, calc((100vw - 96px) / 2 - 12px))',
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      }

  /** Outer column: centers the shrink-wrapped image + overlay. */
  const journalFrameStyle = isMobile
    ? { width: '100%' }
    : {
        width: '100%',
        height: 'min(580px, 60vh)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible',
      }

  /** Wraps only the bitmap bounds so the dim overlay matches the picture (no letterbox bleed). */
  const journalImageWrapStyle = isMobile
    ? { position: 'relative', width: '100%', display: 'block', lineHeight: 0 }
    : {
        position: 'relative',
        display: 'inline-block',
        maxWidth: '100%',
        lineHeight: 0,
        margin: '0 auto',
        verticalAlign: 'middle',
      }

  const journalImgInFrame = isMobile
    ? {
        width: '100%',
        height: 'auto',
        maxHeight: 'none',
        objectFit: 'contain',
        display: 'block',
      }
    : {
        maxWidth: '100%',
        maxHeight: 'min(580px, 60vh)',
        width: 'auto',
        height: 'auto',
        objectFit: 'contain',
        display: 'block',
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
            alignItems: 'center',
            width: '100%',
            boxSizing: 'border-box',
            opacity,
            transition: 'opacity 5s ease 0.5s',
            minHeight: 0,
          }}
        >
          <section
            style={{
              width: '100%',
              flex: 1,
              minHeight: isMobile ? 'auto' : 'calc(100vh - 200px)',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: isMobile ? 'stretch' : 'center',
              gap: isMobile ? '12px' : '16px',
              padding: isMobile ? '184px 20px 48px' : '240px 28px 80px',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'center',
                alignItems: 'stretch',
                gap: isMobile ? 'clamp(28px, 8vw, 44px)' : '14px',
                width: '100%',
                maxWidth: isMobile ? 'min(100%, 520px)' : 'none',
                margin: isMobile ? '0 auto' : undefined,
                flex: '1 1 auto',
              }}
            >
              {JOURNAL_ITEMS.map((item, index) => {
                const hovered = hoverIndex === index
                const hasLink = Boolean(item.href)
                return (
                  <div key={item.file} style={journalColumnContent}>
                    <div style={journalFrameStyle}>
                      <div
                        style={{
                          ...(item.crop
                            ? {
                                position: 'relative',
                                width: isMobile ? '100%' : 'calc(min(580px, 60vh) * 0.754)',
                                height: isMobile ? 'auto' : 'min(580px, 60vh)',
                                overflow: 'hidden',
                                display: 'block',
                                margin: '0 auto',
                              }
                            : { ...journalImageWrapStyle }),
                          cursor: hasLink ? 'pointer' : undefined,
                          transform: hovered ? 'scale(1.04)' : 'scale(1)',
                          transition: 'transform 0.2s ease',
                        }}
                        onMouseEnter={() => setHoverIndex(index)}
                        onMouseLeave={() => setHoverIndex(null)}
                        onClick={hasLink ? () => navigate(item.href) : undefined}
                        role={hasLink ? 'link' : undefined}
                        tabIndex={hasLink ? 0 : undefined}
                        onKeyDown={
                          hasLink
                            ? (e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault()
                                  navigate(item.href)
                                }
                              }
                            : undefined
                        }
                        aria-label={hasLink ? `${item.title} — open` : undefined}
                      >
                        <img
                          src={journalImageSrc(item.file)}
                          alt=""
                          style={item.crop
                            ? { width: '100%', height: isMobile ? 'auto' : 'min(580px, 60vh)', objectFit: 'cover', objectPosition: 'center', display: 'block' }
                            : journalImgInFrame}
                          draggable={false}
                        />
                      </div>
                    </div>
                    <div style={{
                      width: (item.crop || item.href === CHANEL_ESSAY_PATH) && !isMobile ? 'calc(min(580px, 60vh) * 0.754)' : '100%',
                      margin: (item.crop || item.href === CHANEL_ESSAY_PATH) && !isMobile ? '12px auto 0' : '12px 0 0',
                      fontFamily: item.href === CHANEL_ESSAY_PATH ? '"Helvetica Neue", Helvetica, Arial, sans-serif' : 'Helvetica, Arial, sans-serif',
                      fontSize: '13px', color: '#000', lineHeight: 1.7,
                    }}>
                      <div><strong>{item.title}</strong></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        </main>
        <SiteFooter />
      </div>
    </>
  )
}
