import { useDarkMode } from '@/hooks/useDarkMode'
import { PROJECTS } from '@/mocks/projects'

const OVERVIEW_PROJECTS = [
  {
    name: 'FeedShop',
    badge: 'B2C PLATFORM',
    badgeColor: 'bg-[#2563EB]',
    icon: 'ri-shopping-bag-line',
    iconColor: 'text-[#2563EB]',
    description:
      '\'나라면 이 쇼핑몰 쓸까?\'라는 질문에서 출발한 커뮤니티형 패션 커머스 플랫폼입니다. 피드 공유·투표·이벤트로 유저가 스스로 활동하며 재방문하는 선순환 구조를 설계했습니다.',
    tech: ['SpringBoot', 'QueryDSL', 'Redis', 'MySQL', 'GCP'],
    challenge: 'N+1 쿼리 최적화(응답시간 91% 단축)와 투표 동시성(TOCTOU) 문제 해결에 집중했습니다.',
    challengeIcon: 'ri-settings-3-line',
  },
  {
    name: '3M',
    badge: 'B2B LOGISTICS',
    badgeColor: 'bg-[#2563EB]',
    icon: 'ri-truck-line',
    iconColor: 'text-[#2563EB]',
    description:
      '허브 센터 기반 B2B 물류 관리 시스템입니다. Auth·User·Gateway 도메인을 전담하며 서비스 간 의존성을 최소화하는 MSA 인증 구조를 설계했습니다.',
    tech: ['Spring Cloud', 'Gateway', 'Eureka', 'JWT', 'PostgreSQL'],
    challenge: '인증·사용자 책임 혼재 문제를 SRP로 분리하고, JWT payload 활용으로 서비스 간 User 재조회 없는 인증 구조를 구현했습니다.',
    challengeIcon: 'ri-shield-check-line',
  },
]

export default function ProjectsOverview() {
  const { dark } = useDarkMode()
  const testEnvironment = PROJECTS.find((project) => project.problemEnvironment)?.problemEnvironment

  return (
    <div className={`projects-overview ${dark ? 'bg-[#2a2a2a]' : 'bg-[#F8F9FA]'} px-6 pb-10 md:pb-12`}>
      <div className="mx-auto max-w-6xl">
        {/* 헤더 */}
        <div className={`projects-overview-header mb-5 border-b pb-5 ${dark ? 'border-dashed border-[#3a3a3a]' : 'border-dashed border-blue-200'}`}>
          <div className="flex items-center gap-3">
            <h2 className={`text-2xl font-extrabold ${dark ? 'text-[#e8e8e8]' : 'text-[#0f172a]'}`}>
              프로젝트 <span className="text-[#2563EB]">개요</span>
            </h2>
          </div>
          <p className={`mt-2 ml-4 text-sm ${dark ? 'text-[#888]' : 'text-gray-500'}`}>
            기술 선택의 이유와 목적에 집중하는 개발 태도를 담은 핵심 프로젝트 요약
          </p>
        </div>

        {/* 프로젝트 카드 2개 */}
        <div className="projects-overview-grid grid grid-cols-1 gap-6 md:grid-cols-2">
          {OVERVIEW_PROJECTS.map((project) => (
            <div
              key={project.name}
              className={`projects-overview-card rounded-2xl border p-6 ${
                dark
                  ? 'border-[#3d3d3d] bg-[#2a2a2a]'
                  : 'border-gray-200 bg-white'
              }`}
            >
              {/* 아이콘 + 배지 */}
              <div className="mb-4 flex items-center justify-between">
                <i className={`${project.icon} ${project.iconColor} text-2xl`} />
                <span className={`rounded-full px-3 py-1 text-xs font-bold text-white ${project.badgeColor}`}>
                  {project.badge}
                </span>
              </div>

              {/* 프로젝트명 */}
              <h3 className={`mb-3 text-2xl font-extrabold ${dark ? 'text-[#e8e8e8]' : 'text-[#0f172a]'}`}>
                {project.name}
              </h3>

              {/* 설명 */}
              <p className={`mb-4 text-sm leading-relaxed ${dark ? 'text-[#a0a0a0]' : 'text-gray-600'}`}>
                {project.description}
              </p>

              {/* 기술 스택 칩 */}
              <div className="mb-4 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className={`rounded border px-2.5 py-0.5 font-mono text-xs ${
                      dark
                        ? 'border-[#444] bg-[#333] text-[#b0b0b0]'
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* 핵심 과제 */}
              <div className={`rounded-xl p-4 ${dark ? 'bg-[#1e1e1e]' : 'bg-gray-50'}`}>
                <div className="mb-1.5 flex items-center gap-2">
                  <i className={`${project.challengeIcon} text-sm ${dark ? 'text-[#888]' : 'text-gray-500'}`} />
                  <span className={`text-sm font-bold ${dark ? 'text-[#c8c8c8]' : 'text-gray-700'}`}>핵심 과제</span>
                </div>
                <p className={`text-sm leading-relaxed ${dark ? 'text-[#909090]' : 'text-gray-600'}`}>
                  {project.challenge}
                </p>
              </div>
            </div>
          ))}
        </div>

        {testEnvironment ? (
          <div
            className={`projects-overview-environment mt-5 rounded-xl border px-4 py-3 text-sm ${
              dark
                ? 'border-[#333333] bg-[#1e1e1e] text-[#9a9a9a]'
                : 'border-slate-200 bg-white text-slate-500'
            }`}
          >
            <span className={`mr-2 font-semibold ${dark ? 'text-[#d0d0d0]' : 'text-slate-700'}`}>
              🖥️ 로컬 테스트 환경
            </span>
            <span className="whitespace-pre-line">{testEnvironment}</span>
          </div>
        ) : null}
      </div>
    </div>
  )
}
