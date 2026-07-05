import type { ComponentType } from 'react'
import AboutSection from '@/pages/home/components/AboutSection'
import ContactSection from '@/pages/home/components/ContactSection'
import ExperienceSection from '@/pages/home/components/ExperienceSection'
import Footer from '@/pages/home/components/Footer'
import HeroSection from '@/pages/home/components/HeroSection'
import PhilosophyClosingSection from '@/pages/home/components/PhilosophyClosingSection'
import ProjectsSection from '@/pages/home/components/ProjectsSection'
import ResourcesSection from '@/pages/home/components/ResourcesSection'
import type { PortfolioBlockId } from './types'

export type PortfolioBlockDefinition = {
  id: PortfolioBlockId
  label: string
  description: string
  component: ComponentType
  placement: 'main' | 'footer'
}

export const PORTFOLIO_BLOCK_REGISTRY: Record<PortfolioBlockId, PortfolioBlockDefinition> = {
  hero: {
    id: 'hero',
    label: 'Profile',
    description: '이름, 핵심 메시지, 연락처와 기술 스택',
    component: HeroSection,
    placement: 'main',
  },
  about: {
    id: 'about',
    label: 'Strengths',
    description: '문제 해결, 협업, 책임감',
    component: AboutSection,
    placement: 'main',
  },
  projects: {
    id: 'projects',
    label: 'Projects',
    description: '프로젝트 개요와 상세 문제 해결',
    component: ProjectsSection,
    placement: 'main',
  },
  closing: {
    id: 'closing',
    label: 'Direction',
    description: '개발 철학, 성장 방향과 기업 이해',
    component: PhilosophyClosingSection,
    placement: 'main',
  },
  experience: {
    id: 'experience',
    label: 'Experience',
    description: '경력, 교육과 대외활동',
    component: ExperienceSection,
    placement: 'main',
  },
  resources: {
    id: 'resources',
    label: 'Resources',
    description: '문서, GitHub와 Wiki 증거 링크',
    component: ResourcesSection,
    placement: 'main',
  },
  contact: {
    id: 'contact',
    label: 'Contact',
    description: '지원 기업이 사용할 연락 채널',
    component: ContactSection,
    placement: 'main',
  },
  footer: {
    id: 'footer',
    label: 'Footer',
    description: '이름과 저작권 정보',
    component: Footer,
    placement: 'footer',
  },
}

export const PORTFOLIO_BLOCK_DEFINITIONS = Object.values(PORTFOLIO_BLOCK_REGISTRY)
