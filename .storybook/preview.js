// import { CodeBlock } from './CodeBlock'

import './reset.css'

// // ** Spinner (Splash Screen)
// import Spinner from './ui/@core/components/spinner/Fallback-spinner'

// // ** Ripple Button
import '../src/ui/@core/components/ripple-button'

// // ** PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx.min'

// // ** React Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css'

// // ** React toastify
import '../src/ui/@core/scss/react/libs/toastify/toastify.scss'

// ** Core styles
import '../src/ui/@core/assets/fonts/feather/iconfont.css'
import '../src/ui/@core/scss/core.scss'
import '../src/ui/assets/scss/style.scss'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
  // docs: {
  //   theme: themes.dark
  // }
}
