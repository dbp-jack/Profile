/** Shared copy + lists for the portfolio site and the `/pdf` A4 view (single source of truth). */

export const HERO_SKILL_TAGS = [
  'Spring',
  'JPA',
  'Quary DSL',
  'JAVA',
  'MySQL',
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
export const HERO_ROLE_TITLE = '수치로 검증하고, 팀 흐름을 맞추는 백엔드 개발자입니다.'
export const HERO_TECH_STACK_LABEL = '기술 스택'

export const ABOUT_SECTION = {
  kicker: 'About',
  title: '저는 이렇게 일합니다',
  intro:
    '고민한 선택은 수치로 확인하고, 협력은 팀 흐름을 맞추는 방식으로 정리합니다. 맡은 임무는 끝까지 완수합니다.',
} as const

export const ABOUT_CARDS = [
  {
    icon: 'ri-bar-chart-2-line',
    title: '문제 해결 능력',
    subtitle: '성능 병목을 찾아 수치로 증명',
    description:
      '이벤트 목록 조회 시 findAll() 전체 로딩으로 평균 응답 2.3초가 걸리는 문제를 발견했습니다.\n\nN+1 쿼리 문제를 원인으로 파악하고, Spring Cache @Cacheable을 도입해 응답 시간을 0.5초로 단축, 78% 개선했습니다.',
  },
  {
    icon: 'ri-node-tree',
    title: '협업 시스템 설계',
    subtitle: '일관된 협업 방식으로 혼선을 줄인 경험',
    description:
      '작업 공유·진행에서 생기는 혼선을 줄이기 위해 JIRA 기반 Agile 프로세스를 도입했습니다.\n\nTo Do / In Progress / Done, 티켓 작성 규칙·작업 단위 기준을 정리하고 가이드라인을 제작·배포해 협업 일관성을 맞췄습니다.',
  },
  {
    icon: 'ri-checkbox-circle-line',
    title: '임무 완수',
    subtitle: '끝까지 완수로 증명한 책임감',
    description:
      '현장실습에서 프로젝트 완성도를 높이기 위해 실습 기간 연장을 직접 제안했습니다.\n\n연장된 기간 내 관리자 대시보드를 마무리했고, 기획부터 개발까지 혼자 전담한 첫 실무 경험이었습니다.',
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
    detail: '건설현장 안전관리 대시보드 기획·설계·개발 전담 · AJAX 기반 실시간 센서 데이터 시각화',
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
    label: 'Linkedind',
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
    titleKo: '기능을 만들기 전에 흐름을 먼저 생각합니다.',
    body:
      '요구사항이 들어오면 구현보다 먼저 전체 구조와 데이터 흐름을 그립니다.\n\nFeedShop에서 단일 캐시 전략이 아니라 데이터 특성별로 캐시를 분리한 것, 3M에서 도메인 책임을 먼저 분리하고 인증 흐름을 설계한 것도 같은 방식이었습니다.\n\n개발이 끝난 뒤에도 더 나은 구조를 스스로 찾아보고, 원인과 과정을 짚으며 다듬는 습관을 이어가고 있습니다.',
  },
  {
    icon: 'ri-seedling-line',
    titleEn: 'Growth Direction',
    titleKo: '도구는 적극 활용하되, 판단은 제가 합니다.',
    body:
      '프론트 작업은 생성형 AI로 프롬프트를 설계하고, AI 툴로 구조를 잡은 뒤, AI 에이전트로 마무리합니다.\n\n도구를 적극 활용하되, 어떤 구조로 만들지, 왜 이 기술을 선택할지, 결과가 의도대로 동작하는지에 대한 판단과 책임은 스스로에게 두고 결정합니다.\n\n팀에서도 같은 방식으로 일합니다. JIRA 가이드라인을 설계·배포하고 스크럼 진행을 맡은 경험을 통해, 개인 성과보다 팀의 흐름을 맞추는 일이 결과물의 질을 높인다는 점을 확인했습니다. 협업도 참여를 넘어 흐름을 만드는 일이라고 생각합니다.',
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
    label: '첫번째 프로젝트 기획서',
    description: 'https://docs.google.com/document/d/11mKsXb3GQRfinyc0fYjn6MvsodHfxJZRFBkXZiOP6eA/edit?usp=sharing',
    url: 'https://docs.google.com/document/d/11mKsXb3GQRfinyc0fYjn6MvsodHfxJZRFBkXZiOP6eA/edit?usp=sharing',
  },
  {
    icon: 'ri-notion-fill',
    label: '인턴쉽 및 현장실습',
    description: 'https://slime-face-7c4.notion.site/ICT-1fceeaa2f0af80a7aa88cd0bd37bdb7d?source=copy_link',
    url: 'https://slime-face-7c4.notion.site/ICT-1fceeaa2f0af80a7aa88cd0bd37bdb7d?source=copy_link',
  },
  {
    icon: 'ri-article-line',
    label: 'JIRA 가이드 라인',
    description: 'https://dev99-tale.tistory.com/69',
    url: 'https://dev99-tale.tistory.com/69',
  },
  {
    icon: 'ri-links-line',
    label: '초기 프로젝트 기획 과정',
    description: 'https://docs.google.com/document/d/1XJ-STnZLo71kvtlduvHiM2kWS64wpwrl8-c4MY4anvE/edit?usp=sharing',
    url: 'https://docs.google.com/document/d/1XJ-STnZLo71kvtlduvHiM2kWS64wpwrl8-c4MY4anvE/edit?usp=sharing',
  },
]
