export default {
  plugins: [
    'preset-default',
    'removeDimensions',
    'sortAttrs',
    'cleanupListOfValues',
    {
      name: 'addAttributesToSVGElement',
      params: {
        attributes: [
          {
            'aria-hidden': 'true',
            'data-slot': 'icon',
          },
        ],
      },
    },
  ],
}
