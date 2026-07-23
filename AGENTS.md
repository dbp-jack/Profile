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

## Current UI Baseline

The current sidebar baseline is:

`Profile → Strengths → Projects → P1 FeedShop → P2 3M → Work Style → Direction → Experience → Resources → Contact`

Do not replace these labels with older wording such as `Hero`, `About`, `How I Work`, or `Closing`.

## Mentor Feedback Review Loop

- Treat `docs/mentor-feedback-rubric.md` as the single source of truth for portfolio and resume feedback.
- 다음 두 김현수 멘토 원문은 페이지 검토와 수정 전에 반드시 다시 확인하는 고정 자료입니다.
  - 1차: `/Users/minsujeong/Downloads/김현수멘토님피드백.pdf`
  - 2차: `/Users/minsujeong/Downloads/김현수멘토님피드백2차.pdf`
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

## Resume Review Workflow

- The user maintains two resumes: `상세버전` and `함축버전`. Treat them as separate documents with different density goals, never as interchangeable revisions of one file.
- The current canonical resume files are:
  - `상세버전` (`v5_2`, 3 pages): `/Users/minsujeong/Downloads/멘토리용 이력서v5_2_상세.pdf`
  - `함축버전` (`v5_2`, 2 pages): `/Users/minsujeong/Downloads/멘토리용 이력서v5_2_함축.pdf`
- Before every resume review or wording proposal, re-open and compare both current resume files. Do not rely on conversation memory or a compacted context.
- Re-read the resume-specific sources and integrated rules in `docs/mentor-feedback-rubric.md` before every review. Keep portfolio-only guidance out unless the rubric explicitly connects it to resume rules.
- In this chat, do not edit either resume file. Propose changes for the user to apply in the format `수정 전 → 수정 후 → 변경 이유`.
- Label every proposal with its target: `상세버전`, `함축버전`, or `공통`. Never assume a change applies to both.
- After the detailed and compact resume reviews are complete, provide a separate `중간 버전` proposal that preserves the strongest evidence from the detailed version at a density between the two source resumes. Do not treat it as a replacement unless the user explicitly adopts it.
- If either current resume file is unavailable or its version is ambiguous, stop and request the missing file before reviewing or proposing a change.

## Backup Rule

- Backups and temporary patches are safety nets, not the source of truth.
- The canonical workspace must receive the latest accepted edits before verification, commit, push, or deploy.
- If a backup patch is created, mention its path in the final response and keep the canonical workspace updated with the accepted changes.

## 보호할 로컬 근거 자료

- 사용자가 보존을 지정한 다음 파일은 현재 위치에 그대로 둡니다.
  - `/Users/minsujeong/Desktop/재적3/Portfolio/스탁키퍼_면접준비.md`
  - `/Users/minsujeong/Desktop/재적3/Portfolio/output/wiki/FIX_Kafka_주문_결제_이벤트_흐름.md`
- 두 파일은 Git ignore 대상입니다. 사용자가 새로 명시적으로 지시하고 정확한 경로를 다시 확인하기 전에는 삭제·이동하거나 `git clean -x`, `git clean -X` 대상에 포함하지 않습니다.
