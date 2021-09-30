import React, { useState, Fragment } from 'react'
import classnames from 'classnames'
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Row,
  Col
} from 'reactstrap'

export default {
  title: '컴포넌트 (vuexy)/🎄 molecules/Pills Component',
  component: Nav,
  parameters: {
    docs: {
      description: {
        component:
          '화면상에 영역을 구분할 때 사용합니다. 간단하게 사용할 때는 단순히 ```<hr/>``` 태그를 사용해도 됩니다.',
        subcomponents: {
          IconOnly: 'hello'
        }
      }
    }
  }
}

export const PillBasic = () => {
  const [active, setActive] = useState('1')
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen)

  const toggle = (tab) => {
    setActive(tab)
  }
  return (
    <React.Fragment>
      <Nav pills>
        <NavItem>
          <NavLink
            active={active === '1'}
            onClick={() => {
              toggle('1')
            }}>
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === '2'}
            onClick={() => {
              toggle('2')
            }}>
            Profile
          </NavLink>
        </NavItem>
        <Dropdown nav isOpen={dropdownOpen} toggle={toggleDropdown}>
          <DropdownToggle
            nav
            caret
            className={classnames({
              active: active === '3' || active === '4'
            })}>
            Dropdown
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              className="w-100"
              active={active === '3'}
              onClick={() => {
                toggle('3')
              }}>
              @fat
            </DropdownItem>
            <DropdownItem
              className="w-100"
              active={active === '4'}
              onClick={() => {
                toggle('4')
              }}>
              @mdo
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <NavItem>
          <NavLink
            active={active === '5'}
            onClick={() => {
              toggle('5')
            }}>
            About
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent className="py-50" activeTab={active}>
        <TabPane tabId="1">
          <p>
            Pastry gummi bears sweet roll candy canes topping ice cream. Candy
            canes fruitcake cookie carrot cake pastry. Lollipop caramels sesame
            snaps pie tootsie roll macaroon dessert. Muffin jujubes brownie
            dragée ice cream cheesecake icing. Danish brownie pastry cotton
            candy donut. Cheesecake donut candy canes. Jelly beans croissant
            bonbon cookie toffee. Soufflé croissant lemon drops tootsie roll
            toffee tiramisu.
          </p>
        </TabPane>
        <TabPane tabId="2">
          <p>
            Pudding candy canes sugar plum cookie chocolate cake powder
            croissant. Carrot cake tiramisu danish candy cake muffin croissant
            tart dessert. Tiramisu caramels candy canes chocolate cake sweet
            roll liquorice icing cupcake.Bear claw chocolate chocolate cake
            jelly-o pudding lemon drops sweet roll sweet candy. Chocolate sweet
            chocolate bar candy chocolate bar chupa chups gummi bears lemon
            drops.
          </p>
        </TabPane>
        <TabPane tabId="3">
          <p>
            Cake croissant lemon drops gummi bears carrot cake biscuit cupcake
            croissant. Macaroon lemon drops muffin jelly sugar plum chocolate
            cupcake danish icing. Soufflé tootsie roll lemon drops sweet roll
            cake icing cookie halvah cupcake.Chupa chups pie jelly pie tootsie
            roll dragée cookie caramels sugar plum. Jelly oat cake wafer pie
            cupcake chupa chups jelly-o gingerbread.
          </p>
        </TabPane>
        <TabPane tabId="4">
          <p>
            Chocolate croissant cupcake croissant jelly donut. Cheesecake toffee
            apple pie chocolate bar biscuit tart croissant. Lemon drops danish
            cookie. Oat cake macaroon icing tart lollipop cookie sweet bear
            claw. Toffee jelly-o pastry cake dessert chocolate bar jelly beans
            fruitcake. Dragée sweet fruitcake dragée biscuit halvah wafer
            gingerbread dessert. Gummies fruitcake brownie gummies tart pudding.
          </p>
        </TabPane>
        <TabPane tabId="5">
          <p>
            Carrot cake dragée chocolate. Lemon drops ice cream wafer gummies
            dragée. Chocolate bar liquorice cheesecake cookie chupa chups
            marshmallow oat cake biscuit. Dessert toffee fruitcake ice cream
            powder tootsie roll cake.Chocolate bonbon chocolate chocolate cake
            halvah tootsie roll marshmallow. Brownie chocolate toffee toffee
            jelly beans bonbon sesame snaps sugar plum candy canes.
          </p>
        </TabPane>
      </TabContent>
    </React.Fragment>
  )
}

export const PillsVertical = () => {
  const [active, setActive] = useState('1')

  const toggle = (tab) => {
    setActive(tab)
  }
  return (
    <Row>
      <Col md="3" sm="12">
        <Nav pills vertical>
          <NavItem>
            <NavLink
              active={active === '1'}
              onClick={() => {
                toggle('1')
              }}>
              Pill 1
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={active === '2'}
              onClick={() => {
                toggle('2')
              }}>
              Pill 2
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={active === '3'}
              onClick={() => {
                toggle('3')
              }}>
              Pill 3
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink disabled>Disabled</NavLink>
          </NavItem>
        </Nav>
      </Col>
      <Col md="9" sm="12">
        <TabContent activeTab={active}>
          <TabPane tabId="1">
            <p>
              Candy canes donut chupa chups candy canes lemon drops oat cake
              wafer. Cotton candy candy canes marzipan carrot cake. Sesame snaps
              lemon drops candy marzipan donut brownie tootsie roll. Icing
              croissant bonbon biscuit gummi bears. Bear claw donut sesame snaps
              bear claw liquorice jelly-o bear claw carrot cake. Icing croissant
              bonbon biscuit gummi bears.
            </p>
          </TabPane>
          <TabPane tabId="2">
            <p>
              Pudding candy canes sugar plum cookie chocolate cake powder
              croissant. Carrot cake tiramisu danish candy cake muffin croissant
              tart dessert. Tiramisu caramels candy canes chocolate cake sweet
              roll liquorice icing cupcake. Sesame snaps wafer marshmallow
              danish dragée candy muffin jelly beans tootsie roll. Jelly beans
              oat cake chocolate cake tiramisu sweet.
            </p>
          </TabPane>
          <TabPane tabId="3">
            <p>
              Carrot cake dragée chocolate. Lemon drops ice cream wafer gummies
              dragée. Chocolate bar liquorice cheesecake cookie chupa chups
              marshmallow oat cake biscuit. Dessert toffee fruitcake ice cream
              powder tootsie roll cake. Macaroon brownie lemon drops croissant
              marzipan sweet roll macaroon lollipop. Danish fruitcake bonbon
              bear claw gummi bears apple pie.
            </p>
          </TabPane>
        </TabContent>
      </Col>
    </Row>
  )
}

export const PillEnd = () => {
  const [active, setActive] = useState('1')

  const toggle = (tab) => {
    setActive(tab)
  }
  return (
    <React.Fragment>
      <Nav className="justify-content-end" pills>
        <NavItem>
          <NavLink
            active={active === '1'}
            onClick={() => {
              toggle('1')
            }}>
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === '2'}
            onClick={() => {
              toggle('2')
            }}>
            Profile
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink disabled>Disabled</NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === '3'}
            onClick={() => {
              toggle('3')
            }}>
            About
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent className="py-50" activeTab={active}>
        <TabPane tabId="1">
          <p>
            Pastry gummi bears sweet roll candy canes topping ice cream. Candy
            canes fruitcake cookie carrot cake pastry. Lollipop caramels sesame
            snaps pie tootsie roll macaroon dessert. Muffin jujubes brownie
            dragée ice cream cheesecake icing. Danish brownie pastry cotton
            candy donut. Cheesecake donut candy canes. Jelly beans croissant
            bonbon cookie toffee. Soufflé croissant lemon drops tootsie roll
            toffee tiramisu.
          </p>
        </TabPane>
        <TabPane tabId="2">
          <p>
            Pudding candy canes sugar plum cookie chocolate cake powder
            croissant. Carrot cake tiramisu danish candy cake muffin croissant
            tart dessert. Tiramisu caramels candy canes chocolate cake sweet
            roll liquorice icing cupcake.Bear claw chocolate chocolate cake
            jelly-o pudding lemon drops sweet roll sweet candy. Chocolate sweet
            chocolate bar candy chocolate bar chupa chups gummi bears lemon
            drops.
          </p>
        </TabPane>
        <TabPane tabId="3">
          <p>
            Carrot cake dragée chocolate. Lemon drops ice cream wafer gummies
            dragée. Chocolate bar liquorice cheesecake cookie chupa chups
            marshmallow oat cake biscuit. Dessert toffee fruitcake ice cream
            powder tootsie roll cake.Chocolate bonbon chocolate chocolate cake
            halvah tootsie roll marshmallow. Brownie chocolate toffee toffee
            jelly beans bonbon sesame snaps sugar plum candy canes.
          </p>
        </TabPane>
      </TabContent>
    </React.Fragment>
  )
}

export const PillThemes = () => {
  return (
    <React.Fragment>
      <h6>Secondary</h6>
      <Nav pills className="nav-pill-secondary my-2">
        <NavItem>
          <NavLink active>Active</NavLink>
        </NavItem>
        <NavItem>
          <NavLink>Link</NavLink>
        </NavItem>
        <NavItem>
          <NavLink disabled>Disabled</NavLink>
        </NavItem>
        <NavItem>
          <NavLink>Link</NavLink>
        </NavItem>
      </Nav>

      <h6>Success</h6>
      <Nav pills className="nav-pill-success my-2">
        <NavItem>
          <NavLink active>Active</NavLink>
        </NavItem>
        <NavItem>
          <NavLink>Link</NavLink>
        </NavItem>
        <NavItem>
          <NavLink disabled>Disabled</NavLink>
        </NavItem>
        <NavItem>
          <NavLink>Link</NavLink>
        </NavItem>
      </Nav>

      <h6>Danger</h6>

      <Nav pills className="nav-pill-danger my-2">
        <NavItem>
          <NavLink active>Active</NavLink>
        </NavItem>
        <NavItem>
          <NavLink>Link</NavLink>
        </NavItem>
        <NavItem>
          <NavLink disabled>Disabled</NavLink>
        </NavItem>
        <NavItem>
          <NavLink>Link</NavLink>
        </NavItem>
      </Nav>

      <h6>Warning</h6>

      <Nav pills className="nav-pill-warning my-2">
        <NavItem>
          <NavLink active>Active</NavLink>
        </NavItem>
        <NavItem>
          <NavLink>Link</NavLink>
        </NavItem>
        <NavItem>
          <NavLink disabled>Disabled</NavLink>
        </NavItem>
        <NavItem>
          <NavLink>Link</NavLink>
        </NavItem>
      </Nav>

      <h6>Info</h6>

      <Nav pills className="nav-pill-info my-2">
        <NavItem>
          <NavLink active>Active</NavLink>
        </NavItem>
        <NavItem>
          <NavLink>Link</NavLink>
        </NavItem>
        <NavItem>
          <NavLink disabled>Disabled</NavLink>
        </NavItem>
        <NavItem>
          <NavLink>Link</NavLink>
        </NavItem>
      </Nav>
    </React.Fragment>
  )
}
