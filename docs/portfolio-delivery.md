# 포트폴리오 공개·관리 계약

## 공개 포트폴리오

- GitHub Pages는 기본 포트폴리오를 `/`에서 제공합니다.
- `?preset=project-focused`는 미리 정의한 공개 구성을 선택합니다.
- `?blocks=hero,about,projects,resources,contact,footer`는 공개할 페이지 블록을 선택합니다.
- `?projects=feedshop,three-m`은 프로젝트 블록을 선택하고 순서를 정합니다.
- `?copy=backend-impact`는 준비된 문구 프로필을 선택합니다.
- `?strengths=backend-validation`은 독립된 Strengths 구성을 선택합니다. 기본 구성은 쿼리에 표시하지 않습니다.
- `?company=ably`는 기업 식별자를 부여합니다. 관리 화면에서 생성한 전체 공유 URL은 `blocks`, `projects`, `copy`, `company`, 선택적 `strengths` 값을 함께 담아 다른 브라우저에서도 같은 공개 구성을 재현합니다.
- `?ci=1`이 포함된 링크는 기업명, 서비스 방향, 기업 이해, 내 경험·기여, 키워드, 서비스 흐름, 선택적 로고 URL을 같은 쿼리에 담아 `Company Direction` 카드를 재현합니다.
- 기본 URL은 공통 포트폴리오만 표시하며 `Company Direction` 기업 맞춤 카드를 노출하지 않습니다.
- `?company=test`와 뱅카우 회사 키(`bankcow`, `bancow`, `stockkeeper`, `stock-keeper`)는 미리 등록된 뱅카우 `Company Direction` 카드를 표시합니다. 관리 화면에서 맞춤 내용을 활성화하면 같은 키의 미리 등록된 카드보다 URL의 맞춤 내용을 우선합니다.
- 쿼리 파라미터는 표시 방식만 제어합니다. 접근 제어 수단이 아니며 비공개 자료를 노출하는 데 사용하면 안 됩니다.

## 로컬 관리 화면

- 실행 방법은 `README.md`를 따르고 로컬에서 `/manage`를 엽니다.
- `src/pages/manage/`는 저장소에 포함되어 canonical workspace에서 같은 최신 관리 화면을 사용합니다.
- 페이지 블록과 프로젝트를 선택·숨김·재정렬하고, 문구 프로필과 Strengths 구성, 기업별 `Company Direction`을 선택해 공개 URL을 생성합니다.
- `기업` 탭에서 영문 기업 키를 입력한 뒤 `Company Direction > 사용`을 켜고 기업명, 서비스 방향, 확인한 공식 내용, 내 경험·기여, 키워드, 서비스 흐름을 작성합니다.
- `Company Direction > 사용`을 켜면 `Direction` 블록이 자동으로 포함됩니다. 회사·서비스 방향 이해 또는 확인한 내용 중 하나가 있어야 맞춤 카드가 URL에 포함됩니다.
- 기업별 초안과 사용자 프리셋은 현재 브라우저의 로컬 저장소에만 남지만, 생성된 전체 URL에는 공개 문구가 포함되므로 독립적으로 공유할 수 있습니다.
- `링크` 탭에서 카드 노출과 URL 길이를 확인하고 `URL 복사`로 배포합니다. 2,000자를 넘으면 일부 채용 사이트에서 잘릴 수 있으므로 문구를 압축하거나 이메일·메신저로 전달합니다.
- 새로고침 후 기업 키와 초안이 복원되는지, `구성 > 공개 기본값`에서 기업 키와 카드가 제거되는지 확인한 뒤 공유합니다.
- 관리 화면은 `localhost`, `127.0.0.1`, `::1`의 로컬 개발 환경에서만 활성화됩니다.
- 프로덕션 빌드는 `/manage` 라우트를 제외하며 관리 화면 소스나 전용 문자열이 공개 번들에 포함되면 빌드에 실패합니다.

관리 화면을 별도로 배포해야 한다면 공개 GitHub Pages에 포함하지 말고, 별도 비공개 앱이나 인증 프록시처럼 플랫폼 인증이 적용된 환경에서 보호합니다.

## GitHub Actions와 기업별 링크 배포

- `main` 브랜치에 커밋을 push하면 `.github/workflows/deploy.yml`의 `Deploy to GitHub Pages`가 실행됩니다.
- Actions는 Node 20에서 `npm ci`와 `npm run build`를 실행하고 `BASE_PATH=/Profile/`로 생성한 `dist`를 GitHub Pages에 배포합니다.
- `/manage`는 로컬 전용이므로 GitHub Pages에는 배포되지 않습니다. 대신 공개 화면의 `Company Direction` URL 해석 코드만 프로덕션 번들에 포함됩니다.
- 관리 기능 코드가 한 번 배포된 뒤에는 기업별 초안을 새로 작성할 때마다 커밋·push할 필요가 없습니다. 로컬 `/manage`가 만든 URL에 해당 기업의 공개 문구가 함께 들어가므로 그 URL을 바로 배포합니다.
- 공개 화면의 디자인, URL 파라미터 계약, 미리 등록된 기업 콘텐츠를 바꿀 때만 다시 커밋·push하고 Actions 배포 완료를 확인합니다.
- 기업별 URL은 비밀 링크가 아닙니다. URL을 받은 사람과 브라우저 기록·채용 시스템 로그에서 문구를 볼 수 있으므로 공개 가능한 정보만 입력합니다.

## 기업 프리셋

- 공개 프리셋에는 공개 가능한 블록 식별자만 넣습니다.
- 기본 프리셋은 페이지 블록, 정렬된 프로젝트 ID, 문구 프로필을 저장합니다. Strengths 선택은 별도 공개 쿼리로 관리합니다.
- 기업용 프리셋은 포함된 모든 섹션이 공개에 적합한지 검토한 뒤 `src/portfolio-builder/presets.ts`에 추가합니다.
- 프로젝트는 데이터 파일과 overview 항목을 만들고 `src/content/projects/index.ts`에 등록하면 관리 화면에서 선택할 수 있습니다.
- 기업 프리셋 URL은 맞춤 표시를 위한 편의 기능이지 비밀 링크가 아닙니다.

## 비공개 근거 자료

- 비공개 근거, 자격 증명, 접근 토큰, 서명 URL을 `src/content`, `public`, `VITE_*` 환경 변수에 넣지 않습니다.
- `src/portfolio-builder/private-content.ts`의 `PrivateContentProvider`는 향후 인증 서버를 연결하기 위한 인터페이스이며, 현재 실제 인증 연동은 없습니다.
- 향후 서버는 사용자를 인증하고 각 근거 자료 요청을 인가한 뒤 짧은 수명의 데이터만 반환해야 합니다.
- 세션은 HttpOnly 보안 쿠키를 우선하며, 공개 GitHub Pages는 비공개 API가 없어도 정상적으로 사용할 수 있어야 합니다.
