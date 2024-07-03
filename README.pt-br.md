<div align="center">
  <a href="https://registroponto.com.br/" target="_blank">
    <img alt="Registro Ponto" width="315" height="117" style="max-width: 100%" src="https://github.com/Registro-Ponto/rp-icons/assets/98567681/05358956-78db-4f61-905a-c60ff276dc8f">
  </a>
</div>

## Ícones

Primeiramente, instale `@registroponto/icons` via npm:

```sh
npm install @registroponto/icons
```

Agora podemos importar cada ícone como um componente:

```js
import { Adjustments } from '@registroponto/icons'

function Exemplo() {
  return (
    <div>
      <Adjustments width={32} height={32} />
      <p>...</p>
    </div>
  )
}
```

## Ilustrações

Primeiramente, instale `@registroponto/illustrations` via npm:

```sh
npm install @registroponto/illustrations
```

Agora podemos importar cada ilustração como um componente:

```js
import { AlertError } from '@registroponto/illustrations'

function Exemplo() {
  return (
    <div>
      <AlertError width={192} height={192} />
      <p>...</p>
    </div>
  )
}
```

## Build

Para construir os ícones e ilustrações, você pode usar os scripts npm fornecidos:

### Ícones

Para construir os ícones, execute:

```sh
npm run build-icons
```

Este comando irá:

1. Remover os diretórios `rp-icons/icons` e `optimized/icons` existentes.
2. Otimizar arquivos SVG em `./src/icons` e exportá-los para `./optimized/icons`.
3. Gerar componentes de ícone.

### Ilustrações

Para construir as ilustrações, execute:

```sh
npm run build-illustrations
```

Este comando irá:

1. Remover os diretórios `rp-illustrations/illustrations` e `optimized/illustrations` existentes.
2. Otimizar arquivos SVG em `./src/illustrations` e exportá-los para `./optimized/illustrations`.
3. Gerar componentes de ilustração.

## Licença

Esta biblioteca está licenciada sob a licença MIT.