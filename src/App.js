import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
// Splash video is bundled from here (not public/). After changing Kstaura Splash Annimation.mov, re-encode to MP4 and replace this file.
import splashMp4 from './assets/splash-kstaura.mp4'

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
    el.addEventListener('canplay', tryPlay)
    el.addEventListener('canplaythrough', tryPlay)
    tryPlay()

    return () => {
      el.removeEventListener('loadeddata', tryPlay)
      el.removeEventListener('canplay', tryPlay)
      el.removeEventListener('canplaythrough', tryPlay)
    }
  }, [])

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

  const handleVideoError = (e) => {
    console.error('Splash video failed to load:', e?.currentTarget?.error, splashMp4)
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
        overflow: 'auto',
        backgroundColor: '#ffffff',
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        boxSizing: 'border-box',
      }}
    >
      <video
        ref={videoRef}
        src={splashMp4}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={goHome}
        onClick={goHome}
        onError={handleVideoError}
        style={{
          width: '100%',
          maxWidth: 'min(1200px, 94vw)',
          height: 'auto',
          maxHeight: 'min(675px, 82vh)',
          objectFit: 'contain',
          objectPosition: 'center center',
          display: 'block',
          cursor: 'pointer',
        }}
      />
    </div>
  )
}
