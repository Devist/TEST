const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    // '@storybook/preset-create-react-app',
    'storybook-dark-mode'
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader'
        }
      ],
      include: path.resolve(__dirname, '../')
    })

    config.resolve.alias = {
      ...config.resolve.alias,
      '@src': path.resolve(__dirname, '../src'),
      '@ui': path.resolve(__dirname, '../src/ui'),
      '@assets': path.resolve(__dirname, '../src/ui/@core/assets'),
      '@core-components': path.resolve(__dirname, '../src/ui/@core/components'),
      '@layouts': path.resolve(__dirname, '../src/ui/@core/layouts'),
      '@store': path.resolve(__dirname, '../src/ui/redux'),
      '@styles': path.resolve(__dirname, '../src/ui/@core/scss'),
      '@configs': path.resolve(__dirname, '../src/ui/configs'),
      '@utils': path.resolve(__dirname, '../src/ui/utility/Utils'),
      '@hooks': path.resolve(__dirname, '../src/ui/utility/hooks')
    }

    return config
  }
}
