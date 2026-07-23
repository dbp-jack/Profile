# Portfolio

React, TypeScript, Vite 기반의 웹 포트폴리오입니다.

## 구조

- `src/pages/home/page.tsx` — 공개 웹 포트폴리오 진입점
- `src/content/projects/` — 프로젝트별 공개 콘텐츠
- `src/content/portfolio.ts` — 공통 소개, 경험, 연락처 문구
- `src/pages/pdf/` — PDF 미리보기 전용 화면
- `src/portfolio-builder/` — 공개 URL 조합, 블록/프리셋, 문구 프로필

## 로컬 관리 페이지

`/manage`는 로컬에서만 쓰는 내부 도구입니다.

- `src/pages/manage/`는 저장소에 포함해 새 로컬 채팅/워크트리에서도 같은 최신 관리 도구를 사용합니다.
- 개발 서버가 `localhost`, `127.0.0.1`, `::1`에서 실행될 때만 라우트가 생성됩니다.
- production build는 `/manage` 라우트를 만들지 않으며, 관리 페이지 소스가 번들에 섞이면 실패합니다.
- 생성되는 링크는 공개 블록/프로젝트/문구 조합만 담습니다.

## 명령어

```bash
npm install
npm run dev -- --host 127.0.0.1 --port 5174
npm run build
```

GitHub Pages 배포는 `.github/workflows/deploy.yml`에서 `main` 브랜치 push 기준으로 실행됩니다.

## 작업 기준

- 최신 성공 배포본을 화면 비교 기준으로 사용하고, 이 저장소의 canonical workspace를 편집 정본으로 사용합니다.
- 웹 포트폴리오를 페이지별로 검토·확정한 뒤, 웹 전체 작업이 끝나면 PDF를 별도 단계로 반영합니다.
- 세부 검토 절차와 피드백 기준은 `AGENTS.md`와 `docs/mentor-feedback-rubric.md`를 따릅니다.
