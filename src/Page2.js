import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavHamburger, { HOME_IMG_ABOUT, HOME_IMG_MEDIA, HOME_IMG_JOURNAL } from './NavHamburger'
import HeaderKalkidane from './HeaderKalkidane'

export default function Page2Home(props) {
  const navigate = useNavigate()
  const [opacity, setOpacity] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [mediaHover, setMediaHover] = useState(false)
  const [aboutHover, setAboutHover] = useState(false)

  useEffect(() => {
    // Check if mobile on mount and window resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    // Fade in animation on mount
    setOpacity(1)

    const prevTitle = document.title
    document.title = 'Home'
    
    return () => {
      window.removeEventListener('resize', checkMobile)
      document.title = prevTitle
    }
  }, [])
  
  return (
    <>
      {/* Fixed background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        zIndex: 0,
        pointerEvents: 'none'
      }} />
      <div style={{ 
        width: '100%', 
        minHeight: '100vh', // Make page scrollable
        backgroundColor: 'transparent', 
        display: 'flex', 
        flexDirection: 'column', 
        position: 'relative',
        zIndex: 5,
        boxSizing: 'border-box',
        overflowX: 'visible',
        overflowY: 'visible'
      }}>
      {/* Header section with logo - Fixed in place */}
      <header style={{
        width: '100%',
        padding: isMobile ? '0px 20px' : '0px 40px',
        paddingTop: isMobile ? '0px' : '0px',
        marginTop: isMobile ? '-24px' : '-24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        boxSizing: 'border-box',
        overflow: 'visible',
      }}>
        <NavHamburger opacity={opacity} />

        <HeaderKalkidane isMobile={isMobile} opacity={opacity} />

        <div
          aria-hidden
          style={{
            flex: 1,
            minWidth: 0,
            opacity,
            transition: 'opacity 2s ease-in-out',
          }}
        />
      </header>
      
      {/* Middle section: About kiki, Multimedia, Digital Journal - large and centered */}
      <section style={{
        width: '100%',
        minHeight: isMobile ? 'auto' : 'calc(100vh - 200px)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: isMobile ? 'stretch' : 'center',
        gap: isMobile ? '12px' : '24px',
        padding: isMobile ? '120px 20px 48px' : '160px 48px 80px',
        position: 'relative',
        zIndex: 5,
        backgroundColor: 'transparent',
        boxSizing: 'border-box',
        opacity,
        transition: 'opacity 2s ease-in-out'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'center',
          alignItems: isMobile ? 'stretch' : 'flex-start',
          gap: isMobile ? 'clamp(28px, 8vw, 44px)' : '24px',
          width: '100%',
          maxWidth: isMobile ? 'min(100%, 520px)' : '1200px',
          margin: isMobile ? '0 auto' : undefined,
          flex: '1 1 auto'
        }}>
          <div
            style={{
              flex: isMobile ? '0 0 auto' : '1 1 0',
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: isMobile ? 'stretch' : 'center',
              cursor: 'pointer',
              transform: aboutHover ? 'scale(1.03)' : 'scale(1)',
              transition: 'transform 0.2s ease',
              opacity: aboutHover ? 0.9 : 1
            }}
            onClick={() => navigate('/page3')}
            onMouseEnter={() => setAboutHover(true)}
            onMouseLeave={() => setAboutHover(false)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && navigate('/page3')}
          >
            <img 
              src={HOME_IMG_ABOUT} 
              alt="About Kiki" 
              onError={(e) => {
                console.error('Image failed to load:', e.target.src);
                e.target.style.border = '2px solid red';
                e.target.style.backgroundColor = '#f0f0f0';
              }}
              style={{ 
                width: '100%',
                maxWidth: isMobile ? '100%' : '380px',
                height: 'auto',
                maxHeight: isMobile ? 'none' : '65vh',
                objectFit: 'contain',
                display: 'block'
              }} 
            />
            <p style={{
              fontFamily: '"Caveat", cursive',
              fontSize: isMobile ? 'clamp(18px, 4.8vw, 22px)' : '16px',
              fontWeight: 'bold',
              color: '#000',
              margin: '10px 0 0 0',
              alignSelf: 'flex-start',
              width: '100%',
              maxWidth: isMobile ? '100%' : '380px',
              textAlign: 'left',
            }}>About Me</p>
          </div>
          <div
            style={{
              flex: isMobile ? '0 0 auto' : '1 1 0',
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: isMobile ? 'stretch' : 'center',
              cursor: 'pointer',
              transform: mediaHover ? 'scale(1.03)' : 'scale(1)',
              transition: 'transform 0.2s ease',
              opacity: mediaHover ? 0.9 : 1
            }}
            onClick={() => navigate('/media')}
            onMouseEnter={() => setMediaHover(true)}
            onMouseLeave={() => setMediaHover(false)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && navigate('/media')}
          >
            <img 
              src={HOME_IMG_MEDIA} 
              alt="Multimedia" 
              onError={(e) => {
                console.error('Image failed to load:', e.target.src);
                e.target.style.border = '2px solid red';
                e.target.style.backgroundColor = '#f0f0f0';
              }}
              style={{ 
                width: '100%',
                maxWidth: isMobile ? '100%' : '380px',
                height: 'auto',
                maxHeight: isMobile ? 'none' : '65vh',
                objectFit: 'contain',
                display: 'block'
              }} 
            />
            <p style={{
              fontFamily: '"Caveat", cursive',
              fontSize: isMobile ? 'clamp(18px, 4.8vw, 22px)' : '16px',
              fontWeight: 'bold',
              color: '#000',
              margin: '10px 0 0 0',
              alignSelf: 'flex-start',
              width: '100%',
              maxWidth: isMobile ? '100%' : '380px',
              textAlign: 'left',
            }}>Multimedia</p>
          </div>
          <div
            id="home-digital-journal"
            style={{ flex: isMobile ? '0 0 auto' : '1 1 0', minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'stretch' : 'center' }}
          >
            <img 
              src={HOME_IMG_JOURNAL} 
              alt="Digital Journal" 
              onError={(e) => {
                console.error('Image failed to load:', e.target.src);
                e.target.style.border = '2px solid red';
                e.target.style.backgroundColor = '#f0f0f0';
              }}
              style={{ 
                width: '100%',
                maxWidth: isMobile ? '100%' : '380px',
                height: 'auto',
                maxHeight: isMobile ? 'none' : '65vh',
                objectFit: 'contain',
                display: 'block'
              }} 
            />
            <p style={{
              fontFamily: '"Caveat", cursive',
              fontSize: isMobile ? 'clamp(18px, 4.8vw, 22px)' : '16px',
              fontWeight: 'bold',
              color: '#000',
              margin: '10px 0 0 0',
              alignSelf: 'flex-start',
              width: '100%',
              maxWidth: isMobile ? '100%' : '380px',
              textAlign: 'left',
            }}>Digital Journal</p>
          </div>
        </div>
      </section>
      
      </div>
    </>
  )
}
