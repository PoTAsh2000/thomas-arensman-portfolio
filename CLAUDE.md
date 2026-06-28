# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Single-page portfolio website to present the developer's background, interests, studies, and professional experience. Low-profile design focused on personal context rather than project showcases. Emphasizes simplicity with original design.

## Technology Stack

- **Vue 3** (Composition API via `<script setup>`)
- **TypeScript** for type safety
- **Vite** for build tooling and development server
- **Vue Router** (configured but currently empty routes)
- **Tailwind CSS** for styling

## Development Workflow

### Common Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start local development server (Vite) |
| `npm run build` | Build for production (with type checking) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run all linters (oxlint + eslint) and fix issues |
| `npm run lint:oxlint` | Run oxlint with auto-fix |
| `npm run lint:eslint` | Run eslint with auto-fix and cache |
| `npm run format` | Format source code with Prettier |
| `npm run type-check` | Run TypeScript type checking |

### Branch & PR Policy

- **master is protected** — no direct commits, no force push
- All work happens in a feature/fix branch: `feat/`, `fix/`, `chore/`, `revert/` prefixes
- Branch naming: `feat/short-description`, `fix/short-description`, etc.
- After committing on the branch: push to remote, open a PR, let the human approve and merge
- Never merge your own PRs

### Development Workflow

1. Create a branch: `git checkout -b feat/your-description`
2. Run `npm run dev` to start the dev server
3. Make changes to Vue files in `src/`
4. Code is automatically hot-reloaded in the browser
5. Before committing, run `npm run lint` to fix linting issues
6. Run `npm run type-check` to ensure no TypeScript errors
7. Push branch and open PR: `gh pr create`

## Architecture

### File Structure

```
src/
├── App.vue           # Root component (single-page app shell)
├── main.ts           # Application entry point
├── router/
│   └── index.ts      # Vue Router configuration (empty routes)
└── components/       # Reusable Vue components (to be created)
```

### Key Patterns

- **Vue 3 Composition API**: Use `<script setup>` syntax for components
- **TypeScript**: All `.ts` and `.vue` files use TypeScript
- **Routing**: Vue Router is configured but routes are not yet defined. Add routes as needed for the single-page design
- **Path Alias**: `@` resolves to `src/` directory for cleaner imports

### Single-Page Design

Since this is a single-page portfolio:
- Consider using URL fragments (`#/about`, `#/experience`) for navigation within the page, or
- Keep everything on one scrollable page with anchor links
- Use Vue Router for state management if multiple views are needed

## Code Quality

### Linting & Formatting

- **Oxlint** (primary linter, fast Rust-based tool)
- **ESLint** (secondary linter for Vue-specific rules)
- **Prettier** (code formatter)
- All configured with Vue 3 + TypeScript support

Files use:
- ES modules (`type: "module"` in package.json)
- TypeScript strict mode
- Node 20.19.0+ or 22.12.0+

### Type Checking

TypeScript configuration is split:
- `tsconfig.app.json` — Application code
- `tsconfig.node.json` — Build tooling

Run `npm run type-check` before building to catch type errors early.

## Next Steps

- [x] Add Tailwind CSS to the build
- [x] Create basic portfolio components (HeroBanner, InfoCard)
- [ ] Add expandable content sections/panels for each card (About, Interests, Career details)
- [ ] Create a footer with social links and copyright
- [ ] Define routes or single-page anchor structure for navigation
- [ ] Add more content sections (Skills, Education Timeline, Experience Timeline, etc.)
- [ ] Iterate on original design approach with animations and visual hierarchy
- [ ] Display version number in the footer (track via `package.json` version field)
