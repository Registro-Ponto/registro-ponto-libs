<div align="center">
  <a href="https://registroponto.com.br/" target="_blank">
    <img alt="Registro Ponto" width="315" height="117" style="max-width: 100%" src="https://github.com/Registro-Ponto/rp-icons/assets/98567681/05358956-78db-4f61-905a-c60ff276dc8f">
  </a>
</div>

<p align="center">
  <a href="https://registroponto.com.br/" target="_blank">Registro Ponto</a> Libraries offer high-quality icons and illustrations with a modern and sophisticated design, perfect for time management systems and HR applications.
<p>

<div align="center">

  [![Storybook](https://img.shields.io/badge/Storybook-FF4785?logo=storybook&logoColor=white)](https://registro-ponto.github.io/registro-ponto-libs/)
  [![Icons npm](https://img.shields.io/npm/v/@registroponto/icons?label=%40registroponto%2Ficons)](https://www.npmjs.com/package/@registroponto/icons)
  [![Illustrations npm](https://img.shields.io/npm/v/@registroponto/illustrations?label=%40registroponto%2Fillustrations)](https://www.npmjs.com/package/@registroponto/illustrations)
  [![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](https://github.com/Registro-Ponto/registro-ponto-libs/blob/main/README.pt-br.md)

</div>

## Icons

```sh
npm install @registroponto/icons
```

```jsx
import { Adjustments } from '@registroponto/icons'

function Example() {
  return <Adjustments width={32} height={32} />
}
```

Icons of type **current-color** inherit the text color via CSS — just apply `color` or a utility class like `className="text-blue-800"`. Icons of type **fixed-color** keep their original colors (e.g., Google logo).

## Illustrations

```sh
npm install @registroponto/illustrations
```

```jsx
import { AlertError } from '@registroponto/illustrations'

function Example() {
  return <AlertError width={192} height={192} />
}
```

Browse all available icons and illustrations in the [Storybook](https://registro-ponto.github.io/registro-ponto-libs/).

## Adding a New Icon

1. Export the SVG from your design tool.
2. Choose the right folder:
   - **`src/icons/current-color/`** — monochrome icons that inherit text color (build strips `fill` and applies `fill="currentColor"`).
   - **`src/icons/fixed-color/`** — icons that keep their original colors.
3. Name the file in `kebab-case` (e.g., `arrow-left.svg`). The filename becomes the component name in PascalCase (`ArrowLeft`).
4. Build and verify:

```sh
npm run build-icons
npm run storybook
```

5. Update the version in `rp-icons/package.json` and document in `rp-icons/CHANGELOG.md`.

## Adding a New Illustration

1. Export the SVG from your design tool.
2. Place the file in **`src/illustrations/`** using `kebab-case` (e.g., `boy-with-calendar.svg`). The build preserves colors/viewBox and prefixes internal IDs to avoid collisions.
3. Build and verify:

```sh
npm run build-illustrations
npm run storybook
```

4. Update the version in `rp-illustrations/package.json` and document in `rp-illustrations/CHANGELOG.md`.

> **Deprecating:** add the SVG filename (e.g., `old-icon.svg`) to the array in `scripts/deprecated.js`. The component will receive a `@deprecated` JSDoc annotation.

## Build

```sh
npm run build-icons          # optimize SVGs + generate React components for icons
npm run build-illustrations  # optimize SVGs + generate React components for illustrations
```

Each build command: (1) cleans `optimized/` and output dirs, (2) runs SVGO optimization, (3) generates CJS + ESM components with TypeScript declarations.

```sh
npm run install-storybook    # first time only (uses pnpm)
npm run storybook            # dev server on port 6006
npm run build-storybook      # static build (builds icons + illustrations first)
```

## Deploy

### Storybook (GitHub Pages)

Every push to `main` automatically builds and publishes the Storybook to [GitHub Pages](https://registro-ponto.github.io/registro-ponto-libs/).

### npm Packages

1. Update the version in `rp-icons/package.json` or `rp-illustrations/package.json`.
2. Update the corresponding `CHANGELOG.md`.
3. Create and push a git tag: `icons-v<version>` or `illustrations-v<version>`.
4. The **Prepare Release** workflow creates a **draft** GitHub release with notes from the CHANGELOG.
5. **Publish** the draft on GitHub — the **Release** workflow builds and publishes to npm.

Pre-release channels (e.g., `alpha`, `insiders`) are detected automatically from the version (e.g., `1.0.0-alpha.1` → npm tag `alpha`).

## License

This library is MIT licensed.
