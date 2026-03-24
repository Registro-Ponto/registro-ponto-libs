import type { StorybookConfig } from '@storybook/nextjs'
import webpack from 'webpack'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  webpackFinal: async (config) => {
    // Remove ReactRefreshPlugin to avoid source-map errors with generated
    // components imported from outside the project root (rp-icons/, rp-illustrations/).
    // Provide $RefreshReg$/$RefreshSig$ globals so generated files that reference
    // them don't throw at runtime.
    config.plugins = config.plugins?.filter(
      (plugin) => plugin?.constructor?.name !== 'ReactRefreshPlugin'
    )
    config.plugins?.push(
      new webpack.ProvidePlugin({
        $RefreshReg$: [require.resolve('./refresh-noop'), 'RefreshReg'],
        $RefreshSig$: [require.resolve('./refresh-noop'), 'RefreshSig'],
      })
    )
    return config
  },
}
export default config
