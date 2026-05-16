import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { HOME_IMG_ABOUT, HOME_IMG_MEDIA, HOME_IMG_JOURNAL } from './NavHamburger'
import SharedHeader from './SharedHeader'
import SiteFooter from './SiteFooter'
import { supabase } from './lib/supabase'

export default function Page2Home(props) {
  const navigate = useNavigate()
  const [opacity, setOpacity] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [mediaHover, setMediaHover] = useState(false)
  const [aboutHover, setAboutHover] = useState(false)
  const [journalHover, setJournalHover] = useState(false)
  const [email, setEmail] = useState('')
  const [showPopup, setShowPopup] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Check if mobile on mount and window resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    // Fade in animation on mount
    setOpacity(1)

    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Identical image box for About / Multimedia / Digital Journal (fixed frame on desktop).
  const homeColumnContent = isMobile
    ? { width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }
    : {
        width: '100%',
        maxWidth: 'min(520px, calc((100vw - 96px) / 3 - 12px))',
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      }

  const homeFrameStyle = isMobile
    ? { width: '100%' }
    : {
        width: '100%',
        height: 'min(580px, 60vh)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }

  const homeImgInFrame = isMobile
    ? {
        width: '100%',
        height: 'auto',
        maxHeight: 'none',
        objectFit: 'contain',
        display: 'block',
      }
    : {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        objectPosition: 'center center',
        display: 'block',
      }

  const homeCaptionStyle = {
    fontFamily: '"Caveat", cursive',
    fontSize: isMobile ? 'clamp(18px, 4.8vw, 22px)' : '16px',
    fontWeight: 'bold',
    color: '#000',
    margin: '10px 0 0 0',
    padding: 0,
    width: '100%',
    maxWidth: '100%',
    textAlign: 'left',
    boxSizing: 'border-box',
  }

  const handleSubscribe = async () => {
    if (!email) {
      setMessage('Please enter your email.')
      return
    }

    const { error } = await supabase
      .from('subscribers')
      .insert([{ email }])

    if (error) {
      console.log('ERROR:', error)
      setMessage('That email may already be subscribed.')
      return
    }

    setMessage('Subscribed successfully!')
    setEmail('')

    setTimeout(() => {
      setShowPopup(false)
      setMessage('')
    }, 1200)
  }

  return (
    <>
      {showPopup && !isMobile && (
        <div style={popupOverlay}>
          <div style={popupBox}>
            <h2 style={{ margin: '0 0 10px', fontFamily: 'inherit' }}>Stay Updated</h2>
            <p style={{ margin: '0 0 12px' }}>
              Enter your email to get updates when new videos or articles are posted.
            </p>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={popupInput}
            />
            <button type="button" onClick={handleSubscribe} style={popupButton}>
              Subscribe
            </button>
            <button type="button" onClick={() => setShowPopup(false)} style={closeButton}>
              Close
            </button>
            {message && <p style={{ marginTop: 10, marginBottom: 0 }}>{message}</p>}
          </div>
        </div>
      )}
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
      <div
        className="pageWithFooter"
        style={{ 
        width: '100%', 
        minHeight: '100vh',
        backgroundColor: 'transparent', 
        display: 'flex', 
        flexDirection: 'column', 
        position: 'relative',
        zIndex: 5,
        boxSizing: 'border-box',
        overflowX: 'visible',
        overflowY: 'visible'
      }}
      >
      <SharedHeader opacity={opacity} />

      {/* Middle section: About kiki, Multimedia, Digital Journal - large and centered */}
      <section style={{
        width: '100%',
        flex: 1,
        minHeight: isMobile ? 'auto' : 'calc(100vh - 200px)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: isMobile ? 'stretch' : 'center',
        gap: isMobile ? '12px' : '16px',
        padding: isMobile ? '120px 20px 48px' : '160px 28px 80px',
        position: 'relative',
        zIndex: 5,
        backgroundColor: 'transparent',
        boxSizing: 'border-box',
        opacity,
        transition: 'opacity 5s ease 0.5s',
      }}
      >
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'center',
          alignItems: 'stretch',
          gap: isMobile ? 'clamp(28px, 8vw, 44px)' : '14px',
          width: '100%',
          maxWidth: isMobile ? 'min(100%, 520px)' : 'none',
          margin: isMobile ? '0 auto' : undefined,
          flex: '1 1 auto',
        }}>
          <div
            style={{
              flex: isMobile ? '0 0 auto' : '0 0 auto',
              width: isMobile ? '100%' : 'auto',
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
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
            <div style={homeColumnContent}>
              <div style={homeFrameStyle}>
                <img 
                  src={HOME_IMG_ABOUT} 
                  alt="About Kiki" 
                  onError={(e) => {
                    console.error('Image failed to load:', e.target.src);
                    e.target.style.border = '2px solid red';
                    e.target.style.backgroundColor = '#f0f0f0';
                  }}
                  style={homeImgInFrame}
                />
              </div>
              <p style={homeCaptionStyle}>About Me</p>
            </div>
          </div>
          <div
            style={{
              flex: isMobile ? '0 0 auto' : '0 0 auto',
              width: isMobile ? '100%' : 'auto',
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
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
            <div style={homeColumnContent}>
              <div style={homeFrameStyle}>
                <img 
                  src={HOME_IMG_MEDIA} 
                  alt="Multimedia" 
                  onError={(e) => {
                    console.error('Image failed to load:', e.target.src);
                    e.target.style.border = '2px solid red';
                    e.target.style.backgroundColor = '#f0f0f0';
                  }}
                  style={homeImgInFrame}
                />
              </div>
              <p style={homeCaptionStyle}>Multimedia</p>
            </div>
          </div>
          <div
            id="home-digital-journal"
            style={{
              flex: isMobile ? '0 0 auto' : '0 0 auto',
              width: isMobile ? '100%' : 'auto',
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
              cursor: 'pointer',
              transform: journalHover ? 'scale(1.03)' : 'scale(1)',
              transition: 'transform 0.2s ease',
              opacity: journalHover ? 0.9 : 1,
            }}
            onClick={() => navigate('/digital-journal')}
            onMouseEnter={() => setJournalHover(true)}
            onMouseLeave={() => setJournalHover(false)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && navigate('/digital-journal')}
          >
            <div style={homeColumnContent}>
              <div style={homeFrameStyle}>
                <img 
                  src={HOME_IMG_JOURNAL} 
                  alt="Digital Journal" 
                  onError={(e) => {
                    console.error('Image failed to load:', e.target.src);
                    e.target.style.border = '2px solid red';
                    e.target.style.backgroundColor = '#f0f0f0';
                  }}
                  style={homeImgInFrame}
                />
              </div>
              <p style={homeCaptionStyle}>Digital Journal</p>
            </div>
          </div>
        </div>
      </section>

      {isMobile && showPopup && (
        <div style={{ padding: '32px 24px 16px', backgroundColor: '#fff' }}>
          <h2 style={{ margin: '0 0 8px', fontFamily: 'inherit', fontSize: '18px', textAlign: 'center' }}>Stay Updated</h2>
          <p style={{ margin: '0 0 12px', fontSize: '14px', textAlign: 'center', color: '#444' }}>
            Enter your email to get updates when new videos or articles are posted.
          </p>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={popupInput}
          />
          <button type="button" onClick={handleSubscribe} style={popupButton}>
            Subscribe
          </button>
          {message && <p style={{ marginTop: 10, marginBottom: 0, textAlign: 'center' }}>{message}</p>}
        </div>
      )}

      <SiteFooter />

      </div>
    </>
  )
}

const popupOverlay = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.65)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
}

const popupBox = {
  background: '#fff',
  padding: '24px',
  borderRadius: '12px',
  width: '90%',
  maxWidth: '400px',
  textAlign: 'center',
  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
}

const popupInput = {
  width: '100%',
  padding: '12px',
  marginBottom: '12px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '16px',
}

const popupButton = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#000',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '16px',
  marginBottom: '10px',
}

const closeButton = {
  background: 'transparent',
  border: 'none',
  color: '#666',
  cursor: 'pointer',
  fontSize: '14px',
}

