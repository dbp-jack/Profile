import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, MouseEvent, ReactNode } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { caseLabels, chapters, draftPages } from './content'
import type { DraftPage } from './content'
import './page.css'

const WIDTH = 1123
const HEIGHT = 794

function PageCanvas({ children, zoom, previous, next }: { children: ReactNode; zoom: string; previous: ReactNode; next: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [available, setAvailable] = useState(WIDTH)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => setAvailable(entry.contentRect.width))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  const scale = zoom === 'fit' ? Math.min(1, Math.max(0.1, available / WIDTH)) : Number(zoom)
  return <div className="draft-viewer" style={{ '--preview-height': `${HEIGHT * scale}px` } as CSSProperties}>
    {previous}
    <div ref={ref} className="draft-canvas"><div className="draft-paper-size" style={{ width: WIDTH * scale, height: HEIGHT * scale }}><div className="draft-paper" style={{ width: WIDTH, height: HEIGHT, transform: `scale(${scale})` }}>{children}</div></div></div>
    {next}
  </div>
}

function PortfolioSlide({ page, pageNumber }: { page: DraftPage; pageNumber: number }) {
  const caseLabel = page.caseId ? caseLabels[page.caseId] : null
  return (
        <article className={`rac-slide ${page.layout === 'cover' ? 'cover-slide' : ''}`} data-page={pageNumber} data-page-id={page.id} data-case={page.caseId}>
          {page.layout !== 'cover' && page.layout !== 'thanks' && <header>
            <div className={`rac-eyebrow ${caseLabel ? 'case-eyebrow' : ''}`}>
              <span>{caseLabel ? `${caseLabel.project} · 문제 해결 ${caseLabel.number}` : page.section}</span>
              {caseLabel && <span className="case-name">{caseLabel.name}</span>}
              {page.stage && <span className="page-stage">{page.stage}</span>}
            </div>
            <h2>{page.title}</h2>
          </header>}
          <div className="rac-body">{page.body}</div>
          <footer><span>정민수 · {caseLabel ? `${caseLabel.project} / 문제 해결 ${caseLabel.number}` : page.section}</span><span>{String(pageNumber).padStart(2, '0')} / {draftPages.length}</span></footer>
        </article>
  )
}

export default function PdfPortfolio({ preview = false }: { preview?: boolean }) {
  const [params, setParams] = useSearchParams()
  const raw = Number(params.get('page') ?? 1)
  const pageNumber = Number.isInteger(raw) && raw >= 1 && raw <= draftPages.length ? raw : 1
  const page = draftPages[pageNumber - 1]
  const caseLabel = page.caseId ? caseLabels[page.caseId] : null
  const chapter = chapters.find(c => pageNumber >= c.start && pageNumber <= c.end)!
  const [preparingPrint, setPreparingPrint] = useState(false)
  const [printError, setPrintError] = useState('')
  const printPages = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState('fit')
  const [contentsOpen, setContentsOpen] = useState(false)
  const [evidence, setEvidence] = useState<{src: string; caption: string} | null>(null)
  const evidenceDialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const previousTitle = document.title
    document.title = preview ? '포트폴리오 · 통합 수정안' : '정민수 포트폴리오'
    return () => { document.title = previousTitle }
  }, [preview])

  useEffect(() => {
    if (evidence && !evidenceDialog.current?.open) evidenceDialog.current?.showModal()
  }, [evidence])

  async function savePdf() {
    setPreparingPrint(true)
    setPrintError('')
    try {
      await document.fonts.ready
      await Promise.all(Array.from(printPages.current?.querySelectorAll('img') ?? []).map(image => image.decode()))
      evidenceDialog.current?.close()
      window.print()
    } catch {
      setPrintError('이미지를 불러오지 못했습니다. 연결을 확인한 뒤 다시 저장해 주세요.')
    } finally {
      setPreparingPrint(false)
    }
  }

  function go(n: number) {
    if (n < 1 || n > draftPages.length) return
    setParams({ page: String(n) }, { replace: true })
    setContentsOpen(false)
  }

  function handleDocumentClick(event: MouseEvent<HTMLDivElement>) {
    const button = (event.target as Element).closest<HTMLButtonElement>('button')
    if (button?.dataset.jumpPage) go(Number(button.dataset.jumpPage))
    if (button?.dataset.proofSrc) {
      // 공통 ImageLightbox와 검토 화면의 확대 창이 동시에 열리지 않게 한다.
      event.stopPropagation()
      setEvidence({src: button.dataset.proofSrc, caption: button.dataset.proofCaption ?? '검증 자료'})
    }
  }

  return <main className="portfolio-draft">
    <div className="portfolio-screen">
    <header className="draft-toolbar">
      <div className="draft-brand"><h1>{preview ? '포트폴리오 수정안' : '정민수 포트폴리오'}</h1><p>{preview ? '통합 수정안' : 'PDF 포트폴리오'} · {draftPages.length}쪽</p></div>
      <button className="draft-contents-toggle" aria-expanded={contentsOpen} aria-controls="draft-contents" onClick={() => setContentsOpen(!contentsOpen)}>전체 목차</button>
      <div className="draft-options">{!preview && <><Link className="pdf-home-link" to="/">← 사이트로</Link><button className="pdf-save-button" onClick={savePdf} disabled={preparingPrint}>{preparingPrint ? '저장 준비 중…' : 'PDF로 저장'}</button></>}<label><span className="sr-only">확대 비율</span><select aria-label="확대 비율" value={zoom} onChange={e => setZoom(e.target.value)}><option value="fit">너비 맞춤</option><option value="0.75">75%</option><option value="1">100%</option><option value="1.25">125%</option></select></label></div>
    </header>
    {printError && <p className="pdf-print-error" role="alert">{printError}</p>}
    {contentsOpen && <nav id="draft-contents" className="draft-contents" aria-label="전체 페이지 목차">{chapters.map(c => <section key={c.name}><h2>{c.name}</h2>{draftPages.slice(c.start - 1, c.end).map((p, i) => <button aria-current={pageNumber === c.start + i ? 'page' : undefined} key={p.id} onClick={() => go(c.start + i)}><span>{String(c.start + i).padStart(2, '0')}</span>{p.title}</button>)}</section>)}</nav>}
    <div className="draft-location"><strong>{chapter.name}</strong><span>{caseLabel ? `문제 해결 ${caseLabel.number} · ${caseLabel.name}` : page.section}</span><span className="draft-counter">{pageNumber} / {draftPages.length}</span></div>
    <div className="portfolio-screen-page" onClick={handleDocumentClick}>
      <PageCanvas zoom={zoom}
        previous={<button className="draft-page-turn" onClick={() => go(pageNumber - 1)} disabled={pageNumber === 1} aria-label="이전 페이지"><span aria-hidden="true">←</span><span>이전</span></button>}
        next={<button className="draft-page-turn" onClick={() => go(pageNumber + 1)} disabled={pageNumber === draftPages.length} aria-label="다음 페이지"><span aria-hidden="true">→</span><span>다음</span></button>}
      >
        <PortfolioSlide page={page} pageNumber={pageNumber} />
      </PageCanvas>
    </div>
    <div className="draft-bottom">근거 이미지를 누르면 크게 볼 수 있습니다.</div>
    </div>
    {!preview && <div ref={printPages} className="portfolio-print-pages" aria-hidden="true">{draftPages.map((p, i) => <div className="pdf-print-sheet" key={p.id}><PortfolioSlide page={p} pageNumber={i + 1} /></div>)}</div>}
    <dialog ref={evidenceDialog} className="evidence-dialog" aria-labelledby="evidence-title" onClick={event => event.stopPropagation()} onClose={() => setEvidence(null)}>
      {evidence && <><header><h2 id="evidence-title">{evidence.caption}</h2><button autoFocus onClick={() => evidenceDialog.current?.close()} aria-label="이미지 닫기">닫기 ×</button></header><div className="evidence-image"><img src={evidence.src} alt={evidence.caption} /></div><a href={evidence.src} target="_blank" rel="noreferrer">원본 이미지 열기 ↗</a></>}
    </dialog>
  </main>
}
