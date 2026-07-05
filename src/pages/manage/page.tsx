import { useEffect, useMemo, useRef, useState } from 'react'
import {
  DEFAULT_PROJECT_IDS,
  MAX_VISIBLE_PROJECTS,
  PROJECTS,
  normalizeProjectIds,
} from '@/content/projects'
import NotFound from '@/pages/NotFound'
import {
  PORTFOLIO_MANAGER_ENABLED,
  PUBLIC_PORTFOLIO_URL,
} from '@/portfolio-builder/access'
import { PORTFOLIO_BLOCK_DEFINITIONS } from '@/portfolio-builder/block-registry'
import {
  COMPANY_PUBLIC_PRESETS,
  DEFAULT_PUBLIC_PRESET,
  PUBLIC_PRESETS,
  createCompanyPortfolioPath,
  createPublicPortfolioPath,
  getCompanyPreset,
} from '@/portfolio-builder/presets'
import type { PortfolioBlockId, PortfolioPreset } from '@/portfolio-builder/types'
import { COPY_PROFILES, getCopyProfile } from '@/portfolio-builder/copy-profiles'
import './page.css'

const STORAGE_KEY = 'portfolio-manager-blocks'
const PROJECT_STORAGE_KEY = 'portfolio-manager-projects'
const COPY_STORAGE_KEY = 'portfolio-manager-copy'
const CUSTOM_PRESET_STORAGE_KEY = 'portfolio-manager-custom-presets'
const COMPANY_KEY_STORAGE_KEY = 'portfolio-manager-company-key'

type CopyStatus = 'idle' | 'url' | 'query' | 'markdown' | 'failed'
type ManagerPanel = 'company' | 'composition' | 'links'
type PreviewMode = 'desktop' | 'laptop' | 'mobile'

const ALL_BLOCK_IDS = PORTFOLIO_BLOCK_DEFINITIONS.map((block) => block.id)
const CORE_BLOCK_IDS: readonly PortfolioBlockId[] = [
  'hero',
  'about',
  'projects',
  'resources',
  'contact',
  'footer',
]
const STORY_BLOCK_IDS: readonly PortfolioBlockId[] = [
  'hero',
  'about',
  'projects',
  'experience',
  'resources',
  'contact',
  'footer',
]
const PROJECT_QUICK_SETS: readonly {
  label: string
  projectIds: readonly string[]
}[] = [
  { label: '기본', projectIds: DEFAULT_PROJECT_IDS },
  { label: 'FeedShop + FIX', projectIds: ['feedshop', 'fix-ticketing'] },
  { label: '3M + FIX', projectIds: ['three-m', 'fix-ticketing'] },
]

const MANAGER_PANELS: readonly {
  id: ManagerPanel
  label: string
  icon: string
}[] = [
  { id: 'company', label: '기업', icon: 'ri-building-4-line' },
  { id: 'composition', label: '구성', icon: 'ri-layout-grid-line' },
  { id: 'links', label: '링크', icon: 'ri-links-line' },
]

const PREVIEW_MODES: readonly {
  id: PreviewMode
  label: string
  width: number
  height: number
  icon: string
}[] = [
  { id: 'desktop', label: 'Desktop', width: 1440, height: 1100, icon: 'ri-computer-line' },
  { id: 'laptop', label: 'Laptop', width: 1280, height: 1000, icon: 'ri-macbook-line' },
  { id: 'mobile', label: 'Mobile', width: 390, height: 844, icon: 'ri-smartphone-line' },
]

function normalizeCompanyKey(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function hasSameOrder(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((item, index) => item === right[index])
}

function matchesPreset(
  preset: PortfolioPreset & { companyKeys?: readonly string[] },
  blockIds: readonly PortfolioBlockId[],
  projectIds: readonly string[],
  copyProfileId: string,
  companyKey: string,
): boolean {
  const presetCompanyKeys = [preset.companyKey ?? '', ...(preset.companyKeys ?? [])]
    .map(normalizeCompanyKey)
    .filter(Boolean)
  const matchesCompanyKey = companyKey
    ? presetCompanyKeys.includes(companyKey)
    : presetCompanyKeys.length === 0

  return (
    hasSameOrder(preset.blocks, blockIds) &&
    hasSameOrder(preset.projectIds, projectIds) &&
    preset.copyProfileId === copyProfileId &&
    matchesCompanyKey
  )
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
    return normalizeProjectIds(parsed)
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
        projectIds: normalizeProjectIds(
          preset.projectIds.filter((projectId) => allowedProjects.has(projectId)),
        ),
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
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle')
  const [activePanel, setActivePanel] = useState<ManagerPanel>('company')
  const [previewMode, setPreviewMode] = useState<PreviewMode>('desktop')
  const [previewScale, setPreviewScale] = useState(1)
  const previewStageRef = useRef<HTMLDivElement>(null)

  const publicPath = useMemo(
    () => createPublicPortfolioPath(blockIds, projectIds, copyProfileId, companyKey),
    [blockIds, projectIds, copyProfileId, companyKey],
  )
  const shortPublicPath = useMemo(() => {
    const companyPreset = getCompanyPreset(companyKey)
    if (!companyPreset || !matchesPreset(companyPreset, blockIds, projectIds, copyProfileId, companyKey)) {
      return null
    }

    return createCompanyPortfolioPath(companyKey)
  }, [blockIds, companyKey, copyProfileId, projectIds])
  const publicUrl = useMemo(
    () => new URL((shortPublicPath ?? publicPath).replace(/^\//, ''), PUBLIC_PORTFOLIO_URL).toString(),
    [publicPath, shortPublicPath],
  )
  const fullPublicUrl = useMemo(
    () => new URL(publicPath.replace(/^\//, ''), PUBLIC_PORTFOLIO_URL).toString(),
    [publicPath],
  )
  const publicQuery = useMemo(() => publicPath.replace(/^\/\?/, ''), [publicPath])
  const activePreset = useMemo(
    () =>
      [...PUBLIC_PRESETS, ...COMPANY_PUBLIC_PRESETS, ...customPresets].find((preset) =>
        matchesPreset(preset, blockIds, projectIds, copyProfileId, companyKey),
      ),
    [blockIds, companyKey, copyProfileId, customPresets, projectIds],
  )
  const selectedProjects = useMemo(
    () =>
      projectIds
        .map((projectId) => PROJECTS.find((project) => project.id === projectId))
        .filter((project): project is (typeof PROJECTS)[number] => Boolean(project)),
    [projectIds],
  )
  const selectedProjectNames = useMemo(
    () => selectedProjects.map((project) => project.name.split(' - ')[0]),
    [selectedProjects],
  )
  const selectedBlockDefinitions = useMemo(
    () =>
      blockIds
        .map((blockId) => PORTFOLIO_BLOCK_DEFINITIONS.find((block) => block.id === blockId))
        .filter((block): block is (typeof PORTFOLIO_BLOCK_DEFINITIONS)[number] => Boolean(block)),
    [blockIds],
  )
  const activePreviewMode =
    PREVIEW_MODES.find((mode) => mode.id === previewMode) ?? PREVIEW_MODES[0]
  const selectedCopyProfile = getCopyProfile(copyProfileId)
  const copiedLabel =
    copyStatus === 'url'
      ? 'URL 복사됨'
      : copyStatus === 'query'
        ? '쿼리 복사됨'
        : copyStatus === 'markdown'
          ? 'Markdown 복사됨'
          : copyStatus === 'failed'
            ? '직접 복사 필요'
            : null

  useEffect(() => {
    const stage = previewStageRef.current
    if (!stage) return

    const updatePreviewScale = () => {
      const horizontalPadding = 24
      const availableWidth = Math.max(stage.clientWidth - horizontalPadding, 1)
      const nextScale = Math.min(1, availableWidth / activePreviewMode.width)

      setPreviewScale(Number(Math.max(0.35, nextScale).toFixed(3)))
    }

    updatePreviewScale()

    const resizeObserver = new ResizeObserver(updatePreviewScale)
    resizeObserver.observe(stage)
    window.addEventListener('resize', updatePreviewScale)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updatePreviewScale)
    }
  }, [activePreviewMode.width])

  if (!PORTFOLIO_MANAGER_ENABLED) return <NotFound />

  const updateBlocks = (nextBlocks: readonly PortfolioBlockId[]) => {
    setBlockIds(nextBlocks)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextBlocks))
  }

  const updateProjects = (nextProjectIds: readonly string[]) => {
    const normalized = normalizeProjectIds(nextProjectIds)
    setProjectIds(normalized)
    window.localStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(normalized))
  }

  const updateCopyProfile = (nextCopyProfileId: string) => {
    setCopyProfileId(getCopyProfile(nextCopyProfileId).id)
    window.localStorage.setItem(COPY_STORAGE_KEY, getCopyProfile(nextCopyProfileId).id)
  }

  const updateCompanyKey = (nextCompanyKey: string) => {
    const normalizedCompanyKey = normalizeCompanyKey(nextCompanyKey)
    setCompanyKey(normalizedCompanyKey)
    window.localStorage.setItem(COMPANY_KEY_STORAGE_KEY, normalizedCompanyKey)
  }

  const applyPreset = (preset: PortfolioPreset) => {
    updateBlocks(preset.blocks)
    updateProjects(preset.projectIds)
    updateCopyProfile(preset.copyProfileId)
    updateCompanyKey(preset.companyKey ?? '')
  }

  const applyBlockTemplate = (templateBlockIds: readonly PortfolioBlockId[]) => {
    updateBlocks(templateBlockIds)
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
    if (projectIds.length >= MAX_VISIBLE_PROJECTS) return
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

  const copyText = async (value: string, nextStatus: Exclude<CopyStatus, 'idle' | 'failed'>) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopyStatus(nextStatus)
    } catch {
      setCopyStatus('failed')
    }
    window.setTimeout(() => setCopyStatus('idle'), 1500)
  }

  const copyPublicUrl = () => {
    void copyText(publicUrl, 'url')
  }

  const copyPublicQuery = () => {
    void copyText(publicQuery, 'query')
  }

  const copyMarkdownLink = () => {
    void copyText(`[${activePreset?.name ?? '포트폴리오'}](${publicUrl})`, 'markdown')
  }

  return (
    <div className="portfolio-manager-page">
      <div className="portfolio-manager-shell">
        <header className="shrink-0 rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
          <div className="grid gap-3 xl:grid-cols-[minmax(220px,280px)_minmax(0,1fr)_auto] xl:items-center">
            <div>
              <p className="text-xs font-extrabold uppercase text-[#2563EB]">
                Local Portfolio Manager
              </p>
              <h1 className="mt-1 text-xl font-extrabold">포트폴리오 블록 조합</h1>
            </div>
            <div className="min-w-0 rounded-lg border border-blue-200 bg-blue-50/80 p-2.5">
              <div className="mb-1 flex items-center justify-between gap-2">
                <span className="text-[0.68rem] font-extrabold uppercase text-blue-700">
                  현재 공개 링크
                </span>
                {companyKey ? (
                  <span className="rounded-full bg-white px-2 py-0.5 text-[0.68rem] font-bold text-blue-700 ring-1 ring-blue-200">
                    company={companyKey}
                  </span>
                ) : null}
              </div>
              <p className="truncate rounded-md bg-white px-3 py-2 font-mono text-[0.75rem] font-semibold text-slate-700 ring-1 ring-blue-100">
                {publicUrl}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-2">
              {copiedLabel ? (
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-extrabold text-emerald-700">
                  {copiedLabel}
                </span>
              ) : null}
              <button
                type="button"
                onClick={copyPublicUrl}
                title={publicUrl}
                className="inline-flex items-center gap-2 rounded-md bg-[#1E3A5F] px-3 py-2 text-sm font-bold text-white hover:bg-[#152a45]"
              >
                <i
                  className={copyStatus === 'url' ? 'ri-check-line' : 'ri-link'}
                  aria-hidden="true"
                />
                URL 복사
              </button>
              <a
                href={publicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-blue-300 bg-white px-3 py-2 text-sm font-bold text-blue-700 hover:bg-blue-50"
              >
                <i className="ri-external-link-line" aria-hidden="true" />
                열기
              </a>
            </div>
          </div>
        </header>

        <div className="portfolio-manager-grid">
          <aside className="portfolio-manager-editor">
            <div className="border-b border-slate-200 p-3">
              <div className="grid grid-cols-3 gap-1 rounded-lg bg-slate-100 p-1">
                {MANAGER_PANELS.map((panel) => {
                  const selected = activePanel === panel.id
                  return (
                    <button
                      key={panel.id}
                      type="button"
                      onClick={() => setActivePanel(panel.id)}
                      aria-pressed={selected}
                      className={`inline-flex min-h-10 items-center justify-center gap-1.5 rounded-md px-2 text-sm font-extrabold transition-colors ${
                        selected
                          ? 'bg-white text-[#1E3A5F] shadow-sm ring-1 ring-slate-200'
                          : 'text-slate-500 hover:bg-white/70 hover:text-slate-800'
                      }`}
                    >
                      <i className={panel.icon} aria-hidden="true" />
                      {panel.label}
                    </button>
                  )
                })}
              </div>

              <section className="mt-3 rounded-lg border border-blue-200 bg-blue-50/80 p-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-extrabold uppercase text-blue-600">
                    현재 적용
                  </span>
                  <span className="rounded-full bg-white px-2 py-1 text-[0.68rem] font-bold text-blue-700 ring-1 ring-blue-200">
                    {activePreset ? '저장된 프리셋' : '수동 편집'}
                  </span>
                </div>
                <p className="mt-2 text-base font-extrabold text-slate-900">
                  {activePreset?.name ?? '사용자 조합'}
                </p>
                <div className="mt-2 space-y-1 text-xs leading-relaxed text-slate-600">
                  <p>
                    <span className="font-bold text-slate-800">문구</span> ·{' '}
                    {selectedCopyProfile.name}
                  </p>
                  <p>
                    <span className="font-bold text-slate-800">프로젝트</span> ·{' '}
                    {selectedProjectNames.join(', ')}
                  </p>
                  <p>
                    <span className="font-bold text-slate-800">블록</span> · {blockIds.length}개
                    {companyKey ? ` · company=${companyKey}` : ' · 공통 공개 링크'}
                  </p>
                </div>
              </section>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-4">
              {activePanel === 'company' ? (
                <div className="space-y-5">
                  <section>
                    <div className="flex items-center justify-between gap-3">
                      <h2 className="text-sm font-extrabold">기업 프리셋</h2>
                      <span className="text-xs font-semibold text-slate-400">
                        {activePreset?.name ?? '사용자 조합'}
                      </span>
                    </div>
                    <div className="mt-3 space-y-2">
                      {[...PUBLIC_PRESETS, ...COMPANY_PUBLIC_PRESETS].map((preset) => {
                        const selected = activePreset?.id === preset.id
                        return (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => applyPreset(preset)}
                            aria-pressed={selected}
                            className={`w-full rounded-md border px-3 py-2.5 text-left transition-colors ${
                              selected
                                ? 'border-blue-400 bg-blue-50 ring-1 ring-blue-200'
                                : 'border-slate-200 hover:border-[#2563EB] hover:bg-blue-50'
                            }`}
                          >
                            <span className="flex items-center justify-between gap-2 text-sm font-bold">
                              <span className="min-w-0 truncate">{preset.name}</span>
                              {selected ? (
                                <span className="shrink-0 rounded-full bg-blue-600 px-2 py-0.5 text-[0.65rem] text-white">
                                  선택됨
                                </span>
                              ) : null}
                            </span>
                            <span className="mt-0.5 block text-xs leading-relaxed text-slate-500">
                              {preset.description}
                            </span>
                          </button>
                        )
                      })}
                      {customPresets.map((preset) => {
                        const selected = activePreset?.id === preset.id
                        return (
                          <div
                            key={preset.id}
                            className={`flex items-stretch overflow-hidden rounded-md border ${
                              selected
                                ? 'border-emerald-400 bg-emerald-50 ring-1 ring-emerald-200'
                                : 'border-emerald-200 bg-emerald-50/50'
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() => applyPreset(preset)}
                              aria-pressed={selected}
                              className="min-w-0 flex-1 px-3 py-2.5 text-left hover:bg-emerald-50"
                            >
                              <span className="flex items-center justify-between gap-2 text-sm font-bold">
                                <span className="truncate">{preset.name}</span>
                                {selected ? (
                                  <span className="shrink-0 rounded-full bg-emerald-600 px-2 py-0.5 text-[0.65rem] text-white">
                                    선택됨
                                  </span>
                                ) : null}
                              </span>
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
                        )
                      })}
                    </div>
                  </section>

                  <section className="border-t border-slate-200 pt-4">
                    <h2 className="text-sm font-extrabold">맞춤 저장</h2>
                    <div className="mt-3 space-y-2">
                      <input
                        value={presetName}
                        onChange={(event) => setPresetName(event.target.value)}
                        placeholder="예: 에이블리 지원용"
                        aria-label="기업별 프리셋 이름"
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2563EB]"
                      />
                      <div className="flex items-center rounded-md border border-slate-300 bg-white px-3">
                        <span className="shrink-0 text-xs font-semibold text-slate-400">
                          company=
                        </span>
                        <input
                          value={companyKey}
                          onChange={(event) => updateCompanyKey(event.target.value)}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter') saveCustomPreset()
                          }}
                          placeholder="ably"
                          aria-label="기업 링크 키"
                          className="min-w-0 flex-1 px-1 py-2 text-sm outline-none"
                        />
                        {companyKey ? (
                          <button
                            type="button"
                            onClick={() => updateCompanyKey('')}
                            aria-label="기업 링크 키 비우기"
                            title="비우기"
                            className="ml-1 flex h-6 w-6 items-center justify-center rounded text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                          >
                            <i className="ri-close-line" aria-hidden="true" />
                          </button>
                        ) : null}
                      </div>
                      <button
                        type="button"
                        onClick={saveCustomPreset}
                        disabled={!presetName.trim() || !companyKey}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-emerald-600 px-3 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <i className="ri-save-3-line" aria-hidden="true" />
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
                </div>
              ) : null}

              {activePanel === 'composition' ? (
                <div className="space-y-5">
                  <section className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <h2 className="text-sm font-extrabold">빠른 작업</h2>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => applyPreset(DEFAULT_PUBLIC_PRESET)}
                        className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-extrabold text-slate-700 hover:border-[#2563EB] hover:text-[#2563EB]"
                      >
                        공개 기본값
                      </button>
                      <button
                        type="button"
                        onClick={() => applyBlockTemplate(ALL_BLOCK_IDS)}
                        className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-extrabold text-slate-700 hover:border-[#2563EB] hover:text-[#2563EB]"
                      >
                        전체 블록
                      </button>
                      <button
                        type="button"
                        onClick={() => applyBlockTemplate(CORE_BLOCK_IDS)}
                        className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-extrabold text-slate-700 hover:border-[#2563EB] hover:text-[#2563EB]"
                      >
                        핵심만
                      </button>
                      <button
                        type="button"
                        onClick={() => applyBlockTemplate(STORY_BLOCK_IDS)}
                        className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-extrabold text-slate-700 hover:border-[#2563EB] hover:text-[#2563EB]"
                      >
                        스토리형
                      </button>
                    </div>
                  </section>

                  <section className="border-t border-slate-200 pt-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-sm font-extrabold">프로젝트 블록</h2>
                      <span className="text-xs font-semibold text-slate-400">
                        {projectIds.length}/{MAX_VISIBLE_PROJECTS}개 선택
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {PROJECT_QUICK_SETS.map((quickSet) => {
                        const selected = hasSameOrder(
                          projectIds,
                          normalizeProjectIds(quickSet.projectIds),
                        )
                        return (
                          <button
                            key={quickSet.label}
                            type="button"
                            onClick={() => updateProjects(quickSet.projectIds)}
                            aria-pressed={selected}
                            className={`rounded-full px-3 py-1.5 text-xs font-extrabold ring-1 transition-colors ${
                              selected
                                ? 'bg-emerald-600 text-white ring-emerald-600'
                                : 'bg-white text-slate-600 ring-slate-200 hover:text-emerald-700 hover:ring-emerald-300'
                            }`}
                          >
                            {quickSet.label}
                          </button>
                        )
                      })}
                    </div>
                    <div className="mt-3 space-y-2">
                      {PROJECTS.map((project) => {
                        const selected = projectIds.includes(project.id)
                        const selectedIndex = projectIds.indexOf(project.id)
                        return (
                          <div
                            key={project.id}
                            className={`rounded-md border p-3 ${
                              selected
                                ? 'border-emerald-200 bg-emerald-50/70'
                                : 'border-slate-200 bg-slate-50'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <input
                                id={`project-${project.id}`}
                                type="checkbox"
                                checked={selected}
                                disabled={!selected && projectIds.length >= MAX_VISIBLE_PROJECTS}
                                onChange={() => toggleProject(project.id)}
                                className="mt-1 h-4 w-4 accent-emerald-600 disabled:cursor-not-allowed disabled:opacity-40"
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
                      <span className="text-xs font-semibold text-slate-400">
                        {blockIds.length}개 노출
                      </span>
                    </div>
                    <div className="mt-3 space-y-2">
                      {PORTFOLIO_BLOCK_DEFINITIONS.map((block) => {
                        const selected = blockIds.includes(block.id)
                        const selectedIndex = blockIds.indexOf(block.id)
                        return (
                          <div
                            key={block.id}
                            className={`rounded-md border p-3 ${
                              selected
                                ? 'border-blue-200 bg-blue-50/60'
                                : 'border-slate-200 bg-slate-50'
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
                              <label
                                htmlFor={`block-${block.id}`}
                                className="min-w-0 flex-1 cursor-pointer"
                              >
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
                </div>
              ) : null}

              {activePanel === 'links' ? (
                <div className="space-y-5">
                  <section>
                    <h2 className="text-sm font-extrabold">공개 링크</h2>
                    <div className="mt-3 space-y-3">
                      <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
                        <p className="text-xs font-extrabold text-slate-500">대표 링크</p>
                        <p className="mt-2 break-all font-mono text-xs font-semibold text-slate-700">
                          {publicUrl}
                        </p>
                      </div>
                      {shortPublicPath ? (
                        <div className="rounded-md border border-blue-200 bg-blue-50 p-3">
                          <p className="text-xs font-extrabold text-blue-700">전체 조건 링크</p>
                          <p className="mt-2 break-all font-mono text-xs font-semibold text-blue-800">
                            {fullPublicUrl}
                          </p>
                        </div>
                      ) : null}
                      <div className="rounded-md border border-slate-200 bg-white p-3">
                        <p className="text-xs font-extrabold text-slate-500">쿼리</p>
                        <p className="mt-2 break-all font-mono text-xs font-semibold text-slate-700">
                          {publicQuery}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={copyPublicUrl}
                        className="inline-flex items-center justify-center gap-2 rounded-md bg-[#1E3A5F] px-3 py-2 text-sm font-bold text-white hover:bg-[#152a45]"
                      >
                        <i
                          className={copyStatus === 'url' ? 'ri-check-line' : 'ri-link'}
                          aria-hidden="true"
                        />
                        URL 복사
                      </button>
                      <button
                        type="button"
                        onClick={copyMarkdownLink}
                        className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50"
                      >
                        <i className="ri-markdown-line" aria-hidden="true" />
                        MD 링크
                      </button>
                      <button
                        type="button"
                        onClick={copyPublicQuery}
                        className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50"
                      >
                        <i className="ri-file-copy-line" aria-hidden="true" />
                        쿼리 복사
                      </button>
                      <a
                        href={publicPath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-md border border-blue-300 bg-white px-3 py-2 text-sm font-bold text-blue-700 hover:bg-blue-50"
                      >
                        <i className="ri-eye-line" aria-hidden="true" />
                        로컬 열기
                      </a>
                    </div>
                  </section>

                  <section className="border-t border-slate-200 pt-4">
                    <h2 className="text-sm font-extrabold">노출 블록</h2>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {selectedBlockDefinitions.map((block, index) => (
                        <span
                          key={block.id}
                          className="rounded-full bg-white px-2 py-1 text-[0.68rem] font-bold text-slate-600 ring-1 ring-slate-200"
                        >
                          {index + 1}. {block.label}
                        </span>
                      ))}
                    </div>
                  </section>

                  <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-900">
                    이 화면은 로컬 개발 환경 전용입니다. 생성되는 링크에는 공개 블록만 포함되며,
                    비공개 자료는 추후 인증 서버에서 별도로 불러옵니다.
                  </p>
                </div>
              ) : null}
            </div>
          </aside>

          <section className="portfolio-manager-preview">
            <div className="flex flex-col gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3 xl:flex-row xl:items-center xl:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-extrabold uppercase text-slate-400">
                  실시간 미리보기
                </p>
                <p className="mt-0.5 truncate text-sm font-extrabold text-slate-700">
                  {selectedProjectNames.join(' · ')} / {selectedCopyProfile.name}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {PREVIEW_MODES.map((mode) => {
                  const selected = mode.id === previewMode
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setPreviewMode(mode.id)}
                      aria-pressed={selected}
                      className={`inline-flex min-h-9 items-center gap-1.5 rounded-md border px-2.5 text-xs font-extrabold transition-colors ${
                        selected
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-700'
                      }`}
                    >
                      <i className={mode.icon} aria-hidden="true" />
                      {mode.label}
                    </button>
                  )
                })}
              </div>
            </div>
            <div ref={previewStageRef} className="portfolio-manager-preview-stage">
              <div
                className="portfolio-manager-preview-frame-shell"
                style={{
                  width: activePreviewMode.width * previewScale,
                  height: activePreviewMode.height * previewScale,
                }}
              >
                <iframe
                  key={`${previewMode}-${publicPath}`}
                  title="포트폴리오 실시간 미리보기"
                  src={publicPath}
                  className="portfolio-manager-preview-frame"
                  style={{
                    width: activePreviewMode.width,
                    height: activePreviewMode.height,
                    transform: `scale(${previewScale})`,
                  }}
                />
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-500">
              <span>
                {activePreviewMode.width}px × {activePreviewMode.height}px
              </span>
              <span>{Math.round(previewScale * 100)}%</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
