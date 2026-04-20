import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import HeroSection from './components/HeroSection'
import PhilosophyClosingSection from './components/PhilosophyClosingSection'
import ProjectsSection from './components/ProjectsSection'
import ResourcesSection from './components/ResourcesSection'

type PortfolioBodyProps = {
  /** `/pdf`에서만: Hero+About을 묶어 인쇄 시 한 장 안에 넣기 쉽게 함 */
  pdfStackHeroAbout?: boolean
}

/** 메인 스크롤 페이지 본문 — 웹(`/`)과 PDF 미리보기(`/pdf`)에서 동일하게 사용 */
export default function PortfolioBody({ pdfStackHeroAbout = false }: PortfolioBodyProps) {
  const heroAbout =
    pdfStackHeroAbout ? (
      <div className="pdf-hero-about-bunch">
        <HeroSection />
        <AboutSection />
      </div>
    ) : (
      <>
        <HeroSection />
        <AboutSection />
      </>
    )

  return (
    <>
      <main>
        {heroAbout}
        <ProjectsSection />
        <PhilosophyClosingSection />
        <ResourcesSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
