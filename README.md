<div align="center">
  <a href="https://registroponto.com.br/" target="_blank">
    <img alt="Registro Ponto" width="315" height="117" style="max-width: 100%" src="https://github.com/Registro-Ponto/rp-icons/assets/98567681/05358956-78db-4f61-905a-c60ff276dc8f">
  </a>
</div>

<p align="center">
  <a href="https://registroponto.com.br/" target="_blank">Registro Ponto</a> Libraries offer high-quality icons and illustrations with a modern and sophisticated design, perfect for time management systems and HR applications.
<p>

<div align="center">

  [![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](https://github.com/Registro-Ponto/registro-ponto-libs/blob/main/README.pt-br.md)

</div>

## Icons

First, install `@registroponto/icons` from npm:

```sh
npm install @registroponto/icons
```

Now we can import each icon as a component:

```js
import { Adjustments } from '@registroponto/icons'

function Example() {
  return (
    <div>
      <Adjustments width={32} height={32} />
      <p>...</p>
    </div>
  )
}
```

## Illustrations

First, install `@registroponto/illustrations` from npm:

```sh
npm install @registroponto/illustrations
```

Now we can import each illustration as a component:

```js
import { AlertError } from '@registroponto/illustrations'

function Example() {
  return (
    <div>
      <AlertError width={192} height={192} />
      <p>...</p>
    </div>
  )
}
```

## Build

To build the icons and illustrations, you can use the provided npm scripts:

### Icons

To build the icons, run:

```sh
npm run build-icons
```

This command will:

1. Remove the existing `rp-icons/icons` and `optimized/icons` directories.
2. Optimize SVG files in `./src/icons` and output them to `./optimized/icons`.
3. Generate icon components.

### Illustrations

To build the illustrations, run:

```sh
npm run build-illustrations
```

This command will:

1. Remove the existing `rp-illustrations/illustrations` and `optimized/illustrations` directories.
2. Optimize SVG files in `./src/illustrations` and output them to `./optimized/illustrations`.
3. Generate illustration components.

## License

This library is MIT licensed.