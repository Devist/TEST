// ** Dropdowns Imports
import { Fragment } from 'react'

import UserDropdown from './UserDropdown'

// ** Third Party Components
import { Moon, Menu, Sun, Anchor } from 'react-feather'
import { Button, NavItem, NavLink } from 'reactstrap'

import { observer } from 'mobx-react'
import { useStores } from '@src/stores'

const NavbarUser = observer((props) => {
  const { appStore } = useStores()
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === 'dark') {
      return <Sun className="ficon" onClick={() => setSkin('light')} />
    } else {
      return <Moon className="ficon" onClick={() => setSkin('dark')} />
    }
  }

  return (
    <Fragment>
      <ul className="navbar-nav d-xl-none d-flex align-items-center">
        <NavItem className="mobile-menu mr-auto">
          <NavLink
            className="nav-menu-main menu-toggle hidden-xs is-active"
            onClick={() => setMenuVisibility(true)}>
            <Menu className="ficon" />
          </NavLink>
        </NavItem>
      </ul>
      <div className="bookmark-wrapper d-flex align-items-center">
        <NavItem className="d-none d-lg-block">
          <NavLink className="nav-link-style">
            <Button
              className="btn-icon mr-1"
              color="primary"
              size="sm"
              outline
              onClick={() => appStore.setOpenTour(true)}>
              <Anchor size={16} />
              <span className="align-middle ml-25">가이드</span>
            </Button>
            <ThemeToggler />
          </NavLink>
        </NavItem>
      </div>
      <ul className="nav navbar-nav align-items-center ml-auto">
        <UserDropdown />
      </ul>
    </Fragment>
  )
})
export default NavbarUser
