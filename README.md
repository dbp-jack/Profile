# Portfolio

React, TypeScript, Vite 기반의 웹 포트폴리오입니다.

## 구조

- `src/pages/home/` — 승인된 한 페이지 웹 포트폴리오, SQL 원본 가로 비교·이미지 확대·기업별 구성 연결
- `src/content/projects/` — 프로젝트별 공개 콘텐츠
- `src/content/portfolio.ts` — 공통 소개, 경험, 연락처 문구
- `src/pages/pdf/` — 확정한 26쪽 PDF 포트폴리오, 페이지 탐색·이미지 확대·A4 가로 저장
- `src/pages/pdf-compare/` — 같은 PDF 본문을 사용하는 로컬 수정안
- `src/portfolio-builder/` — 공개 URL 조합, 블록/프리셋, 문구 프로필

## 로컬 관리 페이지

`/manage`는 로컬에서만 쓰는 내부 도구입니다.

- `src/pages/manage/`는 저장소에 포함해 새 로컬 채팅/워크트리에서도 같은 최신 관리 도구를 사용합니다.
- 개발 서버가 `localhost`, `127.0.0.1`, `::1`에서 실행될 때만 라우트가 생성됩니다.
- production build는 `/manage` 라우트를 만들지 않으며, 관리 페이지 소스가 번들에 섞이면 실패합니다.
- 생성되는 링크는 공개 블록·프로젝트·문구 조합과 선택한 기업의 `Company Direction`을 담습니다.
- 기업별 초안은 현재 브라우저에 자동 저장되며, 최종 생성 URL을 공유하면 다른 브라우저에서도 같은 공개 내용을 재현합니다.
- 새 공개 기본값은 소개·기술 → 프로젝트·협업·AI → 경험 → 마무리 → 연락처 → 자료입니다. 기존 전체 기본 순서는 자동으로 이 순서에 맞춥니다.
- 강점은 기본적으로 상단 소개에 요약하고, 검증 중심 상세 강점은 독립 선택지로 유지합니다.
- 이전 로컬 `/web-preview`는 정식 홈으로 연결하며 별도 웹 시안 사본은 유지하지 않습니다.

## 명령어

```bash
npm install
npm run dev -- --host 127.0.0.1 --port 5174
npm run build
```

GitHub Pages 배포는 `.github/workflows/deploy.yml`에서 `main` 브랜치 push 기준으로 실행됩니다. 빌드 시 `pdf/index.html`도 생성해 `/Profile/pdf/` 직접 접속과 새로고침을 지원합니다.

## 작업 기준

- 최신 성공 배포본을 화면 비교 기준으로 사용하고, 이 저장소의 canonical workspace를 편집 정본으로 사용합니다.
- 웹 포트폴리오를 페이지별로 검토·확정한 뒤, 웹 전체 작업이 끝나면 PDF를 별도 단계로 반영합니다.
- 세부 검토 절차와 피드백 기준은 `AGENTS.md`와 `docs/mentor-feedback-rubric.md`를 따릅니다.
