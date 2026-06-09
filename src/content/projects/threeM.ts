import type { ProjectData } from './types'

export const threeMProject: ProjectData = {
    name: '3M - B2B | 물류 관리 및 배송 시스템',
    period: '2025.03 – 2025.04',
    teamSize: '4명 / 팀장',
    contribution: '기여도 약 35%',
    description:
      '지역 허브 기반 주문·배송과 인증 경로를 안정적으로 연결하는 B2B 물류 관리 시스템',
    architectureImage: '/m3_infra.png',
    architectureOwnershipLabel: '전체 아키텍처 직접 구성',
    architectureDetails: [
      {
        title: 'Docker Compose',
        items: [
          {
            bullets: [
              '각 서비스(Gateway·Eureka·각 마이크로서비스·PostgreSQL·Redis·Zipkin)를 단일 파일로 통합 구성',
              'Actuator 헬스체크로 각 서비스 상태를 자동 모니터링',
            ],
          },
        ],
      },
      {
        title: 'Eureka',
        items: [
          {
            bullets: [
              '서비스 디스커버리 서버 구성 - 모든 서비스가 기동 시 Eureka에 자동 등록',
              '모든 서비스 기동 시 서비스 간 직접 의존 없이 이름 기반으로 통신',
            ],
          },
        ],
      },
      {
        title: 'Gateway',
        items: [
          {
            bullets: [
              '단일 진입점에서 JWT 검증 후 X-User-* 헤더로 사용자 컨텍스트 전달',
              '각 서비스의 인증 의존성을 Gateway로 집중해 중복 인증 로직 제거',
            ],
          },
        ],
      },
    ],
    serviceOverview:
      '업체 → 허브 → 배송 담당자로 이어지는 <span class="font-bold">B2B 물류 흐름을 통합 관리하는 플랫폼</span>입니다.\n다수의 기업·허브·배송 담당자가 함께 사용하는 구조 특성상 인증과 권한 관리를 핵심이었으며,\nAuth·User·Gateway 도메인을 전담하며, 서비스 간 의존성을 최소화하는 인증 구조를 설계했습니다.',
    developerPerspective:
      'B2B 물류 시스템은 여러 서비스가 인증 흐름에 함께 연결되는 구조라,\n인증 정책 변경과 사용자 조회 방식이 전체 서비스 안정성에 직접 영향을 줄 수 있었습니다.<ul class="mt-3 space-y-2 list-none pl-0"><li class="flex gap-2"><span class="mt-1 text-slate-400">•</span><span><span class="font-semibold text-red-500 dark:text-red-400">인증·사용자 책임 혼재</span> - 인증 정책 변경 시 User 도메인까지 배포 영향 확산</span></li><li class="flex gap-2"><span class="mt-1 text-slate-400">•</span><span><span class="font-semibold text-red-500 dark:text-red-400">매 요청마다 User 서비스 재조회</span> - 서비스 간 결합도 증가, User 장애 시 인증 흐름 전체에 영향을 미치는 <span class="font-semibold text-red-500 dark:text-red-400">단일 장애점(SPOF)</span> 구조</span></li></ul><div class="mt-3 font-semibold text-amber-600 dark:text-amber-300">👉 <span class="font-semibold text-[#2563EB] dark:text-[#8aa8e8]">SRP</span> 중심으로 책임을 분리하고, JWT payload에 <span class="font-mono font-semibold text-[#2563EB] dark:text-[#8aa8e8]">userId·role</span>을 포함해 이후 요청은 <span class="font-semibold text-[#2563EB] dark:text-[#8aa8e8]">Gateway에서 직접 권한 판단</span>하도록 설계했습니다.</div>',
    techStack: ['SpringBoot', 'JWT', 'Spring Cloud Gateway', 'PostgreSQL', 'Redis', 'Docker', 'JIRA'],
    roles: [
      {
        icon: '🧱',
        title: '책임 경계 설계/인증 흐름 구현',
        detail: 'SRP 중심으로 인증 / 유저 / 게이트웨이 역할 분리\nJWT 발급 및 Gateway 필터 기반 토큰 검증, AOP 기반 권한 제어 구현',
      },
      {
        icon: '🐳',
        title: '인프라 통합',
        detail: 'Docker Compose 기반 모듈·Redis·DB·Eureka 통합 구성',
      },
      {
        icon: '👥',
        title: '팀장 | 팀 리딩',
        detail: 'JIRA 애자일 기반 협업 진행, 스프린트·우선순위 조율',
      },
    ],
    problemHeadline: '인증 구조 설계 및 서비스 경계 문제',
    problem:
          '인증(Auth)과 사용자(User) 책임이 강하게 결합되어, 인증 정책 변경과 사용자 조회 장애가<br/>전체 인증 흐름에 영향을 줄 수 있는 구조였습니다.<ul class="mt-3 space-y-2 list-none pl-0"><li class="flex gap-2"><span class="mt-1 text-slate-400">•</span><span>인증 정책 변경 시 User 도메인까지 <span class="font-semibold text-red-600 dark:text-red-300">배포 영향 확산</span>, 매 요청마다 User 서비스 재조회로 <span class="font-semibold text-red-600 dark:text-red-300">서비스 간 호출 의존 증가</span></span></li><li class="flex gap-2"><span class="mt-1 text-slate-400">•</span><span>User 장애 시 인증 흐름 전체에 영향을 미치는 <span class="font-semibold text-red-600 dark:text-red-300">단일 장애점(SPOF)</span> 구조</span></li></ul>',
    thinking:
      '문제를 두 레이어로 분리해 접근했습니다.<div class="mt-3 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 dark:border-[#3f3f45] dark:bg-[#2f2f34]"><div class="font-semibold text-slate-800 dark:text-slate-100">1. 모듈 경계 혼재 → 책임 기준으로 Auth/User 분리 필요</div><div class="mt-2 font-semibold text-slate-800 dark:text-slate-100">2. 런타임 재호출 → 토큰 컨텍스트로 User 호출 자체를 줄이는 구조 필요</div></div><div class="mt-3 flex items-start gap-3"><span class="rounded-md bg-blue-100 px-2.5 py-1 text-sm font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">Auth</span><span class="min-w-0 pt-0.5">인증 정책 변경 시 영향이 Auth·Gateway로 수렴하도록 경계 설계<div class="mt-1 text-sm text-slate-500 dark:text-slate-400">(변경 주기와 장애 영향이 다른 인증·사용자 책임을 같은 모듈에 두지 않도록 분리)</div></span></div><div class="mt-2 flex items-start gap-3"><span class="rounded-md bg-blue-100 px-2.5 py-1 text-sm font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">User 재호출</span><span class="min-w-0 pt-0.5">로그인 시점, 컨텍스트를 토큰에 포함 → 이후 요청은 경로에서 재조회 없이 권한 판단<div class="mt-1 text-sm text-slate-500 dark:text-slate-400">(추가 정보가 필요한 경우에만 User 서비스 선택 호출)</div></span></div><div class="mt-3 font-semibold text-amber-600 dark:text-amber-300">👉 책임 경계 분리와 인증 흐름 단순화를 함께 가져가야 한다고 판단</div>',
    solution:
          '<div class="space-y-3"><div class="rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 dark:border-[#3f3f45] dark:bg-[#2f2f34]"><div class="text-lg font-extrabold text-slate-900 dark:text-slate-100">1단계 — 서비스 경계 분리</div><div class="mt-2 space-y-1 text-base leading-relaxed text-slate-800 dark:text-slate-200"><div>인증은 <span class="rounded-md bg-slate-200/80 px-2 py-0.5 font-mono text-sm dark:bg-[#3a3a45]">Auth</span> 모듈, 사용자 관리는 <span class="rounded-md bg-slate-200/80 px-2 py-0.5 font-mono text-sm dark:bg-[#3a3a45]">User</span> 모듈로 분리 → 서비스 경계 명확화</div><div><span class="rounded-md bg-slate-200/80 px-2 py-0.5 font-mono text-sm dark:bg-[#3a3a45]">Auth</span> 로그인/회원가입 처리 후, JWT(access/refresh) 발급, 토큰에 <span class="rounded-md bg-slate-200/80 px-2 py-0.5 font-mono text-sm dark:bg-[#3a3a45]">userId · role</span> 포함</div></div><div class="mt-4"><img loading="lazy" src="3m-auth-user-class-diagram.png" alt="Auth/User 도메인 분리 클래스 구조" class="w-full rounded-lg border border-slate-200 object-contain dark:border-[#4a4a52]"/><p class="mt-1.5 text-right text-xs text-slate-500 dark:text-slate-400">Auth/User 도메인 분리 클래스 구조 — Auth는 인증에 필요한 최소 정보만 보관, Feign으로 단방향 통신</p></div></div><div class="rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 dark:border-[#3f3f45] dark:bg-[#2f2f34]"><div class="text-lg font-extrabold text-slate-900 dark:text-slate-100">2단계 — 인증 흐름 단순화</div><div class="mt-2 space-y-1 text-base leading-relaxed text-slate-800 dark:text-slate-200"><div>Gateway 인증 필터에서 JWT 검증 후 <span class="rounded-md bg-slate-200/80 px-2 py-0.5 font-mono text-sm dark:bg-[#3a3a45]">X-User-*</span> 헤더로 사용자 컨텍스트 전달</div><div><span class="rounded-md bg-slate-200/80 px-2 py-0.5 font-mono text-sm dark:bg-[#3a3a45]">User</span> 서비스 재호출 없이 Gateway에서 권한 판단, 추가 정보 필요 시에만 선택 호출</div><div>권한 검증은 AOP(<span class="rounded-md bg-slate-200/80 px-2 py-0.5 font-mono text-sm dark:bg-[#3a3a45]">@RequiresMasterRole</span>)로 분리 → 역할 체크 로직 통합</div></div></div></div>',
    result:
          '<ul class="space-y-2 list-none pl-0"><li class="flex gap-2"><span class="mt-1 text-slate-400">•</span><span>UserService → Auth 도메인 <span class="font-semibold text-emerald-600 dark:text-emerald-400">결합도(CBO) 0건</span> — 인증 정책 변경 시 User 모듈 배포 영향 제거</span></li><li class="flex gap-2"><span class="mt-1 text-slate-400">•</span><span>Auth → User 의존은 Feign 호출용 DTO 중심의 단방향 참조로 제한 — <span class="font-semibold text-emerald-600 dark:text-emerald-400">순환 의존 없음</span></span></li><li class="flex gap-2"><span class="mt-1 text-slate-400">•</span><span>인증 정책·사용자 정책 변경 범위를 각 모듈로 수렴, 한 도메인 수정이 다른 도메인 배포로 이어지지 않는 구조 확보</span></li></ul><p class="mt-3 text-xs text-slate-500 dark:text-slate-400">※ CBO: 소스 코드 import 정적 분석으로 측정 — 실제 코드에서 참조된 외부 클래스 수 기준</p>',
    githubUrl: 'https://github.com/sparta-i4u/sparta-msa',
    wikiUrl: 'https://github.com/sparta-i4u/sparta-msa/wiki',
  }
