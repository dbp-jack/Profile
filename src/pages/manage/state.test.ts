import { describe, expect, it } from 'vitest'
import { EMPTY_COMPANY_DIRECTION } from '@/portfolio-builder/company-direction'
import { createPublicPortfolioPath } from '@/portfolio-builder/presets'
import { WORKSPACE_KEY, loadWorkspace, defaultDraft, draftFromPreset, changeProjectSlot, addBlock, companyKeyForName, type Workspace } from './state'

const storage = (data: Record<string, string>) => ({ getItem: (key: string) => data[key] ?? null })

describe('작업실 저장 데이터', () => {
  it('기존 구성·기업 문구를 잃지 않고 이전 저장 키를 읽는다', () => {
    const legacy = {
      'portfolio-manager-blocks': JSON.stringify(['hero', 'projects', 'about', 'footer']),
      'portfolio-manager-projects': JSON.stringify(['three-m', 'feedshop']),
      'portfolio-manager-copy': 'backend-impact',
      'portfolio-manager-strengths': 'backend-validation',
      'portfolio-manager-company-key': 'example',
      'portfolio-manager-company-directions': JSON.stringify({ example: { ...EMPTY_COMPANY_DIRECTION, companyName: '보관 기업', enabled: true, summary: '기존 기업 이해' } }),
      'portfolio-manager-custom-presets': JSON.stringify([{ id: 'saved-1', name: '기존 구성', blocks: ['hero', 'projects'], projectIds: ['feedshop'], copyProfileId: 'backend-impact' }]),
    }
    const result = loadWorkspace(storage(legacy))
    expect(result.draft).toMatchObject({ blockIds: ['hero', 'projects', 'about', 'footer'], projectIds: ['three-m', 'feedshop'], copyProfileId: 'backend-impact', strengthsProfileId: 'backend-validation', companyKey: 'example' })
    expect(result.companies.example.summary).toBe('기존 기업 이해')
    expect(result.saved[0]).toMatchObject({ id: 'saved-1', name: '기존 구성', strengthsProfileId: 'default' })
    expect(Object.keys(legacy)).toHaveLength(7)
  })

  it('새 저장 상태가 과거 키보다 우선하며 강점 선택도 구성에 보존된다', () => {
    const workspace: Workspace = {
      draft: { ...defaultDraft(), strengthsProfileId: 'backend-validation' },
      saved: [{ id: 's1', name: '검증 중심', description: '', blocks: ['hero', 'about'], projectIds: ['three-m'], copyProfileId: 'event-driven', strengthsProfileId: 'backend-validation' }],
      companies: { demo: { ...EMPTY_COMPANY_DIRECTION, companyName: '기업', enabled: true, summary: '기업별 내용' } },
    }
    const restored = loadWorkspace(storage({ [WORKSPACE_KEY]: JSON.stringify(workspace), 'portfolio-manager-projects': '["fix-ticketing"]' }))
    expect(restored.draft).toEqual(workspace.draft)
    expect(draftFromPreset(restored.saved[0])).toMatchObject({ strengthsProfileId: 'backend-validation', projectIds: ['three-m'], copyProfileId: 'event-driven' })
    expect(restored.companies).toEqual(workspace.companies)
  })

  it('손상된 저장 항목만 기본값으로 보완하고 유효한 다른 항목은 유지한다', () => {
    const result = loadWorkspace(storage({ 'portfolio-manager-blocks': '{broken', 'portfolio-manager-projects': '["three-m"]', 'portfolio-manager-custom-presets': '[null, {"id":"valid","name":"저장","blocks":["hero"]}]' }))
    expect(result.draft.blockIds).toEqual(defaultDraft().blockIds)
    expect(result.draft.projectIds).toEqual(['three-m'])
    expect(result.saved).toHaveLength(1)
    expect(result.saved[0].id).toBe('valid')
  })

  it('로컬 저장 접근이 차단돼도 기본 구성을 열 수 있다', () => {
    expect(loadWorkspace({ getItem: () => { throw new Error('차단') } }).draft).toEqual(defaultDraft())
  })
})

describe('작업실 편집과 공유', () => {
  it('이미 선택한 프로젝트를 다른 칸에 넣으면 두 프로젝트가 교환된다', () => {
    expect(changeProjectSlot(['feedshop', 'three-m'], 0, 'three-m')).toEqual(['three-m', 'feedshop'])
    expect(changeProjectSlot(['feedshop', 'three-m'], 1, 'feedshop')).toEqual(['three-m', 'feedshop'])
    expect(changeProjectSlot(['feedshop', 'three-m'], 0, 'fix-ticketing')).toEqual(['fix-ticketing', 'three-m'])
    expect(changeProjectSlot(['feedshop', 'three-m'], 1, '')).toEqual(['feedshop'])
    expect(changeProjectSlot(['feedshop'], 1, 'feedshop')).toEqual(['feedshop'])
  })

  it('내용을 추가해도 사용자가 정한 나머지 순서를 유지한다', () => {
    expect(addBlock(['projects', 'hero', 'footer'], 'closing')).toEqual(['projects', 'hero', 'closing', 'footer'])
    expect(addBlock(['projects', 'hero'], 'projects')).toEqual(['projects', 'hero'])
  })

  it('한글 기업 이름도 재사용 가능한 링크 식별자로 만든다', () => {
    const key = companyKeyForName('한글기업')
    expect(key).toMatch(/^company-[a-z0-9]+$/)
    expect(key).toBe(companyKeyForName('한글기업'))
    expect(key).not.toBe(companyKeyForName('다른기업'))
    expect(companyKeyForName('')).toBe('')
  })

  it('저장 구성을 공유하면 프로젝트·강점·기업 문구가 URL에 포함된다', () => {
    const draft = draftFromPreset({ id: 'share', name: '지원용', blocks: ['hero', 'about', 'projects', 'closing'], projectIds: ['three-m', 'feedshop'], copyProfileId: 'backend-impact', strengthsProfileId: 'backend-validation', companyKey: 'example' })
    const company = { ...EMPTY_COMPANY_DIRECTION, enabled: true, companyName: '지원 기업', summary: '서비스 이해', experienceBody: '검증 경험' }
    const path = createPublicPortfolioPath(draft.blockIds, draft.projectIds, draft.copyProfileId, draft.companyKey, draft.strengthsProfileId, company)
    const query = new URLSearchParams(path.split('?')[1])
    expect(query.get('projects')).toBe('three-m,feedshop')
    expect(query.get('strengths')).toBe('backend-validation')
    expect(query.get('cbody')).toBe('서비스 이해')
    expect(query.get('exp')).toBe('검증 경험')
  })
})
