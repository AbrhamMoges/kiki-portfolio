import { useNavigate } from 'react-router-dom'
import SharedHeader from './SharedHeader'
import SiteFooter from './SiteFooter'

export default function MultimediaLanding() {
  const navigate = useNavigate()
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
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '80px',
              marginTop: '80px',
            }}
          >
            <p
              onClick={() => navigate('/media')}
              style={{ fontFamily: '"Caveat", cursive', fontWeight: 'bold', fontSize: 'clamp(28px, 6vw, 56px)', color: '#000', margin: 0, cursor: 'pointer', textDecoration: 'none' }}
            >
              Photography
            </p>
            <p
              onClick={() => navigate('/videography')}
              style={{ fontFamily: '"Caveat", cursive', fontWeight: 'bold', fontSize: 'clamp(28px, 6vw, 56px)', color: '#000', margin: 0, cursor: 'pointer', textDecoration: 'none' }}
            >
              Videography
            </p>
          </div>
        </div>
        <SiteFooter />
      </div>
    </>
  )
}
