import type { ProjectData } from './types'

export const threeMProject: ProjectData = {
    id: 'three-m',
    name: '3M - B2B | 물류 관리 및 배송 시스템',
    period: '2025.03 – 2025.04',
    teamSize: '4명 / 팀장',
    contribution: '기여도 약 35%',
    description:
      '지역 허브 기반 주문·배송과 인증 경로를 안정적으로 연결하는 B2B 물류 관리 시스템',
    summary: {
      problem: 'Auth/User 책임 혼재와 요청별 User 조회 대안은 배포 영향과 장애 전파 비용을 키울 수 있었습니다.',
      action: 'Auth·User를 분리하고 Gateway JWT 검증·X-User-* 헤더·AOP 권한 체크로 인증 흐름을 정리했습니다.',
      result: 'UserService→Auth 결합도 0건, 순환 의존 없음, MASTER/HUB_MANAGER/미인증 권한 응답을 통합 테스트로 검증했습니다.',
    },
    overviewSummary: {
      intro: '업체·허브·배송 담당자가 함께 쓰는 B2B 물류 시스템에서 Auth·User·Gateway 인증 경계를 맡았습니다.',
      achievement: 'UserService→Auth 결합도 0건, 순환 의존 없음, MASTER/HUB_MANAGER/미인증 권한 응답을 통합 테스트로 확인했습니다.',
      reflection: '결합도를 낮춘 뒤에도 Gateway부터 서비스 응답까지 권한 경로 전체를 검증해야 한다는 회고로 이어졌습니다.',
    },
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
      '업체 → 허브 → 배송 담당자로 이어지는 <span class="font-bold">B2B 물류 흐름을 통합 관리하는 플랫폼</span>입니다.\n다수의 기업·허브·배송 담당자가 함께 사용하는 구조 특성상 인증과 권한 관리가 핵심이었으며,\nAuth·User·Gateway 도메인을 전담하며, 서비스 간 의존성을 최소화하는 인증 구조를 설계했습니다.',
    developerPerspective:
      'B2B 물류 시스템은 여러 서비스가 인증 흐름을 공유하므로, 책임 경계와 인증 컨텍스트 전달 방식이 전체 안정성을 좌우합니다.<ul class="mt-3 space-y-2 list-none pl-0"><li class="flex gap-2"><span class="mt-1 text-slate-400">•</span><span><span class="font-semibold text-red-500 dark:text-red-400">인증·사용자 책임 혼재</span> - 정책 변경이 User 배포까지 확산될 수 있는 경계</span></li><li class="flex gap-2"><span class="mt-1 text-slate-400">•</span><span><span class="font-semibold text-red-500 dark:text-red-400">요청별 User 재조회 대안</span> - 최신 role은 반영하지만 호출 증가·장애 전파 위험</span></li></ul><div class="mt-3 font-semibold text-amber-600 dark:text-amber-300">👉 <span class="font-semibold text-[#2563EB] dark:text-[#8aa8e8]">Auth·User 책임을 분리</span>하고, JWT의 <span class="font-mono font-semibold text-[#2563EB] dark:text-[#8aa8e8]">userId·role</span>을 검증한 Gateway가 일반 권한 판단을 담당하도록 적용했습니다.</div>',
    techStack: ['SpringBoot 3.4.3', 'JWT', 'Spring Cloud Gateway', 'PostgreSQL', 'Docker', 'JIRA'],
    roles: [
      {
        icon: '🧱',
        title: '책임 경계 설계/인증 흐름 구현',
        detail: 'SRP 중심으로 인증 / 유저 / 게이트웨이 역할 분리\nJWT 발급 및 Gateway 필터 기반 토큰 검증, AOP 기반 권한 제어 구현',
      },
      {
        icon: '🐳',
        title: '인프라 통합',
        detail: 'Docker Compose 기반 모듈·PostgreSQL·Eureka·Zipkin 통합 구성',
      },
      {
        icon: '👥',
        title: '팀장 | 팀 리딩',
        detail: 'JIRA 애자일 기반 협업 진행, 스프린트·우선순위 조율',
      },
    ],
    problemHeadline: '인증 구조 설계 및 서비스 경계 문제',
    problem:
          '인증(Auth)과 사용자(User)를 한 모듈에 두는 안과 요청마다 User를 조회하는 안을 검토했습니다.<ul class="mt-3 space-y-2 list-none pl-0"><li class="flex gap-2"><span class="mt-1 text-slate-400">•</span><span>책임을 혼재하면 인증 정책 변경이 User 모듈 배포까지 이어질 수 있음</span></li><li class="flex gap-2"><span class="mt-1 text-slate-400">•</span><span>매 요청 User 조회는 최신 권한을 반영하지만 <span class="font-semibold text-red-600 dark:text-red-300">호출 증가·장애 전파</span> 비용이 있음</span></li></ul>',
    thinking:
      '문제를 <span class="font-semibold">서비스 경계</span>와 <span class="font-semibold">인증 컨텍스트 전달</span> 두 레이어로 분리해 비교했습니다.<div class="mt-3 space-y-3"><div class="overflow-x-auto rounded-xl border border-slate-200 dark:border-[#3f3f45]"><div class="bg-slate-100 px-4 py-2.5 font-bold text-slate-700 dark:bg-[#33333a] dark:text-slate-200">서비스 경계</div><table class="decision-table w-full min-w-[680px] table-fixed border-collapse text-left text-sm"><thead class="bg-slate-50 text-slate-500 dark:bg-[#303036] dark:text-slate-400"><tr><th class="w-[24%] px-4 py-2.5">검토안</th><th class="w-[25%] px-4 py-2.5">장점</th><th class="w-[36%] px-4 py-2.5">검토 사항</th><th class="w-[15%] px-4 py-2.5">판단</th></tr></thead><tbody class="bg-white text-slate-700 dark:bg-[#2f2f34] dark:text-slate-200"><tr class="border-t border-slate-200 dark:border-[#45454d]"><td class="px-4 py-3 font-semibold">책임 혼재</td><td class="px-4 py-3">구현·공유 간단</td><td class="px-4 py-3">정책 변경이 User 배포까지 확산</td><td class="px-4 py-3 font-bold text-red-600 dark:text-red-400">제외</td></tr><tr class="border-t border-blue-200 bg-blue-50/70 dark:border-blue-900/50 dark:bg-blue-950/20"><td class="px-4 py-3 font-bold text-[#2563EB] dark:text-[#8aa8e8]">Auth/User 분리</td><td class="px-4 py-3">변경·배포 경계 분리</td><td class="px-4 py-3">서비스 간 계약 관리</td><td class="px-4 py-3 font-bold text-[#2563EB] dark:text-[#8aa8e8]">선택</td></tr></tbody></table></div><div class="overflow-x-auto rounded-xl border border-slate-200 dark:border-[#3f3f45]"><div class="bg-slate-100 px-4 py-2.5 font-bold text-slate-700 dark:bg-[#33333a] dark:text-slate-200">인증 컨텍스트 전달</div><table class="decision-table w-full min-w-[680px] table-fixed border-collapse text-left text-sm"><thead class="bg-slate-50 text-slate-500 dark:bg-[#303036] dark:text-slate-400"><tr><th class="w-[24%] px-4 py-2.5">검토안</th><th class="w-[25%] px-4 py-2.5">장점</th><th class="w-[36%] px-4 py-2.5">검토 사항</th><th class="w-[15%] px-4 py-2.5">판단</th></tr></thead><tbody class="bg-white text-slate-700 dark:bg-[#2f2f34] dark:text-slate-200"><tr class="border-t border-slate-200 dark:border-[#45454d]"><td class="px-4 py-3 font-semibold">요청별 User 재조회 대안</td><td class="px-4 py-3">최신 role 즉시 반영</td><td class="px-4 py-3">호출 증가·User 장애 전파</td><td class="px-4 py-3 font-bold text-red-600 dark:text-red-400">제외</td></tr><tr class="border-t border-slate-200 dark:border-[#45454d]"><td class="px-4 py-3 font-semibold">Gateway 로컬 캐시</td><td class="px-4 py-3">User 호출 감소</td><td class="px-4 py-3">캐시 불일치·무효화 관리</td><td class="px-4 py-3 font-bold text-red-600 dark:text-red-400">제외</td></tr><tr class="border-t border-blue-200 bg-blue-50/70 dark:border-blue-900/50 dark:bg-blue-950/20"><td class="px-4 py-3 font-bold text-[#2563EB] dark:text-[#8aa8e8]">JWT userId·role</td><td class="px-4 py-3">일반 권한 판단을 Gateway에서 처리</td><td class="px-4 py-3">클레임·헤더 계약 관리</td><td class="px-4 py-3 font-bold text-[#2563EB] dark:text-[#8aa8e8]">선택</td></tr></tbody></table></div></div><div class="mt-3 rounded-lg border border-amber-200 bg-amber-50/80 px-4 py-3 font-semibold leading-relaxed text-amber-800 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-200">Auth와 User는 변경되는 이유(인증 정책 vs 사용자 정보)가 서로 다르므로 분리했고,<br/>일반 권한 판단은 JWT 컨텍스트로 Gateway에서 처리하는 안을 적용했습니다.</div>',
    solution:
          '<div class="space-y-3"><div class="rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 dark:border-[#3f3f45] dark:bg-[#2f2f34]"><div class="text-lg font-extrabold text-slate-900 dark:text-slate-100">1단계 — 서비스 경계 분리</div><div class="mt-2 space-y-1 text-base leading-relaxed text-slate-800 dark:text-slate-200"><div>인증은 <span class="rounded-md bg-slate-200/80 px-2 py-0.5 font-mono text-sm dark:bg-[#3a3a45]">Auth</span> 모듈, 사용자 관리는 <span class="rounded-md bg-slate-200/80 px-2 py-0.5 font-mono text-sm dark:bg-[#3a3a45]">User</span> 모듈로 분리 → 서비스 경계 명확화</div><div><span class="rounded-md bg-slate-200/80 px-2 py-0.5 font-mono text-sm dark:bg-[#3a3a45]">Auth</span> 로그인/회원가입 처리 후, JWT(access/refresh) 발급, 토큰에 <span class="rounded-md bg-slate-200/80 px-2 py-0.5 font-mono text-sm dark:bg-[#3a3a45]">userId · role</span> 포함</div></div><div class="mt-4"><img loading="lazy" src="3m-auth-user-class-diagram.png" alt="Auth/User 도메인 분리 클래스 구조" class="w-full rounded-lg border border-slate-200 object-contain dark:border-[#4a4a52]"/><p class="mt-1.5 text-right text-xs text-slate-500 dark:text-slate-400">Auth/User 도메인 분리 클래스 구조 — Auth는 인증에 필요한 최소 정보만 보관, Feign으로 단방향 통신</p></div></div><div class="rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 dark:border-[#3f3f45] dark:bg-[#2f2f34]"><div class="text-lg font-extrabold text-slate-900 dark:text-slate-100">2단계 — 인증 흐름 단순화</div><div class="mt-2 space-y-1 text-base leading-relaxed text-slate-800 dark:text-slate-200"><div>Gateway 인증 필터에서 JWT 검증 후 <span class="rounded-md bg-slate-200/80 px-2 py-0.5 font-mono text-sm dark:bg-[#3a3a45]">X-User-*</span> 헤더로 사용자 컨텍스트 전달</div><div>일반 권한 판단은 Gateway에서 처리하고, 사용자 상세 정보가 필요할 때만 <span class="rounded-md bg-slate-200/80 px-2 py-0.5 font-mono text-sm dark:bg-[#3a3a45]">User</span> 호출</div><div>권한 검증은 AOP(<span class="rounded-md bg-slate-200/80 px-2 py-0.5 font-mono text-sm dark:bg-[#3a3a45]">@RequiresMasterRole</span>)로 분리 → 역할 체크 로직 통합</div></div></div></div>',
    result:
          '<ul class="space-y-2 list-none pl-0"><li class="flex gap-2"><span class="mt-1 text-slate-400">•</span><span>UserService → Auth 도메인 <span class="font-semibold text-emerald-600 dark:text-emerald-400">결합도(CBO) 0건</span> — 인증 정책 변경 시 User 모듈 배포 영향 제거</span></li><li class="flex gap-2"><span class="mt-1 text-slate-400">•</span><span>Auth → User 의존은 Feign 호출용 DTO 중심의 단방향 참조로 제한 — <span class="font-semibold text-emerald-600 dark:text-emerald-400">순환 의존 없음</span></span></li><li class="flex gap-2"><span class="mt-1 text-slate-400">•</span><span>인증 정책·사용자 정책 변경 범위를 각 모듈로 수렴, 한 도메인 수정이 다른 도메인 배포로 이어지지 않는 구조 확보</span></li></ul><p class="mt-3 text-xs text-slate-500 dark:text-slate-400">※ CBO: 소스 코드 import 정적 분석으로 측정 — 실제 코드에서 참조된 외부 클래스 수 기준</p>',
    projectReflection: {
      title: '인증은 토큰 발급보다 요청 흐름 전체가 중요했습니다',
      body:
        '업체·허브·배송 담당자가 함께 쓰는 물류 시스템에서는 권한이 한 곳만 새어도 주문·배송 흐름 전체가 흔들릴 수 있어, Auth·User 책임을 나누고 Gateway에서 공통 인증 흐름을 잡았습니다.<br/>JWT 검증, X-User-* 헤더 전달, AOP 권한 체크로 인증 판단 지점을 정리해 UserService→Auth 결합도 0건과 MASTER/HUB_MANAGER/미인증 응답 검증까지 확인했습니다.<br/>이 경험으로 인증은 로그인 기능 하나가 아니라, 어떤 서비스로 요청이 흘러가도 같은 권한 판단과 응답이 유지되게 만드는 흐름이라고 느꼈습니다.',
      sourceUrl:
        'https://github.com/sparta-i4u/sparta-msa/wiki/%5BTest-Report%5D%5B%EB%AF%BC%EC%88%98%E2%80%90User,-Auth,-Gateway-%EB%8F%84%EB%A9%94%EC%9D%B8%5D-%ED%86%B5%ED%95%A9-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EA%B2%B0%EA%B3%BC-%EB%B3%B4%EA%B3%A0%EC%84%9C',
    },
    githubUrl: 'https://github.com/sparta-i4u/sparta-msa',
    wikiUrl: 'https://github.com/sparta-i4u/sparta-msa/wiki',
  }
