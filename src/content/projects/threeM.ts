import type { ProjectData } from './types'

export const threeMProject: ProjectData = {
    name: '3M - B2B | 물류 관리 및 배송 시스템',
    period: '2025.03 – 2025.04',
    teamSize: '4명 / 팀장',
    contribution: '기여도 약 35%',
    description:
      '지역 허브 기반 주문·배송과 인증 경로를 안정적으로 연결하는 B2B 물류 관리 시스템',
    architectureImage: '/m3_infra.png',
    architectureDetails: [
      {
        title: 'Docker Compose',
        items: [
          {
            bullets: [
              '10개 이상의 서비스(Gateway·Eureka·각 마이크로서비스·독립 PostgreSQL·Redis·Zipkin)를 단일 파일로 통합 구성',
              '각 서비스마다 Actuator 헬스체크를 설정해 상태를 자동 모니터링하고, depends_on + wait-for-it.sh로 Eureka → Gateway → 각 서비스 순의 기동 순서를 제어',
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
              '모든 서비스가 기동 시 Eureka에 자동 등록되어 서비스 간 직접 의존 없이 통신',
            ],
          },
        ],
      },
      {
        title: 'Gateway',
        items: [
          {
            bullets: [
              '단일 진입점으로 JWT 검증 후 X-User-* 헤더로 사용자 컨텍스트 전달, 각 서비스의 인증 의존성 제거',
            ],
          },
        ],
      },
    ],
    serviceOverview:
      '허브 센터 기반 B2B 물류 관리 및 배송 시스템\n업체 → 허브 → 배송 담당자로 이어지는 물류 흐름을 통합 관리하는 플랫폼입니다.\n다수의 기업·허브·배송 담당자가 사용하는 구조 특성상 인증과 권한 관리가 핵심이었으며,\nAuth·User·Gateway 도메인을 전담하며 서비스 간 의존성을 최소화하는 인증 구조를 설계했습니다.',
    developerPerspective:
      'B2B 물류 시스템은 다수의 서비스가 연계되는 구조로 두 가지 핵심 과제가 있었습니다.<ul class="mt-3 space-y-2 list-none pl-0"><li class="flex gap-2"><span class="mt-1 text-slate-400">•</span><span><span class="font-semibold text-red-500 dark:text-red-400">인증·사용자 책임 혼재</span> — 인증 정책 변경 시 User 도메인까지 배포 단위로 엮임</span></li><li class="flex gap-2"><span class="mt-1 text-slate-400">•</span><span><span class="font-semibold text-red-500 dark:text-red-400">매 요청마다 User 서비스 재조회</span> — 서비스 간 결합도 증가, User 장애 시 인증 전체에 영향을 미치는 <span class="font-semibold text-red-500 dark:text-red-400">단일 장애점(SPOF)</span> 구조</span></li></ul><div class="mt-3 font-semibold text-amber-600 dark:text-amber-300">👉 <span class="font-semibold text-[#2563EB] dark:text-[#8aa8e8]">SRP</span> 기준으로 변경 이유가 다른 두 책임을 분리하고, JWT payload에 <span class="font-mono font-semibold text-[#2563EB] dark:text-[#8aa8e8]">userId·role</span>을 포함해 이후 요청은 User 재조회 없이 <span class="font-semibold text-[#2563EB] dark:text-[#8aa8e8]">Gateway에서 직접 처리</span>하는 구조를 선택했습니다.</div>',
    techStack: ['SpringBoot', 'Spring Cloud Gateway', 'JWT', 'Redis', 'PostgreSQL', 'Docker', 'JIRA'],
    roles: [
      {
        icon: '🧱',
        title: '책임 경계 설계 / 인증 흐름 구현',
        detail: 'SRP 중심으로 Auth / User / Gateway 역할 분리\nJWT 발급 및 Gateway 필터 기반 토큰 검증, AOP 기반 권한 제어 구현',
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
          '<ul class="space-y-2 list-none pl-0"><li class="flex gap-2"><span class="mt-1 text-slate-400">•</span><span><span class="font-semibold text-red-600 dark:text-red-300">인증·사용자 책임 혼재</span> — 인증 정책 변경 시 User 도메인까지 배포 단위로 엮임</span></li><li class="flex gap-2"><span class="mt-1 text-slate-400">•</span><span><span class="font-semibold text-red-600 dark:text-red-300">매 요청마다 User 서비스 재조회</span> — 서비스 간 결합도 증가, User 장애 시 인증 전체에 영향을 미치는 <span class="font-semibold text-red-600 dark:text-red-300">단일 장애점(SPOF)</span> 구조</span></li></ul>',
    thinking:
      '문제를 두 레이어로 분리해 접근했습니다.<div class="mt-3 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 dark:border-[#3f3f45] dark:bg-[#2f2f34]"><div class="font-semibold text-slate-800 dark:text-slate-100">1. 모듈 경계 혼재 → 책임 기준으로 Auth/User 분리 필요</div><div class="mt-2 font-semibold text-slate-800 dark:text-slate-100">2. 런타임 재호출 → 토큰 컨텍스트로 호출 자체를 줄이는 구조 필요</div></div><div class="mt-3 flex items-start gap-3"><span class="rounded-md bg-blue-100 px-2.5 py-1 text-sm font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">Auth</span><span class="min-w-0 pt-0.5">인증 정책 변경 시 영향이 Auth·Gateway로 수렴하도록 경계 설계<div class="mt-1 text-sm text-slate-500 dark:text-slate-400">(인증·사용자 도메인은 변경 주기·장애 영향이 달라 같은 모듈에 두면 작은 수정도 전체 배포 단위로 커짐)</div></span></div><div class="mt-2 flex items-start gap-3"><span class="rounded-md bg-blue-100 px-2.5 py-1 text-sm font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">User 재호출</span><span class="min-w-0 pt-0.5">로그인 시점에 컨텍스트를 토큰에 포함 → 대부분 경로에서 재조회 없이 권한 판단<div class="mt-1 text-sm text-slate-500 dark:text-slate-400">(추가 정보가 필요한 경우에만 User 서비스 선택 호출)</div></span></div><div class="mt-3 font-semibold text-amber-600 dark:text-amber-300">👉 책임 경계 분리와 인증 흐름 단순화를 함께 가져가야 한다고 판단</div>',
    solution:
          '<div class="space-y-3"><div class="rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 dark:border-[#3f3f45] dark:bg-[#2f2f34]"><div class="text-lg font-extrabold text-slate-900 dark:text-slate-100">1단계 — 서비스 경계 분리</div><div class="mt-2 space-y-1 text-base leading-relaxed text-slate-800 dark:text-slate-200"><div>인증은 <span class="rounded-md bg-slate-200/80 px-2 py-0.5 font-mono text-sm dark:bg-[#3a3a45]">Auth</span> 모듈, 사용자 관리는 <span class="rounded-md bg-slate-200/80 px-2 py-0.5 font-mono text-sm dark:bg-[#3a3a45]">User</span> 모듈로 분리 → 서비스 경계 명확화</div><div><span class="rounded-md bg-slate-200/80 px-2 py-0.5 font-mono text-sm dark:bg-[#3a3a45]">Auth</span> 로그인/회원가입 처리 후 JWT(access/refresh) 발급, 토큰에 <span class="rounded-md bg-slate-200/80 px-2 py-0.5 font-mono text-sm dark:bg-[#3a3a45]">userId · role</span> 포함</div></div><div class="mt-4"><img loading="lazy" src="3m-auth-user-class-diagram.png" alt="Auth/User 도메인 분리 클래스 구조" class="w-full rounded-lg border border-slate-200 object-contain dark:border-[#4a4a52]"/><p class="mt-1.5 text-right text-xs text-slate-500 dark:text-slate-400">Auth/User 도메인 분리 클래스 구조 — Auth는 인증에 필요한 최소 정보만 보관, Feign으로 단방향 통신</p></div></div><div class="rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 dark:border-[#3f3f45] dark:bg-[#2f2f34]"><div class="text-lg font-extrabold text-slate-900 dark:text-slate-100">2단계 — 인증 흐름 단순화</div><div class="mt-2 space-y-1 text-base leading-relaxed text-slate-800 dark:text-slate-200"><div>Gateway 인증 필터에서 JWT 검증 후 <span class="rounded-md bg-slate-200/80 px-2 py-0.5 font-mono text-sm dark:bg-[#3a3a45]">X-User-*</span> 헤더로 사용자 컨텍스트 전달</div><div>권한 검증은 AOP(<span class="rounded-md bg-slate-200/80 px-2 py-0.5 font-mono text-sm dark:bg-[#3a3a45]">@RequiresMasterRole</span>)로 분리 → 역할 체크 로직 통합</div><div>대부분 경로에서 <span class="rounded-md bg-slate-200/80 px-2 py-0.5 font-mono text-sm dark:bg-[#3a3a45]">User</span> 서비스 재호출 없이 처리, 추가 정보 필요 시에만 선택 호출</div></div></div></div>',
    result:
          '<ul class="space-y-2 list-none pl-0"><li class="flex gap-2"><span class="mt-1 text-slate-400">•</span><span><span class="font-semibold text-emerald-600 dark:text-emerald-400">UserService → Auth 도메인 결합도(CBO) 0건</span> — 인증 정책 변경 시 User 모듈 배포 영향 제거</span></li><li class="flex gap-2"><span class="mt-1 text-slate-400">•</span><span><span class="font-semibold text-emerald-600 dark:text-emerald-400">Auth → User 단방향 의존 3건</span> (Feign 호출용 DTO + AOP 어노테이션만 참조) — 순환 의존 없음</span></li><li class="flex gap-2"><span class="mt-1 text-slate-400">•</span><span>인증 정책·사용자 정책 변경 범위를 각 모듈로 수렴, 한 도메인 수정이 다른 도메인 배포로 이어지지 않는 구조 확보</span></li></ul><p class="mt-3 text-xs text-slate-500 dark:text-slate-400">※ CBO: 소스 코드 import 정적 분석으로 측정 — 실제 코드에서 참조된 외부 클래스 수 기준</p>',
    githubUrl: 'https://github.com/sparta-i4u/sparta-msa',
  }
