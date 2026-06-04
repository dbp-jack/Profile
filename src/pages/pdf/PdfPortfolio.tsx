import { CONTACT_LINKS, EXPERIENCE_ITEMS, HERO_NAME, HERO_PERSONAL_INFO, HERO_ROLE_BADGE, HERO_SKILL_TAGS, RESOURCE_LINKS } from '@/content/portfolio'

/* ─── 디자인 토큰 ─────────────────────────── */
const NAVY  = '#0f172a'
const BLUE  = '#2563eb'
const BLUE2 = '#eff6ff'
const GRAY1 = '#f8fafc'
const GRAY2 = '#e2e8f0'
const GRAY3 = '#64748b'
const GRAY4 = '#334155'
const WHITE = '#ffffff'
const GREEN = '#059669'
const RED   = '#ef4444'
const AMBER = '#d97706'

/* ─── 슬라이드 기본 컨테이너 ─────────────── */
function Slide({ children, bg = WHITE }: { children: React.ReactNode; bg?: string }) {
  return (
    <div
      className="pdf-slide relative"
      style={{
        width: '297mm', height: '210mm',
        background: bg,
        overflow: 'hidden',
        pageBreakAfter: 'always',
        breakAfter: 'page',
        boxSizing: 'border-box',
        fontFamily: "'Inter', 'Noto Sans KR', sans-serif",
      }}
    >
      {children}
    </div>
  )
}

/* 페이지 번호 */
function PageBadge({ n, total = 8 }: { n: number; total?: number }) {
  return (
    <div style={{
      position: 'absolute', bottom: 8, right: 16,
      fontSize: 8, color: '#94a3b8', fontWeight: 500,
    }}>
      {n} / {total}
    </div>
  )
}

/* 섹션 라벨 */
function Tag({ text, color = BLUE }: { text: string; color?: string }) {
  return (
    <div style={{
      fontSize: 7.5, fontWeight: 700, letterSpacing: '0.16em',
      textTransform: 'uppercase', color, marginBottom: 6,
    }}>
      {text}
    </div>
  )
}

/* 구분선 */
function Divider({ vertical = false }: { vertical?: boolean }) {
  return (
    <div style={{
      background: GRAY2,
      ...(vertical
        ? { width: 1, alignSelf: 'stretch' }
        : { height: 1, width: '100%' }),
    }} />
  )
}

/* 수치 카드 */
function StatCard({ num, label, sub, color = BLUE, bg = BLUE2 }: {
  num: string; label: string; sub?: string; color?: string; bg?: string
}) {
  return (
    <div style={{
      background: bg, borderRadius: 12, padding: '12px 10px',
      textAlign: 'center', flex: 1,
      border: `1px solid ${color}22`,
    }}>
      <div style={{ fontSize: 28, fontWeight: 900, color, lineHeight: 1 }}>{num}</div>
      <div style={{ fontSize: 9, fontWeight: 700, color, marginTop: 3 }}>{label}</div>
      {sub && <div style={{ fontSize: 7.5, color: GRAY3, marginTop: 2 }}>{sub}</div>}
    </div>
  )
}

/* 작은 배지 */
function Chip({ text }: { text: string }) {
  return (
    <span style={{
      display: 'inline-block',
      background: BLUE2, color: '#1e40af',
      fontSize: 8.5, fontWeight: 600,
      padding: '2px 8px', borderRadius: 99,
      border: `1px solid #bfdbfe`,
    }}>{text}</span>
  )
}

/* 항목 행 */
function Row({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '6px 0', borderBottom: `1px solid ${GRAY2}` }}>
      <span style={{ fontSize: 13, lineHeight: 1.4 }}>{icon}</span>
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: GRAY4 }}>{title}</div>
        <div style={{ fontSize: 8.5, color: GRAY3, lineHeight: 1.5, marginTop: 1 }}>{desc}</div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════
   1. COVER
═══════════════════════════════════ */
function CoverSlide() {
  return (
    <Slide bg={NAVY}>
      {/* 상단 블루 라인 */}
      <div style={{ height: 4, background: BLUE, width: '100%' }} />

      {/* 전체를 세로 중앙 정렬 */}
      <div style={{
        height: 'calc(210mm - 4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '0 48px',
        gap: 48,
      }}>

        {/* 좌측 — 이름/역할/연락처 */}
        <div style={{ flex: '0 0 auto', maxWidth: 260 }}>
          {/* 프로필 사진 */}
          <img
            src={`${__BASE_PATH__}profile-photo.png`}
            alt="프로필"
            style={{ width: 72, height: 90, borderRadius: 10, objectFit: 'cover', marginBottom: 16, border: '2px solid #334155' }}
          />
          <div style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#60a5fa', marginBottom: 6 }}>
            {HERO_ROLE_BADGE}
          </div>
          <div style={{ fontSize: 40, fontWeight: 900, color: WHITE, lineHeight: 1.1, marginBottom: 10, letterSpacing: '-1px' }}>
            {HERO_NAME}
          </div>
          <div style={{ fontSize: 10.5, color: '#94a3b8', lineHeight: 1.6, marginBottom: 18, maxWidth: 220 }}>
            성능 병목을 수치로 분석·해결하고,<br />팀 협업 구조를 직접 설계합니다.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {HERO_PERSONAL_INFO.map((item) => (
              <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 9, color: '#94a3b8' }}>
                <i className={item.icon} style={{ color: '#60a5fa', fontSize: 10 }} />
                {item.text}
              </div>
            ))}
          </div>
        </div>

        {/* 세로 구분선 */}
        <div style={{ width: 1, height: 180, background: '#1e293b', flexShrink: 0 }} />

        {/* 우측 — 핵심 수치 + 기술스택 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* 수치 3개 */}
          <div>
            <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#475569', marginBottom: 10 }}>
              Key Achievements
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <StatCard num="91%" label="응답시간 단축" sub="6.8s → 0.6s" color="#60a5fa" bg="#0f2744" />
              <StatCard num="0건" label="중복 투표" sub="동시 3,000명" color="#34d399" bg="#042f1e" />
              <StatCard num="CBO 0" label="모듈 결합도" sub="Auth→User 분리" color="#a78bfa" bg="#1e1040" />
            </div>
          </div>

          {/* 강점 3개 */}
          <div>
            <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#475569', marginBottom: 10 }}>
              Competencies
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { icon: '📊', title: '문제 해결 능력', desc: '성능 병목을 수치로 분석·검증해 해결' },
                { icon: '🔗', title: '협업 시스템 설계', desc: '제로베이스에서 JIRA·Slack 협업 체계 직접 구축' },
                { icon: '🎯', title: '오너십', desc: '기획부터 시연까지 단독 주도·완수' },
              ].map((c) => (
                <div key={c.title} style={{
                  background: '#0f1e35', border: '1px solid #1e3a5f',
                  borderRadius: 8, padding: '7px 12px',
                  display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <span style={{ fontSize: 14 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#e2e8f0' }}>{c.title}</div>
                    <div style={{ fontSize: 8.5, color: '#64748b' }}>{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 기술 스택 */}
          <div>
            <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#475569', marginBottom: 8 }}>
              Tech Stack
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {HERO_SKILL_TAGS.map((tag) => (
                <span key={tag} style={{
                  background: '#1e293b', border: '1px solid #334155',
                  color: '#94a3b8', fontSize: 8.5, fontWeight: 600,
                  padding: '2px 8px', borderRadius: 99,
                }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <PageBadge n={1} />
    </Slide>
  )
}

/* ═══════════════════════════════════
   2. FeedShop 개요
═══════════════════════════════════ */
function FeedShopOverview() {
  const roles = [
    { icon: '🔧', title: '이벤트·피드 도메인 전담', desc: '이벤트·투표·피드·댓글·좋아요·검색 전체 구현' },
    { icon: '🚀', title: '배포 / 운영', desc: 'GCP·Docker 배포, GitHub Actions CI/CD + SonarCloud 파이프라인 구축' },
    { icon: '👥', title: '팀 리딩(부팀장)', desc: 'JIRA 협업 가이드라인 설계·배포, JIRA-Slack 알림 연동' },
  ]
  return (
    <Slide>
      {/* 헤더 */}
      <div style={{ background: NAVY, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#60a5fa' }}>Project 01</span>
          <span style={{ fontSize: 12, fontWeight: 800, color: WHITE }}>FeedShop — 피드 기반 패션 커뮤니티 쇼핑몰</span>
        </div>
        <span style={{ fontSize: 8.5, color: '#94a3b8' }}>2025.05 – 2025.09 · 4명 / 부팀장 · 기여도 약 40%</span>
      </div>

      {/* 본문 */}
      <div style={{ display: 'flex', height: 'calc(210mm - 44px)', padding: '18px 28px', gap: 20 }}>

        {/* 좌 — 서비스 소개 + 기술스택 */}
        <div style={{ flex: 3, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <Tag text="서비스 소개" />
            <div style={{ background: GRAY1, borderRadius: 10, padding: '12px 14px', border: `1px solid ${GRAY2}` }}>
              <p style={{ fontSize: 10.5, lineHeight: 1.65, color: GRAY4, margin: 0 }}>
                &apos;나라면 이 쇼핑몰 쓸까?&apos; 라는 질문에서 출발한 커뮤니티형 패션 커머스입니다.
                단순 구매를 넘어 <strong>피드 공유·투표·이벤트</strong>로 유저가 자발적으로 재방문하는
                <strong> 선순환 구조</strong>를 설계했습니다.
              </p>
            </div>
          </div>

          <div>
            <Tag text="기술 스택" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {['SpringBoot', 'QueryDSL', 'MySQL', 'Redis', 'GCP', 'Docker', 'GitHub Actions', 'SonarCloud', 'nGrinder', 'Scouter'].map((t) => (
                <Chip key={t} text={t} />
              ))}
            </div>
          </div>

          <div>
            <Tag text="개발자 관점에서의 핵심 과제" />
            <div style={{ background: GRAY1, borderRadius: 10, padding: '10px 14px', border: `1px solid ${GRAY2}` }}>
              <p style={{ fontSize: 10, lineHeight: 1.6, color: GRAY4, margin: 0 }}>
                이벤트 참여 시 <strong style={{ color: RED }}>특정 시간 요청 급증</strong>과 투표 쏠림 현상으로
                <strong style={{ color: RED }}> 응답 지연·데이터 정합성 이슈</strong>가 발생했습니다.
                유저 경험을 지키기 위해 <strong style={{ color: BLUE }}>이벤트 목록 조회 병목 해결</strong>과
                <strong style={{ color: BLUE }}> 투표 동시성 보장</strong>에 집중했습니다.
              </p>
            </div>
          </div>
        </div>

        <div style={{ width: 1, background: GRAY2, flexShrink: 0 }} />

        {/* 우 — 담당 업무 */}
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Tag text="담당 업무" />
          {roles.map((r) => (
            <Row key={r.title} icon={r.icon} title={r.title} desc={r.desc} />
          ))}
        </div>
      </div>

      <PageBadge n={2} />
    </Slide>
  )
}

/* ═══════════════════════════════════
   3. FeedShop 성능 개선
═══════════════════════════════════ */
function FeedShopPerf() {
  return (
    <Slide>
      <div style={{ background: '#1e3a5f', height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#93c5fd' }}>Project 01 · 문제 해결 1</span>
          <span style={{ fontSize: 12, fontWeight: 800, color: WHITE }}>이벤트 목록 조회 성능 개선</span>
        </div>
        <span style={{ fontSize: 8.5, color: '#93c5fd' }}>N+1 쿼리 → QueryDSL fetchJoin + Redis @Cacheable</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr 1px 1fr', height: 'calc(210mm - 44px)' }}>
        {/* Problem */}
        <div style={{ padding: '18px 20px' }}>
          <Tag text="Problem" color={RED} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { label: 'N+1 쿼리 발생', desc: '연관 데이터(eventDetail, rewards) 매번 개별 조회' },
              { label: '응답시간 폭발', desc: '동시 100명 645ms / 동시 1,000명 6,818ms' },
              { label: '메모리 필터링', desc: 'findAll() 전체 조회 후 메모리에서 필터링' },
            ].map((item) => (
              <div key={item.label} style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '8px 10px' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#dc2626', marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontSize: 9, color: '#7f1d1d', lineHeight: 1.4 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: GRAY2 }} />

        {/* Solution */}
        <div style={{ padding: '18px 20px' }}>
          <Tag text="Solution" color={BLUE} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { step: '1단계', title: '쿼리 최적화', desc: 'QueryDSL leftJoin + fetchJoin으로 N+1 제거 / countDistinct로 페이징 보정', color: '#dbeafe' },
              { step: '2단계', title: 'Redis 캐시 전략', desc: '@Cacheable + RedisCacheManager 전환 (분산 환경 대응) / TTL · @CacheEvict로 정합성 유지', color: '#eff6ff' },
            ].map((s) => (
              <div key={s.step} style={{ background: s.color, border: '1px solid #bfdbfe', borderRadius: 8, padding: '8px 10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                  <span style={{ background: BLUE, color: WHITE, fontSize: 7.5, fontWeight: 700, padding: '1px 6px', borderRadius: 99 }}>{s.step}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#1e40af' }}>{s.title}</span>
                </div>
                <div style={{ fontSize: 9, color: '#1d4ed8', lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: GRAY2 }} />

        {/* Result */}
        <div style={{ padding: '18px 20px', background: GRAY1 }}>
          <Tag text="Result" color={GREEN} />
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <StatCard num="91%" label="응답시간 단축" sub="6818ms → 638ms" color={GREEN} bg="#ecfdf5" />
            <StatCard num="-100%" label="SQL Count" sub="42회 → 0회" color={BLUE} bg={BLUE2} />
          </div>
          <div style={{ background: WHITE, border: `1px solid ${GRAY2}`, borderRadius: 8, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 9 }}>
              <thead>
                <tr style={{ background: GRAY1 }}>
                  {['항목', 'Before', 'After', '개선율'].map((h) => (
                    <th key={h} style={{ padding: '5px 8px', textAlign: 'left', fontSize: 8, fontWeight: 700, color: GRAY3, borderBottom: `1px solid ${GRAY2}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['응답시간 V100', '645ms', '209ms', '-68%'],
                  ['응답시간 V1000', '6,818ms', '638ms', '-91%'],
                  ['TPS V100', '154.6', '470.1', '+204%'],
                  ['TPS V1000', '138.7', '438.3', '+216%'],
                ].map(([label, before, after, rate]) => (
                  <tr key={label} style={{ borderBottom: `1px solid ${GRAY2}` }}>
                    <td style={{ padding: '4px 8px', fontWeight: 600, color: GRAY4, fontSize: 8.5 }}>{label}</td>
                    <td style={{ padding: '4px 8px', color: GRAY3, fontSize: 8.5 }}>{before}</td>
                    <td style={{ padding: '4px 8px', fontWeight: 700, color: BLUE, fontSize: 8.5 }}>{after}</td>
                    <td style={{ padding: '4px 8px', fontWeight: 800, color: GREEN, fontSize: 9 }}>{rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <PageBadge n={3} />
    </Slide>
  )
}

/* ═══════════════════════════════════
   4. FeedShop 동시성
═══════════════════════════════════ */
function FeedShopConcurrency() {
  return (
    <Slide>
      <div style={{ background: '#1e3a5f', height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#93c5fd' }}>Project 01 · 문제 해결 2</span>
          <span style={{ fontSize: 12, fontWeight: 800, color: WHITE }}>피드 투표 동시성 문제</span>
        </div>
        <span style={{ fontSize: 8.5, color: '#93c5fd' }}>TOCTOU 취약점 → DB 유니크 제약 + Redis INCR</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr 1px 1fr', height: 'calc(210mm - 44px)' }}>
        <div style={{ padding: '18px 20px' }}>
          <Tag text="Problem" color={RED} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { label: 'TOCTOU 취약점', desc: '코드 레벨 중복 검사만 존재 — 동시 요청 시 두 스레드가 동시에 통과 가능' },
              { label: 'DB 유니크 제약 없음', desc: '어떤 코드 수정으로도 완전한 중복 차단 불가' },
              { label: 'DB 락 경합', desc: '투표 수 업데이트 시 트랜잭션 충돌 발생' },
            ].map((item) => (
              <div key={item.label} style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '8px 10px' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#dc2626', marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontSize: 9, color: '#7f1d1d', lineHeight: 1.4 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: GRAY2 }} />

        <div style={{ padding: '18px 20px' }}>
          <Tag text="Solution" color={BLUE} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { step: '1단계', title: 'DB 유니크 제약 추가', desc: '(event_id, voter_id) 복합 유니크 제약 — 코드 우회 불가능한 물리적 차단', color: '#dbeafe' },
              { step: '2단계', title: '트랜잭션 구조 개선', desc: '@Transactional(NOT_SUPPORTED) — 제약 위반 예외 발생 시 트랜잭션 오염 없이 200 반환', color: '#eff6ff' },
              { step: '3단계', title: 'Redis INCR 원자 연산', desc: '투표 수를 Redis로 분리 — DB 락 경합 구조 자체 제거', color: '#f0fdf4' },
            ].map((s) => (
              <div key={s.step} style={{ background: s.color, border: '1px solid #bfdbfe', borderRadius: 8, padding: '8px 10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                  <span style={{ background: BLUE, color: WHITE, fontSize: 7.5, fontWeight: 700, padding: '1px 6px', borderRadius: 99 }}>{s.step}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#1e40af' }}>{s.title}</span>
                </div>
                <div style={{ fontSize: 9, color: '#1d4ed8', lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: GRAY2 }} />

        <div style={{ padding: '18px 20px', background: GRAY1 }}>
          <Tag text="Result" color={GREEN} />
          <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
            <StatCard num="0%" label="에러율" sub="전 구간" color={GREEN} bg="#ecfdf5" />
            <StatCard num="0건" label="중복 투표" sub="동시 3,000명" color={BLUE} bg={BLUE2} />
          </div>
          <div style={{ background: WHITE, border: `1px solid ${GRAY2}`, borderRadius: 8, padding: '10px 12px' }}>
            <div style={{ fontSize: 9, color: GRAY4, lineHeight: 1.6 }}>
              동시 50명 ~ 3,000명 전 구간에서
              <strong style={{ color: GREEN }}> 에러율 0%</strong>,
              <strong style={{ color: GREEN }}> 중복 투표 0건</strong>,
              <strong style={{ color: BLUE }}> DB count = Redis count 정확히 일치</strong> 검증 완료
            </div>
          </div>
          <div style={{ marginTop: 10, background: '#0f172a', borderRadius: 8, padding: '8px 12px' }}>
            <div style={{ fontSize: 8, color: '#6272a4', marginBottom: 4 }}>// 핵심 설계 판단</div>
            <div style={{ fontSize: 9, color: '#a9dc76', fontFamily: 'monospace' }}>
              @UniqueConstraint(event_id + voter_id) <br />
              <span style={{ color: '#c8a882' }}>@Transactional</span>(propagation = NOT_SUPPORTED) <br />
              redis.INCR(<span style={{ color: '#e0e0e0' }}>"vote:count:" + feedId</span>)
            </div>
          </div>
        </div>
      </div>

      <PageBadge n={4} />
    </Slide>
  )
}

/* ═══════════════════════════════════
   5. 3M 개요 + 문제 해결
═══════════════════════════════════ */
function ThreeMSlide() {
  return (
    <Slide>
      <div style={{ background: NAVY, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#93c5fd' }}>Project 02</span>
          <span style={{ fontSize: 12, fontWeight: 800, color: WHITE }}>3M — B2B 물류 관리 및 배송 시스템</span>
        </div>
        <span style={{ fontSize: 8.5, color: '#94a3b8' }}>2025.03 – 2025.04 · 4명 / 팀장 · 기여도 약 35%</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr 1px 1fr', height: 'calc(210mm - 44px)' }}>
        {/* 서비스 개요 */}
        <div style={{ padding: '18px 20px' }}>
          <Tag text="서비스 소개" />
          <div style={{ background: GRAY1, borderRadius: 10, padding: '10px 12px', border: `1px solid ${GRAY2}`, marginBottom: 12 }}>
            <p style={{ fontSize: 10, lineHeight: 1.65, color: GRAY4, margin: 0 }}>
              업체 → 허브 → 배송 담당자로 이어지는 <strong>B2B 물류 흐름</strong>을 통합 관리하는 플랫폼.
              다수 기업·허브·배송 담당자가 사용하는 구조로 <strong>인증·권한 관리</strong>가 핵심이었습니다.
            </p>
          </div>
          <Tag text="기술 스택" />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 12 }}>
            {['SpringBoot', 'Spring Cloud Gateway', 'JWT', 'Redis', 'PostgreSQL', 'Docker', 'JIRA'].map((t) => (
              <Chip key={t} text={t} />
            ))}
          </div>
          <Tag text="담당 업무" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {[
              { icon: '🧱', title: '책임 경계 설계 / 인증 흐름', desc: 'SRP 기준 Auth/User/Gateway 분리, JWT payload 설계' },
              { icon: '🐳', title: '인프라 통합', desc: 'Docker Compose 10+ 서비스 통합 구성' },
              { icon: '👥', title: '팀장 리딩', desc: 'JIRA 애자일 협업, 스프린트 조율' },
            ].map((r) => (
              <div key={r.title} style={{ borderBottom: `1px solid ${GRAY2}`, paddingBottom: 5 }}>
                <div style={{ fontSize: 9.5, fontWeight: 700, color: GRAY4 }}>{r.icon} {r.title}</div>
                <div style={{ fontSize: 8.5, color: GRAY3 }}>{r.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: GRAY2 }} />

        {/* Problem + Thinking */}
        <div style={{ padding: '18px 20px' }}>
          <Tag text="Problem" color={RED} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 14 }}>
            {[
              { label: '인증·사용자 책임 혼재', desc: '인증 정책 변경 시 User 도메인까지 배포 단위로 엮임' },
              { label: '매 요청마다 User 재조회', desc: '서비스 간 결합도 증가, User 장애 시 인증 전체 영향' },
            ].map((item) => (
              <div key={item.label} style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '7px 10px' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#dc2626', marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontSize: 9, color: '#7f1d1d' }}>{item.desc}</div>
              </div>
            ))}
          </div>
          <Tag text="Thinking" color={AMBER} />
          <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 8, padding: '8px 10px' }}>
            <div style={{ fontSize: 9, color: '#78350f', lineHeight: 1.6 }}>
              두 문제의 원인 레이어가 다르다고 판단 →<br />
              <strong>1.</strong> 모듈 경계 혼재 → SRP 기준 Auth/User 분리<br />
              <strong>2.</strong> 런타임 재호출 → JWT payload로 호출 자체를 줄이는 구조
            </div>
          </div>
        </div>

        <div style={{ background: GRAY2 }} />

        {/* Solution + Result */}
        <div style={{ padding: '18px 20px', background: GRAY1 }}>
          <Tag text="Solution" color={BLUE} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 14 }}>
            {[
              { step: '1단계', title: '서비스 경계 분리', desc: 'Auth·User·Gateway 역할 분리 / JWT에 userId·role 포함' },
              { step: '2단계', title: '인증 흐름 단순화', desc: 'Gateway에서 JWT 검증 후 X-User-* 헤더 전달 / AOP로 권한 분리' },
            ].map((s) => (
              <div key={s.step} style={{ background: '#dbeafe', border: '1px solid #bfdbfe', borderRadius: 8, padding: '7px 10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 2 }}>
                  <span style={{ background: BLUE, color: WHITE, fontSize: 7, fontWeight: 700, padding: '1px 5px', borderRadius: 99 }}>{s.step}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#1e40af' }}>{s.title}</span>
                </div>
                <div style={{ fontSize: 9, color: '#1d4ed8' }}>{s.desc}</div>
              </div>
            ))}
          </div>
          <Tag text="Result" color={GREEN} />
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            <StatCard num="0건" label="UserService→Auth 결합도" sub="CBO 정적 분석" color={GREEN} bg="#ecfdf5" />
            <StatCard num="3건" label="Auth→User 단방향 의존" sub="순환 의존 없음" color={BLUE} bg={BLUE2} />
          </div>
          <div style={{ fontSize: 9, color: GRAY3, background: WHITE, borderRadius: 8, padding: '7px 10px', border: `1px solid ${GRAY2}` }}>
            인증 정책·사용자 정책 변경 범위를 각 모듈로 수렴 — 한 도메인 수정이 다른 도메인 배포로 이어지지 않는 구조 확보
          </div>
        </div>
      </div>

      <PageBadge n={5} />
    </Slide>
  )
}

/* ═══════════════════════════════════
   6. 경력 + 앞으로의 방향
═══════════════════════════════════ */
function ExperienceAndClosing() {
  const closingPoints = [
    { icon: '🧠', title: '구현 전에 흐름을 먼저 설계', desc: 'FeedShop 캐시 전략 데이터 특성별 분리, 3M 도메인 책임 먼저 분리 후 인증 흐름 설계' },
    { icon: '🔧', title: '도구는 활용하되 판단은 직접', desc: '구조 설계와 판단은 직접 수행, 반복 구현에 AI 도구 활용. FeedShop 프론트엔드 단독 구현' },
    { icon: '🚀', title: '현재 성장 방향', desc: 'PR마다 반복되는 코드리뷰 과정 자동화를 위해 n8n 기반 워크플로 구상 중' },
  ]
  return (
    <Slide>
      <div style={{ background: NAVY, height: 44, display: 'flex', alignItems: 'center', padding: '0 28px', gap: 12 }}>
        <span style={{ fontSize: 12, fontWeight: 800, color: WHITE }}>걸어온 여정 · 앞으로의 방향</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr', height: 'calc(210mm - 44px)' }}>
        {/* 경력 */}
        <div style={{ padding: '16px 22px' }}>
          <Tag text="Experience" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {EXPERIENCE_ITEMS.map((item) => (
              <div key={item.title} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: BLUE, marginTop: 5, flexShrink: 0 }} />
                <div style={{ flex: 1, background: GRAY1, borderRadius: 8, padding: '7px 10px', border: `1px solid ${GRAY2}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: GRAY4 }}>{item.title}</span>
                    <span style={{
                      fontSize: 7.5, fontWeight: 700, padding: '1px 6px', borderRadius: 99,
                      background: item.category === '경력' ? '#dbeafe' : item.category === '교육' ? '#d1fae5' : '#fef3c7',
                      color: item.category === '경력' ? '#1e40af' : item.category === '교육' ? '#065f46' : '#92400e',
                    }}>{item.category}</span>
                  </div>
                  <div style={{ fontSize: 8, color: '#94a3b8', marginBottom: 2 }}>{item.period}</div>
                  <div style={{ fontSize: 8.5, color: GRAY3, lineHeight: 1.45 }}>{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: GRAY2 }} />

        {/* 앞으로의 방향 */}
        <div style={{ padding: '16px 22px' }}>
          <Tag text="Growth Direction" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {closingPoints.map((c) => (
              <div key={c.title} style={{ background: GRAY1, border: `1px solid ${GRAY2}`, borderRadius: 10, padding: '10px 12px' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: GRAY4, marginBottom: 4 }}>
                  {c.icon} {c.title}
                </div>
                <div style={{ fontSize: 9.5, color: GRAY3, lineHeight: 1.55 }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <PageBadge n={6} />
    </Slide>
  )
}

/* ═══════════════════════════════════
   7. About
═══════════════════════════════════ */
function AboutSlide() {
  return (
    <Slide>
      <div style={{ background: NAVY, height: 44, display: 'flex', alignItems: 'center', padding: '0 28px' }}>
        <span style={{ fontSize: 12, fontWeight: 800, color: WHITE }}>저는 이렇게 일합니다</span>
      </div>
      <div style={{ padding: '20px 28px', height: 'calc(210mm - 44px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <p style={{ textAlign: 'center', fontSize: 10.5, color: GRAY3, marginBottom: 20 }}>
          문제는 수치로 파악해 해결하고, 협력은 팀 흐름을 맞춰 정리하며, 맡은 임무는 끝까지 완수합니다.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          {[
            {
              icon: 'ri-bar-chart-2-line', title: '문제 해결 능력', sub: '성능 병목을 찾아 수치로 증명',
              points: ['N+1 쿼리 → fetchJoin + Redis로 응답시간 91% 단축', 'Scouter SQL 42회 확인 → 2회로 축소', 'nGrinder 동시 1,000명 기준 검증'],
              color: '#2563EB', bg: '#eff6ff',
            },
            {
              icon: 'ri-node-tree', title: '협업 시스템 설계', sub: '백지 상태에서 팀 협업을 만든 경험',
              points: ['스프린트 일정·범위 없던 상태에서 JIRA 가이드라인 배포', '주간 스프린트 운영 방식 구조화', 'JIRA-Slack 실시간 연동 알림 체계 구축'],
              color: '#059669', bg: '#ecfdf5',
            },
            {
              icon: 'ri-checkbox-circle-line', title: '오너십', sub: '기획부터 시연까지 단독 주도',
              points: ['건설현장 관리자 대시보드 기획·설계·개발 전담', '완성도를 위해 기간 연장 자발적 제안', '고양 킨텍스 시연 행사 성공적으로 완수'],
              color: '#7c3aed', bg: '#f5f3ff',
            },
          ].map((card) => (
            <div key={card.title} style={{
              background: card.bg, border: `1.5px solid ${card.color}22`,
              borderRadius: 14, padding: '16px 14px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: WHITE, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                }}>
                  <i className={card.icon} style={{ color: card.color, fontSize: 14 }} />
                </div>
                <div>
                  <div style={{ fontSize: 11.5, fontWeight: 800, color: '#0f172a' }}>{card.title}</div>
                  <div style={{ fontSize: 8, fontWeight: 600, color: card.color, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{card.sub}</div>
                </div>
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>
                {card.points.map((pt) => (
                  <li key={pt} style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                    <span style={{ color: card.color, fontSize: 8, marginTop: 2, flexShrink: 0 }}>▸</span>
                    <span style={{ fontSize: 9.5, color: '#334155', lineHeight: 1.5 }}>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <PageBadge n={7} />
    </Slide>
  )
}

/* ═══════════════════════════════════
   8. 마지막 — 자료 + 연락처
═══════════════════════════════════ */
function FinalSlide() {
  return (
    <Slide bg={NAVY}>
      <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 48px', gap: 48 }}>

        {/* 자료 모음 */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#475569', marginBottom: 12 }}>Resources</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {RESOURCE_LINKS.map((link) => (
              <div key={link.label} style={{
                background: '#0f1e35', border: '1px solid #1e3a5f',
                borderRadius: 10, padding: '10px 14px',
                display: 'flex', alignItems: 'flex-start', gap: 10,
              }}>
                <i className={link.icon} style={{ color: '#60a5fa', fontSize: 14, marginTop: 1 }} />
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#e2e8f0', marginBottom: 2 }}>{link.label}</div>
                  <div style={{ fontSize: 8.5, color: '#64748b', lineHeight: 1.4 }}>{link.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ width: 1, height: 200, background: '#1e293b', flexShrink: 0 }} />

        {/* 연락처 + 이름 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 24 }}>
          <div style={{ width: '100%' }}>
            <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#475569', marginBottom: 12 }}>Contact</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {CONTACT_LINKS.map((link) => (
                <div key={link.label} style={{
                  background: '#0f1e35', border: '1px solid #1e3a5f',
                  borderRadius: 10, padding: '10px 14px',
                  display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <i className={link.icon} style={{ color: '#60a5fa', fontSize: 14 }} />
                  <span style={{ fontSize: 10.5, fontWeight: 500, color: '#cbd5e1' }}>{link.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center', paddingTop: 16, borderTop: '1px solid #1e293b', width: '100%' }}>
            <div style={{ fontSize: 32, fontWeight: 900, color: WHITE, letterSpacing: '-0.5px' }}>{HERO_NAME}</div>
            <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#60a5fa', marginTop: 4 }}>
              {HERO_ROLE_BADGE}
            </div>
          </div>
        </div>
      </div>

      <PageBadge n={8} dark />
    </Slide>
  )
}

/* ═══════════════════════════════════
   메인 export
═══════════════════════════════════ */
export default function PdfPortfolio() {
  return (
    <div>
      <CoverSlide />
      <FeedShopOverview />
      <FeedShopPerf />
      <FeedShopConcurrency />
      <ThreeMSlide />
      <ExperienceAndClosing />
      <AboutSlide />
      <FinalSlide />
    </div>
  )
}
