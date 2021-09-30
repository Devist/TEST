import { useState } from 'react'
import { Fragment } from 'react'
import { Search } from 'react-feather'
import InputPasswordToggle from '@core-components/input-password-toggle'
import {
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,
  Button,
  Row,
  Col,
  FormGroup,
  InputGroupButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import { Edit } from 'react-feather'

export default {
  title: '컴포넌트 (vuexy)/🎄 molecules/Input group',
  component: Fragment,
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

export const InputGroupBasic = () => {
  return (
    <Fragment>
      <InputGroup className="mb-2">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <Search size={14} />
          </InputGroupText>
        </InputGroupAddon>
        <Input placeholder="search..." />
      </InputGroup>
      <InputPasswordToggle
        className="mb-2"
        label="Password"
        htmlFor="basic-default-password"
      />
      <InputGroup className="mb-2">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>@</InputGroupText>
        </InputGroupAddon>
        <Input placeholder="Username" />
      </InputGroup>
      <InputGroup className="mb-2">
        <Input placeholder="Recipient's username" />
        <InputGroupAddon addonType="append">
          <InputGroupText>@example.com</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup className="mb-2">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>https://example.com/users/</InputGroupText>
        </InputGroupAddon>
        <Input />
      </InputGroup>
      <InputGroup className="mb-2">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>$</InputGroupText>
        </InputGroupAddon>
        <Input placeholder="100" />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>With textarea</InputGroupText>
        </InputGroupAddon>
        <Input type="textarea" />
      </InputGroup>
    </Fragment>
  )
}

export const InputGroupMerged = () => {
  return (
    <Fragment>
      <InputGroup className="input-group-merge mb-2">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <Search size={14} />
          </InputGroupText>
        </InputGroupAddon>
        <Input placeholder="search..." />
      </InputGroup>
      <InputPasswordToggle
        className="input-group-merge mb-2"
        label="Password"
        htmlFor="merge-password"
      />
      <InputGroup className="input-group-merge mb-2">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>@</InputGroupText>
        </InputGroupAddon>
        <Input placeholder="Username" />
      </InputGroup>
      <InputGroup className="input-group-merge mb-2">
        <Input placeholder="Recipient's username" />
        <InputGroupAddon addonType="append">
          <InputGroupText>@example.com</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup className="input-group-merge mb-2">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>https://example.com/users/</InputGroupText>
        </InputGroupAddon>
        <Input />
      </InputGroup>
      <InputGroup className="input-group-merge mb-2">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>$</InputGroupText>
        </InputGroupAddon>
        <Input placeholder="100" />
      </InputGroup>
      <InputGroup className="input-group-merge">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>With textarea</InputGroupText>
        </InputGroupAddon>
        <Input type="textarea" />
      </InputGroup>
    </Fragment>
  )
}

export const InputGroupSizes = () => {
  return (
    <Fragment>
      <InputGroup className="mb-1" size="lg">
        <InputGroupAddon addonType="prepend">@</InputGroupAddon>
        <Input placeholder="username" />
      </InputGroup>

      <InputGroup className="mb-1">
        <InputGroupAddon addonType="prepend">@</InputGroupAddon>
        <Input placeholder="username" />
      </InputGroup>

      <InputGroup size="sm">
        <InputGroupAddon addonType="prepend">@</InputGroupAddon>
        <Input placeholder="username" />
      </InputGroup>
    </Fragment>
  )
}

export const InputGroupButtons = () => {
  return (
    <Row>
      <Col className="mb-1" lg="6" md="12">
        <InputGroup>
          <Input />
          <InputGroupAddon addonType="append">
            <Button color="primary" outline>
              Go
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </Col>
      <Col className="mb-1" lg="6" md="12">
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <Button color="primary" outline>
              <Search size={12} />
            </Button>
          </InputGroupAddon>
          <Input type="text" />
          <InputGroupAddon addonType="append">
            <Button color="primary" outline>
              Search !
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </Col>
    </Row>
  )
}

export const InputGroupDropdowns = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [dropdownIcon, setDropdownIcon] = useState(false)
  const [dropdownRight, setDropdownRight] = useState(false)

  const toggleDropDown = () => {
    setDropdownOpen(!dropdownOpen)
  }
  const toggleDropdownIcon = () => {
    setDropdownIcon(!dropdownIcon)
  }
  const toggleDropDownRight = () => {
    setDropdownRight(!dropdownRight)
  }

  return (
    <Row>
      <Col lg="6" md="12">
        <FormGroup>
          <InputGroup>
            <InputGroupButtonDropdown
              addonType="prepend"
              isOpen={dropdownOpen}
              toggle={toggleDropDown}>
              <DropdownToggle color="primary" caret outline>
                Action
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>Action 1</DropdownItem>
                <DropdownItem disabled>Action</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Another Action</DropdownItem>
              </DropdownMenu>
            </InputGroupButtonDropdown>
            <Input />
          </InputGroup>
        </FormGroup>
      </Col>
      <Col lg="6" md="12">
        <FormGroup>
          <InputGroup>
            <InputGroupButtonDropdown
              addonType="prepend"
              isOpen={dropdownIcon}
              toggle={toggleDropdownIcon}>
              <DropdownToggle color="primary" caret outline>
                <Edit size={12} />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>Action 1</DropdownItem>
                <DropdownItem disabled>Action</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Another Action</DropdownItem>
              </DropdownMenu>
            </InputGroupButtonDropdown>
            <Input />
            <InputGroupButtonDropdown
              addonType="append"
              isOpen={dropdownRight}
              toggle={toggleDropDownRight}>
              <DropdownToggle color="primary" outline caret>
                Action
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>Action 1</DropdownItem>
                <DropdownItem disabled>Action</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Another Action</DropdownItem>
              </DropdownMenu>
            </InputGroupButtonDropdown>
          </InputGroup>
        </FormGroup>
      </Col>
    </Row>
  )
}
