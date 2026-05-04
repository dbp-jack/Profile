import type { ProjectData } from '@/pages/home/components/ProjectCard'

export const PROJECTS: ProjectData[] = [
  {
    name: 'FeedShop - B2C | 피드 기반 패션 커뮤니티 쇼핑몰 플랫폼',
    period: '2025.05 – 2025.09',
    teamSize: '4명 / 부팀장',
    contribution: '기여도 약 40%',
    description:
      '관심 (Need/Trigger) → 정보 탐색 (Search) → 스타일링 공감 (Empathy/Desire) → 구매 고민 (Anxiety) → 구매 확신 (Decision) → 구매 행동 (Action)',
    serviceOverview:
      '기존 쇼핑몰의 단방향 판매 구조는 구매 후 재방문 유인이 부족하다는 문제를 발견했고, 사용자 여정(UX 6단계)을 분석해 공감·확신 단계에 피드 공유와 투표를 접목하면 재참여로 이어질 수 있다고 판단했습니다.\n사용자가 직접 피드를 올리고 인기를 겨루며, 높은 순위가 이벤트 보상으로 연결되는 선순환 구조를 만들었습니다. 이벤트·피드 투표 도메인을 담당하며 발생한 성능·동시성 문제를 어떻게 해결했는지 아래에서 다룹니다.',
    userPerspectivePlanning: {
      subtitle: '',
      cards: [
        {
          title: '재참여 설계',
          problemBullets: [
            '구매 후 이탈과 단발성 이용으로 재방문 유인이 만들어지지 않는 구조',
            '재방문이 없으니 콘텐츠 생산도, 신뢰 기반 후기 축적도 이어지기 어려움',
          ],
          directionBullets: [
            '사용자 여정 6단계 분석으로 공감·확신 단계를 재참여 유입 지점으로 설정',
          ],
        },
      ],
    },
    techStack: ['SpringBoot', 'Query DSL', 'MySQL', 'Redis', 'GCP', 'Docker', 'Github', 'JIRA', 'JMeter'],
    roles: [
      {
        icon: '🔧',
        title: '백엔드 구현',
        detail: '이벤트·피드 투표 도메인 담당 — 성능 병목 분석, 캐시 전략 설계, 동시성 문제 해결까지 수행',
      },
      { icon: '👥', title: '팀 리딩(부팀장)', detail: '스프린트·우선순위 조율, 스크럼 진행, 가이드라인 제공' },
      { icon: '🚀', title: '배포/운영', detail: 'GCP·Docker 기반 배포 환경 구성, JMeter 성능 점검' },
    ],
    problemHeadline: '이벤트 조회 성능 병목 문제',
    problem:
      '이벤트 목록 조회 시 연관 데이터(eventDetail, rewards) 로딩으로 <span class="font-semibold text-red-600 dark:text-red-300">N+1 쿼리 발생</span> → 응답 시간 평균 2.3초<br />findAll() 기반 전체 조회 후 메모리 필터링 구조 → 데이터 증가 시 성능 저하 우려<br />투표 수 또한 매 요청마다 DB 조회 → 동시 요청 증가 시 부하 가중',
    thinking:
      '이벤트 투표는 단기간에 동시 요청이 집중되고, 특히 랭킹 상위 게시물일수록 쏠림이 심해집니다.<br /> 또한, 목록 조회(반복 읽기)와 투표 수(빈번한 갱신·동시성)는 부하 축이 달라, 쿼리 최적화와 캐시·원자 연산을 같은 문제로 보지 않았습니다.<br /> 문제를 두 레이어로 분리해 접근했습니다.<div class="mt-3 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 dark:border-[#3f3f45] dark:bg-[#2f2f34]"><div class="font-semibold text-slate-800 dark:text-slate-100">1. 쿼리 자체의 비효율 → 근본적인 쿼리 개선 필요</div><div class="mt-2 font-semibold text-slate-800 dark:text-slate-100">2. 반복 조회 비용 → 데이터 특성별 캐시 전략 분리 필요</div></div><div class="mt-3 flex items-start gap-3"><span class="rounded-md bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">이벤트 목록</span><span class="min-w-0 pt-0.5">조회 많음 / 변경 적음 → 캐싱 적합<div class="mt-1 text-xs text-slate-500 dark:text-slate-400">(사용자 탐색 단계에서 반복 노출되는 데이터 — 변경 빈도가 낮아 캐시 유효)</div></span></div><div class="mt-2 flex items-start gap-3"><span class="rounded-md bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">투표 수</span><span class="min-w-0 pt-0.5">증감 빈번 / 동시성 중요 → 원자적 연산 필요<div class="mt-1 text-xs text-slate-500 dark:text-slate-400">(랭킹 경쟁 중 상위 게시물에 투표가 몰리는 패턴 → 정합성 보장이 핵심)</div></span></div><div class="mt-3 font-semibold text-amber-600 dark:text-amber-300">👉 단일 캐시 전략이 아니라 역할별 캐시 분리가 필요하다고 판단</div>',
    solution:
      '<div class="space-y-3"><div class="rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 dark:border-[#3f3f45] dark:bg-[#2f2f34]"><div class="text-base font-extrabold text-slate-900 dark:text-slate-100">1단계 — 쿼리 최적화</div><div class="mt-2 space-y-1 text-sm leading-relaxed text-slate-800 dark:text-slate-200"><div>QueryDSL 기반 <span class="font-semibold">EventQueryRepositoryImpl</span> 도입</div><div>eventDetail, rewards를 <span class="font-mono">leftJoin + fetchJoin</span>으로 한 번에 조회해 N+1 제거</div><div>페이징 시 조인 중복 문제를 <span class="font-mono">countDistinct</span>로 count 쿼리 분리해 보정</div></div></div><div class="rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 dark:border-[#3f3f45] dark:bg-[#2f2f34]"><div class="text-base font-extrabold text-slate-900 dark:text-slate-100">2단계 — 역할별 캐시 전략 분리</div><div class="mt-2 space-y-1.5 text-sm leading-relaxed text-slate-800 dark:text-slate-200"><div><span class="mr-2 rounded-md bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">이벤트 목록</span>@Cacheable 적용, ConcurrentMapCacheManager → RedisCacheManager 전환으로 분산 환경 대응</div><div><span class="mr-2 rounded-md bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">투표 수</span>Redis INCR/DECR 원자적 연산으로 동시성 문제 없이 정확성 보장</div><div>TTL 및 @CacheEvict 적용 / Cache Miss 시 DB → 캐시 재적재 구조 유지</div></div></div></div>',
    result:
      'QueryDSL fetch join으로 1차 쿼리 최적화 후, @Cacheable + Redis 캐싱을 추가 적용해 <span class="text-lg font-extrabold text-blue-700 dark:text-blue-300">최종 응답 시간 78% 개선</span><div class="mt-2 overflow-hidden rounded-xl border border-slate-200/95 bg-white shadow-[0_6px_28px_-6px_rgba(30,58,95,0.14)] dark:border-[#42424c] dark:bg-[#2c2c34] dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.45)]"><table class="w-full table-fixed border-collapse text-left text-sm text-slate-700 dark:text-slate-300"><caption class="sr-only">성능 점검 요약</caption><thead><tr class="border-b border-slate-200 bg-slate-50 dark:border-[#40404a] dark:bg-[#32323a]"><th scope="col" class="px-3 py-2 text-left text-xs font-bold text-slate-600 dark:text-slate-300">항목</th><th scope="col" class="px-3 py-2 text-left text-xs font-bold text-slate-600 dark:text-slate-300">개선 전</th><th scope="col" class="px-3 py-2 text-left text-xs font-bold text-slate-600 dark:text-slate-300">개선 후</th><th scope="col" class="px-3 py-2 text-left text-xs font-bold text-slate-600 dark:text-slate-300">개선율</th></tr></thead><tbody><tr><td class="border-t border-slate-100 px-3 py-2.5 font-semibold text-slate-900 dark:border-[#3a3a44] dark:text-white">이벤트 목록 응답 시간</td><td class="border-t border-slate-100 px-3 py-2.5 tabular-nums text-slate-600 dark:border-[#3a3a44] dark:text-slate-400">2.3초</td><td class="border-t border-slate-100 px-3 py-2.5 font-semibold tabular-nums text-blue-700 dark:border-[#3a3a44] dark:text-blue-300">0.5초</td><td class="border-t border-slate-100 px-3 py-2.5 font-bold text-emerald-600 dark:border-[#3a3a44] dark:text-emerald-400">78% 개선</td></tr><tr><td class="border-t border-slate-100 px-3 py-2.5 font-semibold text-slate-900 dark:border-[#3a3a44] dark:text-white">분산 환경 캐시 지속성</td><td class="border-t border-slate-100 px-3 py-2.5 text-slate-600 dark:border-[#3a3a44] dark:text-slate-400">서버 재시작 시 소실</td><td class="border-t border-slate-100 px-3 py-2.5 font-semibold text-blue-700 dark:border-[#3a3a44] dark:text-blue-300">Redis 유지</td><td class="border-t border-slate-100 px-3 py-2.5 text-slate-600 dark:border-[#3a3a44] dark:text-slate-400">-</td></tr><tr><td class="border-t border-slate-100 px-3 py-2.5 font-semibold text-slate-900 dark:border-[#3a3a44] dark:text-white">투표 수 동시성</td><td class="border-t border-slate-100 px-3 py-2.5 text-slate-600 dark:border-[#3a3a44] dark:text-slate-400">매 요청마다 DB 조회, 동시 요청 시 정합성 위험</td><td class="border-t border-slate-100 px-3 py-2.5 font-semibold text-blue-700 dark:border-[#3a3a44] dark:text-blue-300">Redis INCR 원자적 연산으로 정합성 보장</td><td class="border-t border-slate-100 px-3 py-2.5 text-slate-600 dark:border-[#3a3a44] dark:text-slate-400">-</td></tr></tbody></table></div>',
    githubUrl: 'https://github.com/ECommerceCommunity',
  },
  {
    name: '3M - B2B | 물류 관리 및 배송 시스템',
    period: '2025.03 – 2025.04',
    teamSize: '4명 / 팀장',
    contribution: '기여도 약 35% (Auth·User·Gateway 도메인 담당)',
    description:
      '지역 허브 기반 주문·배송과 인증 경로를 안정적으로 연결하는 B2B 물류 관리 시스템',
    serviceOverview:
      '물류 관리 및 배송 시스템 과제에서 Auth·User·Gateway 도메인을 담당하며, 인증과 사용자 책임이 한 모듈에 혼재된 구조적 문제를 발견했습니다.\n요구사항을 받아 시작했지만 구조를 어떻게 나눌지는 고민했고, 단일 책임 원칙(SRP)을 기준으로 역할을 분리하며 서비스 간 의존성을 최소화하는 방향으로 설계를 주도했습니다.\n 책임 경계와 인증 흐름 문제를 어떻게 풀었는지 아래에서 다룹니다.',
    designPerspectivePlanning: {
      subtitle: '',
      cards: [
        {
          title: '책임 분리 설계',
          recognizedProblem:
            '· Auth/User 경계가 없으면 인증 정책 변경 시 사용자 도메인까지 배포 단위로 엮임\n· 매 요청마다 User 서비스를 거치는 구조는 호출 체인이 길어질수록 서비스 간 결합도가 높아짐',
          designJudgment:
            '· SRP 기준으로 Auth·User·Gateway 역할 경계를 명확히 분리\n· 로그인 시점에 컨텍스트를 JWT payload에 포함\n· Gateway에서 일괄 검증 후 X-User-* 헤더로 전달\n· 추가 정보가 필요한 경우에만 User 서비스 선택 호출 → 서비스 간 의존성 최소화',
        },
      ],
    },
    techStack: ['SpringBoot', 'Spring Cloud Gateway', 'JWT', 'Redis', 'PostgreSQL', 'Docker', 'JIRA'],
    roles: [
      { icon: '🧱', title: '책임 경계 설계', detail: 'Auth / User / Gateway 역할 분리, 인증·사용자 책임 분리' },
      { icon: '🐳', title: '인프라 통합', detail: 'Docker Compose 기반 모듈·Redis·DB·Eureka 통합 구성' },
      { icon: '🔐', title: '인증 흐름 구현', detail: 'JWT 발급 및 Gateway 필터 기반 토큰 검증 공통 인증 흐름 적용' },
    ],
    problemHeadline: '인증 구조 설계 및 서비스 경계 문제',
    problem:
      '인증 이후 요청마다 <span class="font-semibold text-red-600 dark:text-red-300">사용자 정보 반복 조회</span> → 서비스 간 호출 의존 증가, <span class="font-semibold text-red-600 dark:text-red-300">DB 부하 가중</span><br />인증(Auth)과 사용자(User) 기능 <span class="font-semibold text-red-600 dark:text-red-300">경계 혼재</span> → 인증 정책 변경 시 사용자 영역까지 영향 확산',
    thinking:
      '인증과 사용자 관리가 한 모듈에 혼재된 구조는 인증 정책 하나를 바꿀 때 사용자 로직까지 영향을 받고, 매 요청마다 User 서비스를 재호출하면 서비스 간 의존이 깊어집니다.<br />두 문제가 같은 레이어에 있지 않다고 보고, 경계 설계와 호출 구조를 분리해 판단했습니다.<br />인증 정책 변화와 런타임 트래픽 비용을 각각 줄이는 방향이 필요했습니다.<br /><br />문제를 두 레이어로 분리해 접근했습니다.<div class="mt-3 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 dark:border-[#3f3f45] dark:bg-[#2f2f34]"><div class="font-semibold text-slate-800 dark:text-slate-100">1. 모듈 경계 혼재 → 책임 기준으로 Auth/User 분리 필요</div><div class="mt-2 font-semibold text-slate-800 dark:text-slate-100">2. 런타임 재호출 → 토큰 컨텍스트로 호출 자체를 줄이는 구조 필요</div></div><div class="mt-3 flex items-start gap-3"><span class="rounded-md bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">Auth</span><span class="min-w-0 pt-0.5">인증 정책 변경 시 영향이 Auth·Gateway로 수렴하도록 경계 설계<div class="mt-1 text-xs text-slate-500 dark:text-slate-400">(인증과 사용자 도메인은 변경 주기·장애 영향이 달라 같은 모듈에 두면 작은 수정도 전체 배포 단위로 커짐)</div></span></div><div class="mt-2 flex items-start gap-3"><span class="rounded-md bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">User 재호출</span><span class="min-w-0 pt-0.5">로그인 시점에 컨텍스트를 토큰에 포함 → 대부분 경로에서 재조회 없이 권한 판단 가능<div class="mt-1 text-xs text-slate-500 dark:text-slate-400">(검증은 Gateway에서 공통 처리하고, 추가 정보가 필요한 경우에만 User 서비스 선택 호출)</div></span></div><div class="mt-3 font-semibold text-amber-600 dark:text-amber-300">👉 책임 경계 분리와 인증 흐름 단순화를 함께 가져가야 한다고 판단</div>',
    solution:
      '<div class="space-y-3"><div class="rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 dark:border-[#3f3f45] dark:bg-[#2f2f34]"><div class="text-base font-extrabold text-slate-900 dark:text-slate-100">1단계 — 서비스 경계 분리</div><div class="mt-2 space-y-1 text-sm leading-relaxed text-slate-800 dark:text-slate-200"><div>인증은 <span class="rounded-md bg-slate-200/80 px-2 py-0.5 font-mono text-xs dark:bg-[#3a3a45]">Auth</span> 모듈, 사용자 관리는 <span class="rounded-md bg-slate-200/80 px-2 py-0.5 font-mono text-xs dark:bg-[#3a3a45]">User</span> 모듈로 분리 → 서비스 경계 명확화</div><div><span class="rounded-md bg-slate-200/80 px-2 py-0.5 font-mono text-xs dark:bg-[#3a3a45]">Auth</span> 로그인/회원가입 처리 후 JWT(access/refresh) 발급, 토큰에 <span class="rounded-md bg-slate-200/80 px-2 py-0.5 font-mono text-xs dark:bg-[#3a3a45]">userId</span>, <span class="rounded-md bg-slate-200/80 px-2 py-0.5 font-mono text-xs dark:bg-[#3a3a45]">role</span> 포함</div></div><div class="mt-5 text-base font-extrabold text-slate-900 dark:text-slate-100">데이터 동기화 전략 — Auth/User 도메인 분리 구조도</div><div class="mt-2 block"><img src="3m-sync-strategy.png" alt="데이터 동기화 전략 구조도" class="mx-auto h-auto max-h-[26rem] w-full max-w-4xl rounded-lg border border-slate-200 bg-white object-contain shadow-sm dark:border-[#4a4a52]" /></div></div><div class="rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 dark:border-[#3f3f45] dark:bg-[#2f2f34]"><div class="text-base font-extrabold text-slate-900 dark:text-slate-100">2단계 — 인증 흐름 단순화</div><div class="mt-2 space-y-1 text-sm leading-relaxed text-slate-800 dark:text-slate-200"><div><span class="rounded-md bg-slate-200/80 px-2 py-0.5 font-mono text-xs dark:bg-[#3a3a45]">Gateway</span> 인증필터에서 JWT 검증 후 <span class="rounded-md bg-slate-200/80 px-2 py-0.5 font-mono text-xs dark:bg-[#3a3a45]">X-User-*</span> 헤더로 사용자 컨텍스트 전달</div><div>권한 검증은 AOP(<span class="rounded-md bg-slate-200/80 px-2 py-0.5 font-mono text-xs dark:bg-[#3a3a45]">@RequiresMasterRole</span>)로 분리 → 역할 체크 로직 통합</div><div>대부분 경로에서 <span class="rounded-md bg-slate-200/80 px-2 py-0.5 font-mono text-xs dark:bg-[#3a3a45]">User</span> 서비스 재호출 최소화 → 추가 정보 필요 시에만 선택 호출</div></div><div class="mt-5 text-base font-extrabold text-slate-900 dark:text-slate-100">JWT 기반 인증 토큰 발급으로 사용자 조회 빈도 낮추기 — 흐름도</div><div class="mt-2 block"><img src="3m-jwt-flow.png" alt="JWT 기반 조회 절감 흐름도" class="mx-auto h-auto max-h-[26rem] w-full max-w-4xl rounded-lg border border-slate-200 bg-white object-contain shadow-sm dark:border-[#4a4a52]" /></div></div></div>',
    result:
      '인증 정책과 사용자 정책의 변경 범위를 각 모듈로 수렴시켜, 한 도메인 수정이 다른 도메인 배포로 이어지지 않는 구조를 마련했습니다.<div class="mt-3 overflow-hidden rounded-xl border border-slate-200/95 bg-white shadow-[0_6px_28px_-6px_rgba(30,58,95,0.14)] dark:border-[#42424c] dark:bg-[#2c2c34] dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.45)]"><table class="w-full table-fixed border-collapse text-left text-sm text-slate-700 dark:text-slate-300"><caption class="sr-only">3M 결과 요약</caption><colgroup><col class="w-[14%] sm:w-[13%]" /><col class="w-[30%] sm:w-[29%]" /><col class="min-w-0 w-[56%] sm:w-[58%]" /></colgroup><thead><tr class="border-b border-slate-200 bg-slate-50 dark:border-[#40404a] dark:bg-[#32323a]"><th scope="col" class="px-2.5 py-2 text-left text-xs font-bold text-slate-600 dark:text-slate-300">항목</th><th scope="col" class="px-3 py-2 text-left text-xs font-bold text-slate-600 dark:text-slate-300">개선 전</th><th scope="col" class="px-3 py-2 pl-3 text-left text-xs font-bold text-slate-600 dark:text-slate-300 sm:pl-4">개선 후</th></tr></thead><tbody><tr><td class="border-t border-slate-100 px-2.5 py-2.5 text-[0.8125rem] font-semibold leading-snug text-slate-900 dark:border-[#3a3a44] dark:text-white">인증 정책 영향</td><td class="border-t border-slate-100 px-3 py-2.5 text-slate-600 dark:border-[#3a3a44] dark:text-slate-400">인증 정책 변경 영향이 Auth·User 양쪽으로 퍼지기 쉬운 구조</td><td class="border-t border-slate-100 px-3 py-2.5 pl-3 font-semibold leading-relaxed text-blue-700 dark:border-[#3a3a44] dark:text-blue-300 sm:pl-4">검토·배포 단위가 Auth·Gateway 중심으로 수렴하도록 정리</td></tr><tr><td class="border-t border-slate-100 px-2.5 py-2.5 text-[0.8125rem] font-semibold leading-snug text-slate-900 dark:border-[#3a3a44] dark:text-white">사용자 정책 영향</td><td class="border-t border-slate-100 px-3 py-2.5 text-slate-600 dark:border-[#3a3a44] dark:text-slate-400">사용자 정책 변경 영향도 두 서비스에 동시에 미칠 수 있는 구조</td><td class="border-t border-slate-100 px-3 py-2.5 pl-3 font-semibold leading-relaxed text-blue-700 dark:border-[#3a3a44] dark:text-blue-300 sm:pl-4">사용자 도메인 수정 범위가 User 모듈에 집중되도록 정리</td></tr><tr><td class="border-t border-slate-100 px-2.5 py-2.5 text-[0.8125rem] font-semibold leading-snug text-slate-900 dark:border-[#3a3a44] dark:text-white">Auth→User Feign</td><td class="border-t border-slate-100 px-3 py-2.5 text-slate-600 dark:border-[#3a3a44] dark:text-slate-400">Auth·User 책임이 섞이면서 서비스 간 연동(Feign) 호출이 누적되기 쉬움</td><td class="border-t border-slate-100 px-3 py-2.5 pl-3 font-semibold leading-relaxed text-blue-700 dark:border-[#3a3a44] dark:text-blue-300 sm:pl-4"><span class="font-mono text-[0.8125rem]">createUser</span>(회원가입), <span class="font-mono text-[0.8125rem]">getUserInfo</span>(MASTER 검증) 등으로 한정. 일반 인증 조회용 User Feign 호출 제거</td></tr></tbody></table></div>',
    githubUrl: 'https://github.com/sparta-i4u/sparta-msa',
  },
]
