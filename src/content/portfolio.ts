/** Shared copy + lists for the portfolio site and the `/pdf` A4 view (single source of truth). */

export const HERO_SKILL_GROUPS = [
  {
    label: 'Core Backend',
    tags: ['Java', 'Spring', 'JPA', 'QueryDSL'],
  },
  {
    label: 'Data / Infra',
    tags: ['PostgreSQL', 'Redis', 'GCP'],
  },
  {
    label: 'Collaboration',
    tags: ['JIRA'],
  },
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
] as const

export const HERO_ROLE_BADGE = 'Backend Software Engineer'
export const HERO_NAME = '정민수'
export const HERO_ROLE_TITLE = '수치로 증명하고, 팀 흐름을 움직이는 백엔드 개발자'
export const HERO_TECH_STACK_LABEL = '기술 스택'

export const ABOUT_SECTION = {
  kicker: 'About',
  title: '저는 수치로 증명하고 책임감있게 일합니다',
  intro:
    'QueryDSL N+1 최적화·Redis 투표 동시성 제어·Gateway 인증 경계 적용 경험을 갖춘 백엔드 개발자',
} as const

export const ABOUT_CARDS = [
  {
    icon: 'ri-bar-chart-2-line',
    title: '문제 해결 능력',
    subtitle: '성능 병목을 찾아 수치로 증명',
    description:
      'N+1 쿼리 → fetchJoin + Redis 캐싱으로 응답시간 <span class="font-bold text-[#2563EB]">91% 단축</span> (6.8s → 0.6s)\nScouter로 SQL 42회 발생 확인 → QueryDSL fetchJoin으로 <span class="font-bold text-[#2563EB]">2회 축소</span>\n읽기 빈번·변경 적은 특성 분석 후 Redis@Cacheable 추가 적용\nnGrinder 동시 1,000명 기준 수치 검증',
  },
  {
    icon: 'ri-node-tree',
    title: '협업 시스템 설계',
    subtitle: '백지 상태에서 팀 협업을 만든 경험',
    description:
      '제로베이스에서 팀 스프린트 <span class="font-bold text-[#2563EB]">가시성 확보</span>\n스프린트 일정·작업 범위 모두 없던 상태에서 JIRA 가이드라인 배포로 주간 스프린트를 구조화\nSlack 실시간 연동으로 팀 전체 진척 상황을 즉시 파악할 수 있는 환경 구성',
  },
  {
    icon: 'ri-checkbox-circle-line',
    title: '책임감',
    subtitle: '끝까지 완수로 증명한 책임감',
    description:
      '건설현장 관리자 대시보드 기획·설계·개발 단독 주도\n연장된 기간 내 완성도를 높여서 구현했고, 고양 킨텍스 시연 행사까지 성공적으로 시연 연결',
  },
] as const

export const PROJECTS_SECTION = {
  kicker: 'Projects',
  title: '프로젝트를 소개합니다',
  subtitle:
    '각 프로젝트는 무엇을 만들었는지보다, 왜 그렇게 만들었는지에 집중합니다.',
} as const

export const PROJECT_WORKFLOW = {
  label: 'AI 활용 방식',
  title: '기획·설계는 직접, AI는 정의된 작업에 활용합니다',
  description:
    '요구사항과 설계 판단은 직접 수행하고, AI는 문서로 정의한 범위의 코드 작성에 활용합니다. 완성된 결과는 다시 직접 검증하고 수정합니다.',
  phases: [
    {
      owner: '직접 수행',
      detail: '요구사항·완료 기준 정의 · 구조·데이터 흐름·기술 선택',
      tone: 'direct',
    },
    {
      owner: 'AI 활용',
      detail: '정의된 범위의 코드 작성 · 반복 작업 수행',
      tone: 'ai',
    },
    {
      owner: '직접 검증',
      detail: '요구사항·실제 동작 대조 · 결과 수정',
      tone: 'direct',
    },
  ],
} as const

export const COLLABORATION_SECTION = {
  kicker: 'Collaboration',
  title: '협업 체계가 없던 팀에 만든 주간 스프린트 흐름',
  intro:
    '스프린트가 없던 팀에 주간 스프린트 방식을 도입하고, 스크럼으로 작업 범위와 진행 상황을 정리. JIRA 이슈·커밋은 Slack에 자동 공유하고, 일정·기술 자료는 Confluence에서 통합 관리.',
  guideUrl: 'https://dev99-tale.tistory.com/69',
  evidence: [
    {
      label: 'Plan',
      title: '주간 스프린트 운영',
      description: '백로그를 스프린트 단위로 나누고 담당·상태·완료 범위를 관리.',
      image: '/collaboration-jira-sprint.png',
      alt: 'JIRA 백로그에서 주간 스프린트와 업무 상태를 관리한 화면',
    },
    {
      label: 'Automate',
      title: 'JIRA-Slack 자동 공유',
      description: '이슈 생성과 연결된 커밋 정보를 팀 채널에 자동 공유.',
      image: '/collaboration-slack-automation.png',
      alt: 'JIRA 이슈와 Git 커밋 변경 사항이 Slack에 자동 공유된 화면',
    },
    {
      label: 'Organize',
      title: '일정·자료 통합 관리',
      description: '스프린트 일정과 기술·테스트 자료를 Confluence에 체계화.',
      image: '/collaboration-confluence-materials.png',
      alt: 'Confluence에 스프린트 일정과 프로젝트 자료를 체계적으로 정리한 화면',
    },
  ],
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
      '<div><span class="mb-1 block text-base font-bold text-slate-900 dark:text-slate-100">설계 방식</span><span class="block leading-[1.58]">요구사항이 들어오면 구현 전에 전체 구조와\n데이터 흐름을 먼저 설계합니다.</span></div>\n\n<div><span class="mb-1 block text-base font-bold text-slate-900 dark:text-slate-100">실제 적용</span><span class="block leading-[1.58]">FeedShop에서는 데이터 특성에 따라 캐시 전략을 분리했고,\n3M에서는 도메인 책임을 나누고, 인증 흐름을 설계했습니다.</span></div>\n\n<div><span class="mb-1 block text-base font-bold text-slate-900 dark:text-slate-100">지속적 개선</span><span class="block leading-[1.58]">기능 구현 후에도 원인과 과정을 되짚으며,\n더 나은 구조로 다듬는 습관을 이어가고 있습니다.</span></div>',
  },
  {
    icon: 'ri-seedling-line',
    titleEn: 'Growth Direction',
    titleKo: '도구는 활용하되 판단은 양보하지 않습니다.',
    body:
      '<div><span class="mb-1 block text-base font-bold text-slate-900 dark:text-slate-100">도구 활용 방식</span><span class="block leading-[1.58]">FeedShop 프론트엔드는 생성형 AI로 프롬프트를 설계하고,\nAI 툴로 구조를 잡고, 에이전트를 활용해 마무리 구현했습니다.</span></div>\n\n<div><span class="mb-1 block text-base font-bold text-slate-900 dark:text-slate-100">현재 성장 방향</span><span class="block leading-[1.58]">반복되는 코드리뷰 과정을 줄이기 위해,\nn8n 기반 코드리뷰 자동화 워크플로를 구상하고 있습니다.</span></div>\n\n<div><span class="mb-1 block text-base font-bold text-slate-900 dark:text-slate-100">판단과 책임</span><span class="block leading-[1.58]">도구를 활용하더라도 구조 설계, 기술 선택,\n결과 검증에 대한 판단과 책임은 직접 가져갑니다.</span></div>',
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
    label: '첫 번째 프로젝트 기획서',
    description: 'https://docs.google.com/document/d/11mKsXb3GQRfinyc0fYjn6MvsodHfxJZRFBkXZiOP6eA/edit?usp=sharing',
    url: 'https://docs.google.com/document/d/11mKsXb3GQRfinyc0fYjn6MvsodHfxJZRFBkXZiOP6eA/edit?usp=sharing',
  },
  {
    icon: 'ri-notion-fill',
    label: '인턴십 및 현장실습',
    description: 'https://slime-face-7c4.notion.site/ICT-1fceeaa2f0af80a7aa88cd0bd37bdb7d?source=copy_link',
    url: 'https://slime-face-7c4.notion.site/ICT-1fceeaa2f0af80a7aa88cd0bd37bdb7d?source=copy_link',
  },
  {
    icon: 'ri-article-line',
    label: 'JIRA 가이드라인',
    description: 'https://dev99-tale.tistory.com/69',
    url: 'https://dev99-tale.tistory.com/69',
  },
  {
    icon: 'ri-links-line',
    label: '초기 프로젝트 기획 과정',
    description: 'https://docs.google.com/document/d/1XJ-STnZLo71kvtlduvHiM2kWS64wpwrl8-c4MY4anvE/edit?usp=sharing',
    url: 'https://docs.google.com/document/d/1XJ-STnZLo71kvtlduvHiM2kWS64wpwrl8-c4MY4anvE/edit?usp=sharing',
  },
  {
    icon: 'ri-github-fill',
    label: 'FeedShop GitHub',
    description: 'https://github.com/dbp-jack/FeedShop_Backend_Refactoring',
    url: 'https://github.com/dbp-jack/FeedShop_Backend_Refactoring',
  },
  {
    icon: 'ri-book-open-line',
    label: 'FeedShop Wiki',
    description: 'https://github.com/dbp-jack/FeedShop_Backend_Refactoring/wiki',
    url: 'https://github.com/dbp-jack/FeedShop_Backend_Refactoring/wiki',
  },
  {
    icon: 'ri-github-fill',
    label: '3M GitHub',
    description: 'https://github.com/sparta-i4u/sparta-msa',
    url: 'https://github.com/sparta-i4u/sparta-msa',
  },
  {
    icon: 'ri-book-open-line',
    label: '3M Wiki',
    description: 'https://github.com/sparta-i4u/sparta-msa/wiki',
    url: 'https://github.com/sparta-i4u/sparta-msa/wiki',
  },
  {
    icon: 'ri-github-fill',
    label: 'FIX GitHub',
    description: 'https://github.com/FINAL-SPARTA/SPARTA-FINAL-PROJECT',
    url: 'https://github.com/FINAL-SPARTA/SPARTA-FINAL-PROJECT',
  },
  {
    icon: 'ri-book-open-line',
    label: 'FIX Wiki',
    description: 'https://github.com/FINAL-SPARTA/SPARTA-FINAL-PROJECT/wiki',
    url: 'https://github.com/FINAL-SPARTA/SPARTA-FINAL-PROJECT/wiki',
  },
  {
    icon: 'ri-notion-fill',
    label: '16 I 4 U',
    description: 'https://app.notion.com/p/16-I-4-U-1f0eeaa2f0af80bd9f00d0a062903703',
    url: 'https://app.notion.com/p/16-I-4-U-1f0eeaa2f0af80bd9f00d0a062903703',
  },
]
