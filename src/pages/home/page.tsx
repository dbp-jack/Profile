import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { COLLABORATION_SECTION, EXPERIENCE_ITEMS, HERO_SKILL_GROUPS, PROJECT_WORKFLOW, RESOURCE_LINKS } from '@/content/portfolio'
import plannerScreen from '../pdf/assets/planner-screen.png'
import { authReport, boundaryWiki, projects, queryWiki, recoveryCommit, survey, voteWiki } from './data'
import type { PortfolioProject } from './data'
import { resolveWebComposition } from './composition'
import { fixTicketingProject } from '@/content/projects'
import type { PortfolioBlockId } from '@/portfolio-builder/types'
import './page.css'

const homePath = '/'
const asset = (path: string) => `${__BASE_PATH__}${path.replace(/^\//, '')}`
const readingSections = [
  { id: 'feedshop', label: 'FeedShop 소개', group: '프로젝트 01' },
  { id: 'query', label: '목록 로딩 지연 개선' },
  { id: 'vote', label: '투표 동시성·정합성' },
  { id: 'feedshop-reflection', label: 'FeedShop 회고' },
  { id: '3m', label: '3M 소개', group: '프로젝트 02' },
  { id: 'boundary', label: '인증 구조·경계 분리' },
  { id: '3m-reflection', label: '3M 회고' },
] as const
type EvidenceImage = { src: string; caption: string }
type ShowEvidence = (image: EvidenceImage) => void

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return <a className="wc-source" href={href} target="_blank" rel="noreferrer">{children}<span aria-hidden="true"> ↗</span></a>
}

function Evidence({ src, caption, show, legend = false }: EvidenceImage & { show: ShowEvidence; legend?: boolean }) {
  return <figure className="wc-evidence">
    <button className="wc-image-button" onClick={event => { event.stopPropagation(); show({ src, caption }) }} aria-label={`${caption} 확대`}>
      <img src={src} alt={caption} loading="lazy" />
      <span className="wc-enlarge" aria-hidden="true">확대 ↗</span>
      {legend && <span className="wc-work-legend"><i />직접 맡은 작업</span>}
    </button>
    <figcaption>{caption}</figcaption>
  </figure>
}

function Comparison({ caption, columns, rows }: { caption: string; columns: string[]; rows: string[][] }) {
  return <div className="wc-table-scroll" tabIndex={0} role="region" aria-label={caption}>
    <table><caption>{caption}</caption><thead><tr>{columns.map(column => <th key={column} scope="col">{column}</th>)}</tr></thead>
      <tbody>{rows.map(row => <tr key={row[0]}>{row.map((cell, i) => i === 0 ? <th key={i} scope="row">{cell}</th> : <td key={i}>{cell}</td>)}</tr>)}</tbody>
    </table>
  </div>
}

function Steps({ items }: { items: [string, string][] }) {
  return <ol className="wc-steps">{items.map(([title, text], i) => <li key={title}><span className="wc-step-number">0{i + 1}</span><h4>{title}</h4><p>{text}</p></li>)}</ol>
}

function SectionHeading({ number, title, children }: { number: string; title: string; children?: ReactNode }) {
  return <header className="wc-section-heading"><div><span className="wc-index">{number}</span><h2>{title}</h2></div>{children && <p>{children}</p>}</header>
}

function CaseHeading({ number, title, description }: { number: string; title: string; description: string }) {
  return <header className="wc-case-heading"><span className="wc-kicker">문제 해결 {number}</span><h2>{title}</h2><p>{description}</p></header>
}

function Finding({ label = '개선 효과', children }: { label?: string; children: ReactNode }) {
  return <div className="wc-finding"><strong>{label}</strong><p>{children}</p></div>
}

function ResponseChart() {
  return <div className="wc-response-chart" role="img" aria-label="동시 1,000명 테스트의 평균 응답시간: 개선 전 6.818초, 조회 구조 개선 후 4.191초, Redis 추가 후 0.638초">
    {[['개선 전', '6.818초', '100%'], ['조회 구조 개선', '4.191초', '61.47%'], ['Redis 추가', '0.638초', '9.36%']].map(([label, value, width], i) => <div className={`wc-bar-row ${i === 2 ? 'is-final' : ''}`} key={label}><span>{label}</span><div><i style={{ width }} /></div><strong>{value}</strong></div>)}
    <p className="wc-caption">동시 1,000명 · nGrinder 로컬 부하 테스트 · 평균 응답시간</p>
  </div>
}

type WebComposition = ReturnType<typeof resolveWebComposition>
type ReadingSection = { id: string; label: string; group?: string }

function getReadingSections(projectIds: readonly string[]): ReadingSection[] {
  return projectIds.flatMap<ReadingSection>(id => id === 'feedshop' ? readingSections.slice(0, 4)
    : id === 'three-m' ? readingSections.slice(4)
    : [{ id, label: 'FIX 소개·주문 결제', group: '추가 프로젝트' }])
}

function HomeView({ show, activeSection, composition, search }: { show: ShowEvidence; activeSection: string; composition: WebComposition; search: string }) {
  const has = (id: PortfolioBlockId) => composition.blockIds.includes(id)
  const sections = getReadingSections(composition.projectIds)
  const strengths = composition.strengthsProfile
  const blocks: Partial<Record<PortfolioBlockId, ReactNode>> = {
    footer: <footer className="wc-footer wc-container"><Link to={`${homePath}${search}`}>정민수 · 백엔드 개발자</Link><span>문제에서 출발해, 근거로 설명합니다</span></footer>,
    hero: <section className="wc-hero wc-container" id="profile">
      <div className="wc-hero-main"><div><span className="wc-kicker">백엔드 개발자</span><h1>정민수</h1><p className="wc-hero-line">{composition.copyProfile.heroRoleTitle}</p>{has('about') && <p className="wc-hero-description" id="about">{composition.copyProfile.id === 'default' ? <>로딩 지연과 중복 투표를 개선하고, 인증의 책임 경계를 정리했습니다.<br className="wc-desktop-break" />{' '}문제를 확인한 근거와 기술을 적용한 이유를 함께 설명합니다.</> : composition.copyProfile.aboutIntro}</p>}<div className="wc-hero-actions">{has('projects') && <a className="wc-button wc-button-blue" href="#projects">대표 프로젝트 보기 <span aria-hidden="true">↓</span></a>}<ExternalLink href="https://linkedin.com/in/minsoo-jeong-31861b401">LinkedIn</ExternalLink><ExternalLink href="https://github.com/dbp-jack">GitHub</ExternalLink></div></div><div className="wc-portrait"><img src={asset('profile-photo.png')} alt="정민수 증명사진" /><span>서울 · 백엔드 개발</span></div></div>
      <div className="wc-skill-strip"><p><strong>주요 기술</strong>Java · Spring Boot · JPA · QueryDSL · MySQL · PostgreSQL · Redis</p><div id="all-skills" className="wc-skill-list">{HERO_SKILL_GROUPS.map(group => <p key={group.label}><strong>{group.label}</strong>{group.tags.join(' · ')}</p>)}<p><strong>AI</strong>Local Agent · Ollama · ChromaDB · Codex</p></div></div>
    </section>,
    about: (strengths.id !== 'default' || !has('hero')) && <section className="wc-container wc-section wc-strengths" id={has('hero') ? 'strengths' : 'about'}><SectionHeading number="" title={strengths.title}>{strengths.intro}</SectionHeading><div className="wc-context-grid">{strengths.cards.map(card => <article key={card.title}><h3>{card.title}</h3><p>{card.subtitle}</p><div className="wc-rich-copy" dangerouslySetInnerHTML={{ __html: card.description }} /></article>)}</div></section>,
    projects: <><section className="wc-section wc-projects" id="projects">
      <div className="wc-container"><SectionHeading number="01" title="대표 프로젝트">{composition.copyProfile.id === 'default' ? '직접 맡은 문제와 검증한 결과' : composition.copyProfile.projectsSubtitle}</SectionHeading></div>
      <div className="wc-container wc-reading-layout">
        <aside className="wc-reading-nav" aria-label="프로젝트 목차"><p>읽고 있는 이야기</p>{sections.map(item => <div key={item.id}>{'group' in item && <span className="wc-nav-group">{item.group}</span>}<Link to={`${homePath}${search}#${item.id}`} aria-current={activeSection === item.id ? 'location' : undefined}>{item.label}</Link></div>)}<Link className="wc-reading-next" to={`${homePath}${search}#work`}>협업·AI로 이동 ↓</Link></aside>
        <div className="wc-reading-body">{composition.projectIds.map(id => { const project = projects.find(item => (item.id === '3m' ? 'three-m' : item.id) === id); return project ? <ProjectStory project={project} show={show} key={id} /> : id === 'fix-ticketing' ? <FixProjectStory show={show} key={id} /> : null })}</div>
      </div>
    </section>
    <section className="wc-soft-section" id="work"><div className="wc-container wc-section"><SectionHeading number="02" title="함께 일하는 방식">과정을 공유하고, 도구의 결과를 직접 확인합니다</SectionHeading>
      <article className="wc-work-row"><div><span className="wc-kicker">팀 협업</span><h3>작업 변경을 자동 공유해<br />팀의 흐름을 투명하게</h3><p>JIRA 운영 기준과 Confluence 자료 체계를 정리했습니다. Slack 알림으로 이슈·커밋 변경을 자동 공유해 담당과 진행 상태를 함께 확인하고 추적할 수 있게 했습니다.</p><ExternalLink href={COLLABORATION_SECTION.guideUrl}>직접 작성한 JIRA 가이드라인</ExternalLink></div><Evidence src={asset(COLLABORATION_SECTION.evidence[1].image)} caption="JIRA 이슈·커밋 변경이 Slack에 자동 공유된 화면" show={show} /></article>
      <details className="wc-disclosure"><summary>스프린트 운영과 자료 정리 근거 <span>2개 자료 <b aria-hidden="true">+</b></span></summary><div className="wc-proof-grid">{[COLLABORATION_SECTION.evidence[0], COLLABORATION_SECTION.evidence[2]].map(item => <div key={item.image}><Evidence src={asset(item.image)} caption={item.title} show={show} /><p className="wc-caption">{item.description}</p></div>)}</div></details>
      <article className="wc-work-row wc-planner-row"><div><span className="wc-kicker">AI 활용 · 개인 플래너</span><h3>일상을 관리하고<br />기록·정리하는 도구 제작</h3><p>Codex와 AI 도구로 개인 플래너를 제작해 일상의 관리·기록·정리에 사용하고 있습니다. 생성한 코드는 변경 영향과 실제 동작을 직접 확인합니다.</p><p className="wc-small-label">AI 원티드 챌린지 대회 참여 중</p><ExternalLink href={PROJECT_WORKFLOW.currentStage.linkUrl}>플래너 제작 후기</ExternalLink></div><Evidence src={plannerScreen} caption="직접 제작해 사용 중인 개인 플래너" show={show} /></article>
      <details className="wc-disclosure"><summary>AI 활용 과정과 현재·다음 단계 <span><b aria-hidden="true">+</b></span></summary><Steps items={[["근거와 생각 정리", "NotebookLM으로 근거를 모으고 Claude·Gemini로 문서와 대안을 정리"], ["구현과 직접 검증", "Codex·Claude Code로 구현하고 코드 이해·변경 영향·빌드·테스트·실제 동작 확인"], ["다음 단계", "일상 도구 제작에서 기술 문제의 원인 분석과 해결책 설계·검증으로 활용 범위 확장"]]} /></details>
    </div></section></>,
    experience: <section className="wc-container wc-section" id="experience"><SectionHeading number="03" title="관련 경험">개발·교육·발표로 쌓은 경험</SectionHeading><div className="wc-experience-list">{[EXPERIENCE_ITEMS[4], EXPERIENCE_ITEMS[0], EXPERIENCE_ITEMS[1]].map(item => <div key={item.title}><p className="wc-meta">{item.period}<span>{item.category}</span></p><div><h3>{item.title}</h3><p>{item.detail}</p></div></div>)}</div><details className="wc-disclosure"><summary>교육·발표 경험 더 보기 <span>2개 경험 <b aria-hidden="true">+</b></span></summary><div className="wc-experience-list">{EXPERIENCE_ITEMS.slice(2, 4).map(item => <div key={item.title}><p className="wc-meta">{item.period}<span>{item.category}</span></p><div><h3>{item.title}</h3><p>{item.detail}</p></div></div>)}</div></details></section>,
    closing: <section className="wc-contact-section wc-closing" id="direction"><div className="wc-container"><span className="wc-kicker">함께 일하고 싶은 개발자</span><h2>근거를 확인하고, 팀이 이해할 수 있게 설명합니다</h2><p>작업 과정과 판단 근거를 공유하고,<br />다음 사람이 이해하고 이어갈 수 있도록 코드와 문서를 정리하겠습니다.</p>{composition.companyInsight && <CompanyInsight insight={composition.companyInsight} />}</div></section>,
    contact: <section className="wc-contact-section wc-contact-details" id="contact"><div className="wc-container"><div className="wc-contact-links"><a href="mailto:dbp100402@gmail.com">dbp100402@gmail.com <span aria-hidden="true">↗</span></a><a href="tel:+821030841488">010-3084-1488</a><ExternalLink href="https://linkedin.com/in/minsoo-jeong-31861b401">LinkedIn</ExternalLink></div></div></section>,
    resources: <section className="wc-contact-section wc-resources-panel" id="resources"><div className="wc-container"><section className="wc-resources" aria-labelledby="resources-title"><h3 id="resources-title">프로젝트·활동 자료</h3><nav className="wc-resource-list" aria-label="전체 자료">{RESOURCE_LINKS.filter(item => !item.projectId || composition.projectIds.includes(item.projectId)).map(item => <ExternalLink key={item.url} href={item.url.replace('https://app.notion.com/p/', 'https://slime-face-7c4.notion.site/')}>{item.label}</ExternalLink>)}</nav></section></div></section>,
  }
  return <>{composition.blockIds.map(id => <Fragment key={id}>{blocks[id]}</Fragment>)}</>
}

function CompanyInsight({ insight }: { insight: NonNullable<WebComposition['companyInsight']> }) {
  return <article className="wc-company-insight"><span className="wc-kicker">{insight.label}</span>{insight.logoSrc && <img className="wc-company-logo" src={insight.logoSrc} alt={insight.logoAlt} />}<h3>{insight.brand}</h3><p>{insight.summary}</p><Finding label={insight.noteTitle}>{insight.noteBody}</Finding>{insight.experienceBody && <Finding label={insight.experienceTitle}>{insight.experienceBody}</Finding>}{insight.flow.length > 0 && <p>{insight.flow.join(' → ')}</p>}<p className="wc-detail-stack">{insight.keywords.join(' · ')}</p></article>
}

function FixProjectStory({ show }: { show: ShowEvidence }) {
  const project = fixTicketingProject
  return <article className="wc-project-story" id={project.id}><header className="wc-project-heading"><span className="wc-kicker">추가 프로젝트 · 티켓팅</span><h2>FIX</h2><p>{project.description}</p><p className="wc-meta">{project.period} · {project.teamSize}</p><p className="wc-detail-stack">{project.techStack.join(' · ')}</p><div className="wc-sources"><ExternalLink href={project.githubUrl}>GitHub</ExternalLink>{project.wikiUrl && <ExternalLink href={project.wikiUrl}>Wiki</ExternalLink>}</div></header><section className="wc-overview"><h3>직접 맡은 개발</h3><Steps items={project.roles.map(role => [role.title, role.detail])} />{project.architectureImage && <Evidence src={asset(project.architectureImage)} caption="FIX 시스템 구조" show={show} legend />}</section><section className="wc-case"><CaseHeading number="01" title={project.problemHeadline!} description={project.problem!} />{[['대안 비교와 선택', project.thinking], ['구현', project.solution], ['개선 효과', project.result]].map(([title, body]) => <div className="wc-case-step" key={title}><h3>{title}</h3><div className="wc-rich-copy" dangerouslySetInnerHTML={{ __html: body ?? '' }} /></div>)}</section>{project.projectReflection && <section className="wc-reflection"><span className="wc-kicker">FIX · 프로젝트 회고</span><h3>{project.projectReflection.title}</h3><div className="wc-rich-copy" dangerouslySetInnerHTML={{ __html: project.projectReflection.body }} /></section>}</article>
}

function FeedShopCases({ show }: { show: ShowEvidence }) {
  return <>
    <section className="wc-case" id="query"><CaseHeading number="01" title="이벤트 목록의 로딩 지연 줄이기" description="목록을 불러오는 대기 시간을 줄이기 위해, 반복 조회의 원인부터 확인했습니다." />
      <div className="wc-context-grid"><div><h3>문제와 원인</h3><p>연관 데이터를 반복 조회하고 메모리에서 필터링해 목록 요청 한 번에 DB 조회가 42회 발생했습니다.</p></div><div><h3>판단 기준</h3><p>캐시가 없는 요청도 빨라야 했습니다. 조회 구조를 먼저 개선하고, 여러 Cloud Run 인스턴스가 같은 결과를 재사용하도록 Redis를 적용했습니다.</p></div></div>
      <Comparison caption="대안 비교" columns={['검토한 방식', '얻는 점', '남는 부담']} rows={[
        ['캐시만 적용', '반복 요청의 결과 재사용', '캐시가 없으면 반복 조회 유지'], ['조회 구조만 개선', '요청당 조회 횟수 감소', '반복 요청마다 DB 접근'], ['조회 개선 + Redis · 적용', '첫 조회와 반복 요청의 비용 감소', '유효기간·변경 시 캐시 삭제 관리'],
      ]} />
      <h3 className="wc-subtitle">조회 구조 개선 후 캐시를 단계별로 적용</h3><Steps items={[
        ['연관 데이터 함께 조회', 'QueryDSL leftJoin·fetchJoin으로 반복 조회를 줄이고 countDistinct로 집계 쿼리 분리'], ['조회 결과 재사용', '@Cacheable로 Redis에 결과를 저장하고 반복 요청에서 재사용'], ['변경과 만료 관리', 'TTL과 @CacheEvict로 유효기간과 데이터 변경 시 삭제 관리'],
      ]} />
      <div id="query-proof" className="wc-verification"><h3>단계별 측정으로 효과 확인</h3><ResponseChart /><Comparison caption="평균 응답시간과 요청별 DB 조회를 구분해 확인" columns={['측정 대상', '개선 전', '조회 개선', 'Redis 추가']} rows={[
        ['평균 응답시간 · 동시 1,000명', '6.818초', '4.191초', '0.638초'], ['오류 · 동시 1,000명', '0건', '0건', '732건 / 49,931건'], ['요청당 DB 조회', '42회', '2회', '캐시 적중 요청 0회'],
      ]} /><p className="wc-measurement">MacBook Air M2 / 24GB · Java 17 · Spring Boot 3.3.12 · MySQL 8.2 · Redis 7.4 · nGrinder 3.5.9 · Scouter 2.21.3<br />응답시간은 로컬 부하 테스트의 평균이며, DB 조회 수는 Scouter의 요청별 기록입니다.</p>
        <Evidence src={asset('phase2a-ngrinder-v1000.png')} caption="Redis 적용 후 · 동시 1,000명 · 평균 638ms / TPS 438.3 · 오류 732건" show={show} />
        <div className="wc-sql-evidence" id="query-sql" aria-label="요청당 DB 조회 42회·2회·0회 비교">{[
          ['before-scouter-sql42.png', '개선 전 · 42회'],
          ['phase1-scouter-sql2.png', '조회 구조 개선 · 2회'],
          ['phase2a-scouter-cache-hit2.png', 'Redis 캐시 적중 · 0회'],
        ].map(([src, caption]) => <Evidence src={asset(src)} caption={caption} show={show} key={src} />)}</div>
        <details className="wc-disclosure"><summary>개선 전·중간 단계의 응답시간 원본 <span>2개 자료 <b aria-hidden="true">+</b></span></summary><div className="wc-proof-grid">{[
          ['before-ngrinder-v1000.png', '개선 전 · 평균 6,818ms / TPS 138.7'], ['phase1-ngrinder-v1000.png', '조회 구조 개선 · 평균 4,191ms'],
        ].map(([src, caption]) => <Evidence src={asset(src)} caption={caption} show={show} key={src} />)}</div></details>
      </div>
      <Finding>조회 구조 개선과 캐시 적용 후 평균 응답시간이 약 91% 줄었습니다. 같은 테스트에서 오류 732건(약 1.47%)이 기록되어, 응답 속도와 오류 수를 함께 확인해야 합니다.</Finding><ExternalLink href={queryWiki}>대안·구현 코드·전체 측정 기록</ExternalLink>
    </section>
    <section className="wc-case" id="vote"><CaseHeading number="02" title="중복 투표 차단과 집계 검증" description="중복 검사만으로 막을 수 없었던 동시 요청을 DB 제약으로 처리하고, 카운터 갱신을 분리했습니다." />
      <div className="wc-context-grid"><div><h3>문제와 원인</h3><p>중복 검사와 저장 사이에 두 요청이 함께 통과하는 구간이 있었습니다. DB에서 투표 카운터를 갱신할 때는 잠금 경합도 발생했습니다.</p></div><div><h3>판단 기준</h3><p>중복 저장은 DB에서 막고, 저장 실패 후 응답 처리와 카운터 갱신은 각각의 경계에서 처리하도록 나눴습니다.</p></div></div>
      <Comparison caption="대안 비교" columns={['검토한 방식', '얻는 점', '남는 부담']} rows={[
        ['코드 중복 검사', '단순한 구현', '동시 요청이 검사를 함께 통과'], ['DB 저장·카운터 갱신', '하나의 트랜잭션으로 처리', '카운터 잠금 경합·예외 전파'], ['DB 유니크 제약', '중복 저장 차단', '예외 처리와 카운터 경합은 별도 해결'], ['DB 제약 + 예외 분리 + Redis · 적용', '중복 차단과 카운터 갱신 책임 분리', 'DB·Redis 사이 불일치 관리'],
      ]} />
      <h3 className="wc-subtitle">저장 → 예외 처리 → 카운터 갱신</h3><Steps items={[
        ['DB 저장', '(event_id, voter_id) 유니크 제약으로 같은 사용자의 중복 투표 저장 차단'], ['중복 예외 처리', '저장·flush는 REQUIRED 안에서, 중복 예외는 NOT_SUPPORTED 흐름에서 처리'], ['Redis 갱신', '정상 저장한 투표 수를 Redis INCR로 갱신해 DB 카운터 잠금 경합 분리'],
      ]} />
      <div className="wc-verification"><h3>부하별 응답과 데이터 정확성을 각각 검증</h3><Comparison caption="개선 후 투표 요청 · nGrinder 부하 테스트" columns={['동시 사용자', '실행 시간', '평균 응답시간', 'HTTP 오류']} rows={[
        ['500명', '2분 1초', '0.83초', '0건'], ['1,000명', '2분', '2.19초', '0건'], ['3,000명', '2분 1초', '5.00초', '0건'],
      ]} /><Evidence src={asset('vuser3000_result.png')} caption="동시 3,000명 · 투표 요청의 HTTP 오류 0건" show={show} />
        <Finding label="데이터 검증">DB 중복 저장 0건과 DB 투표 이력 수·Redis 카운터의 일치를 별도로 확인했습니다.</Finding>
        <details className="wc-disclosure"><summary>500·1,000명 테스트와 집계 대조 화면 <span>3개 자료 <b aria-hidden="true">+</b></span></summary><div className="wc-proof-grid"><Evidence src={asset('vuser500_result.png')} caption="동시 500명 · HTTP 오류 0건" show={show} /><Evidence src={asset('vuser1000_result.png')} caption="동시 1,000명 · HTTP 오류 0건" show={show} /><Evidence src={asset('phase2b-redis-count-verify.png')} caption="Redis 카운터와 API 응답 대조 · DB 대조는 Wiki 검증 기록 참고" show={show} /></div></details>
      </div><div className="wc-limit"><h3>복구 경로와 남은 한계</h3><p>Redis 키 유실 시 DB 투표 수로 복구하고, Redis 조회 장애 시 DB 집계로 응답하도록 구현했습니다. DB 커밋과 Redis 갱신 사이의 일시적 불일치는 남아 정기 보정이 필요합니다.</p></div><div className="wc-sources"><ExternalLink href={voteWiki}>대안·DB 중복·집계 검증 기록</ExternalLink><ExternalLink href={recoveryCommit}>복구 구현과 테스트 코드</ExternalLink></div>
    </section>
  </>
}

function ThreeMCase({ show }: { show: ShowEvidence }) {
  return <section className="wc-case" id="boundary"><CaseHeading number="01" title="인증 구조 개선과 서비스 경계 분리" description="Auth·User·Gateway의 역할을 나누고, 실제 요청이 인증과 권한 검사를 끝까지 거치는지 확인했습니다." />
    <div className="wc-context-grid"><div><h3>문제와 원인</h3><p>Auth가 User의 내부 구현을 직접 참조해 빌드 경계가 묶여 있었습니다. 일반 권한 확인도 User 조회에 의존하면 서비스 간 호출이 늘어납니다.</p></div><div><h3>판단 기준</h3><p>로그인·토큰 발급, 사용자 정보 관리, 요청 인증의 책임을 나누고, 서비스 사이에서는 필요한 정보만 주고받도록 정리했습니다.</p></div></div>
    <div className="wc-case-step"><span className="wc-kicker">적용 01</span><h3>Auth·User의 내부 구현 참조 분리</h3><p>Auth는 로그인·JWT 발급, User는 사용자 정보·역할 관리를 맡고, 공통 DTO 계약과 Feign 단방향 호출로 연결했습니다.</p>
      <Comparison caption="서비스 연결 방식 비교" columns={['검토한 방식', '얻는 점', '남는 부담']} rows={[
        ['User 직접 참조', '쉬운 타입 공유', '빌드·배포 경계가 함께 묶임'], ['서비스별 DTO 복제', '모듈 분리', '계약 변경 누락·중복 관리'], ['common 계약 + Feign · 적용', '서비스 내부 구현 참조 분리', '공통 계약의 버전 관리'],
      ]} />
      <div className="wc-proof-grid wc-boundary-images"><Evidence src={asset('3m-auth-user-before-class-diagram.png')} caption="개선 전 검토 구조 · Auth/User 책임 혼재" show={show} /><Evidence src={asset('3m-auth-user-after-class-diagram-final.png')} caption="개선 후 · 공통 계약과 Feign 단방향 호출" show={show} /></div>
    </div>
    <div className="wc-case-step" id="auth-flow"><span className="wc-kicker">적용 02</span><h3>검증한 인증 정보를 서비스에 전달</h3><p>일반 권한 확인에는 Gateway가 검증한 JWT의 userId·role을 사용하고, 상세 사용자 정보가 필요한 요청만 User를 조회하도록 나눴습니다.</p>
      <Comparison caption="일반 권한 확인 방식 비교" columns={['검토한 방식', '얻는 점', '남는 부담']} rows={[
        ['요청마다 User 조회', '최신 역할 확인', '호출 증가·User 상태 의존'], ['Gateway 로컬 캐시', 'User 호출 감소', '인스턴스 간 값 동기화·삭제'], ['JWT userId·role 활용 · 적용', '일반 권한 확인의 추가 조회 감소', '역할 변경 반영·헤더 신뢰 경계'],
      ]} />
      <div className="wc-auth-flows"><div><h4>개선 전 검토 · 요청마다 사용자 조회</h4><ol>{['Client 요청', 'Service', 'User 역할 조회', 'Service 권한 판단'].map(text => <li key={text}>{text}</li>)}</ol></div><div><h4>개선 후 · 검증한 정보로 일반 권한 처리</h4><ol>{['Client 요청', 'Gateway JWT 검증', 'X-User-* 전달', 'Service AOP 확인'].map(text => <li key={text}>{text}</li>)}</ol></div></div>
    </div>
    <div className="wc-verification" id="auth-proof"><h3>코드 경계와 실제 요청을 함께 검증</h3><Comparison caption="소스 코드 구조 검증" columns={['확인 대상', '확인 결과']} rows={[
      ['Auth의 User 모듈 직접 의존', '제거 · common DTO 계약을 통한 Feign 호출'], ['User 모듈의 Auth 패키지 import', '정적 분석에서 0건 확인'],
    ]} /><p>통합 테스트에서 User API의 JWT 검증 우회와 권한 검사 누락을 발견했습니다. 인증 제외 경로를 수정하고 MasterRoleAspect와 예외 처리를 추가했습니다.</p><Comparison caption="역할 변경 API · Gateway·Auth·User 통합 테스트" columns={['요청 조건', '응답', '확인한 동작']} rows={[
      ['MASTER', '200', '관리자 요청 허용'], ['HUB_MANAGER', '403', '권한이 부족한 요청 거부'], ['미인증', '401', '인증되지 않은 요청 차단'],
    ]} /><p className="wc-measurement">로컬 H2 환경의 통합 테스트 결과 · 코드 구조 분석과 실제 권한 응답을 구분해 검증</p></div>
    <Finding>내부 구현의 직접 참조를 분리해 빌드 경계를 확보했습니다. 인증 확인부터 역할별 요청 허용·차단까지 연결하고, 테스트에서 발견한 검증 우회와 권한 검사 누락을 수정했습니다.</Finding>
    <div className="wc-limit"><h3>함께 관리할 조건</h3><p>토큰 유효기간 중 역할 변경을 반영하는 방식과, 서비스에 전달하는 헤더의 신뢰 경계를 함께 관리해야 합니다.</p></div><div className="wc-sources"><ExternalLink href={boundaryWiki}>서비스 경계 비교와 정적 분석 근거</ExternalLink><ExternalLink href={authReport}>인증 문제와 통합 테스트 보고서</ExternalLink></div>
  </section>
}

function ProjectStory({ project, show }: { project: PortfolioProject; show: ShowEvidence }) {
  const feed = project.id === 'feedshop'
  return <article className="wc-project-story" id={project.id}>
    <header className="wc-project-heading"><span className="wc-kicker">프로젝트 {project.number} · {project.category}</span><h2>{project.name}</h2><p>{project.description}</p><dl className="wc-project-facts"><div><dt>기간</dt><dd>{project.period}</dd></div><div><dt>팀 구성</dt><dd>{project.team}</dd></div><div><dt>내 역할</dt><dd>{project.role}</dd></div></dl><p className="wc-detail-stack">{project.stack.join(' · ')}</p><div className="wc-sources"><ExternalLink href={project.github}>GitHub</ExternalLink><ExternalLink href={project.wiki}>Wiki</ExternalLink></div></header>
    <section className="wc-overview" id={`${project.id}-overview`}><h3>서비스와 직접 맡은 개발</h3><p>{project.responsibility}</p><Steps items={feed ? [['구매', '상품 탐색·구매'], ['참여', '피드 공유·이벤트 투표'], ['보상·재방문', '참여 보상으로 다음 방문 유도']] : [['업체', '주문 생성·상품 요청'], ['허브', '지역 거점 간 이동 관리'], ['배송 담당자', '배정된 배송 작업 수행']]} />
      {feed && <p className="wc-context-source">서비스 배경: 도·소매업 소상공인의 46.9%가 경쟁 심화를 경영 애로로 꼽은 조사에 주목했습니다. <ExternalLink href={survey}>2022년 소상공인실태조사 · 본문 11쪽, 복수응답</ExternalLink></p>}
      <div className="wc-architecture"><Evidence src={asset(project.architecture)} caption={`${project.name} 전체 시스템 구조`} show={show} legend /><div className="wc-context-grid"><div><h4>{feed ? '배포와 상태 확인' : '통합 실행 환경'}</h4><p>{feed ? 'Docker 이미지 → GCR → Cloud Run 배포 후 Actuator 헬스체크로 서비스 상태 확인' : 'Docker Compose로 서비스·DB·Redis·Zipkin을 함께 실행하고 Actuator 헬스체크로 기동 상태 점검'}</p></div><div><h4>{feed ? '검증·배포 자동화' : '서비스 연결'}</h4><p>{feed ? 'GitHub Actions에 테스트·JaCoCo·SonarCloud·배포를 연결해 변경마다 같은 품질 기준 확인' : 'Eureka 자동 등록으로 고정 주소 의존을 줄이고, Gateway에 JWT 검증을 모아 중복 인증 처리 축소'}</p></div></div></div>
    </section>
    {feed ? <FeedShopCases show={show} /> : <ThreeMCase show={show} />}
    <section className="wc-reflection" id={`${project.id}-reflection`}><span className="wc-kicker">{project.name} · 프로젝트 회고</span><h3>이 경험으로 얻은 기준</h3><p>{project.learning}</p><ul>{(feed ? ['성능 개선은 단계를 나누어 측정해야 각 조치의 효과를 구분할 수 있습니다.', '빠른 응답과 함께 중복 저장 여부, 집계의 정확성, 장애 시 조회 경로까지 확인합니다.'] : ['서비스 이름을 나누는 데서 끝내지 않고 실제 코드의 참조와 변경 범위를 확인합니다.', '개별 기능의 동작과 별개로, 요청이 인증과 권한 검사를 끝까지 거치는지 검증합니다.']).map(text => <li key={text}>{text}</li>)}</ul></section>
  </article>
}

export default function Home() {
  const location = useLocation()
  const navigate = useNavigate()
  const composition = useMemo(() => resolveWebComposition(location.search), [location.search])
  const sections = useMemo(() => getReadingSections(composition.projectIds), [composition.projectIds])
  const has = (id: PortfolioBlockId) => composition.blockIds.includes(id)
  const root = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState<string>('feedshop')
  const [evidence, setEvidence] = useState<EvidenceImage | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const previousTitle = document.title
    document.title = '정민수 · 백엔드 개발자 포트폴리오'
    return () => { document.title = previousTitle }
  }, [])
  useEffect(() => {
    const legacyProject = new URLSearchParams(location.search).get('project')
    if (legacyProject === 'feedshop' || legacyProject === '3m') {
      const oldAnchor = location.hash.slice(1)
      const anchor = oldAnchor === 'reflection' ? `${legacyProject}-reflection`
        : oldAnchor === 'overview' ? `${legacyProject}-overview`
        : oldAnchor === 'auth' ? 'auth-flow' : oldAnchor || legacyProject
      navigate(`${homePath}#${anchor}`, { replace: true })
      return
    }
    const legacyAnchors: Record<string, string> = { hero: 'profile', collaboration: 'work', closing: 'direction', 'three-m': '3m' }
    const migratedAnchor = legacyAnchors[location.hash.slice(1)]
    if (migratedAnchor) {
      navigate(`${homePath}${location.search}#${migratedAnchor}`, { replace: true })
      return
    }
    if (location.pathname === '/web-preview') {
      navigate(`${homePath}${location.search}${location.hash}`, { replace: true })
      return
    }
    const frame = requestAnimationFrame(() => {
      const target = location.hash ? document.getElementById(location.hash.slice(1)) : null
      if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' })
      else window.scrollTo({ top: 0, behavior: 'instant' })
    })
    return () => cancelAnimationFrame(frame)
  }, [location.pathname, location.search, location.hash, navigate])
  useEffect(() => {
    const nav = root.current?.querySelector<HTMLElement>('.wc-nav')
    if (!nav) return
    let frame = 0
    const update = () => {
      frame = 0
      const headerHeight = nav.getBoundingClientRect().height
      root.current?.style.setProperty('--wc-nav-height', `${headerHeight}px`)
      let current: string = sections[0]?.id ?? ''
      for (const item of sections) {
        if ((document.getElementById(item.id)?.getBoundingClientRect().top ?? Infinity) <= headerHeight + 100) current = item.id
      }
      setActiveSection(current)
      // 모바일에서도 현재 읽는 항목이 가로 목차 밖으로 숨지 않게 한다.
      const storyNav = root.current?.querySelector<HTMLElement>('.wc-reading-nav')
      const activeLink = storyNav?.querySelector<HTMLAnchorElement>(`a[href$="#${current}"]`)
      if (window.innerWidth <= 760 && storyNav && activeLink) {
        const navRect = storyNav.getBoundingClientRect()
        const linkRect = activeLink.getBoundingClientRect()
        if (linkRect.left < navRect.left || linkRect.right > navRect.right) {
          storyNav.scrollTo({ left: storyNav.scrollLeft + linkRect.left - navRect.left - 12, behavior: 'instant' })
        }
      }
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    const observer = new ResizeObserver(schedule)
    observer.observe(nav)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    schedule()
    return () => { observer.disconnect(); cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule) }
  }, [sections])
  useEffect(() => { if (evidence) dialog.current?.showModal() }, [evidence])
  return <div className="web-concept" ref={root}>
    <a className="wc-skip" href="#wc-main">본문으로 건너뛰기</a>
    <header className="wc-nav"><div className="wc-container"><Link className="wc-brand" to={`${homePath}${location.search}`}>정민수<span>백엔드 개발자</span></Link><nav aria-label="주요 메뉴">{has('projects') && <Link to={`${homePath}${location.search}#projects`}>프로젝트</Link>}{has('projects') && <Link to={`${homePath}${location.search}#work`}>협업·AI</Link>}{has('experience') && <Link to={`${homePath}${location.search}#experience`}>경험</Link>}{has('contact') && <Link to={`${homePath}${location.search}#contact`}>연락</Link>}</nav><Link className="wc-nav-pdf" to="/pdf">PDF 보기 ↗</Link></div></header>
    <main id="wc-main"><HomeView show={setEvidence} activeSection={activeSection} composition={composition} search={location.search} /></main>
    <dialog className="wc-image-dialog" ref={dialog} onClose={() => setEvidence(null)} onClick={event => { event.stopPropagation(); if (event.target === event.currentTarget) dialog.current?.close() }}>
      {evidence && <><header><h2>{evidence.caption}</h2><button autoFocus onClick={() => dialog.current?.close()} aria-label="근거 이미지 닫기">닫기 ×</button></header><div><img src={evidence.src} alt={evidence.caption} /></div><ExternalLink href={evidence.src}>원본 이미지 열기</ExternalLink></>}
    </dialog>
  </div>
}
