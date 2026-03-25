import type { Preview } from '@storybook/react'

import "../src/globals.css"

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ['Introdução', 'Contribuindo', 'Components'],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
