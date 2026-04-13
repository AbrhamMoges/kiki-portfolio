/**
 * Site-wide footer (not on splash). Layout: location · spacer · email · copyright.
 */
export default function SiteFooter() {
  return (
    <footer className="siteFooter" role="contentinfo">
      <div className="siteFooterInner">
        <span className="siteFooterCell">Dallas Tx</span>
        <span className="siteFooterCell siteFooterCell--empty" aria-hidden="true" />
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
