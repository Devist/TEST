import React, { useState, Fragment } from 'react'

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  ButtonDropdown,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Row,
  Col
} from 'reactstrap'

import {
  Wifi,
  WifiOff,
  PhoneOff,
  BellOff,
  Bell,
  VolumeX,
  Volume2
} from 'react-feather'

export default {
  title: '컴포넌트 (vuexy)/🎄 molecules/Dropdown',
  component: ButtonDropdown,
  parameters: {
    docs: {
      description: {
        component:
          '세그먼트 요약 정보에 사용됩니다' +
          "<br/> ```import { CardText } from 'reactstrap'```" +
          "<br/> ```import AppCollapse from '@core-components/app-collapse'```",
        subcomponents: {
          IconOnly: 'hello'
        }
      }
    }
  }
}

export const DropdownUncontrolled = () => {
  return (
    <UncontrolledButtonDropdown>
      <DropdownToggle color="primary" caret>
        Uncontrolled
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem href="/" tag="a">
          Option 1
        </DropdownItem>
        <DropdownItem href="/" tag="a" disabled>
          Option 2
        </DropdownItem>
        <DropdownItem href="/" tag="a">
          Option 3
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledButtonDropdown>
  )
}

export const DropdownBasic = () => {
  return (
    <div className="demo-inline-spacing">
      <UncontrolledButtonDropdown>
        <DropdownToggle color="primary" caret>
          Primary
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem href="/" tag="a">
            Option 1
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 2
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 3
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
      <UncontrolledButtonDropdown>
        <DropdownToggle color="secondary" caret>
          Secondary
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem href="/" tag="a">
            Option 1
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 2
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 3
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
      <UncontrolledButtonDropdown>
        <DropdownToggle color="success" caret>
          Success
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem href="/" tag="a">
            Option 1
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 2
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 3
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
      <UncontrolledButtonDropdown>
        <DropdownToggle color="warning" caret>
          Warning
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem href="/" tag="a">
            Option 1
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 2
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 3
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
      <UncontrolledButtonDropdown>
        <DropdownToggle color="danger" caret>
          Danger
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem href="/" tag="a">
            Option 1
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 2
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 3
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
      <UncontrolledButtonDropdown>
        <DropdownToggle color="info" caret>
          Info
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem href="/" tag="a">
            Option 1
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 2
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 3
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
      <UncontrolledButtonDropdown>
        <DropdownToggle color="dark" caret>
          Dark
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem href="/" tag="a">
            Option 1
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 2
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 3
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
    </div>
  )
}

export const DropdownSplit = () => {
  return (
    <div className="demo-inline-spacing">
      <UncontrolledButtonDropdown>
        <Button color="primary">Primary</Button>
        <DropdownToggle
          className="dropdown-toggle-split"
          color="primary"
          caret></DropdownToggle>
        <DropdownMenu>
          <DropdownItem href="/" tag="a">
            Option 1
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 2
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 3
          </DropdownItem>
          <DropdownItem divider></DropdownItem>
          <DropdownItem href="/" tag="a">
            Separated Link
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
      <UncontrolledButtonDropdown>
        <Button color="secondary">Secondary</Button>
        <DropdownToggle
          className="dropdown-toggle-split"
          color="secondary"
          caret></DropdownToggle>
        <DropdownMenu>
          <DropdownItem href="/" tag="a">
            Option 1
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 2
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 3
          </DropdownItem>
          <DropdownItem divider></DropdownItem>
          <DropdownItem href="/" tag="a">
            Separated Link
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
      <UncontrolledButtonDropdown>
        <Button color="success">Success</Button>
        <DropdownToggle
          className="dropdown-toggle-split"
          color="success"
          caret></DropdownToggle>
        <DropdownMenu>
          <DropdownItem href="/" tag="a">
            Option 1
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 2
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 3
          </DropdownItem>
          <DropdownItem divider></DropdownItem>
          <DropdownItem href="/" tag="a">
            Separated Link
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
      <UncontrolledButtonDropdown>
        <Button color="warning">Warning</Button>
        <DropdownToggle
          className="dropdown-toggle-split"
          color="warning"
          caret></DropdownToggle>
        <DropdownMenu>
          <DropdownItem href="/" tag="a">
            Option 1
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 2
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 3
          </DropdownItem>
          <DropdownItem divider></DropdownItem>
          <DropdownItem href="/" tag="a">
            Separated Link
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
      <UncontrolledButtonDropdown>
        <Button color="danger">Danger</Button>
        <DropdownToggle
          className="dropdown-toggle-split"
          color="danger"
          caret></DropdownToggle>
        <DropdownMenu>
          <DropdownItem href="/" tag="a">
            Option 1
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 2
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 3
          </DropdownItem>
          <DropdownItem divider></DropdownItem>
          <DropdownItem href="/" tag="a">
            Separated Link
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
      <UncontrolledButtonDropdown>
        <Button color="info">Info</Button>
        <DropdownToggle
          className="dropdown-toggle-split"
          color="info"
          caret></DropdownToggle>
        <DropdownMenu>
          <DropdownItem href="/" tag="a">
            Option 1
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 2
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 3
          </DropdownItem>
          <DropdownItem divider></DropdownItem>
          <DropdownItem href="/" tag="a">
            Separated Link
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
      <UncontrolledButtonDropdown>
        <Button color="dark">Dark</Button>
        <DropdownToggle
          className="dropdown-toggle-split"
          color="dark"
          caret></DropdownToggle>
        <DropdownMenu>
          <DropdownItem href="/" tag="a">
            Option 1
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 2
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 3
          </DropdownItem>
          <DropdownItem divider></DropdownItem>
          <DropdownItem href="/" tag="a">
            Separated Link
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
    </div>
  )
}

export const DropdownOutline = () => {
  return (
    <div className="demo-inline-spacing">
      <UncontrolledButtonDropdown>
        <DropdownToggle outline color="primary" caret>
          Primary
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem href="/" tag="a">
            Option 1
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 2
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 3
          </DropdownItem>
          <DropdownItem divider></DropdownItem>
          <DropdownItem href="/" tag="a">
            Separated Link
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
      <UncontrolledButtonDropdown>
        <Button outline color="secondary">
          Secondary
        </Button>
        <DropdownToggle
          outline
          className="dropdown-toggle-split"
          color="secondary"
          caret></DropdownToggle>
        <DropdownMenu>
          <DropdownItem href="/" tag="a">
            Option 1
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 2
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 3
          </DropdownItem>
          <DropdownItem divider></DropdownItem>
          <DropdownItem href="/" tag="a">
            Separated Link
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
      <UncontrolledButtonDropdown>
        <DropdownToggle outline color="success" caret>
          Success
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem href="/" tag="a">
            Option 1
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 2
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 3
          </DropdownItem>
          <DropdownItem divider></DropdownItem>
          <DropdownItem href="/" tag="a">
            Separated Link
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
      <UncontrolledButtonDropdown>
        <Button outline color="warning">
          Warning
        </Button>
        <DropdownToggle
          outline
          className="dropdown-toggle-split"
          color="warning"
          caret></DropdownToggle>
        <DropdownMenu>
          <DropdownItem href="/" tag="a">
            Option 1
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 2
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 3
          </DropdownItem>
          <DropdownItem divider></DropdownItem>
          <DropdownItem href="/" tag="a">
            Separated Link
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
      <UncontrolledButtonDropdown>
        <DropdownToggle outline color="danger" caret>
          Danger
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem href="/" tag="a">
            Option 1
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 2
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 3
          </DropdownItem>
          <DropdownItem divider></DropdownItem>
          <DropdownItem href="/" tag="a">
            Separated Link
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
      <UncontrolledButtonDropdown>
        <DropdownToggle outline color="info" caret>
          Info
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem href="/" tag="a">
            Option 1
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 2
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 3
          </DropdownItem>
          <DropdownItem divider></DropdownItem>
          <DropdownItem href="/" tag="a">
            Separated Link
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
    </div>
  )
}

export const DropdownFlat = () => {
  return (
    <div className="demo-inline-spacing">
      <UncontrolledButtonDropdown>
        <DropdownToggle color="flat-primary" caret>
          Primary
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem href="/" tag="a">
            Option 1
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 2
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 3
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
      <UncontrolledButtonDropdown>
        <DropdownToggle color="flat-secondary" caret>
          Secondary
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem href="/" tag="a">
            Option 1
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 2
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 3
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
      <UncontrolledButtonDropdown>
        <DropdownToggle color="flat-success" caret>
          Success
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem href="/" tag="a">
            Option 1
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 2
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 3
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>

      <UncontrolledButtonDropdown>
        <DropdownToggle color="flat-warning" caret>
          Warning
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem href="/" tag="a">
            Option 1
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 2
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 3
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
      <UncontrolledButtonDropdown>
        <DropdownToggle color="flat-danger" caret>
          Danger
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem href="/" tag="a">
            Option 1
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 2
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 3
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
      <UncontrolledButtonDropdown>
        <DropdownToggle color="flat-info" caret>
          Info
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem href="/" tag="a">
            Option 1
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 2
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 3
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
      <UncontrolledButtonDropdown>
        <DropdownToggle color="flat-dark" caret>
          Dark
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem href="/" tag="a">
            Option 1
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 2
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 3
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
    </div>
  )
}

export const DropdownSizes = () => {
  return (
    <React.Fragment>
      <Row>
        <Col md="6" sm="12">
          <div className="demo-inline-spacing">
            <UncontrolledButtonDropdown>
              <DropdownToggle color="primary" size="lg" caret>
                Large
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem href="/" tag="a">
                  Option 1
                </DropdownItem>
                <DropdownItem href="/" tag="a">
                  Option 2
                </DropdownItem>
                <DropdownItem href="/" tag="a">
                  Option 3
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
            <UncontrolledButtonDropdown>
              <DropdownToggle color="primary" caret>
                Default
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem href="/" tag="a">
                  Option 1
                </DropdownItem>
                <DropdownItem href="/" tag="a">
                  Option 2
                </DropdownItem>
                <DropdownItem href="/" tag="a">
                  Option 3
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
            <UncontrolledButtonDropdown>
              <DropdownToggle color="primary" size="sm" caret>
                Small
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem href="/" tag="a">
                  Option 1
                </DropdownItem>
                <DropdownItem href="/" tag="a">
                  Option 2
                </DropdownItem>
                <DropdownItem href="/" tag="a">
                  Option 3
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
          </div>
        </Col>
        <Col md="6" sm="12">
          <div className="demo-inline-spacing">
            <UncontrolledButtonDropdown>
              <Button color="primary" size="lg">
                Large
              </Button>
              <DropdownToggle
                className="dropdown-toggle-split"
                color="primary"
                caret
                size="lg"></DropdownToggle>
              <DropdownMenu>
                <DropdownItem href="/" tag="a">
                  Option 1
                </DropdownItem>
                <DropdownItem href="/" tag="a">
                  Option 2
                </DropdownItem>
                <DropdownItem href="/" tag="a">
                  Option 3
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown>{' '}
            <UncontrolledButtonDropdown>
              <Button color="primary">Default</Button>
              <DropdownToggle
                className="dropdown-toggle-split"
                color="primary"
                caret></DropdownToggle>
              <DropdownMenu>
                <DropdownItem href="/" tag="a">
                  Option 1
                </DropdownItem>
                <DropdownItem href="/" tag="a">
                  Option 2
                </DropdownItem>
                <DropdownItem href="/" tag="a">
                  Option 3
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown>{' '}
            <UncontrolledButtonDropdown>
              <Button color="primary" size="sm">
                Small
              </Button>
              <DropdownToggle
                className="dropdown-toggle-split"
                color="primary"
                caret></DropdownToggle>
              <DropdownMenu>
                <DropdownItem href="/" tag="a">
                  Option 1
                </DropdownItem>
                <DropdownItem href="/" tag="a">
                  Option 2
                </DropdownItem>
                <DropdownItem href="/" tag="a">
                  Option 3
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export const DropdownDirections = () => {
  return (
    <div className="demo-inline-spacing">
      <UncontrolledButtonDropdown>
        <DropdownToggle color="primary" caret>
          Drop bottom right
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem href="/" tag="a">
            Option 1
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 2
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 3
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
      <UncontrolledButtonDropdown direction="up">
        <DropdownToggle color="primary" caret>
          Drop Up
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem href="/" tag="a">
            Option 1
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 2
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 3
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
      <UncontrolledButtonDropdown direction="right">
        <DropdownToggle color="primary" caret>
          Drop Right
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem href="/" tag="a">
            Option 1
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 2
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 3
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
      <UncontrolledButtonDropdown direction="left">
        <DropdownToggle color="primary" caret>
          Drop Left
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem href="/" tag="a">
            Option 1
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 2
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 3
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
    </div>
  )
}

const icons = [
  {
    id: 1,
    item: <WifiOff size={15} />
  },
  {
    id: 2,
    item: <VolumeX size={15} />
  },
  {
    id: 3,
    item: <Volume2 size={15} />
  },
  {
    id: 4,
    item: <Bell size={15} />
  },
  {
    id: 5,
    item: <BellOff size={15} />
  },
  {
    id: 6,
    item: <PhoneOff size={15} />
  }
]

export const DropdownVariations = () => {
  const [activeIcon, setActiveIcon] = useState(<Wifi size={15} />)

  const toggleIcon = (icon) => {
    setActiveIcon(icon)
  }

  const renderIconItem = icons.map((icon) => {
    return (
      <DropdownItem
        tag="li"
        key={icon.id}
        onClick={() => toggleIcon(icon.item)}>
        {icon.item}
      </DropdownItem>
    )
  })
  return (
    <div className="demo-inline-spacing">
      <UncontrolledButtonDropdown direction="up">
        <DropdownToggle color="primary" caret>
          Group
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem href="/" tag="a" header>
            Group 1
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 1
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 2
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem href="/" tag="a" header>
            Group 2
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 1
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 2
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem href="/" tag="a" header>
            Group 3
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 1
          </DropdownItem>
          <DropdownItem href="/" tag="a">
            Option 2
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
      <UncontrolledButtonDropdown
        className="dropdown-icon-wrapper"
        direction="up">
        <Button color="primary">Icons</Button>
        <DropdownToggle className="dropdown-toggle-split" color="primary" caret>
          {activeIcon}
        </DropdownToggle>
        <DropdownMenu tag="ul" right>
          {renderIconItem}
        </DropdownMenu>
      </UncontrolledButtonDropdown>
      <UncontrolledButtonDropdown direction="up">
        <DropdownToggle color="primary" caret>
          Form
        </DropdownToggle>
        <DropdownMenu>
          <Form className="px-2 py-2">
            <FormGroup>
              <Label for="ddEmail">Email</Label>
              <Input
                type="email"
                placeholder="Email"
                name="ddemail"
                id="ddEmail"
              />
            </FormGroup>
            <FormGroup>
              <Label for="ddPassword">Password</Label>
              <Input
                type="password"
                placeholder="Password"
                name="ddPassword"
                id="ddPassword"
              />
            </FormGroup>
            <FormGroup>
              <Input type="checkbox" name="ddCheck" id="ddCheck" />
              <Label for="ddCheck">Remember Me</Label>
            </FormGroup>
            <Button color="primary" type="submit">
              Submit
            </Button>
          </Form>
          <DropdownItem divider />
          <DropdownItem href="/" tag="a" href="#">
            New around here? Sign up
          </DropdownItem>
          <DropdownItem href="/" tag="a" href="#">
            Forgot password?
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
    </div>
  )
}
