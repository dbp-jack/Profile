import type { ReactNode } from 'react'

declare const __BASE_PATH__: string
const asset = (path: string) => `${__BASE_PATH__}${path.replace(/^\//, '')}`

export function Lead({ children }: { children: ReactNode }) {
  return <p className="rac-lead">{children}</p>
}
export function Note({ label = '판단', children }: { label?: string; children: ReactNode }) {
  return <div className="rac-note"><strong>{label}</strong><div>{children}</div></div>
}
export function PageBottom({ children }: { children: ReactNode }) {
  return <div className="rac-page-bottom">{children}</div>
}
export function Grid({ children }: { children: ReactNode }) {
  return <div className="rac-grid">{children}</div>
}
export function Block({ title, children }: { title: string; children: ReactNode }) {
  return <div className="rac-block"><h3>{title}</h3><div>{children}</div></div>
}
export function Table({ columns, rows }: { columns: string[]; rows: string[][] }) {
  return <table className="rac-table"><thead><tr>{columns.map(c => <th key={c}>{c}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>)}</tbody></table>
}
export function Flow({ steps }: { steps: [string, string][] }) {
  return <div className="rac-flow">{steps.map(([title, description], i) => <div key={title}><span className="rac-step">{String(i + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{description}</p></div>)}</div>
}
export function Proof({ src, caption, height = 250, resolved = false, workLegend = false }: { src: string; caption: string; height?: number; resolved?: boolean; workLegend?: boolean }) {
  const imageSrc = resolved ? src : asset(src)
  return <figure className="rac-proof"><button type="button" data-proof-src={imageSrc} data-proof-caption={caption} aria-label={`${caption}${workLegend ? ' · 파란 테두리는 맡은 작업' : ''} 크게 보기`}><img src={imageSrc} alt={caption} style={{ height }} />{workLegend && <span className="rac-work-legend" aria-hidden="true"><span className="rac-work-legend-box" />맡은 작업</span>}</button><figcaption>{caption}</figcaption></figure>
}
export function Source({ href, children }: { href: string; children: ReactNode }) {
  return <a className="rac-source" href={href} target="_blank" rel="noreferrer">{children} ↗</a>
}
