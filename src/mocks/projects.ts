import type { ProjectData } from '@/pages/home/components/ProjectCard'

export const PROJECTS: ProjectData[] = [
  {
    name: 'FeedShop - B2C | 피드 기반 패션 커뮤니티 쇼핑몰 플랫폼',
    period: '2025.05 - 2025.08',
    teamSize: '총원 4명/부팀장',
    description:
      '관심 (Need/Trigger) → 정보 탐색 (Search) → 스타일링 공감 (Empathy/Desire) → 구매 고민 (Anxiety) → 구매 확신 (Decision) → 구매 행동 (Action)',
    planningBackground:
      '사용자 행동 데이터와 SNS 소비 패턴을 분석해 "피드 공유 → 이벤트 참여 → 보상" 구조가\n자발적 유입을 만든다는 가설을 세우고, 이를 직접 백엔드로 구현했습니다.',
    implementationGoal:
      '트래픽이 집중되는 피드 조회와 이벤트 투표에서 성능을 버틸 수 있는 구조를 만드는 것\n→ 이것이 N+1 개선과 Redis 캐싱으로 이어짐',
    techStack: ['SpringBoot', 'Query DSL', 'MySQL', 'Redis', 'GCP', 'Docker', 'Github', 'JIRA', 'JMeter'],
    roles: [
      { icon: '🔧', title: '백엔드 구현', detail: 'N+1 개선, Redis 캐싱, QueryDSL 적용' },
      { icon: '👥', title: '팀 리딩', detail: '스프린트 조율, 코드 리뷰, API 설계 공유' },
      { icon: '🚀', title: '배포/운영', detail: 'GCP·Docker 협업, JMeter 성능 점검' },
    ],
    problem:
      '이벤트 목록 조회에서 N+1 쿼리로 인해 응답 시간이 평균 약 2.3초까지 지연\nfindAll() 기반 전체 조회 후 메모리 처리 구조 → 데이터 증가 시 성능 저하 우려\n투표 수 또한 매 요청마다 DB 조회 → 부하 증가 및 지연 가능성 존재',
    thinking:
      '데이터 특성과 조회 패턴을 기준으로 캐시 전략을 분리했습니다.\n이벤트 목록 → 조회 많음 / 변경 적음 → 캐싱 적합\n투표 수 → 증감 빈번 / 동시성 중요 → 별도 처리 필요\n👉 단일 캐시 전략이 아니라 역할별 캐시 분리가 필요하다고 판단',
    solution:
      '이벤트 목록 → Spring Cache(@Cacheable) 적용으로 반복 조회 시 DB 접근 최소화\n투표 수 → Redis 저장 + 원자적 연산으로 동시성 문제 없이 정확성 보장\n캐시 운영 전략\n→ TTL 및 캐시 무효화 적용\n→ Cache Miss 시 DB → 캐시 재적재 구조 유지',
    result:
      '이벤트 조회 응답 시간 : <span style="color:#2563EB;font-size:1.15em;font-weight:700;">2.3초 → 0.5초</span> <span style="color:#2563EB;font-size:1.1em;font-weight:700;">(약 78% 개선)</span><br />반복 조회 시 DB 접근 감소로 서버 부하 완화<br />투표 요청이 몰리는 상황에서도 동시성 문제 없이 안정적인 처리 가능<div class="mt-2 flex w-full max-w-2xl flex-col gap-4"><div class="overflow-hidden rounded-xl border border-slate-200/95 bg-white shadow-[0_6px_28px_-6px_rgba(30,58,95,0.14)] dark:border-[#42424c] dark:bg-[#2c2c34] dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.45)]"><div class="border-b border-slate-200 bg-gradient-to-r from-slate-100 via-white to-blue-50/50 px-4 py-2.5 text-sm font-bold text-slate-800 dark:border-[#45454f] dark:from-[#363642] dark:via-[#303038] dark:to-[#2a3040] dark:text-slate-100">실측 데이터</div><table class="w-full table-fixed border-collapse text-left text-sm text-slate-700 dark:text-slate-300"><caption class="sr-only">실측 데이터</caption><thead><tr class="border-b border-slate-200 bg-slate-50 dark:border-[#40404a] dark:bg-[#32323a]"><th scope="col" class="px-3 py-2 text-left text-xs font-bold text-slate-600 dark:text-slate-300">항목</th><th scope="col" class="px-3 py-2 text-left text-xs font-bold text-slate-600 dark:text-slate-300">개선 전</th><th scope="col" class="px-3 py-2 text-left text-xs font-bold text-slate-600 dark:text-slate-300">개선 후</th><th scope="col" class="px-3 py-2 text-left text-xs font-bold text-slate-600 dark:text-slate-300">개선율</th></tr></thead><tbody><tr><td class="border-t border-slate-100 px-3 py-2.5 font-semibold text-slate-900 dark:border-[#3a3a44] dark:text-white">이벤트 목록 응답</td><td class="border-t border-slate-100 px-3 py-2.5 tabular-nums text-slate-600 dark:border-[#3a3a44] dark:text-slate-400">2.3초</td><td class="border-t border-slate-100 px-3 py-2.5 font-semibold tabular-nums text-blue-700 dark:border-[#3a3a44] dark:text-blue-300">0.5초</td><td class="border-t border-slate-100 px-3 py-2.5 font-bold text-emerald-600 dark:border-[#3a3a44] dark:text-emerald-400">78% 개선</td></tr></tbody></table></div><div class="overflow-hidden rounded-xl border border-slate-200/95 bg-white shadow-[0_6px_28px_-6px_rgba(30,58,95,0.14)] dark:border-[#42424c] dark:bg-[#2c2c34] dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.45)]"><div class="border-b border-slate-200 bg-gradient-to-r from-slate-100 via-white to-blue-50/50 px-4 py-2.5 text-sm font-bold text-slate-800 dark:border-[#45454f] dark:from-[#363642] dark:via-[#303038] dark:to-[#2a3040] dark:text-slate-100">Redis 적용 후 예상 효과</div><table class="w-full table-fixed border-collapse text-left text-sm text-slate-700 dark:text-slate-300"><caption class="sr-only">Redis 적용 후 예상 효과</caption><thead><tr class="border-b border-slate-200 bg-slate-50 dark:border-[#40404a] dark:bg-[#32323a]"><th scope="col" class="px-3 py-2 text-left text-xs font-bold text-slate-600 dark:text-slate-300">항목</th><th scope="col" class="px-3 py-2 text-left text-xs font-bold text-slate-600 dark:text-slate-300">현재</th><th scope="col" class="px-3 py-2 text-left text-xs font-bold text-slate-600 dark:text-slate-300">적용 후</th><th scope="col" class="px-3 py-2 text-left text-xs font-bold text-slate-600 dark:text-slate-300">개선율</th></tr></thead><tbody class="divide-y divide-slate-100 dark:divide-[#3a3a44]"><tr class="hover:bg-blue-50/50 dark:hover:bg-[#32323c]"><td class="px-3 py-2.5 font-semibold text-slate-900 dark:text-white">투표 수 조회</td><td class="px-3 py-2.5 text-slate-600 dark:text-slate-400">50~100ms</td><td class="px-3 py-2.5 font-semibold text-blue-700 dark:text-blue-300">1~2ms</td><td class="px-3 py-2.5 font-bold text-emerald-600 dark:text-emerald-400">약 50배</td></tr><tr class="hover:bg-blue-50/50 dark:hover:bg-[#32323c]"><td class="px-3 py-2.5 font-semibold text-slate-900 dark:text-white">동시 접속 처리</td><td class="px-3 py-2.5 text-slate-600 dark:text-slate-400">약 100명</td><td class="px-3 py-2.5 font-semibold text-blue-700 dark:text-blue-300">1000명+</td><td class="px-3 py-2.5 font-bold text-emerald-600 dark:text-emerald-400">약 10배</td></tr><tr class="hover:bg-blue-50/50 dark:hover:bg-[#32323c]"><td class="px-3 py-2.5 font-semibold text-slate-900 dark:text-white">DB 부하</td><td class="px-3 py-2.5 tabular-nums text-slate-600 dark:text-slate-400">100%</td><td class="px-3 py-2.5 font-semibold tabular-nums text-blue-700 dark:text-blue-300">10%</td><td class="px-3 py-2.5 font-bold text-emerald-600 dark:text-emerald-400">90% 감소</td></tr></tbody></table></div></div>',
    githubUrl: 'https://github.com/ECommerceCommunity',
    demoUrl: 'https://[demo-url-1]',
  },
]
