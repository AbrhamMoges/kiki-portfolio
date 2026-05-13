import { useEffect, useRef, useState } from 'react'
import SharedHeader from './SharedHeader'
import SiteFooter from './SiteFooter'

export default function Videography() {
  const iframeRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const handlePlay = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: 'playVideo', args: [] }),
        '*'
      )
    }
    setPlaying(true)
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
          backgroundColor: '#fff',
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
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? '100px 12px 48px' : '120px 32px 60px',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: isMobile ? '100%' : '900px',
              aspectRatio: '16 / 9',
            }}
          >
            <iframe
              ref={iframeRef}
              src="https://www.youtube.com/embed/tdeDJqS11ew?controls=0&showinfo=0&rel=0&modestbranding=1&enablejsapi=1"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Videography"
            />
            {!playing && (
              <div
                onClick={handlePlay}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    width: isMobile ? 56 : 72,
                    height: isMobile ? 56 : 72,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0,0,0,0.65)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: isMobile ? '10px solid transparent' : '13px solid transparent',
                      borderBottom: isMobile ? '10px solid transparent' : '13px solid transparent',
                      borderLeft: isMobile ? '17px solid #fff' : '22px solid #fff',
                      marginLeft: isMobile ? '4px' : '6px',
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <SiteFooter />
      </div>
    </>
  )
}
