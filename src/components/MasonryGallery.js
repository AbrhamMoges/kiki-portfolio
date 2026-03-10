import { useMemo } from 'react'

export default function MasonryGallery({ items, onSelect, className = '' }) {
  const safeItems = useMemo(() => items || [], [items])

  return (
    <div className={`masonry ${className}`} role="list" aria-label="Photo gallery">
      {safeItems.map((item, index) => (
        <button
          key={item.id ?? item.src ?? index}
          type="button"
          className="masonryCard"
          role="listitem"
          onClick={(e) => {
            const img = e.currentTarget.querySelector('img')
            const rect = img?.getBoundingClientRect?.()
            onSelect?.(index, rect ?? null)
          }}
        >
          <img className="masonryImg" src={item.src} alt={item.alt ?? ''} loading="lazy" />
        </button>
      ))}
    </div>
  )
}

