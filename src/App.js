import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// Splash video is bundled from here (not public/). After changing Kstaura Splash Annimation.mov, re-encode to MP4 and replace this file.
// For maximum clarity, export at 1920×1080 (or higher) H.264 with a higher bitrate — enlarging a small file in the browser will always look soft.
import splashMp4 from './assets/splash-kstaura.mp4'

const PUBLIC_SPLASH_MP4 = `${process.env.PUBLIC_URL || ''}/kstaura-splash.mp4`

export default function App(props) {
  const videoRef = useRef(null)
  const navigate = useNavigate()
  const hasNavigatedRef = useRef(false)
  const [videoSrc, setVideoSrc] = useState(splashMp4)
  const [videoAspect, setVideoAspect] = useState('16 / 9')

  // Safari / iOS: autoplay only works if muted is applied in the DOM; attribute alone is not always enough.
  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    el.muted = true
    el.defaultMuted = true
    el.setAttribute('muted', '')
    el.setAttribute('playsinline', '')
    el.setAttribute('webkit-playsinline', '')
  }, [videoSrc])

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
  }, [videoSrc])

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    let id
    const onMeta = () => {
      if (el.videoWidth > 0 && el.videoHeight > 0) {
        setVideoAspect(`${el.videoWidth} / ${el.videoHeight}`)
      }
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
  }, [navigate, videoSrc])

  const goHome = () => {
    if (hasNavigatedRef.current) return
    hasNavigatedRef.current = true
    navigate('/page2')
  }

  const handleVideoError = (e) => {
    const err = e?.currentTarget?.error
    console.error('Splash video failed to load:', err, videoSrc)
    if (videoSrc === splashMp4 && PUBLIC_SPLASH_MP4) {
      setVideoSrc(PUBLIC_SPLASH_MP4)
    }
  }

  return (
    <div {...props} className="splashRoot">
      <video
        key={videoSrc}
        ref={videoRef}
        className="splashVideo"
        src={videoSrc}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={goHome}
        onClick={goHome}
        onError={handleVideoError}
        style={{ aspectRatio: videoAspect }}
      />
    </div>
  )
}
