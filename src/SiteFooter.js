/**
 * Site-wide footer (not on splash). Social icons left, copyright right.
 * Mobile: * + brand row, scrolls with page (not fixed).
 */
export default function SiteFooter() {
  return (
    <footer className="siteFooter" role="contentinfo">
      <div className="siteFooterMobileTop">
        <span className="siteFooterMark" aria-hidden="true">
          *
        </span>
        <span className="siteFooterBrandName">kstaura</span>
      </div>
      <div className="siteFooterInner">
        <div className="siteFooterSocialIcons">
          <a
            className="siteFooterIconLink"
            href="https://www.youtube.com/@kstaura"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <img className="siteFooterIconImg" src="/youtube.png" alt="" width={28} height={28} draggable={false} />
          </a>
          <a
            className="siteFooterIconLink"
            href="https://substack.com/kstaura"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Substack"
          >
            <img className="siteFooterIconImg" src="/Substack.png" alt="" width={28} height={28} draggable={false} />
          </a>
          <a
            className="siteFooterIconLink"
            href="https://www.instagram.com/kstaura/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <img
              className="siteFooterIconImg siteFooterIconImg--instagram"
              src="/IG%20icon.png?v=2"
              alt=""
              width={32}
              height={32}
              draggable={false}
            />
          </a>
          <a
            className="siteFooterIconLink"
            href="https://x.com/kstaura"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <img className="siteFooterIconImg" src="/twitter%20lcon.png" alt="" width={28} height={28} draggable={false} />
          </a>
          <a className="siteFooterIconLink" href="mailto:kalkidane.negewo@gmail.com" aria-label="Email">
            <img className="siteFooterIconImg" src="/Mail%20.png" alt="" width={28} height={28} draggable={false} />
          </a>
        </div>
        <div className="siteFooterCell siteFooterCell--legal">
          <span>© 2026 All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}
