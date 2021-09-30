import React, { useState } from 'react'
import { Button, ButtonGroup, Row, Col, CardText } from 'reactstrap'
import { Story } from '@storybook/react'

import {
  User,
  GitHub,
  Calendar,
  Inbox,
  Camera,
  Award,
  Star
} from 'react-feather'

const ButtonCheckboxRadio = () => {
  const [cSelected, setCSelected] = useState([])
  const [rSelected, setRSelected] = useState(null)

  const onCheckboxBtnClick = (selected) => {
    const index = cSelected.indexOf(selected)
    if (index < 0) {
      cSelected.push(selected)
    } else {
      cSelected.splice(index, 1)
    }
    setCSelected([...cSelected])
  }

  return (
    <Row>
      <Col md="12" lg="6">
        <ButtonGroup className="mb-1">
          <Button
            color="primary"
            onClick={() => onCheckboxBtnClick(1)}
            active={cSelected.includes(1)}>
            Active
          </Button>
          <Button
            color="primary"
            onClick={() => onCheckboxBtnClick(2)}
            active={cSelected.includes(2)}>
            Checkbox
          </Button>
          <Button
            color="primary"
            onClick={() => onCheckboxBtnClick(3)}
            active={cSelected.includes(3)}>
            Checkbox
          </Button>
        </ButtonGroup>
        <CardText>Selected: {JSON.stringify(cSelected)}</CardText>
      </Col>
      <Col md="12" lg="6">
        <ButtonGroup className="mb-1">
          <Button
            color="primary"
            onClick={() => setRSelected(1)}
            active={rSelected === 1}>
            Active
          </Button>
          <Button
            color="primary"
            onClick={() => setRSelected(2)}
            active={rSelected === 2}>
            Radio
          </Button>
          <Button
            color="primary"
            onClick={() => setRSelected(3)}
            active={rSelected === 3}>
            Radio
          </Button>
        </ButtonGroup>
        <CardText>Selected: {rSelected}</CardText>
      </Col>
    </Row>
  )
}

export default {
  title: '컴포넌트 (vuexy)/🍎 atoms/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          '버튼 컴포넌트입니다.' +
          "<br/> ```import { Button } from 'reactstrap' ```가 필요합니다.  ",
        subcomponents: {
          IconOnly: 'hello'
        }
      }
    }
  },
  argTypes: {
    color: {
      description: '색상을 변경합니다.',
      options: [
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'dark',
        'flat-primary',
        'flat-secondary',
        'flat-success',
        'flat-danger',
        'flat-warning',
        'flat-info',
        'flat-dark'
      ],
      control: { type: 'select' }
    },
    icon: {
      options: [null, 'user', 'github'],
      control: { type: 'select' }
    },
    size: {
      options: ['sm', '', 'lg'],
      control: { type: 'select' }
    },
    className: {
      options: [null, 'btn-icon', 'btn-icon rounded-circle'],
      control: { type: 'select' }
    },
    disabled: {
      default: false,
      control: { type: 'boolean' }
    }
  }
}

const someFunction = (icon) => {
  // Makes some computations and returns something
  switch (icon) {
    case 'user':
      return <User size={16} />
    case 'github':
      return <GitHub size={16} />
    case null:
      return null
    default:
      return <User size={16} />
  }
}

const Template = ({ text, icon, ...args }) => {
  const someResult = someFunction(icon)

  if (text && icon)
    return (
      <Button {...args}>
        {someResult}
        <span className="align-middle ml-25">{text}</span>
      </Button>
    )

  if (icon) return <Button {...args}>{someResult}</Button>

  return <Button {...args}>{text}</Button>
}

export const Filled = Template.bind({})
Filled.args = {
  color: 'primary',
  text: '넷마블 계정으로 로그인',
  outline: false
}

export const Outline = Template.bind({})
Outline.args = { color: 'primary', text: '버튼', outline: true }
Outline.parameters = {
  docs: {
    description: {
      story: '세그먼트 생성시 추정치 확인 등에서 사용됩니다.'
    }
  }
}

export const Flat = Template.bind({})
Flat.args = { color: 'flat-dark', text: '+ 더보기', outline: true }
Flat.parameters = {
  docs: {
    description: {
      story: '대시보드 카드에서 더보기 기능을 이용할 때 사용합니다.'
    }
  }
}

export const IconWith = Template.bind({})
IconWith.args = {
  color: 'primary',
  outline: false,
  className: 'btn-icon',
  text: '추가 생성하기',
  icon: 'user'
}

export const IconOnly = Template.bind({})
IconOnly.args = {
  color: 'primary',
  outline: false,
  className: 'btn-icon',
  icon: 'user'
}
IconOnly.parameters = {
  docs: {
    description: {
      story: '공지사항 수정, 삭제등에서 사용됩니다.'
    }
  }
}

// export const Text = () => <ButtonCheckboxRadio />
