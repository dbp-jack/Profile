import type { ProjectData } from '@/pages/home/components/ProjectCard'

export const PROJECTS: ProjectData[] = [
  {
    name: 'FeedShop - B2C | 피드 기반 패션 커뮤니티 쇼핑몰 플랫폼',
    period: '2025.05 – 2025.09',
    teamSize: '4명 / 부팀장',
    contribution: '기여도 약 40%',
    description:
      '관심 (Need/Trigger) → 정보 탐색 (Search) → 스타일링 공감 (Empathy/Desire) → 구매 고민 (Anxiety) → 구매 확신 (Decision) → 구매 행동 (Action)',
    architectureImage: '/image-1780417036070.png',
    architectureDetails: [
      {
        title: 'GCP Cloud Run + Docker 배포',
        items: [
          {
            bullets: [
              'Dockerfile(eclipse-temurin:17-jdk-alpine) 작성, GCR 이미지 푸시, Actuator 헬스체크로 배포 성공 여부 자동 검증',
            ],
          },
        ],
      },
      {
        title: 'GitHub Actions CI/CD + SonarCloud',
        items: [
          {
            bullets: [
              'CI - PR마다 테스트·Jacoco 커버리지·SonarCloud Reliability·Coverage·인지 복잡도 정적 분석 자동 실행',
              'CD - main 브랜치 push 시 빌드 → GCR 푸시 → Cloud Run 배포→헬스체크 전 과정 자동화',
              'SonarCloud - 분석 결과를 실제 개선에 활용 - Reliability C등급 while→for 교체, EventValidator 인지 복잡도 경고 → 메서드 분리',
            ],
          },
        ],
      },
    ],
    serviceOverview:
      '<span class="font-bold">\'나라면 이 쇼핑몰 쓸까?\'</span>라는 생각으로 프로젝트를 시작했습니다.\n단순 구매를 넘어 피드 공유·투표·이벤트 참여로 유저가 스스로 활동하는 커뮤니티형 패션 커머스입니다.\n피드 투표 상위 참여자에게 포인트와 쿠폰을 지급하며,\n<span class="font-bold">\'구매가 곧 참여이자 보상\'</span>이 되는 선순환 구조로 재방문을 유도하도록 설계했습니다.',
    developerPerspective:
      '유저의 재방문을 유도하는 선순환 구조의 핵심은 <span class="font-semibold text-[#2563EB] dark:text-[#8aa8e8]">\'이벤트 참여\'</span>에 있습니다.\n한정된 기간 동안 보상을 얻기 위해 특정 시간에 <span class="font-semibold text-[#2563EB] dark:text-[#8aa8e8]">유저 요청이 급증</span>하는 구조에서 상위 피드에 투표가 몰리는 <span class="font-semibold text-[#2563EB] dark:text-[#8aa8e8]">쏠림 현상</span>이 발생합니다.\n이때 <span class="font-semibold text-red-500 dark:text-red-400">응답 지연</span>과 <span class="font-semibold text-red-500 dark:text-red-400">데이터 정합성 이슈</span>가 생기면 서비스 신뢰도를 떨어뜨리는 치명적 요인이라 봤습니다.\n이를 해결하기 위해 <span class="font-semibold text-[#2563EB] dark:text-[#8aa8e8]">이벤트 목록 조회 병목 문제</span>와 <span class="font-semibold text-[#2563EB] dark:text-[#8aa8e8]">투표 동시성 보장</span>에 집중했습니다.',
    techStack: ['SpringBoot', 'Query DSL', 'MySQL', 'Redis', 'GCP', 'Docker', 'Github', 'JIRA', 'JMeter'],
    roles: [
      {
        icon: '🔧',
        title: '이벤트·피드 도메인 전담',
        detail: '사용자 참여(이벤트·투표)와 콘텐츠(피드·댓글·좋아요·검색) 기능 전체 구현',
      },
      {
        icon: '🚀',
        title: '배포/운영',
        detail: 'GCP·Docker 기반 배포 환경 구성, GitHub Actions CI/CD 파이프라인 + SonarCloud 코드 품질 자동 검증 연동',
      },
      {
        icon: '👥',
        title: '팀 리딩(부팀장)',
        detail: '스프린트 계획·우선순위 조율, <a href="https://dev99-tale.tistory.com/69" target="_blank" rel="noopener noreferrer" class="font-semibold text-[#2563EB] underline underline-offset-2 hover:text-[#1d4ed8]">JIRA 기반 협업 가이드라인</a> 직접 설계·배포, JIRA-Slack 알림 연동으로 팀 협업 알림 체계 구축',
      },
    ],
    problemEnvironment: 'MacBook Air M2 · 24GB |\n Java 17 · Spring Boot 3.3.12 · MySQL 8.2 · Redis 7.4 | nGrinder 3.5.9 · Scouter 2.21.3',
    problemSections: [
      {
        headline: '문제 해결 1 — 이벤트 목록 조회 성능 개선',
        problem:
          '이벤트 목록 조회 시 연관 데이터(eventDetail, rewards) 로딩으로 <span class="font-semibold text-red-600 dark:text-red-300">N+1 쿼리 발생</span><ul class="mt-2 space-y-1 list-none pl-0"><li class="flex gap-2"><span class="mt-1 text-slate-400">•</span><span>동시 100명 기준 평균 응답시간 <span class="font-semibold text-red-600 dark:text-red-300">645ms</span>, TPS <span class="font-semibold text-red-600 dark:text-red-300">154.6</span> 수준</span></li><li class="flex gap-2"><span class="mt-1 text-slate-400">•</span><span>동시 1,000명 기준 평균 응답시간 <span class="font-semibold text-red-600 dark:text-red-300">6,818ms</span>, TPS <span class="font-semibold text-red-600 dark:text-red-300">138.7</span> 수준</span></li><li class="flex gap-2"><span class="mt-1 text-slate-400">•</span><span>전체 조회 후 메모리 필터링 구조 → 데이터 증가 시 성능 저하 우려</span></li></ul><div class="mt-4"><img loading="lazy" src="before-scouter-sql42.png" alt="Scouter XLog SQL Count 42" class="w-full rounded-lg border border-slate-200 object-contain dark:border-[#4a4a52]"/><p class="mt-1.5 text-right text-xs text-slate-500 dark:text-slate-400">Scouter XLog — 요청 1회당 SQL 42회 실행 확인</p></div>',
        thinking:
          '문제를 두 레이어로 분리해 접근했습니다.<div class="mt-3 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 dark:border-[#3f3f45] dark:bg-[#2f2f34]"><div class="font-semibold text-slate-800 dark:text-slate-100">1. 쿼리 비효율 → 근본적인 쿼리 개선 필요</div><div class="mt-2 font-semibold text-slate-800 dark:text-slate-100">2. 반복 조회 비용 → 이벤트 목록 특성(읽기 빈번 · 변경 적음) 기반 캐시 적용</div></div><div class="mt-3 flex items-start gap-3"><span class="rounded-md bg-blue-100 px-2.5 py-1 text-sm font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">이벤트 목록</span><span class="min-w-0 pt-0.5">조회 빈번 / 변경 적음 &nbsp;→ @Cacheable + Redis</span></div><div class="mt-3 font-semibold text-amber-600 dark:text-amber-300">👉 캐시만 적용하면 Cache Miss 시 N+1 문제가 그대로 남음,<br/>쿼리 최적화로 근본 원인을 먼저 제거한 뒤, 그 위에 캐시를 얹는 순서로 접근</div>',
        solution:
          '<div class="space-y-4"><div class="rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 dark:border-[#3f3f45] dark:bg-[#2f2f34]"><div class="text-lg font-extrabold text-slate-900 dark:text-slate-100">1단계 — 쿼리 최적화</div><div class="mt-2 space-y-1 text-base leading-relaxed text-slate-800 dark:text-slate-200"><div>QueryDSL <span class="font-mono font-semibold">leftJoin + fetchJoin</span>으로 연관 데이터를 한 번에 조회, N+1 제거</div><div>페이징 count 쿼리는 <span class="font-mono font-semibold">countDistinct</span>로 분리 보정</div></div><div class="mt-3 rounded-lg bg-[#1a1a1a] px-4 py-3 font-mono text-sm leading-relaxed text-[#e0e0e0]"><div class="mb-1.5 text-[#6b6b6b]">// EventQueryRepositoryImpl.java (109~116번 라인)</div><span class="text-[#d4b896]">queryFactory</span>.<span class="text-[#c8c8c8]">selectFrom</span>(<span class="text-[#e0e0e0]">event</span>)<br/>&nbsp;&nbsp;&nbsp;&nbsp;.<span class="text-[#c8c8c8]">leftJoin</span>(<span class="text-[#e0e0e0]">event.eventDetail</span>, <span class="text-[#e0e0e0]">detail</span>).<span class="text-[#c8c8c8]">fetchJoin</span>()<br/>&nbsp;&nbsp;&nbsp;&nbsp;.<span class="text-[#c8c8c8]">leftJoin</span>(<span class="text-[#e0e0e0]">event.rewards</span>, <span class="text-[#e0e0e0]">reward</span>).<span class="text-[#c8c8c8]">fetchJoin</span>()<br/>&nbsp;&nbsp;&nbsp;&nbsp;.<span class="text-[#c8c8c8]">where</span>(<span class="text-[#e0e0e0]">event.deletedAt</span>.<span class="text-[#c8c8c8]">isNull</span>())<br/>&nbsp;&nbsp;&nbsp;&nbsp;.<span class="text-[#c8c8c8]">offset</span>(<span class="text-[#e0e0e0]">pageable</span>.<span class="text-[#c8c8c8]">getOffset</span>())<br/>&nbsp;&nbsp;&nbsp;&nbsp;.<span class="text-[#c8c8c8]">limit</span>(<span class="text-[#e0e0e0]">pageable</span>.<span class="text-[#c8c8c8]">getPageSize</span>())<br/>&nbsp;&nbsp;&nbsp;&nbsp;.<span class="text-[#c8c8c8]">fetch</span>();<div class="mt-1.5 text-[#6b6b6b]">// count 쿼리: countDistinct로 rewards join 중복 제거 (118~120번 라인)</div></div><div class="mt-3"><img loading="lazy" src="phase1-scouter-sql2.png" alt="fetchJoin 후 SQL 2회" class="w-full rounded-lg border border-slate-200 object-contain dark:border-[#4a4a52]"/><p class="mt-1.5 text-right text-xs text-slate-500 dark:text-slate-400">Scouter XLog — fetchJoin 적용 후 SQL 2회로 감소</p></div></div><div class="rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 dark:border-[#3f3f45] dark:bg-[#2f2f34]"><div class="text-lg font-extrabold text-slate-900 dark:text-slate-100">2단계 — 캐시 전략 적용</div><div class="mt-2 space-y-1 text-base leading-relaxed text-slate-800 dark:text-slate-200"><div>이벤트 목록(조회 빈번 · 변경 적음) → <span class="font-mono font-semibold">@Cacheable</span> + Redis 캐시</div><div>인메모리 캐시 → Redis 캐시 전환 (분산 환경 서버 재시작 시 캐시 유실 대응)</div><div>TTL · <span class="font-mono font-semibold">@CacheEvict</span> 설계로 캐시 정합성 유지</div></div><div class="mt-3 rounded-lg bg-[#1a1a1a] px-4 py-3 font-mono text-sm leading-relaxed text-[#e0e0e0]"><div class="text-[#6b6b6b]">// EventReadService.java (122~123번 라인)</div><div class="mb-1.5 text-[#6b6b6b]">// [Phase 2-A] 이벤트 목록 Redis 캐시 적용 — Cache Hit 시 DB 조회 0회</div><span class="text-[#c8a882]">@Cacheable</span>(<span class="text-[#b8b8a0]">value</span> = <span class="text-[#b8b8a0]">"availableEvents"</span>, <span class="text-[#b8b8a0]">key</span> = <span class="text-[#b8b8a0]">&quot;&#39;feed-available&#39;&quot;</span>, <span class="text-[#b8b8a0]">unless</span> = <span class="text-[#b8b8a0]">"#result.isEmpty()"</span>)<br/><span class="text-[#c8a882]">public</span> <span class="text-[#d4b896]">List&lt;EventSummaryDto&gt;</span> <span class="text-[#c8c8c8]">getFeedAvailableEvents</span>() { ... }</div><div class="mt-3"><img loading="lazy" src="phase2a-scouter-cache-hit2.png" alt="Cache Hit SQL 0회" class="w-full rounded-lg border border-slate-200 object-contain dark:border-[#4a4a52]"/><p class="mt-1.5 text-right text-xs text-slate-500 dark:text-slate-400">Scouter — 재요청(Cache Hit) SQL 0회, Redis에서 즉시 응답</p></div></div></div>',
        result:
          '<div class="overflow-hidden rounded-xl border border-slate-200/95 bg-white shadow-[0_6px_28px_-6px_rgba(30,58,95,0.14)] dark:border-[#42424c] dark:bg-[#2c2c34]"><table class="w-full table-fixed border-collapse text-left text-base text-slate-700 dark:text-slate-300"><caption class="sr-only">성능 개선 결과</caption><thead><tr class="border-b border-slate-200 bg-slate-50 dark:border-[#40404a] dark:bg-[#32323a]"><th class="px-3 py-2 text-sm font-bold text-slate-600 dark:text-slate-300">항목</th><th class="px-3 py-2 text-sm font-bold text-slate-600 dark:text-slate-300">Before</th><th class="px-3 py-2 text-sm font-bold text-slate-600 dark:text-slate-300">After</th><th class="px-3 py-2 text-sm font-bold text-slate-600 dark:text-slate-300">개선율</th></tr></thead><tbody><tr><td class="border-t border-slate-100 px-3 py-2.5 font-semibold text-slate-900 dark:border-[#3a3a44] dark:text-white">응답시간 (동시 100명)</td><td class="border-t border-slate-100 px-3 py-2.5 tabular-nums text-slate-600 dark:border-[#3a3a44] dark:text-slate-400">645ms</td><td class="border-t border-slate-100 px-3 py-2.5 font-semibold tabular-nums text-blue-700 dark:border-[#3a3a44] dark:text-blue-300">209ms</td><td class="border-t border-slate-100 px-3 py-2.5 font-bold text-emerald-600 dark:border-[#3a3a44] dark:text-emerald-400">-68%</td></tr><tr><td class="border-t border-slate-100 px-3 py-2.5 font-semibold text-slate-900 dark:border-[#3a3a44] dark:text-white">응답시간 (동시 1,000명)</td><td class="border-t border-slate-100 px-3 py-2.5 tabular-nums text-slate-600 dark:border-[#3a3a44] dark:text-slate-400">6,818ms</td><td class="border-t border-slate-100 px-3 py-2.5 font-semibold tabular-nums text-blue-700 dark:border-[#3a3a44] dark:text-blue-300">638ms</td><td class="border-t border-slate-100 px-3 py-2.5 font-bold text-emerald-600 dark:border-[#3a3a44] dark:text-emerald-400">-91%</td></tr><tr><td class="border-t border-slate-100 px-3 py-2.5 font-semibold text-slate-900 dark:border-[#3a3a44] dark:text-white">TPS (동시 100명)</td><td class="border-t border-slate-100 px-3 py-2.5 tabular-nums text-slate-600 dark:border-[#3a3a44] dark:text-slate-400">154.6</td><td class="border-t border-slate-100 px-3 py-2.5 font-semibold tabular-nums text-blue-700 dark:border-[#3a3a44] dark:text-blue-300">470.1</td><td class="border-t border-slate-100 px-3 py-2.5 font-bold text-emerald-600 dark:border-[#3a3a44] dark:text-emerald-400">+204%</td></tr><tr><td class="border-t border-slate-100 px-3 py-2.5 font-semibold text-slate-900 dark:border-[#3a3a44] dark:text-white">TPS (동시 1,000명)</td><td class="border-t border-slate-100 px-3 py-2.5 tabular-nums text-slate-600 dark:border-[#3a3a44] dark:text-slate-400">138.7</td><td class="border-t border-slate-100 px-3 py-2.5 font-semibold tabular-nums text-blue-700 dark:border-[#3a3a44] dark:text-blue-300">438.3</td><td class="border-t border-slate-100 px-3 py-2.5 font-bold text-emerald-600 dark:border-[#3a3a44] dark:text-emerald-400">+216%</td></tr><tr><td class="border-t border-slate-100 px-3 py-2.5 font-semibold text-slate-900 dark:border-[#3a3a44] dark:text-white">SQL Count</td><td class="border-t border-slate-100 px-3 py-2.5 tabular-nums text-slate-600 dark:border-[#3a3a44] dark:text-slate-400">42회</td><td class="border-t border-slate-100 px-3 py-2.5 font-semibold tabular-nums text-blue-700 dark:border-[#3a3a44] dark:text-blue-300">0회 (Cache Hit)</td><td class="border-t border-slate-100 px-3 py-2.5 font-bold text-emerald-600 dark:border-[#3a3a44] dark:text-emerald-400">-100%</td></tr></tbody></table></div><div class="mt-4 grid grid-cols-2 gap-3"><div><p class="mb-1.5 text-sm font-semibold text-slate-500 dark:text-slate-400">nGrinder — 동시 100명 Before</p><img loading="lazy" src="before-ngrinder-v100.png" alt="Before nGrinder V100" class="w-full rounded-lg border border-slate-200 object-contain dark:border-[#4a4a52]"/></div><div><p class="mb-1.5 text-sm font-semibold text-slate-500 dark:text-slate-400">nGrinder — 동시 100명 After</p><img loading="lazy" src="phase2a-ngrinder-v100.png" alt="After nGrinder V100" class="w-full rounded-lg border border-slate-200 object-contain dark:border-[#4a4a52]"/></div><div><p class="mb-1.5 text-sm font-semibold text-slate-500 dark:text-slate-400">nGrinder — 동시 1,000명 Before</p><img loading="lazy" src="before-ngrinder-v1000.png" alt="Before nGrinder V1000" class="w-full rounded-lg border border-slate-200 object-contain dark:border-[#4a4a52]"/></div><div><p class="mb-1.5 text-sm font-semibold text-slate-500 dark:text-slate-400">nGrinder — 동시 1,000명 After</p><img loading="lazy" src="phase2a-ngrinder-v1000.png" alt="After nGrinder V1000" class="w-full rounded-lg border border-slate-200 object-contain dark:border-[#4a4a52]"/></div></div>',
      },
      {
        headline: '문제 해결 2 — 피드 투표 동시성 문제',
        problem:
          '중복 투표 방지 로직이 코드 레벨에만 존재, DB 유니크 제약 없음<br/>→ 동시 요청 시 <span class="font-semibold text-red-600 dark:text-red-300">TOCTOU(검사-사용 사이 타이밍) 취약점</span> — 중복 투표 데이터 삽입 발생',
        thinking:
          '코드 레벨 중복 검사만으로는 동시 요청의 <span class="font-semibold text-red-600 dark:text-red-300">TOCTOU 문제</span>를 해결할 수 없습니다.<br/>투표 수 갱신도 DB 내 카운터 관리는 <span class="font-semibold text-red-600 dark:text-red-300">락 경합</span>이라는 구조적 한계가 있었습니다.<ul class="mt-3 space-y-1.5 list-none pl-0"><li class="flex gap-2"><span class="mt-1 text-slate-400">•</span><span><span class="font-semibold text-[#2563EB] dark:text-[#8aa8e8]">DB 유니크 제약 추가</span> — 코드 레벨 우회 불가능한 물리적 중복 차단</span></li><li class="flex gap-2"><span class="mt-1 text-slate-400">•</span><span><span class="font-semibold text-[#2563EB] dark:text-[#8aa8e8]">트랜잭션 구조 개선(NOT_SUPPORTED)</span> — 제약 위반 예외 발생 시 정상 응답 처리</span></li><li class="flex gap-2"><span class="mt-1 text-slate-400">•</span><span><span class="font-semibold text-[#2563EB] dark:text-[#8aa8e8]">Redis INCR 원자적 연산</span> — DB 락과 완전히 독립적인 카운터 관리</span></li></ul><div class="mt-3 font-semibold text-amber-600 dark:text-amber-300">👉 Redis INCR은 DB 트랜잭션과 분리된 원자적 연산 — 락 경합 구조 자체를 제거</div>',
        solution:
          '<div class="space-y-4"><div class="rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 dark:border-[#3f3f45] dark:bg-[#2f2f34]"><div class="text-lg font-extrabold text-slate-900 dark:text-slate-100">1단계 — DB 유니크 제약 추가</div><div class="mt-3 rounded-lg bg-[#1a1a1a] px-4 py-3 font-mono text-sm leading-relaxed text-[#e0e0e0]"><div class="mb-1.5 text-[#6b6b6b]">// FeedVote.java (24~26번 라인)</div><span class="text-[#c8a882]">@UniqueConstraint</span>(<span class="text-[#b8b8a0]">name</span> = <span class="text-[#b8b8a0]">"uk_feed_votes_event_voter"</span>,<br/>&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#b8b8a0]">columnNames</span> = {<span class="text-[#b8b8a0]">"event_id"</span>, <span class="text-[#b8b8a0]">"voter_id"</span>})</div></div><div class="rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 dark:border-[#3f3f45] dark:bg-[#2f2f34]"><div class="text-lg font-extrabold text-slate-900 dark:text-slate-100">2단계 — 투표 저장 로직 분리 + 예외 처리</div><div class="mt-2 text-base leading-relaxed text-slate-800 dark:text-slate-200">투표 저장 로직을 별도 서비스로 분리 — 중복 데이터 삽입 시도 시 예외 처리로 200 반환</div><div class="mt-3 rounded-lg bg-[#1a1a1a] px-4 py-3 font-mono text-sm leading-relaxed text-[#e0e0e0]"><div class="mb-1.5 text-[#6b6b6b]">// FeedVoteService.java (59번 라인)</div><span class="text-[#c8a882]">@Transactional</span>(<span class="text-[#b8b8a0]">propagation</span> = <span class="text-[#d4b896]">Propagation</span>.<span class="text-[#c8c8c8]">NOT_SUPPORTED</span>)<br/><span class="text-[#c8a882]">public</span> <span class="text-[#d4b896]">FeedVoteResponseDto</span> <span class="text-[#c8c8c8]">voteFeed</span>(...) {<br/>&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#c8a882]">try</span> {<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;savedVote = feedVotePersistenceService.<span class="text-[#c8c8c8]">saveVote</span>(vote);<br/>&nbsp;&nbsp;&nbsp;&nbsp;} <span class="text-[#c8a882]">catch</span> (<span class="text-[#d4b896]">DataIntegrityViolationException</span> e) {<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#c8a882]">return</span> <span class="text-[#d4b896]">FeedVoteResponseDto</span>.<span class="text-[#c8c8c8]">success</span>(<span class="text-[#c8a882]">false</span>, ...); <span class="text-[#6b6b6b]">// 중복 → 200 반환</span><br/>&nbsp;&nbsp;&nbsp;&nbsp;}<br/>}</div></div><div class="rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 dark:border-[#3f3f45] dark:bg-[#2f2f34]"><div class="text-lg font-extrabold text-slate-900 dark:text-slate-100">3단계 — Redis INCR 원자적 연산</div><div class="mt-2 text-base leading-relaxed text-slate-800 dark:text-slate-200">투표 수를 DB에서 직접 업데이트하면 동시 요청 시 트랜잭션 충돌이 발생합니다.<br/> 카운터를 Redis로 분리해 DB 락 경합 자체를 제거했습니다.</div><div class="mt-3 rounded-lg bg-[#1a1a1a] px-4 py-3 font-mono text-sm leading-relaxed text-[#e0e0e0]"><div class="mb-1.5 text-[#6b6b6b]">// FeedVoteService.java</div><span class="text-[#d4b896]">redisTemplate</span>.<span class="text-[#c8c8c8]">opsForValue</span>().<span class="text-[#c8c8c8]">increment</span>(<span class="text-[#b8b8a0]">"vote:count:"</span> + feedId);</div></div></div>',
        result:
          '동시 50→3,000명 전 구간 <span class="font-bold text-emerald-600 dark:text-emerald-400">에러율 0%</span>, <span class="font-bold text-emerald-600 dark:text-emerald-400">중복 투표 0건</span>, <span class="font-bold text-[#2563EB] dark:text-[#8aa8e8]">DB count = Redis count 정확히 일치</span><div class="mt-4 grid grid-cols-2 gap-3"><div><p class="mb-1.5 text-sm font-semibold text-slate-500 dark:text-slate-400">nGrinder — 동시 500명, 500/500 성공 · DB=500, Redis=500</p><img loading="lazy" src="phase2b-redis-v500.png" alt="phase2b Redis V500" class="w-full rounded-lg border border-slate-200 object-contain dark:border-[#4a4a52]"/></div><div><p class="mb-1.5 text-sm font-semibold text-slate-500 dark:text-slate-400">nGrinder — 동시 1,000명, 1,000/1,000 성공 · DB=1,000, Redis=1,000</p><img loading="lazy" src="phase2b-redis-v1000.png" alt="phase2b Redis V1000" class="w-full rounded-lg border border-slate-200 object-contain dark:border-[#4a4a52]"/></div><div><p class="mb-1.5 text-sm font-semibold text-slate-500 dark:text-slate-400">nGrinder — 동시 3,000명, 3,000/3,000 성공 · DB=3,000, Redis=3,000</p><img loading="lazy" src="phase2b-redis-v3000.png" alt="phase2b Redis V3000" class="w-full rounded-lg border border-slate-200 object-contain dark:border-[#4a4a52]"/></div><div><p class="mb-1.5 text-sm font-semibold text-slate-500 dark:text-slate-400">Redis count = DB count 일치 검증</p><img loading="lazy" src="phase2b-redis-count-verify.png" alt="Redis count 검증" class="w-full rounded-lg border border-slate-200 object-contain dark:border-[#4a4a52]"/></div></div>',
      },
    ],
    githubUrl: 'https://github.com/dbp-jack/FeedShop_Backend_Refactoring',
  },
  {
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
        description: 'Spring Cloud 기반 MSA 구조로, 각 도메인을 독립 서비스로 분리해 배포·변경 단위를 최소화했습니다.',
        items: [
          {
            bullets: [
              '10개 이상의 서비스(Gateway·Eureka·각 마이크로서비스·독립 PostgreSQL·Redis·Zipkin)를 단일 파일로 통합 구성',
              '각 서비스마다 Actuator 헬스체크를 설정해 상태를 자동 모니터링하고, depends_on + wait-for-it.sh로 Eureka → Gateway → 각 서비스 순의 기동 순서를 제어했습니다.',
            ],
          },
        ],
      },
      {
        title: 'Eureka',
        items: [
          {
            bullets: [
              '서비스 디스커버리 서버를 직접 구성. 모든 서비스가 기동 시 Eureka에 자동 등록되어 서비스 간 직접 의존 없이 이름 기반으로 통신',
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
      '허브 센터 기반 B2B 물류 관리 및 배송 시스템\n경기도 허브의 상품이 부산 허브로 이동하고, 최종 수령 업체에 배송되기까지의 허브 간 물류 흐름을 통합 관리하는 플랫폼입니다.\n다수의 기업·허브·배송 담당자가 시스템을 사용하는 구조 특성상 인증과 권한 관리가 핵심 기반이었고,\nAuth·User·Gateway 도메인을 전담하며 서비스 간 의존성을 최소화하는 인증 구조를 설계했습니다.',
    developerPerspective:
      'B2B 물류 시스템은 다수의 서비스가 연계되는 구조로, 인증과 사용자 관리가 한 모듈에 혼재되면 인증 정책 하나를 바꿀 때, <span class="font-semibold text-red-500 dark:text-red-400">사용자 도메인까지 배포 단위로 엮이는</span> 문제가 발생합니다. 또한 매 요청마다 User 서비스를 재조회하는 방식은 <span class="font-semibold text-red-500 dark:text-red-400">서비스 간 결합도를 높이고</span>, <span class="font-semibold text-red-500 dark:text-red-400">User 서비스 장애 시 인증 전체가 영향받는</span> 위험을 내포하고 있었습니다.\n단순한 기능 분리가 아닌 <span class="font-semibold text-[#2563EB] dark:text-[#8aa8e8]">SRP</span>를 기준으로 변경 이유가 다른 두 책임을 별도 모듈로 분리하고, 로그인 시점에 <span class="font-semibold text-[#2563EB] dark:text-[#8aa8e8]">userId·role을 JWT payload에 포함</span>해\n이후 요청에서 User 서비스 재조회 없이 <span class="font-semibold text-[#2563EB] dark:text-[#8aa8e8]">Gateway에서 직접 처리</span>하는 구조를 선택했습니다.\n 이를 통해 인증 정책 변경 시 Auth·Gateway만 수정하고 User 모듈은 독립적으로 유지할 수 있는 구조를 만들었습니다.',
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
      '인증 이후 요청마다 <span class="font-semibold text-red-600 dark:text-red-300">사용자 정보 반복 조회</span> → 서비스 간 호출 의존 증가, <span class="font-semibold text-red-600 dark:text-red-300">DB 부하 가중</span><br />인증(Auth)과 사용자(User) 기능 <span class="font-semibold text-red-600 dark:text-red-300">경계 혼재</span> → 인증 정책 변경 시 사용자 영역까지 영향 확산',
    thinking:
      '인증과 사용자 관리가 한 모듈에 혼재된 구조는 인증 정책 하나를 바꿀 때 사용자 로직까지 영향을 받고, 매 요청마다 User 서비스를 재호출하면 서비스 간 의존이 깊어집니다.<br />두 문제가 같은 레이어에 있지 않다고 보고, 경계 설계와 호출 구조를 분리해 판단했습니다.<br />인증 정책 변화와 런타임 트래픽 비용을 각각 줄이는 방향이 필요했습니다.<br /><br />문제를 두 레이어로 분리해 접근했습니다.<div class="mt-3 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 dark:border-[#3f3f45] dark:bg-[#2f2f34]"><div class="font-semibold text-slate-800 dark:text-slate-100">1. 모듈 경계 혼재 → 책임 기준으로 Auth/User 분리 필요</div><div class="mt-2 font-semibold text-slate-800 dark:text-slate-100">2. 런타임 재호출 → 토큰 컨텍스트로 호출 자체를 줄이는 구조 필요</div></div><div class="mt-3 flex items-start gap-3"><span class="rounded-md bg-blue-100 px-2.5 py-1 text-sm font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">Auth</span><span class="min-w-0 pt-0.5">인증 정책 변경 시 영향이 Auth·Gateway로 수렴하도록 경계 설계<div class="mt-1 text-sm text-slate-500 dark:text-slate-400">(인증과 사용자 도메인은 변경 주기·장애 영향이 달라 같은 모듈에 두면 작은 수정도 전체 배포 단위로 커짐)</div></span></div><div class="mt-2 flex items-start gap-3"><span class="rounded-md bg-blue-100 px-2.5 py-1 text-sm font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">User 재호출</span><span class="min-w-0 pt-0.5">로그인 시점에 컨텍스트를 토큰에 포함 → 대부분 경로에서 재조회 없이 권한 판단 가능<div class="mt-1 text-sm text-slate-500 dark:text-slate-400">(검증은 Gateway에서 공통 처리하고, 추가 정보가 필요한 경우에만 User 서비스 선택 호출)</div></span></div><div class="mt-3 font-semibold text-amber-600 dark:text-amber-300">👉 책임 경계 분리와 인증 흐름 단순화를 함께 가져가야 한다고 판단</div>',
    solution:
      '<div class="space-y-3"><div class="rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 dark:border-[#3f3f45] dark:bg-[#2f2f34]"><div class="text-lg font-extrabold text-slate-900 dark:text-slate-100">1단계 — 서비스 경계 분리</div><div class="mt-2 space-y-1 text-base leading-relaxed text-slate-800 dark:text-slate-200"><div>인증은 <span class="rounded-md bg-slate-200/80 px-2 py-0.5 font-mono text-sm dark:bg-[#3a3a45]">Auth</span> 모듈, 사용자 관리는 <span class="rounded-md bg-slate-200/80 px-2 py-0.5 font-mono text-sm dark:bg-[#3a3a45]">User</span> 모듈로 분리 → 서비스 경계 명확화</div><div><span class="rounded-md bg-slate-200/80 px-2 py-0.5 font-mono text-sm dark:bg-[#3a3a45]">Auth</span> 로그인/회원가입 처리 후 JWT(access/refresh) 발급, 토큰에 <span class="rounded-md bg-slate-200/80 px-2 py-0.5 font-mono text-sm dark:bg-[#3a3a45]">userId</span>, <span class="rounded-md bg-slate-200/80 px-2 py-0.5 font-mono text-sm dark:bg-[#3a3a45]">role</span> 포함</div></div><div class="mt-5 text-lg font-extrabold text-slate-900 dark:text-slate-100">데이터 동기화 전략 — Auth/User 도메인 분리 구조도</div><div class="mt-2 block"><img loading="lazy" src="3m-sync-strategy.png" alt="데이터 동기화 전략 구조도" class="mx-auto h-auto max-h-[26rem] w-full max-w-4xl rounded-lg border border-slate-200 bg-white object-contain shadow-sm dark:border-[#4a4a52]" /></div></div><div class="rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 dark:border-[#3f3f45] dark:bg-[#2f2f34]"><div class="text-lg font-extrabold text-slate-900 dark:text-slate-100">2단계 — 인증 흐름 단순화</div><div class="mt-2 space-y-1 text-base leading-relaxed text-slate-800 dark:text-slate-200"><div><span class="rounded-md bg-slate-200/80 px-2 py-0.5 font-mono text-sm dark:bg-[#3a3a45]">Gateway</span> 인증필터에서 JWT 검증 후 <span class="rounded-md bg-slate-200/80 px-2 py-0.5 font-mono text-sm dark:bg-[#3a3a45]">X-User-*</span> 헤더로 사용자 컨텍스트 전달</div><div>권한 검증은 AOP(<span class="rounded-md bg-slate-200/80 px-2 py-0.5 font-mono text-sm dark:bg-[#3a3a45]">@RequiresMasterRole</span>)로 분리 → 역할 체크 로직 통합</div><div>대부분 경로에서 <span class="rounded-md bg-slate-200/80 px-2 py-0.5 font-mono text-sm dark:bg-[#3a3a45]">User</span> 서비스 재호출 최소화 → 추가 정보 필요 시에만 선택 호출</div></div><div class="mt-5 text-lg font-extrabold text-slate-900 dark:text-slate-100">JWT 기반 인증 토큰 발급으로 사용자 조회 빈도 낮추기 — 흐름도</div><div class="mt-2 block"><img loading="lazy" src="3m-jwt-flow.png" alt="JWT 기반 조회 절감 흐름도" class="mx-auto h-auto max-h-[26rem] w-full max-w-4xl rounded-lg border border-slate-200 bg-white object-contain shadow-sm dark:border-[#4a4a52]" /></div></div></div>',
    result:
      '인증 정책과 사용자 정책의 변경 범위를 각 모듈로 수렴시켜, 한 도메인 수정이 다른 도메인 배포로 이어지지 않는 구조를 마련했습니다.<div class="mt-3 overflow-hidden rounded-xl border border-slate-200/95 bg-white shadow-[0_6px_28px_-6px_rgba(30,58,95,0.14)] dark:border-[#42424c] dark:bg-[#2c2c34] dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.45)]"><table class="w-full table-fixed border-collapse text-left text-base text-slate-700 dark:text-slate-300"><caption class="sr-only">3M 결과 요약</caption><colgroup><col class="w-[14%] sm:w-[13%]" /><col class="w-[30%] sm:w-[29%]" /><col class="min-w-0 w-[56%] sm:w-[58%]" /></colgroup><thead><tr class="border-b border-slate-200 bg-slate-50 dark:border-[#40404a] dark:bg-[#32323a]"><th scope="col" class="px-2.5 py-2 text-left text-sm font-bold text-slate-600 dark:text-slate-300">항목</th><th scope="col" class="px-3 py-2 text-left text-sm font-bold text-slate-600 dark:text-slate-300">개선 전</th><th scope="col" class="px-3 py-2 pl-3 text-left text-sm font-bold text-slate-600 dark:text-slate-300 sm:pl-4">개선 후</th></tr></thead><tbody><tr><td class="border-t border-slate-100 px-2.5 py-2.5 text-[0.8125rem] font-semibold leading-snug text-slate-900 dark:border-[#3a3a44] dark:text-white">인증 정책 영향</td><td class="border-t border-slate-100 px-3 py-2.5 text-slate-600 dark:border-[#3a3a44] dark:text-slate-400">인증 정책 변경 영향이 Auth·User 양쪽으로 퍼지기 쉬운 구조</td><td class="border-t border-slate-100 px-3 py-2.5 pl-3 font-semibold leading-relaxed text-blue-700 dark:border-[#3a3a44] dark:text-blue-300 sm:pl-4">검토·배포 단위가 Auth·Gateway 중심으로 수렴하도록 정리</td></tr><tr><td class="border-t border-slate-100 px-2.5 py-2.5 text-[0.8125rem] font-semibold leading-snug text-slate-900 dark:border-[#3a3a44] dark:text-white">사용자 정책 영향</td><td class="border-t border-slate-100 px-3 py-2.5 text-slate-600 dark:border-[#3a3a44] dark:text-slate-400">사용자 정책 변경 영향도 두 서비스에 동시에 미칠 수 있는 구조</td><td class="border-t border-slate-100 px-3 py-2.5 pl-3 font-semibold leading-relaxed text-blue-700 dark:border-[#3a3a44] dark:text-blue-300 sm:pl-4">사용자 도메인 수정 범위가 User 모듈에 집중되도록 정리</td></tr><tr><td class="border-t border-slate-100 px-2.5 py-2.5 text-[0.8125rem] font-semibold leading-snug text-slate-900 dark:border-[#3a3a44] dark:text-white">Auth→User Feign</td><td class="border-t border-slate-100 px-3 py-2.5 text-slate-600 dark:border-[#3a3a44] dark:text-slate-400">Auth·User 책임이 섞이면서 서비스 간 연동(Feign) 호출이 누적되기 쉬움</td><td class="border-t border-slate-100 px-3 py-2.5 pl-3 font-semibold leading-relaxed text-blue-700 dark:border-[#3a3a44] dark:text-blue-300 sm:pl-4"><span class="font-mono text-[0.8125rem]">createUser</span>(회원가입), <span class="font-mono text-[0.8125rem]">getUserInfo</span>(MASTER 검증) 등으로 한정. 일반 인증 조회용 User Feign 호출 제거</td></tr></tbody></table></div>',
    githubUrl: 'https://github.com/sparta-i4u/sparta-msa',
  },
]
