# Portfolio delivery model

## Public portfolio

- GitHub Pages serves the default portfolio at `/`.
- `?preset=project-focused` selects a predefined public composition.
- `?blocks=hero,about,projects,resources,contact,footer` selects page-level sections.
- `?projects=feedshop,three-m` selects and orders project blocks.
- `?copy=backend-impact` selects a prepared copy profile.
- `?company=ably` gives the composition a company-specific public identifier. The full block configuration remains in the same URL so it works in another browser without local storage.
- Query parameters only control presentation. They are not access control and must never reveal private material.

## Local manager

- Run the project locally and open `/manage`.
- `src/pages/manage/` is intentionally git-ignored. Keep it on the local disk only.
- Select, hide, or reorder page blocks and individual projects, choose a copy profile, and copy the generated public URL.
- Save the current composition under a company-specific name and ASCII link key such as `ably`; custom presets stay in local browser storage while the generated URL is independently shareable.
- The manager is enabled only during local development on `localhost`, `127.0.0.1`, or `::1`.
- Production builds omit the `/manage` route and fail the build if local manager source is bundled by mistake.

For a separately deployed manager, create a separate private app or protect it behind platform authentication such as an access proxy or protected hosting environment. Do not publish it from this public repository.

## Company presets

- Presets contain only public block identifiers.
- A preset stores page blocks, ordered project IDs, and one copy profile.
- Add company-oriented presets to `src/portfolio-builder/presets.ts` after reviewing that every included section is suitable for public sharing.
- Add a project data file, its overview entry, and register it in `src/content/projects/index.ts`; it then appears automatically in the manager.
- A preset URL is convenient targeting, not secrecy.

## Private evidence

- Never add private evidence, credentials, access tokens, or signed URLs to `src/content`, `public`, or `VITE_*` environment variables.
- Implement `PrivateContentProvider` from `src/portfolio-builder/private-content.ts` when an authenticated API is available.
- The server should authenticate the user, authorize each evidence request, and return short-lived data after login.
- Prefer an HttpOnly secure session cookie. The public GitHub Pages build must remain useful without the private API.
