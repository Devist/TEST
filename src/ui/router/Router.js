// ** React Imports
import { Suspense, useContext, lazy } from 'react'

// ** Utils
import { isUserLoggedIn } from '@utils'
import { useLayout } from '@hooks/useLayout'
import { useRouterTransition } from '@hooks/useRouterTransition'

// ** Custom Components
import Spinner from '@core-components/spinner/Fallback-spinner' // Uncomment if your require content fallback
import LayoutWrapper from '@ui/@core/layouts/components/layout-wrapper'

import { observer } from 'mobx-react'

// ** Router Components
import { BrowserRouter as AppRouter, Route, Switch, Redirect } from 'react-router-dom'

// ** Routes & Default Routes
import { DefaultRoute, Routes } from './routes'

// ** 레이아웃
import BlankLayout from '@ui/@core/layouts/BlankLayout'
import VerticalLayout from '@ui/layouts/VerticalLayout'
import HorizontalLayout from '@ui/layouts/HorizontalLayout'

import { useStores } from '@src/stores'

/**
 *  라우터
 */
const Router = observer(() => {
  // ** Hooks
  const [layout, setLayout] = useLayout()
  const [transition, setTransition] = useRouterTransition()

  // ** 디폴트 레이아웃
  const DefaultLayout = layout === 'horizontal' ? 'HorizontalLayout' : 'VerticalLayout'

  // ** 사용 가능한 모든 레이아웃
  const Layouts = { BlankLayout, VerticalLayout, HorizontalLayout }

  // ** Current Active Item
  const currentActiveItem = null

  // 유저 정보 및 커스텀 정보 가져오기
  const { userStore } = useStores()

  if (userStore.name.length === 0) userStore.fetch()

  // ** Return Filtered Array of Routes & Paths
  const LayoutRoutesAndPaths = (layout) => {
    const LayoutRoutes = []
    const LayoutPaths = []

    if (Routes) {
      Routes.filter((route) => {
        // ** Checks if Route layout or Default layout matches current layout
        if (
          route.layout === layout ||
          (route.layout === undefined && DefaultLayout === layout)
        ) {
          LayoutRoutes.push(route)
          LayoutPaths.push(route.path)
        }
      })
    }

    return { LayoutRoutes, LayoutPaths }
  }

  const NotAuthorized = lazy(() => import('@ui/views/errors/NotAuthorized'))

  // ** Init Error Component
  const Error = lazy(() => import('@src/ui/views/errors/Error'))

  /**
   ** Final Route Component - 로그인 및 사용자 역할을 확인한 다음 경로로 리다렉트합니다.
   */
  const FinalRoute = (props) => {
    const route = props.route
    let action, resource

    // ** Assign vars based on route meta
    if (route.meta) {
      action = route.meta.action ? route.meta.action : null
      resource = route.meta.resource ? route.meta.resource : null
    }

    if (
      (!isUserLoggedIn() && route.meta === undefined) ||
      (!isUserLoggedIn() &&
        route.meta &&
        !route.meta.authRoute &&
        !route.meta.publicRoute)
    ) {
      /**
       ** 로그인하지 않음 & route meta (이동 경로 메타)가 정의되지 않은 경우
       ** OR
       ** 로그인하지 않음 & route.meta.authRoute, !route.meta.publicRoute are undefined
       ** Then redirect user to login
       */

      return <Redirect to="/login" />
    } else if (route.meta && route.meta.authRoute && isUserLoggedIn()) {
      // ** If route has meta and authRole and user is Logged in then redirect user to home page (DefaultRoute)
      return <Redirect to="/" />
    } else if (isUserLoggedIn() && !ability.can(action || 'read', resource)) {
      // ** If user is Logged in and doesn't have ability to visit the page redirect the user to Not Authorized
      return <Redirect to="/misc/not-authorized" />
    } else {
      // ** If none of the above render component
      return <route.component {...props} />
    }
  }

  // ** Return Route to Render
  const ResolveRoutes = () => {
    return Object.keys(Layouts).map((layout, index) => {
      // ** Convert Layout parameter to Layout Component
      // ? Note: make sure to keep layout and component name equal

      const LayoutTag = Layouts[layout]

      // ** Get Routes and Paths of the Layout
      const { LayoutRoutes, LayoutPaths } = LayoutRoutesAndPaths(layout)

      // ** We have freedom to display different layout for different route
      // ** We have made LayoutTag dynamic based on layout, we can also replace it with the only layout component,
      // ** that we want to implement like VerticalLayout or HorizontalLayout
      // ** We segregated all the routes based on the layouts and Resolved all those routes inside layouts

      // ** RouterProps to pass them to Layouts
      const routerProps = {}

      return (
        <Route path={LayoutPaths} key={index}>
          <LayoutTag
            routerProps={routerProps}
            layout={layout}
            setLayout={setLayout}
            transition={transition}
            setTransition={setTransition}
            currentActiveItem={currentActiveItem}>
            <Switch>
              {LayoutRoutes.map((route) => {
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    exact={route.exact === true}
                    render={(props) => {
                      // ** Assign props to routerProps
                      Object.assign(routerProps, {
                        ...props,
                        meta: route.meta
                      })

                      return (
                        <Suspense fallback={null}>
                          {/* Layout Wrapper to add classes based on route's layout, appLayout and className */}
                          <LayoutWrapper
                            layout={DefaultLayout}
                            transition={transition}
                            setTransition={setTransition}
                            /* Conditional props */
                            /*eslint-disable */
                            {...(route.appLayout
                              ? {
                                  appLayout: route.appLayout
                                }
                              : {})}
                            {...(route.meta
                              ? {
                                  routeMeta: route.meta
                                }
                              : {})}
                            {...(route.className
                              ? {
                                  wrapperClass: route.className
                                }
                              : {})}
                            /*eslint-enable */
                          >
                            <route.component {...props} />
                            {/* <FinalRoute route={route} {...props} /> */}
                          </LayoutWrapper>
                        </Suspense>
                      )
                    }}
                  />
                )
              })}
            </Switch>
          </LayoutTag>
        </Route>
      )
    })
  }

  return (
    <AppRouter basename={process.env.REACT_APP_BASENAME}>
      {userStore.name.length === 0 ? (
        <Spinner />
      ) : (
        <Switch>
          {/* 사용자가 로그인 한 경우 사용자를 DefaultRoute 로 리디렉션하고 그렇지 않으면 로그인합니다. */}
          {/* <Route
                exact
                path='/'
                render={() => {
                  return isUserLoggedIn() ? <Redirect to={DefaultRoute} /> : <Redirect to='/login' />
                }}
              /> */}
          <Route
            exact
            path="/"
            render={() => {
              return <Redirect to={DefaultRoute} />
            }}
          />
          {/* Not Auth Route */}
          <Route
            exact
            path="/not-authorized"
            render={(props) => (
              <Layouts.BlankLayout>
                <NotAuthorized />
              </Layouts.BlankLayout>
            )}
          />
          {ResolveRoutes()}
          {/* NotFound Error page */}
          <Route path="*" component={Error} />/
        </Switch>
      )}
    </AppRouter>
  )
})

export default Router
