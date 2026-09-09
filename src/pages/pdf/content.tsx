import type { ReactNode } from 'react'
import plannerScreen from './assets/planner-screen.png'
import { Note, PageBottom, Grid, Block, Table, Flow, Proof, Source } from './components'
import { HERO_PERSONAL_INFO, HERO_SKILL_GROUPS, PROJECT_WORKFLOW, COLLABORATION_SECTION, RESOURCE_LINKS, EXPERIENCE_ITEMS } from '@/content/portfolio'
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
  { name: 'FeedShop', start: 4, end: 14, detail: '조회 성능 · 투표 동시성 · 회고' },
  { name: '3M', start: 15, end: 21, detail: '책임 분리 · 인증 흐름 · 회고' },
  { name: '협업 방식', start: 22, end: 22, detail: 'JIRA · Confluence · Slack 증거' },
  { name: 'AI 활용', start: 23, end: 23, detail: '현재 제작 경험 · 활용 흐름 · 다음 단계' },
  { name: '관련 경험', start: 24, end: 24, detail: '개발 · 교육 · 발표 기록' },
  { name: '마무리와 자료', start: 25, end: 26, detail: '성장 방향 · 자료 링크 · 연락처 · 감사 인사' },
] as const

export const caseLabels = {
  'feed-query': { project: 'FeedShop', number: 1, name: '이벤트 목록 조회 성능 개선' },
  'feed-vote': { project: 'FeedShop', number: 2, name: '투표 동시성과 정합성 확보' },
  'm3-boundary': { project: '3M', number: 1, name: 'Auth·User 책임 분리' },
  'm3-auth': { project: '3M', number: 2, name: '인증 정보 전달 흐름 단순화' },
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
    body: <><a className="cover-web-link" href="https://dbp-jack.github.io/Profile/" target="_blank" rel="noopener noreferrer">포트폴리오 웹사이트 <span aria-hidden="true">↗</span></a><div className="rac-cover"><img className="rac-photo" src={asset('profile-photo.png')} alt="정민수 증명사진" /><div><p className="cover-role">백엔드 개발자</p><h2>정민수</h2><p className="cover-intro">수치로 검증하고, 팀 흐름을 움직이는 백엔드 개발자</p><dl className="rac-contact">{HERO_PERSONAL_INFO.map((row, i) => <div key={row.text}><dt>{['주소', '전화번호', 'Github', 'LinkedIn'][i]}</dt><dd>{row.href ? <a href={row.href} target="_blank" rel="noreferrer">{row.text}</a> : row.text}</dd></div>)}</dl><div className="rac-skills">{HERO_SKILL_GROUPS.map(group => <div key={group.label}><strong>{group.label}</strong><span>{group.tags.join(' · ')}</span></div>)}<div><strong>AI</strong><span>Local Agent · Ollama · ChromaDB · Codex</span></div></div></div></div></>,
  },
  {
    id: 'strengths', title: '핵심 경험', section: '소개',
    body: <div className="rac-experiences">
      <div className="rac-experience"><span>01</span><div><h3>성능과 데이터 정확성 개선</h3><p>사용자 이탈 방지를 위해 이벤트 목록의 로딩 지연을 줄여<br />평균 응답시간 <strong className="metric-accent">91% 단축</strong>, 동시 투표 테스트에서 오류·중복 <strong className="metric-accent">0건</strong> 확인</p></div></div>
      <div className="rac-experience"><span>02</span><div><h3>작업 과정이 투명하게 공유되는 협업 환경 구축</h3><p>JIRA 운영 기준과 Confluence 문서 체계를 정리하고,<br />Slack 알림으로 작업 상태·커밋 변경을 <strong className="metric-accent">자동 공유</strong>해<br />팀이 작업 흐름을 <strong className="metric-accent">투명하게</strong> 확인하고 추적할 수 있는 환경 구축</p></div></div>
      <div className="rac-experience"><span>03</span><div><h3>AI를 활용한 제작 경험</h3><p>일상을 관리하고 기록·정리하는 개인 플래너를 제작<br /><strong className="metric-accent">AI 원티드 챌린지 대회 참여 중</strong></p></div></div>
    </div>,
  },
  {
    id: 'contents', title: '목차', section: '전체 구성', layout: 'toc',
    body: <><p>프로젝트의 문제와 배경을 이해한 뒤, 대안 비교·구현 → 검증 → 최종 결과 순서로 읽을 수 있습니다.</p><div className="document-toc">{chapters.filter(c => c.start > 3).map(c => <button key={c.name} data-jump-page={c.start}><span><strong>{c.name}</strong><small>{c.detail}</small></span><b>{c.start === c.end ? c.start : `${c.start}–${c.end}`}쪽 →</b></button>)}</div><PageBottom><Note label="문제 해결 사례">FeedShop ① 조회 성능 ② 투표 동시성<br />3M ① Auth·User 책임 분리 ② 인증 정보 전달</Note></PageBottom></>,
  },
  {
    id: 'feed-intro', title: 'FeedShop · 서비스와 담당', section: '프로젝트 1 · FeedShop',
    body: <><p className="project-intro">도·소매업 소상공인의 <strong className="metric-accent">46.9%</strong>가 경쟁 심화를 경영 애로로 꼽은 조사에 주목해,<br />투표 이벤트와 참여 보상으로 구매 후 재방문을 유도하는 패션 커뮤니티 플랫폼</p><Source href={survey}>2022년 소상공인실태조사 결과(잠정) · 본문 11쪽, 복수응답</Source><p className="rac-meta">2025.05–2025.09 · 4명 · 부팀장 / 백엔드</p><Flow steps={[
      ['구매', '상품 탐색·구매'], ['참여', '피드 공유·이벤트 투표'], ['보상·재방문', '참여 보상으로 다음 방문 유도'],
    ]} /><Grid><Block title="직접 담당한 개발">이벤트·투표 API, 피드·댓글·좋아요·검색<br />Docker·Cloud Run 배포, CI/CD 구성</Block><Block title="주요 개선과 효과"><p>목록 로딩 지연 개선 → 이탈 방지를 위한 탐색 속도 개선</p><p>동시 투표의 중복 저장 차단 → 투표 수 정합성 확보</p></Block></Grid><PageBottom><p className="rac-meta">Spring Boot · QueryDSL · MySQL · Redis · GCP · Docker</p></PageBottom></>,
  },
  {
    id: 'feed-architecture', title: 'FeedShop · 배포와 서비스 확인', section: '프로젝트 1 · FeedShop',
    body: <><Proof src={feedShopProject.architectureImage!} caption="FeedShop 전체 시스템 구조 · 기존 프로젝트 설계 자료" height={325} workLegend /><Grid><Block title="배포 후 상태 확인">Docker 이미지 → GCR → Cloud Run 배포<br /><strong>Actuator 헬스체크</strong>로 서비스 상태 확인</Block><Block title="검증·배포 자동화">GitHub Actions로 테스트·JaCoCo·SonarCloud 분석·배포 연결<br />반복 실행을 자동화하고 변경마다 같은 품질 기준 확인</Block></Grid><PageBottom><Note label="확인한 결과">기존 CI 기록에서 테스트 <strong className="metric-accent">1,351건 · 실패 0건</strong> 확인</Note></PageBottom></>,
  },
  {
    id: 'query-decision', title: '조회 구조를 먼저 개선하고 캐시 적용', section: 'FeedShop', caseId: 'feed-query', stage: '문제 · 원인과 대안 비교',
    body: <><Grid><div><Block title="문제와 원인">연관 데이터를 반복 조회하고 메모리에서 필터링해,<br />목록 요청 한 번에 <strong className="metric-accent">DB 조회 42회</strong> 발생</Block><Proof src="before-scouter-sql42.png" caption="Scouter XLog · 반복 DB 조회 확인" height={230} /></div><div><Table columns={['검토한 방식', '장점과 남는 부담']} rows={[
      ['캐시만 적용', '반복 요청은 빨라지지만 캐시가 없으면 N+1 조회가 유지됨'],
      ['조회 구조만 개선', '조회 횟수는 줄지만 반복 요청마다 DB에 접근'],
      ['조회 개선 + Redis', '두 비용을 함께 줄임 · 캐시 유효기간·삭제 관리 필요'],
    ]} /></div></Grid><PageBottom><Note label="선택 이유"><p>캐시가 없는 요청도 빨라야 했습니다. QueryDSL로 반복 조회를 먼저 줄였습니다.</p><p>여러 Cloud Run 인스턴스가 Redis의 같은 결과를 재사용하도록 구성했습니다.</p></Note><Source href={performanceWiki}>쿼리 원인과 대안 비교 기록</Source></PageBottom></>,
  },
  {
    id: 'query-implementation', title: '쿼리 42회 → 2회, 캐시 적중 시 DB 조회 0회', section: 'FeedShop', caseId: 'feed-query', stage: '단계별 구현',
    body: <><Grid><div><Block title="1단계 · 조회 구조 개선">leftJoin·fetchJoin으로 연관 데이터를 함께 조회하고, countDistinct로 집계 쿼리 분리</Block><Proof src="phase1-scouter-sql2.png" caption="조회 구조 개선 후 · DB 조회 2회" height={155} /><p className="step-result">평균 응답시간 <strong>6.818초 → 4.191초</strong></p></div><div><Block title="2단계 · Redis 캐시 적용">@Cacheable로 결과를 재사용하고, TTL·@CacheEvict로 유효기간과 변경 시 삭제 관리</Block><Proof src="phase2a-scouter-cache-hit2.png" caption="Redis 캐시 적중 요청 · DB 조회 0회" height={155} /><p className="step-result">평균 응답시간 <strong>4.191초 → 0.638초</strong></p></div></Grid><PageBottom><Note label="측정 구분">응답시간은 동시 1,000명 부하 테스트의 단계별 평균입니다. DB 조회 0회는 Scouter에서 확인한 <strong>캐시 적중 요청</strong> 기준입니다.</Note><Source href={performanceWiki}>구현 코드와 캐시 관리 방식</Source></PageBottom></>,
  },
  {
    id: 'query-validation', title: '쿼리 개선과 캐시 효과를 단계별로 확인', section: 'FeedShop', caseId: 'feed-query', stage: '검증 · 측정 근거',
    body: <><p>조회 구조를 먼저 바꾸고 Redis를 추가하며, 각 단계의 응답시간과 DB 조회 수를 비교했습니다.</p><Table columns={['확인 지표', '개선 전', '조회 구조 개선', 'Redis 추가']} rows={[
      ['평균 응답시간 · 동시 1,000명', '6,818ms', '4,191ms', '638ms'],
      ['요청당 DB 조회', '42회', '2회', '캐시 적중 시 0회'],
    ]} /><Grid><Proof src="phase1-ngrinder-v1000.png" caption="1단계 검증 · 조회 구조만 개선한 동시 1,000명 테스트" height={248} /><div><Block title="추가 부하 구간 확인">동시 100명: <strong className="metric-accent">645ms → 209ms</strong><br />TPS: <strong className="metric-accent">154.6 → 470.1</strong></Block><Block title="측정 환경">Java 17 · Spring Boot 3.3.12<br />MySQL 8.2 · Redis 7.4<br />Scouter 2.21.3 · nGrinder 3.5.9</Block></div></Grid><PageBottom><Note label="측정 기준">응답시간은 각 부하 테스트의 평균, DB 조회 수는 Scouter 요청별 기록입니다. 캐시 적중 요청의 DB 조회는 0회로 확인했습니다.</Note></PageBottom></>,
  },
  {
    id: 'query-result', title: '이벤트 목록 평균 응답시간 약 91% 단축', section: 'FeedShop', caseId: 'feed-query', stage: '최종 결과',
    body: <><p>조회 구조 개선 → Redis 캐시를 단계별로 적용해 목록의 로딩 지연을 줄였습니다.</p><div className="rac-metric"><div><span>동시 사용자 1,000명 · 평균 응답시간</span><strong>6.82초 → 0.64초</strong></div><div><span>초당 처리량</span><strong>약 216% ↑</strong></div></div><Grid><Proof src="before-ngrinder-v1000.png" caption="개선 전 · 평균 6,818ms / TPS 138.7" height={225} /><Proof src="phase2a-ngrinder-v1000.png" caption="개선 후 · 평균 638ms / TPS 438.3" height={225} /></Grid><PageBottom><Note label="검증 조건">동시 사용자 1,000명 · MacBook Air M2 / 24GB · nGrinder 3.5.9 · 로컬 부하 테스트</Note></PageBottom></>,
  },
  {
    id: 'vote-decision', title: '중복 저장은 DB에서, 카운터 갱신은 Redis에서', section: 'FeedShop', caseId: 'feed-vote', stage: '문제 · 대안 비교',
    body: <>
      <div className="decision-context">
        <Note label="문제">중복 검사와 저장 사이에 두 요청이 함께 통과하는 TOCTOU 구간이 있었습니다. DB 카운터 갱신에서는 잠금 경합도 발생했습니다.</Note>
        <Note label="선택 기준">DB 제약으로 중복 저장을 막고, 저장 예외를 트랜잭션 밖에서 처리했습니다. 카운터 갱신은 Redis로 옮겨 DB 잠금 경합을 분리했습니다.</Note>
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
    id: 'vote-implementation', title: '투표 저장·예외·카운터의 처리 흐름', section: 'FeedShop', caseId: 'feed-vote', stage: '구현',
    body: <><p>저장, 중복 예외, 카운터 갱신을 각자의 처리 경계로 나누었습니다.</p><Flow steps={[
      ['DB 저장', '(event_id, voter_id) 유니크 제약으로 같은 사용자의 중복 투표 저장 차단'],
      ['중복 예외 처리', '저장·flush는 REQUIRED 안에서 끝내고, 중복 예외는 NOT_SUPPORTED 흐름에서 처리'],
      ['카운터 갱신', '정상 저장한 투표 수는 Redis INCR로 갱신'],
    ]} /><PageBottom><Note label="효과">실패한 저장 트랜잭션에 후속 응답 처리가 묶이지 않도록 하고, 투표 수 갱신의 DB 잠금 경합을 분리했습니다.</Note><Note label="복구와 한계">Redis 키 유실 시 DB 투표 수로 복구하고, Redis 조회 장애 시 DB 집계로 응답하도록 구현했습니다. DB 커밋과 Redis 갱신 사이에는 일시적 불일치가 남아 정기 보정이 필요합니다.</Note><Source href={voteWiki}>예외 처리 대안·트랜잭션 테스트·구현 근거</Source></PageBottom></>,
  },
  {
    id: 'vote-validation', title: '동시 3,000명까지 투표 요청의 HTTP 오류 0건 확인', section: 'FeedShop', caseId: 'feed-vote', stage: '검증 · 부하별 응답과 오류',
    body: <>
      <p>개선 후 동시 500·1,000·3,000명 테스트에서 투표 요청의 HTTP 오류 0건을 확인했습니다.</p>
      <Table columns={['동시 사용자', '실행 시간', '평균 응답시간', 'HTTP 오류']} rows={[
        ['500명', '2분 1초', '0.83초', '0건'],
        ['1,000명', '2분', '2.19초', '0건'],
        ['3,000명', '2분 1초', '5.00초', '0건'],
      ]} />
      <Grid><Proof src="vuser500_result.png" caption="500명 · 실행한 요청의 HTTP 오류 0건" height={150} /><Proof src="vuser1000_result.png" caption="1,000명 · 실행한 요청의 HTTP 오류 0건" height={150} /></Grid>
      <PageBottom><Note label="개선 결과">저장 트랜잭션 밖에서 중복 예외를 처리하고 카운터 갱신을 Redis로 분리한 뒤, 세 부하 구간 모두 투표 요청을 HTTP 오류 없이 처리했습니다. <a href={voteWiki} target="_blank" rel="noreferrer">상세 측정 기록 ↗</a></Note></PageBottom>
    </>,
  },
  {
    id: 'vote-result', title: '동시 투표에서 오류·중복 0건과 집계 일치 확인', section: 'FeedShop', caseId: 'feed-vote', stage: '최종 결과',
    body: <><p>DB 유니크 제약·예외 처리 분리·Redis INCR을 적용해 중복 저장과 카운터 갱신을 분리했습니다.</p><Table columns={['검증 대상', '확인 결과', '확인 방법']} rows={[
      ['투표 요청', '최대 동시 3,000명 · HTTP 오류 0건', 'nGrinder 부하 테스트'],
      ['중복·집계', 'DB 중복 0건 · DB와 Redis 값 일치', '저장 기록과 카운터 대조'],
    ]} /><Grid><Proof src="phase2b-redis-count-verify.png" caption="투표 집계 · Redis 카운터와 API 응답 대조" height={205} /><Proof src="vuser3000_result.png" caption="동시 3,000명 · 투표 요청 처리 결과" height={205} /></Grid><PageBottom><p className="rac-meta">왼쪽 화면은 Redis 값과 API 응답 대조입니다. DB 중복 0건과 DB·Redis 집계 일치의 검증 내용은 <a href={voteWiki} target="_blank" rel="noreferrer">상세 검증 기록 ↗</a>에 정리했습니다.</p></PageBottom></>,
  },
  {
    id: 'feed-reflection', title: 'FeedShop 회고 · 경험으로 얻은 판단 기준', section: '프로젝트 1 · 회고',
    body: <>
      <Block title="목록 조회의 평균 응답시간 약 91% 단축">조회 구조와 캐시를 단계별로 적용해, 동시 1,000명 테스트의 평균 응답시간을 6.818초 → 4.191초 → 0.638초로 줄였습니다. 이벤트 목록을 불러오는 대기 시간을 줄였습니다.</Block>
      <Block title="중복 투표 저장 차단과 집계 일치 확인">DB 유니크 제약과 예외 처리 분리, Redis INCR을 적용했습니다. 최대 동시 3,000명 테스트에서 HTTP 오류·DB 중복 저장 0건을 확인하고, DB 투표 수와 Redis 카운터가 일치하는 것을 확인했습니다.</Block>
      <Block title="카운터가 없어도 원본 기록을 기준으로 응답">Redis 키가 유실되면 DB 투표 수로 복구하고, 조회 장애 시 DB 집계로 응답하도록 구현했습니다. Redis 상태에만 의존하지 않는 투표 수 조회 경로를 마련했습니다.</Block>
      <PageBottom><Note label="이 경험으로 얻은 기준">단계별 측정으로 개선 효과를 구분하고, <strong>데이터의 정확성과 장애 시 응답까지 함께 확인하는 검증 기준</strong>을 얻었습니다.</Note>
      <div className="source-row"><Source href={feedShopProject.projectReflection?.sourceUrl ?? feedWiki}>성능·동시성 개선 기록</Source><Source href={voteRecoveryCommit}>DB 기준 복구 구현과 테스트 코드</Source></div></PageBottom>
    </>,
  },
  {
    id: 'm3-intro', title: '3M · 서비스와 담당', section: '프로젝트 2 · 3M',
    body: <><p className="project-intro">주문 생성부터 지역 허브 이동·배송 담당자 배정까지,<br />업체·허브·배송 담당자의 역할별 업무를 연결하는 B2B 물류 관리 시스템</p><p className="rac-meta">2025.03–2025.04 · 4명 · 팀장 / 백엔드</p><Flow steps={[
      ['업체', '주문 생성·상품 요청'], ['허브', '지역 거점 간 이동 관리'], ['배송 담당자', '배정된 배송 작업 수행'],
    ]} /><Grid><Block title="직접 담당한 개발">Auth·User·Gateway 설계·구현<br />JWT 발급·검증, 사용자 정보 전달, AOP 권한 확인<br />Docker Compose 통합 실행 환경 구성</Block><Block title="주요 개선과 효과"><p>인증·사용자 책임 분리 → 변경 시 함께 수정할 범위 축소</p><p>인증 정보 전달 정리 → 반복 조회 부담을 줄이고 역할별 권한 응답 검증</p></Block></Grid><PageBottom><p className="rac-meta">Spring Boot · Spring Cloud Gateway · JWT · PostgreSQL · Redis · Docker</p></PageBottom></>,
  },
  {
    id: 'm3-architecture', title: '3M · 통합 실행과 인증 구조', section: '프로젝트 2 · 3M',
    body: <><Proof src={threeMProject.architectureImage!} caption="3M 전체 시스템 구조 · 기존 프로젝트 설계 자료" height={325} workLegend /><Grid><Block title="실행 환경과 상태 확인">Docker Compose로 서비스·DB·Redis·Zipkin을 함께 실행하고 <strong>Actuator 헬스체크</strong>로 기동 상태 점검</Block><Block title="구성으로 얻은 효과">Eureka 자동 등록으로 고정 주소 의존을 줄이고, Gateway에 JWT 검증을 모아 서비스별 중복 인증 처리 축소</Block></Grid><PageBottom><Note label="직접 담당">Auth·User·Gateway의 인증 경계와 Docker Compose 기반 통합 실행 환경을 구성했습니다.</Note></PageBottom></>,
  },
  {
    id: 'boundary-decision', title: '변경 이유에 따라 Auth·User의 책임을 분리', section: '3M', caseId: 'm3-boundary', stage: '문제 · 대안 비교 · 구현',
    body: <>
      <Note label="문제">서비스는 나뉘었지만 Auth가 User 모듈을 직접 참조해 빌드 경계가 묶여 있었습니다. 공통 계약과 서비스 내부 구현을 분리할 필요가 있었습니다.</Note>
      <div className="boundary-diagrams">
        <Proof src="3m-auth-user-before-class-diagram.png" caption="개선 전 검토 구조 · Auth/User 책임 혼재" height={235} />
        <Proof src="3m-auth-user-after-class-diagram-final.png" caption="개선 후 · Auth/User 분리와 Feign 기반 단방향 호출" height={235} />
      </div>
      <PageBottom><div className="boundary-details">
        <Table columns={['검토안', '장점과 부담']} rows={[
          ['User 직접 참조', '타입 공유는 쉽지만 빌드·배포 경계가 묶임'],
          ['서비스별 DTO 복제', '모듈 분리 가능 · 계약 변경 누락과 중복 관리 부담'],
          ['common 계약 + Feign', '구현 참조 분리 · 공통 계약 버전 관리 필요'],
        ]} />
        <div className="boundary-roles">
          <p><strong>Auth</strong> 로그인 검증·JWT 발급·최소 계정 정보 보관</p>
          <p><strong>User</strong> 사용자 정보·역할 관리 · Auth → User 단방향 호출</p>
          <p><strong>변경 범위 축소</strong> Auth의 User 모듈 직접 의존 제거 · common DTO 계약을 통한 Feign 호출</p>
          <Source href={m3BoundaryWiki}>서비스 경계 비교와 변경 전후 구조</Source>
        </div>
      </div></PageBottom>
    </>,
  },
  {
    id: 'auth-decision', title: '일반 권한 확인과 상세 사용자 조회를 분리', section: '3M', caseId: 'm3-auth', stage: '문제 · 대안 비교',
    body: <>
      <div className="decision-context">
        <Note label="문제">업체·허브·배송 담당자의 권한이 달랐습니다. 요청마다 User에서 역할을 조회하면 호출이 늘고, User 장애가 권한 확인에도 영향을 줄 수 있었습니다.</Note>
        <Note label="선택 기준">일반 권한 확인에는 Gateway가 검증한 JWT의 userId·role을 사용하고, 상세 사용자 정보가 필요한 요청만 User를 조회하도록 구분했습니다.</Note>
      </div>
      <Table columns={['검토한 방식', '얻는 점', '관리할 문제']} rows={[
        ['요청마다 User 조회', '최신 역할 확인', '호출 증가·User 상태에 대한 의존'],
        ['Gateway 로컬 캐시', 'User 호출 감소', '인스턴스별 값 동기화·삭제'],
        ['JWT userId·role 활용', '일반 권한 확인의 추가 조회 감소', '역할 변경 반영·헤더 신뢰 경계'],
      ]} />
      <PageBottom><Note label="적용 효과">일반 권한 확인에 필요한 User 호출을 분리하고, Gateway 검증 → 헤더 전달 → 서비스 AOP로 권한 처리 경로를 모았습니다.</Note>
      <Source href={m3BoundaryWiki}>인증 정보 전달 방식과 적용 근거</Source></PageBottom>
    </>,
  },
  {
    id: 'auth-flow', title: 'Gateway 검증 → 사용자 정보 전달 → 권한 처리', section: '3M', caseId: 'm3-auth', stage: '인증 흐름 단순화',
    body: <><p className="auth-findings">통합 테스트에서 User API의 JWT 검증 우회와 권한 AOP 누락을 찾아 수정했습니다.</p><div className="auth-flow-block"><h3>개선 전 검토 · 요청마다 User 조회</h3><Flow steps={[
      ['Client', 'JWT 포함 요청'], ['Service', '사용자 정보 요청'], ['User', '역할·정보 반환'], ['Service', '권한 판단'],
    ]} /></div><div className="auth-flow-block"><h3>개선 후 · 검증한 정보로 일반 권한 처리</h3><Flow steps={[
      ['Client', 'JWT 포함 요청'], ['Gateway', 'JWT 검증'], ['X-User-*', 'userId·role 전달'], ['Service', 'AOP 권한 처리'],
    ]} /></div><Note label="수정과 효과">User API를 인증 제외 경로에서 제거하고 MasterRoleAspect·예외 처리를 추가했습니다. 역할 변경 API에서 MASTER 200·HUB_MANAGER 403·미인증 401 응답을 확인했습니다.</Note><PageBottom><Note label="관리 기준">토큰 유효기간 중 역할 변경 반영과 전달 헤더의 신뢰 경계를 함께 관리해야 합니다.</Note><Source href={threeMProject.projectReflection?.sourceUrl ?? m3Wiki}>MASTER·HUB_MANAGER·미인증 시나리오 검증</Source></PageBottom></>,
  },
  {
    id: 'm3-result', title: '책임 분리와 권한 응답을 나누어 검증', section: '3M · 문제 해결 1·2', stage: '결과 · 책임 분리와 인증 흐름 검증',
    body: <><p>Auth·User 책임 분리와 Gateway 중심 정보 전달을 적용하고, 코드 구조와 실제 권한 응답을 각각 확인했습니다.</p><Table columns={['검증 대상', '확인 결과', '확인 방법']} rows={[
      ['User 모듈의 Auth 패키지 import', '0건', '소스 코드 import 정적 분석'],
      ['서비스 간 참조', 'common 계약 + Feign 단방향 호출', 'Auth의 User 모듈 직접 의존 제거'],
      ['역할 변경 API의 권한 응답', 'MASTER 200 · HUB_MANAGER 403 · 미인증 401', 'Gateway·AOP 통합 테스트'],
    ]} /><PageBottom><Note label="개선 효과">Auth와 User의 내부 구현 참조를 분리해 빌드 경계를 확보했습니다. 권한 처리 누락을 수정하고 관리자 요청 허용·일반 역할 거부·미인증 차단을 확인했습니다.</Note><Note label="검증 범위">0건은 User 모듈 소스의 Auth 패키지 import 수입니다. 권한 응답은 로컬 H2 환경에서 Gateway·Auth·User를 연결한 통합 테스트 결과입니다.</Note><div className="source-row"><Source href={m3BoundaryWiki}>서비스 경계와 정적 분석 근거</Source><Source href={threeMProject.projectReflection?.sourceUrl ?? m3Wiki}>인증 경로 통합 테스트 보고서</Source></div></PageBottom></>,
  },
  {
    id: 'm3-reflection', title: '3M 회고 · 경험으로 얻은 판단 기준', section: '프로젝트 2 · 회고',
    body: <>
      <Block title="Auth·User의 직접 모듈 의존 제거">Auth의 User 모듈 직접 의존을 없애고 공통 계약과 Feign 호출로 연결했습니다. User 모듈의 Auth 패키지 import 0건도 확인해, 내부 구현을 직접 참조하지 않는 경계를 확보했습니다.</Block>
      <Block title="인증 제외와 권한 검사 누락 수정">User API를 Gateway의 인증 제외 경로에서 제거하고 권한 AOP와 예외 처리를 추가했습니다. 인증 확인부터 역할에 따른 요청 허용·차단까지 처리 흐름을 연결했습니다.</Block>
      <Block title="역할 변경 API의 권한별 응답 확인">로컬 통합 테스트에서 MASTER 200·HUB_MANAGER 403·미인증 401 응답을 확인했습니다. 관리자 요청은 허용하고, 권한이 부족하거나 인증되지 않은 요청은 차단했습니다.</Block>
      <PageBottom><Note label="이 경험으로 얻은 기준"><strong>변경이 영향을 주는 범위로 서비스 경계를 정하고, 실제 요청의 허용·차단까지 확인하는 설계·검증 기준</strong>을 얻었습니다.</Note>
      <div className="source-row"><Source href={m3BoundaryWiki}>실제 발견한 문제와 수정 기록</Source><Source href={threeMProject.projectReflection?.sourceUrl ?? m3Wiki}>권한 통합 테스트 결과</Source></div></PageBottom>
    </>,
  },
  {
    id: 'collaboration-system', title: '협업 환경을 구축하고, 작업 변경을 투명하게 공유', section: '협업 방식',
    body: <>
      <p>JIRA 운영 기준과 Confluence 자료 체계를 정리하고, Slack 알림으로 작업 변경을 자동 공유했습니다.</p>
      <div className="collaboration-evidence">
        {[COLLABORATION_SECTION.evidence[0], COLLABORATION_SECTION.evidence[2], COLLABORATION_SECTION.evidence[1]].map(item => <div key={item.image}>
          <Proof src={item.image} caption={item.alt} height={220} />
          <Block title={item.title}>{item.description}</Block>
        </div>)}
      </div>
      <PageBottom><Note label="개선 효과">담당·상태·완료 범위와 자료 위치를 같은 기준으로 확인하고, 이슈 생성·연결된 커밋 변경을 공통 채널에서 확인합니다. <a href={COLLABORATION_SECTION.guideUrl} target="_blank" rel="noreferrer">직접 작성한 JIRA 가이드라인 ↗</a></Note></PageBottom>
    </>,
  },
  {
    id: 'ai-current', title: '일상을 관리하고 기록·정리하는 개인 플래너', section: 'AI 활용 · 현재와 다음 단계',
    body: <>
      <p className="project-intro">일상을 관리하고 기록·정리하는 개인 플래너를 제작<br /><strong className="metric-accent">AI 원티드 챌린지 대회 참여 중</strong></p>
      <div className="planner-overview">
        <Proof src={plannerScreen} resolved caption="직접 제작해 사용 중인 개인 플래너 · 실제 화면" height={320} />
        <div className="planner-stages">
          <Block title="현재 · 제작과 일상 활용">흩어진 기록을 확인·정리하는 불편을 줄이기 위해 Codex와 AI 도구로 기능을 만들고, 일상의 관리·기록·정리에 사용하고 있습니다.</Block>
          <Block title="다음 · 기술 문제의 원인 분석">일상의 생산성 개선에서 더 나아가, 기술 문제의 원인을 분석하고 해결책을 설계·검증하는 데 AI 활용 범위를 넓히겠습니다.</Block>
          <Source href={PROJECT_WORKFLOW.currentStage.linkUrl}>개인 플래너 제작 후기</Source>
        </div>
      </div>
      <PageBottom><div className="planner-workflow">
        <div><h3>근거 수집</h3><strong>NotebookLM</strong><p>공식 자료 기반 조사와 근거 정리</p></div>
        <div><h3>사고·문서 구조화</h3><strong>Claude · Gemini</strong><p>생각과 문서 구조화, 대안 탐색</p></div>
        <div><h3>구현·자동화</h3><strong>Codex · Claude Code</strong><p>Codex로 플래너·자동화·코드 점검, Claude Code로 범위가 정해진 기능 구현</p></div>
        <div><h3>최종 판단은 직접</h3><p>코드 이해·변경 영향·빌드·테스트·실제 동작을 확인하고 설명할 수 있는 코드만 반영</p></div>
      </div></PageBottom>
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
