import { PORTFOLIO_BLOCK_IDS, type PortfolioBlockId } from './types'

export type PortfolioBlockDefinition = {
  id: PortfolioBlockId
  label: string
  description: string
  placement: 'main' | 'footer'
}

export const PORTFOLIO_BLOCK_REGISTRY: Record<PortfolioBlockId, PortfolioBlockDefinition> = {
  hero: {
    id: 'hero',
    label: '소개·기술',
    description: '이름, 핵심 메시지, GitHub·LinkedIn과 펼쳐진 기술 목록',
    placement: 'main',
  },
  about: {
    id: 'about',
    label: '강점 소개',
    description: '기본은 상단 소개에 요약, 검증 중심 선택 시 상세 강점 추가',
    placement: 'main',
  },
  projects: {
    id: 'projects',
    label: '프로젝트·협업·AI',
    description: '프로젝트 소개·문제 해결·회고와 협업·AI를 한 페이지에 연결',
    placement: 'main',
  },
  closing: {
    id: 'closing',
    label: '마무리·기업 이해',
    description: '마무리 한 문단과 선택한 기업의 이해·경험 연결',
    placement: 'main',
  },
  experience: {
    id: 'experience',
    label: '관련 경험',
    description: '경력, 교육과 대외활동',
    placement: 'main',
  },
  resources: {
    id: 'resources',
    label: '자료 링크',
    description: '문서, GitHub와 Wiki 증거 링크',
    placement: 'main',
  },
  contact: {
    id: 'contact',
    label: '연락처',
    description: '지원 기업이 사용할 연락 채널',
    placement: 'main',
  },
  footer: {
    id: 'footer',
    label: '하단 문구',
    description: '이름과 근거로 설명하는 개발자 문구',
    placement: 'footer',
  },
}

export const PORTFOLIO_BLOCK_DEFINITIONS = PORTFOLIO_BLOCK_IDS.map(id => PORTFOLIO_BLOCK_REGISTRY[id])
