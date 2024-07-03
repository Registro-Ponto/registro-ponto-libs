let prefixCounter = 0;

export default {
    plugins: [
        {
          name: 'preset-default',
          params: {
            overrides: {
              // viewBox is required to resize SVGs with CSS.
              // @see https://github.com/svg/svgo/issues/1128
              removeViewBox: false,
            },
          },
        },
        {
          name: 'prefixIds',
          params: {
            delim: '',
            prefix: () => prefixCounter++,
          }
        }
      ],
}
