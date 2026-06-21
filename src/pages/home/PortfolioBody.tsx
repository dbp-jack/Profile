import { PORTFOLIO_BLOCK_REGISTRY } from '@/portfolio-builder/block-registry'
import { PortfolioCompositionProvider } from '@/portfolio-builder/composition-context'
import { DEFAULT_PUBLIC_PRESET } from '@/portfolio-builder/presets'
import type { PortfolioBlockId } from '@/portfolio-builder/types'

type PortfolioBodyProps = {
  /** `/pdf`에서만: Hero+About을 묶어 인쇄 시 한 장 안에 넣기 쉽게 함 */
  pdfStackHeroAbout?: boolean
  blockIds?: readonly PortfolioBlockId[]
  projectIds?: readonly string[]
  copyProfileId?: string
}

/** 메인 스크롤 페이지 본문 — 웹(`/`)과 PDF 미리보기(`/pdf`)에서 동일하게 사용 */
export default function PortfolioBody({
  pdfStackHeroAbout = false,
  blockIds = DEFAULT_PUBLIC_PRESET.blocks,
  projectIds = DEFAULT_PUBLIC_PRESET.projectIds,
  copyProfileId = DEFAULT_PUBLIC_PRESET.copyProfileId,
}: PortfolioBodyProps) {
  const mainBlockIds = blockIds.filter(
    (blockId) => PORTFOLIO_BLOCK_REGISTRY[blockId].placement === 'main',
  )
  const footerBlockIds = blockIds.filter(
    (blockId) => PORTFOLIO_BLOCK_REGISTRY[blockId].placement === 'footer',
  )

  const renderBlock = (blockId: PortfolioBlockId) => {
    const BlockComponent = PORTFOLIO_BLOCK_REGISTRY[blockId].component
    return <BlockComponent key={blockId} />
  }

  const shouldStackHeroAbout =
    pdfStackHeroAbout && mainBlockIds[0] === 'hero' && mainBlockIds[1] === 'about'

  const renderedMainBlocks = shouldStackHeroAbout ? (
    <>
      <div className="pdf-hero-about-bunch">
        {renderBlock('hero')}
        {renderBlock('about')}
      </div>
      {mainBlockIds.slice(2).map(renderBlock)}
    </>
  ) : (
    mainBlockIds.map(renderBlock)
  )

  return (
    <PortfolioCompositionProvider projectIds={projectIds} copyProfileId={copyProfileId}>
      <main>{renderedMainBlocks}</main>
      {footerBlockIds.map(renderBlock)}
    </PortfolioCompositionProvider>
  )
}
