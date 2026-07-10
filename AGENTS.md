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

`Profile → Strengths → Work Style → Projects → P1 FeedShop → P2 3M → Direction → Experience → Resources → Contact`

Do not replace these labels with older wording such as `Hero`, `About`, `How I Work`, or `Closing`.

## Mentor Feedback Review Loop

- Treat `docs/mentor-feedback-rubric.md` as the single source of truth for portfolio and resume feedback.
- Before changing any portfolio page, re-read the active source IDs and integrated rules for that page.
- Work one page at a time in this order: review, discuss and confirm with the user, edit, verify web/PDF consistency, then update the page review log.
- Keep source-specific advice separate. Resolve overlaps and conflicts only through the rubric's conflict decisions.
- Portfolio rules are active now. Resume rules stay pending until the user provides the new resume after the portfolio is complete.

## Backup Rule

- Backups and temporary patches are safety nets, not the source of truth.
- The canonical workspace must receive the latest accepted edits before verification, commit, push, or deploy.
- If a backup patch is created, mention its path in the final response and keep the canonical workspace updated with the accepted changes.
