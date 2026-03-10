import { useState, useEffect, useMemo } from 'react'
import SharedHeader from './SharedHeader'

export default function Media() {
  const [opacity, setOpacity] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const prev = document.body.style.background
    document.body.style.background = '#ffffff'
    setOpacity(1)
    return () => {
      document.body.style.background = prev || '#151515'
    }
  }, [])

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth <= 900)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const photoFiles = useMemo(
    () => [
      'photo.jpg',
      'photo copy.jpg',
      'photo-1.jpg',
      'photo-2 (2).jpg',
      'photo-3 (1).jpg',
      'photo-4.jpg',
      'photo-5.jpg',
      'photo-6.jpg',
      'photo-7.jpg',
      'photo-8.jpg',
      'photo-9.jpg',
      'photo-10.jpg',
      'photo-11.jpg',
      'photo-12.jpg',
      'photo-13.jpg',
      'photo-14.jpg',
      'photo-15.jpg',
      'photo-16.jpg',
      'photo-17.jpg',
      'photo-18.jpg',
      'photo-19.jpg',
      'photo-20.jpg',
      'photo-21.jpg',
      'photo-22.jpg',
      'photo-23.jpg',
      'photo-24.jpg',
      'photo-25.jpg',
      'photo-27.jpg',
      'photo-28.jpg',
      'photo-29.jpg',
      'photo-33.jpg',
      'photo-34.jpg',
      'photo-35.jpg',
      'photo-36.jpg',
      'photo-37.jpg',
      'photo-39.jpg',
      'photo-40.jpg',
      'photo-41.jpg',
      'photo-42.jpg',
      'photo-43.jpg',
      'photo-44.jpg',
      'photo-45.jpg',
      'photo-47.jpg',
      'photo-48.jpg',
      'photo-49.jpg',
      'photo-52.jpg',
      'photo-53.jpg',
      'photo-54.jpg',
      'photo-55.jpg',
      'photo-56.jpg',
      'photo-58.jpg',
      'photo-59.jpg',
      'photo-60.jpg',
      'photo-62.jpg',
      'photo-63.jpg',
    ],
    []
  )

  const photos = useMemo(() => {
    // Folder name includes a trailing space in the project.
    const folder = 'Kiki - Photography '
    const folderEncoded = encodeURIComponent(folder)
    return photoFiles.map((file) => ({
      src: `/${folderEncoded}/${encodeURIComponent(file)}`,
      alt: file.replace(/\.[^.]+$/, ''),
    }))
  }, [photoFiles])

  const desktopPattern = useMemo(
    () => [
      { c: 7, r: 10 }, // big hero (like the reference)
      { c: 5, r: 5 },
      { c: 5, r: 5 },
      { c: 4, r: 4 },
      { c: 4, r: 4 },
      { c: 4, r: 4 },
      { c: 6, r: 6 },
      { c: 6, r: 6 },
      { c: 4, r: 5 },
      { c: 4, r: 5 },
      { c: 4, r: 5 },
      { c: 8, r: 6 },
      { c: 4, r: 6 },
      { c: 6, r: 4 },
      { c: 6, r: 4 },
    ],
    []
  )

  const mobilePattern = useMemo(
    () => [
      { c: 6, r: 8 },
      { c: 3, r: 5 },
      { c: 3, r: 5 },
      { c: 3, r: 4 },
      { c: 3, r: 4 },
      { c: 6, r: 6 },
      { c: 3, r: 4 },
      { c: 3, r: 4 },
    ],
    []
  )

  const pattern = isMobile ? mobilePattern : desktopPattern

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
      <div className="mediaPage" style={{ opacity, transition: 'opacity 2s ease-in-out' }}>
        <div className="mediaGridWrap">
          <div className="mediaGrid" aria-label="Media collage">
            {photos.map((p, i) => {
              const span = pattern[i % pattern.length]
              return (
                <div
                  key={p.src}
                  className="mediaTile"
                  style={{
                    gridColumn: `span ${span.c}`,
                    gridRow: `span ${span.r}`,
                  }}
                >
                  <img src={p.src} alt={p.alt} loading="lazy" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
