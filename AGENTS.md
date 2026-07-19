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
- If multiple worktrees exist, stop and reconcile them before editing, committing, pushing, or deploying.

## Current UI Baseline

The current sidebar baseline is:

`Profile → Strengths → Projects → P1 FeedShop → P2 3M → Work Style → Direction → Experience → Resources → Contact`

Do not replace these labels with older wording such as `Hero`, `About`, `How I Work`, or `Closing`.

## Mentor Feedback Review Loop

- Treat `docs/mentor-feedback-rubric.md` as the single source of truth for portfolio and resume feedback.
- Before changing any portfolio page, re-read the relevant passages from both original mentor PDFs, then re-read the active source IDs and integrated rules for that page. Record `해당 없음` when one source has no direct guidance.
- Work one page at a time in this order: review, discuss and confirm with the user, edit, verify web/PDF consistency, then update the page review log.
- After each page edit, record and show a concise `작업 전 → 작업 후 → 변경 이유` comparison before moving to the next page.
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
