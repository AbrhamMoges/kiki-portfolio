import { useCallback, useEffect, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL || ''}/pdf.worker.mjs`

/**
 * Renders the PDF with PDF.js (canvas) — no browser PDF plugin, so no thick black iframe chrome.
 */
export default function ChanelPdfViewer({ fileUrl }) {
  const [numPages, setNumPages] = useState(null)
  const [pageWidth, setPageWidth] = useState(800)

  const onResize = useCallback(() => {
    const max = Math.min(typeof window !== 'undefined' ? window.innerWidth - 48 : 820, 820)
    setPageWidth(Math.max(240, max))
  }, [])

  useEffect(() => {
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [onResize])

  const onDocumentLoadSuccess = ({ numPages: n }) => {
    setNumPages(n)
  }

  return (
    <Document
      file={fileUrl}
      loading={
        <div
          style={{
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontSize: '14px',
            color: '#666',
            padding: '24px',
            textAlign: 'center',
          }}
        >
          Loading…
        </div>
      }
      error={
        <div
          style={{
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontSize: '14px',
            color: '#666',
            padding: '24px',
            textAlign: 'center',
          }}
        >
          Could not load this PDF.
        </div>
      }
      onLoadSuccess={onDocumentLoadSuccess}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(16px, 3vw, 28px)',
          width: '100%',
        }}
      >
        {numPages &&
          Array.from({ length: numPages }, (_, i) => (
            <Page
              key={i + 1}
              pageNumber={i + 1}
              width={pageWidth}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              canvasBackground="transparent"
              className="chanelPdfPage"
            />
          ))}
      </div>
    </Document>
  )
}
