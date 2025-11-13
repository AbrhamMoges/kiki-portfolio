import { useState, useEffect } from 'react'

export default function Page2Home(props) {
  const [opacity, setOpacity] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    // Check if mobile on mount and window resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    // Fade in animation on mount
    setOpacity(1)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  return (
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      minHeight: '100vh',
      backgroundColor: 'white', 
      display: 'flex', 
      flexDirection: 'column', 
      position: 'relative',
      overflow: 'visible',
      boxSizing: 'border-box'
    }}>
      {/* Header section with logo */}
      <header style={{
        width: '100%',
        padding: isMobile ? '15px 20px' : '20px 40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        position: 'relative',
        zIndex: 10,
        boxSizing: 'border-box'
      }}>
        <img 
          src="/Kstaura Black logo.png" 
          alt="Kstaura Logo" 
          onError={(e) => {
            console.error('Image failed to load:', e.target.src);
            e.target.style.border = '2px solid red';
          }}
          onLoad={() => console.log('Image loaded successfully')}
          style={{ 
            maxWidth: isMobile ? '150px' : '200px', 
            width: isMobile ? '50%' : 'auto',
            minWidth: isMobile ? '100px' : '150px',
            height: 'auto',
            objectFit: 'contain',
            opacity: opacity,
            transition: 'opacity 1s ease-in-out',
            display: 'block'
          }} 
        />
      </header>
    </div>
  )
}
