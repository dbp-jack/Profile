import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { resolveWebComposition } from './composition'
import Home from './page'

const render = (search = '') => renderToStaticMarkup(<MemoryRouter initialEntries={[`/${search}`]}><Home /></MemoryRouter>)

describe('새 공개 웹과 기업별 구성 연결', () => {
  it('이전 기본 URL은 승인된 새 순서로, 사용자 지정 순서는 그대로 유지한다', () => {
    const old = '?blocks=hero,about,projects,closing,experience,resources,contact,footer'
    expect(resolveWebComposition(old).blockIds).toEqual(['hero', 'about', 'projects', 'experience', 'closing', 'contact', 'resources', 'footer'])
    expect(resolveWebComposition('?blocks=projects,hero,contact').blockIds).toEqual(['projects', 'hero', 'contact'])
  })

  it('기업 프리셋과 개별 문구·강점·프로젝트 선택을 함께 적용한다', () => {
    const selected = resolveWebComposition('?company=platform&projects=feedshop&copy=performance-validation&strengths=backend-validation')
    expect(selected.projectIds).toEqual(['feedshop'])
    expect(selected.copyProfile.id).toBe('performance-validation')
    expect(selected.strengthsProfile.id).toBe('backend-validation')
    expect(resolveWebComposition('?company=platform').projectIds).toEqual(['three-m', 'fix-ticketing'])
  })

  it('기본 화면은 세 문제와 노출된 SQL 원본 3개를 한 문서에 렌더링한다', () => {
    const html = render()
    expect((html.match(/class="wc-case"/g) ?? []).length).toBe(3)
    expect(html).toContain('근거를 확인하고, 팀이 이해할 수 있게 설명합니다</h2>')
    const sql = html.split('class="wc-sql-evidence"')[1].split('<details')[0]
    expect((sql.match(/<figure/g) ?? []).length).toBe(3)
    expect(html.indexOf('id="experience"')).toBeLessThan(html.indexOf('id="direction"'))
    expect(html.indexOf('id="contact"')).toBeLessThan(html.indexOf('id="resources"'))
    expect(html).not.toContain('웹 포트폴리오 구성 시안')
  })

  it('선택하지 않은 블록과 프로젝트를 숨기며 목차 이동에 맞춤 URL을 유지한다', () => {
    const html = render('?blocks=projects,footer&projects=three-m&copy=event-driven')
    expect(html).not.toContain('id="profile"')
    expect(html).not.toContain('id="feedshop"')
    expect(html).not.toContain('id="experience"')
    expect(html).toContain('id="3m"')
    expect(html).toContain('href="/?blocks=projects,footer&amp;projects=three-m&amp;copy=event-driven#boundary"')
  })

  it('FIX 선택과 기업 이해 본문도 새 웹에서 재현한다', () => {
    const html = render('?company=platform&blocks=projects,closing&ci=1&cname=검토기업&cbody=서비스%20흐름%20이해&note=근거%20확인')
    expect(html).toContain('id="fix-ticketing"')
    expect(html).toContain('검토기업')
    expect(html).toContain('서비스 흐름 이해')
    expect(html).not.toContain('id="feedshop"')
  })
})
