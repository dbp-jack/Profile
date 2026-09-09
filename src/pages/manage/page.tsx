import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { PROJECTS, MAX_VISIBLE_PROJECTS } from '@/content/projects'
import NotFound from '@/pages/NotFound'
import { PORTFOLIO_MANAGER_ENABLED, PUBLIC_PORTFOLIO_URL } from '@/portfolio-builder/access'
import { PORTFOLIO_BLOCK_DEFINITIONS } from '@/portfolio-builder/block-registry'
import { COMPANY_PUBLIC_PRESETS, PUBLIC_PRESETS, createPublicPortfolioPath, normalizeCompanyKey } from '@/portfolio-builder/presets'
import { COPY_PROFILES, getCopyProfile } from '@/portfolio-builder/copy-profiles'
import { STRENGTHS_PROFILES, getStrengthsProfile } from '@/portfolio-builder/strengths-profiles'
import { EMPTY_COMPANY_DIRECTION, type CompanyDirectionDraft } from '@/portfolio-builder/company-direction'
import type { PortfolioBlockId } from '@/portfolio-builder/types'
import { WORKSPACE_KEY, loadWorkspace, defaultDraft, draftFromPreset, changeProjectSlot, moveItem, addBlock, companyKeyForName } from './state'
import type { Draft, SavedComposition, Workspace } from './state'
import './page.css'

const steps = [
  { id: 'structure', title: '프로젝트·구성', description: '보여줄 경험과 순서 선택', anchor: 'projects' },
  { id: 'copy', title: '소개 문구', description: '강조할 강점 선택', anchor: 'profile' },
  { id: 'company', title: '지원 기업', description: '기업 이해와 경험 연결', anchor: 'direction' },
  { id: 'share', title: '검토·공유', description: '구성 저장과 링크 복사', anchor: 'profile' },
] as const
type Step = typeof steps[number]['id']
type PreviewMode = 'fit' | 'desktop' | 'mobile'
const names = (ids: readonly string[]) => ids.map(id => PROJECTS.find(p => p.id === id)?.name.split(' - ')[0] ?? id)
const blockName = (id: PortfolioBlockId) => PORTFOLIO_BLOCK_DEFINITIONS.find(block => block.id === id)?.label ?? id

function Panel({ title, description, children, aside }: { title: string; description?: string; children: ReactNode; aside?: ReactNode }) {
  return <section className="pm-panel"><header><div><h3>{title}</h3>{description && <p>{description}</p>}</div>{aside}</header>{children}</section>
}
function Preview({ path, mode }: { path: string; mode: PreviewMode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [available, setAvailable] = useState(600)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new ResizeObserver(([entry]) => { if (entry.contentRect.width > 0) setAvailable(entry.contentRect.width) })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  const width = mode === 'desktop' ? 1280 : mode === 'mobile' ? 390 : available
  const scale = Math.min(1, available / width)
  return <div className="pm-preview-viewport" ref={ref}><div className="pm-preview-paper" style={{ width: width * scale }}><iframe title="현재 구성 미리보기" src={path} style={{ width, height: `calc(100% / ${scale})`, transform: `scale(${scale})` }} /></div><span className="pm-preview-size">{Math.round(width)}px · {Math.round(scale * 100)}%</span></div>
}
function CompanyEditor({ companyKey, companies, onSelect, onUpdate, enabled, onEnable, onRemove }: {
  companyKey: string; companies: Workspace['companies']; onSelect: (key: string, name?: string) => void
  onUpdate: (patch: Partial<CompanyDirectionDraft>) => void; enabled: boolean; onEnable: (value: boolean) => void; onRemove: () => void
}) {
  const company = companies[companyKey] ?? EMPTY_COMPANY_DIRECTION
  const [name, setName] = useState(company.companyName || companyKey)
  const [customKey, setCustomKey] = useState('')
  const [error, setError] = useState('')
  const [confirmRemove, setConfirmRemove] = useState(false)
  const field = (key: keyof CompanyDirectionDraft, label: string, placeholder: string, rows = 0) => <label className="pm-field"><span>{label}</span>{rows ? <textarea rows={rows} value={String(company[key] ?? '')} placeholder={placeholder} onChange={event => onUpdate({ [key]: event.target.value })} /> : <input value={String(company[key] ?? '')} placeholder={placeholder} onChange={event => onUpdate({ [key]: event.target.value })} />}</label>
  return <>
    <Panel title="어느 기업에 보여줄까요?" description="기업 이름으로 시작하세요. 기업별 내용은 이 브라우저에 보관됩니다.">
      {Object.keys(companies).length > 0 && <label className="pm-field"><span>보관한 기업 문구</span><select value={companyKey} onChange={e => onSelect(e.target.value)}><option value="">공통 포트폴리오</option>{companyKey && !companies[companyKey] && <option value={companyKey}>{companyKey}</option>}{Object.entries(companies).map(([key, value]) => <option value={key} key={key}>{value.companyName || key}</option>)}</select></label>}
      <form onSubmit={event => { event.preventDefault(); const key = customKey ? normalizeCompanyKey(customKey) : companyKeyForName(name); if (!name.trim() || !key) { setError('기업 이름을 입력해 주세요. 링크 식별자는 영문·숫자로 입력할 수 있습니다.'); return } setError(''); onSelect(key, name.trim()) }}>
        <label className="pm-field"><span>기업 이름</span><input value={name} onChange={e => setName(e.target.value)} placeholder="예: 지원할 기업 이름" /></label>
        <details className="pm-advanced"><summary>링크 식별자 직접 지정</summary><label className="pm-field"><span>링크 식별자 (선택)</span><input value={customKey} onChange={e => setCustomKey(e.target.value)} placeholder="자동 생성 · 필요하면 영문으로 지정" /></label></details>
        <div className="pm-row"><button className="pm-button pm-primary" type="submit">이 기업으로 작업</button>{companyKey && <button className="pm-button" type="button" onClick={() => onSelect('')}>공통 구성으로 전환</button>}</div>
        {error && <p className="pm-error" role="alert">{error}</p>}
      </form>
      {companies[companyKey] && <div className="pm-company-remove">{confirmRemove ? <div className="pm-row"><span>이 기업 문구를 삭제할까요?</span><button className="pm-text-button" onClick={() => setConfirmRemove(false)}>취소</button><button className="pm-text-button pm-danger" onClick={onRemove}>기업 문구 삭제 확인</button></div> : <button className="pm-text-button pm-muted" onClick={() => setConfirmRemove(true)}>보관한 기업 문구 삭제</button>}</div>}
    </Panel>
    {companyKey ? <Panel title={`${company.companyName || companyKey}에 전할 내용`} description="공식 자료에서 이해한 내용과 연결할 경험을 적어 주세요.">
      <label className="pm-check-row"><input type="checkbox" checked={enabled} onChange={e => onEnable(e.target.checked)} /><span><strong>웹사이트에 기업 이해 표시</strong><small>마무리 영역에 들어갑니다</small></span></label>
      <fieldset disabled={!enabled} className="pm-company-fields">
        {field('label', '기업 한 줄 소개', '예: 서비스를 한 문장으로 소개')}
        {field('summary', '이 기업을 어떻게 이해했나요?', '제품·사용자·서비스 흐름에서 이해한 내용을 작성', 4)}
        {field('noteTitle', '주목한 내용의 제목', '기업 이해')}
        {field('noteBody', '주목한 내용', '공식 글이나 서비스에서 인상 깊었던 점', 3)}
        {field('experienceTitle', '내 경험의 제목', '제가 연결할 수 있는 경험')}
        {field('experienceBody', '어떤 경험을 연결할 수 있나요?', '프로젝트에서 직접 해결한 문제와 연결', 4)}
        <details className="pm-advanced"><summary>키워드·서비스 흐름·로고 추가</summary>{field('keywords', '핵심 키워드', '예: 데이터 정확성 | 서비스 경계')}{field('flow', '서비스 흐름', '예: 요청 | 처리 | 결과 확인')}{field('logoUrl', '로고 이미지 주소', 'https://...')}<p className="pm-help">키워드와 흐름은 |로 구분합니다.</p></details>
      </fieldset>
      {enabled && !company.summary.trim() && !company.noteBody.trim() && <p className="pm-help">기업 이해나 주목한 내용 중 하나를 작성하면 미리보기에 나타납니다.</p>}
    </Panel> : <div className="pm-empty"><strong>기업별 내용은 선택 사항입니다</strong><p>공통 포트폴리오로 사용할 때는 바로 검토·공유로 넘어가도 됩니다.</p></div>}
  </>
}

export default function PortfolioManagerPage() {
  const [workspace, setWorkspace] = useState(() => loadWorkspace({ getItem: key => window.localStorage.getItem(key) }))
  const [undo, setUndo] = useState<Workspace | null>(null)
  const [step, setStep] = useState<Step>('structure')
  const [surface, setSurface] = useState<'editor' | 'preview'>('editor')
  const [previewMode, setPreviewMode] = useState<PreviewMode>('fit')
  const [previewAnchor, setPreviewAnchor] = useState('profile')
  const [saveStatus, setSaveStatus] = useState('변경 내용은 자동으로 저장됩니다')
  const [notice, setNotice] = useState('')
  const [saveName, setSaveName] = useState('')
  const [removeId, setRemoveId] = useState<string | null>(null)
  const [copyFailed, setCopyFailed] = useState(false)
  const widePreview = useRef<HTMLDialogElement>(null)
  const [wideOpen, setWideOpen] = useState(false)
  const openWidePreview = () => { setWideOpen(true); widePreview.current?.showModal() }
  const { draft, saved, companies } = workspace
  const company = companies[draft.companyKey] ?? EMPTY_COMPANY_DIRECTION
  const companyLabel = company.companyName || draft.companyKey
  const selectedCopy = getCopyProfile(draft.copyProfileId)
  const selectedStrengths = getStrengthsProfile(draft.strengthsProfileId)
  const publicPath = createPublicPortfolioPath(draft.blockIds, draft.projectIds, draft.copyProfileId, draft.companyKey, draft.strengthsProfileId, company)
  const publicUrl = new URL(publicPath.replace(/^\//, ''), PUBLIC_PORTFOLIO_URL).toString()
  const [previewPath, setPreviewPath] = useState(`${publicPath}#profile`)
  useEffect(() => {
    const timer = window.setTimeout(() => setPreviewPath(`${publicPath}#${previewAnchor}`), 300)
    return () => window.clearTimeout(timer)
  }, [publicPath, previewAnchor])
  const currentIndex = steps.findIndex(item => item.id === step)
  const currentStep = steps[currentIndex]
  const activeSaved = saved.find(item => JSON.stringify(draftFromPreset(item)) === JSON.stringify(draft))
  useEffect(() => { const previous = document.title; document.title = '포트폴리오 작업실 · 로컬 관리'; return () => { document.title = previous } }, [])
  if (!PORTFOLIO_MANAGER_ENABLED) return <NotFound />

  const persist = (next: Workspace) => {
    setWorkspace(next)
    try { window.localStorage.setItem(WORKSPACE_KEY, JSON.stringify(next)); setSaveStatus('이 브라우저에 자동 저장됨') }
    catch { setSaveStatus('저장 공간을 확인해 주세요. 현재 구성은 링크로 복사할 수 있습니다.') }
  }
  const commit = (next: Workspace, message = '') => { setUndo(workspace); persist(next); setNotice(message) }
  const updateDraft = (patch: Partial<Draft>, message = '') => commit({ ...workspace, draft: { ...draft, ...patch } }, message)
  const go = (id: Step) => { setStep(id); setSurface('editor'); setPreviewAnchor(steps.find(item => item.id === id)!.anchor); window.scrollTo({ top: 0, behavior: 'instant' }) }
  const apply = (preset: SavedComposition) => { updateDraft(draftFromPreset(preset), `${preset.name} 구성을 불러왔습니다`); setPreviewAnchor('profile') }
  const toggleBlock = (id: PortfolioBlockId) => {
    if (draft.blockIds.includes(id) && draft.blockIds.length === 1) { setNotice('표시할 내용을 하나 이상 남겨 주세요'); return }
    updateDraft({ blockIds: draft.blockIds.includes(id) ? draft.blockIds.filter(item => item !== id) : addBlock(draft.blockIds, id) })
  }
  const selectCompany = (key: string, name?: string) => {
    const nextCompanies = name ? { ...companies, [key]: { ...(companies[key] ?? EMPTY_COMPANY_DIRECTION), companyName: name } } : companies
    commit({ ...workspace, companies: nextCompanies, draft: { ...draft, companyKey: key } }, key ? '지원 기업을 적용했습니다' : '공통 구성으로 전환했습니다')
  }
  const updateCompany = (patch: Partial<CompanyDirectionDraft>) => {
    if (!draft.companyKey) return
    const nextCompany = { ...company, ...patch }
    const nextDraft = patch.enabled === true ? { ...draft, blockIds: addBlock(draft.blockIds, 'closing') } : draft
    commit({ ...workspace, draft: nextDraft, companies: { ...companies, [draft.companyKey]: nextCompany } })
  }
  const copy = async (markdown = false) => {
    try { await navigator.clipboard.writeText(markdown ? `[${companyLabel || '정민수 포트폴리오'}](${publicUrl})` : publicUrl); setCopyFailed(false); setNotice(markdown ? '문서용 링크를 복사했습니다' : '공유 링크를 복사했습니다') }
    catch { setCopyFailed(true); setStep('share'); setSurface('editor'); setNotice('아래 링크를 선택해 직접 복사해 주세요') }
  }
  const save = () => {
    const name = saveName.trim()
    if (!name) { setNotice('다시 찾기 쉬운 구성 이름을 입력해 주세요'); return }
    const existing = saved.find(item => item.name === name)
    const entry: SavedComposition = { id: existing?.id ?? `custom-${Date.now()}`, name, description: `${names(draft.projectIds).join(' · ')} / ${selectedCopy.name}`, blocks: [...draft.blockIds], projectIds: [...draft.projectIds], copyProfileId: draft.copyProfileId, strengthsProfileId: draft.strengthsProfileId, companyKey: draft.companyKey }
    commit({ ...workspace, saved: [...saved.filter(item => item.id !== entry.id), entry] }, existing ? `${name} 구성을 업데이트했습니다` : `${name} 구성을 저장했습니다`)
    setSaveName('')
  }
  const orderedBlocks = [...draft.blockIds.map(id => PORTFOLIO_BLOCK_DEFINITIONS.find(item => item.id === id)!), ...PORTFOLIO_BLOCK_DEFINITIONS.filter(item => !draft.blockIds.includes(item.id))]
  const previewControls = <div className="pm-segment" aria-label="미리보기 크기">{([['fit', '읽기 크기'], ['desktop', 'PC'], ['mobile', '모바일']] as const).map(([value, label]) => <button key={value} aria-pressed={previewMode === value} onClick={() => setPreviewMode(value)}>{label}</button>)}</div>

  return <div className="portfolio-manager-page pm-workspace">
    <header className="pm-topbar"><a href="/" className="pm-brand"><span aria-hidden="true">P</span><div><strong>포트폴리오 작업실</strong><small>로컬 관리</small></div></a><div className="pm-top-actions"><button className="pm-button pm-quiet" onClick={() => { commit({ ...workspace, draft: defaultDraft() }, '공개 기본값으로 돌아왔습니다. 보관한 구성과 기업 문구는 유지됩니다'); setPreviewAnchor('profile') }}>기본값 복원</button><button className="pm-button pm-primary" onClick={() => void copy()}>링크 복사 <span aria-hidden="true">↗</span></button></div></header>
    <div className="pm-shell">
      <div className="pm-workspace-heading"><div><p className="pm-eyebrow">지원할 곳에 맞게, 필요한 경험만</p><h1>{companyLabel ? `${companyLabel} 지원용 포트폴리오` : '내 포트폴리오 다듬기'}</h1><p className="pm-save-status">{saveStatus}</p></div><label className="pm-saved-select"><span>저장한 구성 불러오기</span><select aria-label="저장한 구성 불러오기" value={activeSaved?.id ?? ''} onChange={e => { const item = saved.find(preset => preset.id === e.target.value); if (item) apply(item) }}><option value="">{saved.length ? '구성을 선택하세요' : '아직 저장한 구성이 없습니다'}</option>{saved.map(item => <option value={item.id} key={item.id}>{item.name}</option>)}</select></label></div>
      <nav className="pm-steps" aria-label="편집 단계">{steps.map((item, index) => <button key={item.id} aria-current={step === item.id ? 'step' : undefined} onClick={() => go(item.id)}><span className="pm-step-number">{index + 1}</span><span><strong>{item.title}</strong><small>{item.description}</small></span></button>)}</nav>
      <div className="pm-feedback" role="status" aria-live="polite"><span>{notice || `${names(draft.projectIds).join(' · ')} · ${selectedCopy.name} · ${draft.blockIds.length}개 영역`}</span><button disabled={!undo} onClick={() => { if (undo) { persist(undo); setUndo(null); setNotice('직전 변경을 취소했습니다') } }}>직전 변경 취소</button></div>
      <div className="pm-mobile-switch"><button aria-pressed={surface === 'editor'} onClick={() => setSurface('editor')}>내용 편집</button><button aria-pressed={surface === 'preview'} onClick={() => setSurface('preview')}>미리보기</button></div>
      <div className="pm-layout" data-surface={surface}>
        <main className="pm-editor"><header className="pm-editor-heading"><span>0{currentIndex + 1}</span><h2>{currentStep.title}</h2></header>
          {step === 'structure' && <>
            <Panel title="어떤 경험을 보여줄까요?" description="프로젝트는 최대 2개입니다. 칸에서 바로 바꾸거나 순서를 교환하세요.">
              <label className="pm-field"><span>빠르게 시작하기</span><select aria-label="시작 구성 선택" value="" onChange={e => { const item = [...PUBLIC_PRESETS, ...COMPANY_PUBLIC_PRESETS].find(p => p.id === e.target.value); if (item) apply(item) }}><option value="">현재 구성을 유지하며 선택</option><optgroup label="기본 구성">{PUBLIC_PRESETS.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</optgroup><optgroup label="지원 분야별">{COMPANY_PUBLIC_PRESETS.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</optgroup></select></label>
              <div className="pm-project-slots">{Array.from({ length: MAX_VISIBLE_PROJECTS }, (_, index) => { const project = PROJECTS.find(item => item.id === draft.projectIds[index]); return <div className="pm-project-slot" key={index}><span className="pm-slot-number">0{index + 1}</span><label className="pm-field"><span>{index === 0 ? '먼저 보여줄 프로젝트' : '이어서 보여줄 프로젝트'}</span><select value={draft.projectIds[index] ?? ''} onChange={e => updateDraft({ projectIds: changeProjectSlot(draft.projectIds, index, e.target.value) })}>{index > 0 && <option value="">프로젝트 하나만 보여주기</option>}{PROJECTS.map(item => <option key={item.id} value={item.id}>{item.name.split(' - ')[0]}</option>)}</select></label>{project && <p>{project.id === 'feedshop' ? '조회 성능 · 투표 동시성·정합성' : project.id === 'three-m' ? '인증 구조 · 서비스 경계 분리' : 'Kafka · 주문·결제 실패 흐름'}</p>}</div> })}</div>
              <button className="pm-text-button" disabled={draft.projectIds.length < 2} onClick={() => updateDraft({ projectIds: [...draft.projectIds].reverse() }, '프로젝트 순서를 바꿨습니다')}>↑↓ 프로젝트 순서 바꾸기</button>
            </Panel>
            <Panel title="표시할 내용과 순서" description="체크한 내용만 표시합니다. 화살표로 읽는 순서를 바꿀 수 있습니다." aside={<span className="pm-count">{draft.blockIds.length}개</span>}>
              <div className="pm-block-list">{orderedBlocks.map(block => { const index = draft.blockIds.indexOf(block.id); const selected = index >= 0; const attached = block.id === 'about' && draft.strengthsProfileId === 'default' && draft.blockIds.includes('hero'); return <div className={`pm-block-row ${selected ? 'is-selected' : ''}`} key={block.id}><label><input type="checkbox" checked={selected} onChange={() => toggleBlock(block.id)} /><span><strong>{block.label}</strong><small>{attached ? '상단 소개와 함께 표시됩니다' : block.description}</small></span></label>{selected && !attached && <div className="pm-order-buttons"><button aria-label={`${block.label} 위로`} disabled={index === 0} onClick={() => updateDraft({ blockIds: moveItem(draft.blockIds, index, -1) })}>↑</button><button aria-label={`${block.label} 아래로`} disabled={index === draft.blockIds.length - 1} onClick={() => updateDraft({ blockIds: moveItem(draft.blockIds, index, 1) })}>↓</button></div>}</div> })}</div>
            </Panel>
          </>}
          {step === 'copy' && <>
            <Panel title="나를 소개하는 첫 문장" description="강조할 경험을 고르면 상단 소개와 프로젝트 안내 문구가 함께 바뀝니다."><div className="pm-copy-options">{COPY_PROFILES.map(profile => <label className={`pm-choice ${draft.copyProfileId === profile.id ? 'is-selected' : ''}`} key={profile.id}><input type="radio" name="copy-profile" value={profile.id} checked={draft.copyProfileId === profile.id} onChange={() => updateDraft({ copyProfileId: profile.id })} /><span><strong>{profile.name}</strong><p>{profile.heroRoleTitle}</p><small>{profile.description}</small></span></label>)}</div></Panel>
            <Panel title="강점은 얼마나 자세히 보여줄까요?"><div className="pm-copy-options">{STRENGTHS_PROFILES.map(profile => <label className={`pm-choice ${draft.strengthsProfileId === profile.id ? 'is-selected' : ''}`} key={profile.id}><input type="radio" name="strengths-profile" checked={draft.strengthsProfileId === profile.id} onChange={() => { updateDraft({ strengthsProfileId: profile.id, blockIds: addBlock(draft.blockIds, 'about') }); setPreviewAnchor(profile.id === 'default' ? 'profile' : 'strengths') }} /><span><strong>{profile.name}</strong><small>{profile.description}</small></span></label>)}</div></Panel>
          </>}
          {step === 'company' && <CompanyEditor key={draft.companyKey} companyKey={draft.companyKey} companies={companies} onSelect={selectCompany} onUpdate={updateCompany} enabled={company.enabled} onEnable={enabled => updateCompany({ enabled })} onRemove={() => commit({ ...workspace, draft: { ...draft, companyKey: '' }, companies: Object.fromEntries(Object.entries(companies).filter(([key]) => key !== draft.companyKey)) }, '기업 문구를 삭제했습니다. 직전 변경 취소로 복구할 수 있습니다')} />}
          {step === 'share' && <>
            <Panel title="공유할 구성을 확인하세요" description="링크를 받은 사람은 지금 선택한 구성으로 포트폴리오를 봅니다."><dl className="pm-review-list"><div><dt>지원 기업</dt><dd>{companyLabel || '공통 포트폴리오'}</dd></div><div><dt>프로젝트 순서</dt><dd>{names(draft.projectIds).join(' → ')}</dd></div><div><dt>소개 문구</dt><dd>{selectedCopy.name}</dd></div><div><dt>강점 소개</dt><dd>{selectedStrengths.name}</dd></div><div><dt>표시할 내용</dt><dd>{draft.blockIds.map(blockName).join(' · ')}</dd></div></dl><div className="pm-row"><button className="pm-button" onClick={openWidePreview}>미리보기 크게 열기</button><a className="pm-button" href={publicPath} target="_blank" rel="noreferrer">새 탭에서 검토 ↗</a></div></Panel>
            <Panel title="공유 링크"><label className="pm-field"><span>이 주소를 지원서에 넣어 주세요</span><textarea className="pm-url" rows={3} readOnly value={publicUrl} onFocus={e => e.target.select()} /></label><div className="pm-row"><button className="pm-button pm-primary" onClick={() => void copy()}>공유 링크 복사</button><button className="pm-button" onClick={() => void copy(true)}>문서용 링크 복사</button></div>{copyFailed && <p className="pm-error">주소를 선택한 뒤 ⌘C 또는 Ctrl+C로 복사할 수 있습니다.</p>}</Panel>
            <Panel title="다음에도 쓸 구성 저장" description="기업을 지정하지 않아도 저장할 수 있습니다. 같은 이름으로 저장하면 해당 구성을 업데이트합니다."><form className="pm-save-form" onSubmit={e => { e.preventDefault(); save() }}><label className="pm-field"><span>구성 이름</span><input value={saveName} onChange={e => setSaveName(e.target.value)} placeholder={companyLabel ? `${companyLabel} 지원용` : '예: 성능 개선 중심'} /></label><button className="pm-button pm-primary" type="submit" disabled={!saveName.trim()}>구성 저장</button></form>{saved.length > 0 && <ul className="pm-saved-list">{saved.map(item => <li key={item.id}><div><strong>{item.name}</strong><small>{item.description}</small></div>{removeId === item.id ? <div className="pm-row"><span>삭제할까요?</span><button className="pm-text-button" onClick={() => setRemoveId(null)}>취소</button><button className="pm-text-button pm-danger" onClick={() => { commit({ ...workspace, saved: saved.filter(preset => preset.id !== item.id) }, '저장한 구성을 삭제했습니다. 직전 변경 취소로 복구할 수 있습니다'); setRemoveId(null) }}>삭제 확인</button></div> : <div className="pm-row"><button className="pm-text-button" onClick={() => apply(item)}>불러오기</button><button className="pm-text-button pm-muted" aria-label={`${item.name} 삭제`} onClick={() => setRemoveId(item.id)}>삭제</button></div>}</li>)}</ul>}</Panel>
          </>}
          <footer className="pm-step-footer"><button className="pm-button" disabled={currentIndex === 0} onClick={() => go(steps[currentIndex - 1].id)}>← 이전</button>{currentIndex < steps.length - 1 ? <button className="pm-button pm-primary" onClick={() => go(steps[currentIndex + 1].id)}>다음: {steps[currentIndex + 1].title} →</button> : <button className="pm-button pm-primary" onClick={() => void copy()}>링크 복사하고 마무리 ↗</button>}</footer>
        </main>
        <aside className="pm-preview" aria-label="실시간 포트폴리오 미리보기"><header><div><span className="pm-eyebrow">실시간 미리보기</span><h2>이렇게 보입니다</h2></div><button className="pm-icon-button" aria-label="미리보기 크게 보기" onClick={openWidePreview}>⤢</button></header>{previewControls}<Preview path={previewPath} mode={previewMode} /><div className="pm-preview-bottom"><span>선택한 내용을 바로 반영합니다</span><a href={publicPath} target="_blank" rel="noreferrer">새 탭 ↗</a></div></aside>
      </div>
    </div>
    <dialog className="pm-wide-preview" ref={widePreview} onClose={() => setWideOpen(false)} onClick={e => { if (e.target === e.currentTarget) widePreview.current?.close() }}><header><h2>포트폴리오 미리보기</h2><button className="pm-button" autoFocus onClick={() => widePreview.current?.close()}>닫기 ×</button></header>{wideOpen && <iframe title="크게 보는 포트폴리오" src={previewPath} />}</dialog>
  </div>
}
