/** Shared copy + lists for the portfolio site and the `/pdf` A4 view (single source of truth). */

export const HERO_SKILL_TAGS = [
  'Spring',
  'JPA',
  'QueryDSL',
  'Java',
  'PostgreSQL',
  'Redis',
  'Jira',
  'GCP',
] as const

export type HeroPersonalRow = {
  icon: string
  text: string
  href: string | null
}

export const HERO_PERSONAL_INFO: readonly HeroPersonalRow[] = [
  { icon: 'ri-map-pin-2-line', text: '서울특별시 관악구', href: null },
  { icon: 'ri-phone-line', text: '+82-10-3084-1488', href: null },
  {
    icon: 'ri-github-fill',
    text: 'github.com/dbp-jack',
    href: 'https://github.com/dbp-jack',
  },
  {
    icon: 'ri-linkedin-box-fill',
    text: 'linkedin.com/in/minsoo-jeong-31861b401',
    href: 'https://linkedin.com/in/minsoo-jeong-31861b401',
  },
] as const

export const HERO_ROLE_BADGE = 'Backend Software Engineer'
export const HERO_NAME = '정민수'
export const HERO_ROLE_TITLE = '성능 병목을 수치로 분석·해결하고, 팀 협업 구조를 직접 설계하는 백엔드 개발자입니다.'
export const HERO_TECH_STACK_LABEL = '기술 스택'

export const ABOUT_SECTION = {
  kicker: 'About',
  title: '저는 이렇게 일합니다',
  intro:
    '문제는 수치로 파악해 해결하고, 협력은 팀 흐름을 맞춰 정리하며, 맡은 임무는 끝까지 완수합니다.',
} as const

export const ABOUT_CARDS = [
  {
    icon: 'ri-bar-chart-2-line',
    title: '문제 해결 능력',
    subtitle: '성능 병목을 찾아 수치로 증명',
    description:
      'N+1 쿼리 → fetchJoin + Redis 캐싱으로 응답시간 <span class="font-bold text-[#2563EB]">91% 단축</span> (6.8s → 0.6s)\n\nScouter로 SQL 42회 발생 확인\n→ QueryDSL fetchJoin으로 2회 축소\n→ 읽기 빈번·변경 적은 특성 분석 후 Redis@Cacheable 추가 적용\nnGrinder 동시 1,000명 기준 수치 검증',
  },
  {
    icon: 'ri-node-tree',
    title: '협업 시스템 설계',
    subtitle: '백지 상태에서 팀 협업을 만든 경험',
    description:
      '제로베이스에서 팀 스프린트 <span class="font-bold text-[#2563EB]">가시성 확보</span>\n\n스프린트 일정·작업 범위 모두 없던 상태에서 JIRA 가이드라인 배포로 주간 스프린트를 구조화하고, Slack 실시간 연동으로 팀 전체 진척 상황을 즉시 파악할 수 있는 환경을 만들었습니다.',
  },
  {
    icon: 'ri-checkbox-circle-line',
    title: '오너십',
    subtitle: '기획부터 시연까지 — 단독 주도로 완수',
    description:
      '현장실습에서 건설현장 안전관리 대시보드를 기획·설계·개발 전 과정 단독 담당\n\n완성도를 위해 기간 연장을 자발적으로 제안하고, 고양 킨텍스 시연 행사까지 성공적으로 완수했습니다.',
  },
] as const

export const PROJECTS_SECTION = {
  kicker: 'Projects',
  title: '이렇게 만들었습니다',
  subtitle:
    '각 프로젝트는 무엇을 만들었는지보다, 왜 그렇게 만들었는지에 집중합니다.',
} as const

export const EXPERIENCE_SECTION = {
  kicker: 'Experience',
  title: '걸어온 여정',
  subtitle: '직무 관련성이 높은 경험부터 최신순으로 정리했습니다.',
} as const

export type ExperienceCategory = '경력' | '교육' | '대외활동'

export type ExperienceItem = {
  period: string
  category: ExperienceCategory
  title: string
  detail: string
}

export const EXPERIENCE_ITEMS: readonly ExperienceItem[] = [
  {
    period: '2025.05 – 2025.09',
    category: '교육',
    title: '청년취업사관학교',
    detail: 'Spring Boot 기반 Java 백엔드 전문가 과정 · 팀 프로젝트 리딩 및 발표',
  },
  {
    period: '2025.02 – 2025.05',
    category: '교육',
    title: '팀스파르타 — AI 활용 백엔드 아키텍처 심화 과정',
    detail: 'DDD 설계 · Kafka · Redis 분산처리 · JMeter 성능 테스트 · 테코톡 발표 (분산 트랜잭션)',
  },
  {
    period: '2023.09 – 2024.01',
    category: '대외활동',
    title: '캡스톤디자인 — ECG 센서 기반 실시간 부정맥 감지 웹 서비스',
    detail: '응답 지연 72% 단축 (320ms → 90ms) · 학술 논문 발표 · 베트남 글로벌 교류회 발표',
  },
  {
    period: '2023.07 – 2023.11',
    category: '대외활동',
    title: 'Google GDSC 대전대',
    detail: 'C언어 교육 커리큘럼 기획 · GitHub 기반 실습 코드 관리',
  },
  {
    period: '2023.03 – 2023.08',
    category: '경력',
    title: '(주)Elssen — ICT 인턴십 및 하계현장실습',
    detail: '건설현장 안전관리 대시보드 기획·설계·개발 담당 · AJAX 기반 실시간 센서 데이터 시각화',
  },
] as const

export const CONTACT_SECTION = {
  kicker: 'Contact',
  title: '연락하기',
  subtitle: '아래 채널로 편하게 연락주세요.',
} as const

export const CONTACT_LINKS = [
  {
    icon: 'ri-github-fill',
    label: 'GitHub',
    href: 'https://github.com/dbp-jack',
  },
  {
    icon: 'ri-mail-line',
    label: 'dbp100402@gmail.com',
    href: 'mailto:dbp100402@gmail.com',
  },
  {
    icon: 'ri-links-line',
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/minsoo-jeong-31861b401',
  },
] as const

export const RESOURCES_SECTION = {
  kicker: 'Links',
  title: '자료 모음',
} as const

/** Projects 다음·Resources 앞, Contact 직전 — 마무리 톤의 짧은 글 (웹·PDF 공통) */
export const CLOSING_SECTION = {
  kicker: 'Closing',
  title: '앞으로의 방향',
  subtitle: '일하는 방식과 성장 방향을 짧게 담았습니다.',
} as const

export const CLOSING_BLOCKS = [
  {
    icon: 'ri-lightbulb-flash-line',
    titleEn: 'Development Philosophy',
    titleKo: '구현하기 전에 흐름을 먼저 설계합니다.',
    body:
      '<div><span class="mb-1.5 block text-base font-bold text-slate-900 dark:text-slate-100">설계 방식</span><span class="block leading-[1.72]">요구사항이 들어오면 구현 전에 전체 구조와 데이터 흐름을 먼저 설계합니다.</span></div>\n\n<div><span class="mb-1.5 block text-base font-bold text-slate-900 dark:text-slate-100">실제 적용</span><span class="block leading-[1.72]">FeedShop에서 캐시 전략을 데이터 특성별로 분리하고,\n3M에서 도메인 책임부터 나눈 뒤 인증 흐름을 설계한 것이\n모두 이 접근에서 나온 결과입니다.</span></div>\n\n<div><span class="mb-1.5 block text-base font-bold text-slate-900 dark:text-slate-100">지속적 개선</span><span class="block leading-[1.72]">기능 구현 후에도 더 나은 구조를 스스로 찾아보고,\n원인과 과정을 정리하며 개선하는 습관을 이어가고 있습니다.</span></div>',
  },
  {
    icon: 'ri-seedling-line',
    titleEn: 'Growth Direction',
    titleKo: '도구는 활용하되 판단은 양보하지 않습니다.',
    body:
      '<div><span class="mb-1.5 block text-base font-bold text-slate-900 dark:text-slate-100">도구 활용 방식</span><span class="block leading-[1.72]">구조 설계와 판단은 직접 수행하고, 반복적인 구현 작업에 AI 도구를 적극 활용합니다.\nFeedShop 프론트엔드를 이 방식으로 단독 구현했습니다.</span></div>\n\n<div><span class="mb-1.5 block text-base font-bold text-slate-900 dark:text-slate-100">현재 성장 방향</span><span class="block leading-[1.72]">PR마다 반복되는 코드리뷰 과정을 자동화하기 위해\nn8n 기반 워크플로를 구상하고 있습니다.</span></div>\n\n<div><span class="mb-1.5 block text-base font-bold text-slate-900 dark:text-slate-100">판단과 책임</span><span class="block leading-[1.72]">도구를 적극 활용하되, 어떤 구조로 만들지, 왜 이 기술을 선택할지,\n결과가 의도대로 동작하는지에 대한 판단과 책임은 스스로에게 둡니다.</span></div>',
  },
] as const

export type ResourceLink = {
  icon: string
  label: string
  description: string
  url: string
}

export const RESOURCE_LINKS: readonly ResourceLink[] = [
  {
    icon: 'ri-slideshow-2-line',
    label: 'FeedShop 프로젝트 기획서',
    description: '사용자 여정 분석부터 도메인 설계까지 — 기획 전 과정 문서',
    url: 'https://docs.google.com/document/d/11mKsXb3GQRfinyc0fYjn6MvsodHfxJZRFBkXZiOP6eA/edit?usp=sharing',
  },
  {
    icon: 'ri-notion-fill',
    label: '인턴십 현장실습 기록',
    description: '건설현장 안전관리 대시보드 기획·개발·시연 전 과정 정리',
    url: 'https://slime-face-7c4.notion.site/ICT-1fceeaa2f0af80a7aa88cd0bd37bdb7d?source=copy_link',
  },
  {
    icon: 'ri-article-line',
    label: 'JIRA 협업 가이드라인',
    description: '팀 스프린트 운영·티켓 규칙·Slack 연동까지 직접 작성한 가이드',
    url: 'https://dev99-tale.tistory.com/69',
  },
  {
    icon: 'ri-links-line',
    label: 'FeedShop 초기 기획 과정',
    description: '서비스 방향성 설정부터 MVP 범위 정의까지의 기획 흐름',
    url: 'https://docs.google.com/document/d/1XJ-STnZLo71kvtlduvHiM2kWS64wpwrl8-c4MY4anvE/edit?usp=sharing',
  },
]
