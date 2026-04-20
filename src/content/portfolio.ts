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

export const HERO_ROLE_BADGE = 'Backend Developer'
export const HERO_NAME = '정민수'
export const HERO_ROLE_TITLE = 'Backend Developer'
export const HERO_TECH_STACK_LABEL = 'Skills'

export const ABOUT_SECTION = {
  kicker: 'About',
  title: '깊이 고민하고, 협력하고, 결과로 보여주는 개발자입니다.',
  intro:
    '고민한 선택은 지표로 확인하고, 협력은 흐름을 맞추는 방식으로 정리합니다. 맡은 임무는 끝까지 완수합니다.',
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
      '프로젝트 완성도를 높이기 위해 실습 기간 연장을 제안하고 조율했으며, 연장된 기간 내 개발을 마무리하며 결과로 책임을 증명했습니다.',
  },
] as const

export const PROJECTS_SECTION = {
  kicker: 'Projects',
  title: "What I've Built",
  subtitle:
    'Each project below focuses on the decisions behind the work - not just what was built, but why.',
} as const

export const CONTACT_SECTION = {
  kicker: 'Contact',
  title: 'Get in Touch',
  subtitle: 'Feel free to reach out via any of the channels below.',
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
  title: 'Resources',
} as const

/** Projects 다음·Resources 앞, Contact 직전 — 마무리 톤의 짧은 글 (웹·PDF 공통) */
export const CLOSING_SECTION = {
  kicker: 'Closing',
  title: '함께 일하고 싶은 개발자가 되겠습니다',
  subtitle: '일하는 방식과 성장 방향을 짧게 담았습니다.',
} as const

export const CLOSING_BLOCKS = [
  {
    icon: 'ri-lightbulb-flash-line',
    titleEn: 'Development Philosophy',
    titleKo: '설계부터 시작하고, 완성까지 다듬습니다.',
    body:
      '요구사항이 들어오면 바로 구현하기보다,\n전체 흐름과 범위를 먼저 정리하고 작업을 단계로 나눠 진행합니다.\n\n이 방식으로 개발 과정에서의 혼선을 줄여왔습니다.\n\n개발이 끝난 뒤에도 더 나은 방식을 스스로 찾아보고,\n원인과 과정을 짚으며 꾸준히 다듬는 습관을 들이고 있습니다.',
  },
  {
    icon: 'ri-seedling-line',
    titleEn: 'Growth Direction',
    titleKo: '도구보다 판단, 기본기로 성장합니다.',
    body:
      'AI와 다양한 도구를 활용하되, 판단과 책임은 스스로에게 둡니다.\n\n개념 학습 → 적용 → 회고를 반복하며 부족한 부분을 보완해왔습니다.\n\n어제보다 나은 개발자가 되는 것, 그게 제 성장의 기준입니다.',
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
