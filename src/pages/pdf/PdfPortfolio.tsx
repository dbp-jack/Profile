import { ABOUT_CARDS, CONTACT_LINKS, CLOSING_BLOCKS, EXPERIENCE_ITEMS, HERO_NAME, HERO_PERSONAL_INFO, HERO_ROLE_BADGE, HERO_ROLE_TITLE, HERO_SKILL_TAGS, RESOURCE_LINKS } from '@/content/portfolio'
import { PROJECTS } from '@/mocks/projects'

/* ─────────────────────────────────────────
   기본 슬라이드 컨테이너 (A4 가로 고정)
───────────────────────────────────────── */
function Slide({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div
      className={`pdf-slide relative overflow-hidden ${dark ? 'bg-[#0f172a]' : 'bg-white'}`}
      style={{ width: '297mm', height: '210mm', pageBreakAfter: 'always', breakAfter: 'page', boxSizing: 'border-box' }}
    >
      {children}
    </div>
  )
}

/* 페이지 번호 */
function Pager({ n, total = 8, dark = false }: { n: number; total?: number; dark?: boolean }) {
  return (
    <div className={`absolute bottom-4 right-6 text-[8px] ${dark ? 'text-slate-500' : 'text-slate-300'}`}>
      {n} / {total}
    </div>
  )
}

/* 공통 라벨 */
function Label({ children, color = '#2563EB' }: { children: React.ReactNode; color?: string }) {
  return (
    <p className="mb-0.5 text-[7.5px] font-bold uppercase tracking-[0.18em]" style={{ color }}>
      {children}
    </p>
  )
}

/* ═══════════════════════════════════════════
   1. COVER — 어두운 배경, 강렬한 첫인상
═══════════════════════════════════════════ */
function CoverSlide() {
  const achievements = [
    { num: '91%', label: '응답시간 단축', sub: '6.8s → 0.6s' },
    { num: '0건', label: '중복 투표', sub: '동시 3,000명' },
    { num: '2', label: '프로젝트', sub: 'B2C · B2B' },
  ]
  return (
    <Slide dark>
      {/* 좌측 — 이름·역할 */}
      <div className="absolute inset-y-0 left-0 flex w-[55%] flex-col justify-between px-10 py-9">
        {/* 상단 */}
        <div>
          <span className="mb-4 inline-block rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-blue-300">
            {HERO_ROLE_BADGE}
          </span>
          <h1 className="mb-2 text-[52px] font-extrabold leading-none tracking-tight text-white">
            {HERO_NAME}
          </h1>
          <p className="mb-6 max-w-xs text-[11px] leading-relaxed text-slate-400">
            {HERO_ROLE_TITLE}
          </p>

          {/* 연락처 */}
          <ul className="space-y-1.5">
            {HERO_PERSONAL_INFO.map((item) => (
              <li key={item.text} className="flex items-center gap-2 text-[10px] text-slate-400">
                <i className={`${item.icon} text-[11px] text-blue-400`} />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 기술 스택 */}
        <div>
          <p className="mb-2 text-[7.5px] font-bold uppercase tracking-[0.18em] text-slate-500">Tech Stack</p>
          <div className="flex flex-wrap gap-1.5">
            {HERO_SKILL_TAGS.map((tag) => (
              <span key={tag} className="rounded-md border border-slate-700 bg-slate-800 px-2 py-0.5 text-[9px] font-medium text-slate-300">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 구분선 */}
      <div className="absolute inset-y-8 left-[55%] w-px bg-slate-700" />

      {/* 우측 — 수치 + About */}
      <div className="absolute inset-y-0 right-0 flex w-[45%] flex-col justify-center gap-5 px-9">
        <div>
          <p className="mb-3 text-[7.5px] font-bold uppercase tracking-[0.18em] text-slate-500">Key Achievements</p>
          <div className="grid grid-cols-3 gap-3">
            {achievements.map((a) => (
              <div key={a.label} className="rounded-xl border border-slate-700 bg-slate-800/50 p-3 text-center">
                <p className="text-2xl font-extrabold text-blue-400">{a.num}</p>
                <p className="mt-0.5 text-[9px] font-semibold text-slate-300">{a.label}</p>
                <p className="text-[8px] text-slate-500">{a.sub}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2.5">
          {ABOUT_CARDS.map((card) => (
            <div key={card.title} className="flex items-start gap-2.5 rounded-xl border border-slate-700 bg-slate-800/40 px-3 py-2">
              <i className={`${card.icon} mt-0.5 text-sm text-blue-400`} />
              <div>
                <p className="text-[10px] font-bold text-slate-200">{card.title}</p>
                <p className="text-[8.5px] text-slate-500" dangerouslySetInnerHTML={{ __html: card.subtitle }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Pager n={1} dark />
    </Slide>
  )
}

/* ═══════════════════════════════════════════
   2. FeedShop Overview
═══════════════════════════════════════════ */
function FeedShopOverviewSlide() {
  const p = PROJECTS[0]
  return (
    <Slide>
      {/* 상단 헤더 바 */}
      <div className="flex h-12 items-center justify-between bg-[#0f172a] px-8">
        <div className="flex items-center gap-3">
          <span className="text-[8px] font-semibold uppercase tracking-wider text-slate-400">Project 01</span>
          <span className="text-xs font-bold text-white">{p.name}</span>
        </div>
        <div className="flex items-center gap-4 text-[9px] text-slate-400">
          <span>{p.period}</span>
          <span>{p.teamSize}</span>
          <span>{p.contribution}</span>
        </div>
      </div>

      {/* 본문 */}
      <div className="grid h-[calc(210mm-48px)] grid-cols-5 gap-0">
        {/* 서비스 소개 (3/5) */}
        <div className="col-span-3 border-r border-slate-100 px-7 py-5">
          <Label>서비스 소개</Label>
          <p className="mb-4 whitespace-pre-line text-[10.5px] leading-relaxed text-slate-700">
            {p.serviceOverview}
          </p>

          <Label>기술 스택</Label>
          <div className="mb-4 flex flex-wrap gap-1.5">
            {p.techStack.map((t) => (
              <span key={t} className="rounded-full border border-[#1E3A5F]/15 bg-[#f0f4fa] px-2.5 py-0.5 text-[9px] font-semibold text-[#1E3A5F]">{t}</span>
            ))}
          </div>

          <Label>개발자 관점에서의 핵심 과제</Label>
          <div
            className="text-[9.5px] leading-relaxed text-slate-600"
            dangerouslySetInnerHTML={{ __html: p.developerPerspective ?? '' }}
          />
        </div>

        {/* 담당 업무 (2/5) */}
        <div className="col-span-2 bg-slate-50 px-6 py-5">
          <Label>담당 업무</Label>
          <div className="space-y-3">
            {p.roles.map((role) => (
              <div key={role.title} className="rounded-xl border border-slate-200 bg-white p-3">
                <div className="mb-1 flex items-center gap-1.5">
                  <span className="text-base">{role.icon}</span>
                  <p className="text-[10px] font-bold text-slate-900">{role.title}</p>
                </div>
                <p
                  className="whitespace-pre-line text-[8.5px] leading-relaxed text-slate-600"
                  dangerouslySetInnerHTML={{ __html: role.detail }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Pager n={2} />
    </Slide>
  )
}

/* ═══════════════════════════════════════════
   3. FeedShop 문제 해결 1 — 성능 개선
═══════════════════════════════════════════ */
function FeedShopPerformanceSlide() {
  const p = PROJECTS[0]
  const sec = p.problemSections?.[0]
  if (!sec) return null

  const results = [
    { label: '응답시간 V100', before: '645ms', after: '209ms', rate: '-68%' },
    { label: '응답시간 V1000', before: '6,818ms', after: '638ms', rate: '-91%' },
    { label: 'TPS V100', before: '154.6', after: '470.1', rate: '+204%' },
    { label: 'SQL Count', before: '42회', after: '0회', rate: '-100%' },
  ]

  return (
    <Slide>
      <div className="flex h-12 items-center justify-between bg-[#1e3a5f] px-8">
        <div className="flex items-center gap-3">
          <span className="text-[8px] font-semibold uppercase tracking-wider text-blue-300">Project 01 · 문제 해결 1</span>
          <span className="text-xs font-bold text-white">이벤트 목록 조회 성능 개선</span>
        </div>
        <span className="text-[9px] text-blue-300">FeedShop — N+1 쿼리 · 캐시 전략</span>
      </div>

      <div className="grid h-[calc(210mm-48px)] grid-cols-3 gap-0">
        {/* Problem */}
        <div className="border-r border-slate-100 px-6 py-5">
          <Label color="#ef4444">Problem</Label>
          <div
            className="text-[9.5px] leading-relaxed text-slate-700"
            dangerouslySetInnerHTML={{ __html: sec.problem }}
          />
        </div>

        {/* Thinking + Solution */}
        <div className="border-r border-slate-100 px-6 py-5">
          <Label color="#f59e0b">Thinking</Label>
          <div
            className="mb-4 text-[9px] leading-relaxed text-slate-600"
            dangerouslySetInnerHTML={{ __html: sec.thinking }}
          />
          <Label color="#2563EB">Solution</Label>
          <div
            className="text-[9px] leading-relaxed text-slate-600"
            dangerouslySetInnerHTML={{ __html: sec.solution }}
          />
        </div>

        {/* Result */}
        <div className="bg-slate-50 px-6 py-5">
          <Label color="#059669">Result</Label>
          <div className="mb-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-[9px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="px-2.5 py-1.5 text-left text-[8px] font-bold text-slate-500">항목</th>
                  <th className="px-2 py-1.5 text-left text-[8px] font-bold text-slate-500">Before</th>
                  <th className="px-2 py-1.5 text-left text-[8px] font-bold text-slate-500">After</th>
                  <th className="px-2 py-1.5 text-left text-[8px] font-bold text-slate-500">개선율</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r) => (
                  <tr key={r.label} className="border-b border-slate-50">
                    <td className="px-2.5 py-1.5 font-semibold text-slate-800">{r.label}</td>
                    <td className="px-2 py-1.5 text-slate-500">{r.before}</td>
                    <td className="px-2 py-1.5 font-semibold text-blue-600">{r.after}</td>
                    <td className="px-2 py-1.5 font-bold text-emerald-600">{r.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* 핵심 수치 강조 */}
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-center">
              <p className="text-2xl font-extrabold text-emerald-600">91%</p>
              <p className="text-[8.5px] font-semibold text-emerald-700">응답시간 단축</p>
              <p className="text-[7.5px] text-emerald-600">V1000 기준</p>
            </div>
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-3 text-center">
              <p className="text-2xl font-extrabold text-blue-600">-100%</p>
              <p className="text-[8.5px] font-semibold text-blue-700">SQL Count</p>
              <p className="text-[7.5px] text-blue-600">Cache Hit</p>
            </div>
          </div>
        </div>
      </div>
      <Pager n={3} />
    </Slide>
  )
}

/* ═══════════════════════════════════════════
   4. FeedShop 문제 해결 2 — 동시성
═══════════════════════════════════════════ */
function FeedShopConcurrencySlide() {
  const p = PROJECTS[0]
  const sec = p.problemSections?.[1]
  if (!sec) return null

  return (
    <Slide>
      <div className="flex h-12 items-center justify-between bg-[#1e3a5f] px-8">
        <div className="flex items-center gap-3">
          <span className="text-[8px] font-semibold uppercase tracking-wider text-blue-300">Project 01 · 문제 해결 2</span>
          <span className="text-xs font-bold text-white">피드 투표 동시성 문제</span>
        </div>
        <span className="text-[9px] text-blue-300">FeedShop — TOCTOU · Redis INCR</span>
      </div>

      <div className="grid h-[calc(210mm-48px)] grid-cols-3 gap-0">
        <div className="border-r border-slate-100 px-6 py-5">
          <Label color="#ef4444">Problem</Label>
          <div className="text-[9.5px] leading-relaxed text-slate-700" dangerouslySetInnerHTML={{ __html: sec.problem }} />
        </div>
        <div className="border-r border-slate-100 px-6 py-5">
          <Label color="#f59e0b">Thinking</Label>
          <div className="mb-4 text-[9px] leading-relaxed text-slate-600" dangerouslySetInnerHTML={{ __html: sec.thinking }} />
          <Label color="#2563EB">Solution</Label>
          <div className="text-[9px] leading-relaxed text-slate-600" dangerouslySetInnerHTML={{ __html: sec.solution }} />
        </div>
        <div className="bg-slate-50 px-6 py-5">
          <Label color="#059669">Result</Label>
          <div className="mb-4 grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-center">
              <p className="text-2xl font-extrabold text-emerald-600">0%</p>
              <p className="text-[8.5px] font-semibold text-emerald-700">에러율</p>
              <p className="text-[7.5px] text-emerald-600">전 구간</p>
            </div>
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-3 text-center">
              <p className="text-2xl font-extrabold text-blue-600">0건</p>
              <p className="text-[8.5px] font-semibold text-blue-700">중복 투표</p>
              <p className="text-[7.5px] text-blue-600">동시 3,000명</p>
            </div>
          </div>
          <div className="text-[9px] leading-relaxed text-slate-600" dangerouslySetInnerHTML={{ __html: sec.result }} />
        </div>
      </div>
      <Pager n={4} />
    </Slide>
  )
}

/* ═══════════════════════════════════════════
   5. 3M Overview + Problem
═══════════════════════════════════════════ */
function ThreeMSlide() {
  const p = PROJECTS[1]
  const sec = p.problem
  return (
    <Slide>
      <div className="flex h-12 items-center justify-between bg-[#0f172a] px-8">
        <div className="flex items-center gap-3">
          <span className="text-[8px] font-semibold uppercase tracking-wider text-slate-400">Project 02</span>
          <span className="text-xs font-bold text-white">{p.name}</span>
        </div>
        <div className="flex items-center gap-4 text-[9px] text-slate-400">
          <span>{p.period}</span>
          <span>{p.teamSize}</span>
          <span>{p.contribution}</span>
        </div>
      </div>

      <div className="grid h-[calc(210mm-48px)] grid-cols-3 gap-0">
        {/* 서비스 + 기술 */}
        <div className="border-r border-slate-100 px-6 py-5">
          <Label>서비스 소개</Label>
          <p className="mb-3 whitespace-pre-line text-[9.5px] leading-relaxed text-slate-700">{p.serviceOverview}</p>
          <Label>기술 스택</Label>
          <div className="mb-3 flex flex-wrap gap-1">
            {p.techStack.map((t) => (
              <span key={t} className="rounded-full border border-[#1E3A5F]/15 bg-[#f0f4fa] px-2 py-0.5 text-[8.5px] font-semibold text-[#1E3A5F]">{t}</span>
            ))}
          </div>
          <Label>담당 업무</Label>
          <div className="space-y-1.5">
            {p.roles.map((role) => (
              <div key={role.title} className="rounded-lg border border-slate-100 bg-slate-50 px-2.5 py-1.5">
                <p className="text-[9px] font-bold text-slate-800">{role.icon} {role.title}</p>
                <p className="whitespace-pre-line text-[8px] text-slate-500" dangerouslySetInnerHTML={{ __html: role.detail }} />
              </div>
            ))}
          </div>
        </div>

        {/* Problem */}
        <div className="border-r border-slate-100 px-6 py-5">
          <Label color="#ef4444">Problem</Label>
          <div className="mb-4 text-[9.5px] leading-relaxed text-slate-700" dangerouslySetInnerHTML={{ __html: sec ?? '' }} />
          <Label color="#f59e0b">Thinking</Label>
          <div className="text-[9px] leading-relaxed text-slate-600" dangerouslySetInnerHTML={{ __html: p.thinking ?? '' }} />
        </div>

        {/* Solution + Result */}
        <div className="bg-slate-50 px-6 py-5">
          <Label color="#2563EB">Solution</Label>
          <div className="mb-4 text-[9px] leading-relaxed text-slate-600" dangerouslySetInnerHTML={{ __html: p.solution ?? '' }} />
          <Label color="#059669">Result</Label>
          <div className="text-[9px] leading-relaxed text-slate-600" dangerouslySetInnerHTML={{ __html: p.result ?? '' }} />
        </div>
      </div>
      <Pager n={5} />
    </Slide>
  )
}

/* ═══════════════════════════════════════════
   6. Experience
═══════════════════════════════════════════ */
function ExperienceSlide() {
  return (
    <Slide>
      <div className="flex h-12 items-center bg-[#0f172a] px-8">
        <span className="text-xs font-bold text-white">걸어온 여정</span>
      </div>
      <div className="grid h-[calc(210mm-48px)] grid-cols-2 gap-0">
        {/* 경력/교육 */}
        <div className="border-r border-slate-100 px-7 py-5">
          <p className="mb-3 text-[7.5px] font-bold uppercase tracking-[0.18em] text-slate-400">Career & Education</p>
          <div className="space-y-2.5">
            {EXPERIENCE_ITEMS.map((item) => (
              <div key={item.title} className="flex gap-3">
                <div className="mt-0.5 shrink-0">
                  <div className="h-2 w-2 rounded-full bg-blue-500 ring-2 ring-blue-100" />
                </div>
                <div className="flex-1 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2">
                  <div className="mb-0.5 flex items-center justify-between">
                    <p className="text-[10px] font-bold text-slate-900">{item.title}</p>
                    <span className={`rounded-full px-1.5 py-0.5 text-[7.5px] font-semibold ${
                      item.category === '경력' ? 'bg-blue-100 text-blue-700' :
                      item.category === '교육' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>{item.category}</span>
                  </div>
                  <p className="mb-0.5 text-[8px] text-slate-400">{item.period}</p>
                  <p className="text-[9px] leading-relaxed text-slate-600">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing */}
        <div className="px-7 py-5">
          <p className="mb-3 text-[7.5px] font-bold uppercase tracking-[0.18em] text-slate-400">Growth & Philosophy</p>
          <div className="space-y-3">
            {CLOSING_BLOCKS.map((block) => {
              const paragraphs = block.body.split(/\n\n+/).map(p => p.trim())
              return (
                <div key={block.titleKo} className="rounded-xl border border-slate-200 bg-slate-50">
                  <div className="border-b border-slate-100 px-4 py-2">
                    <p className="text-[7.5px] font-bold uppercase tracking-wide text-[#3730a3]">{block.titleEn}</p>
                    <p className="text-[10px] font-bold text-slate-900">{block.titleKo}</p>
                  </div>
                  <div className="space-y-1.5 px-4 py-2">
                    {paragraphs.map((para, i) => (
                      <div
                        key={i}
                        className="rounded-lg border border-slate-100 bg-white px-3 py-1.5 text-[8.5px] leading-relaxed text-slate-600"
                        dangerouslySetInnerHTML={{ __html: para }}
                      />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <Pager n={6} />
    </Slide>
  )
}

/* ═══════════════════════════════════════════
   7. About (3 카드 + 강점)
═══════════════════════════════════════════ */
function AboutSlide() {
  return (
    <Slide>
      <div className="flex h-12 items-center bg-[#1e3a5f] px-8">
        <span className="text-xs font-bold text-white">저는 이렇게 일합니다</span>
      </div>
      <div className="h-[calc(210mm-48px)] px-8 py-6">
        <p className="mb-5 text-center text-[10px] text-slate-500">
          문제는 수치로 파악해 해결하고, 협력은 팀 흐름을 맞춰 정리하며, 맡은 임무는 끝까지 완수합니다.
        </p>
        <div className="grid grid-cols-3 gap-5">
          {ABOUT_CARDS.map((card) => (
            <div key={card.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="mb-3 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EFF6FF]">
                  <i className={`${card.icon} text-[15px] text-[#1E3A5F]`} />
                </div>
                <div>
                  <h3 className="text-[13px] font-extrabold text-slate-900">{card.title}</h3>
                  <p
                    className="text-[8.5px] font-semibold text-[#2563EB]"
                    dangerouslySetInnerHTML={{ __html: card.subtitle }}
                  />
                </div>
              </div>
              <p
                className="whitespace-pre-line text-[9.5px] leading-relaxed text-slate-700"
                dangerouslySetInnerHTML={{ __html: card.description }}
              />
            </div>
          ))}
        </div>
      </div>
      <Pager n={7} />
    </Slide>
  )
}

/* ═══════════════════════════════════════════
   8. 마지막 — 자료 + 연락처
═══════════════════════════════════════════ */
function FinalSlide() {
  return (
    <Slide dark>
      <div className="grid h-full grid-cols-2 divide-x divide-slate-700">
        {/* 자료 */}
        <div className="flex flex-col justify-center px-10 py-8">
          <p className="mb-4 text-[7.5px] font-bold uppercase tracking-[0.18em] text-slate-500">Resources</p>
          <div className="space-y-3">
            {RESOURCE_LINKS.map((link: any) => (
              <div key={link.label} className="flex items-start gap-3 rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-2.5">
                <i className={`${link.icon} mt-0.5 text-sm text-blue-400`} />
                <div>
                  <p className="text-[10px] font-semibold text-slate-200">{link.label}</p>
                  <p className="text-[8.5px] text-slate-500">{link.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 연락처 + 마무리 */}
        <div className="flex flex-col justify-between px-10 py-8">
          <div>
            <p className="mb-4 text-[7.5px] font-bold uppercase tracking-[0.18em] text-slate-500">Contact</p>
            <div className="space-y-2.5">
              {CONTACT_LINKS.map((link: any) => (
                <div key={link.label} className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-2.5">
                  <i className={`${link.icon} text-sm text-blue-400`} />
                  <span className="text-[10px] font-medium text-slate-300">{link.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <p className="text-3xl font-extrabold text-white">{HERO_NAME}</p>
            <p className="mt-1 text-[9px] font-semibold uppercase tracking-widest text-slate-400">{HERO_ROLE_BADGE}</p>
          </div>
        </div>
      </div>
      <Pager n={8} dark />
    </Slide>
  )
}

/* ═══════════════════════════════════════════
   메인 export
═══════════════════════════════════════════ */
export default function PdfPortfolio() {
  return (
    <div>
      <CoverSlide />
      <FeedShopOverviewSlide />
      <FeedShopPerformanceSlide />
      <FeedShopConcurrencySlide />
      <ThreeMSlide />
      <ExperienceSlide />
      <AboutSlide />
      <FinalSlide />
    </div>
  )
}
