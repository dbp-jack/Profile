import { ABOUT_CARDS, CONTACT_LINKS, CLOSING_BLOCKS, EXPERIENCE_ITEMS, HERO_NAME, HERO_PERSONAL_INFO, HERO_ROLE_BADGE, HERO_ROLE_TITLE, HERO_SKILL_TAGS, RESOURCE_LINKS } from '@/content/portfolio'
import { PROJECTS } from '@/mocks/projects'

/* ── 한 슬라이드 = A4 가로 1페이지 ── */
function Slide({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`pdf-slide relative overflow-hidden bg-white ${className}`}
      style={{ width: '297mm', height: '210mm', pageBreakAfter: 'always', breakAfter: 'page' }}
    >
      {children}
    </div>
  )
}

/* 페이지 우측 상단 번호 */
function PageNum({ n }: { n: number }) {
  return (
    <div className="absolute right-6 top-4 text-xs font-medium text-slate-300">{n}</div>
  )
}

/* 공통 섹션 헤더 */
function SlideHeader({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-4">
      <p className="mb-0.5 text-[8px] font-semibold uppercase tracking-[0.2em] text-[#2563EB]">{kicker}</p>
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
    </div>
  )
}

/* ════════════════ 1. Hero ════════════════ */
function HeroSlide() {
  return (
    <Slide>
      {/* 상단 navy 바 */}
      <div className="h-1.5 w-full bg-[#1E3A5F]" />
      <div className="flex h-[calc(210mm-6px)] flex-col justify-between px-10 py-7">
        {/* 본문 */}
        <div className="flex flex-1 items-center gap-10">
          {/* 프로필 사진 */}
          <div className="shrink-0">
            <img
              src={`${__BASE_PATH__}profile-photo.png`}
              alt="프로필"
              className="h-36 w-28 rounded-2xl object-cover shadow-md"
            />
          </div>

          {/* 텍스트 */}
          <div className="flex-1">
            <span className="mb-2 inline-block rounded-full border border-[#1E3A5F]/30 bg-[#f0f4fa] px-3 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-[#1E3A5F]">
              {HERO_ROLE_BADGE}
            </span>
            <h1 className="mb-1 text-5xl font-extrabold tracking-tight text-slate-900">{HERO_NAME}</h1>
            <p className="mb-5 text-sm leading-relaxed text-slate-600">{HERO_ROLE_TITLE}</p>

            {/* 연락처 */}
            <ul className="space-y-1.5">
              {HERO_PERSONAL_INFO.map((item) => (
                <li key={item.text} className="flex items-center gap-2 text-xs text-slate-600">
                  <i className={`${item.icon} text-[#2563EB]`} />
                  {item.href ? (
                    <a href={item.href} className="underline-offset-2 hover:underline">{item.text}</a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* 기술 스택 */}
          <div className="w-44 shrink-0 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="mb-2.5 text-[8px] font-semibold uppercase tracking-[0.15em] text-[#2563EB]">기술 스택</p>
            <div className="flex flex-wrap gap-1.5">
              {HERO_SKILL_TAGS.map((tag) => (
                <span key={tag} className="rounded-full border border-[#1E3A5F]/15 bg-white px-2 py-0.5 text-[9px] font-medium text-[#1E3A5F]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 하단 강조 문구 */}
        <div className="border-t border-slate-100 pt-4">
          <p className="text-center text-[10px] font-medium text-slate-400">
            성능 병목을 수치로 분석·해결하고, 팀 협업 구조를 직접 설계합니다.
          </p>
        </div>
      </div>
      <PageNum n={1} />
    </Slide>
  )
}

/* ════════════════ 2. About ════════════════ */
function AboutSlide() {
  return (
    <Slide>
      <div className="h-1.5 w-full bg-[#1E3A5F]" />
      <div className="px-10 py-7">
        <SlideHeader kicker="About" title="저는 이렇게 일합니다" />
        <p className="mb-5 text-[10px] text-slate-500">문제는 수치로 파악해 해결하고, 협력은 팀 흐름을 맞춰 정리하며, 맡은 임무는 끝까지 완수합니다.</p>
        <div className="grid grid-cols-3 gap-4">
          {ABOUT_CARDS.map((card) => (
            <div key={card.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#EFF6FF]">
                  <i className={`${card.icon} text-sm text-[#1E3A5F]`} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{card.title}</h3>
                  <p
                    className="text-[8px] font-semibold uppercase tracking-wide text-[#2563EB]"
                    dangerouslySetInnerHTML={{ __html: card.subtitle }}
                  />
                </div>
              </div>
              <p
                className="whitespace-pre-line text-[10px] leading-relaxed text-slate-700"
                dangerouslySetInnerHTML={{ __html: card.description }}
              />
            </div>
          ))}
        </div>
      </div>
      <PageNum n={2} />
    </Slide>
  )
}

/* ════════════════ 3. Project Overview ════════════════ */
function ProjectsHeaderSlide() {
  return (
    <Slide className="flex flex-col items-center justify-center bg-[#0f172a] text-white">
      <div className="text-center">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#8aa8e8]">Projects</p>
        <h2 className="mb-4 text-4xl font-extrabold">이렇게 만들었습니다</h2>
        <p className="mb-8 text-sm text-slate-400">각 프로젝트는 무엇을 만들었는지보다, 왜 그렇게 만들었는지에 집중합니다.</p>
        <div className="flex justify-center gap-8">
          {PROJECTS.map((p, i) => (
            <div key={p.name} className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-center">
              <p className="text-[9px] text-slate-400">Project {i + 1}</p>
              <p className="text-xs font-semibold text-white">{p.name.split('|')[0].trim()}</p>
              <p className="text-[9px] text-slate-400">{p.period}</p>
            </div>
          ))}
        </div>
      </div>
      <PageNum n={3} />
    </Slide>
  )
}

/* ════════════════ 4+. 프로젝트 슬라이드 ════════════════ */
function ProjectOverviewSlide({ project, pageNum }: { project: typeof PROJECTS[number]; pageNum: number }) {
  const nameParts = project.name.split('|')
  const projectTitle = nameParts[0].trim()
  const projectSub = nameParts[1]?.trim() ?? ''

  return (
    <Slide>
      <div className="h-1.5 w-full bg-[#1E3A5F]" />
      <div className="flex h-[calc(210mm-6px)] flex-col px-10 py-6">
        {/* 헤더 */}
        <div className="mb-4 flex items-start justify-between">
          <div>
            <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#2563EB]">{projectSub}</p>
            <h2 className="text-xl font-extrabold text-slate-900">{projectTitle}</h2>
            <p className="text-[10px] text-slate-500">{project.period} | {project.teamSize}{project.contribution ? ` | ${project.contribution}` : ''}</p>
          </div>
          {/* 기술 스택 */}
          <div className="flex flex-wrap justify-end gap-1">
            {project.techStack.map((t) => (
              <span key={t} className="rounded-full border border-[#1E3A5F]/15 bg-[#f0f4fa] px-2 py-0.5 text-[8px] font-medium text-[#1E3A5F]">{t}</span>
            ))}
          </div>
        </div>

        <div className="grid flex-1 grid-cols-2 gap-4">
          {/* 서비스 소개 */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="mb-1.5 text-[8px] font-semibold uppercase tracking-wide text-[#2563EB]">서비스 소개</p>
            <p className="whitespace-pre-line text-[10px] leading-relaxed text-slate-700">{project.serviceOverview}</p>
          </div>

          {/* 담당 업무 */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="mb-1.5 text-[8px] font-semibold uppercase tracking-wide text-[#2563EB]">담당 업무</p>
            <ul className="space-y-1.5">
              {project.roles.map((role) => (
                <li key={role.title} className="flex gap-2">
                  <span className="mt-0.5 shrink-0 text-sm">{role.icon}</span>
                  <div>
                    <p className="text-[10px] font-bold text-slate-900">{role.title}</p>
                    <p
                      className="whitespace-pre-line text-[9px] leading-relaxed text-slate-600"
                      dangerouslySetInnerHTML={{ __html: role.detail }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <PageNum n={pageNum} />
    </Slide>
  )
}

/* 아키텍처 슬라이드 */
function ProjectArchSlide({ project, pageNum }: { project: typeof PROJECTS[number]; pageNum: number }) {
  if (!project.architectureImage) return null
  return (
    <Slide>
      <div className="h-1.5 w-full bg-[#1E3A5F]" />
      <div className="flex h-[calc(210mm-6px)] flex-col px-10 py-6">
        <p className="mb-2 text-[8px] font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
          {project.name.split('|')[0].trim()} — 아키텍처
        </p>
        <div className="relative flex-1">
          <img
            src={`${__BASE_PATH__}${project.architectureImage.replace(/^\//, '')}`}
            alt="아키텍처"
            className="h-full w-full rounded-xl border border-slate-200 object-contain"
          />
          <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded border-2 border-[#2563EB] bg-white/90 px-2 py-1">
            <span className="h-3 w-3 rounded-sm border-2 border-[#2563EB]" />
            <span className="text-[8px] font-semibold text-[#2563EB]">맡은 작업</span>
          </div>
        </div>
      </div>
      <PageNum n={pageNum} />
    </Slide>
  )
}

/* 개발자 관점 + 핵심 성과 슬라이드 */
function ProjectPerspectiveSlide({ project, pageNum }: { project: typeof PROJECTS[number]; pageNum: number }) {
  const firstSection = project.problemSections?.[0]
  return (
    <Slide>
      <div className="h-1.5 w-full bg-[#1E3A5F]" />
      <div className="flex h-[calc(210mm-6px)] flex-col px-10 py-6">
        <p className="mb-3 text-[8px] font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
          {project.name.split('|')[0].trim()} — 개발자 관점 & 핵심 성과
        </p>
        <div className="grid flex-1 grid-cols-2 gap-4">
          {/* 개발자 관점 */}
          {project.developerPerspective && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="mb-1.5 text-[8px] font-semibold uppercase tracking-wide text-[#2563EB]">개발자 관점에서의 핵심 과제</p>
              <div
                className="text-[9px] leading-relaxed text-slate-700"
                dangerouslySetInnerHTML={{ __html: project.developerPerspective }}
              />
            </div>
          )}

          {/* 핵심 성과 요약 */}
          <div className="flex flex-col gap-3">
            {firstSection && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="mb-1.5 text-[8px] font-semibold uppercase tracking-wide text-[#2563EB]">{firstSection.headline}</p>
                <div
                  className="text-[9px] leading-relaxed text-slate-700"
                  dangerouslySetInnerHTML={{ __html: firstSection.result }}
                />
              </div>
            )}
            {project.problemSections?.[1] && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="mb-1.5 text-[8px] font-semibold uppercase tracking-wide text-[#2563EB]">{project.problemSections[1].headline}</p>
                <div
                  className="text-[9px] leading-relaxed text-slate-700"
                  dangerouslySetInnerHTML={{ __html: project.problemSections[1].result }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <PageNum n={pageNum} />
    </Slide>
  )
}

/* ════════════════ Experience ════════════════ */
function ExperienceSlide({ pageNum }: { pageNum: number }) {
  return (
    <Slide>
      <div className="h-1.5 w-full bg-[#1E3A5F]" />
      <div className="px-10 py-7">
        <SlideHeader kicker="Experience" title="걸어온 여정" />
        <div className="space-y-3">
          {EXPERIENCE_ITEMS.map((item) => (
            <div key={item.title} className="flex gap-4 rounded-xl border border-slate-100 bg-slate-50 px-4 py-2.5">
              <div className="w-24 shrink-0">
                <p className="text-[9px] text-slate-400">{item.period}</p>
                <span className={`mt-0.5 inline-block rounded-full px-1.5 py-0.5 text-[8px] font-semibold ${
                  item.category === '경력' ? 'bg-blue-100 text-blue-700' :
                  item.category === '교육' ? 'bg-emerald-100 text-emerald-700' :
                  'bg-amber-100 text-amber-700'
                }`}>{item.category}</span>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">{item.title}</p>
                <p className="text-[10px] leading-relaxed text-slate-600">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <PageNum n={pageNum} />
    </Slide>
  )
}

/* ════════════════ Closing ════════════════ */
function ClosingSlide({ pageNum }: { pageNum: number }) {
  return (
    <Slide>
      <div className="h-1.5 w-full bg-[#1E3A5F]" />
      <div className="px-10 py-7">
        <SlideHeader kicker="Closing" title="앞으로의 방향" />
        <div className="grid grid-cols-2 gap-4">
          {CLOSING_BLOCKS.map((block) => {
            const paragraphs = block.body.split(/\n\n+/).map(p => p.trim())
            return (
              <div key={block.titleKo} className="rounded-2xl border border-slate-200 bg-slate-50">
                <div className="border-b border-slate-100 px-4 py-3">
                  <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-[#3730a3]">{block.titleEn}</p>
                  <h3 className="text-sm font-extrabold text-slate-900">{block.titleKo}</h3>
                </div>
                <div className="space-y-2 px-4 py-3">
                  {paragraphs.map((para, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[9px] leading-relaxed text-slate-700"
                      dangerouslySetInnerHTML={{ __html: para }}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <PageNum n={pageNum} />
    </Slide>
  )
}

/* ════════════════ 마지막: 자료 + 연락처 ════════════════ */
function FinalSlide({ pageNum }: { pageNum: number }) {
  return (
    <Slide>
      <div className="h-1.5 w-full bg-[#1E3A5F]" />
      <div className="grid h-[calc(210mm-6px)] grid-cols-2 divide-x divide-slate-100">
        {/* 자료 모음 */}
        <div className="px-10 py-7">
          <SlideHeader kicker="Links" title="자료 모음" />
          <div className="space-y-2.5">
            {RESOURCE_LINKS.map((link) => (
              <div key={link.label} className="flex items-start gap-2.5 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2">
                <i className={`${link.icon} mt-0.5 text-sm text-[#2563EB]`} />
                <div>
                  <p className="text-[10px] font-semibold text-slate-900">{link.label}</p>
                  <p className="text-[9px] text-slate-500">{link.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 연락처 */}
        <div className="flex flex-col justify-between px-10 py-7">
          <div>
            <SlideHeader kicker="Contact" title="연락하기" />
            <p className="mb-4 text-[10px] text-slate-500">아래 채널로 편하게 연락주세요.</p>
            <div className="space-y-2.5">
              {CONTACT_LINKS.map((link) => (
                <div key={link.label} className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5">
                  <i className={`${link.icon} text-base text-slate-500`} />
                  <span className="text-[10px] font-medium text-slate-700">{link.label}</span>
                </div>
              ))}
            </div>
          </div>
          {/* 하단 서명 */}
          <div className="border-t border-slate-100 pt-4 text-center">
            <p className="text-[10px] font-bold text-slate-900">{HERO_NAME}</p>
            <p className="text-[8px] text-slate-400">{HERO_ROLE_BADGE}</p>
          </div>
        </div>
      </div>
      <PageNum n={pageNum} />
    </Slide>
  )
}

/* ════════════════ 메인 export ════════════════ */
export default function PdfPortfolio() {
  let page = 3 // Hero=1, About=2, ProjectsHeader=3
  const p1Page = ++page  // 4
  const p1Arch = ++page  // 5
  const p1Persp = ++page // 6
  const p2Page = ++page  // 7
  const p2Arch = ++page  // 8
  const p2Persp = ++page // 9
  const expPage = ++page // 10
  const closePage = ++page // 11
  const finalPage = ++page // 12

  return (
    <div>
      <HeroSlide />
      <AboutSlide />
      <ProjectsHeaderSlide />
      <ProjectOverviewSlide project={PROJECTS[0]} pageNum={p1Page} />
      {PROJECTS[0].architectureImage && <ProjectArchSlide project={PROJECTS[0]} pageNum={p1Arch} />}
      <ProjectPerspectiveSlide project={PROJECTS[0]} pageNum={p1Persp} />
      <ProjectOverviewSlide project={PROJECTS[1]} pageNum={p2Page} />
      {PROJECTS[1].architectureImage && <ProjectArchSlide project={PROJECTS[1]} pageNum={p2Arch} />}
      <ProjectPerspectiveSlide project={PROJECTS[1]} pageNum={p2Persp} />
      <ExperienceSlide pageNum={expPage} />
      <ClosingSlide pageNum={closePage} />
      <FinalSlide pageNum={finalPage} />
    </div>
  )
}
