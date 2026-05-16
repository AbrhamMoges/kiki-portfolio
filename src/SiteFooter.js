import { useState } from 'react'
import { supabase } from './lib/supabase'

export default function SiteFooter() {
  const [showPopup, setShowPopup] = useState(false)
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubscribe = async () => {
    if (!email) { setMessage('Please enter your email.'); return }
    const { error } = await supabase.from('subscribers').insert([{ email }])
    if (error) { setMessage('That email may already be subscribed.'); return }
    setMessage('Subscribed successfully!')
    setEmail('')
    setTimeout(() => { setShowPopup(false); setMessage('') }, 1200)
  }

  return (
    <>
      {showPopup && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.65)', display: 'flex',
          justifyContent: 'center', alignItems: 'center', zIndex: 9999,
        }}>
          <div style={{
            background: '#fff', padding: '24px', borderRadius: '12px',
            width: '90%', maxWidth: '400px', textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          }}>
            <h2 style={{ margin: '0 0 10px', fontFamily: 'inherit' }}>Stay Updated</h2>
            <p style={{ margin: '0 0 12px' }}>Enter your email to get updates when new videos or articles are posted.</p>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px', boxSizing: 'border-box' }}
            />
            <button type="button" onClick={handleSubscribe} style={{ width: '100%', padding: '12px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', marginBottom: '10px' }}>
              Subscribe
            </button>
            <button type="button" onClick={() => setShowPopup(false)} style={{ background: 'transparent', border: 'none', color: '#666', cursor: 'pointer', fontSize: '14px' }}>
              Close
            </button>
            {message && <p style={{ marginTop: 10, marginBottom: 0 }}>{message}</p>}
          </div>
        </div>
      )}
      <footer className="siteFooter" role="contentinfo">
        <div className="siteFooterMobileTop">
          <span className="siteFooterMark" aria-hidden="true">*</span>
          <span className="siteFooterBrandName">kstaura</span>
        </div>
        <div className="siteFooterInner">
          <div className="siteFooterSocialIcons">
            <a className="siteFooterIconLink" href="https://www.youtube.com/@kstaura" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <img className="siteFooterIconImg" src="/youtube.png" alt="" width={28} height={28} draggable={false} />
            </a>
            <a className="siteFooterIconLink" href="https://substack.com/@kstaura" target="_blank" rel="noopener noreferrer" aria-label="Substack">
              <img className="siteFooterIconImg" src="/Substack.png" alt="" width={28} height={28} draggable={false} />
            </a>
            <a className="siteFooterIconLink" href="https://www.instagram.com/kstaura/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <img className="siteFooterIconImg siteFooterIconImg--instagram" src="/IG%20icon.png?v=2" alt="" width={32} height={32} draggable={false} />
            </a>
            <a className="siteFooterIconLink" href="https://x.com/kstaura" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <img className="siteFooterIconImg" src="/twitter%20lcon.png" alt="" width={28} height={28} draggable={false} />
            </a>
            <a className="siteFooterIconLink" href="mailto:kalkidane.negewo@gmail.com" aria-label="Email">
              <img className="siteFooterIconImg" src="/Mail%20.png" alt="" width={28} height={28} draggable={false} />
            </a>
          </div>
          <div className="siteFooterCell siteFooterCell--legal">
            <button className="siteFooterSubscribeBtn" type="button" onClick={() => setShowPopup(true)}>
              Subscribe
            </button>
            <span>© 2026 All rights reserved.</span>
          </div>
        </div>
      </footer>
    </>
  )
}
