/**
 * Site-wide footer (not on splash). Layout: location · socials · email · copyright.
 * Mobile: * + brand row, four-column row, scrolls with page (not fixed).
 */
export default function SiteFooter() {
  return (
    <footer className="siteFooter" role="contentinfo">
      <div className="siteFooterMobileTop">
        <span className="siteFooterMark" aria-hidden="true">
          *
        </span>
        <span className="siteFooterBrandName">Kstaura</span>
      </div>
      <div className="siteFooterInner">
        <span className="siteFooterCell">Dallas Tx</span>
        <div className="siteFooterCell siteFooterSocial">
          <a
            className="siteFooterLink"
            href="https://www.youtube.com/@kstaura"
            target="_blank"
            rel="noopener noreferrer"
          >
            youtube.com/@kstaura
          </a>
          <a
            className="siteFooterLink"
            href="https://substack.com/kstaura"
            target="_blank"
            rel="noopener noreferrer"
          >
            substack.com/kstaura
          </a>
        </div>
        <a
          className="siteFooterCell siteFooterMail"
          href="mailto:kalkidane.negewo@gmail.com"
        >
          Kalkidane.negewo@gmail.com
        </a>
        <div className="siteFooterCell siteFooterCell--legal">
          <span>© 2026 All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}
