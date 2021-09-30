/* eslint-disable @typescript-eslint/no-unused-vars */
const SassRuleRewire = require('react-app-rewire-sass-rule')
const path = require('path')
const rewireAliases = require('react-app-rewire-aliases')

module.exports = function override(config, env) {
  require('react-app-rewire-postcss')(config, {
    // eslint-disable-next-line global-require
    plugins: (loader) => [require('postcss-rtl')()]
  })

  // eslint-disable-next-line no-param-reassign
  config = rewireAliases.aliasesOptions({
    '@src': path.resolve(__dirname, 'src'), // 사용
    '@ui': path.resolve(__dirname, 'src/ui'),
    '@assets': path.resolve(__dirname, 'src/ui/@core/assets'),
    '@core-components': path.resolve(__dirname, 'src/ui/@core/components'), // 사용
    '@layouts': path.resolve(__dirname, 'src/ui/@core/layouts'),
    '@store': path.resolve(__dirname, 'src/ui/redux'),
    '@styles': path.resolve(__dirname, 'src/ui/@core/scss'),
    '@configs': path.resolve(__dirname, 'src/ui/configs'),
    '@utils': path.resolve(__dirname, 'src/ui/utility/Utils'),
    '@hooks': path.resolve(__dirname, 'src/ui/utility/hooks')
  })(config, env)

  config = new SassRuleRewire()
    .withRuleOptions({
      test: /\.s[ac]ss$/i,
      use: [
        {
          loader: 'sass-loader',
          options: {
            sassOptions: {
              includePaths: ['node_modules', 'src/ui/assets']
            }
          }
        }
      ]
    })
    .rewire(config, env)
  return config
}
