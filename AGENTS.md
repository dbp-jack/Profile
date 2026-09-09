<!-- CODEGRAPH_START -->
## CodeGraph

In repositories indexed by CodeGraph (a `.codegraph/` directory exists at the repo root), reach for it BEFORE grep/find or reading files when you need to understand or locate code:

- **MCP tools** (when available): `codegraph_explore` answers most code questions in one call — the relevant symbols' verbatim source plus the call paths between them. `codegraph_node` returns one symbol's source + callers, or reads a whole file with line numbers. If the tools are listed but deferred, load them by name via tool search.
- **Shell** (always works): `codegraph explore "<symbol names or question>"` and `codegraph node <symbol-or-file>` print the same output.

If there is no `.codegraph/` directory, skip CodeGraph entirely — indexing is the user's decision.
<!-- CODEGRAPH_END -->

## Canonical Workspace

- Treat this repository path as the single source of truth:
  `/Users/minsujeong/Desktop/재적3/Portfolio`
- The same path may visually render as `/Users/minsujeong/Desktop/재적3/Portfolio`; it is the canonical portfolio workspace.
- Do not make lasting portfolio edits in temporary Codex worktrees such as `/Users/minsujeong/.codex/worktrees/.../Portfolio` unless the user explicitly asks for that worktree.
- If a temporary worktree is used, copy or apply the final changes back to the canonical workspace before claiming the work is done.
- Before verifying local UI, confirm the dev server port points at the canonical workspace with `lsof -a -p <pid> -d cwd`.
- For this portfolio, use `http://127.0.0.1:5174/` from the canonical workspace when checking the local site.
- 최신 성공 GitHub Pages 배포본을 화면 비교 기준으로 사용하고, canonical workspace를 편집 정본으로 사용합니다. 둘이 다르면 수정 전에 차이를 알리고 정합성을 맞춥니다.
- If multiple worktrees exist, stop and reconcile them before editing, committing, pushing, or deploying.

## 현재 정본과 기업별 작업 시작

- 새 작업은 `README.md`와 `docs/portfolio-delivery.md`를 먼저 읽습니다. 최신 구성·확정 문구·수치의 한계·기업별 작업 절차는 이 인계를 기준으로 이어갑니다.
- 현재 웹은 `src/pages/home/`의 한 페이지 구성(`/`), PDF는 `src/pages/pdf/`의 26쪽(`/pdf`), 로컬 관리 도구는 `src/pages/manage/`(`/manage`)입니다.
- 웹 기본 순서는 소개·기술 → FeedShop(문제 2개·회고) → 3M(통합 문제 1개·회고) → 협업·AI → 경험 → 마무리·연락처·자료입니다. 예전 사이드바와 프로젝트별 왕복 화면을 복원하지 않습니다.
- `/web-preview`, `/pdf-compare`는 로컬의 과거 북마크를 현재 정본으로 보내는 경로만 유지합니다. 별도 시안 본문을 만들지 않습니다.
- PDF 4·15쪽의 소개·서비스 흐름·담당/효과 배치는 사용자 확정 사항입니다. 다른 페이지를 수정하며 함께 바꾸지 않습니다.
- 기업별 작업은 기업명과 지원공고 URL 또는 전문을 받은 뒤 시작합니다. 과거 뱅카우 등 다른 지원 기업을 현재 대상으로 추정하지 않습니다.
- 기업별 선택은 기존 `/manage` 기능을 먼저 사용하고 공통 기본값은 유지합니다. 새 회사의 요구사항을 공통 본문에 자동 반영하거나, 웹 공유 URL만으로 PDF도 맞춤화됐다고 판단하지 않습니다.
- 2026-09-10 격리한 과거 출력물은 ignored `output/archive/2026-09-10-obsolete-portfolio/`에 있습니다. 현재본이나 제출 자료의 근거로 사용하지 않습니다. 과거 화면 작업 기록은 Git 이력에서만 필요한 경우 확인합니다.

## Mentor Feedback Review Loop

- Treat `docs/mentor-feedback-rubric.md` as the single source of truth for portfolio and resume feedback.
- 다음 두 김현수 멘토 원문은 페이지 검토와 수정 전에 반드시 다시 확인하는 고정 자료입니다.
  - 1차: `/Users/minsujeong/Downloads/01_커리어_지원/멘토링_특강/멘토링_피드백_김현수_1차.pdf`
  - 2차: `/Users/minsujeong/Downloads/01_커리어_지원/멘토링_특강/멘토링_피드백_김현수_2차.pdf`
- 컨텍스트가 압축됐더라도 대화 기억만으로 이어서 작업하지 않습니다. 매 페이지 검토 또는 수정 전에 두 파일의 존재와 관련 구간 재확인을 마친 뒤, 사용자에게 `현재 하려는 작업`, `1차 확인 내용`, `2차 확인 내용`을 먼저 알립니다. 직접 조언이 없으면 `해당 없음`으로 명시합니다.
- 피드백 파일 업로드, 원문 검토, 요약, 수정안 제안은 포트폴리오 반영 승인이 아닙니다. 사용자가 해당 페이지에 대해 `작업해`, `반영해`, `수정해`처럼 명시적으로 승인하기 전에는 웹·PDF·관련 콘텐츠 파일을 수정하지 않습니다.
- 각 단계에서 도구를 사용하거나 파일을 확인하기 전에 지금 무엇을 확인하고 있으며 무엇은 수정하지 않는지 사용자에게 먼저 짧게 알립니다.
- 페이지 문구·구성 변경을 제안하기 전에 canonical 로컬 `/manage`에서 이미 제공하는 기본값, 독립 선택지, 미리보기, 생성 URL 계약을 함께 확인합니다. 이미 선택 가능한 대안은 기본값 교체안처럼 다시 제안하지 않고 `기본값 유지`, `현재 선택`, `선택 가능한 대안`을 구분해 보고합니다.
- 사용자가 선택형 문구·구성 변경을 승인한 경우 공개 웹만 확인하고 끝내지 않습니다. canonical `http://127.0.0.1:5174/manage`에서 선택 상태, 미리보기, 생성 URL, 새로고침 복원, 기본값 복귀를 함께 검증합니다. 검증 전에는 해당 포트가 canonical workspace에서 실행 중인지 확인합니다.
- Before changing any portfolio page, re-read the relevant passages from both original mentor PDFs, then re-read the active source IDs and integrated rules for that page. Record `해당 없음` when one source has no direct guidance.
- 웹 단계에서는 한 페이지씩 `검토 → 사용자와 논의·확정 → 웹 수정 → 배포본과 canonical 로컬 화면 비교·검증 → 페이지 검토 기록 갱신` 순서로 진행합니다.
- After each page edit, record and show a concise `작업 전 → 작업 후 → 변경 이유` comparison before moving to the next page.
- 모든 웹 페이지의 검토와 사용자 확인을 마친 뒤에만 PDF를 수정합니다. PDF는 같은 페이지 순서로 반영하고 웹/PDF 정합성을 별도 단계에서 검증합니다.
- Keep source-specific advice separate. Resolve overlaps and conflicts only through the rubric's conflict decisions.
- Portfolio rules and resume review rules are both active. Do not mix their source IDs or integrated rules.

## Resume and Interview Workflow

- 공통·인성 질문과 최신 이력서 기반 기술질문·답변은 일반 면접 기준본으로 분리해 유지합니다. 기업별 지원 작업과 질문은 해당 기업 작업에서 별도로 다룹니다.
- 면접 자료의 canonical 폴더는 다음 경로입니다.
  - `/Users/minsujeong/Downloads/01_커리어_지원/자소서_면접`
- 현재 유일한 canonical 이력서는 `v5_3` 3페이지 PDF입니다.
  - `/Users/minsujeong/Downloads/01_커리어_지원/자소서_면접/00_Current_Resume/멘토리용 이력서_v5_3.pdf`
- canonical 이력서의 버전·페이지 수·SHA-256과 사용 규칙은 같은 폴더의 `README.md`를 기준으로 확인합니다. 2026-09-10 현재 위 실제 경로에서 3쪽과 SHA-256 `2a92c0e3517f9cf001176368e3fb35646191555dfa9c8d105fb120e6f4b0fa85`를 재확인했습니다. 외부 README의 경로 문장은 이동 전 위치이므로 파일 식별에는 해시도 대조합니다.
- 이력서 기반 검토나 질문 작성을 시작할 때마다 canonical PDF와 `README.md`를 다시 열어 확인합니다. 대화 기억이나 압축된 컨텍스트만으로 이어서 작업하지 않습니다.
- `v5_2` 상세·함축본과 그 이전 이력서·기업별 지원서·중간산출물은 2026-08-03에 정본에서 제외했습니다. 다시 발견해도 면접 질문의 근거로 사용하지 않습니다.
- 새 이력서가 들어오면 파일 열람, 전체 페이지 렌더링, 페이지 수, SHA-256을 검증한 뒤 canonical 경로와 `README.md`를 갱신합니다. 새 파일 검증 전에는 기존 정본을 제거하지 않습니다.
- 사용자가 명시적으로 요청하지 않는 한 이력서 PDF 자체는 수정하지 않습니다. 이력서 문구 검토를 요청하면 `docs/mentor-feedback-rubric.md`의 이력서 전용 규칙을 다시 확인합니다.
- 특정 기업용 질문이나 답변은 사용자가 회사를 지정했을 때만 별도로 다룹니다. 일반 면접 기준본에 기업별 내용을 섞지 않습니다.
- 답변을 작성할 때 `이력서 명시`, `별도 근거 확인`, `지원자 설명`, `일반론`을 구분합니다. 구현·측정 근거가 확인되지 않은 기술, 수치, 성과는 본인 경험으로 단정하지 않습니다.

## Backup Rule

- Backups and temporary patches are safety nets, not the source of truth.
- The canonical workspace must receive the latest accepted edits before verification, commit, push, or deploy.
- If a backup patch is created, mention its path in the final response and keep the canonical workspace updated with the accepted changes.

## 잔여물 격리 및 작업 인계

- 모든 새 채팅은 작업 시작 전에 canonical workspace에서 `git status --short --branch`와 `git worktree list --porcelain`을 확인합니다.
- 현재 채팅에서 승인되어 진행 중인 추적 파일 변경은 미커밋 상태여도 잔여물이 아닙니다. 새 작업이 이를 임의로 되돌리거나 정리하지 않습니다.
- `git worktree list`에 없는 과거 Codex worktree 경로와 과거 채팅의 임시 복사본은 최신 작업 근거로 사용하지 않습니다.
- 포트폴리오의 지속 보관이 필요한 생성물과 로컬 도구는 기존 ignored `output/` 하위의 용도별 폴더에 둡니다. 일회성 렌더링·비교·검증 파일은 `/private/tmp`을 사용하며 저장소 루트에 `tmp`, `.superpowers`, 임시 `tools` 폴더를 새로 만들지 않습니다.
- 작업 종료 시 관련 없는 non-ignored 미추적 파일은 0개를 기준으로 확인합니다. 출처가 불명확한 항목은 삭제하지 말고 경로, 수정 시각, 크기, 추정 작업을 먼저 보고합니다.
- `output/` 전체를 일괄 삭제하지 않습니다. 아래 보호 자료와 완료 결과물이 함께 있을 수 있으므로 정확한 대상만 복구 가능한 방식으로 정리합니다.
- 인계·커밋·배포 전에는 `진행 중 변경`, `보호 자료`, `새 잔여물`, `worktree 수`를 분리해 확인하고, 승인된 파일만 스테이징합니다.

## 보호할 로컬 근거 자료

- 사용자가 보존을 지정한 다음 파일은 현재 위치에 그대로 둡니다.
  - `/Users/minsujeong/Desktop/재적3/Portfolio/스탁키퍼_면접준비.md`
  - `/Users/minsujeong/Desktop/재적3/Portfolio/output/wiki/FIX_Kafka_주문_결제_이벤트_흐름.md`
- 두 파일은 Git ignore 대상입니다. 사용자가 새로 명시적으로 지시하고 정확한 경로를 다시 확인하기 전에는 삭제·이동하거나 `git clean -x`, `git clean -X` 대상에 포함하지 않습니다.
