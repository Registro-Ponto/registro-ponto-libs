# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Monorepo for Registro Ponto's shared asset libraries: `@registroponto/icons` and `@registroponto/illustrations`. These are React component libraries generated from SVG source files using SVGO optimization and @svgr/core transformation.

## Build Commands

```sh
# Install dependencies (root uses npm, storybook uses pnpm)
npm install
pnpm install --prefix apps/next-storybook  # or: npm run install-storybook

# Build icon React components from SVGs
npm run build-icons

# Build illustration React components from SVGs
npm run build-illustrations

# Run Storybook locally (port 6006)
npm run storybook

# Build Storybook (builds both icons and illustrations first)
npm run build-storybook
```

There are no tests or linting configured at the root level. The Storybook app has `next lint` available via `cd apps/next-storybook && pnpm lint`.

## Architecture

### Build Pipeline

1. **Source SVGs** live in `src/icons/current-color/`, `src/icons/fixed-color/`, and `src/illustrations/`
2. **SVGO optimization** produces cleaned SVGs in `optimized/` using three config files:
   - `svgo.current-color-icons.mjs` — strips `fill` attributes, adds `fill="currentColor"` (icons inherit text color)
   - `svgo.fixed-color-icons.mjs` — preserves original fills, adds `aria-hidden` and `data-slot`
   - `svgo.illustrations.mjs` — preserves viewBox, prefixes IDs per file to avoid collisions
3. **`scripts/build.js`** converts optimized SVGs into React components (both CJS and ESM) via @svgr/core + Babel, generating `.js` and `.d.ts` files into `rp-icons/icons/` and `rp-illustrations/illustrations/`

### Package Structure

- `rp-icons/` — published as `@registroponto/icons`, dual CJS/ESM exports, peer dep on React ≥16
- `rp-illustrations/` — published as `@registroponto/illustrations`, same structure
- `apps/next-storybook/` — Next.js + Storybook 8 app for previewing components

### Key Conventions

- SVG filenames become PascalCase component names (e.g., `alert-triangle.svg` → `AlertTriangle`)
- Deprecated icons are listed in `scripts/deprecated.js` by SVG filename; they get `@deprecated` JSDoc annotations
- Current-color icons use `fill="currentColor"` so color is controlled via CSS; fixed-color icons retain their original fills
- Generated files go into `rp-{package}/{package}/` (CJS) and `rp-{package}/{package}/esm/` (ESM) — these are gitignored build outputs

### Release Process

Releases are triggered by GitHub releases with tag format `icons-v*.*.*` or `illustrations-v*.*.*`. The `release.yaml` workflow determines which package to build and publishes to npm. Pre-release channels (alpha, insiders) are auto-detected from the version string via `scripts/release-channel.js`. Prepare-release workflows exist per package to automate version bumps and changelog generation.
