<div align="center">
  <a href="https://registroponto.com.br/" target="_blank">
    <img alt="Registro Ponto" width="315" height="117" style="max-width: 100%" src="https://github.com/Registro-Ponto/rp-icons/assets/98567681/05358956-78db-4f61-905a-c60ff276dc8f">
  </a>
</div>

<p align="center">
    As Bibliotecas <a href="https://registroponto.com.br/" target="_blank">Registro Ponto</a> oferecem ícones e ilustrações de alta qualidade com design moderno e sofisticado, ideais para sistemas de gestão de ponto e aplicações de recursos humanos.
<p>

<div align="center">

  [![Storybook](https://img.shields.io/badge/Storybook-FF4785?logo=storybook&logoColor=white)](https://registro-ponto.github.io/registro-ponto-libs/)
  [![Icons npm](https://img.shields.io/npm/v/@registroponto/icons?label=%40registroponto%2Ficons)](https://www.npmjs.com/package/@registroponto/icons)
  [![Illustrations npm](https://img.shields.io/npm/v/@registroponto/illustrations?label=%40registroponto%2Fillustrations)](https://www.npmjs.com/package/@registroponto/illustrations)
  [![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/Registro-Ponto/registro-ponto-libs/blob/main/README.md)

</div>

## Ícones

```sh
npm install @registroponto/icons
```

```jsx
import { Adjustments } from '@registroponto/icons'

function Exemplo() {
  return <Adjustments width={32} height={32} />
}
```

Ícones do tipo **current-color** herdam a cor do texto via CSS — basta aplicar `color` ou uma classe utilitária como `className="text-blue-800"`. Ícones do tipo **fixed-color** mantêm suas cores originais (ex: logo do Google).

## Ilustrações

```sh
npm install @registroponto/illustrations
```

```jsx
import { AlertError } from '@registroponto/illustrations'

function Exemplo() {
  return <AlertError width={192} height={192} />
}
```

Navegue por todos os ícones e ilustrações disponíveis no [Storybook](https://registro-ponto.github.io/registro-ponto-libs/).

## Adicionando um Novo Ícone

1. Exporte o SVG da sua ferramenta de design.
2. Escolha a pasta correta:
   - **`src/icons/current-color/`** — ícones monocromáticos que herdam a cor do texto (o build remove `fill` e aplica `fill="currentColor"`).
   - **`src/icons/fixed-color/`** — ícones que devem manter suas cores originais.
3. Nomeie o arquivo em `kebab-case` (ex: `arrow-left.svg`). O nome vira o componente em PascalCase (`ArrowLeft`).
4. Faça o build e confira:

```sh
npm run build-icons
npm run storybook
```

5. Atualize a versão em `rp-icons/package.json` e documente em `rp-icons/CHANGELOG.md`.

## Adicionando uma Nova Ilustração

1. Exporte o SVG da sua ferramenta de design.
2. Coloque o arquivo em **`src/illustrations/`** usando `kebab-case` (ex: `boy-with-calendar.svg`). O build preserva cores/viewBox e prefixa IDs internos para evitar colisões.
3. Faça o build e confira:

```sh
npm run build-illustrations
npm run storybook
```

4. Atualize a versão em `rp-illustrations/package.json` e documente em `rp-illustrations/CHANGELOG.md`.

> **Depreciando:** adicione o nome do arquivo SVG (ex: `old-icon.svg`) ao array em `scripts/deprecated.js`. O componente receberá a anotação `@deprecated` no JSDoc.

## Build

```sh
npm run build-icons          # otimiza SVGs + gera componentes React para ícones
npm run build-illustrations  # otimiza SVGs + gera componentes React para ilustrações
```

Cada comando de build: (1) limpa `optimized/` e diretórios de saída, (2) roda otimização SVGO, (3) gera componentes CJS + ESM com declarações TypeScript.

```sh
npm run install-storybook    # apenas na primeira vez (usa pnpm)
npm run storybook            # servidor dev na porta 6006
npm run build-storybook      # build estático (builda ícones + ilustrações primeiro)
```

## Deploy

### Storybook (GitHub Pages)

Todo push na `main` builda e publica automaticamente o Storybook no [GitHub Pages](https://registro-ponto.github.io/registro-ponto-libs/).

### Pacotes npm

1. Atualize a versão em `rp-icons/package.json` ou `rp-illustrations/package.json`.
2. Atualize o `CHANGELOG.md` correspondente.
3. Crie e faça push de uma tag git: `icons-v<versão>` ou `illustrations-v<versão>`.
4. O workflow **Prepare Release** cria um **rascunho** de release no GitHub com notas do CHANGELOG.
5. **Publique** o rascunho no GitHub — o workflow **Release** builda e publica no npm.

Canais de pré-release (ex: `alpha`, `insiders`) são detectados automaticamente pela versão (ex: `1.0.0-alpha.1` → tag `alpha` no npm).

## Licença

Esta biblioteca está licenciada sob a licença MIT.
