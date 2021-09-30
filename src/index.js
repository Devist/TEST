// ** React Imports
import { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'

// ** Redux Imports
import { Provider } from 'react-redux'
import { store } from './ui/redux/storeConfig/store'

// ** Toast & ThemeColors Context
import { ToastContainer } from 'react-toastify'
import { ThemeContext } from './ui/utility/context/ThemeColors'

// ** Spinner (Splash Screen)
import Spinner from './ui/@core/components/spinner/Fallback-spinner'

// ** Ripple Button
import './ui/@core/components/ripple-button'

// ** PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx.min'

// ** React Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** React toastify
import '@styles/react/libs/toastify/toastify.scss'

// ** Core styles
import './ui/@core/assets/fonts/feather/iconfont.css'
import './ui/@core/scss/core.scss'
import './ui/assets/scss/style.scss'

// ** Lazy load app
const LazyApp = lazy(() => import('./ui/App'))

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<Spinner />}>
      <ThemeContext>
        <LazyApp />
        <ToastContainer newestOnTop />
      </ThemeContext>
    </Suspense>
  </Provider>,
  document.getElementById('root')
)
