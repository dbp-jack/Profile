import type { ReactNode } from 'react'
import { DEFAULT_COPY_PROFILE } from '@/portfolio-builder/copy-profiles'
import plannerScreen from './assets/planner-screen.png'
import { FEEDSHOP_SCREENS } from '@/content/feedshop-screens'
import { THREE_M_SCREENS } from '@/content/three-m-screens'
import { Note, PageBottom, Grid, Block, Table, Flow, Proof, Source } from './components'
import { HERO_PERSONAL_INFO, HERO_SKILL_GROUPS, COLLABORATION_SECTION, RESOURCE_LINKS, EXPERIENCE_ITEMS } from '@/content/portfolio'
import { feedShopProject, threeMProject } from '@/content/projects'

declare const __BASE_PATH__: string
const asset = (path: string) => `${__BASE_PATH__}${path.replace(/^\//, '')}`
const feedWiki = 'https://github.com/dbp-jack/FeedShop_Backend_Refactoring/wiki'
const performanceWiki = `${feedWiki}/이벤트-목록-조회-성능-개선`
const voteWiki = `${feedWiki}/피드-투표-동시성-개선`
const m3Wiki = 'https://github.com/sparta-i4u/sparta-msa/wiki'
const m3BoundaryWiki = 'https://github.com/sparta-i4u/sparta-msa/wiki/%5BTrouble-Shooting%5D%5B%EB%AF%BC%EC%88%98%E2%80%90User,-Auth,-Gateway-%EB%8F%84%EB%A9%94%EC%9D%B8%5D-%EC%9D%B8%EC%A6%9D-%EA%B5%AC%EC%A1%B0-%EC%84%A4%EA%B3%84%EC%99%80-%EC%84%9C%EB%B9%84%EC%8A%A4-%EA%B2%BD%EA%B3%84-%EB%B6%84%EB%A6%AC'
const voteRecoveryCommit = 'https://github.com/dbp-jack/FeedShop_Backend_Refactoring/commit/61466a2'
const survey = 'https://www.kostat.go.kr/boardDownload.es?bid=12029&list_no=428839&seq=1'

export const chapters = [
  { name: '소개와 목차', start: 1, end: 3, detail: '개발자 소개 · 핵심 경험' },
  { name: 'FeedShop', start: 4, end: 15, detail: '서비스 화면 · 조회 성능 · 투표 동시성 · 회고' },
  { name: '3M', start: 16, end: 23, detail: '서비스 흐름 · 책임 분리 · 인증 흐름 · 회고' },
  { name: '협업 방식', start: 24, end: 24, detail: 'JIRA · Confluence · Slack 증거' },
  { name: 'AI 활용', start: 25, end: 25, detail: '현재 제작 경험 · 활용 흐름 · 다음 단계' },
  { name: '관련 경험', start: 26, end: 26, detail: '개발 · 교육 · 발표 기록' },
  { name: '마무리와 자료', start: 27, end: 28, detail: '성장 방향 · 자료 링크 · 연락처 · 감사 인사' },
] as const

export const caseLabels = {
  'feed-query': { project: 'FeedShop', number: 1, name: '이벤트 목록 조회 성능 개선' },
  'feed-vote': { project: 'FeedShop', number: 2, name: '투표 동시성과 정합성 확보' },
  'm3-boundary': { project: '3M', number: 1, name: '서비스 경계와 인증 흐름 개선' },
} as const

export type DraftPage = {
  id: string
  title: string
  section: string
  stage?: string
  caseId?: keyof typeof caseLabels
  layout?: 'cover' | 'toc' | 'thanks'
  body: ReactNode
}

export const draftPages: DraftPage[] = [
  {
    id: 'profile', title: '정민수', section: '소개', layout: 'cover',
    body: <><a className="cover-web-link" href="https://dbp-jack.github.io/Profile/" target="_blank" rel="noopener noreferrer">포트폴리오 웹사이트 <span aria-hidden="true">↗</span></a><div className="rac-cover"><img className="rac-photo" src={asset('profile-photo.png')} alt="정민수 증명사진" /><div><p className="cover-role">개발자</p><h2>정민수</h2><p className="cover-intro">{DEFAULT_COPY_PROFILE.heroRoleTitle}</p><dl className="rac-contact">{HERO_PERSONAL_INFO.map((row, i) => <div key={row.text}><dt>{['주소', '전화번호', 'Github', 'LinkedIn'][i]}</dt><dd>{row.href ? <a href={row.href} target="_blank" rel="noreferrer">{row.text}</a> : row.text}</dd></div>)}</dl><div className="rac-skills">{HERO_SKILL_GROUPS.map(group => <div key={group.label}><strong>{group.label}</strong><span>{group.tags.join(' · ')}</span></div>)}<div><strong>AI</strong><span>Local Agent · Ollama · ChromaDB · Codex</span></div></div></div></div></>,
  },
  {
    id: 'strengths', title: '핵심 경험', section: '소개',
    body: <div className="rac-experiences">
      <div className="rac-experience"><span>01</span><div><h3>성능과 데이터 정확성 개선</h3><p>사용자 이탈 방지를 위해 이벤트 목록의 로딩 지연을 줄여<br />평균 응답시간 <strong className="metric-accent">91% 단축</strong>, 동시 투표 테스트에서 오류·중복 <strong className="metric-accent">0건</strong> 확인</p></div></div>
      <div className="rac-experience"><span>02</span><div><h3>작업 과정이 투명하게 공유되는 협업 환경 구축</h3><p>JIRA 운영 기준과 Confluence 문서 체계를 정리하고,<br />Slack 알림으로 작업 상태·커밋 변경을 <strong className="metric-accent">자동 공유</strong>해<br />팀이 작업 흐름을 <strong className="metric-accent">투명하게</strong> 확인하고 추적할 수 있는 환경 구축</p></div></div>
      <div className="rac-experience"><span>03</span><div><h3>AI를 활용한 제작 경험</h3><p>일상을 관리하고 기록·정리하는 개인 플래너를 제작<br /><strong className="metric-accent">AI 원티드 챌린지 대회 참여 중 · 1,390팀 중 70위</strong></p></div></div>
    </div>,
  },
  {
    id: 'contents', title: '목차', section: '전체 구성', layout: 'toc',
    body: <><p>프로젝트의 문제와 배경을 이해한 뒤, 대안 비교·구현 → 검증 → 최종 결과 순서로 읽을 수 있습니다.</p><div className="document-toc">{chapters.filter(c => c.start > 3).map(c => <button key={c.name} data-jump-page={c.start}><span><strong>{c.name}</strong><small>{c.detail}</small></span><b>{c.start === c.end ? c.start : `${c.start}–${c.end}`}쪽 →</b></button>)}</div><PageBottom><Note label="문제 해결 사례">FeedShop ① 조회 성능 ② 투표 동시성<br />3M ① 서비스 경계와 인증 흐름 개선</Note></PageBottom></>,
  },
  {
    id: 'feed-intro', title: 'FeedShop · 서비스와 담당', section: '프로젝트 1 · FeedShop',
    body: <><p className="project-intro">도·소매업 소상공인의 <strong className="metric-accent">46.9%</strong>가 경쟁 심화를 경영 애로로 꼽은 조사에 주목해,<br />투표 이벤트와 참여 보상으로 구매 후 재방문을 유도하는 패션 커뮤니티 플랫폼</p><Source href={survey}>2022년 소상공인실태조사 결과(잠정) · 본문 11쪽, 복수응답</Source><p className="rac-meta">2025.05–2025.09 · 4명 · 부팀장 / 백엔드</p><Flow steps={[
      ['구매', '상품 탐색·구매'], ['참여', '피드 공유·이벤트 투표'], ['보상·재방문', '참여 보상으로 다음 방문 유도'],
    ]} /><Grid><Block title="직접 담당한 개발">이벤트·투표 API, 피드·댓글·좋아요·검색<br />Docker·Cloud Run 배포, CI/CD 구성</Block><Block title="주요 개선과 효과"><p>목록 로딩 지연 개선 → 사용자 이탈 방지를 위한 탐색 속도 개선</p><p>동시 투표의 중복 저장 차단 → 투표 수 정합성 확보</p></Block></Grid><PageBottom><p className="rac-meta">Spring Boot · QueryDSL · MySQL · Redis · GCP · Docker</p></PageBottom></>,
  },
  {
    id: 'feed-screens', title: 'FeedShop · 서비스 화면', section: '프로젝트 1 · FeedShop',
    body: <>
      <p className="feed-screen-flow">이벤트 탐색 → 피드·후기 공유 → 투표 → 보상 확인</p>
      <div className="feed-screen-grid">{FEEDSHOP_SCREENS.map(screen => <div key={screen.src}>
        <Proof src={screen.src} caption={screen.caption} height={200} />
        <p>{screen.detail}</p>
      </div>)}</div>
    </>,
  },
  {
    id: 'feed-architecture', title: 'FeedShop · 배포와 서비스 확인', section: '프로젝트 1 · FeedShop',
    body: <><Proof src={feedShopProject.architectureImage!} caption="FeedShop 전체 시스템 구조 · 기존 프로젝트 설계 자료" height={325} workLegend /><Grid><Block title="배포 후 상태 확인">Docker 이미지 → GCR → Cloud Run 배포<br /><strong>Actuator 헬스체크</strong>로 서비스 상태 확인</Block><Block title="검증·배포 자동화">GitHub Actions로 테스트·JaCoCo·SonarCloud 분석·배포 연결<br />반복 실행을 자동화하고 변경마다 같은 품질 기준 확인</Block></Grid><PageBottom><Note label="확인한 결과">기존 CI 기록에서 테스트 <strong className="metric-accent">1,351건 · 실패 0건</strong> 확인</Note></PageBottom></>,
  },
  {
    id: 'query-decision', title: '조회 구조를 먼저 개선하고 캐시 적용', section: 'FeedShop', caseId: 'feed-query', stage: '문제 · 원인과 대안 비교',
    body: <><Block title="문제와 원인">연관 데이터를 반복 조회하고 메모리에서 필터링해,<br />목록 요청 한 번에 <strong className="metric-accent">DB 조회 42회</strong> 발생</Block><Grid><div><Proof src="before-scouter-sql42.png" caption="Scouter XLog · 반복 DB 조회 확인" height={230} /></div><div><Table columns={['검토한 방식', '장점과 남는 부담']} rows={[
      ['캐시만 적용', '반복 요청은 빨라지지만 캐시가 없으면 N+1 조회가 유지됨'],
      ['조회 구조만 개선', '조회 횟수는 줄지만 반복 요청마다 DB에 접근'],
      ['조회 개선 + Redis', '두 비용을 함께 줄임 · 캐시 유효기간·삭제 관리 필요'],
    ]} /></div></Grid><PageBottom><Note label="선택 이유"><p>캐시가 없는 요청도 빨라야 했습니다. QueryDSL로 반복 조회를 먼저 줄였습니다.</p><p>여러 Cloud Run 인스턴스가 Redis의 같은 결과를 재사용하도록 구성했습니다.</p></Note><Source href={performanceWiki}>쿼리 원인과 대안 비교 기록</Source></PageBottom></>,
  },
  {
    id: 'query-implementation', title: '쿼리 42회 → 2회, 캐시 적중 시 DB 조회 0회', section: 'FeedShop', caseId: 'feed-query', stage: '단계별 구현',
    body: <><Grid><div><Block title="1단계 · 조회 구조 개선">leftJoin·fetchJoin으로 연관 데이터를 함께 조회하고, countDistinct로 집계 쿼리 분리</Block><Proof src="phase1-scouter-sql2.png" caption="조회 구조 개선 후 · DB 조회 2회" height={155} /><p className="step-result">요청당 DB 조회 <strong>42회 → 2회</strong></p></div><div><Block title="2단계 · Redis 캐시 적용">@Cacheable로 결과를 재사용하고, TTL·@CacheEvict로 유효기간과 변경 시 삭제 관리</Block><Proof src="phase2a-scouter-cache-hit2.png" caption="Redis 캐시 적중 요청 · DB 조회 0회" height={155} /><p className="step-result">요청당 DB 조회 <strong>2회 → 캐시 적중 시 0회</strong></p></div></Grid><PageBottom><Note label="측정 기준">DB 조회 횟수는 Scouter의 요청별 기록으로 확인했습니다. <strong>0회는 캐시 적중 요청</strong> 기준입니다.</Note><Source href={performanceWiki}>구현 코드와 캐시 관리 방식</Source></PageBottom></>,
  },
  {
    id: 'query-validation', title: '쿼리 개선과 캐시 효과를 단계별로 확인', section: 'FeedShop', caseId: 'feed-query', stage: '검증 · 측정 근거',
    body: <><p>조회 구조 개선과 Redis 적용 전후를 동시 1,000명 조건에서 비교했습니다.</p><div className="query-measurement"><Table columns={['확인 지표', '개선 전', '조회 구조 개선', 'Redis 추가']} rows={[
      ['평균 응답시간 · 동시 1,000명', '6,818ms', '4,191ms', '638ms'],
      ['요청당 DB 조회', '42회', '2회', '캐시 적중 시 0회'],
    ]} /><p className="measurement-explanation">응답시간은 부하 테스트 평균, DB 조회 수는 Scouter 요청별 기록이며 0회는 캐시 적중 기준입니다.</p></div><Grid><Proof src="before-ngrinder-v1000.png" caption="개선 전 · 평균 6,818ms / TPS 138.7" height={185} /><Proof src="phase2a-ngrinder-v1000.png" caption="개선 후 · 평균 638ms / TPS 438.3" height={185} /></Grid><PageBottom><Note label="측정 조건">동시 1,000명 · MacBook Air M2 / 24GB · 로컬 부하 테스트<br />Java 17 · Spring Boot 3.3.12 · MySQL 8.2 · Redis 7.4 · nGrinder 3.5.9 · Scouter 2.21.3</Note><div className="rac-meta"><Source href={asset('phase1-ngrinder-v1000.png')}>조회 구조 개선 단계 원본 · 4,191ms</Source><Source href={performanceWiki}>보조 측정 · 동시 100명 645ms → 209ms / TPS 154.6 → 470.1</Source></div></PageBottom></>,
  },
  {
    id: 'query-result', title: '이벤트 탐색의 대기 시간을 줄이고, 반복 조회 부담을 낮춤', section: 'FeedShop', caseId: 'feed-query', stage: '개선 효과',
    body: <><div className="rac-metric"><div><span>동시 사용자 1,000명 · 평균 응답시간</span><strong>6.82초 → 0.64초</strong></div><div><span>평균 응답시간 단축</span><strong>약 91%</strong></div></div><Grid><Block title="사용자 탐색 · 목록 대기 시간 개선">이벤트 목록 응답을 기다리는 시간을 줄여, 로딩 지연으로 탐색이 끊기는 문제를 개선했습니다.</Block><Block title="조회 처리 · 반복 DB 접근 감소">요청당 DB 조회를 42회에서 2회로 줄이고, 캐시 적중 요청은 DB 조회 없이 처리했습니다.</Block></Grid><Note label="개선 목적">이벤트 탐색을 원활하게 하고, 응답 지연으로 인한 사용자 이탈 위험을 줄이기 위한 개선입니다.</Note><PageBottom><p className="rac-meta">앞 페이지의 로컬 부하 테스트에서 확인한 결과입니다. 실제 사용자 이탈률의 변화는 측정하지 않았습니다.</p><Source href={performanceWiki}>성능 개선 과정과 상세 검증 기록</Source></PageBottom></>,
  },
  {
    id: 'vote-decision', title: '동시 투표의 중복 저장과 카운터 잠금 경합을 함께 해결', section: 'FeedShop', caseId: 'feed-vote', stage: '문제 · 대안 비교',
    body: <>
      <div className="decision-context">
        <Note label="문제"><p>같은 사용자의 동시 요청이 중복 검사를 함께 통과해 중복 저장될 수 있었습니다.</p><p>투표 수를 DB에서 갱신할 때는 잠금 경합이 발생했습니다.</p></Note>
        <Note label="선택 기준"><p>DB 유니크 제약으로 중복 저장을 막고, 중복 예외는 저장 트랜잭션 밖에서 처리했습니다.</p><p>카운터는 Redis에서 갱신하도록 분리했습니다.</p></Note>
      </div>
      <Table columns={['검토한 방식', '얻는 점', '남는 문제·부담']} rows={[
        ['코드 중복 검사', '구현이 단순함', '동시 요청이 검사를 함께 통과'],
        ['DB 내 저장·카운터 갱신', '하나의 트랜잭션으로 처리', '카운터 잠금 경합·예외 전파'],
        ['DB 유니크 제약', 'DB에서 중복 저장 차단', '제약 위반 후 예외 처리와 카운터 경합은 별도 해결'],
        ['DB 제약 + 예외 분리 + Redis', '중복 차단과 집계 갱신 책임 분리', 'DB·Redis 사이 불일치 관리 필요'],
      ]} />
      <PageBottom><Source href={voteWiki}>투표 문제와 대안 비교 근거</Source></PageBottom>
    </>,
  },
  {
    id: 'vote-implementation', title: '정상 저장과 중복 요청의 처리 경로를 분리', section: 'FeedShop', caseId: 'feed-vote', stage: '구현',
    body: <>
      <p>DB에서 중복 여부를 확정하고, 정상 저장한 투표만 카운터에 반영합니다.</p>
      <div className="vote-branch-flow">
        <div className="vote-save"><strong>투표 저장·flush · REQUIRED</strong><p>(event_id, voter_id) 유니크 제약으로 중복 저장 차단</p></div>
        <div className="vote-branches">
          <div><span className="vote-path">정상 저장 ↓</span><Block title="Redis INCR로 카운터 증가">저장한 투표를 집계에 반영하고<br />정상 응답을 반환합니다.</Block></div>
          <div><span className="vote-path">중복 제약 위반 ↓</span><Block title="저장 트랜잭션 밖에서 예외 처리">NOT_SUPPORTED 흐름에서 중복 예외를 처리하고,<br />카운터는 증가시키지 않습니다.</Block></div>
        </div>
      </div>
      <PageBottom><Note label="집계 복구와 보정"><p>Redis 키 유실 시 DB 투표 이력으로 카운터를 복구하고, Redis 조회 장애 시 DB 집계값으로 응답합니다.</p><p>매일 새벽 DB 투표 이력을 기준으로 카운터를 보정합니다.</p></Note><div className="source-row"><Source href={voteWiki}>예외 처리·트랜잭션 구현 근거</Source><Source href={`${voteWiki}#7-운영-고려사항과-복구-전략`}>복구·보정 상세 기록</Source></div></PageBottom>
    </>,
  },
  {
    id: 'vote-validation', title: '투표 요청 처리와 중복·집계 정확성을 각각 검증', section: 'FeedShop', caseId: 'feed-vote', stage: '검증 · 측정 근거',
    body: <>
      <p>개선 후 부하별 응답·오류를 측정하고, 저장 기록과 카운터를 별도로 대조했습니다.</p>
      <Table columns={['동시 사용자', '실행 시간', '평균 응답시간', 'HTTP 오류']} rows={[
        ['500명', '2분 1초', '0.83초', '0건'],
        ['1,000명', '2분', '2.19초', '0건'],
        ['3,000명', '2분 1초', '5.00초', '0건'],
      ]} />
      <Grid><Proof src="vuser3000_result.png" caption="요청 처리 · 동시 3,000명 / HTTP 오류 0건" height={175} /><Proof src="phase2b-redis-count-verify.png" caption="집계 확인 화면 · Redis 값 3 / API 응답 3" height={175} /></Grid>
      <PageBottom><Note label="검증 구분"><p>HTTP 오류는 nGrinder로, DB 중복 0건·DB와 Redis 값 일치는 저장 기록과 카운터 대조로 확인했습니다.</p><p>오른쪽 이미지는 Redis와 API 응답 대조입니다. DB 검증 근거와 측정 환경은 상세 기록에 연결합니다.</p></Note><div className="source-row"><Source href={asset('vuser500_result.png')}>500명 원본</Source><Source href={asset('vuser1000_result.png')}>1,000명 원본</Source><Source href={voteWiki}>측정 환경·DB 검증 상세 기록</Source></div></PageBottom>
    </>,
  },
  {
    id: 'vote-result', title: '중복 투표를 막고, 장애 시에도 투표 수를 제공', section: 'FeedShop', caseId: 'feed-vote', stage: '개선 효과',
    body: <>
      <table className="rac-table vote-result-table" aria-label="개선 후 검증 결과"><tbody>
        <tr><th scope="row">투표 요청</th><td>최대 동시 3,000명 · HTTP 오류 <strong className="metric-accent">0건</strong></td></tr>
        <tr><th scope="row">중복·집계</th><td>DB 중복 저장 <strong className="metric-accent">0건</strong> · DB와 Redis 값 <strong className="metric-accent">일치</strong></td></tr>
      </tbody></table>
      <Grid>
        <Block title="투표 참여 · 중복 반영 방지">같은 사용자의 동시 요청이 여러 투표 기록으로 저장되는 문제를 막았습니다.</Block>
        <Block title="투표 수 조회 · 장애 시 응답 유지">Redis 키 유실·조회 장애에도 DB 투표 이력을 기준으로 카운터를 복구하거나 투표 수를 응답하도록 했습니다.</Block>
      </Grid>
      <Note label="집계 복구">매일 새벽 원본 투표 이력으로 카운터를 보정해, 갱신 누락으로 생긴 집계 차이를 복구할 수 있도록 했습니다.</Note>
      <PageBottom><p className="rac-meta">수치는 앞 페이지의 테스트에서 확인한 결과입니다. 정기 보정에는 최대 24시간의 지연이 있습니다.</p><Source href={voteWiki}>투표 검증·복구 조건 상세 기록</Source></PageBottom>
    </>,
  },
  {
    id: 'feed-reflection', title: 'FeedShop 회고 · 경험으로 얻은 판단 기준', section: '프로젝트 1 · 회고',
    body: <>
      <Block title="성능 개선 · 단계를 나누어 효과를 확인"><p>조회 구조 개선과 캐시 적용을 나누어 측정하면서, 각 변경이 응답시간에 미친 효과를 구분할 수 있었습니다.</p><p className="rac-meta">동시 1,000명 · 6.818초 → 4.191초 → 0.638초, 평균 응답시간 약 91% 단축</p></Block>
      <Block title="동시성 처리 · 저장 제약과 예외 처리 경계를 함께 설계"><p>DB 제약으로 중복을 막는 것과 실패한 저장이 후속 처리를 방해하지 않도록 하는 것은 각각 설계하고 검증해야 함을 배웠습니다.</p><p className="rac-meta">최대 동시 3,000명 · HTTP 오류·DB 중복 저장 0건 · DB와 Redis 집계 일치</p></Block>
      <Block title="장애 대응 · 원본 데이터와 복구 경로를 함께 준비"><p>카운터를 분리할 때는 정상 동작뿐 아니라, 장애 시 어떤 데이터를 기준으로 응답하고 집계를 복구할지도 정해야 함을 배웠습니다.</p><p className="rac-meta">Redis 키 유실 시 복구 · 조회 장애 시 DB 집계 응답 · 매일 새벽 카운터 보정</p></Block>
      <PageBottom><p className="reflection-next"><strong>다음 적용 기준</strong>변경 단계별 측정과 함께, 중복 요청·저장 실패·캐시 유실을 검증 항목으로 먼저 정하겠습니다.</p>
      <div className="source-row"><Source href={feedShopProject.projectReflection?.sourceUrl ?? feedWiki}>성능·동시성 개선 기록</Source><Source href={voteRecoveryCommit}>DB 기준 복구 구현과 테스트 코드</Source></div></PageBottom>
    </>,
  },
  {
    id: 'm3-intro', title: '3M · 서비스와 담당', section: '프로젝트 2 · 3M',
    body: <><p className="project-intro">업체의 주문 생성부터 허브 간 이동·배송 담당자 배정까지,<br />역할별 물류 업무를 연결하는 B2B 물류 관리 시스템</p><p className="rac-meta">2025.03–2025.04 · 4명 · 팀장 / 백엔드</p><Flow steps={[
      ['업체', '주문 생성·상품 요청'], ['허브', '지역 거점 간 이동 관리'], ['배송 담당자', '배정된 배송 작업 수행'],
    ]} /><Grid><Block title="직접 담당한 개발"><p>Auth·User·Gateway 설계·구현</p><p>JWT 발급·검증 → 사용자 정보 전달 → AOP 권한 확인</p><p>Docker Compose 통합 실행 환경 구성</p></Block><Block title="주요 개선과 효과"><p>Auth·User 직접 모듈 의존 제거<br />→ 내부 구현 변경의 영향 범위 축소</p><p>검증된 사용자 정보 전달·권한 처리 연결<br />→ 일반 권한 확인의 추가 조회 분리·역할별 접근 제어</p></Block></Grid><PageBottom><p className="rac-meta">Spring Boot · Spring Cloud Gateway · JWT · PostgreSQL · Redis · Docker</p></PageBottom></>,
  },
  {
    id: 'm3-screens', title: '3M · 물류 서비스 흐름', section: '프로젝트 2 · 3M',
    body: <>
      <p className="project-intro">공급 업체의 입고 → 허브 간 운송 → 수령 업체 배송</p>
      <dl className="m3-delivery-roles">
        <div><dt>허브 배송 담당자</dt><dd>허브 간 운송</dd></div>
        <div><dt>업체 배송 담당자</dt><dd>수령 업체까지 배송</dd></div>
      </dl>
      <div className="m3-service-images">{THREE_M_SCREENS.map((screen, index) => <Proof key={screen.src} src={screen.src} caption={index === 0 ? '서비스 전체 개요' : '파란 화살표: 공급 업체에서 수령 업체까지의 배송 경로'} height={index === 0 ? 200 : 430} />)}</div>
    </>,
  },
  {
    id: 'm3-architecture', title: '3M · 통합 실행과 인증 구조', section: '프로젝트 2 · 3M',
    body: <><Proof src={threeMProject.architectureImage!} caption="3M 전체 시스템 구조 · 기존 프로젝트 설계 자료" height={325} workLegend /><Grid><Block title="통합 실행과 상태 확인"><p>Docker Compose · 서비스·DB·Redis·Zipkin 통합 실행</p><p>Actuator · 서비스 기동 상태 점검</p><p>Eureka · 서비스 이름 기반 연결</p></Block><Block title="인증 처리 역할"><p>Auth · 로그인·JWT 발급</p><p>Gateway · JWT 검증·사용자 정보 전달</p><p>각 서비스 · 전달받은 정보로 권한 확인</p></Block></Grid><PageBottom><Note label="직접 담당">Auth·User·Gateway 설계·구현 · Docker Compose 통합 환경 구성</Note></PageBottom></>,
  },
  {
    id: 'boundary-decision', title: '서비스 간 결합을 줄이기 위한 두 가지 선택', section: '3M', caseId: 'm3-boundary', stage: '문제 · 대안과 선택',
    body: <>
      <div className="m3-decision-list">
        <section className="m3-decision-row">
          <h3><span>01</span> Auth의 User 모듈 직접 의존을 어떻게 없앨까?</h3>
          <div className="m3-decision-pair">
            <div><span className="m3-decision-label">문제</span><p>Auth가 UserRole·권한 어노테이션·DTO를<br />User 모듈에서 직접 참조</p></div>
            <span className="m3-decision-arrow" aria-hidden="true">→</span>
            <div><span className="m3-decision-label">선택</span><h4>공통 계약 + Feign 호출</h4><p>공통 타입을 common으로 옮기고 Feign으로 호출</p></div>
          </div>
          <div className="m3-alternatives"><span>검토한 대안</span><p>직접 참조 — 구현은 간단하지만 빌드가 묶임<br />DTO 복제 — 모듈은 분리되지만 계약을 중복 관리</p></div>
        </section>
        <section className="m3-decision-row">
          <h3><span>02</span> 권한 정보는 어디서 확인할까?</h3>
          <div className="m3-decision-pair">
            <div><span className="m3-decision-label">고려한 비용</span><p>매 요청마다 User에서 역할을 조회하면<br />호출 비용과 User 장애의 영향이 커짐</p></div>
            <span className="m3-decision-arrow" aria-hidden="true">→</span>
            <div><span className="m3-decision-label">선택</span><h4>JWT의 userId·role 활용</h4><p>일반 권한 확인을 위한 추가 조회 생략</p></div>
          </div>
          <div className="m3-alternatives"><span>검토한 대안</span><p>요청마다 User 조회 — 최신 역할 확인 / 호출·장애 영향<br />Gateway 캐시 — 호출 감소 / 값 동기화·삭제 관리</p></div>
        </section>
      </div>
      <PageBottom><p className="m3-decision-condition">선택 후 관리할 조건 · 공통 계약 버전 · JWT 역할 갱신 · 전달 헤더의 신뢰 경계</p><Source href={m3BoundaryWiki}>문제 원인과 대안 비교 기록</Source></PageBottom>
    </>,
  },
  {
    id: 'auth-decision', title: '책임을 나눈 뒤, 코드의 직접 의존까지 제거', section: '3M', caseId: 'm3-boundary', stage: '구현 · 책임과 코드 경계',
    body: <>
      <div className="m3-before-after">
        <section><h3>① 이전 · 책임이 섞인 초기 검토안</h3><Proof src="3m-auth-user-before-class-diagram.png" caption="인증 처리와 사용자 정보·권한 참조가 혼재" height={240} /></section>
        <section><h3>② 이후 · Auth·User 책임 분리 설계</h3><Proof src="3m-auth-user-after-class-diagram-final.png" caption="Auth는 인증, User는 사용자 관리 · Feign으로 연결" height={240} /></section>
      </div>
      <section className="m3-code-boundary"><h3>③ 분리된 코드에 남은 Auth → User 직접 의존 제거</h3>
        <div><p>UserRole·권한 어노테이션·Feign DTO를<br /><strong>common으로 이동</strong></p><div className="m3-gradle-evidence"><span>auth/build.gradle에서 삭제</span><code>− implementation project(':user')</code></div></div>
        <p className="m3-import-note"><strong>별도 확인</strong> User → Auth 패키지 import 0건 · User 소스 정적 분석<br />위 Gradle 의존 제거와는 반대 방향을 확인한 기록입니다.</p>
      </section>
      <PageBottom><p className="m3-request-note">Auth가 User 내부 타입을 직접 참조하는 범위를 줄였습니다. 서비스 간 Feign HTTP 호출은 유지됩니다.</p><div className="source-row m3-evidence-links"><Source href={m3BoundaryWiki}>설계·코드 변경과 정적 분석 근거</Source><button type="button" className="rac-source" data-proof-src={asset('3m-auth-user-class-diagram.png')} data-proof-caption="Auth·User 책임과 Feign 호출 · 간략 클래스 구조">간략 클래스 그림 보기</button></div></PageBottom>
    </>,
  },
  {
    id: 'auth-flow', title: '통합 과정에서 인증·권한 검사 누락을 보완', section: '3M', caseId: 'm3-boundary', stage: '통합 · 발견한 문제와 수정',
    body: <>
      <p className="m3-integration-lead">JWT 정보를 전달하는 설계를 적용하며, 실제 요청의 검사 경로를 점검했습니다.</p>
      <ol className="m3-live-flow" aria-label="수정한 요청 처리 경로">
        <li><span>01</span><h3>Gateway</h3><p>JWT 검증<br />사용자 ID·role 전달</p></li>
        <li><span>02</span><h3>User</h3><p>전달받은 role로<br />AOP 권한 검사</p></li>
        <li><span>03</span><h3>HTTP 응답</h3><p>인증·권한 결과에 맞는<br />상태 코드 반환</p></li>
      </ol>
      <div className="m3-fix-table"><Table columns={['단계', '발견한 문제', '수정한 내용']} rows={[
        ['Gateway', 'User API 전체가 인증 제외 경로에 포함', '전체 제외 해제 · 로그인/가입만 제외'],
        ['User', '권한 어노테이션에 대응하는 AOP 누락', 'MasterRoleAspect와 AOP 의존성 추가'],
        ['예외 처리', '권한 예외를 HTTP 응답으로 처리할 규칙 누락', 'GlobalExceptionHandler 추가 · 권한 부족은 403'],
      ]} /></div>
      <PageBottom><p className="m3-request-note">X-User-Id·X-User-Role을 전달하고, 상세 사용자 정보가 필요한 요청만 User를 조회합니다.</p><Source href={m3BoundaryWiki}>인증 제외·권한 AOP·예외 처리 수정 기록</Source></PageBottom>
    </>,
  },
  {
    id: 'm3-result', title: '역할별 요청으로 허용과 차단을 확인', section: '3M', caseId: 'm3-boundary', stage: '검증 · 결과와 적용 범위',
    body: <>
      <p className="m3-test-context"><strong>검증 대상</strong> 역할 변경 API · Gateway·Auth·User를 연결한 로컬 환경</p>
      <div className="m3-test-results">
        <section><h3>MASTER</h3><p>관리자 요청</p><strong>200</strong><span>역할 변경 허용</span></section>
        <section><h3>HUB_MANAGER</h3><p>권한이 부족한 요청</p><strong>403</strong><span>권한 부족 차단</span></section>
        <section><h3>토큰 없음</h3><p>인증되지 않은 요청</p><strong>401</strong><span>미인증 요청 차단</span></section>
      </div>
      <p className="m3-tested-effect">관리자만 역할을 변경하고,<br />권한이 부족하거나 인증되지 않은 요청은 차단했습니다.</p>
      <div className="m3-operating-conditions"><h3>적용 후에도 관리할 조건</h3><div><p><strong>서비스 계약</strong>공통 DTO·어노테이션의 버전 관리<br />Feign 호출의 지연·실패 처리</p><p><strong>인증 정보</strong>역할 변경 반영을 위한 JWT 유효기간<br />외부에서 전달 헤더를 위조하지 못하는 신뢰 경계</p></div></div>
      <PageBottom><p className="m3-request-note">검증 환경 · 로컬 H2 기반 통합 테스트 기록</p><div className="source-row"><Source href={threeMProject.projectReflection?.sourceUrl ?? m3Wiki}>역할별 응답 통합 테스트 보고서</Source><Source href={m3BoundaryWiki}>설계 선택과 남은 조건</Source></div></PageBottom>
    </>,
  },
  {
    id: 'm3-reflection', title: '3M 회고 · 경험으로 얻은 판단 기준', section: '프로젝트 2 · 회고',
    body: <>
      <Block title="서비스 경계 · 모듈을 나눈 뒤 참조 관계까지 확인"><p>서비스를 나누는 것만으로 직접 참조가 사라지지는 않았습니다. 코드의 의존 관계까지 확인해야 함을 배웠습니다.</p><p className="rac-meta">Auth → User 직접 모듈 의존 제거 · common 계약·Feign 연결 · User → Auth 패키지 import 0건</p></Block>
      <Block title="권한 처리 · 설정부터 예외 응답까지 연결"><p>권한 어노테이션이 있어도 인증 제외 설정이나 AOP가 빠지면 검사가 동작하지 않았습니다. 요청이 통과하는 경로 전체를 확인해야 함을 배웠습니다.</p><p className="rac-meta">User API 전체 인증 제외 해제 · 권한 AOP·예외 처리 추가</p></Block>
      <Block title="통합 검증 · 허용과 차단을 함께 확인"><p>정상 요청의 성공만으로 접근 제어를 확인할 수는 없었습니다. 역할과 토큰 유무를 나누어, 차단해야 할 요청도 검증 기준에 포함하게 됐습니다.</p><p className="rac-meta">로컬 H2 통합 테스트 · MASTER 200 · HUB_MANAGER 403 · 미인증 401</p></Block>
      <PageBottom><p className="reflection-next"><strong>다음 적용 기준</strong>서비스를 분리할 때 참조 방향과 호출 계약을 먼저 정하고, 역할·토큰 유무별 허용·차단을 통합 검증 항목으로 두겠습니다.</p>
      <div className="source-row"><Source href={m3BoundaryWiki}>실제 발견한 문제와 수정 기록</Source><Source href={threeMProject.projectReflection?.sourceUrl ?? m3Wiki}>권한 통합 테스트 결과</Source></div></PageBottom>
    </>,
  },
  {
    id: 'collaboration-system', title: '업무 기준을 정리하고, 진행 상황과 변경 사항을 함께 확인', section: '협업 방식',
    body: <>
      <p>팀이 같은 기준으로 업무를 확인하도록, 진행 관리·자료 정리·변경 알림을 연결했습니다.</p>
      <div className="collaboration-evidence">
        {[
          { evidence: COLLABORATION_SECTION.evidence[0], caption: 'JIRA 백로그', description: '백로그를 주간 단위로 나누고 담당·상태·완료 범위를 확인하는 기준을 정리했습니다.' },
          { evidence: COLLABORATION_SECTION.evidence[2], caption: 'Confluence 자료 목록', description: '스프린트 일정과 기술·테스트 자료를 Confluence에 모아 자료 위치를 정리했습니다.' },
          { evidence: COLLABORATION_SECTION.evidence[1], caption: 'Slack 자동 알림', description: '이슈 생성과 연결된 커밋 변경이 팀 채널에 자동 공유되도록 설정했습니다.' },
        ].map(({ evidence, caption, description }) => <div key={evidence.image}>
          <Proof src={evidence.image} caption={caption} height={220} />
          <h3>{evidence.title}</h3>
          <p>{description}</p>
        </div>)}
      </div>
      <PageBottom><Note label="개선 효과">업무 진행과 변경 이력을 팀이 같은 기준으로 확인하도록 했습니다.</Note><Source href={COLLABORATION_SECTION.guideUrl}>직접 작성한 JIRA 가이드라인</Source></PageBottom>
    </>,
  },
  {
    id: 'ai-current', title: 'AI를 생산성 도구로 활용하고, 결과는 직접 검증·판단', section: 'AI 활용 · 제작과 검증',
    body: <>
      <p className="project-intro"><strong className="metric-accent">AI 원티드 챌린지 대회 참여 중 · 1,390팀 중 70위</strong></p>
      <div className="planner-overview">
        <Proof src={plannerScreen} resolved caption="직접 제작해 사용 중인 개인 플래너 · 실제 화면" height={320} />
        <div className="planner-stages">
          <Block title="만든 이유">흩어진 일상 기록을 한곳에서 관리하고, 기록·정리의 생산성을 높이기 위해 시작했습니다.</Block>
          <Block title="현재 제작·활용">Codex로 개인 플래너를 제작해 일정 관리와 기록·정리에 사용하고 있습니다.</Block>
          <Block title="현재 · 직접 검증하고 판단">AI 코드의 변경 영향을 검토하고 빌드·테스트·실제 동작을 검증하며, 반영 여부를 직접 판단하고 있습니다.</Block>
          <Source href="https://www.linkedin.com/feed/update/urn:li:activity:7510919407477547008/">개인 플래너 제작 과정</Source>
        </div>
      </div>
      <PageBottom><div className="planner-workflow">
        <div><h3>근거 수집</h3><strong>NotebookLM</strong><p>공식 자료 기반 조사와 근거 정리</p></div>
        <div><h3>사고·문서 구조화</h3><strong>Claude · Gemini</strong><p>생각과 문서 구조화, 대안 탐색</p></div>
        <div><h3>구현·자동화</h3><strong>Codex</strong><p>플래너 제작·자동화·코드 점검</p></div>
      </div><p className="planner-next"><strong>다음 활용 계획</strong> 기술 문제의 원인 분석과 해결책 설계·검증으로 AI 활용 범위를 넓히겠습니다.</p></PageBottom>
    </>,
  },
  {
    id: 'experience', title: '개발·교육·발표로 쌓은 경험', section: '관련 경험',
    body: <div className="experience-list">{EXPERIENCE_ITEMS.map(item => <div key={item.title}><span>{item.period}<small>{item.category}</small></span><div><h3>{item.title}</h3><p>{item.detail}</p></div></div>)}</div>,
  },
  {
    id: 'closing', title: '근거를 확인하고, 팀이 이해할 수 있게 설명합니다.', section: '마무리 · 앞으로의 방향',
    body: <><Block title="제가 쌓아온 기준">FeedShop에서는 속도와 데이터 정확성을 수치로 확인했고, 3M에서는 책임 경계와 전체 인증 흐름을 나누어 검증했습니다.</Block><Block title="함께 일하는 방식">작업 과정과 판단 근거를 팀에 공유하고, 다음 사람이 이해하고 이어갈 수 있도록 코드와 문서를 정리합니다.</Block><Block title="앞으로의 방향">기능 구현 이후의 장애 조건과 복구 과정까지 확인하고, 도구를 활용하더라도 설계·기술 선택·결과 검증의 책임을 직접 지는 개발자로 성장하겠습니다.</Block><PageBottom><div className="closing-bottom"><nav className="closing-links" aria-label="프로젝트·활동 자료 링크">{RESOURCE_LINKS.filter(r => !r.projectId).map(r => <Source key={r.url} href={r.url === 'https://app.notion.com/p/16-I-4-U-1f0eeaa2f0af80bd9f00d0a062903703' ? 'https://slime-face-7c4.notion.site/16-I-4-U-1f0eeaa2f0af80bd9f00d0a062903703' : r.url}>{r.label}</Source>)}</nav><div className="closing-contact"><strong>정민수 · 백엔드 개발자</strong><a href="mailto:dbp100402@gmail.com">dbp100402@gmail.com</a><a href="tel:+821030841488">010-3084-1488</a><a href="https://github.com/dbp-jack" target="_blank" rel="noreferrer">Github</a><a href="https://linkedin.com/in/minsoo-jeong-31861b401" target="_blank" rel="noreferrer">LinkedIn</a></div></div></PageBottom></>,
  },
  {
    id: 'thanks', title: '읽어주셔서 감사합니다.', section: '감사 인사', layout: 'thanks',
    body: <h2>읽어주셔서 감사합니다.</h2>,
  },
]
