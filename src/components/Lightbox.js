import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

export default function Lightbox({
  isOpen,
  items,
  index,
  originRect,
  onClose,
  onNavigate,
}) {
  const [visible, setVisible] = useState(false)
  const panelRef = useRef(null)

  const current = useMemo(() => (items && index != null ? items[index] : null), [items, index])

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.()
      if (e.key === 'ArrowLeft') onNavigate?.(-1)
      if (e.key === 'ArrowRight') onNavigate?.(1)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose, onNavigate])

  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) setVisible(true)
  }, [isOpen])

  useLayoutEffect(() => {
    if (!isOpen) return
    if (!visible) return
    const el = panelRef.current
    if (!el) return

    // Start slightly scaled down + transparent; then animate in.
    el.classList.remove('lightboxPanel--in')
    requestAnimationFrame(() => {
      el.classList.add('lightboxPanel--in')
    })
  }, [isOpen, index, visible])

  useLayoutEffect(() => {
    if (!isOpen) return
    if (!visible) return
    if (!originRect) return

    const el = panelRef.current
    if (!el) return

    // "Expands from gallery": approximate by transforming panel
    // from the clicked image rect to center.
    const vw = window.innerWidth
    const vh = window.innerHeight

    const target = el.getBoundingClientRect()

    const originCx = originRect.left + originRect.width / 2
    const originCy = originRect.top + originRect.height / 2
    const targetCx = target.left + target.width / 2
    const targetCy = target.top + target.height / 2

    const dx = originCx - targetCx
    const dy = originCy - targetCy
    const scaleX = originRect.width / Math.max(target.width, 1)
    const scaleY = originRect.height / Math.max(target.height, 1)
    const startScale = Math.max(0.2, Math.min(1, Math.min(scaleX, scaleY)))

    // Clamp translation a bit (avoid crazy on very small screens)
    const clampedDx = Math.max(-vw, Math.min(vw, dx))
    const clampedDy = Math.max(-vh, Math.min(vh, dy))

    el.animate(
      [
        { transform: `translate(${clampedDx}px, ${clampedDy}px) scale(${startScale})`, opacity: 0.4 },
        { transform: 'translate(0px, 0px) scale(1)', opacity: 1 },
      ],
      { duration: 260, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)', fill: 'both' }
    )
  }, [isOpen, originRect, index, visible])

  if (!visible) return null

  const close = () => {
    // Let CSS animate out, then unmount.
    const el = panelRef.current
    if (el) el.classList.remove('lightboxPanel--in')
    setTimeout(() => {
      setVisible(false)
      onClose?.()
    }, 180)
  }

  return (
    <div
      className={`lightbox ${isOpen ? 'lightbox--open' : ''}`}
      onMouseDown={(e) => {
        const panel = panelRef.current
        if (panel && !panel.contains(e.target)) close()
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Photo preview"
    >
      <div className="lightboxScrim" />
      <div className="lightboxPanel" ref={panelRef}>
        {current ? (
          <img className="lightboxImg" src={current.src} alt={current.alt ?? ''} />
        ) : null}
      </div>
    </div>
  )
}

