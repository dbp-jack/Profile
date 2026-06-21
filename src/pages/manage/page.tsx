import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { DEFAULT_PROJECT_IDS, PROJECTS } from '@/content/projects'
import NotFound from '@/pages/NotFound'
import PortfolioBody from '@/pages/home/PortfolioBody'
import {
  PORTFOLIO_MANAGER_ENABLED,
  PUBLIC_PORTFOLIO_URL,
} from '@/portfolio-builder/access'
import { PORTFOLIO_BLOCK_DEFINITIONS } from '@/portfolio-builder/block-registry'
import {
  DEFAULT_PUBLIC_PRESET,
  PUBLIC_PRESETS,
  createPublicPortfolioPath,
} from '@/portfolio-builder/presets'
import type { PortfolioBlockId, PortfolioPreset } from '@/portfolio-builder/types'
import { COPY_PROFILES, getCopyProfile } from '@/portfolio-builder/copy-profiles'

const STORAGE_KEY = 'portfolio-manager-blocks'
const PROJECT_STORAGE_KEY = 'portfolio-manager-projects'
const COPY_STORAGE_KEY = 'portfolio-manager-copy'
const CUSTOM_PRESET_STORAGE_KEY = 'portfolio-manager-custom-presets'
const COMPANY_KEY_STORAGE_KEY = 'portfolio-manager-company-key'

function normalizeCompanyKey(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function loadSavedBlocks(): readonly PortfolioBlockId[] {
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (!saved) return DEFAULT_PUBLIC_PRESET.blocks

  try {
    const parsed = JSON.parse(saved) as PortfolioBlockId[]
    const allowed = new Set(PORTFOLIO_BLOCK_DEFINITIONS.map((block) => block.id))
    const valid = parsed.filter((blockId) => allowed.has(blockId))
    return valid.length > 0 ? valid : DEFAULT_PUBLIC_PRESET.blocks
  } catch {
    return DEFAULT_PUBLIC_PRESET.blocks
  }
}

function loadSavedProjects(): readonly string[] {
  const saved = window.localStorage.getItem(PROJECT_STORAGE_KEY)
  if (!saved) return DEFAULT_PROJECT_IDS

  try {
    const parsed = JSON.parse(saved) as string[]
    const allowed = new Set(PROJECTS.map((project) => project.id))
    const valid = parsed.filter((projectId) => allowed.has(projectId))
    return valid.length > 0 ? valid : DEFAULT_PROJECT_IDS
  } catch {
    return DEFAULT_PROJECT_IDS
  }
}

function loadSavedCopyProfile(): string {
  return getCopyProfile(window.localStorage.getItem(COPY_STORAGE_KEY)).id
}

function loadCustomPresets(): readonly PortfolioPreset[] {
  const saved = window.localStorage.getItem(CUSTOM_PRESET_STORAGE_KEY)
  if (!saved) return []

  try {
    const parsed = JSON.parse(saved) as PortfolioPreset[]
    const allowedBlocks = new Set(PORTFOLIO_BLOCK_DEFINITIONS.map((block) => block.id))
    const allowedProjects = new Set(PROJECTS.map((project) => project.id))
    return parsed
      .map((preset) => ({
        ...preset,
        blocks: preset.blocks.filter((blockId) => allowedBlocks.has(blockId)),
        projectIds: preset.projectIds.filter((projectId) => allowedProjects.has(projectId)),
        copyProfileId: getCopyProfile(preset.copyProfileId).id,
        companyKey: normalizeCompanyKey(preset.companyKey ?? ''),
      }))
      .filter((preset) => preset.name.trim() && preset.blocks.length && preset.projectIds.length)
  } catch {
    return []
  }
}

export default function PortfolioManagerPage() {
  const [blockIds, setBlockIds] = useState<readonly PortfolioBlockId[]>(loadSavedBlocks)
  const [projectIds, setProjectIds] = useState<readonly string[]>(loadSavedProjects)
  const [copyProfileId, setCopyProfileId] = useState(loadSavedCopyProfile)
  const [customPresets, setCustomPresets] = useState<readonly PortfolioPreset[]>(loadCustomPresets)
  const [presetName, setPresetName] = useState('')
  const [companyKey, setCompanyKey] = useState(() =>
    normalizeCompanyKey(window.localStorage.getItem(COMPANY_KEY_STORAGE_KEY) ?? ''),
  )
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle')

  const publicPath = useMemo(
    () => createPublicPortfolioPath(blockIds, projectIds, copyProfileId, companyKey),
    [blockIds, projectIds, copyProfileId, companyKey],
  )
  const publicUrl = useMemo(
    () => new URL(publicPath.replace(/^\//, ''), PUBLIC_PORTFOLIO_URL).toString(),
    [publicPath],
  )

  if (!PORTFOLIO_MANAGER_ENABLED) return <NotFound />

  const updateBlocks = (nextBlocks: readonly PortfolioBlockId[]) => {
    setBlockIds(nextBlocks)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextBlocks))
  }

  const updateProjects = (nextProjectIds: readonly string[]) => {
    setProjectIds(nextProjectIds)
    window.localStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(nextProjectIds))
  }

  const updateCopyProfile = (nextCopyProfileId: string) => {
    setCopyProfileId(getCopyProfile(nextCopyProfileId).id)
    window.localStorage.setItem(COPY_STORAGE_KEY, getCopyProfile(nextCopyProfileId).id)
  }

  const applyPreset = (preset: PortfolioPreset) => {
    updateBlocks(preset.blocks)
    updateProjects(preset.projectIds)
    updateCopyProfile(preset.copyProfileId)
    const nextCompanyKey = normalizeCompanyKey(preset.companyKey ?? '')
    setCompanyKey(nextCompanyKey)
    window.localStorage.setItem(COMPANY_KEY_STORAGE_KEY, nextCompanyKey)
  }


  const saveCustomPreset = () => {
    const name = presetName.trim()
    const normalizedCompanyKey = normalizeCompanyKey(companyKey)
    if (!name || !normalizedCompanyKey) return

    const nextPreset: PortfolioPreset = {
      id: `custom-${Date.now()}`,
      name,
      description: `${projectIds.length}개 프로젝트 · ${getCopyProfile(copyProfileId).name}`,
      blocks: [...blockIds],
      projectIds: [...projectIds],
      copyProfileId,
      companyKey: normalizedCompanyKey,
    }
    const nextPresets = [...customPresets.filter((preset) => preset.name !== name), nextPreset]
    setCustomPresets(nextPresets)
    window.localStorage.setItem(CUSTOM_PRESET_STORAGE_KEY, JSON.stringify(nextPresets))
    setPresetName('')
  }

  const deleteCustomPreset = (presetId: string) => {
    const nextPresets = customPresets.filter((preset) => preset.id !== presetId)
    setCustomPresets(nextPresets)
    window.localStorage.setItem(CUSTOM_PRESET_STORAGE_KEY, JSON.stringify(nextPresets))
  }

  const toggleBlock = (blockId: PortfolioBlockId) => {
    if (blockIds.includes(blockId)) {
      updateBlocks(blockIds.filter((item) => item !== blockId))
      return
    }

    const registryOrder = PORTFOLIO_BLOCK_DEFINITIONS.map((block) => block.id)
    updateBlocks(
      [...blockIds, blockId].sort(
        (left, right) => registryOrder.indexOf(left) - registryOrder.indexOf(right),
      ),
    )
  }

  const moveBlock = (blockId: PortfolioBlockId, direction: -1 | 1) => {
    const currentIndex = blockIds.indexOf(blockId)
    const targetIndex = currentIndex + direction
    if (currentIndex < 0 || targetIndex < 0 || targetIndex >= blockIds.length) return

    const nextBlocks = [...blockIds]
    ;[nextBlocks[currentIndex], nextBlocks[targetIndex]] = [
      nextBlocks[targetIndex],
      nextBlocks[currentIndex],
    ]
    updateBlocks(nextBlocks)
  }

  const toggleProject = (projectId: string) => {
    if (projectIds.includes(projectId)) {
      if (projectIds.length === 1) return
      updateProjects(projectIds.filter((item) => item !== projectId))
      return
    }
    updateProjects([...projectIds, projectId])
  }

  const moveProject = (projectId: string, direction: -1 | 1) => {
    const currentIndex = projectIds.indexOf(projectId)
    const targetIndex = currentIndex + direction
    if (currentIndex < 0 || targetIndex < 0 || targetIndex >= projectIds.length) return

    const nextProjectIds = [...projectIds]
    ;[nextProjectIds[currentIndex], nextProjectIds[targetIndex]] = [
      nextProjectIds[targetIndex],
      nextProjectIds[currentIndex],
    ]
    updateProjects(nextProjectIds)
  }

  const copyPublicUrl = async () => {
    try {
      await navigator.clipboard.writeText(publicUrl)
      setCopyStatus('copied')
    } catch {
      setCopyStatus('failed')
    }
    window.setTimeout(() => setCopyStatus('idle'), 1500)
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="sticky top-0 z-[80] border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between lg:px-6">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#2563EB]">
              Local Portfolio Manager
            </p>
            <h1 className="mt-1 text-xl font-extrabold">포트폴리오 블록 조합</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/"
              className="rounded-md border border-slate-300 px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50"
            >
              공개 화면
            </Link>
            <button
              type="button"
              onClick={copyPublicUrl}
              className="inline-flex items-center gap-2 rounded-md bg-[#1E3A5F] px-3 py-2 text-sm font-bold text-white hover:bg-[#152a45]"
            >
              <i
                className={copyStatus === 'copied' ? 'ri-check-line' : 'ri-link'}
                aria-hidden="true"
              />
              {copyStatus === 'copied'
                ? '복사됨'
                : copyStatus === 'failed'
                  ? '링크를 직접 복사하세요'
                  : '공개 링크 복사'}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1600px] gap-5 px-4 py-5 lg:grid-cols-[320px_minmax(0,1fr)] lg:px-6">
        <aside className="h-fit space-y-5 rounded-lg border border-slate-200 bg-white p-4 lg:sticky lg:top-24">
          <section>
            <h2 className="text-sm font-extrabold">프리셋</h2>
            <div className="mt-3 space-y-2">
              {PUBLIC_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-left hover:border-[#2563EB] hover:bg-blue-50"
                >
                  <span className="block text-sm font-bold">{preset.name}</span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-slate-500">
                    {preset.description}
                  </span>
                </button>
              ))}
              {customPresets.map((preset) => (
                <div
                  key={preset.id}
                  className="flex items-stretch overflow-hidden rounded-md border border-emerald-200 bg-emerald-50/50"
                >
                  <button
                    type="button"
                    onClick={() => applyPreset(preset)}
                    className="min-w-0 flex-1 px-3 py-2.5 text-left hover:bg-emerald-50"
                  >
                    <span className="block truncate text-sm font-bold">{preset.name}</span>
                    <span className="mt-0.5 block text-xs text-slate-500">
                      {preset.companyKey ? `company=${preset.companyKey} · ` : ''}
                      {preset.description}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteCustomPreset(preset.id)}
                    aria-label={`${preset.name} 프리셋 삭제`}
                    title="프리셋 삭제"
                    className="flex w-10 items-center justify-center border-l border-emerald-200 text-slate-400 hover:bg-red-50 hover:text-red-600"
                  >
                    <i className="ri-delete-bin-line" aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <div className="min-w-0 flex-1 space-y-2">
                <input
                  value={presetName}
                  onChange={(event) => setPresetName(event.target.value)}
                  placeholder="예: 에이블리 지원용"
                  aria-label="기업별 프리셋 이름"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2563EB]"
                />
                <div className="flex items-center rounded-md border border-slate-300 bg-white px-3">
                  <span className="shrink-0 text-xs font-semibold text-slate-400">company=</span>
                  <input
                    value={companyKey}
                    onChange={(event) => {
                      const nextCompanyKey = normalizeCompanyKey(event.target.value)
                      setCompanyKey(nextCompanyKey)
                      window.localStorage.setItem(COMPANY_KEY_STORAGE_KEY, nextCompanyKey)
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') saveCustomPreset()
                    }}
                    placeholder="ably"
                    aria-label="기업 링크 키"
                    className="min-w-0 flex-1 px-1 py-2 text-sm outline-none"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={saveCustomPreset}
                disabled={!presetName.trim() || !companyKey}
                className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                저장
              </button>
            </div>
          </section>

          <section className="border-t border-slate-200 pt-4">
            <h2 className="text-sm font-extrabold">문구 세트</h2>
            <div className="mt-3 space-y-2">
              {COPY_PROFILES.map((profile) => {
                const selected = profile.id === copyProfileId
                return (
                  <button
                    key={profile.id}
                    type="button"
                    onClick={() => updateCopyProfile(profile.id)}
                    className={`w-full rounded-md border px-3 py-2.5 text-left ${
                      selected
                        ? 'border-blue-300 bg-blue-50'
                        : 'border-slate-200 hover:border-blue-200 hover:bg-slate-50'
                    }`}
                  >
                    <span className="block text-sm font-bold">{profile.name}</span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-slate-500">
                      {profile.description}
                    </span>
                  </button>
                )
              })}
            </div>
          </section>

          <section className="border-t border-slate-200 pt-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold">프로젝트 블록</h2>
              <span className="text-xs font-semibold text-slate-400">{projectIds.length}개 선택</span>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              프로젝트를 고르고 순서를 바꾸면 개요와 상세 내용이 함께 이동합니다.
            </p>
            <div className="mt-3 space-y-2">
              {PROJECTS.map((project) => {
                const selected = projectIds.includes(project.id)
                const selectedIndex = projectIds.indexOf(project.id)
                return (
                  <div
                    key={project.id}
                    className={`rounded-md border p-3 ${
                      selected ? 'border-emerald-200 bg-emerald-50/70' : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        id={`project-${project.id}`}
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleProject(project.id)}
                        className="mt-1 h-4 w-4 accent-emerald-600"
                      />
                      <label
                        htmlFor={`project-${project.id}`}
                        className="min-w-0 flex-1 cursor-pointer"
                      >
                        <span className="block text-sm font-bold">
                          {project.name.split(' - ')[0]}
                        </span>
                        <span className="mt-0.5 block text-xs leading-relaxed text-slate-500">
                          {project.period} · {project.teamSize}
                        </span>
                      </label>
                      {selected ? (
                        <div className="flex shrink-0 gap-1">
                          <button
                            type="button"
                            onClick={() => moveProject(project.id, -1)}
                            disabled={selectedIndex === 0}
                            aria-label={`${project.name} 위로 이동`}
                            title="위로 이동"
                            className="flex h-7 w-7 items-center justify-center rounded border border-slate-200 bg-white text-slate-500 disabled:opacity-30"
                          >
                            <i className="ri-arrow-up-line" />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveProject(project.id, 1)}
                            disabled={selectedIndex === projectIds.length - 1}
                            aria-label={`${project.name} 아래로 이동`}
                            title="아래로 이동"
                            className="flex h-7 w-7 items-center justify-center rounded border border-slate-200 bg-white text-slate-500 disabled:opacity-30"
                          >
                            <i className="ri-arrow-down-line" />
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          <section className="border-t border-slate-200 pt-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold">블록</h2>
              <span className="text-xs font-semibold text-slate-400">{blockIds.length}개 노출</span>
            </div>
            <div className="mt-3 space-y-2">
              {PORTFOLIO_BLOCK_DEFINITIONS.map((block) => {
                const selected = blockIds.includes(block.id)
                const selectedIndex = blockIds.indexOf(block.id)
                return (
                  <div
                    key={block.id}
                    className={`rounded-md border p-3 ${
                      selected ? 'border-blue-200 bg-blue-50/60' : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        id={`block-${block.id}`}
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleBlock(block.id)}
                        className="mt-1 h-4 w-4 accent-[#2563EB]"
                      />
                      <label htmlFor={`block-${block.id}`} className="min-w-0 flex-1 cursor-pointer">
                        <span className="block text-sm font-bold">{block.label}</span>
                        <span className="mt-0.5 block text-xs leading-relaxed text-slate-500">
                          {block.description}
                        </span>
                      </label>
                      {selected ? (
                        <div className="flex shrink-0 gap-1">
                          <button
                            type="button"
                            onClick={() => moveBlock(block.id, -1)}
                            disabled={selectedIndex === 0}
                            aria-label={`${block.label} 위로 이동`}
                            title="위로 이동"
                            className="flex h-7 w-7 items-center justify-center rounded border border-slate-200 bg-white text-slate-500 disabled:opacity-30"
                          >
                            <i className="ri-arrow-up-line" />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveBlock(block.id, 1)}
                            disabled={selectedIndex === blockIds.length - 1}
                            aria-label={`${block.label} 아래로 이동`}
                            title="아래로 이동"
                            className="flex h-7 w-7 items-center justify-center rounded border border-slate-200 bg-white text-slate-500 disabled:opacity-30"
                          >
                            <i className="ri-arrow-down-line" />
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-900">
            이 화면은 로컬 개발 환경 전용입니다. 생성되는 링크에는 공개 블록만 포함되며,
            비공개 자료는 추후 인증 서버에서 별도로 불러옵니다.
          </p>
          <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2.5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-extrabold text-slate-700">현재 공개 링크</p>
              <a
                href={publicPath}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#2563EB] hover:underline"
              >
                새 탭 확인
              </a>
            </div>
            <p className="mt-1 break-all font-mono text-[0.68rem] leading-relaxed text-slate-500">
              {publicUrl}
            </p>
          </div>
        </aside>

        <section className="min-w-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-500">
            실시간 미리보기
          </div>
          <PortfolioBody
            blockIds={blockIds}
            projectIds={projectIds}
            copyProfileId={copyProfileId}
          />
        </section>
      </div>
    </div>
  )
}
