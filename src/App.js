import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const SPLASH_BASE = 'Splash Page annimation'
const mp4Src = `/${encodeURIComponent(SPLASH_BASE)}.mp4`
const movSrc = `/${encodeURIComponent(SPLASH_BASE)}.mov`

export default function App(props) {
  const videoRef = useRef(null)
  const navigate = useNavigate()
  const hasNavigatedRef = useRef(false)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    const tryPlay = () => {
      el.play().catch(() => {})
    }
    el.addEventListener('loadeddata', tryPlay)
    tryPlay()
    return () => el.removeEventListener('loadeddata', tryPlay)
  }, [])

  // If autoplay is blocked, `ended` may never fire — still advance after known duration.
  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    let id
    const onMeta = () => {
      const d = el.duration
      if (!Number.isFinite(d) || d <= 0) return
      id = window.setTimeout(() => {
        if (!hasNavigatedRef.current) {
          hasNavigatedRef.current = true
          navigate('/page2')
        }
      }, (d + 0.35) * 1000)
    }
    el.addEventListener('loadedmetadata', onMeta)
    return () => {
      window.clearTimeout(id)
      el.removeEventListener('loadedmetadata', onMeta)
    }
  }, [navigate])

  const goHome = () => {
    if (hasNavigatedRef.current) return
    hasNavigatedRef.current = true
    navigate('/page2')
  }

  return (
    <div
      {...props}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        minHeight: '100vh',
        height: '100dvh',
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        zIndex: 1,
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={goHome}
        onClick={goHome}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          /* Full-bleed: cover viewport (vw/vh so sizing isn’t tied to flex/% quirks) */
          minWidth: '100vw',
          minHeight: 'max(100vh, 100dvh)',
          width: 'auto',
          height: 'auto',
          transform: 'translate(-50%, -50%) scale(1.22)',
          objectFit: 'cover',
          objectPosition: 'center center',
          display: 'block',
          cursor: 'pointer',
        }}
      >
        <source src={mp4Src} type="video/mp4" />
        <source src={movSrc} type="video/quicktime" />
        Your browser does not support this video.
      </video>
    </div>
  )
}
